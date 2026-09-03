'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, BarChart2, Calendar, FileText } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { OVERVIEW_YEARS } from '@/data/kehati-data';

interface YearNavigationProps {
  currentYear?: number;
}

export default function YearNavigation({ currentYear }: YearNavigationProps) {
  const { t } = useLanguage();

  return (
    <nav className="year-nav-bar" aria-label="Navigasi Laporan">
      <div className="container">
        <div className="nav-inner-box">
          {/* Year Filter Selector */}
          <div className="year-selector-group">
            <div className="selector-title">
              <Calendar size={16} />
              <span>{t('Pilih Tahun Laporan:', 'Select Report Year:')}</span>
            </div>

            <div className="year-pill-list">
              <Link
                href="/laporan"
                className={`year-pill-btn ${!currentYear ? 'active' : ''}`}
              >
                {t('Ringkasan Semua Tahun', 'All Years Overview')}
              </Link>
              
              {OVERVIEW_YEARS.map((year) => {
                const isActive = currentYear === year;
                return (
                  <Link
                    key={year}
                    href={`/laporan/${year}`}
                    className={`year-pill-btn ${isActive ? 'active' : ''}`}
                  >
                    <span>{t(`Laporan ${year}`, `Report ${year}`)}</span>
                    {year === 2026 && (
                      <span className="pill-badge">{t('Terbaru', 'Latest')}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .year-nav-bar {
          background-color: #ffffff;
          border-bottom: 1px solid rgba(18, 44, 30, 0.08);
          border-top: 1px solid rgba(18, 44, 30, 0.04);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          position: relative;
          z-index: 20;
          width: 100%;
        }

        .nav-inner-box {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.85rem 0;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        /* Year Selector */
        .year-selector-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .selector-title {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .year-pill-list {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        :global(.year-pill-btn) {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.45rem 1rem;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-muted, #57655e);
          background-color: var(--bg-cream, #faf9f6);
          border: 1px solid rgba(18, 44, 30, 0.1);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        :global(.year-pill-btn:hover) {
          background-color: rgba(45, 106, 79, 0.08);
          color: var(--bg-dark-green, #122c1e);
          border-color: rgba(45, 106, 79, 0.3);
        }

        :global(.year-pill-btn.active) {
          background-color: var(--bg-dark-green, #122c1e);
          color: #ffffff;
          border-color: var(--bg-dark-green, #122c1e);
          box-shadow: 0 4px 12px rgba(18, 44, 30, 0.15);
        }

        .pill-badge {
          font-size: 0.65rem;
          background-color: #ffc107;
          color: #122c1e;
          padding: 0.1rem 0.4rem;
          border-radius: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        @media (max-width: 768px) {
          .nav-inner-box {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
            padding: 1rem 0;
          }

          .year-selector-group {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </nav>
  );
}
