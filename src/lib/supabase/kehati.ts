import { createClient } from '@supabase/supabase-js';
import { 
  YOY_CHART_DATA as defaultYoyData, 
  REPORTS_DATA as defaultReportsData,
  ReportYearData,
  ProgramSummary,
  SpeciesItem
} from '@/data/kehati-data';

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/^["']|["']$/g, '');
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim().replace(/^["']|["']$/g, '') 
    || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim().replace(/^["']|["']$/g, '');

  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });
}

export async function getYoyChartData() {
  const supabase = getSupabaseClient();
  if (!supabase) return defaultYoyData;

  try {
    const { data, error } = await supabase
      .from('kehati_yoy_indicators')
      .select('*')
      .order('year', { ascending: true });

    if (error || !data || data.length === 0) return defaultYoyData;

    return data.map((row) => ({
      year: String(row.year),
      flora: row.flora,
      fauna: row.fauna,
      mangrove: row.mangrove,
      aves: row.aves,
      hFlora: row.h_flora !== null ? Number(row.h_flora) : undefined,
      hFauna: row.h_fauna !== null ? Number(row.h_fauna) : undefined,
    }));
  } catch (e) {
    console.warn('Fallback to local YOY data:', e);
    return defaultYoyData;
  }
}

export async function getReportByYear(year: number): Promise<ReportYearData | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return defaultReportsData[year] ?? null;

  try {
    const [reportRes, programsRes, speciesRes] = await Promise.all([
      supabase.from('kehati_reports').select('*').eq('year', year).maybeSingle(),
      supabase.from('kehati_programs').select('*').eq('year', year),
      supabase.from('kehati_species').select('*').eq('year', year).order('sort_no', { ascending: true })
    ]);

    if (reportRes.error || !reportRes.data) {
      return defaultReportsData[year] ?? null;
    }

    const row = reportRes.data;

    // Build programs
    const programs: ProgramSummary[] = (programsRes.data && programsRes.data.length > 0)
      ? programsRes.data.map((p) => ({
          id: p.id,
          nameId: p.name_id,
          nameEn: p.name_en,
          descId: p.desc_id,
          descEn: p.desc_en,
          ring: p.ring,
          landArea: p.land_area,
          innovation: p.innovation,
          unitId: p.unit_id,
          unitEn: p.unit_en,
          photoPlaceholder: p.photo_placeholder || '',
          history: p.history || {}
        }))
      : defaultReportsData[year]?.programs || [];

    // Build flora and fauna list
    const speciesData = speciesRes.data || [];
    const floraList: SpeciesItem[] = speciesData
      .filter((s) => s.category === 'flora')
      .map((s) => ({
        no: s.sort_no,
        localName: s.local_name,
        scientificName: s.scientific_name,
        iucn: s.iucn,
        isProtectedIndo: s.is_protected_indo,
        unit: s.unit,
        history: s.history || {}
      }));

    const faunaList: SpeciesItem[] = speciesData
      .filter((s) => s.category === 'fauna')
      .map((s) => ({
        no: s.sort_no,
        localName: s.local_name,
        scientificName: s.scientific_name,
        iucn: s.iucn,
        isProtectedIndo: s.is_protected_indo,
        unit: s.unit,
        history: s.history || {}
      }));

    return {
      year: row.year,
      periodId: row.period_id,
      periodEn: row.period_en,
      authors: row.authors || [],
      approvers: row.approvers || [],
      date: row.approval_date,
      totalFlora: row.total_flora,
      totalFauna: row.total_fauna,
      totalMangrove: row.total_mangrove,
      totalAves: row.total_aves,
      speciesCountFlora: row.species_count_flora,
      speciesCountFauna: row.species_count_fauna,
      overallHIndexFlora: row.overall_h_index_flora ? Number(row.overall_h_index_flora) : undefined,
      overallHIndexFauna: row.overall_h_index_fauna ? Number(row.overall_h_index_fauna) : undefined,
      innovationHighlight: row.innovation_highlight,
      statusHistory: row.status_history || [],
      programs: programs.length > 0 ? programs : (defaultReportsData[year]?.programs || []),
      floraList: floraList.length > 0 ? floraList : (defaultReportsData[year]?.floraList || []),
      faunaList: faunaList.length > 0 ? faunaList : (defaultReportsData[year]?.faunaList || []),
    };
  } catch (e) {
    console.warn(`Fallback to local report data for year ${year}:`, e);
    return defaultReportsData[year] ?? null;
  }
}

export async function getAllReports(): Promise<Record<number, ReportYearData>> {
  const years = [2023, 2024, 2025, 2026];
  const entries = await Promise.all(
    years.map(async (y) => {
      const data = await getReportByYear(y);
      return [y, data] as const;
    })
  );

  const result: Record<number, ReportYearData> = {};
  for (const [y, data] of entries) {
    if (data) result[y] = data;
  }
  return result;
}

export async function getGalleryItems() {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('kehati_gallery_items')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) return null;

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      categoryKey: item.category_key,
      location: item.location,
      badge: item.badge,
      description: item.description,
      coverImage: item.cover_image,
      detailImages: item.detail_images || [],
      stats: item.stats,
    }));
  } catch (e) {
    console.warn('Fallback to local gallery items:', e);
    return null;
  }
}
