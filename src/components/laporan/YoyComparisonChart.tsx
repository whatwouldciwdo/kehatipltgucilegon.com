'use client';

import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TrendingUp, Layers, CheckSquare, Square } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { YOY_CHART_DATA } from '@/data/kehati-data';

export default function YoyComparisonChart() {
  const { t } = useLanguage();

  const [activeLines, setActiveLines] = useState<{ [key: string]: boolean }>({
    flora: true,
    mangrove: true,
    aves: true,
    fauna: false,
  });

  const toggleLine = (key: string) => {
    setActiveLines((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const linesConfig = [
    { key: 'flora', name: t('Total Flora (Batang)', 'Total Flora (Stems)'), stroke: '#2d6a4f', yAxisId: 'left' },
    { key: 'mangrove', name: t('Mangrove Ditanam (Batang)', 'Mangroves Planted (Stems)'), stroke: '#0284c7', yAxisId: 'left' },
    { key: 'aves', name: t('Populasi Aves (Ekor)', 'Aves Population (Birds)'), stroke: '#d97706', yAxisId: 'right' },
    { key: 'fauna', name: t('Total Individu Fauna (Ekor)', 'Total Fauna (Animals)'), stroke: '#ec4899', yAxisId: 'right' },
  ];

  return (
    <div className="yoy-chart-card">
      <div className="yoy-header">
        <div>
          <div className="yoy-badge">
            <TrendingUp size={14} />
            <span>{t('Komparasi Multi-Tahun', 'Multi-Year Comparison')}</span>
          </div>
          <h3 className="yoy-title">
            {t('Tren Pertumbuhan Keanekaragaman Hayati 2020 – 2026', 'Biodiversity Growth Trends 2020 – 2026')}
          </h3>
          <p className="yoy-subtitle">
            {t(
              'Perbandingan overlay pertumbuhan populasi flora, penanaman mangrove, dan peningkatan satwa aves.',
              'Overlay comparison of flora growth, mangrove planting, and avian population enhancement.'
            )}
          </p>
        </div>

        {/* Series Filter Checkboxes */}
        <div className="series-toggles">
          {linesConfig.map((item) => (
            <button
              key={item.key}
              onClick={() => toggleLine(item.key)}
              className={`series-btn ${activeLines[item.key] ? 'active' : ''}`}
              style={{
                borderColor: activeLines[item.key] ? item.stroke : 'rgba(18, 44, 30, 0.12)',
                backgroundColor: activeLines[item.key] ? `${item.stroke}15` : 'transparent',
                color: activeLines[item.key] ? item.stroke : '#57655e'
              }}
            >
              <span className="color-dot" style={{ backgroundColor: item.stroke }} />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="yoy-chart-container" style={{ width: '100%', height: 420 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={YOY_CHART_DATA} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f0" vertical={false} />
            <XAxis dataKey="year" stroke="#57655e" fontSize={13} tickLine={false} />
            <YAxis yAxisId="left" stroke="#2d6a4f" fontSize={12} tickLine={false} label={{ value: t('Flora & Mangrove', 'Flora & Mangrove'), angle: -90, position: 'insideLeft', fill: '#2d6a4f', fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" stroke="#d97706" fontSize={12} tickLine={false} label={{ value: t('Fauna & Aves', 'Fauna & Aves'), angle: 90, position: 'insideRight', fill: '#d97706', fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '12px', 
                border: '1px solid rgba(18, 44, 30, 0.1)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)' 
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            {linesConfig.map((item) => (
              activeLines[item.key] && (
                <Line
                  key={item.key}
                  yAxisId={item.yAxisId}
                  type="monotone"
                  dataKey={item.key}
                  name={item.name}
                  stroke={item.stroke}
                  strokeWidth={3.5}
                  activeDot={{ r: 7 }}
                  dot={{ r: 5 }}
                />
              )
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <style jsx>{`
        .yoy-chart-card {
          background-color: #ffffff;
          border-radius: 28px;
          border: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
          padding: 3rem 2.5rem;
          margin-bottom: 4rem;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.03);
        }

        .yoy-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .yoy-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary-green, #2d6a4f);
          background-color: rgba(45, 106, 79, 0.08);
          padding: 0.3rem 0.75rem;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        .yoy-title {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
          letter-spacing: -0.02em;
          margin-bottom: 0.35rem;
        }

        .yoy-subtitle {
          font-size: 0.975rem;
          color: var(--text-muted, #57655e);
          margin: 0;
        }

        .series-toggles {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .series-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.85rem;
          border-radius: 10px;
          border: 1.5px solid transparent;
          font-size: 0.825rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .color-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        @media (max-width: 768px) {
          .yoy-chart-card {
            padding: 1.75rem 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
