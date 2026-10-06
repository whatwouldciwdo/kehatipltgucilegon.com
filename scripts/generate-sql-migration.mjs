import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Read kehati-data.ts
const kehatiDataPath = path.join(rootDir, 'src', 'data', 'kehati-data.ts');
const kehatiContent = fs.readFileSync(kehatiDataPath, 'utf8');

// We can extract YOY_CHART_DATA and REPORTS_DATA by evaluating or parsing
const yoyMatch = kehatiContent.match(/export const YOY_CHART_DATA = (\[[\s\S]*?\]);/);
const yoyData = eval(yoyMatch[1]);

// Extract REPORTS_DATA
const reportsMatch = kehatiContent.match(/export const REPORTS_DATA: Record<number, ReportYearData> = (\{[\s\S]*?\n\};)/);
const reportsData = eval('(' + reportsMatch[1].replace(/;$/, '') + ')');

const galleryItems = [
  {
    id: 'item-0',
    name: 'Taman Kehati Ring 1 PLTGU',
    category: 'Flora & Lanskap',
    category_key: 'flora',
    location: 'Kawasan Konservasi Ring 1',
    badge: '137 Spesies',
    description: 'Kawasan konservasi flora seluas 17.7 hektar dengan keanekaragaman pohon langka dan endemik yang dikelola secara berkelanjutan.',
    cover_image: '/images/kehati-showcase/taman-kehati.jpg',
    detail_images: [
      '/images/kehati-showcase/taman-kehati.jpg',
      '/images/gallery/product-1.webp',
      '/images/gallery/product-1-detail-1.webp',
      '/images/gallery/product-1-detail-2.webp',
    ],
    stats: '23.670 Batang Flora Terpantau',
    sort_order: 1
  },
  {
    id: 'item-1',
    name: 'Biowing Connect & Avifauna',
    category: 'Fauna & Satwa',
    category_key: 'fauna',
    location: 'Zona Suaka Burung Ring 1 & 2',
    badge: '52 Spesies Satwa',
    description: 'Sistem regenerasi hayati alami berbantu satwa burung lokal dan pemantauan 1.122 individu aves di area penyangga.',
    cover_image: '/img/laporan/2026/biowing-connect-system.png',
    detail_images: [
      '/img/laporan/2026/biowing-connect-system.png',
      '/images/kehati-showcase/suaka-fauna.jpg',
      '/images/gallery/product-2.webp',
      '/images/gallery/product-2-detail-1.webp',
    ],
    stats: '1.122 Individu Aves Teridentifikasi',
    sort_order: 2
  },
  {
    id: 'item-2',
    name: 'Restorasi Mangrove Pesisir',
    category: 'Ekosistem Pesisir',
    category_key: 'mangrove',
    location: 'Pesisir Desa Lontar, Kec. Tirtayasa',
    badge: '19.000 Bibit',
    description: 'Rehabilitasi pesisir pantai kritis dengan penanaman kumulatif 19.000 pohon Rhizophora apiculata bersama DLH Kab. Serang.',
    cover_image: '/images/kehati-showcase/restorasi-mangrove.jpg',
    detail_images: [
      '/images/kehati-showcase/restorasi-mangrove.jpg',
      '/img/laporan/2026/penanaman-mangrove-2026.png',
      '/images/gallery/product-3.webp',
      '/images/gallery/product-3-detail-1.webp',
    ],
    stats: '0.45 Ha Tutupan Mangrove Lestari',
    sort_order: 3
  },
  {
    id: 'item-3',
    name: 'C-Flora Smart Watering IoT',
    category: 'Inovasi Sirkular',
    category_key: 'inovasi',
    location: 'Nursery & Kebun Pembibitan',
    badge: 'Smart IoT',
    description: 'Sistem otomasi penyiraman cerdas berbasis sensor kelembaban tanah dan sirkularitas air kondensat ramah energi.',
    cover_image: '/img/laporan/2026/sustainable-cycle-smart-watering.png',
    detail_images: [
      '/img/laporan/2026/sustainable-cycle-smart-watering.png',
      '/images/kehati-showcase/nursery-pembibitan.jpg',
      '/images/gallery/product-4.webp',
      '/images/gallery/product-4-detail-1.webp',
    ],
    stats: '100% Efisiensi Air Kondensat',
    sort_order: 4
  },
  {
    id: 'item-4',
    name: 'Suaka Flora Pohon Pelangi & Langka',
    category: 'Flora & Lanskap',
    category_key: 'flora',
    location: 'Taman Edukasi Kehati',
    badge: 'Flora Endemik',
    description: 'Koleksi pohon langka bernilai konservasi tinggi seperti Eucalyptus deglupta, Pohon Gaharu, Angsana, dan Mahoni.',
    cover_image: '/images/kehati-showcase/koridor-hijau.jpg',
    detail_images: [
      '/images/kehati-showcase/koridor-hijau.jpg',
      '/images/gallery/product-5.webp',
      '/images/gallery/product-5-detail-1.webp',
      '/images/gallery/product-5-detail-2.webp',
    ],
    stats: 'Indeks Keanekaragaman H\' 3.374',
    sort_order: 5
  },
  {
    id: 'item-5',
    name: 'Eco Pond & Wetland Konservasi',
    category: 'Ekosistem Air',
    category_key: 'inovasi',
    location: 'Kolam Konservasi Ring 1',
    badge: 'Sirkular Air',
    description: 'Wetland alami penyaring air yang menjadi mikrohabitat beragam ikan lokal, capung, dan amfibi penyangga keseimbangan lingkungan.',
    cover_image: '/images/kehati-showcase/eco-pond.jpg',
    detail_images: [
      '/images/kehati-showcase/eco-pond.jpg',
      '/img/laporan/2026/Kolam-Nila.png',
      '/images/gallery/product-6.webp',
      '/images/gallery/product-6-detail-1.webp',
    ],
    stats: 'Kualitas Air Baku Mutu Kelas II',
    sort_order: 6
  },
  {
    id: 'item-6',
    name: 'Apotek Hidup & Tanaman Obat',
    category: 'Pemberdayaan Masyarakat',
    category_key: 'flora',
    location: 'Kawasan Binaan Masyarakat',
    badge: 'Pemberdayaan',
    description: 'Budidaya tanaman obat keluarga (TOGA) bersama kelompok tani binaan CSR PLTGU Cilegon untuk kemandirian herbal.',
    cover_image: '/img/laporan/2026/Apotek-hidup.png',
    detail_images: [
      '/img/laporan/2026/Apotek-hidup.png',
      '/images/gallery/product-7.webp',
      '/images/gallery/product-7-detail-1.webp',
      '/images/gallery/product-7-detail-2.webp',
    ],
    stats: '45+ Varietas Tanaman Obat Herbal',
    sort_order: 7
  },
  {
    id: 'item-7',
    name: 'Kompleks PLTGU Cilegon 740 MW',
    category: 'Infrastruktur Hijau',
    category_key: 'inovasi',
    location: 'Margasari, Puloampel, Banten',
    badge: 'PROPER Emas',
    description: 'Pembangkit listrik tenaga gas uap modern berteknologi tinggi yang beroperasi berdampingan harmonis dengan kelestarian alam.',
    cover_image: '/images/pltgu-cilegon-2.png',
    detail_images: [
      '/images/pltgu-cilegon-2.png',
      '/images/pembangkit.JPG',
      '/images/gallery/product-8.webp',
      '/images/gallery/product-8-detail-1.webp',
    ],
    stats: '740 MW Listrik Bersih Rendah Emisi',
    sort_order: 8
  }
];

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

function jsonSql(obj) {
  if (obj === null || obj === undefined) return 'NULL';
  return `'${JSON.stringify(obj).replace(/'/g, "''")}'::jsonb`;
}

let sql = `-- ==============================================================================
-- KEHATI PLTGU CILEGON - FULL DATABASE SCHEMA & COMPREHENSIVE DATA SEED
-- Migration: 202610060001_kehati_full_database.sql
-- Includes:
--   1. Articles & CMS (from previous migrations)
--   2. kehati_yoy_indicators (2019-2026 chart trends)
--   3. kehati_reports (2023, 2024, 2025, 2026 yearly reports & summaries)
--   4. kehati_programs (all conservation programs & budget realization)
--   5. kehati_species (comprehensive inventory of flora & fauna with IUCN/Protected status)
--   6. kehati_gallery_items (interactive gallery assets & photography cards)
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ------------------------------------------------------------------------------
-- 1. CMS & ARTICLES (Base Schema)
-- ------------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE public.cms_role AS ENUM ('admin', 'editor');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.content_status AS ENUM ('draft', 'published');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL CHECK (char_length(title) BETWEEN 3 AND 160),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  excerpt text NOT NULL DEFAULT '' CHECK (char_length(excerpt) <= 320),
  body text NOT NULL DEFAULT '',
  status public.content_status NOT NULL DEFAULT 'draft',
  author_id uuid,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 2. YOY INDICATORS TABLE (Tren Tahunan 2019 - 2026)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.kehati_yoy_indicators (
  year integer PRIMARY KEY,
  flora integer NOT NULL DEFAULT 0,
  fauna integer NOT NULL DEFAULT 0,
  mangrove integer NOT NULL DEFAULT 0,
  aves integer NOT NULL DEFAULT 0,
  h_flora numeric(6,3),
  h_fauna numeric(6,3),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 3. YEARLY REPORTS TABLE (Laporan Tahunan 2023, 2024, 2025, 2026)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.kehati_reports (
  year integer PRIMARY KEY,
  period_id text NOT NULL,
  period_en text NOT NULL,
  authors jsonb NOT NULL DEFAULT '[]'::jsonb,
  approvers jsonb NOT NULL DEFAULT '[]'::jsonb,
  approval_date text NOT NULL,
  total_flora integer NOT NULL DEFAULT 0,
  total_fauna integer NOT NULL DEFAULT 0,
  total_mangrove integer NOT NULL DEFAULT 0,
  total_aves integer NOT NULL DEFAULT 0,
  species_count_flora integer NOT NULL DEFAULT 0,
  species_count_fauna integer NOT NULL DEFAULT 0,
  overall_h_index_flora numeric(6,3),
  overall_h_index_fauna numeric(6,3),
  innovation_highlight jsonb,
  status_history jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 4. CONSERVATION PROGRAMS TABLE (Program Konservasi Kehati)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.kehati_programs (
  id text NOT NULL,
  year integer NOT NULL,
  name_id text NOT NULL,
  name_en text NOT NULL,
  desc_id text NOT NULL DEFAULT '',
  desc_en text NOT NULL DEFAULT '',
  ring text NOT NULL DEFAULT '',
  land_area text,
  innovation boolean NOT NULL DEFAULT false,
  unit_id text NOT NULL DEFAULT 'Batang',
  unit_en text NOT NULL DEFAULT 'Stems',
  photo_placeholder text,
  history jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (id, year)
);

-- ------------------------------------------------------------------------------
-- 5. SPECIES INVENTORY TABLE (Data Flora & Fauna Lengkap)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.kehati_species (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  year integer NOT NULL,
  category text NOT NULL CHECK (category IN ('flora', 'fauna')),
  sort_no integer NOT NULL,
  local_name text NOT NULL,
  scientific_name text NOT NULL,
  iucn text,
  is_protected_indo boolean NOT NULL DEFAULT false,
  unit text NOT NULL DEFAULT 'Batang',
  history jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_kehati_species_year_cat ON public.kehati_species(year, category);

-- ------------------------------------------------------------------------------
-- 6. GALLERY ITEMS TABLE (Aset & Foto Dokumentasi Interaktif)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.kehati_gallery_items (
  id text PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  category_key text NOT NULL CHECK (category_key IN ('all', 'flora', 'fauna', 'mangrove', 'inovasi')),
  location text NOT NULL,
  badge text NOT NULL,
  description text NOT NULL,
  cover_image text NOT NULL,
  detail_images jsonb NOT NULL DEFAULT '[]'::jsonb,
  stats text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kehati_yoy_indicators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kehati_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kehati_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kehati_species ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kehati_gallery_items ENABLE ROW LEVEL SECURITY;

-- Allow Public (anon & authenticated) to read published content & kehati data
DROP POLICY IF EXISTS "Public read articles" ON public.articles;
CREATE POLICY "Public read articles" ON public.articles FOR SELECT TO anon, authenticated USING (status = 'published' OR true);

DROP POLICY IF EXISTS "Public read yoy" ON public.kehati_yoy_indicators;
CREATE POLICY "Public read yoy" ON public.kehati_yoy_indicators FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read reports" ON public.kehati_reports;
CREATE POLICY "Public read reports" ON public.kehati_reports FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read programs" ON public.kehati_programs;
CREATE POLICY "Public read programs" ON public.kehati_programs FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read species" ON public.kehati_species;
CREATE POLICY "Public read species" ON public.kehati_species FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read gallery" ON public.kehati_gallery_items;
CREATE POLICY "Public read gallery" ON public.kehati_gallery_items FOR SELECT TO anon, authenticated USING (true);

-- Allow Authenticated / Service Role full access
DROP POLICY IF EXISTS "Admin modify articles" ON public.articles;
CREATE POLICY "Admin modify articles" ON public.articles FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin modify yoy" ON public.kehati_yoy_indicators;
CREATE POLICY "Admin modify yoy" ON public.kehati_yoy_indicators FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin modify reports" ON public.kehati_reports;
CREATE POLICY "Admin modify reports" ON public.kehati_reports FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin modify programs" ON public.kehati_programs;
CREATE POLICY "Admin modify programs" ON public.kehati_programs FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin modify species" ON public.kehati_species;
CREATE POLICY "Admin modify species" ON public.kehati_species FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin modify gallery" ON public.kehati_gallery_items;
CREATE POLICY "Admin modify gallery" ON public.kehati_gallery_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Grant table permissions
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated, service_role;

-- ==============================================================================
-- DATA SEED: YoY CHART INDICATORS (2019 - 2026)
-- ==============================================================================
`;

// Insert YoY indicators
for (const row of yoyData) {
  const hFlora = row.hFlora !== undefined ? row.hFlora : 'NULL';
  const hFauna = row.hFauna !== undefined ? row.hFauna : 'NULL';
  sql += `INSERT INTO public.kehati_yoy_indicators (year, flora, fauna, mangrove, aves, h_flora, h_fauna)
VALUES (${row.year}, ${row.flora}, ${row.fauna}, ${row.mangrove}, ${row.aves}, ${hFlora}, ${hFauna})
ON CONFLICT (year) DO UPDATE SET
  flora = EXCLUDED.flora,
  fauna = EXCLUDED.fauna,
  mangrove = EXCLUDED.mangrove,
  aves = EXCLUDED.aves,
  h_flora = EXCLUDED.h_flora,
  h_fauna = EXCLUDED.h_fauna,
  updated_at = now();\n`;
}

sql += `\n-- ==============================================================================
-- DATA SEED: YEARLY REPORTS (2023, 2024, 2025, 2026)
-- ==============================================================================\n`;

for (const [yearStr, rep] of Object.entries(reportsData)) {
  const y = parseInt(yearStr, 10);
  sql += `INSERT INTO public.kehati_reports (
  year, period_id, period_en, authors, approvers, approval_date,
  total_flora, total_fauna, total_mangrove, total_aves,
  species_count_flora, species_count_fauna,
  overall_h_index_flora, overall_h_index_fauna,
  innovation_highlight, status_history
) VALUES (
  ${y},
  ${escapeSql(rep.periodId)},
  ${escapeSql(rep.periodEn)},
  ${jsonSql(rep.authors)},
  ${jsonSql(rep.approvers)},
  ${escapeSql(rep.date)},
  ${rep.totalFlora},
  ${rep.totalFauna},
  ${rep.totalMangrove},
  ${rep.totalAves},
  ${rep.speciesCountFlora},
  ${rep.speciesCountFauna},
  ${rep.overallHIndexFlora ?? 'NULL'},
  ${rep.overallHIndexFauna ?? 'NULL'},
  ${jsonSql(rep.innovationHighlight)},
  ${jsonSql(rep.statusHistory)}
) ON CONFLICT (year) DO UPDATE SET
  period_id = EXCLUDED.period_id,
  period_en = EXCLUDED.period_en,
  authors = EXCLUDED.authors,
  approvers = EXCLUDED.approvers,
  approval_date = EXCLUDED.approval_date,
  total_flora = EXCLUDED.total_flora,
  total_fauna = EXCLUDED.total_fauna,
  total_mangrove = EXCLUDED.total_mangrove,
  total_aves = EXCLUDED.total_aves,
  species_count_flora = EXCLUDED.species_count_flora,
  species_count_fauna = EXCLUDED.species_count_fauna,
  overall_h_index_flora = EXCLUDED.overall_h_index_flora,
  overall_h_index_fauna = EXCLUDED.overall_h_index_fauna,
  innovation_highlight = EXCLUDED.innovation_highlight,
  status_history = EXCLUDED.status_history,
  updated_at = now();\n\n`;
}

sql += `\n-- ==============================================================================
-- DATA SEED: CONSERVATION PROGRAMS (2023 - 2026)
-- ==============================================================================\n`;

for (const [yearStr, rep] of Object.entries(reportsData)) {
  const y = parseInt(yearStr, 10);
  for (const prog of rep.programs) {
    sql += `INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  ${escapeSql(prog.id)},
  ${y},
  ${escapeSql(prog.nameId)},
  ${escapeSql(prog.nameEn)},
  ${escapeSql(prog.descId)},
  ${escapeSql(prog.descEn)},
  ${escapeSql(prog.ring)},
  ${escapeSql(prog.landArea)},
  ${prog.innovation ? 'true' : 'false'},
  ${escapeSql(prog.unitId)},
  ${escapeSql(prog.unitEn)},
  ${escapeSql(prog.photoPlaceholder)},
  ${jsonSql(prog.history)}
) ON CONFLICT (id, year) DO UPDATE SET
  name_id = EXCLUDED.name_id,
  name_en = EXCLUDED.name_en,
  desc_id = EXCLUDED.desc_id,
  desc_en = EXCLUDED.desc_en,
  ring = EXCLUDED.ring,
  land_area = EXCLUDED.land_area,
  innovation = EXCLUDED.innovation,
  unit_id = EXCLUDED.unit_id,
  unit_en = EXCLUDED.unit_en,
  photo_placeholder = EXCLUDED.photo_placeholder,
  history = EXCLUDED.history;\n`;
  }
}

sql += `\n-- ==============================================================================
-- DATA SEED: SPECIES INVENTORY (FLORA & FAUNA 2023 - 2026)
-- ==============================================================================\n`;
sql += `DELETE FROM public.kehati_species;\n`;

for (const [yearStr, rep] of Object.entries(reportsData)) {
  const y = parseInt(yearStr, 10);
  for (const f of rep.floraList) {
    sql += `INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (${y}, 'flora', ${f.no}, ${escapeSql(f.localName)}, ${escapeSql(f.scientificName)}, ${escapeSql(f.iucn)}, ${f.isProtectedIndo ? 'true' : 'false'}, ${escapeSql(f.unit)}, ${jsonSql(f.history)});\n`;
  }
  for (const f of rep.faunaList) {
    sql += `INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (${y}, 'fauna', ${f.no}, ${escapeSql(f.localName)}, ${escapeSql(f.scientificName)}, ${escapeSql(f.iucn)}, ${f.isProtectedIndo ? 'true' : 'false'}, ${escapeSql(f.unit)}, ${jsonSql(f.history)});\n`;
  }
}

sql += `\n-- ==============================================================================
-- DATA SEED: GALLERY ASSETS & PHOTOGRAPHY ITEMS
-- ==============================================================================\n`;

for (const g of galleryItems) {
  sql += `INSERT INTO public.kehati_gallery_items (
  id, name, category, category_key, location, badge, description, cover_image, detail_images, stats, sort_order
) VALUES (
  ${escapeSql(g.id)},
  ${escapeSql(g.name)},
  ${escapeSql(g.category)},
  ${escapeSql(g.category_key)},
  ${escapeSql(g.location)},
  ${escapeSql(g.badge)},
  ${escapeSql(g.description)},
  ${escapeSql(g.cover_image)},
  ${jsonSql(g.detail_images)},
  ${escapeSql(g.stats)},
  ${g.sort_order}
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  category_key = EXCLUDED.category_key,
  location = EXCLUDED.location,
  badge = EXCLUDED.badge,
  description = EXCLUDED.description,
  cover_image = EXCLUDED.cover_image,
  detail_images = EXCLUDED.detail_images,
  stats = EXCLUDED.stats,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();\n`;
}

// Write to migration file & root SQL file
const migrationPath = path.join(rootDir, 'supabase', 'migrations', '202610060001_kehati_full_database.sql');
fs.writeFileSync(migrationPath, sql, 'utf8');

const rootSqlPath = path.join(rootDir, 'supabase_migration.sql');
fs.writeFileSync(rootSqlPath, sql, 'utf8');

console.log('Successfully generated SQL migration files:');
console.log('1.', migrationPath);
console.log('2.', rootSqlPath);
