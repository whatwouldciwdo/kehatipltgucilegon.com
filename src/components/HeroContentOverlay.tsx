'use client';

import React from 'react';

interface HeroContentOverlayProps {
  topText?: string;
  mainHeadline?: string;
}

export default function HeroContentOverlay({
  topText = 'PT PLN Indonesia Power Unit Bisnis Pembangkitan Cilegon berkomitmen mewujudkan keandalan listrik bersih dan pelestarian keanekaragaman hayati Selat Sunda.',
  mainHeadline = 'Discover Your Path',
}: HeroContentOverlayProps) {
  return (
    <div className="hero-content-overlay">
      <div className="hero-content-fullwidth">
        {/* Top Editorial Subtitle Paragraph */}
        <div className="hero-top-text-box">
          <p className="hero-top-paragraph">{topText}</p>
        </div>

        {/* Full-width Delicate Horizontal Separator Line */}
        <div className="hero-horizontal-divider" />

        {/* Massive Impactful Full-width Bottom Headline */}
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
          padding-bottom: 2.5rem;
          z-index: 10;
          pointer-events: none;
          box-sizing: border-box;
        }

        .hero-content-fullwidth {
          width: 100%;
          padding: 0 4vw;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        /* Top Subtitle Text */
        .hero-top-text-box {
          max-width: 620px;
          margin-bottom: 1.25rem;
        }

        .hero-top-paragraph {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(0.95rem, 1.3vw, 1.15rem);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.95);
          line-height: 1.55;
          letter-spacing: -0.01em;
          margin: 0;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.5);
        }

        /* Full-Width Thin Horizontal Divider */
        .hero-horizontal-divider {
          width: 100%;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.35);
          margin-bottom: 0.5rem;
        }

        /* Massive Headline Full Width */
        .hero-headline-box {
          width: 100%;
          overflow: hidden;
        }

        .hero-main-headline {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(4.2rem, 12.5vw, 11rem);
          font-weight: 400;
          color: #faf9f6;
          line-height: 0.92;
          letter-spacing: -0.045em;
          margin: 0;
          white-space: nowrap;
          text-shadow: 0 4px 32px rgba(0, 0, 0, 0.5);
        }

        @media (max-width: 992px) {
          .hero-content-overlay {
            padding-bottom: 2rem;
          }

          .hero-content-fullwidth {
            padding: 0 5vw;
          }

          .hero-top-text-box {
            max-width: 500px;
            margin-bottom: 1rem;
          }

          .hero-main-headline {
            font-size: clamp(3.2rem, 11vw, 6.5rem);
            white-space: normal;
          }
        }

        @media (max-width: 576px) {
          .hero-content-overlay {
            padding-bottom: 1.5rem;
          }

          .hero-content-fullwidth {
            padding: 0 6vw;
          }

          .hero-top-paragraph {
            font-size: 0.9rem;
            line-height: 1.45;
          }

          .hero-main-headline {
            font-size: clamp(2.5rem, 12vw, 4rem);
            line-height: 1.0;
          }
        }
      `}</style>
    </div>
  );
}
