'use client';

import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { BarChart3, TrendingUp, Layers } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ProgramSummary } from '@/data/kehati-data';

interface AbsolutChartProps {
  programs: ProgramSummary[];
  year: number;
}

export default function AbsolutChart({ programs, year }: AbsolutChartProps) {
  const { t } = useLanguage();
  const [chartType, setChartType] = useState<'line' | 'bar'>('bar');

  // Extract year history keys available
  const allYears = Array.from(
    new Set(programs.flatMap((p) => Object.keys(p.history)))
  ).sort();

  // Prepare chart data per year
  const chartData = allYears.map((yr) => {
    const row: Record<string, any> = { year: yr };
    programs.forEach((prog) => {
      if (prog.history[yr]) {
        row[prog.id] = prog.history[yr].count;
      }
    });
    return row;
  });

  // Color palette for programs
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

  return (
    <div className="chart-section-card">
      <div className="chart-header">
        <div>
          <div className="chart-kicker">
            <TrendingUp size={14} />
            <span>{t('Grafik Perkembangan Absolut', 'Absolute Growth Chart')}</span>
          </div>
          <h3 className="chart-title">
            {t(`Tren Capaian Program Hingga ${year}`, `Program Achievement Trends Up To ${year}`)}
          </h3>
          <p className="chart-subtitle">
            {t(
              'Perkembangan jumlah individu flora, mangrove, aves, dan program kehati lainnya.',
              'Individual growth numbers of flora, mangrove, avifauna, and other biodiversity initiatives.'
            )}
          </p>
        </div>

        {/* Toggle Chart View */}
        <div className="chart-type-toggle">
          <button 
            className={`toggle-btn ${chartType === 'bar' ? 'active' : ''}`}
            onClick={() => setChartType('bar')}
          >
            <BarChart3 size={15} />
            <span>{t('Batang', 'Bar')}</span>
          </button>
          <button 
            className={`toggle-btn ${chartType === 'line' ? 'active' : ''}`}
            onClick={() => setChartType('line')}
          >
            <TrendingUp size={15} />
            <span>{t('Garis', 'Line')}</span>
          </button>
        </div>
      </div>

      <div className="chart-container" style={{ width: '100%', height: 380 }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
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
              {programs.map((prog) => (
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
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
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
              {programs.map((prog) => (
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

      <style jsx>{`
        .chart-section-card {
          background-color: #ffffff;
          border-radius: 24px;
          border: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
          padding: 2.5rem;
          margin-bottom: 3.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .chart-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary-green, #2d6a4f);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .chart-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
          margin-bottom: 0.35rem;
        }

        .chart-subtitle {
          font-size: 0.95rem;
          color: var(--text-muted, #57655e);
          margin: 0;
        }

        .chart-type-toggle {
          display: inline-flex;
          background-color: var(--bg-cream, #faf9f6);
          padding: 0.25rem;
          border-radius: 12px;
          border: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
        }

        .toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.45rem 0.9rem;
          border-radius: 8px;
          border: none;
          background: transparent;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted, #57655e);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .toggle-btn.active {
          background-color: var(--bg-dark-green, #122c1e);
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(18, 44, 30, 0.15);
        }

        @media (max-width: 768px) {
          .chart-section-card {
            padding: 1.75rem 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
