import 'server-only';

import type { Pool } from 'pg';
import { getPool } from '@/lib/db';

type QueryResult<T = Record<string, unknown>> = {
  data: T | null;
  error: { message: string; code?: string } | null;
  count?: number | null;
};

const IDENTIFIER_RE = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

function quoteIdent(ident: string): string {
  if (!IDENTIFIER_RE.test(ident)) {
    throw new Error(`Invalid SQL identifier: ${ident}`);
  }
  return `"${ident}"`;
}

function serializeValue(val: unknown): unknown {
  if (Array.isArray(val)) {
    return JSON.stringify(val);
  }
  return val;
}

class PgTableQueryBuilder implements PromiseLike<QueryResult<any>> {
  private pool: Pool;
  private table: string;
  private action: 'select' | 'insert' | 'update' | 'delete' = 'select';
  private selectCols = '*';
  private countMode: 'exact' | null = null;
  private headOnly = false;
  private payload: Record<string, unknown> | null = null;
  private filters: Array<{ column: string; value: unknown }> = [];
  private orderClause: { column: string; ascending: boolean } | null = null;
  private limitCount: number | null = null;
  private rowMode: 'many' | 'single' | 'maybeSingle' = 'many';

  constructor(pool: Pool, table: string) {
    this.pool = pool;
    this.table = quoteIdent(table);
  }

  select(columns = '*', options?: { count?: 'exact'; head?: boolean }) {
    this.action = 'select';
    this.selectCols = columns.trim() === '*'
      ? '*'
      : columns
          .split(',')
          .map((c) => quoteIdent(c.trim()))
          .join(', ');
    this.countMode = options?.count ?? null;
    this.headOnly = Boolean(options?.head);
    return this;
  }

  insert(values: Record<string, unknown>) {
    this.action = 'insert';
    this.payload = values;
    return this;
  }

  update(values: Record<string, unknown>) {
    this.action = 'update';
    this.payload = values;
    return this;
  }

  delete() {
    this.action = 'delete';
    return this;
  }

  eq(column: string, value: unknown) {
    this.filters.push({ column: quoteIdent(column), value });
    return this;
  }

  order(column: string, options?: { ascending?: boolean }) {
    this.orderClause = {
      column: quoteIdent(column),
      ascending: options?.ascending !== false,
    };
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  single() {
    this.rowMode = 'single';
    return this;
  }

  maybeSingle() {
    this.rowMode = 'maybeSingle';
    return this;
  }

  private buildWhere(startIndex: number) {
    if (this.filters.length === 0) {
      return { sql: '', params: [] as unknown[] };
    }
    const clauses: string[] = [];
    const params: unknown[] = [];
    this.filters.forEach((f, idx) => {
      clauses.push(`${f.column} = $${startIndex + idx}`);
      params.push(f.value);
    });
    return { sql: ` WHERE ${clauses.join(' AND ')}`, params };
  }

  async execute(): Promise<QueryResult<any>> {
    try {
      if (this.action === 'select') {
        const where = this.buildWhere(1);

        if (this.headOnly && this.countMode === 'exact') {
          const res = await this.pool.query<{ count: string }>(
            `SELECT COUNT(*)::text AS count FROM public.${this.table}${where.sql}`,
            where.params
          );
          return { data: null, error: null, count: Number(res.rows[0]?.count ?? 0) };
        }

        let sql = `SELECT ${this.selectCols} FROM public.${this.table}${where.sql}`;
        if (this.orderClause) {
          sql += ` ORDER BY ${this.orderClause.column} ${this.orderClause.ascending ? 'ASC' : 'DESC'}`;
        }
        if (this.limitCount !== null) {
          sql += ` LIMIT ${Number(this.limitCount)}`;
        } else if (this.rowMode === 'single' || this.rowMode === 'maybeSingle') {
          sql += ' LIMIT 1';
        }

        const res = await this.pool.query(sql, where.params);
        if (this.rowMode === 'single') {
          if (res.rows.length === 0) {
            return { data: null, error: { message: 'Row not found' } };
          }
          return { data: res.rows[0], error: null };
        }
        if (this.rowMode === 'maybeSingle') {
          return { data: res.rows[0] ?? null, error: null };
        }
        return { data: res.rows, error: null, count: this.countMode === 'exact' ? res.rows.length : undefined };
      }

      if (this.action === 'insert' && this.payload) {
        const entries = Object.entries(this.payload);
        const cols = entries.map(([k]) => quoteIdent(k)).join(', ');
        const placeholders = entries.map((_, i) => `$${i + 1}`).join(', ');
        const params = entries.map(([, v]) => serializeValue(v));
        const res = await this.pool.query(
          `INSERT INTO public.${this.table} (${cols}) VALUES (${placeholders}) RETURNING *`,
          params
        );
        return { data: res.rows[0] ?? null, error: null };
      }

      if (this.action === 'update' && this.payload) {
        const entries = Object.entries(this.payload);
        const setClause = entries
          .map(([k], i) => `${quoteIdent(k)} = $${i + 1}`)
          .join(', ');
        const params = entries.map(([, v]) => serializeValue(v));
        const where = this.buildWhere(entries.length + 1);
        const res = await this.pool.query(
          `UPDATE public.${this.table} SET ${setClause}${where.sql} RETURNING *`,
          [...params, ...where.params]
        );
        return { data: res.rows, error: null };
      }

      if (this.action === 'delete') {
        const where = this.buildWhere(1);
        await this.pool.query(`DELETE FROM public.${this.table}${where.sql}`, where.params);
        return { data: null, error: null };
      }

      return { data: null, error: { message: 'Unsupported query action' } };
    } catch (err: unknown) {
      const pgErr = err as { message?: string; code?: string };
      return {
        data: null,
        error: {
          message: pgErr?.message || 'Database query error',
          code: pgErr?.code,
        },
      };
    }
  }

  then<TResult1 = QueryResult<any>, TResult2 = never>(
    onfulfilled?: ((value: QueryResult<any>) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    return this.execute().then(onfulfilled, onrejected);
  }
}

export function createAdminClient() {
  const pool = getPool();
  return {
    from(table: string) {
      return new PgTableQueryBuilder(pool, table);
    },
  };
}
