'use client';

import React from 'react';

interface HeroContentOverlayProps {
  topText?: string;
  mainHeadline?: string;
}

export default function HeroContentOverlay({
  topText = 'PT PLN Indonesia Power Unit Bisnis Pembangkitan Cilegon berkomitmen mewujudkan keandalan listrik bersih dan pelestarian keanekaragaman hayati Selat Sunda.',
  mainHeadline = 'Discover UBP Cilegon',
}: HeroContentOverlayProps) {
  return (
    <div className="hero-content-overlay">
      <div className="hero-content-fullwidth">
        {/* Top Editorial Subtitle Paragraph (Safely below navbar with breathing room) */}
        <div className="hero-top-text-box">
          <p className="hero-top-paragraph">{topText}</p>
        </div>

        {/* Full-width Delicate Horizontal Separator Line */}
        <div className="hero-horizontal-divider" />

        {/* Impactful Full-width Bottom Headline: Discover UBP Cilegon */}
        <div className="hero-headline-box">
          <h1 className="hero-main-headline">{mainHeadline}</h1>
        </div>
      </div>

      <style jsx>{`
        .hero-content-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding-top: clamp(6.5rem, 12vh, 8.5rem);
          padding-bottom: clamp(2rem, 4vh, 3rem);
          z-index: 10;
          pointer-events: none;
          box-sizing: border-box;
        }

        .hero-content-fullwidth {
          width: 100%;
          padding: 0 clamp(1.5rem, 4vw, 5rem);
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-top: auto;
        }

        /* Top Subtitle Text Box - positioned with comfortable breathing space */
        .hero-top-text-box {
          max-width: 680px;
          margin-bottom: 1.5rem;
          margin-top: 1rem;
        }

        .hero-top-paragraph {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(0.95rem, 1.2vw, 1.15rem);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.95);
          line-height: 1.6;
          letter-spacing: -0.01em;
          margin: 0;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.5);
        }

        /* Full-Width Thin Horizontal Divider */
        .hero-horizontal-divider {
          width: 100%;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.35);
          margin-bottom: 0.75rem;
        }

        /* Massive Headline Full Width */
        .hero-headline-box {
          width: 100%;
          overflow: hidden;
        }

        .hero-main-headline {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(3.2rem, 8.2vw, 7.8rem);
          font-weight: 400;
          color: #faf9f6;
          line-height: 0.95;
          letter-spacing: -0.04em;
          margin: 0;
          white-space: nowrap;
          text-shadow: 0 4px 32px rgba(0, 0, 0, 0.5);
        }

        @media (max-width: 992px) {
          .hero-content-overlay {
            padding-top: 5.5rem;
            padding-bottom: 2rem;
          }

          .hero-content-fullwidth {
            padding: 0 5vw;
          }

          .hero-top-text-box {
            max-width: 540px;
            margin-bottom: 1.25rem;
          }

          .hero-main-headline {
            font-size: clamp(2.8rem, 8.5vw, 5.2rem);
            white-space: normal;
          }
        }

        @media (max-width: 576px) {
          .hero-content-overlay {
            padding-top: 4.5rem;
            padding-bottom: 1.5rem;
          }

          .hero-content-fullwidth {
            padding: 0 6vw;
          }

          .hero-top-text-box {
            margin-bottom: 0.85rem;
          }

          .hero-top-paragraph {
            font-size: 0.875rem;
            line-height: 1.45;
          }

          .hero-main-headline {
            font-size: clamp(2.2rem, 10vw, 3.4rem);
            line-height: 1.05;
          }
        }
      `}</style>
    </div>
  );
}
