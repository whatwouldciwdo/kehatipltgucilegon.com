'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Trees, 
  Bird, 
  Waves, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  Award, 
  Leaf, 
  Zap, 
  Layers 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GridToPreviewGallery from '@/components/gallery/GridToPreviewGallery';
import { useLanguage } from '@/context/LanguageContext';

export default function GaleriPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />

      <main style={{ width: '100%', overflowX: 'clip', backgroundColor: 'var(--bg-cream, #faf9f6)' }}>
        {/* Full-Width Signature Hero Section matching Laporan & Profil */}
        <section className="galeri-hero-section">
          <div className="galeri-hero-canvas">
            {/* Dark gradient overlay */}
            <div className="canvas-overlay" />

            {/* Top-Right Floating Metrics Pills */}
            <div className="hero-top-stats">
              <div className="floating-stat-pill">
                <Trees size={16} color="var(--primary-green, #2d6a4f)" />
                <span className="stat-pill-num">137</span>
                <span className="stat-pill-text">{t('Spesies Flora', 'Flora Species')}</span>
              </div>
              <div className="floating-stat-pill">
                <Bird size={16} color="var(--primary-green, #2d6a4f)" />
                <span className="stat-pill-num">52</span>
                <span className="stat-pill-text">{t('Spesies Fauna', 'Fauna Species')}</span>
              </div>
              <div className="floating-stat-pill">
                <Waves size={16} color="var(--primary-green, #2d6a4f)" />
                <span className="stat-pill-num">19.000</span>
                <span className="stat-pill-text">{t('Bibit Mangrove', 'Mangrove Seedlings')}</span>
              </div>
              <div className="floating-stat-pill">
                <Award size={16} color="var(--primary-green, #2d6a4f)" />
                <span className="stat-pill-num">17,7 Ha</span>
                <span className="stat-pill-text">{t('Kawasan Ring 1 & 2', 'Conservation Area')}</span>
              </div>
            </div>

            {/* Bottom-Left White Editorial Corner Card */}
            <div className="hero-corner-card">
              <nav className="hero-breadcrumb" aria-label="Breadcrumb">
                <Link href="/" className="crumb-link">{t('Beranda', 'Home')}</Link>
                <span className="crumb-sep">/</span>
                <span className="crumb-link">{t('Keanekaragaman Hayati', 'Biodiversity')}</span>
                <span className="crumb-sep">/</span>
                <span className="crumb-current">{t('Galeri Kehati', 'Kehati Gallery')}</span>
              </nav>

              <h1 className="hero-heading">
                {t('Galeri Keanekaragaman Hayati & Kawasan', 'Biodiversity & Conservation Gallery')}
              </h1>

              <p className="hero-subtext">
                {t(
                  'Dokumentasi visual komprehensif pelestarian pohon langka endemik, suaka avifauna alami, restorasi mangrove pesisir, serta infrastruktur pembangkit ramah lingkungan PT PLN Indonesia Power UBP Cilegon.',
                  'Comprehensive visual documentation of rare endemic flora, natural bird sanctuaries, coastal mangrove restoration, and eco-efficient power generation at PT PLN Indonesia Power UBP Cilegon.'
                )}
              </p>

              <div className="hero-buttons-row">
                <a href="#galeri-interaktif" className="btn-hero-primary">
                  <span>{t('Eksplorasi Galeri Interaktif', 'Explore Interactive Gallery')}</span>
                  <ArrowRight size={16} />
                </a>
                <Link href="/laporan/2026" className="btn-hero-secondary">
                  <span>{t('Laporan Lengkap 2026', 'Full 2026 Report')}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Interactive Grid-To-Preview Gallery Component */}
        <section id="galeri-interaktif" className="interactive-gallery-section">
          <div className="galeri-intro-header">
            <h2 className="galeri-section-title">
              {t('Harmoni Alam & Pembangkit Listrik Bersih', 'Harmony of Nature & Clean Energy')}
            </h2>
            <p className="galeri-section-desc">
              {t(
                'Arahkan kursor pada kartu koleksi di bawah untuk melihat cuplikan multi-sudut dan detail konservasi secara dinamis, atau klik untuk membuka jendela foto resolusi tinggi.',
                'Hover over any collection card below to experience dynamic multi-angle previews and conservation details, or click to open full high-resolution views.'
              )}
            </p>
          </div>

          <GridToPreviewGallery />
        </section>
      </main>

      <Footer />

      <style jsx>{`
        /* Hero Section */
        .galeri-hero-section {
          width: 100%;
          background-color: var(--bg-cream, #faf9f6);
        }

        .galeri-hero-canvas {
          position: relative;
          width: 100%;
          min-height: 640px;
          background-image: url('/images/kehati-showcase/taman-kehati.jpg');
          background-size: cover;
          background-position: center;
          border-radius: 0;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .canvas-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.35) 0%,
            rgba(0, 0, 0, 0.1) 50%,
            rgba(18, 44, 30, 0.5) 100%
          );
          pointer-events: none;
        }

        .hero-top-stats {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: flex-end;
          gap: 0.85rem;
          padding: 10.5rem 4rem 2rem 2rem;
          flex-wrap: wrap;
        }

        .floating-stat-pill {
          background-color: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 50px;
          padding: 0.5rem 1.25rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        .stat-pill-num {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--primary-green, #2d6a4f);
        }

        .stat-pill-text {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--bg-dark-green, #122c1e);
        }

        .hero-corner-card {
          position: relative;
          z-index: 2;
          background-color: #ffffff;
          border-top-right-radius: 56px;
          padding: 4.5rem 4.25rem 3.75rem 4.5rem;
          max-width: clamp(680px, 46vw, 760px);
          min-height: 480px;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.16);
          align-self: flex-start;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero-breadcrumb {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          flex-wrap: wrap;
        }

        :global(.crumb-link) {
          color: var(--text-muted, #57655e);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        :global(.crumb-link:hover) {
          color: var(--primary-green, #2d6a4f);
          text-decoration: underline;
        }

        .crumb-sep {
          color: rgba(18, 44, 30, 0.3);
          font-weight: 400;
        }

        .crumb-current {
          color: var(--primary-green, #2d6a4f);
          font-weight: 700;
        }

        .hero-heading {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(1.85rem, 3.5vw, 2.6rem);
          font-weight: 700;
          line-height: 1.15;
          margin-bottom: 1rem;
          color: var(--bg-dark-green, #122c1e);
          letter-spacing: -0.025em;
        }

        .hero-subtext {
          font-size: 1rem;
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .hero-buttons-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        :global(.btn-hero-primary) {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--bg-dark-green, #122c1e);
          color: #ffffff;
          padding: 0.8rem 1.6rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          min-height: 44px;
          box-sizing: border-box;
          transition: all 0.25s ease;
          box-shadow: 0 4px 15px rgba(18, 44, 30, 0.2);
        }

        :global(.btn-hero-primary:hover) {
          background-color: var(--primary-green, #2d6a4f);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(45, 106, 79, 0.3);
        }

        :global(.btn-hero-primary:focus-visible) {
          outline: 2px solid var(--primary-green, #2d6a4f);
          outline-offset: 4px;
        }

        .btn-hero-secondary {
          display: inline-flex;
          align-items: center;
          padding: 0.8rem 1.6rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--bg-dark-green, #122c1e);
          background-color: transparent;
          border: 1.5px solid rgba(18, 44, 30, 0.2);
          text-decoration: none;
          min-height: 44px;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }

        .btn-hero-secondary:hover {
          background-color: rgba(18, 44, 30, 0.05);
          border-color: var(--bg-dark-green, #122c1e);
        }

        .btn-hero-secondary:focus-visible {
          outline: 2px solid var(--bg-dark-green, #122c1e);
          outline-offset: 4px;
        }

        /* Intro Header */
        .interactive-gallery-section {
          padding: 5.5rem 0 3rem 0;
          width: 100%;
        }

        .galeri-intro-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 3rem auto;
          padding: 0 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .badge-eco {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1rem;
          border-radius: 50px;
          background: rgba(18, 44, 30, 0.06);
          color: var(--primary-green, #2d6a4f);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          margin-bottom: 1.25rem;
        }

        .galeri-section-title {
          font-family: var(--font-outfit), system-ui, sans-serif;
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
          line-height: 1.2;
          letter-spacing: -0.025em;
          margin-bottom: 1rem;
        }

        .galeri-section-desc {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--text-muted, #57655e);
        }

        /* Responsiveness */
        @media (max-width: 992px) {
          .hero-top-stats {
            padding: 7rem 1.5rem 1rem 1.5rem;
            justify-content: flex-start;
          }

          .hero-corner-card {
            max-width: 100%;
            border-top-right-radius: 0;
            padding: 3rem 2rem 2.5rem 2rem;
            min-height: auto;
          }
        }

        @media (max-width: 576px) {
          .hero-corner-card {
            padding: 2.25rem 1.25rem 2rem 1.25rem;
          }

          .hero-buttons-row {
            flex-direction: column;
            width: 100%;
          }

          :global(.btn-hero-primary),
          .btn-hero-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}
