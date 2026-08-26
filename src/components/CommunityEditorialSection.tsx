'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CommunityEditorialSectionProps {
  badgeImg?: string;
  portraitImg?: string;
  groupImg?: string;
  paragraphText?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function CommunityEditorialSection({
  badgeImg = '/images/editorial/badge.png',
  portraitImg = '/images/editorial/portrait.png',
  groupImg = '/images/pembangkit.JPG',
  paragraphText = 'PLTGU Cilegon merupakan pembangkit listrik tenaga gas dan uap yang terhubung dalam sistem jaringan 150 kV dan masuk dalam bagian dari sistem ketenagalistrikan Jawa Bali. PLTGU Cilegon sendiri memiliki luas area 17 Ha di Desa Margasari, Kecamatan Puloampel, Kabupaten Serang, Banten dengan kapasitas terpasang 740 MW dan berbahan bakar gas alam.',
  ctaText = 'Profil PLTGU Cilegon',
  ctaHref = '#tentang',
}: CommunityEditorialSectionProps) {
  return (
    <section className="community-editorial-section" aria-label="Community Editorial">
      <div className="editorial-container">
        {/* Left Column: Top Badge + Tall Portrait Image */}
        <div className="editorial-left-col">
          {badgeImg && (
            <div className="editorial-badge-wrapper">
              <img 
                src={badgeImg} 
                alt="Wesley College Crest Badge" 
                className="editorial-badge-img" 
              />
            </div>
          )}
          <div className="editorial-portrait-wrapper">
            <img
              src={portraitImg}
              alt="Community Life Portrait"
              className="editorial-portrait-img"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Column: Landscape Group Image + Narrative Text + Arrow CTA Button */}
        <div className="editorial-right-col">
          <div className="editorial-group-wrapper">
            <img
              src={groupImg}
              alt="Community Group Photo"
              className="editorial-group-img"
              loading="lazy"
            />
          </div>

          <div className="editorial-text-content">
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
          background-color: #ffffff; /* Match 740 MW metrics section white background */
          width: 100%;
          padding: 4.5rem 0 7rem 0;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--border-light, #e4e1d9);
        }

        .editorial-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 3.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5.5rem;
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

        .editorial-badge-wrapper {
          margin-bottom: 1.25rem;
        }

        .editorial-badge-img {
          width: 48px;
          height: auto;
          display: block;
          object-fit: contain;
        }

        .editorial-portrait-wrapper {
          width: 100%;
          border-radius: 0;
          overflow: hidden;
          background-color: #f3f1eb;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
        }

        .editorial-portrait-img {
          width: 100%;
          height: auto;
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
          padding-top: 3.25rem; /* Align below left badge height */
        }

        .editorial-group-wrapper {
          width: 100%;
          border-radius: 0;
          overflow: hidden;
          background-color: #f3f1eb;
          margin-bottom: 3.5rem;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
        }

        .editorial-group-img {
          width: 100%;
          height: auto;
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
          max-width: 480px;
        }

        .editorial-paragraph {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(1rem, 1.25vw, 1.125rem);
          line-height: 1.7;
          color: #262927;
          letter-spacing: -0.01em;
          margin: 0 0 2.5rem 0;
        }

        /* Circular Arrow CTA Button */
        .editorial-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          text-decoration: none;
          color: #1a1c1b;
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: 1.05rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .cta-label {
          transition: color 0.2s ease;
        }

        .cta-circle-arrow {
          width: 42px;
          height: 42px;
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
            padding: 3rem 0 5rem 0;
          }

          .editorial-container {
            grid-template-columns: 1fr;
            gap: 3.5rem;
            padding: 0 2rem;
          }

          .editorial-right-col {
            padding-top: 0;
          }

          .editorial-group-wrapper {
            margin-bottom: 2.5rem;
          }

          .editorial-text-content {
            max-width: 100%;
          }
        }

        @media (max-width: 576px) {
          .editorial-container {
            padding: 0 1.25rem;
            gap: 2.5rem;
          }

          .editorial-paragraph {
            font-size: 0.95rem;
            margin-bottom: 2rem;
          }

          .editorial-badge-img {
            width: 40px;
          }

          .cta-circle-arrow {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </section>
  );
}
