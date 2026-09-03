'use client';

import React from 'react';
import { ListTree, BookOpen, Trees, Bird, Layers, Bookmark, ArrowDownRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ProgramSummary } from '@/data/kehati-data';

interface TableOfContentsNavProps {
  programs: ProgramSummary[];
  year: number;
}

export default function TableOfContentsNav({ programs, year }: TableOfContentsNavProps) {
  const { t } = useLanguage();

  return (
    <div className="toc-card">
      <div className="toc-header">
        <div className="toc-header-left">
          <div className="toc-badge">
            <ListTree size={14} />
            <span>{t('Navigasi Dokumen Laporan', 'Report Navigation Index')}</span>
          </div>
          <h2 className="toc-title">{t('Daftar Isi & Struktur Laporan', 'Table of Contents & Structure')}</h2>
        </div>
        <p className="toc-sub">
          {t(
            'Navigasi langsung ke bagian status spesies, analitik capaian absolut, atau rincian pelaksanaan per program.',
            'Direct navigation to species status, absolute outcome analytics, or specific program implementation details.'
          )}
        </p>
      </div>

      <div className="toc-grid">
        {/* Section 1: STATUS */}
        <div className="toc-chapter-box">
          <div className="chapter-header">
            <span className="chapter-num">1.</span>
            <a href="#status" className="chapter-link">
              <strong>{t('Status Keanekaragaman Hayati', 'Biodiversity Status')}</strong>
            </a>
          </div>
          <ul className="toc-sublist">
            <li>
              <a href="#status-flora" className="toc-sublink">
                <span className="sub-num">1.1.</span>
                <span>{t('Status Jenis Flora di PLTGU Cilegon', 'Flora Species Status at PLTGU Cilegon')}</span>
              </a>
            </li>
            <li>
              <a href="#status-fauna" className="toc-sublink">
                <span className="sub-num">1.2.</span>
                <span>{t('Status Jenis Fauna di PLTGU Cilegon', 'Fauna Species Status at PLTGU Cilegon')}</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Section 2: ABSOLUT */}
        <div className="toc-chapter-box">
          <div className="chapter-header">
            <span className="chapter-num">2.</span>
            <a href="#absolut" className="chapter-link">
              <strong>{t('Capaian Absolut & Alokasi Anggaran', 'Absolute Outcomes & Budget Allocation')}</strong>
            </a>
          </div>
          <ul className="toc-sublist">
            <li>
              <a href="#absolut" className="toc-sublink">
                <span className="sub-num">2.1.</span>
                <span>{t('Grafik Capaian Absolut Seluruh Program', 'Absolute Growth across All Programs')}</span>
              </a>
            </li>
            <li>
              <a href="#absolut" className="toc-sublink">
                <span className="sub-num">2.2.</span>
                <span>{t('Tabel Realisasi & Alokasi Anggaran Kehati', 'Realization & Budget Allocation Table')}</span>
              </a>
            </li>
            <li>
              <a href="#absolut" className="toc-sublink">
                <span className="sub-num">2.3.</span>
                <span>{t('Trend Line Indeks Keanekaragaman (H\')', 'Diversity Index (H\') Trend Line')}</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Section 3: PENJELASAN PER PROGRAM */}
        <div className="toc-chapter-box toc-chapter-full">
          <div className="chapter-header">
            <span className="chapter-num">3.</span>
            <a href="#penjelasan-program" className="chapter-link">
              <strong>{t('Rincian Program Konservasi Kehati', 'Conservation Programs Detailed Breakdown')}</strong>
            </a>
          </div>
          <div className="toc-programs-subgrid">
            {programs.map((prog, idx) => (
              <a 
                key={prog.id} 
                href={`#program-${prog.id}`} 
                className="toc-program-item"
              >
                <span className="prog-idx">3.{idx + 1}.</span>
                <span className="prog-name">{t(prog.nameId, prog.nameEn)}</span>
                <ArrowDownRight size={13} className="prog-arrow" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .toc-card {
          background-color: #ffffff;
          border-radius: 24px;
          border: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
          padding: 2.25rem;
          margin-bottom: 3.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
        }

        .toc-header {
          margin-bottom: 2rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
        }

        .toc-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary-green, #2d6a4f);
          background-color: rgba(45, 106, 79, 0.08);
          padding: 0.25rem 0.65rem;
          border-radius: 12px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-bottom: 0.5rem;
        }

        .toc-title {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
          margin: 0;
        }

        .toc-sub {
          font-size: 0.9rem;
          color: var(--text-muted, #57655e);
          margin-top: 0.35rem;
          margin-bottom: 0;
        }

        .toc-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .toc-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .toc-chapter-full {
            grid-column: span 2;
          }
        }

        .toc-chapter-box {
          background-color: var(--bg-cream, #faf9f6);
          border: 1px solid rgba(18, 44, 30, 0.06);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .chapter-header {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 1rem;
          padding-bottom: 0.65rem;
          border-bottom: 1px solid rgba(18, 44, 30, 0.08);
        }

        .chapter-num {
          font-weight: 800;
          color: var(--primary-green, #2d6a4f);
          font-size: 1.1rem;
        }

        .chapter-link {
          font-size: 0.95rem;
          color: var(--bg-dark-green, #122c1e);
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.2s ease;
        }

        .chapter-link:hover {
          color: var(--primary-green, #2d6a4f);
          text-decoration: underline;
        }

        .toc-sublist {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .toc-sublink {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #4b5563;
          text-decoration: none;
          transition: all 0.2s ease;
          padding: 0.25rem 0.5rem;
          border-radius: 8px;
        }

        .toc-sublink:hover {
          background-color: rgba(45, 106, 79, 0.08);
          color: var(--primary-green, #2d6a4f);
          transform: translateX(4px);
        }

        .sub-num {
          font-weight: 700;
          color: var(--primary-green, #2d6a4f);
          font-size: 0.8rem;
          flex-shrink: 0;
        }

        .toc-programs-subgrid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }

        @media (min-width: 640px) {
          .toc-programs-subgrid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .toc-program-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #ffffff;
          border: 1px solid rgba(18, 44, 30, 0.06);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .toc-program-item:hover {
          border-color: rgba(45, 106, 79, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
          transform: translateY(-2px);
        }

        .prog-idx {
          font-weight: 700;
          color: var(--primary-green, #2d6a4f);
          font-size: 0.825rem;
          margin-right: 0.5rem;
          flex-shrink: 0;
        }

        .prog-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--bg-dark-green, #122c1e);
          flex: 1;
        }

        .prog-arrow {
          color: #9ca3af;
          flex-shrink: 0;
          margin-left: 0.5rem;
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .toc-program-item:hover .prog-arrow {
          color: var(--primary-green, #2d6a4f);
          transform: translate(2px, 2px);
        }
      `}</style>
    </div>
  );
}
