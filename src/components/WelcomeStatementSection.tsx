'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface WelcomeStatementSectionProps {
  kicker?: string;
  line1White?: string;
  line2WhitePrefix?: string;
  line2Highlight?: string;
  line3WhitePrefix?: string;
  line3Muted?: string;
  line4Muted?: string;
  backgroundColor?: string;
  kickerColor?: string;
  highlightColor?: string;
}

export default function WelcomeStatementSection({
  kicker = 'SELAMAT DATANG',
  line1White = 'PLN Indonesia Power UBP Cilegon',
  line2WhitePrefix = 'komitmen kami ',
  line2Highlight = 'lebih dari sekadar membangkitkan energi listrik.',
  line3WhitePrefix = 'Kehati ',
  line3Muted = 'adalah wujud nyata kelestarian masa depan, tempat',
  line4Muted = 'inovasi hijau dan keharmonisan alam menyatu.',
  backgroundColor = 'var(--bg-dark-green, #122c1e)', // Deep dark green matching site theme
  kickerColor = 'var(--accent-lime, #b7e4c7)',       // Light lime accent for tag
  highlightColor = 'var(--accent-lime, #b7e4c7)',    // Vibrant light lime text highlight
}: WelcomeStatementSectionProps) {
  const outerRef = useRef<HTMLDivElement>(null);

  // Scroll progress for the pinned 250vh container
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });

  // Staggered progressive illumination transforms while section is pinned (0.15 dim -> 1.0 bright)
  const line1Opacity = useTransform(scrollYProgress, [0.0, 0.22], [0.18, 1.0]);
  const line2Opacity = useTransform(scrollYProgress, [0.22, 0.48], [0.18, 1.0]);
  const line3Opacity = useTransform(scrollYProgress, [0.48, 0.72], [0.18, 1.0]);
  const line4Opacity = useTransform(scrollYProgress, [0.72, 0.90], [0.18, 1.0]);

  // Y motion translations
  const line1Y = useTransform(scrollYProgress, [0.0, 0.22], [14, 0]);
  const line2Y = useTransform(scrollYProgress, [0.22, 0.48], [14, 0]);
  const line3Y = useTransform(scrollYProgress, [0.48, 0.72], [14, 0]);
  const line4Y = useTransform(scrollYProgress, [0.72, 0.90], [14, 0]);

  return (
    <div 
      ref={outerRef} 
      className="pin-scroll-outer"
      style={{ backgroundColor }}
    >
      {/* Sticky viewport pinned wrapper */}
      <section 
        className="sticky-viewport-wrapper"
        aria-label="Welcome Statement"
      >
        <div className="container welcome-container">
          {/* Left Column Tag & Logo */}
          <div className="kicker-col">
            <span className="welcome-kicker" style={{ color: kickerColor }}>
              {kicker}
            </span>
            <div className="kicker-logo-wrapper">
              <img
                src="/images/logo-kehati-ubpclg.png"
                alt="Kehati UBP Cilegon Logo"
                className="kicker-logo-img"
              />
            </div>
          </div>

          {/* Right Column Pinned Scroll Illuminated Statement Text */}
          <div className="statement-text-col">
            <h2 className="statement-heading">
              {/* Line 1 */}
              <motion.span 
                className="statement-line"
                style={{ opacity: line1Opacity, y: line1Y }}
              >
                <span className="text-white">{line1White}</span>
              </motion.span>
              <br />

              {/* Line 2 */}
              <motion.span 
                className="statement-line"
                style={{ opacity: line2Opacity, y: line2Y }}
              >
                <span className="text-white">{line2WhitePrefix}</span>
                <span className="text-highlight" style={{ color: highlightColor }}>
                  {line2Highlight}
                </span>
              </motion.span>
              <br />

              {/* Line 3 */}
              <motion.span 
                className="statement-line"
                style={{ opacity: line3Opacity, y: line3Y }}
              >
                <span className="text-white">{line3WhitePrefix}</span>
                <span className="text-soft-white">{line3Muted}</span>
              </motion.span>
              <br />

              {/* Line 4 */}
              <motion.span 
                className="statement-line"
                style={{ opacity: line4Opacity, y: line4Y }}
              >
                <span className="text-soft-white">{line4Muted}</span>
              </motion.span>
            </h2>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Outer Pin Container (Scroll Distance) */
        .pin-scroll-outer {
          position: relative;
          height: 250vh; /* Gives user ample scroll room to illuminate all text before unpinning */
          width: 100%;
        }

        /* Sticky Viewport Wrapper (Locks Section in View) */
        .sticky-viewport-wrapper {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          color: #ffffff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-sizing: border-box;
        }

        .welcome-container {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 3.5rem;
          align-items: flex-start;
          max-width: 1300px;
          width: 100%;
        }

        .kicker-col {
          padding-top: 0.75rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
        }

        .kicker-logo-wrapper {
          margin-top: 6.5rem;
          width: 230px;
        }

        .kicker-logo-img {
          width: 230px;
          height: auto;
          max-height: 180px;
          object-fit: contain;
          object-position: left center;
          filter: brightness(0) invert(1);
          opacity: 0.98;
          transition: opacity 0.3s ease;
        }

        .welcome-kicker {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          display: inline-block;
        }

        .statement-text-col {
          max-width: 1020px;
        }

        .statement-heading {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(2.3rem, 5.2vw, 4.1rem);
          font-weight: 500;
          line-height: 1.22;
          letter-spacing: -0.025em;
          margin: 0;
        }

        .statement-line {
          display: inline-block;
          will-change: opacity, transform;
        }

        .text-white {
          color: #ffffff;
          font-weight: 500;
        }

        .text-highlight {
          font-weight: 500;
          text-shadow: 0 0 30px rgba(183, 228, 199, 0.25);
        }

        .text-soft-white {
          color: rgba(250, 250, 250, 0.85);
          font-weight: 400;
        }

        @media (max-width: 992px) {
          .pin-scroll-outer {
            height: 220vh;
          }

          .welcome-container {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .statement-heading {
            font-size: clamp(1.9rem, 6vw, 3rem);
            line-height: 1.25;
          }
        }

        @media (max-width: 576px) {
          .pin-scroll-outer {
            height: 200vh;
          }

          .welcome-kicker {
            font-size: 0.775rem;
          }

          .statement-heading {
            font-size: 1.7rem;
            line-height: 1.3;
          }
        }
      `}</style>
    </div>
  );
}
