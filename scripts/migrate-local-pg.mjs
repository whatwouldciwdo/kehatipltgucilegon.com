import fs from 'node:fs';
import path from 'node:path';
import { Client } from 'pg';

const BASE_PG_URL = process.env.PG_ADMIN_URL || 'postgresql://postgres:Cilego2026.@10.8.140.69:5432/postgres';
const TARGET_DB = process.env.PG_TARGET_DB || 'kehati_pltgu_cilegon';

function buildTargetUrl(baseUrl, dbName) {
  const url = new URL(baseUrl);
  url.pathname = `/${dbName}`;
  return url.toString();
}

function adaptSupabaseSqlForPostgres(sql) {
  const lines = sql.split(/\r?\n/);
  const filtered = [];
  let skipRlsBlock = false;

  for (const line of lines) {
    if (line.includes('ROW LEVEL SECURITY (RLS) POLICIES')) {
      skipRlsBlock = true;
      continue;
    }
    if (skipRlsBlock && line.includes('DATA SEED:')) {
      skipRlsBlock = false;
    }
    if (skipRlsBlock) continue;
    filtered.push(line);
  }

  const triggerSql = `
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS articles_set_updated_at ON public.articles;
CREATE TRIGGER articles_set_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
`;

  return filtered.join('\n') + '\n' + triggerSql;
}

async function main() {
  const adminClient = new Client({ connectionString: BASE_PG_URL });
  await adminClient.connect();

  const dbCheck = await adminClient.query(
    'SELECT 1 FROM pg_database WHERE datname = $1',
    [TARGET_DB]
  );

  if (dbCheck.rowCount === 0) {
    await adminClient.query(`CREATE DATABASE "${TARGET_DB}"`);
    console.log(`Created database: ${TARGET_DB}`);
  } else {
    console.log(`Database already exists: ${TARGET_DB}`);
  }
  await adminClient.end();

  const targetUrl = buildTargetUrl(BASE_PG_URL, TARGET_DB);
  const targetClient = new Client({ connectionString: targetUrl });
  await targetClient.connect();

  const migrationPath = path.resolve(process.cwd(), 'supabase_migration.sql');
  const rawSql = fs.readFileSync(migrationPath, 'utf8');
  const pgSql = adaptSupabaseSqlForPostgres(rawSql);

  await targetClient.query(pgSql);
  console.log('Successfully executed schema and data seed migration.');

  const tables = [
    'articles',
    'kehati_yoy_indicators',
    'kehati_reports',
    'kehati_programs',
    'kehati_species',
    'kehati_gallery_items',
  ];

  for (const table of tables) {
    const res = await targetClient.query(`SELECT COUNT(*)::int AS count FROM public.${table}`);
    console.log(`  - ${table}: ${res.rows[0].count} rows`);
  }

  await targetClient.end();
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
