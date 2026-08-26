'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CilegonLocationSectionProps {
  kicker?: string;
  titlePrefix?: string;
  titleBold?: string;
  titleSuffix?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function CilegonLocationSection({
  kicker = 'GEOGRAFIS & LOKASI STRATEGIS',
  titlePrefix = 'Cilegon, Gerbang ',
  titleBold = 'Strategis',
  titleSuffix = 'Energi & Ekosistem Banten',
  description = 'Terletak di ujung barat Pulau Jawa di pesisir Selat Sunda, Kota Cilegon merupakan simpul strategis pasokan energi dan industri nasional. Di kawasan vital ini, PT PLN Indonesia Power UBP Cilegon mengoperasikan pembangkit listrik tenaga gas uap berteknologi tinggi yang andal sekaligus memimpin inisiatif pelestarian keanekaragaman hayati darat dan laut demi masa depan berkelanjutan.',
  ctaText = 'JELAJAHI INISIATIF KEHATI',
  ctaHref = '#kehati',
}: CilegonLocationSectionProps) {
  return (
    <section className="cilegon-location-section" aria-label="Geografis & Lokasi Kota Cilegon">
      <div className="container location-container">
        {/* Left Column: Text & CTA */}
        <div className="location-text-col">
          <span className="location-kicker">{kicker}</span>
          
          <h2 className="location-title">
            <span>{titlePrefix}</span>
            <strong className="title-bold">{titleBold}</strong>
            <br />
            <span>{titleSuffix}</span>
          </h2>
          
          <p className="location-description">
            {description}
          </p>
          
          <div>
            <a href={ctaHref} className="location-cta-link">
              <span>{ctaText}</span>
              <ArrowRight size={16} className="cta-arrow-icon" />
            </a>
          </div>
        </div>

        {/* Right Column: Exact Vector Map with Float & Shadow */}
        <div className="location-map-col">
          {/* Radial dot grid pattern background */}
          <div className="map-radial-grid" aria-hidden="true" />

          <div className="map-vector-wrapper">
            <svg 
              viewBox="0 0 400 300" 
              className="cilegon-map-svg animate-float-map"
              aria-label="Peta Siluet Wilayah Banten dan Cilegon"
            >
              <defs>
                <filter id="cilegonMapShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="20" stdDeviation="20" floodColor="rgba(37, 49, 83, 0.18)" />
                </filter>
              </defs>
              <g transform="translate(200, 150) scale(9.8) translate(-261.6, -261.5)">
                <path 
                  d="M277.8 258.7l0 1.1 0.1 0.3-0.5 0.3-2.2 0-0.6-0.2-0.4-0.3-0.4-0.1-0.5-0.1-0.3 0.2-0.3 0.2-0.3 0.1-0.1-0.1-0.2-0.2-0.1-0.3-0.1-0.2-0.2 0-0.2 0.1-0.2 0.2-0.2 0.4 0.1 0.3 0.1 0.5 0 0.5-0.2 0.5-0.2 0.6-0.1 0.6 0.4 3.5 0.2 0.4 0.1 0.3 0.7 0.2 0.2 0.1 0.4 0.4 0 0.3-1.1 1-0.8 1.4-0.2 0.5-0.1 0.5 0 0.3 0.1 0.2 0.1 0.2-0.1 0.1-0.4 0.1-0.5 0.1-0.5-0.1-0.2-0.1-0.2-0.1-0.2 0-0.2-0.1-0.1 0-0.2-0.3-0.1-0.1-0.3 0-0.1-0.1 0-0.1-0.1-0.2-0.1-0.1-0.8-0.5-0.6 0-0.9-0.4-1.4-1.1-0.9-0.3-0.6-0.1-0.3 0-0.4 0-0.4 0.1-0.4 0.1-0.1 0.3-0.2 0.1-0.2-0.3-0.4 0.1-0.6 0-0.6 0.1-0.4 0.1-0.4-0.1-0.6-0.1-0.4-0.1-2.1 0.3-0.8 0.1-0.4 0.4-0.8-0.3-0.2 0.2-0.3-0.3-0.2-0.2-0.4 0-0.2 0.2-0.2 0.1-0.1-0.1 0-0.2-0.1-0.1-0.1-0.1-0.1-0.1-0.9-0.3-0.9-0.1-0.2 0.1-0.1 0.4-0.1 0.1-0.1 0.2-0.2 0-0.4-0.1-0.1-0.4-0.2-0.7-0.3-0.2-0.1-0.1 0-0.2 0.2 0 0.6 0.1 0.3-0.1 0.4-0.3 0.5-0.6 0.2-0.3 0.1-0.4 0.2-0.2 0.4-0.2 0.2 0.1 0.3 0.3 0.2 0.2 0.2 0.3 0 0.2 0 0.2 0 0.2 0.5 0.8 0.1 0.3 0.3 0.3 0.3 0.1 0.4-0.1 0.2-0.4 0.3-0.9 0.2-0.4 1.6-1.4 0.3-0.4 0.1-0.3-0.2-1.7 0.5-1 0.3-0.2 0.4 0.1 0.1 0.7 0.3 0.2 0.3 0.2 0.5 0 0.9-0.4 0.5-0.7 0.3-0.8-0.1-0.7 0.2-3.4 0.2-0.8 0.5-1.6 0.4-0.8 1.4-1.4 0.2-0.1 0.2-0.2 0.4-1.3 0.5-0.5 0.6-0.3 0.6 0.1 0.5 0.5 0.1 1.3 0.1 0.2 0.2 0.1 0.6 0.4 0.3 0.1 0.7-0.3 0.4-0.7 0.5-0.5 0.9 0.1 1.2 1 0.5 0.1 0.5 0.1 1.2 0.6 0.5 0 0.3-0.2 0.3-0.2 0.4-0.2 2.3 0.1 0.4 0.1 0.4 0.1 0.3 0.2 0.2 0.4 0 0.2-0.1 0-0.6 0.5-0.2 0.3 0.3 2.2 0.6 0.6 0.2 0.9 0.3 0.3 0.1 0z m-29.6 4.5l0 0.5 0 0.8-0.2 0.7-0.3 0.3-0.3 0.1-0.4 0.5-0.2 0.1-0.2-0.1 0-0.4 0.2-0.3 0.2-0.3-0.3-0.1-0.1-0.2-0.1-0.5-0.9 0.9-0.2 0.1-0.1-0.4 0.4-0.5 1-0.8 0.2 0.1 0.1-0.1 0.2-0.2 0.2 0 0.1 0 0.1-0.1 0.2-0.1 0.2 0 0.2 0z" 
                  fill="#122c1e" 
                  stroke="#faf9f6" 
                  strokeWidth="0.25"
                  filter="url(#cilegonMapShadow)"
                  className="map-path"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cilegon-location-section {
          background-color: var(--bg-cream, #faf9f6);
          padding: 6.5rem 0;
          width: 100%;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
        }

        .location-container {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 4.5rem;
          align-items: center;
          max-width: 1300px;
        }

        .location-text-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          z-index: 2;
        }

        .location-kicker {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--primary-green, #2d6a4f);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }

        .location-title {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(2.2rem, 4.5vw, 3.5rem);
          font-weight: 400;
          color: var(--bg-dark-green, #122c1e);
          line-height: 1.2;
          letter-spacing: -0.025em;
          margin-bottom: 1.75rem;
        }

        .title-bold {
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
        }

        .location-description {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: 1.05rem;
          line-height: 1.75;
          color: var(--text-muted, #57655e);
          margin-bottom: 2.25rem;
          max-width: 600px;
        }

        .location-cta-link {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--primary-green, #2d6a4f);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.2s ease;
          padding: 0.5rem 0;
        }

        .location-cta-link:hover {
          color: var(--bg-dark-green, #122c1e);
        }

        .cta-arrow-icon {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .location-cta-link:hover .cta-arrow-icon {
          transform: translateX(4px);
        }

        /* Right Map Column */
        .location-map-col {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          min-height: 360px;
        }

        .map-radial-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px);
          background-size: 16px 16px;
          pointer-events: none;
          opacity: 0.6;
        }

        .map-vector-wrapper {
          position: relative;
          width: 100%;
          max-width: 500px;
          aspect-ratio: 4 / 3;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cilegon-map-svg {
          width: 100%;
          height: 100%;
          cursor: pointer;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cilegon-map-svg:hover {
          transform: scale(1.04);
        }

        .map-path {
          transition: fill 0.3s ease;
        }

        @keyframes floatMap {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-float-map {
          animation: floatMap 4.5s ease-in-out infinite;
        }

        @media (max-width: 992px) {
          .location-container {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .cilegon-location-section {
            padding: 4.5rem 0;
          }

          .location-title {
            font-size: clamp(1.9rem, 5vw, 2.75rem);
          }

          .location-map-col {
            min-height: 280px;
          }
        }

        @media (max-width: 576px) {
          .cilegon-location-section {
            padding: 3.5rem 0;
          }

          .location-description {
            font-size: 0.975rem;
          }
        }
      `}</style>
    </section>
  );
}
