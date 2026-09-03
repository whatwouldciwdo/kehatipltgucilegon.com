'use client';

import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  TrendingUp, 
  BarChart3, 
  Trees, 
  Bird, 
  Compass, 
  DollarSign, 
  Layers, 
  Activity,
  CheckCircle2,
  Table as TableIcon
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ReportYearData, ProgramSummary } from '@/data/kehati-data';

interface ReportAnalyticsSectionProps {
  reportData: ReportYearData;
  year: number;
}

export default function ReportAnalyticsSection({ reportData, year }: ReportAnalyticsSectionProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'status' | 'absolut' | 'diversity' | 'budget'>('absolut');
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  // Program color mapping
  const programColors: Record<string, string> = {
    'pelestarian-alami': '#2d6a4f',
    'mangrove': '#0284c7',
    'aves': '#d97706',
    'c-flora': '#10b981',
    'amoniak-dogar': '#8b5cf6',
    'biowing-connect': '#ec4899',
    'apotek-hidup': '#14b8a6',
    'plasma-farming': '#6366f1',
    'budidaya-ikan': '#06b6d4',
    'budidaya-nila': '#06b6d4',
    'green-hidroponik': '#84cc16'
  };

  // 1. Program Absolut Multi-Year Data Preparation
  const allYears = Array.from(
    new Set(reportData.programs.flatMap((p) => Object.keys(p.history)))
  ).sort();

  const programChartData = allYears.map((yr) => {
    const row: Record<string, any> = { year: yr };
    reportData.programs.forEach((prog) => {
      if (prog.history[yr]) {
        row[prog.id] = prog.history[yr].count;
      }
    });
    return row;
  });

  // 2. Status Flora & Fauna Historical Data Preparation
  const statusChartData = reportData.statusHistory || [];

  // 3. Diversity Index H' Data Preparation
  const diversityData = allYears.map((yr) => {
    const row: Record<string, any> = { year: yr };
    // Check if statusHistory has H index
    const statusMatch = statusChartData.find((s) => s.year === yr);
    if (statusMatch?.hFlora) row['hFlora'] = statusMatch.hFlora;
    if (statusMatch?.hFauna) row['hFauna'] = statusMatch.hFauna;

    // Also check individual program H indices
    reportData.programs.forEach((prog) => {
      if (prog.history[yr]?.hIndex !== undefined) {
        row[`${prog.id}_h`] = prog.history[yr].hIndex;
      }
    });
    return row;
  }).filter((r) => Object.keys(r).length > 1);

  // 4. Program Budget & Summary Table Data
  const budgetTableData = reportData.programs.map((prog) => {
    const currentHist = prog.history[year.toString()] || {};
    const count = currentHist.count ?? 0;
    const budget = currentHist.budget ?? 0;
    return {
      id: prog.id,
      name: t(prog.nameId, prog.nameEn),
      ring: prog.ring,
      count,
      unit: t(prog.unitId, prog.unitEn),
      budget,
      hIndex: currentHist.hIndex
    };
  });

  const totalBudget = budgetTableData.reduce((acc, curr) => acc + curr.budget, 0);

  return (
    <div className="analytics-section">
      <div className="analytics-header">
        <div>
          <div className="badge-eco">
            <Activity size={13} />
            <span>{t('Pusat Analisis & Visualisasi Data', 'Data Analytics & Visualization Center')}</span>
          </div>
          <h2 className="section-title">
            {t(`Grafik & Analisis Keberhasilan Program (${year})`, `Program Achievement Analytics & Visualizations (${year})`)}
          </h2>
          <p className="section-desc">
            {t(
              'Eksplorasi data komprehensif mencakup capaian absolut tiap program, tren status flora & fauna, indeks keanekaragaman Shannon-Wiener (H\'), dan alokasi anggaran konservasi.',
              'Comprehensive data exploration covering absolute program outcomes, flora & fauna status trends, Shannon-Wiener diversity index (H\'), and conservation budget allocation.'
            )}
          </p>
        </div>
      </div>

      {/* Navigation Tabs for Analytics */}
      <div className="analytics-nav-bar">
        <div className="tabs-list">
          <button 
            className={`tab-btn ${activeTab === 'absolut' ? 'active' : ''}`}
            onClick={() => setActiveTab('absolut')}
          >
            <Layers size={16} />
            <span>{t('Grafik Absolut Program', 'Absolute Program Growth')}</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'status' ? 'active' : ''}`}
            onClick={() => setActiveTab('status')}
          >
            <TrendingUp size={16} />
            <span>{t('Status Flora & Fauna', 'Flora & Fauna Status')}</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'diversity' ? 'active' : ''}`}
            onClick={() => setActiveTab('diversity')}
          >
            <Compass size={16} />
            <span>{t('Indeks Keanekaragaman (H\')', 'Diversity Index (H\')')}</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'budget' ? 'active' : ''}`}
            onClick={() => setActiveTab('budget')}
          >
            <TableIcon size={16} />
            <span>{t('Tabel Absolut & Anggaran', 'Absolute & Budget Table')}</span>
          </button>
        </div>

        {activeTab !== 'budget' && (
          <div className="chart-type-toggle">
            <button 
              className={`toggle-icon-btn ${chartType === 'bar' ? 'active' : ''}`}
              onClick={() => setChartType('bar')}
              title={t('Tampilan Batang', 'Bar View')}
            >
              <BarChart3 size={15} />
              <span>{t('Batang', 'Bar')}</span>
            </button>
            <button 
              className={`toggle-icon-btn ${chartType === 'line' ? 'active' : ''}`}
              onClick={() => setChartType('line')}
              title={t('Tampilan Garis', 'Line View')}
            >
              <TrendingUp size={15} />
              <span>{t('Garis', 'Line')}</span>
            </button>
          </div>
        )}
      </div>

      {/* Tab Content 1: Program Absolut Multi-Year */}
      {activeTab === 'absolut' && (
        <div className="card-box">
          <div className="card-top-info">
            <div>
              <h3 className="card-inner-title">
                {t(`Grafik Capaian Absolut Seluruh Program Kehati (s.d. ${year})`, `Absolute Achievement Chart across All Biodiversity Programs (up to ${year})`)}
              </h3>
              <p className="card-inner-sub">
                {t(
                  'Pertumbuhan jumlah individu yang terealisasi secara bertahap pada setiap program konservasi.',
                  'Realized individual growth numbers documented across each biodiversity conservation program.'
                )}
              </p>
            </div>
          </div>

          <div className="chart-wrapper" style={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <BarChart data={programChartData} margin={{ top: 20, right: 30, left: 15, bottom: 15 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="year" stroke="#57655e" fontSize={12} tickLine={false} />
                  <YAxis stroke="#57655e" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      borderRadius: '12px', 
                      border: '1px solid rgba(18, 44, 30, 0.1)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)' 
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '15px' }} />
                  {reportData.programs.map((prog) => (
                    <Bar 
                      key={prog.id} 
                      dataKey={prog.id} 
                      name={t(prog.nameId, prog.nameEn)} 
                      fill={programColors[prog.id] || '#2d6a4f'} 
                      radius={[6, 6, 0, 0]} 
                    />
                  ))}
                </BarChart>
              ) : (
                <LineChart data={programChartData} margin={{ top: 20, right: 30, left: 15, bottom: 15 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="year" stroke="#57655e" fontSize={12} tickLine={false} />
                  <YAxis stroke="#57655e" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      borderRadius: '12px', 
                      border: '1px solid rgba(18, 44, 30, 0.1)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)' 
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '15px' }} />
                  {reportData.programs.map((prog) => (
                    <Line 
                      key={prog.id} 
                      type="monotone" 
                      dataKey={prog.id} 
                      name={t(prog.nameId, prog.nameEn)} 
                      stroke={programColors[prog.id] || '#2d6a4f'} 
                      strokeWidth={3}
                      dot={{ r: 5 }}
                    />
                  ))}
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tab Content 2: Status Flora & Fauna */}
      {activeTab === 'status' && (
        <div className="card-box">
          <div className="card-top-info">
            <div>
              <h3 className="card-inner-title">
                {t(`Grafik Status Total Flora & Fauna (Periode Laporan ${year})`, `Total Flora & Fauna Status Chart (Report Period ${year})`)}
              </h3>
              <p className="card-inner-sub">
                {t(
                  'Perbandingan perkembangan akumulasi individu flora dan keanekaragaman fauna di seluruh kawasan PLTGU Cilegon.',
                  'Comparison of accumulated flora individuals and fauna population across all PLTGU Cilegon areas.'
                )}
              </p>
            </div>
          </div>

          <div className="chart-wrapper" style={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <BarChart data={statusChartData} margin={{ top: 20, right: 30, left: 15, bottom: 15 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="year" stroke="#57655e" fontSize={12} tickLine={false} />
                  <YAxis stroke="#57655e" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      borderRadius: '12px', 
                      border: '1px solid rgba(18, 44, 30, 0.1)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)' 
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '15px' }} />
                  <Bar 
                    dataKey="flora" 
                    name={t('Total Status Flora (Batang)', 'Total Flora Status (Stems)')} 
                    fill="#2d6a4f" 
                    radius={[6, 6, 0, 0]} 
                  />
                  <Bar 
                    dataKey="fauna" 
                    name={t('Total Status Fauna (Ekor)', 'Total Fauna Status (Individuals)')} 
                    fill="#d97706" 
                    radius={[6, 6, 0, 0]} 
                  />
                </BarChart>
              ) : (
                <AreaChart data={statusChartData} margin={{ top: 20, right: 30, left: 15, bottom: 15 }}>
                  <defs>
                    <linearGradient id="colorFlora" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="colorFauna" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d97706" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#d97706" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="year" stroke="#57655e" fontSize={12} tickLine={false} />
                  <YAxis stroke="#57655e" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      borderRadius: '12px', 
                      border: '1px solid rgba(18, 44, 30, 0.1)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)' 
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '15px' }} />
                  <Area 
                    type="monotone" 
                    dataKey="flora" 
                    name={t('Total Status Flora (Batang)', 'Total Flora Status (Stems)')} 
                    stroke="#2d6a4f" 
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorFlora)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="fauna" 
                    name={t('Total Status Fauna (Ekor)', 'Total Fauna Status (Individuals)')} 
                    stroke="#d97706" 
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorFauna)" 
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tab Content 3: Indeks Keanekaragaman Shannon-Wiener (H') */}
      {activeTab === 'diversity' && (
        <div className="card-box">
          <div className="card-top-info">
            <div>
              <h3 className="card-inner-title">
                {t(`Trend Line Indeks Keanekaragaman Hayati (H') Shannon-Wiener`, `Shannon-Wiener Biodiversity Index (H') Trend Line`)}
              </h3>
              <p className="card-inner-sub">
                {t(
                  'Indeks H\' mengukur kestabilan dan kemerataan ekosistem kehati. Nilai H\' > 3,0 menunjukkan tingkat keanekaragaman hayati tinggi dan ekosistem sangat sehat.',
                  'The H\' index measures ecosystem stability and evenness. Values of H\' > 3.0 denote high biodiversity and a very healthy ecological environment.'
                )}
              </p>
            </div>
          </div>

          <div className="chart-wrapper" style={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={diversityData} margin={{ top: 20, right: 30, left: 15, bottom: 15 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="year" stroke="#57655e" fontSize={12} tickLine={false} />
                <YAxis domain={[0, 4]} stroke="#57655e" fontSize={12} tickLine={false} />
                <Tooltip 
                  formatter={(val: any) => typeof val === 'number' ? `H' = ${val.toFixed(3)}` : val}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    borderRadius: '12px', 
                    border: '1px solid rgba(18, 44, 30, 0.1)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)' 
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '15px' }} />
                {diversityData.some((d) => d.hFlora !== undefined) && (
                  <Line 
                    type="monotone" 
                    dataKey="hFlora" 
                    name={t('Indeks H\' Flora Total', 'Total Flora H\' Index')} 
                    stroke="#2d6a4f" 
                    strokeWidth={3} 
                    dot={{ r: 5 }} 
                  />
                )}
                {diversityData.some((d) => d.hFauna !== undefined) && (
                  <Line 
                    type="monotone" 
                    dataKey="hFauna" 
                    name={t('Indeks H\' Fauna Total', 'Total Fauna H\' Index')} 
                    stroke="#d97706" 
                    strokeWidth={3} 
                    dot={{ r: 5 }} 
                  />
                )}
                {reportData.programs.map((prog) => {
                  const key = `${prog.id}_h`;
                  const hasData = diversityData.some((d) => d[key] !== undefined);
                  if (!hasData) return null;
                  return (
                    <Line 
                      key={key} 
                      type="monotone" 
                      dataKey={key} 
                      name={`${t(prog.nameId, prog.nameEn)} (H')`} 
                      stroke={programColors[prog.id] || '#6366f1'} 
                      strokeWidth={2} 
                      strokeDasharray="4 4"
                      dot={{ r: 4 }} 
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tab Content 4: Program Absolute & Budget Summary Table */}
      {activeTab === 'budget' && (
        <div className="card-box">
          <div className="card-top-info">
            <div>
              <h3 className="card-inner-title">
                {t(`Tabel Absolut Seluruh Program & Alokasi Anggaran Kehati (${year})`, `Absolute Programs & Biodiversity Budget Allocation Table (${year})`)}
              </h3>
              <p className="card-inner-sub">
                {t(
                  'Rekapitulasi capaian realisasi fisik absolut dan investasi anggaran pengelolaan lingkungan per program.',
                  'Summary of absolute physical realization achievements and environmental budget investments per program.'
                )}
              </p>
            </div>
            <div className="budget-summary-pill">
              <span className="budget-sum-label">{t('Total Anggaran Konservasi:', 'Total Conservation Budget:')}</span>
              <span className="budget-sum-val">Rp {totalBudget.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <div className="table-responsive">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>{t('Nama Program Konservasi', 'Conservation Program Name')}</th>
                  <th>{t('Lokasi / Kawasan', 'Location / Zone')}</th>
                  <th style={{ textAlign: 'right' }}>{t(`Realisasi Absolut (${year})`, `Absolute Realization (${year})`)}</th>
                  <th style={{ textAlign: 'right' }}>{t('Indeks H\'', 'H\' Index')}</th>
                  <th style={{ textAlign: 'right' }}>{t('Alokasi Anggaran (Rp)', 'Budget Allocation (IDR)')}</th>
                </tr>
              </thead>
              <tbody>
                {budgetTableData.map((row, idx) => (
                  <tr key={row.id}>
                    <td className="cell-num">{idx + 1}</td>
                    <td className="cell-name">
                      <div className="prog-name-flex">
                        <span className="prog-bullet" style={{ backgroundColor: programColors[row.id] || '#2d6a4f' }}></span>
                        <strong>{row.name}</strong>
                      </div>
                    </td>
                    <td><span className="ring-badge">{row.ring}</span></td>
                    <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--bg-dark-green, #122c1e)' }}>
                      {row.count.toLocaleString('id-ID')} {row.unit}
                    </td>
                    <td style={{ textAlign: 'right', color: 'var(--text-muted, #57655e)' }}>
                      {row.hIndex !== undefined ? `H' = ${row.hIndex.toFixed(3)}` : '-'}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 700, color: '#2d6a4f' }}>
                      {row.budget > 0 ? `Rp ${row.budget.toLocaleString('id-ID')}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="table-footer-row">
                  <td colSpan={3} style={{ fontWeight: 700 }}>{t('Total Alokasi Anggaran Tahun Ini', 'Total Budget Allocation This Year')}</td>
                  <td colSpan={2}></td>
                  <td style={{ textAlign: 'right', fontWeight: 800, color: '#122c1e', fontSize: '1.05rem' }}>
                    Rp {totalBudget.toLocaleString('id-ID')}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      <style jsx>{`
        .analytics-section {
          margin-bottom: 4rem;
        }

        .analytics-header {
          margin-bottom: 2rem;
        }

        .section-title {
          font-family: var(--font-playfair, serif);
          font-size: clamp(1.6rem, 3.5vw, 2.2rem);
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
          margin-top: 0.6rem;
          margin-bottom: 0.5rem;
          line-height: 1.25;
        }

        .section-desc {
          font-size: 1.05rem;
          color: var(--text-muted, #57655e);
          max-width: 850px;
          line-height: 1.6;
          margin: 0;
        }

        .analytics-nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .tabs-list {
          display: flex;
          gap: 0.5rem;
          background-color: #ffffff;
          padding: 0.35rem;
          border-radius: 16px;
          border: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
          overflow-x: auto;
        }

        .tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.15rem;
          border-radius: 12px;
          border: none;
          background: transparent;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-muted, #57655e);
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .tab-btn:hover {
          color: var(--bg-dark-green, #122c1e);
          background-color: rgba(45, 106, 79, 0.05);
        }

        .tab-btn.active {
          background-color: var(--bg-dark-green, #122c1e);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(18, 44, 30, 0.15);
        }

        .chart-type-toggle {
          display: inline-flex;
          background-color: #ffffff;
          padding: 0.25rem;
          border-radius: 12px;
          border: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
        }

        .toggle-icon-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.45rem 0.85rem;
          border-radius: 8px;
          border: none;
          background: transparent;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted, #57655e);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .toggle-icon-btn.active {
          background-color: var(--primary-green, #2d6a4f);
          color: #ffffff;
        }

        .card-box {
          background-color: #ffffff;
          border-radius: 24px;
          border: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
          padding: 2.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
        }

        .card-top-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .card-inner-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
          margin-bottom: 0.35rem;
        }

        .card-inner-sub {
          font-size: 0.95rem;
          color: var(--text-muted, #57655e);
          margin: 0;
        }

        .budget-summary-pill {
          background: linear-gradient(135deg, rgba(45, 106, 79, 0.1) 0%, rgba(45, 106, 79, 0.05) 100%);
          border: 1px solid rgba(45, 106, 79, 0.2);
          border-radius: 16px;
          padding: 0.85rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          text-align: right;
        }

        .budget-sum-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--primary-green, #2d6a4f);
          text-transform: uppercase;
        }

        .budget-sum-val {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--bg-dark-green, #122c1e);
        }

        .chart-wrapper {
          width: 100%;
        }

        .table-responsive {
          overflow-x: auto;
        }

        .analytics-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }

        .analytics-table th {
          background-color: var(--bg-cream, #faf9f6);
          color: var(--bg-dark-green, #122c1e);
          font-weight: 700;
          padding: 1rem 1.25rem;
          border-bottom: 2px solid var(--border-light, rgba(18, 44, 30, 0.1));
          text-align: left;
          white-space: nowrap;
        }

        .analytics-table td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border-light, rgba(18, 44, 30, 0.06));
          vertical-align: middle;
        }

        .analytics-table tbody tr:hover {
          background-color: rgba(45, 106, 79, 0.02);
        }

        .cell-num {
          font-weight: 600;
          color: var(--text-muted, #57655e);
          width: 40px;
        }

        .prog-name-flex {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .prog-bullet {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .ring-badge {
          display: inline-block;
          font-size: 0.75rem;
          background-color: rgba(18, 44, 30, 0.06);
          color: var(--bg-dark-green, #122c1e);
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          font-weight: 600;
        }

        .table-footer-row td {
          background-color: var(--bg-cream, #faf9f6);
          border-top: 2px solid var(--border-light, rgba(18, 44, 30, 0.15));
          padding: 1.25rem;
        }

        @media (max-width: 768px) {
          .card-box {
            padding: 1.5rem 1rem;
          }
          .budget-summary-pill {
            text-align: left;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
