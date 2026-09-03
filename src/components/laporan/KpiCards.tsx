'use client';

import React from 'react';
import { Trees, Bird, Waves, Compass, Sparkles, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ReportYearData } from '@/data/kehati-data';

interface KpiCardsProps {
  data: ReportYearData;
  prevData?: ReportYearData;
}

export default function KpiCards({ data, prevData }: KpiCardsProps) {
  const { t } = useLanguage();

  const getGrowthBadge = (current: number, previous?: number) => {
    if (!previous || previous === 0) return null;
    const diff = current - previous;
    const pct = Math.round((diff / previous) * 100);
    if (diff > 0) {
      return (
        <span className="growth-badge positive">
          <TrendingUp size={12} />
          <span>+{pct}% (+{diff.toLocaleString('id-ID')})</span>
        </span>
      );
    }
    return null;
  };

  const cards = [
    {
      icon: <Trees size={26} />,
      label: t('Total Individu Flora', 'Total Flora Count'),
      value: `${data.totalFlora.toLocaleString('id-ID')} ${t('Batang', 'Stems')}`,
      subtext: t(`${data.speciesCountFlora} Spesies terdata di kawasan konservasi`, `${data.speciesCountFlora} Species recorded in conservation zone`),
      growth: getGrowthBadge(data.totalFlora, prevData?.totalFlora),
      color: 'var(--primary-green, #2d6a4f)',
      bgColor: 'rgba(45, 106, 79, 0.08)'
    },
    {
      icon: <Waves size={26} />,
      label: t('Restorasi Mangrove', 'Mangrove Restoration'),
      value: `${data.totalMangrove.toLocaleString('id-ID')} ${t('Pohon', 'Trees')}`,
      subtext: t('Rehabilitasi pesisir Desa Lontar Kab. Serang', 'Coastal rehabilitation in Lontar Village'),
      growth: getGrowthBadge(data.totalMangrove, prevData?.totalMangrove),
      color: '#0284c7',
      bgColor: 'rgba(2, 132, 199, 0.08)'
    },
    {
      icon: <Bird size={26} />,
      label: t('Populasi Aves (Burung)', 'Avian Population'),
      value: `${data.totalAves.toLocaleString('id-ID')} ${t('Ekor', 'Birds')}`,
      subtext: t('Burung pemakan buah & penyebar benih alami', 'Fruit-eating & seed-dispersing avifauna'),
      growth: getGrowthBadge(data.totalAves, prevData?.totalAves),
      color: '#d97706',
      bgColor: 'rgba(217, 119, 6, 0.08)'
    },
    {
      icon: <Compass size={26} />,
      label: t('Indeks Keanekaragaman (H\')', 'Biodiversity Index (H\')'),
      value: data.overallHIndexFlora ? `H' = ${data.overallHIndexFlora.toFixed(3)}` : 'H\' > 3.0',
      subtext: t('Kategori Keanekaragaman Tinggi (H\' > 3.0)', 'High Biodiversity Category (H\' > 3.0)'),
      growth: (
        <span className="growth-badge steady">
          <Sparkles size={12} />
          <span>{t('Tinggi & Stabil', 'High & Stable')}</span>
        </span>
      ),
      color: 'var(--bg-dark-green, #122c1e)',
      bgColor: 'rgba(18, 44, 30, 0.08)'
    }
  ];

  return (
    <div className="kpi-grid">
      {cards.map((card, idx) => (
        <div key={idx} className="kpi-card">
          <div className="kpi-card-header">
            <div 
              className="kpi-icon-wrapper" 
              style={{ backgroundColor: card.bgColor, color: card.color }}
            >
              {card.icon}
            </div>
            {card.growth}
          </div>
          
          <div className="kpi-card-body">
            <span className="kpi-label">{card.label}</span>
            <div className="kpi-value" style={{ color: 'var(--bg-dark-green, #122c1e)' }}>
              {card.value}
            </div>
            <p className="kpi-subtext">{card.subtext}</p>
          </div>
        </div>
      ))}

      <style jsx>{`
        .kpi-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        @media (min-width: 640px) {
          .kpi-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .kpi-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .kpi-card {
          background-color: #ffffff;
          border-radius: 20px;
          padding: 1.75rem 1.5rem;
          border: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .kpi-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(18, 44, 30, 0.08);
          border-color: rgba(45, 106, 79, 0.25);
        }

        .kpi-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .kpi-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        :global(.growth-badge) {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          border-radius: 20px;
        }

        :global(.growth-badge.positive) {
          background-color: rgba(34, 197, 94, 0.12);
          color: #15803d;
        }

        :global(.growth-badge.steady) {
          background-color: rgba(234, 179, 8, 0.15);
          color: #854d0e;
        }

        .kpi-label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted, #57655e);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 0.35rem;
        }

        .kpi-value {
          font-size: 1.65rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 0.5rem;
        }

        .kpi-subtext {
          font-size: 0.825rem;
          color: var(--text-muted, #57655e);
          line-height: 1.45;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
