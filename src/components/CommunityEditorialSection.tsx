'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CommunityEditorialSectionProps {
  portraitImg?: string;
  groupImg?: string;
  paragraphText?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function CommunityEditorialSection({
  portraitImg = '/images/pltgu-cilegon-2.png',
  groupImg = '/images/pembangkit.JPG',
  paragraphText = 'PLTGU Cilegon merupakan pembangkit listrik tenaga gas dan uap yang terhubung dalam sistem jaringan 150 kV dan masuk dalam bagian dari sistem ketenagalistrikan Jawa Bali. PLTGU Cilegon sendiri memiliki luas area 17 Ha di Desa Margasari, Kecamatan Puloampel, Kabupaten Serang, Banten dengan kapasitas terpasang 740 MW dan berbahan bakar gas alam.',
  ctaText = 'Profil PLTGU Cilegon',
  ctaHref = '#tentang',
}: CommunityEditorialSectionProps) {
  return (
    <section className="community-editorial-section" aria-label="Profil & Kawasan PLTGU Cilegon">
      <div className="editorial-container">
        {/* Left Column: Full-height Plant Image */}
        <div className="editorial-left-col" data-reveal="left">
          <div className="editorial-portrait-wrapper">
            <img
              src={portraitImg}
              alt="Pembangkit Listrik Tenaga Gas dan Uap PLTGU Cilegon"
              className="editorial-portrait-img"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Column: Landscape Group Image + Narrative Text + Arrow CTA Button */}
        <div className="editorial-right-col">
          <div className="editorial-group-wrapper" data-reveal="right" data-reveal-delay="80">
            <img
              src={groupImg}
              alt="Tim Operasional PT PLN Indonesia Power PLTGU Cilegon"
              className="editorial-group-img"
              loading="lazy"
            />
          </div>

          <div className="editorial-text-content" data-reveal data-reveal-delay="160">
            <p className="editorial-paragraph">{paragraphText}</p>

            <a href={ctaHref} className="editorial-cta-btn" aria-label={ctaText}>
              <span className="cta-label">{ctaText}</span>
              <div className="cta-circle-arrow">
                <ArrowRight size={18} className="cta-arrow-icon" />
              </div>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .community-editorial-section {
          background-color: #ffffff;
          width: 100%;
          padding: clamp(3.5rem, 6vw, 6rem) 0 clamp(4.5rem, 7vw, 7rem) 0;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--border-light, #e4e1d9);
        }

        .editorial-container {
          width: 100%;
          max-width: 100%;
          padding: 0 clamp(1.5rem, 5vw, 6rem);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2.5rem, 5vw, 6rem);
          align-items: flex-start;
          box-sizing: border-box;
        }

        /* Left Column */
        .editorial-left-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
        }

        .editorial-portrait-wrapper {
          width: 100%;
          border-radius: 4px;
          overflow: hidden;
          background-color: #f3f1eb;
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.06);
        }

        .editorial-portrait-img {
          width: 100%;
          height: auto;
          aspect-ratio: 4/3;
          display: block;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .editorial-portrait-wrapper:hover .editorial-portrait-img {
          transform: scale(1.02);
        }

        /* Right Column */
        .editorial-right-col {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .editorial-group-wrapper {
          width: 100%;
          border-radius: 4px;
          overflow: hidden;
          background-color: #f3f1eb;
          margin-bottom: clamp(2rem, 3.5vw, 3rem);
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.06);
        }

        .editorial-group-img {
          width: 100%;
          height: auto;
          aspect-ratio: 16/9;
          display: block;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .editorial-group-wrapper:hover .editorial-group-img {
          transform: scale(1.02);
        }

        .editorial-text-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          max-width: 580px;
        }

        .editorial-paragraph {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(1.05rem, 1.25vw, 1.175rem);
          line-height: 1.75;
          color: #262927;
          letter-spacing: -0.01em;
          margin: 0 0 2.5rem 0;
        }

        /* Circular Arrow CTA Button */
        .editorial-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          min-height: 44px;
          text-decoration: none;
          color: #1a1c1b;
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: 1.05rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .editorial-cta-btn:focus-visible {
          outline: 2px solid var(--primary-green, #2d6a4f);
          outline-offset: 4px;
          border-radius: 4px;
        }

        .cta-label {
          transition: color 0.2s ease;
        }

        .cta-circle-arrow {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid #1a1c1b;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          background-color: transparent;
        }

        .cta-arrow-icon {
          transition: transform 0.3s ease;
        }

        .editorial-cta-btn:hover .cta-circle-arrow {
          background-color: #1a1c1b;
          color: #ffffff;
          transform: translateX(4px);
        }

        .editorial-cta-btn:hover .cta-label {
          color: var(--primary-green, #2d6a4f);
        }

        @media (max-width: 992px) {
          .community-editorial-section {
            padding: 3.5rem 0 5rem 0;
          }

          .editorial-container {
            grid-template-columns: 1fr;
            gap: 3.5rem;
            padding: 0 clamp(1.5rem, 4vw, 3rem);
          }

          .editorial-right-col {
            padding-top: 0;
          }

          .editorial-group-wrapper {
            margin-bottom: 2rem;
          }

          .editorial-text-content {
            max-width: 100%;
          }
        }

        @media (max-width: 576px) {
          .editorial-container {
            padding: 0 1.25rem;
            gap: 2.25rem;
          }

          .editorial-paragraph {
            font-size: 1rem;
            line-height: 1.65;
            margin-bottom: 1.75rem;
          }

          .cta-circle-arrow {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </section>
  );
}
