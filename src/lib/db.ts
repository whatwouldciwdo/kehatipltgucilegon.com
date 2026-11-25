import 'server-only';

import { Pool } from 'pg';

function cleanEnv(val: string | undefined): string {
  if (!val) return '';
  return val.trim().replace(/^["']|["']$/g, '');
}

const globalForPg = globalThis as unknown as { __kehatiPgPool?: Pool };

export function getDatabaseUrl(): string {
  return cleanEnv(process.env.DATABASE_URL);
}

export function getOptionalPool(): Pool | null {
  const connectionString = getDatabaseUrl();
  if (!connectionString) return null;

  if (!globalForPg.__kehatiPgPool) {
    globalForPg.__kehatiPgPool = new Pool({
      connectionString,
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    });
  }

  return globalForPg.__kehatiPgPool;
}

export function getPool(): Pool {
  const pool = getOptionalPool();
  if (!pool) {
    throw new Error('Konfigurasi DATABASE_URL belum lengkap di .env.local / environment.');
  }
  return pool;
}
