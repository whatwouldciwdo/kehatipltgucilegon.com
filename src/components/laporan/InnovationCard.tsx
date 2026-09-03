'use client';

import React from 'react';
import { Sparkles, Cpu, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import PhotoPlaceholder from './PhotoPlaceholder';

interface InnovationHighlightProps {
  innovation: {
    nameId: string;
    nameEn: string;
    taglineId: string;
    taglineEn: string;
    descId: string;
    descEn: string;
    impactNumber: string;
    impactLabelId: string;
    impactLabelEn: string;
    badgeId: string;
    badgeEn: string;
    photoPlaceholder: string;
  };
  year: number;
}

export default function InnovationCard({ innovation, year }: InnovationHighlightProps) {
  const { t } = useLanguage();

  return (
    <div className="innovation-wrapper">
      <div className="innovation-grid">
        {/* Left Column: Narrative */}
        <div className="innovation-info">
          <div className="innovation-badge">
            <Sparkles size={14} />
            <span>{t(innovation.badgeId, innovation.badgeEn)}</span>
          </div>

          <h2 className="innovation-title">
            {t(innovation.nameId, innovation.nameEn)}
          </h2>

          <h3 className="innovation-tagline">
            {t(innovation.taglineId, innovation.taglineEn)}
          </h3>

          <p className="innovation-desc">
            {t(innovation.descId, innovation.descEn)}
          </p>

          <div className="innovation-stat-box">
            <div className="stat-number">{innovation.impactNumber}</div>
            <div className="stat-label">
              {t(innovation.impactLabelId, innovation.impactLabelEn)}
            </div>
          </div>
        </div>

        {/* Right Column: Photo Placeholder */}
        <div className="innovation-photo">
          <PhotoPlaceholder 
            label={innovation.photoPlaceholder}
            captionId={t(
              `Dokumentasi Inovasi: ${innovation.nameId} (${year})`,
              `Innovation Documentation: ${innovation.nameEn} (${year})`
            )}
            height="320px"
          />
        </div>
      </div>

      <style jsx>{`
        .innovation-wrapper {
          background: linear-gradient(135deg, #122c1e 0%, #1a432e 100%);
          color: #ffffff;
          border-radius: 28px;
          padding: 3.5rem 3rem;
          margin-bottom: 3.5rem;
          box-shadow: 0 20px 45px rgba(18, 44, 30, 0.2);
          position: relative;
          overflow: hidden;
        }

        .innovation-wrapper::before {
          content: '';
          position: absolute;
          top: -40px;
          right: -40px;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(116, 198, 157, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .innovation-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        @media (min-width: 992px) {
          .innovation-grid {
            grid-template-columns: 1.25fr 1fr;
          }
        }

        .innovation-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background-color: rgba(255, 193, 7, 0.2);
          color: #ffc107;
          border: 1px solid rgba(255, 193, 7, 0.35);
          padding: 0.35rem 0.85rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1.25rem;
        }

        .innovation-title {
          font-family: var(--font-playfair, serif);
          font-size: clamp(1.8rem, 3.5vw, 2.4rem);
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .innovation-tagline {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--accent-lime, #b7e4c7);
          margin-bottom: 1.25rem;
          line-height: 1.4;
        }

        .innovation-desc {
          font-size: 1rem;
          color: #d1d5db;
          line-height: 1.65;
          margin-bottom: 2rem;
        }

        .innovation-stat-box {
          background-color: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 16px;
          padding: 1.25rem 1.75rem;
          display: inline-flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-number {
          font-size: 1.85rem;
          font-weight: 800;
          color: #ffc107;
          letter-spacing: -0.02em;
        }

        .stat-label {
          font-size: 0.85rem;
          color: #e5e7eb;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .innovation-wrapper {
            padding: 2.25rem 1.5rem;
            border-radius: 20px;
          }
          
          .innovation-grid {
            gap: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
