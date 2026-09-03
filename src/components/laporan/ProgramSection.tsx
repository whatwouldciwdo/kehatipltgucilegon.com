'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Tag, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ProgramSummary } from '@/data/kehati-data';
import PhotoPlaceholder from './PhotoPlaceholder';

interface ProgramSectionProps {
  programs: ProgramSummary[];
  year: number;
}

export default function ProgramSection({ programs, year }: ProgramSectionProps) {
  const { t } = useLanguage();
  const [openProgramId, setOpenProgramId] = useState<string | null>(programs[0]?.id || null);

  const toggleProgram = (id: string) => {
    setOpenProgramId(openProgramId === id ? null : id);
  };

  return (
    <div className="programs-container" id="penjelasan-program">
      <div className="programs-header">
        <div className="badge-eco">{t('Program Konservasi', 'Conservation Programs')}</div>
        <h3 className="section-title">
          {t(`3. Rincian Pelaksanaan Program Konservasi (${year})`, `3. Detailed Conservation Program Breakdown (${year})`)}
        </h3>
        <p className="section-desc">
          {t(
            'Informasi mendalam mengenai metodologi, capaian absolut, kawasan konservasi, status perlindungan, dan dokumentasi lapangan.',
            'In-depth information on methodology, absolute outcomes, conservation zones, protection status, and field documentation.'
          )}
        </p>
      </div>

      <div className="programs-accordion-list">
        {programs.map((prog, idx) => {
          const isOpen = openProgramId === prog.id;
          const currentStats = prog.history[year.toString()];
          const previousYear = (year - 1).toString();
          const prevStats = prog.history[previousYear];

          return (
            <div 
              key={prog.id} 
              id={`program-${prog.id}`}
              className={`program-accordion-item ${isOpen ? 'open' : ''}`}
            >
              {/* Accordion Header */}
              <button
                className="accordion-trigger"
                onClick={() => toggleProgram(prog.id)}
                aria-expanded={isOpen}
              >
                <div className="trigger-left">
                  <div className="program-number">3.{idx + 1}</div>
                  <div>
                    <div className="title-row">
                      <h4 className="program-title">
                        {`3.${idx + 1}. `}{t(prog.nameId, prog.nameEn)}
                      </h4>
                      {prog.innovation && (
                        <span className="innovation-pill">
                          <Sparkles size={12} />
                          <span>{t('Inovasi Unggulan', 'Innovation')}</span>
                        </span>
                      )}
                    </div>
                    <div className="program-meta">
                      <span className="meta-item">
                        <MapPin size={13} />
                        <span>{prog.ring}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="trigger-right">
                  {currentStats && (
                    <div className="quick-stat">
                      <span className="stat-value">
                        {currentStats.count.toLocaleString('id-ID')}
                      </span>
                      <span className="stat-unit">
                        {t(prog.unitId, prog.unitEn)}
                      </span>
                    </div>
                  )}
                  <div className={`chevron-icon-box ${isOpen ? 'rotated' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </div>
              </button>

              {/* Accordion Body */}
              {isOpen && (
                <div className="accordion-body">
                  <div className="body-grid">
                    {/* Narrative & Metrics */}
                    <div className="body-narrative">
                      <h5 className="body-heading">{t('Deskripsi & Capaian', 'Description & Achievements')}</h5>
                      <p className="narrative-text">{t(prog.descId, prog.descEn)}</p>

                      <div className="metrics-row">
                        <div className="metric-box">
                          <span className="box-label">{t(`Capaian Tahun ${year}`, `Achievement Year ${year}`)}</span>
                          <span className="box-value">
                            {currentStats?.count.toLocaleString('id-ID')} {t(prog.unitId, prog.unitEn)}
                          </span>
                        </div>

                        {currentStats?.hIndex && (
                          <div className="metric-box">
                            <span className="box-label">{t('Indeks Keanekaragaman (H\')', 'Diversity Index (H\')')}</span>
                            <span className="box-value">
                              H’ = {currentStats.hIndex.toFixed(3)}
                            </span>
                          </div>
                        )}

                        {currentStats?.budget && (
                          <div className="metric-box">
                            <span className="box-label">{t('Alokasi Anggaran', 'Budget Allocation')}</span>
                            <span className="box-value">
                              Rp {currentStats.budget.toLocaleString('id-ID')}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Historical Progress Table */}
                      <div className="history-table-wrapper">
                        <span className="history-title">{t('Rekam Jejak Historis Program:', 'Program Historical Track Record:')}</span>
                        <div className="history-chips">
                          {Object.entries(prog.history).map(([yr, val]) => (
                            <div key={yr} className={`history-chip ${yr === year.toString() ? 'current' : ''}`}>
                              <span className="chip-year">{yr}</span>
                              <span className="chip-count">{val.count.toLocaleString('id-ID')} {t(prog.unitId, prog.unitEn)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Documentation Photo Slot */}
                    <div className="body-photo">
                      <PhotoPlaceholder 
                        label={prog.photoPlaceholder}
                        captionId={t(
                          `Dokumentasi Kegiatan: ${prog.nameId}`,
                          `Activity Documentation: ${prog.nameEn}`
                        )}
                        height="260px"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .programs-container {
          margin-bottom: 4rem;
        }

        .programs-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 3rem auto;
        }

        .section-title {
          font-size: clamp(1.8rem, 3.5vw, 2.2rem);
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
          letter-spacing: -0.02em;
          margin: 0.75rem 0 0.5rem 0;
        }

        .section-desc {
          color: var(--text-muted, #57655e);
          font-size: 1.05rem;
          margin: 0;
        }

        .programs-accordion-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .program-accordion-item {
          background-color: #ffffff;
          border-radius: 20px;
          border: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .program-accordion-item.open {
          border-color: rgba(45, 106, 79, 0.3);
          box-shadow: 0 12px 35px rgba(18, 44, 30, 0.06);
        }

        .accordion-trigger {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          gap: 1.5rem;
        }

        .trigger-left {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .program-number {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--primary-green, #2d6a4f);
          background-color: rgba(45, 106, 79, 0.08);
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 0.25rem;
        }

        .program-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
          margin: 0;
        }

        .innovation-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.75rem;
          font-weight: 700;
          background-color: rgba(255, 193, 7, 0.15);
          color: #92400e;
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
        }

        .program-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.85rem;
          color: var(--text-muted, #57655e);
        }

        .meta-item {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .trigger-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-shrink: 0;
        }

        .quick-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .stat-value {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--bg-dark-green, #122c1e);
        }

        .stat-unit {
          font-size: 0.75rem;
          color: var(--text-muted, #57655e);
          text-transform: uppercase;
        }

        .chevron-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: var(--bg-cream, #faf9f6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--bg-dark-green, #122c1e);
          transition: transform 0.3s ease;
        }

        .chevron-icon-box.rotated {
          transform: rotate(180deg);
        }

        .accordion-body {
          padding: 0 2rem 2rem 2rem;
          border-top: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
          padding-top: 1.75rem;
        }

        .body-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 992px) {
          .body-grid {
            grid-template-columns: 1.25fr 1fr;
          }
        }

        .body-heading {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
          margin-bottom: 0.75rem;
        }

        .narrative-text {
          font-size: 0.975rem;
          color: var(--text-muted, #57655e);
          line-height: 1.65;
          margin-bottom: 1.5rem;
        }

        .metrics-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .metric-box {
          background-color: var(--bg-cream, #faf9f6);
          border: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
          border-radius: 12px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .box-label {
          font-size: 0.75rem;
          color: var(--text-muted, #57655e);
          font-weight: 600;
        }

        .box-value {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--bg-dark-green, #122c1e);
        }

        .history-table-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .history-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--bg-dark-green, #122c1e);
        }

        .history-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .history-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background-color: #f3f4f6;
          padding: 0.35rem 0.75rem;
          border-radius: 8px;
          font-size: 0.825rem;
          border: 1px solid #e5e7eb;
        }

        .history-chip.current {
          background-color: rgba(45, 106, 79, 0.12);
          border-color: rgba(45, 106, 79, 0.3);
          color: var(--primary-green, #2d6a4f);
          font-weight: 700;
        }

        .chip-year {
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .accordion-trigger {
            padding: 1.25rem 1rem;
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .trigger-right {
            width: 100%;
            justify-content: space-between;
          }

          .accordion-body {
            padding: 0 1rem 1.5rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}
