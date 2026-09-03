'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ReportBannerProps {
  kicker?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage?: string;
}

export default function ReportBanner(props: ReportBannerProps) {
  const { t } = useLanguage();

  const kicker = props.kicker || t('\\ Laporan Implementasi Kehati 2023 - 2026', '\\ Biodiversity Implementation Reports 2023 - 2026');
  const title = props.title || t('Kompilasi Capaian Keanekaragaman Hayati PLTGU Cilegon', 'PLTGU Cilegon Biodiversity Achievements Compilation');
  const description = props.description || t(
    'Pelajari data pemantauan berkala flora dan fauna kawasan konservasi Ring 1, restorasi 19.000 mangrove pesisir, peningkatan 1.122 individu aves, hingga sistem cerdas Biowing Connect dan C-Flora IoT.',
    'Explore comprehensive periodic monitoring data of Ring 1 flora & fauna, 19,000 coastal mangroves, 1,122 avian population, through smart Biowing Connect and C-Flora IoT systems.'
  );
  const ctaText = props.ctaText || t('Lihat Halaman Laporan (2023 - 2026)', 'View Report Pages (2023 - 2026)');
  const ctaHref = props.ctaHref || '/laporan';
  const backgroundImage = props.backgroundImage || '/images/pembangkit.JPG';

  return (
    <section 
      className="report-banner-section" 
      aria-label={title}
    >
      <div className="report-banner-frame">
        <div 
          className="report-banner-card"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          data-reveal="fade"
        >
          {/* Subtle background gradient overlay for depth */}
          <div className="report-banner-overlay" />

          {/* White Editorial Content Box */}
          <div className="report-content-box" data-reveal="left" data-reveal-delay="200">
            <span className="report-kicker">{kicker}</span>
            
            <h2 className="report-title">
              {title}
            </h2>
            
            <p className="report-description">
              {description}
            </p>
            
            <div>
              <Link 
                href={ctaHref} 
                className="report-cta-link"
                aria-label={`${ctaText} - ${title}`}
              >
                <span className="report-cta-text">{ctaText}</span>
                <ArrowUpRight className="report-cta-icon" size={20} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .report-banner-section {
          padding: 3.5rem 0 6.5rem 0;
          width: 100%;
          background-color: var(--bg-cream, #faf9f6);
        }

        .report-banner-frame {
          width: 100%;
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 2rem;
          box-sizing: border-box;
        }

        .report-banner-card {
          position: relative;
          width: 100%;
          min-height: 540px;
          background-size: cover;
          background-position: center;
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 3.5rem;
          box-shadow: 0 20px 45px rgba(18, 44, 30, 0.12);
          box-sizing: border-box;
        }

        .report-banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.15) 0%,
            rgba(18, 44, 30, 0.45) 100%
          );
          pointer-events: none;
        }

        .report-content-box {
          position: relative;
          z-index: 2;
          background-color: #ffffff;
          border-radius: 12px;
          padding: 3.5rem 3.25rem;
          max-width: 580px;
          width: 100%;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.18);
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          border: 1px solid rgba(18, 44, 30, 0.06);
        }

        .report-kicker {
          display: inline-block;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--primary-green, #2d6a4f);
          margin-bottom: 1.25rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
        }

        .report-title {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(1.85rem, 3.2vw, 2.5rem);
          font-weight: 600;
          color: var(--bg-dark-green, #122c1e);
          line-height: 1.2;
          letter-spacing: -0.025em;
          margin-bottom: 1.25rem;
        }

        .report-description {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: 1.05rem;
          line-height: 1.65;
          color: #4b5563;
          margin-bottom: 2.25rem;
        }

        .report-cta-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--bg-dark-green, #122c1e);
          text-decoration: none;
          min-height: 44px;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 4px;
        }

        .report-cta-text {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--bg-dark-green, #122c1e);
          border-bottom: 1.5px solid var(--bg-dark-green, #122c1e);
          padding-bottom: 3px;
          transition: border-color 0.2s ease, color 0.2s ease;
        }

        .report-cta-icon {
          color: var(--bg-dark-green, #122c1e);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .report-cta-link:hover .report-cta-text {
          color: var(--primary-green, #2d6a4f);
          border-bottom-color: var(--primary-green, #2d6a4f);
        }

        .report-cta-link:hover .report-cta-icon {
          color: var(--primary-green, #2d6a4f);
          transform: translate(3px, -3px);
        }

        .report-cta-link:focus-visible {
          outline: 2px solid var(--primary-green, #2d6a4f);
          outline-offset: 4px;
        }

        @media (max-width: 992px) {
          .report-banner-card {
            padding: 2.5rem;
            min-height: 480px;
          }

          .report-content-box {
            padding: 2.75rem 2.25rem;
            max-width: 520px;
          }
        }

        @media (max-width: 768px) {
          .report-banner-section {
            padding: 2rem 0 4rem 0;
          }

          .report-banner-frame {
            padding: 0 1rem;
          }

          .report-banner-card {
            padding: 1.5rem;
            min-height: auto;
            border-radius: 16px;
            justify-content: center;
          }

          .report-content-box {
            padding: 2rem 1.5rem;
            border-radius: 8px;
            max-width: 100%;
          }

          .report-title {
            font-size: 1.65rem;
            margin-bottom: 1.25rem;
          }

          .report-description {
            font-size: 0.975rem;
            margin-bottom: 1.75rem;
          }
        }
      `}</style>
    </section>
  );
}
