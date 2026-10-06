import Link from 'next/link';
import { BarChart3, Trees, Bird, Waves, Sparkles, Award } from 'lucide-react';
import { requireCmsUser } from '@/lib/cms-auth';
import { getAllReports, getYoyChartData } from '@/lib/supabase/kehati';

export const dynamic = 'force-dynamic';

export default async function CmsReportsPage() {
  await requireCmsUser();
  const [reports, yoyData] = await Promise.all([
    getAllReports(),
    getYoyChartData()
  ]);

  const yearList = Object.values(reports).sort((a, b) => b.year - a.year);

  return (
    <div className="cms-page">
      <header className="cms-page-header">
        <div>
          <p className="cms-eyebrow">Database Konservasi</p>
          <h1>Indikator & Laporan Kehati</h1>
          <p>Seluruh data capaian keanekaragaman hayati 2023 – 2026 yang tersimpan di Supabase.</p>
        </div>
        <Link className="cms-button cms-button-primary" href="/laporan" target="_blank">
          Lihat Halaman Publik
        </Link>
      </header>

      {/* YoY Summary Grid */}
      <section className="cms-panel cms-raised" style={{ marginBottom: '1.5rem' }}>
        <div className="cms-panel-heading">
          <div>
            <h2>Tren Indikator Tahunan (YoY)</h2>
            <p>Data deret waktu pemantauan keanekaragaman hayati.</p>
          </div>
        </div>
        <div className="cms-table-wrap">
          <table className="cms-table">
            <thead>
              <tr>
                <th>Tahun</th>
                <th>Total Flora</th>
                <th>Total Fauna</th>
                <th>Mangrove</th>
                <th>Aves</th>
                <th>H&apos; Flora</th>
                <th>H&apos; Fauna</th>
              </tr>
            </thead>
            <tbody>
              {yoyData.map((row) => (
                <tr key={row.year}>
                  <td><strong>{row.year}</strong></td>
                  <td>{row.flora.toLocaleString('id-ID')} btg</td>
                  <td>{row.fauna.toLocaleString('id-ID')} ekor</td>
                  <td>{row.mangrove.toLocaleString('id-ID')} btg</td>
                  <td>{row.aves.toLocaleString('id-ID')} ekor</td>
                  <td>{row.hFlora ?? '-'}</td>
                  <td>{row.hFauna ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reports per year */}
      <section className="cms-panel cms-raised">
        <div className="cms-panel-heading">
          <div>
            <h2>Laporan Tahunan Terdaftar</h2>
            <p>Metadata pengesahan, inovasi unggulan, dan program per tahun.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {yearList.map((rep) => (
            <div key={rep.year} style={{ padding: '1.25rem', border: '1px solid #E5E7EB', borderRadius: '12px', background: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#111827' }}>
                    Laporan Kehati Tahun {rep.year}
                  </h3>
                  <small style={{ color: '#6B7280' }}>
                    Periode: {rep.periodId} | Disahkan: {rep.date}
                  </small>
                </div>
                <Link 
                  href={`/laporan/${rep.year}`} 
                  target="_blank"
                  className="cms-button"
                  style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem', background: '#FFFFFF' }}
                >
                  Buka Laporan {rep.year} →
                </Link>
              </div>

              {/* Stats badges */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <span style={{ padding: '4px 10px', background: '#ECFDF5', color: '#065F46', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600 }}>
                  🌲 {rep.totalFlora.toLocaleString('id-ID')} Flora ({rep.speciesCountFlora} Spesies)
                </span>
                <span style={{ padding: '4px 10px', background: '#EFF6FF', color: '#1E40AF', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600 }}>
                  🦅 {rep.totalAves.toLocaleString('id-ID')} Aves ({rep.totalFauna.toLocaleString('id-ID')} Satwa)
                </span>
                <span style={{ padding: '4px 10px', background: '#F0FDF4', color: '#166534', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600 }}>
                  🌊 {rep.totalMangrove.toLocaleString('id-ID')} Mangrove
                </span>
                {rep.overallHIndexFlora && (
                  <span style={{ padding: '4px 10px', background: '#FEF3C7', color: '#92400E', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600 }}>
                    📊 H&apos; Flora {rep.overallHIndexFlora} | H&apos; Fauna {rep.overallHIndexFauna}
                  </span>
                )}
              </div>

              {/* Programs */}
              <div>
                <strong style={{ fontSize: '0.88rem', color: '#374151' }}>Program Konservasi ({rep.programs.length} program):</strong>
                <ul style={{ margin: '0.35rem 0 0', paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#4B5563' }}>
                  {rep.programs.map((p) => (
                    <li key={p.id}>
                      <strong>{p.nameId}</strong> ({p.ring}) {p.innovation && <span style={{ color: '#059669', fontWeight: 600 }}>[Inovasi]</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
