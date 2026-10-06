-- ==============================================================================
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
INSERT INTO public.kehati_yoy_indicators (year, flora, fauna, mangrove, aves, h_flora, h_fauna)
VALUES (2019, 1696, 332, 0, 311, NULL, NULL)
ON CONFLICT (year) DO UPDATE SET
  flora = EXCLUDED.flora,
  fauna = EXCLUDED.fauna,
  mangrove = EXCLUDED.mangrove,
  aves = EXCLUDED.aves,
  h_flora = EXCLUDED.h_flora,
  h_fauna = EXCLUDED.h_fauna,
  updated_at = now();
INSERT INTO public.kehati_yoy_indicators (year, flora, fauna, mangrove, aves, h_flora, h_fauna)
VALUES (2020, 4135, 377, 2300, 335, 2.882, 2.704)
ON CONFLICT (year) DO UPDATE SET
  flora = EXCLUDED.flora,
  fauna = EXCLUDED.fauna,
  mangrove = EXCLUDED.mangrove,
  aves = EXCLUDED.aves,
  h_flora = EXCLUDED.h_flora,
  h_fauna = EXCLUDED.h_fauna,
  updated_at = now();
INSERT INTO public.kehati_yoy_indicators (year, flora, fauna, mangrove, aves, h_flora, h_fauna)
VALUES (2021, 4870, 459, 3000, 369, 2.903, 2.81)
ON CONFLICT (year) DO UPDATE SET
  flora = EXCLUDED.flora,
  fauna = EXCLUDED.fauna,
  mangrove = EXCLUDED.mangrove,
  aves = EXCLUDED.aves,
  h_flora = EXCLUDED.h_flora,
  h_fauna = EXCLUDED.h_fauna,
  updated_at = now();
INSERT INTO public.kehati_yoy_indicators (year, flora, fauna, mangrove, aves, h_flora, h_fauna)
VALUES (2022, 5469, 623, 3500, 487, 3.026, 2.908)
ON CONFLICT (year) DO UPDATE SET
  flora = EXCLUDED.flora,
  fauna = EXCLUDED.fauna,
  mangrove = EXCLUDED.mangrove,
  aves = EXCLUDED.aves,
  h_flora = EXCLUDED.h_flora,
  h_fauna = EXCLUDED.h_fauna,
  updated_at = now();
INSERT INTO public.kehati_yoy_indicators (year, flora, fauna, mangrove, aves, h_flora, h_fauna)
VALUES (2023, 5504, 657, 7000, 487, 3.111, 2.908)
ON CONFLICT (year) DO UPDATE SET
  flora = EXCLUDED.flora,
  fauna = EXCLUDED.fauna,
  mangrove = EXCLUDED.mangrove,
  aves = EXCLUDED.aves,
  h_flora = EXCLUDED.h_flora,
  h_fauna = EXCLUDED.h_fauna,
  updated_at = now();
INSERT INTO public.kehati_yoy_indicators (year, flora, fauna, mangrove, aves, h_flora, h_fauna)
VALUES (2024, 13462, 989, 10500, 624, 3.196, 3.006)
ON CONFLICT (year) DO UPDATE SET
  flora = EXCLUDED.flora,
  fauna = EXCLUDED.fauna,
  mangrove = EXCLUDED.mangrove,
  aves = EXCLUDED.aves,
  h_flora = EXCLUDED.h_flora,
  h_fauna = EXCLUDED.h_fauna,
  updated_at = now();
INSERT INTO public.kehati_yoy_indicators (year, flora, fauna, mangrove, aves, h_flora, h_fauna)
VALUES (2025, 17832, 766, 14500, 629, 3.313, 3.075)
ON CONFLICT (year) DO UPDATE SET
  flora = EXCLUDED.flora,
  fauna = EXCLUDED.fauna,
  mangrove = EXCLUDED.mangrove,
  aves = EXCLUDED.aves,
  h_flora = EXCLUDED.h_flora,
  h_fauna = EXCLUDED.h_fauna,
  updated_at = now();
INSERT INTO public.kehati_yoy_indicators (year, flora, fauna, mangrove, aves, h_flora, h_fauna)
VALUES (2026, 23670, 1268, 19000, 1122, 3.374, 3.267)
ON CONFLICT (year) DO UPDATE SET
  flora = EXCLUDED.flora,
  fauna = EXCLUDED.fauna,
  mangrove = EXCLUDED.mangrove,
  aves = EXCLUDED.aves,
  h_flora = EXCLUDED.h_flora,
  h_fauna = EXCLUDED.h_fauna,
  updated_at = now();

-- ==============================================================================
-- DATA SEED: YEARLY REPORTS (2023, 2024, 2025, 2026)
-- ==============================================================================
INSERT INTO public.kehati_reports (
  year, period_id, period_en, authors, approvers, approval_date,
  total_flora, total_fauna, total_mangrove, total_aves,
  species_count_flora, species_count_fauna,
  overall_h_index_flora, overall_h_index_fauna,
  innovation_highlight, status_history
) VALUES (
  2023,
  'Januari 2019 – Juni 2023',
  'January 2019 – June 2023',
  '["Insan Taufik","Masenda Dea Arista","A. Mustakin"]'::jsonb,
  '[{"titleId":"Assistant Manager K3L","titleEn":"Assistant Manager HSE","name":"Arif Sarifudin"}]'::jsonb,
  '7 Agustus 2023',
  5504,
  657,
  3500,
  487,
  71,
  30,
  3.111,
  2.908,
  '{"nameId":"Green Hidroponik System","nameEn":"Green Hydroponics System","taglineId":"Inovasi Pertanian Vertikal Ramah Lingkungan Ring 1","taglineEn":"Eco-friendly Vertical Farming Innovation in Ring 1","descId":"Pemanfaatan instalasi hidroponik modern di area PLTGU Cilegon untuk memperkaya jenis flora hijau bernilai gizi tinggi seperti Pokcoy, Selada, dan Kangkung sekaligus mendukung ketahanan pangan komunitas sekitar.","descEn":"Modern hydroponic setup within the power plant area to enrich green flora varieties with high nutritional value such as Pak Choi, Lettuce, and Water Spinach while supporting community food security.","impactNumber":"384 Batang","impactLabelId":"Total Panen & Bibit Sayur","impactLabelEn":"Total Harvest & Seedlings","badgeId":"Inisiatif Baru 2023","badgeEn":"New Initiative 2023","photoPlaceholder":"[FOTO: Dokumentasi_Green_Hidroponik_2023.jpg]"}'::jsonb,
  '[{"year":"2019","flora":1696,"fauna":332},{"year":"2020","flora":4154,"fauna":377},{"year":"2021","flora":4889,"fauna":459},{"year":"2022","flora":5392,"fauna":623},{"year":"2023","flora":5504,"fauna":657}]'::jsonb
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
  updated_at = now();

INSERT INTO public.kehati_reports (
  year, period_id, period_en, authors, approvers, approval_date,
  total_flora, total_fauna, total_mangrove, total_aves,
  species_count_flora, species_count_fauna,
  overall_h_index_flora, overall_h_index_fauna,
  innovation_highlight, status_history
) VALUES (
  2024,
  'Januari 2020 – Juni 2024',
  'January 2020 – June 2024',
  '["Insan Taufik","Masenda Dea Arista","A. Mustakin"]'::jsonb,
  '[{"titleId":"Assistant Manager K3L","titleEn":"Assistant Manager HSE","name":"Arif Sarifudin"}]'::jsonb,
  '12 Agustus 2024',
  13462,
  989,
  10500,
  624,
  103,
  44,
  3.196,
  3.006,
  '{"nameId":"Amoniak for Dogar","nameEn":"Amoniak for Dogar App","taglineId":"Aplikasi Monitoring Ternak Pintar Domba Garut Terpadu","taglineEn":"Smart Livestock Monitoring Application for Garut Sheep","descId":"Pengembangan platform digital cerdas untuk memonitor perkembangan bobot harian, rekam jejak kesehatan, dan database silsilah genetik ternak domba Garut guna mencegah inbreeding (perkawinan sedarah) peternak binaan Desa Cikeusal.","descEn":"Smart digital platform developed to track daily weight gain, health records, and pedigree genetics database of Garut sheep to prevent inbreeding among local breeders in Cikeusal Village.","impactNumber":"244 Ekor","impactLabelId":"Populasi Domba Terpantau Digital","impactLabelEn":"Sheep Monitored Digitally","badgeId":"Inovasi Digital 2024","badgeEn":"Digital Innovation 2024","photoPlaceholder":"[FOTO: Dokumentasi_Aplikasi_Amoniak_Dogar_2024.jpg]"}'::jsonb,
  '[{"year":"2020","flora":4135,"fauna":377},{"year":"2021","flora":4870,"fauna":459},{"year":"2022","flora":5469,"fauna":623},{"year":"2023","flora":9315,"fauna":657},{"year":"2024","flora":13462,"fauna":989}]'::jsonb
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
  updated_at = now();

INSERT INTO public.kehati_reports (
  year, period_id, period_en, authors, approvers, approval_date,
  total_flora, total_fauna, total_mangrove, total_aves,
  species_count_flora, species_count_fauna,
  overall_h_index_flora, overall_h_index_fauna,
  innovation_highlight, status_history
) VALUES (
  2025,
  'Januari 2021 – Juni 2025',
  'January 2021 – June 2025',
  '["Insan Taufik","Dea Arista","A. Mustakin"]'::jsonb,
  '[{"titleId":"Manager Operasi","titleEn":"Operation Manager","name":"Hendra Surya Kusumah"},{"titleId":"Assistant Manager K3L","titleEn":"Assistant Manager HSE","name":"Arif Sarifudin"},{"titleId":"Tim Keanekaragaman Hayati","titleEn":"Biodiversity Team Lead","name":"Insan Taufik"}]'::jsonb,
  '7 Juli 2025',
  17832,
  766,
  14500,
  629,
  100,
  47,
  3.313,
  3.075,
  '{"nameId":"C – Flora & Iron Mus IoT","nameEn":"C – Flora & Iron Mus IoT","taglineId":"Internet on Module Smart Watering & Sustainable Flora Cycle","taglineEn":"Internet on Module Smart Watering & Sustainable Flora Cycle","descId":"Implementasi sistem integrated planting system berbasis IoT (Internet on Module Smart Watering System - Iron Mus) untuk automasi penyiraman dan optimalisasi pembibitan pohon buah dan peneduh secara masif, menghasilkan tingkat kelangsungan hidup bibit hingga 94%.","descEn":"Implementation of an IoT-based integrated planting system (Iron Mus Smart Watering) for automated watering and massive tree nursery propagation, achieving up to 94% seedling survival rate.","impactNumber":"1.280 Batang","impactLabelId":"Bibit Tumbuh via Smart Watering","impactLabelEn":"Seedlings Thriving via Smart IoT","badgeId":"Inovasi IoT 2025","badgeEn":"IoT Innovation 2025","photoPlaceholder":"[FOTO: Dokumentasi_Sistem_IoT_Iron_Mus_2025.jpg]"}'::jsonb,
  '[{"year":"2021","flora":4870,"fauna":369},{"year":"2022","flora":5373,"fauna":487},{"year":"2023","flora":8931,"fauna":487},{"year":"2024","flora":13078,"fauna":745},{"year":"2025","flora":17832,"fauna":766}]'::jsonb
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
  updated_at = now();

INSERT INTO public.kehati_reports (
  year, period_id, period_en, authors, approvers, approval_date,
  total_flora, total_fauna, total_mangrove, total_aves,
  species_count_flora, species_count_fauna,
  overall_h_index_flora, overall_h_index_fauna,
  innovation_highlight, status_history
) VALUES (
  2026,
  'Januari 2022 – Juni 2026',
  'January 2022 – June 2026',
  '["Insan Taufik","Dea Arista","A. Mustakin"]'::jsonb,
  '[{"titleId":"Manager Operasi","titleEn":"Operation Manager","name":"Hendra Surya Kusumah"},{"titleId":"Assistant Manager K3L","titleEn":"Assistant Manager HSE","name":"Fuji Juhairil Hamdalah"},{"titleId":"Tim Keanekaragaman Hayati","titleEn":"Biodiversity Team Lead","name":"Insan Taufik"}]'::jsonb,
  '7 Juli 2026',
  23670,
  1268,
  19000,
  1122,
  137,
  52,
  3.374,
  3.267,
  '{"nameId":"BIOWING CONNECT","nameEn":"BIOWING CONNECT AI SYSTEM","taglineId":"Natural Bird-Assisted Biodiversity Regeneration System Berbasis Digital","taglineEn":"Digital Natural Bird-Assisted Biodiversity Regeneration System","descId":"Terobosan sistem pemantauan dan pencatatan vegetasi alami yang tumbuh melalui peran aves (burung) sebagai agen penyebar benih (vector dispersal). Aplikasi ini mencatat kemunculan 4.471 individu flora baru secara akurat dan real-time di kawasan Ring 1 & Ring 2.","descEn":"Breakthrough monitoring and digital recording system of natural vegetation regenerated through avian seed dispersal vectors. The application tracks 4,471 new flora individuals accurately and in real-time across Ring 1 & Ring 2.","impactNumber":"4.471 Batang","impactLabelId":"Vegetasi Alami Terpencatat Real-time","impactLabelEn":"Natural Seedlings Tracked Digitally","badgeId":"Inovasi Unggulan 2026","badgeEn":"Flagship Innovation 2026","photoPlaceholder":"[FOTO: Dokumentasi_Aplikasi_Biowing_Connect_2026.jpg]"}'::jsonb,
  '[{"year":"2022","flora":5373,"fauna":487,"hFlora":3.026,"hFauna":2.908},{"year":"2023","flora":8920,"fauna":487,"hFlora":3.111,"hFauna":2.908},{"year":"2024","flora":13065,"fauna":745,"hFlora":3.196,"hFauna":3.006},{"year":"2025","flora":17565,"fauna":755,"hFlora":3.313,"hFauna":3.075},{"year":"2026","flora":23670,"fauna":1268,"hFlora":3.374,"hFauna":3.267}]'::jsonb
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
  updated_at = now();


-- ==============================================================================
-- DATA SEED: CONSERVATION PROGRAMS (2023 - 2026)
-- ==============================================================================
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'pelestarian-alami',
  2023,
  'Pelestarian Alami Flora Kawasan Konservasi',
  'Natural Flora Preservation in Conservation Zone',
  'Konservasi regenerasi alami pepohonan pelindung, buah langka, dan tanaman endemik di areal hijau Ring 1 seluas 17,7 Hektar.',
  'Natural regeneration and conservation of protective, rare fruit, and endemic trees across 17.7 Ha Ring 1 green zone.',
  'Ring 1 (17,7 Ha)',
  NULL,
  false,
  'Batang',
  'Stems',
  '[FOTO: Dokumentasi_Pelestarian_Flora_2023.jpg]',
  '{"2019":{"count":1696,"budget":30000000},"2020":{"count":1816,"budget":30000000,"hIndex":2.882},"2021":{"count":1851,"budget":30000000,"hIndex":2.976},"2022":{"count":1854,"budget":30000000,"hIndex":2.985},"2023":{"count":1858,"budget":30000000,"hIndex":2.994}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'mangrove',
  2023,
  'Penanaman Mangrove Pesisir Serang',
  'Coastal Mangrove Restoration Serang Regency',
  'Sinergi restorasi ekosistem pesisir bersama DLH Kabupaten Serang dan komunitas lokal di Desa Lontar, Kec. Tirtayasa untuk menahan abrasi.',
  'Coastal ecosystem restoration in partnership with Serang Environmental Agency and local community in Lontar Village, Tirtayasa.',
  'Pesisir Desa Lontar (2 Ha)',
  NULL,
  false,
  'Batang',
  'Stems',
  '[FOTO: Dokumentasi_Penanaman_Mangrove_2023.jpg]',
  '{"2020":{"count":2300,"budget":17000000,"hIndex":0.281},"2021":{"count":3000,"budget":17000000,"hIndex":0.315},"2022":{"count":3500,"budget":17000000,"hIndex":0.268},"2023":{"count":3500,"budget":17000000,"hIndex":0.352}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'aves',
  2023,
  'Peningkatan Populasi Aves via RTH',
  'Aves Population Enhancement via Green Open Space',
  'Pengayaan habitat alami pakan buah dan tajuk tinggi untuk perkembangbiakan aneka burung pesisir dan migratori di Ring 1 & 2.',
  'Enrichment of natural fruit food sources and high canopies for coastal and migratory birds in Ring 1 & 2.',
  'Ring 1 & Ring 2',
  NULL,
  false,
  'Ekor',
  'Birds',
  '[FOTO: Dokumentasi_Monitoring_Aves_2023.jpg]',
  '{"2019":{"count":311},"2020":{"count":335},"2021":{"count":369},"2022":{"count":487,"budget":30000000,"hIndex":2.908},"2023":{"count":487,"budget":30000000,"hIndex":2.908}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'apotek-hidup',
  2023,
  'Penanaman & Perawatan Apotek Hidup',
  'Herbal Medicinal Garden (Apotek Hidup)',
  'Pelestarian tanaman obat keluarga (TOGA) seperti Temulawak, Lidah Buaya, Jahe, dan Kunyit untuk edukasi herbal dan kesehatan.',
  'Conservation of family medicinal plants like Curcuma, Aloe Vera, Ginger, and Turmeric for health education.',
  'Ring 1 (0,006 Ha)',
  NULL,
  false,
  'Batang',
  'Stems',
  '[FOTO: Dokumentasi_Apotek_Hidup_2023.jpg]',
  '{"2020":{"count":19,"budget":10000000},"2021":{"count":19,"budget":10000000},"2022":{"count":19,"budget":10000000},"2023":{"count":73,"budget":10000000}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'plasma-farming',
  2023,
  'Plasma and Green Farming Cycle (Domba)',
  'Plasma & Green Farming Cycle (Sheep)',
  'Pemberdayaan peternakan terpadu domba garut dengan pemanfaatan rumput odot dan gajah mini di Ring 3.',
  'Integrated Garut sheep farming empowerment utilizing Odot grass and miniature elephant grass in Ring 3.',
  'Ring 3 (0,1 Ha)',
  NULL,
  false,
  'Ekor',
  'Heads',
  '[FOTO: Dokumentasi_Plasma_Domba_2023.jpg]',
  '{"2019":{"count":21,"budget":50000000,"hIndex":0.105},"2020":{"count":42,"budget":50000000,"hIndex":0.168},"2021":{"count":90,"budget":50000000,"hIndex":0.263},"2022":{"count":136,"budget":50000000,"hIndex":0.318},"2023":{"count":170,"budget":50000000,"hIndex":0.343}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'green-hidroponik',
  2023,
  'Green Hidroponik',
  'Green Hydroponics',
  'Budidaya tanaman pangan bergizi tinggi seperti Pokcoy, Selada, dan Kangkung melalui metode hidroponik di area Ring 1.',
  'High-nutrition vegetable cultivation including Pak Choi, Lettuce, and Water Spinach through hydroponic method in Ring 1.',
  'Ring 1',
  NULL,
  true,
  'Batang',
  'Stems',
  '[FOTO: Dokumentasi_Green_Hidroponik_2023.jpg]',
  '{"2022":{"count":96},"2023":{"count":384}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'pelestarian-alami',
  2024,
  'Pelestarian Alami Flora PLTGU Cilegon',
  'Natural Flora Preservation PLTGU Cilegon',
  'Pemantauan indeks keanekaragaman dan pemulihan tajuk pohon alami di area 17,7 Ha dengan penambahan 33 jenis pohon baru.',
  'Diversity index monitoring and natural tree canopy recovery across 17.7 Ha area with 33 new recorded tree species.',
  'Ring 1 & 2 (17,7 Ha)',
  NULL,
  false,
  'Batang',
  'Stems',
  '[FOTO: Dokumentasi_Pelestarian_Alami_2024.jpg]',
  '{"2020":{"count":1816,"budget":30000000,"hIndex":2.882},"2021":{"count":1851,"budget":30000000,"hIndex":2.976},"2022":{"count":1854,"budget":30000000,"hIndex":2.985},"2023":{"count":1858,"budget":30000000,"hIndex":2.994},"2024":{"count":2712,"budget":30000000,"hIndex":3.346}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'mangrove',
  2024,
  'Penanaman Mangrove Pesisir Serang',
  'Serang Coastal Mangrove Planting Initiative',
  'Kolaborasi bersama LSM Harapan Abadi dan KTH Segara Biru menanam mangrove Rhizophora apiculata di lahan kritis pesisir Desa Lontar.',
  'Collaboration with Harapan Abadi NGO & Segara Biru Forest Farmer Group planting Rhizophora apiculata in critical coastlines.',
  'Pesisir Desa Lontar (0,35 Ha)',
  NULL,
  false,
  'Batang',
  'Stems',
  '[FOTO: Dokumentasi_Mangrove_Serang_2024.jpg]',
  '{"2020":{"count":2300,"budget":17000000,"hIndex":0.281},"2021":{"count":3000,"budget":17000000,"hIndex":0.315},"2022":{"count":3500,"budget":17000000,"hIndex":0.268},"2023":{"count":7000,"budget":17000000,"hIndex":0.352},"2024":{"count":10500,"budget":17000000,"hIndex":0.367}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'aves',
  2024,
  'Peningkatan Populasi Aves via Penambahan RTH',
  'Aves Population Growth via Green Space Expansion',
  'Pengamatan terdata 30 jenis burung dengan keberadaan spesies langka seperti Alap-alap Sapi dan Ibis Rokoroko.',
  'Recorded 30 bird species including sightings of protected species such as Moluccan Kestrel and Glossy Ibis.',
  'Ring 1 & 2 (17,7 Ha)',
  NULL,
  false,
  'Ekor',
  'Birds',
  '[FOTO: Dokumentasi_Pengamatan_Aves_2024.jpg]',
  '{"2020":{"count":335},"2021":{"count":369},"2022":{"count":487,"budget":30000000},"2023":{"count":487,"budget":30000000},"2024":{"count":624,"budget":30000000}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'amoniak-dogar',
  2024,
  'Amoniak for Dogar (Plasma Farming Digital)',
  'Amoniak for Dogar (Digital Plasma Farming)',
  'Program monitoring digital peternakan plasma domba Garut yang mencatat 244 ekor sehat dan produktif.',
  'Digital livestock monitoring program for Garut sheep plasma recording 244 healthy and productive sheep.',
  'Ring 3 (0,1 Ha)',
  NULL,
  true,
  'Ekor',
  'Heads',
  '[FOTO: Dokumentasi_Amoniak_Dogar_Ternak_2024.jpg]',
  '{"2022":{"count":136,"budget":50000000,"hIndex":0.295},"2023":{"count":170,"budget":50000000,"hIndex":0.323},"2024":{"count":244,"budget":50000000,"hIndex":0.359}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'apotek-hidup',
  2024,
  'Apotek Hidup Konservasi Ring 1',
  'Herbal Garden Ring 1 Conservation',
  'Pemberdayaan budidaya 12 jenis herbal obat termasuk Rosela, Bidara, Kumis Kucing, dan Sambiloto.',
  'Empowerment and cultivation of 12 medicinal herb varieties including Roselle, Bidara, and Java Tea.',
  'Ring 1 (0,006 Ha)',
  NULL,
  false,
  'Batang',
  'Stems',
  '[FOTO: Dokumentasi_Apotek_Hidup_2024.jpg]',
  '{"2020":{"count":19,"budget":10000000},"2021":{"count":19,"budget":10000000},"2022":{"count":19,"budget":10000000},"2023":{"count":73,"budget":10000000},"2024":{"count":85,"budget":10000000}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'green-hidroponik',
  2024,
  'Green Hidroponik',
  'Green Hydroponics',
  'Budidaya Pokcoy, Selada, dan Kangkung melalui sistem hidroponik modern di area Ring 1 PLTGU Cilegon.',
  'Pak Choi, Lettuce, and Water Spinach cultivation through modern hydroponic system in Ring 1 PLTGU Cilegon.',
  'Ring 1 (0,01 Ha)',
  NULL,
  false,
  'Batang',
  'Stems',
  '[FOTO: Dokumentasi_Green_Hidroponik_2024.jpg]',
  '{"2022":{"count":96,"budget":3000000},"2023":{"count":384,"budget":3000000},"2024":{"count":384,"budget":3000000}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'plasma-farming',
  2024,
  'Plasma n Green Farming Cycle',
  'Plasma & Green Farming Cycle',
  'Program pemberdayaan peternakan terpadu domba garut di Desa Cikeusal, pemanfaatan rumput odot dan gajah mini untuk nutrisi ternak.',
  'Integrated Garut sheep farming program in Cikeusal Village, utilizing Odot and miniature elephant grass for livestock nutrition.',
  'Ring 3 (0,1 Ha)',
  NULL,
  false,
  'Ekor',
  'Heads',
  '[FOTO: Dokumentasi_Plasma_Farming_2024.jpg]',
  '{"2020":{"count":42,"budget":50000000,"hIndex":0.168},"2021":{"count":90,"budget":50000000,"hIndex":0.263},"2022":{"count":136,"budget":50000000,"hIndex":0.318},"2023":{"count":170,"budget":50000000,"hIndex":0.343},"2024":{"count":244,"budget":50000000,"hIndex":0.367}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'pelestarian-alami',
  2025,
  'Pelestarian Alami Flora Konservasi',
  'Natural Flora Preservation in Conservation Zone',
  'Pengayaan vegetasi pohon pelangi, angsana, trembesi, dan buah endemik dengan indeks keanekaragaman H’ mencapai 3,209.',
  'Vegetation enrichment of rainbow eucalyptus, angsana, rain trees, and endemic fruits reaching H’ index of 3.209.',
  'Ring 1 (17,7 Ha)',
  NULL,
  false,
  'Batang',
  'Stems',
  '[FOTO: Dokumentasi_Pelestarian_Flora_2025.jpg]',
  '{"2021":{"count":1851,"budget":30000000,"hIndex":2.903},"2022":{"count":1854,"budget":30000000,"hIndex":2.985},"2023":{"count":1858,"budget":30000000,"hIndex":2.994},"2024":{"count":2493,"budget":30000000,"hIndex":3.094},"2025":{"count":3120,"budget":30000000,"hIndex":3.209}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'c-flora',
  2025,
  'C – Flora: Smart Watering System (Iron Mus)',
  'C – Flora: Smart Watering System (Iron Mus)',
  'Sistem pembibitan terintegrasi penyiraman otomatis untuk mempercepat pertumbuhan tanaman konservasi dan penghijauan pemukiman.',
  'Integrated automated watering nursery system to accelerate growth of conservation plants and neighborhood greening.',
  'Ring 1 & Pemukiman',
  NULL,
  true,
  'Batang',
  'Stems',
  '[FOTO: Dokumentasi_C_Flora_Iron_Mus_2025.jpg]',
  '{"2024":{"count":1132,"budget":57000000,"hIndex":1.508},"2025":{"count":1280,"budget":57000000,"hIndex":1.773}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'mangrove',
  2025,
  'Penanaman Mangrove Pesisir Serang',
  'Coastal Mangrove Conservation Serang',
  'Akumulasi 14.500 batang pohon mangrove ditanam di lahan pesisir seluas 0,40 Ha Desa Lontar.',
  'Cumulative 14,500 mangrove trees planted across 0.40 Ha coastal area in Lontar Village.',
  'Pesisir Desa Lontar (0,40 Ha)',
  NULL,
  false,
  'Batang',
  'Stems',
  '[FOTO: Dokumentasi_Mangrove_Lontar_2025.jpg]',
  '{"2021":{"count":3000,"budget":17000000},"2022":{"count":3500,"budget":17000000},"2023":{"count":7000,"budget":17000000},"2024":{"count":10500,"budget":17000000},"2025":{"count":14500,"budget":17000000}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'aves',
  2025,
  'Peningkatan Populasi Aves via Luas RTH',
  'Aves Population Enhancement in Green Space',
  'Monitoring berkala mencatat 629 ekor burung dari 32 spesies yang aktif bersarang di tajuk pohon PLTGU Cilegon.',
  'Periodic monitoring recorded 629 birds from 32 species actively nesting in the canopies of PLTGU Cilegon.',
  'Ring 1 & 2 (17,7 Ha)',
  NULL,
  false,
  'Ekor',
  'Birds',
  '[FOTO: Dokumentasi_Monitoring_Aves_2025.jpg]',
  '{"2021":{"count":369,"budget":30000000,"hIndex":2.704},"2022":{"count":487,"budget":30000000,"hIndex":2.908},"2023":{"count":487,"budget":30000000,"hIndex":2.908},"2024":{"count":624,"budget":30000000,"hIndex":2.978},"2025":{"count":629,"budget":30000000,"hIndex":3.023}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'budidaya-ikan',
  2025,
  'Budidaya Ikan Lele dan Nila Air Tawar',
  'Freshwater Catfish & Tilapia Aquaculture',
  'Pemanfaatan air non-produktif ramah lingkungan untuk budidaya ikan pangan lokal guna mendukung ketahanan pangan (SDGs poin 2 & 14).',
  'Eco-friendly water reuse for local aquaculture supporting food security and SDG targets.',
  'Ring 2 PLTGU',
  NULL,
  true,
  'Ekor',
  'Fish',
  '[FOTO: Dokumentasi_Budidaya_Ikan_2025.jpg]',
  '{"2025":{"count":31,"budget":1000000,"hIndex":0.65}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'apotek-hidup',
  2025,
  'Apotek Hidup Ring 1',
  'Ring 1 Herbal Garden',
  'Ekspansi koleksi tanaman obat herbal menjadi 96 batang yang terkelola rapi.',
  'Expansion of herbal medicine collection reaching 96 well-maintained plants.',
  'Ring 1 (0,006 Ha)',
  NULL,
  false,
  'Batang',
  'Stems',
  '[FOTO: Dokumentasi_Apotek_Hidup_2025.jpg]',
  '{"2021":{"count":19,"budget":10000000},"2022":{"count":19,"budget":10000000},"2023":{"count":73,"budget":10000000},"2024":{"count":85,"budget":10000000},"2025":{"count":96,"budget":10000000}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'biowing-connect',
  2026,
  'BIOWING CONNECT: Natural Bird-Assisted Regeneration',
  'BIOWING CONNECT: Natural Bird-Assisted Regeneration',
  'Digitalisasi pencatatan flora liar yang tumbuh alami dibantu penyebaran benih oleh populasi burung di kawasan konservasi.',
  'Digital recording system for flora species naturally regenerating through bird seed dispersal across the reserve.',
  'Ring 1 & Ring 2',
  NULL,
  true,
  'Batang',
  'Stems',
  '/img/laporan/2026/biowing-connect-system.png',
  '{"2026":{"count":4471,"budget":2000000}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'pelestarian-alami',
  2026,
  'Pelestarian Alami Flora PLTGU Cilegon',
  'Natural Flora Preservation in PLTGU Cilegon',
  'Pemantauan komprehensif 137 spesies pohon dengan keberadaan 1 spesies Kritis (CR: Palem Botol) dan 6 spesies Terancam Punah (EN).',
  'Comprehensive monitoring of 137 tree species including 1 Critically Endangered (CR: Bottle Palm) and 6 Endangered (EN) species.',
  'Ring 1 (17,7 Ha)',
  NULL,
  false,
  'Batang',
  'Stems',
  '/img/laporan/2026/pelestarian-alami-kehati-2026.png',
  '{"2022":{"count":1854,"budget":30000000,"hIndex":3.026},"2023":{"count":1858,"budget":30000000,"hIndex":3.111},"2024":{"count":2493,"budget":30000000,"hIndex":3.196},"2025":{"count":2983,"budget":30000000,"hIndex":3.313},"2026":{"count":4471,"budget":30000000,"hIndex":3.374}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'mangrove',
  2026,
  'Penanaman Mangrove Pesisir Serang',
  'Serang Coastal Mangrove Restoration',
  'Total kumulatif mencapai 19.000 batang bibit mangrove Rhizophora apiculata di lahan konservasi seluas 0,45 Ha Desa Lontar.',
  'Cumulative 19,000 Rhizophora apiculata mangrove trees flourishing across 0.45 Ha conservation zone in Lontar Village.',
  'Pesisir Desa Lontar (0,45 Ha)',
  NULL,
  false,
  'Batang',
  'Stems',
  '/img/laporan/2026/penanaman-mangrove-2026.png',
  '{"2022":{"count":3500,"budget":17000000},"2023":{"count":7000,"budget":17000000},"2024":{"count":10500,"budget":17000000},"2025":{"count":14500,"budget":17000000},"2026":{"count":19000,"budget":17000000}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'aves',
  2026,
  'Peningkatan Populasi Aves via Luas RTH',
  'Aves Population Growth in Green Open Space',
  'Lonjakan populasi burung mencapai 1.122 ekor dari 37 jenis burung, termasuk spesies baru seperti Cinenen Jawa dan Merbah Cerukcuk.',
  'Surge in bird population reaching 1,122 birds from 37 species, including newly documented species like Javan Tailorbird.',
  'Ring 1 & 2 (17,7 Ha)',
  NULL,
  false,
  'Ekor',
  'Birds',
  '/img/laporan/2026/peningkatan-pengamatan-jumlah-aves-2026.png',
  '{"2022":{"count":487,"budget":30000000,"hIndex":2.908},"2023":{"count":487,"budget":30000000,"hIndex":2.908},"2024":{"count":624,"budget":30000000,"hIndex":3.006},"2025":{"count":629,"budget":30000000,"hIndex":3.075},"2026":{"count":1122,"budget":30000000,"hIndex":3.267}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'c-flora',
  2026,
  'C – Flora: Sustainable Cycle Smart Watering',
  'C – Flora: Sustainable Cycle Smart Watering',
  'Pengembangan bibit mandiri berbasis IoT Iron Mus mencapai 1.840 bibit siap tanam untuk masyarakat dan unit kerja.',
  'IoT Iron Mus seedling development yielding 1,840 ready-to-plant trees for local community and company area.',
  'Ring 1 & Pemukiman',
  NULL,
  true,
  'Batang',
  'Stems',
  '/img/laporan/2026/sustainable-cycle-smart-watering.png',
  '{"2024":{"count":1132,"budget":57000000},"2025":{"count":1276,"budget":57000000},"2026":{"count":1840,"budget":2000000}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'apotek-hidup',
  2026,
  'Apotek Hidup Ring 1',
  'Apotek Hidup Ring 1 Herbal Sanctuary',
  'Penambahan varietas obat tradisional seperti Keji Beling, Temu Ireng, Brotowali, dan Lemon hingga total 179 tanaman.',
  'Addition of traditional herbal varieties reaching a total of 179 medicinal plants.',
  'Ring 1 (0,006 Ha)',
  NULL,
  false,
  'Batang',
  'Stems',
  '/img/laporan/2026/Apotek-hidup.png',
  '{"2022":{"count":19,"budget":10000000},"2023":{"count":73,"budget":10000000},"2024":{"count":84,"budget":10000000},"2025":{"count":96,"budget":10000000},"2026":{"count":179,"budget":10000000}}'::jsonb
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
  history = EXCLUDED.history;
INSERT INTO public.kehati_programs (
  id, year, name_id, name_en, desc_id, desc_en, ring, land_area, innovation, unit_id, unit_en, photo_placeholder, history
) VALUES (
  'budidaya-nila',
  2026,
  'Budidaya Ikan Nila Air Tawar Ramah Lingkungan',
  'Eco-friendly Tilapia Aquaculture',
  'Optimalisasi pemanfaatan air sirkulasi ramah lingkungan untuk kolam bioflok ikan nila produktif.',
  'Optimized circulation water reuse for biofloc tilapia aquaculture.',
  'Ring 2 PLTGU',
  NULL,
  false,
  'Ekor',
  'Fish',
  '/img/laporan/2026/Kolam-Nila.png',
  '{"2025":{"count":20,"budget":1000000},"2026":{"count":42,"budget":1000000}}'::jsonb
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
  history = EXCLUDED.history;

-- ==============================================================================
-- DATA SEED: SPECIES INVENTORY (FLORA & FAUNA 2023 - 2026)
-- ==============================================================================
DELETE FROM public.kehati_species;
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'flora', 1, 'Pohon Pelangi', 'Eucalyptus deglupta', 'VU', false, 'Batang', '{"2023":289}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'flora', 2, 'Pucuk Merah', 'Syzygium oleana', 'LC', false, 'Batang', '{"2023":260}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'flora', 3, 'Mangga', 'Mangifera indica', 'LC', false, 'Batang', '{"2023":237}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'flora', 4, 'Lamtoro', 'Leucaena leucocephala', 'LC', false, 'Batang', '{"2023":160}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'flora', 5, 'Mahoni', 'Swietenia mahagoni', 'NT', false, 'Batang', '{"2023":101}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'flora', 6, 'Palem Merah', 'Cyrtostachys renda', 'LC', false, 'Batang', '{"2023":100}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'flora', 7, 'Trembesi', 'Albizia saman', 'LC', false, 'Batang', '{"2023":78}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'flora', 8, 'Angsana', 'Pterocarpus indicus', 'EN', false, 'Batang', '{"2023":76}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'flora', 9, 'Glodokan Tiang', 'Polyalthia longifolia', 'LC', false, 'Batang', '{"2023":72}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'flora', 10, 'Tabebuya', 'Tabebuia chrysantha', 'LC', false, 'Batang', '{"2023":63}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'flora', 11, 'Biola Cantik', 'Ficus lyrata', 'LC', false, 'Batang', '{"2023":56}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'flora', 12, 'Kelengkeng', 'Dimocarpus longan', 'LC', false, 'Batang', '{"2023":34}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'flora', 13, 'Cemara', 'Casuarina sp.', 'LC', false, 'Batang', '{"2023":34}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'flora', 14, 'Kelapa', 'Cocos nucifera', 'LC', false, 'Batang', '{"2023":24}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'flora', 15, 'Jambu Air', 'Syzygium aqueum', 'LC', false, 'Batang', '{"2023":23}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'flora', 16, 'Jati', 'Tectona grandis', 'EN', false, 'Batang', '{"2023":18}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'flora', 17, 'Ketapang Kencana', 'Terminalia mantaly', 'LC', false, 'Batang', '{"2023":13}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'flora', 18, 'Buni', 'Antidesma bunius', 'LC', false, 'Batang', '{"2023":12}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'flora', 19, 'Kersen', 'Muntingia calabura', 'LC', false, 'Batang', '{"2023":11}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'flora', 20, 'Pohon Mangrove', 'Rhizophora apiculata', 'LC', false, 'Batang', '{"2023":3500}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'fauna', 1, 'Burung gereja Erasia', 'Passer montanus', NULL, false, 'Ekor', '{"2023":64}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'fauna', 2, 'Cucak Kutilang', 'Pycnonotus aurigaster', NULL, false, 'Ekor', '{"2023":60}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'fauna', 3, 'Bondol Peking', 'Lonchura punctulata', NULL, false, 'Ekor', '{"2023":59}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'fauna', 4, 'Walet Linci', 'Collocalia linchi', NULL, false, 'Ekor', '{"2023":54}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'fauna', 5, 'Bondol Jawa', 'Lonchura leucogastroides', NULL, false, 'Ekor', '{"2023":27}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'fauna', 6, 'Ibis Rokoroko', 'Plegadis falcinellus', NULL, true, 'Ekor', '{"2023":25}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'fauna', 7, 'Bondol Haji', 'Lonchura maja', NULL, false, 'Ekor', '{"2023":22}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'fauna', 8, 'Tekukur Biasa', 'Spilopelia chinensis', NULL, false, 'Ekor', '{"2023":17}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'fauna', 9, 'Layang-Layang Batu', 'Hirundo tahitica', NULL, false, 'Ekor', '{"2023":14}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'fauna', 10, 'Burung madu Sriganti', 'Cinnyris jugularis', NULL, false, 'Ekor', '{"2023":14}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'fauna', 11, 'Cabai Jawa', 'Dicaeum trochileum', NULL, false, 'Ekor', '{"2023":14}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'fauna', 12, 'Kekep Babi', 'Artamus leucoryn', NULL, false, 'Ekor', '{"2023":13}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'fauna', 13, 'Cinenen Pisang', 'Orthotomus sutorius', NULL, false, 'Ekor', '{"2023":12}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'fauna', 14, 'Kapinis Rumah', 'Apus nipalensis', NULL, false, 'Ekor', '{"2023":11}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'fauna', 15, 'Remetuk Laut', 'Gerygone sulphurea', NULL, false, 'Ekor', '{"2023":11}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'fauna', 16, 'Alap-alap Sapi', 'Falco moluccensis', NULL, true, 'Ekor', '{"2023":1}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2023, 'fauna', 17, 'Domba Garut', 'Ovis aries', NULL, false, 'Ekor', '{"2023":170}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'flora', 1, 'Pohon Pelangi', 'Eucalyptus deglupta', 'VU', false, 'Batang', '{"2024":417}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'flora', 2, 'Pucuk Merah', 'Syzygium oleana', 'LC', false, 'Batang', '{"2024":324}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'flora', 3, 'Mangga', 'Mangifera indica', 'LC', false, 'Batang', '{"2024":274}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'flora', 4, 'Lamtoro', 'Leucaena leucocephala', 'LC', false, 'Batang', '{"2024":245}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'flora', 5, 'Palem Raja', 'Roystonea regia', 'LC', false, 'Batang', '{"2024":160}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'flora', 6, 'Mahoni', 'Swietenia mahagoni', 'NT', false, 'Batang', '{"2024":103}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'flora', 7, 'Angsana', 'Pterocarpus indicus', 'EN', false, 'Batang', '{"2024":96}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'flora', 8, 'Glodokan Tiang', 'Polyalthia longifolia', 'LC', false, 'Batang', '{"2024":92}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'flora', 9, 'Tabebuya', 'Handroanthus chrysotrichus', 'LC', false, 'Batang', '{"2024":86}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'flora', 10, 'Trembesi', 'Albizia saman', 'LC', false, 'Batang', '{"2024":84}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'flora', 11, 'Biola Cantik', 'Ficus lyrata', 'LC', false, 'Batang', '{"2024":63}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'flora', 12, 'Anting Putri', 'Wrightia religiosa', 'LC', false, 'Batang', '{"2024":29}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'flora', 13, 'Jambu Air', 'Syzygium aqueum', 'LC', false, 'Batang', '{"2024":28}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'flora', 14, 'Palem Ekor Tupai', 'Wodyetia bifurcata', 'LC', false, 'Batang', '{"2024":27}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'flora', 15, 'Delima', 'Punica granatum', 'LC', false, 'Batang', '{"2024":27}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'flora', 16, 'Kelapa', 'Cocos nucifera', 'LC', false, 'Batang', '{"2024":25}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'flora', 17, 'Kelengkeng', 'Dimocarpus longan', 'LC', false, 'Batang', '{"2024":24}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'flora', 18, 'Pandan Bali', 'Cordyline australis', 'LC', false, 'Batang', '{"2024":23}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'flora', 19, 'Jati', 'Tectona grandis', 'EN', false, 'Batang', '{"2024":18}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'flora', 20, 'Cemara Kipas', 'Thuja occidentalis', 'LC', false, 'Batang', '{"2024":18}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'flora', 21, 'Pohon Mangrove', 'Rhizophora apiculata', 'LC', false, 'Batang', '{"2024":10500}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'fauna', 1, 'Burung gereja Erasia', 'Passer montanus', NULL, false, 'Ekor', '{"2024":67}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'fauna', 2, 'Cucak Kutilang', 'Pycnonotus aurigaster', NULL, false, 'Ekor', '{"2024":67}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'fauna', 3, 'Bondol Peking', 'Lonchura punctulata', NULL, false, 'Ekor', '{"2024":64}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'fauna', 4, 'Walet Linci', 'Collocalia linchi', NULL, false, 'Ekor', '{"2024":61}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'fauna', 5, 'Blekok Sawah', 'Ardeola speciosa', NULL, false, 'Ekor', '{"2024":34}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'fauna', 6, 'Bondol Haji', 'Lonchura maja', NULL, false, 'Ekor', '{"2024":34}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'fauna', 7, 'Kekep Babi', 'Artamus leucoryn', NULL, false, 'Ekor', '{"2024":34}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'fauna', 8, 'Layang-Layang Batu', 'Hirundo tahitica', NULL, false, 'Ekor', '{"2024":29}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'fauna', 9, 'Bondol Jawa', 'Lonchura leucogastroides', NULL, false, 'Ekor', '{"2024":28}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'fauna', 10, 'Bunglon Kebun', 'Calotes versicolor', NULL, false, 'Ekor', '{"2024":27}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'fauna', 11, 'Dederuk Jawa', 'Streptopelia bitorquata', NULL, false, 'Ekor', '{"2024":24}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'fauna', 12, 'Ibis Rokoroko', 'Plegadis falcinellus', NULL, true, 'Ekor', '{"2024":23}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'fauna', 13, 'Biawak Air', 'Varanus salvator', NULL, false, 'Ekor', '{"2024":18}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'fauna', 14, 'Penyu Lekang', 'Lepidochelys olivacea', 'VU', true, 'Ekor', '{"2024":2}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'fauna', 15, 'Alap-alap Sapi', 'Falco moluccensis', NULL, true, 'Ekor', '{"2024":1}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2024, 'fauna', 16, 'Domba Garut', 'Ovis aries', NULL, false, 'Ekor', '{"2024":244}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'flora', 1, 'Pohon Pelangi', 'Eucalyptus deglupta', 'VU', false, 'Batang', '{"2025":428}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'flora', 2, 'Pucuk Merah', 'Syzygium oleana', 'LC', false, 'Batang', '{"2025":342}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'flora', 3, 'Lamtoro', 'Leucaena leucocephala', 'LC', false, 'Batang', '{"2025":308}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'flora', 4, 'Mangga', 'Mangifera indica', 'LC', false, 'Batang', '{"2025":299}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'flora', 5, 'Glodokan Tiang', 'Polyalthia longifolia', 'LC', false, 'Batang', '{"2025":222}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'flora', 6, 'Trembesi', 'Albizia saman', 'LC', false, 'Batang', '{"2025":170}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'flora', 7, 'Palem Raja', 'Roystonea regia', 'LC', false, 'Batang', '{"2025":160}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'flora', 8, 'Mahoni', 'Swietenia mahagoni', 'NT', false, 'Batang', '{"2025":153}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'flora', 9, 'Angsana', 'Pterocarpus indicus', 'EN', false, 'Batang', '{"2025":135}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'flora', 10, 'Tabebuya', 'Handroanthus chrysotrichus', 'VU', false, 'Batang', '{"2025":116}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'flora', 11, 'Asam Jawa', 'Tamarindus indica', 'LC', false, 'Batang', '{"2025":65}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'flora', 12, 'Biola Cantik', 'Ficus lyrata', 'LC', false, 'Batang', '{"2025":63}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'flora', 13, 'Jambu Air', 'Syzygium aqueum', 'LC', false, 'Batang', '{"2025":62}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'flora', 14, 'Kelapa', 'Cocos nucifera', 'LC', false, 'Batang', '{"2025":43}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'flora', 15, 'Kelengkeng', 'Dimocarpus longan', 'LC', false, 'Batang', '{"2025":39}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'flora', 16, 'Delima', 'Punica granatum', 'LC', false, 'Batang', '{"2025":38}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'flora', 17, 'Ketapang', 'Terminalia catappa', 'LC', false, 'Batang', '{"2025":32}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'flora', 18, 'Anting Putri', 'Wrightia religiosa', 'LC', false, 'Batang', '{"2025":29}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'flora', 19, 'Palem Bambu', 'Chamaedorea seifrizii', 'LC', false, 'Batang', '{"2025":28}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'flora', 20, 'Pohon Mangrove', 'Rhizophora apiculata', 'LC', false, 'Batang', '{"2025":14500}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'fauna', 1, 'Burung gereja Erasia', 'Passer montanus', NULL, false, 'Ekor', '{"2025":77}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'fauna', 2, 'Cucak Kutilang', 'Pycnonotus aurigaster', NULL, false, 'Ekor', '{"2025":67}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'fauna', 3, 'Bondol Peking', 'Lonchura punctulata', NULL, false, 'Ekor', '{"2025":66}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'fauna', 4, 'Walet Linci', 'Collocalia linchi', NULL, false, 'Ekor', '{"2025":47}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'fauna', 5, 'Bondol Haji', 'Lonchura maja', NULL, false, 'Ekor', '{"2025":37}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'fauna', 6, 'Layang-Layang Batu', 'Hirundo tahitica', NULL, false, 'Ekor', '{"2025":34}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'fauna', 7, 'Walet Sarang putih', 'Aerodramus fuciphagus', NULL, false, 'Ekor', '{"2025":32}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'fauna', 8, 'Blekok Sawah', 'Ardeola speciosa', NULL, false, 'Ekor', '{"2025":25}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'fauna', 9, 'Bondol Jawa', 'Lonchura leucogastroides', NULL, false, 'Ekor', '{"2025":24}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'fauna', 10, 'Kapinis Laut', 'Apus pacificus', NULL, false, 'Ekor', '{"2025":23}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'fauna', 11, 'Kapinis Rumah', 'Apus nipalensis', NULL, false, 'Ekor', '{"2025":21}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'fauna', 12, 'Biawak Air', 'Varanus salvator', NULL, false, 'Ekor', '{"2025":21}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'fauna', 13, 'Remetuk Laut', 'Gerygone sulphurea', NULL, false, 'Ekor', '{"2025":20}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'fauna', 14, 'Ikan Nila', 'Oreochromis niloticus', NULL, false, 'Ekor', '{"2025":20}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'fauna', 15, 'Ikan Lele', 'Clarias batrachus', NULL, false, 'Ekor', '{"2025":11}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'fauna', 16, 'Penyu Lekang', 'Lepidochelys olivacea', 'VU', true, 'Ekor', '{"2025":2}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2025, 'fauna', 17, 'Alap-alap Sapi', 'Falco moluccensis', NULL, true, 'Ekor', '{"2025":1}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 1, 'Lamtoro', 'Leucaena leucocephala', 'LC', false, 'Batang', '{"2026":857}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 2, 'Mangga', 'Mangifera indica', 'LC', false, 'Batang', '{"2026":661}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 3, 'Pohon Pelangi', 'Eucalyptus deglupta', 'VU', false, 'Batang', '{"2026":437}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 4, 'Pucuk Merah', 'Syzygium oleana', 'LC', false, 'Batang', '{"2026":331}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 5, 'Angsana', 'Pterocarpus indicus', 'EN', false, 'Batang', '{"2026":172}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 6, 'Jambu Air', 'Syzygium aqueum', 'LC', false, 'Batang', '{"2026":124}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 7, 'Palem Raja', 'Roystonea regia', 'LC', false, 'Batang', '{"2026":124}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 8, 'Mahoni', 'Swietenia mahagoni', 'NT', false, 'Batang', '{"2026":123}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 9, 'Tabebuya', 'Handroanthus chrysotrichus', 'VU', false, 'Batang', '{"2026":118}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 10, 'Beringin Biola', 'Ficus lyrata', 'LC', false, 'Batang', '{"2026":115}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 11, 'Delima', 'Punica granatum', 'LC', false, 'Batang', '{"2026":101}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 12, 'Pleomele', 'Dracaena reflexa Lam.', 'LC', false, 'Batang', '{"2026":92}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 13, 'Glodokan Tiang', 'Polyalthia longifolia', 'LC', false, 'Batang', '{"2026":85}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 14, 'Trembesi', 'Albizia saman', 'LC', false, 'Batang', '{"2026":85}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 15, 'Kelengkeng', 'Dimocarpus longan', 'LC', false, 'Batang', '{"2026":81}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 16, 'Jambu Biji', 'Psidium guajava', 'LC', false, 'Batang', '{"2026":63}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 17, 'Lengkuas', 'Alpinia galanga', 'LC', false, 'Batang', '{"2026":44}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 18, 'Kamboja Merah', 'Plumeria rubra', 'LC', false, 'Batang', '{"2026":45}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 19, 'Dracena Bintik Emas', 'Dracaena surculosa', 'LC', false, 'Batang', '{"2026":43}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 20, 'Anting Putri', 'Wrightia religiosa', 'LC', false, 'Batang', '{"2026":40}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 21, 'Pandan Bali', 'Cordyline australis', 'LC', false, 'Batang', '{"2026":34}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 22, 'Kaliandra Merah', 'Calliandra calothyrsus', 'LC', false, 'Batang', '{"2026":30}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 23, 'Jamblang / Juwet', 'Syzygium cumini', 'LC', false, 'Batang', '{"2026":29}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 24, 'Palem Botol', 'Hyophorbe lagenicaulis', 'CR', false, 'Batang', '{"2026":9}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 25, 'Keruing Bunga', 'Dipterocarpus hasseltii', 'EN', false, 'Batang', '{"2026":2}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 26, 'Mersawa Daun Lebar', 'Anisoptera costata', 'EN', false, 'Batang', '{"2026":3}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 27, 'Damar Mata Kucing', 'Shorea javanica', 'EN', false, 'Batang', '{"2026":3}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 28, 'Jati', 'Tectona grandis', 'EN', false, 'Batang', '{"2026":15}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'flora', 29, 'Pohon Mangrove', 'Rhizophora apiculata', 'LC', false, 'Batang', '{"2026":19000}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 1, 'Burung gereja Erasia', 'Passer montanus', NULL, false, 'Ekor', '{"2026":161}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 2, 'Cucak Kutilang', 'Pycnonotus aurigaster', NULL, false, 'Ekor', '{"2026":155}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 3, 'Bondol Peking', 'Lonchura punctulata', NULL, false, 'Ekor', '{"2026":136}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 4, 'Walet Linci', 'Collocalia linchi', NULL, false, 'Ekor', '{"2026":92}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 5, 'Bondol Haji', 'Lonchura maja', NULL, false, 'Ekor', '{"2026":80}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 6, 'Bondol Jawa', 'Lonchura leucogastroides', NULL, false, 'Ekor', '{"2026":62}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 7, 'Layang-Layang Batu', 'Hirundo tahitica', NULL, false, 'Ekor', '{"2026":38}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 8, 'Walet Sarang putih', 'Aerodramus fuciphagus', NULL, false, 'Ekor', '{"2026":35}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 9, 'Cabai Jawa', 'Dicaeum trochileum', NULL, false, 'Ekor', '{"2026":29}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 10, 'Blekok Sawah', 'Ardeola speciosa', NULL, false, 'Ekor', '{"2026":28}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 11, 'Kapinis Laut', 'Apus pacificus', NULL, false, 'Ekor', '{"2026":27}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 12, 'Kapinis Rumah', 'Apus nipalensis', NULL, false, 'Ekor', '{"2026":25}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 13, 'Remetuk Laut', 'Gerygone sulphurea', NULL, false, 'Ekor', '{"2026":23}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 14, 'Cinenen Pisang', 'Orthotomus sutorius', NULL, false, 'Ekor', '{"2026":22}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 15, 'Biawak Air', 'Varanus salvator', NULL, false, 'Ekor', '{"2026":22}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 16, 'Perkutut Jawa', 'Geopelia striata', NULL, false, 'Ekor', '{"2026":21}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 17, 'Bunglon Kebun', 'Calotes versicolor', NULL, false, 'Ekor', '{"2026":21}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 18, 'Burung madu Sriganti', 'Cinnyris jugularis', NULL, false, 'Ekor', '{"2026":20}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 19, 'Cekakak Laut', 'Todiramphus chloris', NULL, false, 'Ekor', '{"2026":20}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 20, 'Layang-layang Loreng', 'Cecropis striolata', NULL, false, 'Ekor', '{"2026":19}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 21, 'Kekep Babi', 'Artamus leucoryn', NULL, false, 'Ekor', '{"2026":17}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 22, 'Merbah Cerukcuk', 'Pycnonotus goiavier', NULL, false, 'Ekor', '{"2026":15}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 23, 'Kuntul Kecil', 'Egretta garzetta', NULL, false, 'Ekor', '{"2026":14}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 24, 'Ibis Rokoroko', 'Plegadis falcinellus', NULL, true, 'Ekor', '{"2026":13}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 25, 'Kokokan Laut', 'Butorides striatus', NULL, false, 'Ekor', '{"2026":12}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 26, 'Cinenen Jawa', 'Orthotomus sepium', NULL, false, 'Ekor', '{"2026":9}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 27, 'Alap-alap Sapi', 'Falco moluccensis', NULL, true, 'Ekor', '{"2026":3}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 28, 'Penyu Lekang', 'Lepidochelys olivacea', 'VU', true, 'Ekor', '{"2026":2}'::jsonb);
INSERT INTO public.kehati_species (year, category, sort_no, local_name, scientific_name, iucn, is_protected_indo, unit, history)
VALUES (2026, 'fauna', 29, 'Ikan Nila', 'Oreochromis niloticus', NULL, false, 'Ekor', '{"2026":42}'::jsonb);

-- ==============================================================================
-- DATA SEED: GALLERY ASSETS & PHOTOGRAPHY ITEMS
-- ==============================================================================
INSERT INTO public.kehati_gallery_items (
  id, name, category, category_key, location, badge, description, cover_image, detail_images, stats, sort_order
) VALUES (
  'item-0',
  'Taman Kehati Ring 1 PLTGU',
  'Flora & Lanskap',
  'flora',
  'Kawasan Konservasi Ring 1',
  '137 Spesies',
  'Kawasan konservasi flora seluas 17.7 hektar dengan keanekaragaman pohon langka dan endemik yang dikelola secara berkelanjutan.',
  '/images/kehati-showcase/taman-kehati.jpg',
  '["/images/kehati-showcase/taman-kehati.jpg","/images/gallery/product-1.webp","/images/gallery/product-1-detail-1.webp","/images/gallery/product-1-detail-2.webp"]'::jsonb,
  '23.670 Batang Flora Terpantau',
  1
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
  updated_at = now();
INSERT INTO public.kehati_gallery_items (
  id, name, category, category_key, location, badge, description, cover_image, detail_images, stats, sort_order
) VALUES (
  'item-1',
  'Biowing Connect & Avifauna',
  'Fauna & Satwa',
  'fauna',
  'Zona Suaka Burung Ring 1 & 2',
  '52 Spesies Satwa',
  'Sistem regenerasi hayati alami berbantu satwa burung lokal dan pemantauan 1.122 individu aves di area penyangga.',
  '/img/laporan/2026/biowing-connect-system.png',
  '["/img/laporan/2026/biowing-connect-system.png","/images/kehati-showcase/suaka-fauna.jpg","/images/gallery/product-2.webp","/images/gallery/product-2-detail-1.webp"]'::jsonb,
  '1.122 Individu Aves Teridentifikasi',
  2
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
  updated_at = now();
INSERT INTO public.kehati_gallery_items (
  id, name, category, category_key, location, badge, description, cover_image, detail_images, stats, sort_order
) VALUES (
  'item-2',
  'Restorasi Mangrove Pesisir',
  'Ekosistem Pesisir',
  'mangrove',
  'Pesisir Desa Lontar, Kec. Tirtayasa',
  '19.000 Bibit',
  'Rehabilitasi pesisir pantai kritis dengan penanaman kumulatif 19.000 pohon Rhizophora apiculata bersama DLH Kab. Serang.',
  '/images/kehati-showcase/restorasi-mangrove.jpg',
  '["/images/kehati-showcase/restorasi-mangrove.jpg","/img/laporan/2026/penanaman-mangrove-2026.png","/images/gallery/product-3.webp","/images/gallery/product-3-detail-1.webp"]'::jsonb,
  '0.45 Ha Tutupan Mangrove Lestari',
  3
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
  updated_at = now();
INSERT INTO public.kehati_gallery_items (
  id, name, category, category_key, location, badge, description, cover_image, detail_images, stats, sort_order
) VALUES (
  'item-3',
  'C-Flora Smart Watering IoT',
  'Inovasi Sirkular',
  'inovasi',
  'Nursery & Kebun Pembibitan',
  'Smart IoT',
  'Sistem otomasi penyiraman cerdas berbasis sensor kelembaban tanah dan sirkularitas air kondensat ramah energi.',
  '/img/laporan/2026/sustainable-cycle-smart-watering.png',
  '["/img/laporan/2026/sustainable-cycle-smart-watering.png","/images/kehati-showcase/nursery-pembibitan.jpg","/images/gallery/product-4.webp","/images/gallery/product-4-detail-1.webp"]'::jsonb,
  '100% Efisiensi Air Kondensat',
  4
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
  updated_at = now();
INSERT INTO public.kehati_gallery_items (
  id, name, category, category_key, location, badge, description, cover_image, detail_images, stats, sort_order
) VALUES (
  'item-4',
  'Suaka Flora Pohon Pelangi & Langka',
  'Flora & Lanskap',
  'flora',
  'Taman Edukasi Kehati',
  'Flora Endemik',
  'Koleksi pohon langka bernilai konservasi tinggi seperti Eucalyptus deglupta, Pohon Gaharu, Angsana, dan Mahoni.',
  '/images/kehati-showcase/koridor-hijau.jpg',
  '["/images/kehati-showcase/koridor-hijau.jpg","/images/gallery/product-5.webp","/images/gallery/product-5-detail-1.webp","/images/gallery/product-5-detail-2.webp"]'::jsonb,
  'Indeks Keanekaragaman H'' 3.374',
  5
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
  updated_at = now();
INSERT INTO public.kehati_gallery_items (
  id, name, category, category_key, location, badge, description, cover_image, detail_images, stats, sort_order
) VALUES (
  'item-5',
  'Eco Pond & Wetland Konservasi',
  'Ekosistem Air',
  'inovasi',
  'Kolam Konservasi Ring 1',
  'Sirkular Air',
  'Wetland alami penyaring air yang menjadi mikrohabitat beragam ikan lokal, capung, dan amfibi penyangga keseimbangan lingkungan.',
  '/images/kehati-showcase/eco-pond.jpg',
  '["/images/kehati-showcase/eco-pond.jpg","/img/laporan/2026/Kolam-Nila.png","/images/gallery/product-6.webp","/images/gallery/product-6-detail-1.webp"]'::jsonb,
  'Kualitas Air Baku Mutu Kelas II',
  6
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
  updated_at = now();
INSERT INTO public.kehati_gallery_items (
  id, name, category, category_key, location, badge, description, cover_image, detail_images, stats, sort_order
) VALUES (
  'item-6',
  'Apotek Hidup & Tanaman Obat',
  'Pemberdayaan Masyarakat',
  'flora',
  'Kawasan Binaan Masyarakat',
  'Pemberdayaan',
  'Budidaya tanaman obat keluarga (TOGA) bersama kelompok tani binaan CSR PLTGU Cilegon untuk kemandirian herbal.',
  '/img/laporan/2026/Apotek-hidup.png',
  '["/img/laporan/2026/Apotek-hidup.png","/images/gallery/product-7.webp","/images/gallery/product-7-detail-1.webp","/images/gallery/product-7-detail-2.webp"]'::jsonb,
  '45+ Varietas Tanaman Obat Herbal',
  7
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
  updated_at = now();
INSERT INTO public.kehati_gallery_items (
  id, name, category, category_key, location, badge, description, cover_image, detail_images, stats, sort_order
) VALUES (
  'item-7',
  'Kompleks PLTGU Cilegon 740 MW',
  'Infrastruktur Hijau',
  'inovasi',
  'Margasari, Puloampel, Banten',
  'PROPER Emas',
  'Pembangkit listrik tenaga gas uap modern berteknologi tinggi yang beroperasi berdampingan harmonis dengan kelestarian alam.',
  '/images/pltgu-cilegon-2.png',
  '["/images/pltgu-cilegon-2.png","/images/pembangkit.JPG","/images/gallery/product-8.webp","/images/gallery/product-8-detail-1.webp"]'::jsonb,
  '740 MW Listrik Bersih Rendah Emisi',
  8
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
  updated_at = now();
