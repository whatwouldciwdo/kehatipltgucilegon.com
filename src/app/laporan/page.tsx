'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Trees, Bird, Waves, Sparkles, FileText, Calendar, Compass, ShieldCheck, Heart, Info } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YearNavigation from '@/components/laporan/YearNavigation';
import YoyComparisonChart from '@/components/laporan/YoyComparisonChart';
import { useLanguage } from '@/context/LanguageContext';
import { REPORTS_DATA, OVERVIEW_YEARS } from '@/data/kehati-data';

export default function LaporanIndexPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />

      <main style={{ width: '100%', overflowX: 'clip', backgroundColor: 'var(--bg-cream, #faf9f6)' }}>
        {/* Page Hero Section - Lithuania Travel inspired full-width layout */}
        <section className="laporan-hero-section">
          <div className="laporan-hero-canvas">
            {/* Subtle top overlay */}
            <div className="canvas-overlay" />

            {/* Top-right Floating Key Stats */}
            <div className="hero-top-stats">
              <div className="floating-stat-pill">
                <span className="stat-pill-num">23.670</span>
                <span className="stat-pill-text">{t('Individu Flora', 'Flora Individuals')}</span>
              </div>
              <div className="floating-stat-pill">
                <span className="stat-pill-num">19.000</span>
                <span className="stat-pill-text">{t('Mangrove Ditanam', 'Mangroves Planted')}</span>
              </div>
              <div className="floating-stat-pill">
                <span className="stat-pill-num">1.268</span>
                <span className="stat-pill-text">{t('Individu Fauna', 'Fauna Individuals')}</span>
              </div>
            </div>

            {/* Bottom-Left White Editorial Content Card */}
            <div className="hero-corner-card">
              <nav className="hero-breadcrumb" aria-label="Breadcrumb">
                <Link href="/" className="crumb-link">{t('Beranda', 'Home')}</Link>
                <span className="crumb-sep">/</span>
                <span className="crumb-current">{t('Laporan Kehati 2023 - 2026', 'Kehati Reports 2023 - 2026')}</span>
              </nav>

              <h1 className="hero-heading">
                {t('Laporan Keberhasilan Program Kehati', 'Biodiversity Program Success Reports')}
              </h1>

              <p className="hero-subtext">
                {t(
                  'Dokumentasi resmi pemantauan status flora & fauna di kawasan konservasi Ring 1 & 2, rehabilitasi 19.000 mangrove pesisir, serta inovasi teknologi berkelanjutan PT PLN Indonesia Power UBP Cilegon.',
                  'Official documentation of flora & fauna status across Ring 1 & 2 conservation zones, 19,000 coastal mangroves restoration, and sustainable technology innovations at PT PLN Indonesia Power UBP Cilegon.'
                )}
              </p>

              <div className="hero-buttons-row">
                <Link href="/laporan/2026" className="btn-hero-primary">
                  <span>{t('Buka Laporan 2026', 'Open 2026 Report')}</span>
                  <ArrowRight size={16} />
                </Link>
                <a href="#arsip-tahunan" className="btn-hero-secondary">
                  <span>{t('Pilih Tahun Laporan', 'Select Report Year')}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Year Navigation Bar */}
        <YearNavigation />

        {/* Multi-Year YoY Chart Comparison */}
        <section style={{ padding: '4rem 0 2rem 0' }}>
          <div className="container">
            <YoyComparisonChart />
          </div>
        </section>

        {/* Yearly Report Cards Section */}
        <section id="arsip-tahunan" style={{ padding: '1rem 0 7rem 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
              <div className="badge-eco">{t('Arsip & Detail Tahunan', 'Annual Archives & Details')}</div>
              <h2 
                style={{ 
                  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
                  color: 'var(--bg-dark-green, #122c1e)',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  marginTop: '0.75rem'
                }}
              >
                {t('Pilih Tahun Laporan untuk Eksplorasi Data Lengkap', 'Select Report Year to Explore Full Data')}
              </h2>
              <p style={{ color: 'var(--text-muted, #57655e)', fontSize: '1.05rem', marginTop: '0.5rem' }}>
                {t(
                  'Setiap laporan menyajikan rincian metodologi absolut, tabel status spesies IUCN, grafik program, dan dokumentasi lapangan.',
                  'Each annual report provides absolute methodology details, IUCN species status tables, program charts, and field documentation.'
                )}
              </p>
            </div>

            {/* Yearly Report Cards Section - Lithuania Travel Card Carousel Design */}
            <div className="travel-cards-container">
              <div className="travel-cards-grid">
                {OVERVIEW_YEARS.map((year) => {
                  const item = REPORTS_DATA[year];
                  const yearImages: Record<number, string> = {
                    2023: '/images/kehati-showcase/nursery-pembibitan.jpg',
                    2024: '/images/kehati-showcase/suaka-fauna.jpg',
                    2025: '/images/kehati-showcase/taman-kehati.jpg',
                    2026: '/images/kehati-showcase/restorasi-mangrove.jpg'
                  };
                  const bgImg = yearImages[year] || '/images/pembangkit.JPG';

                  return (
                    <Link 
                      key={year} 
                      href={`/laporan/${year}`} 
                      className="travel-year-card"
                    >
                      {/* Background Image Layer */}
                      <div 
                        className="travel-card-bg"
                        style={{ backgroundImage: `url(${bgImg})` }}
                      />

                      {/* Top Overlay Tag */}
                      <div className="travel-card-top-tag">
                        {year === 2026 && (
                          <span className="badge-new-pill">{t('Edisi Terbaru', 'Latest Edition')}</span>
                        )}
                      </div>

                      {/* Bottom-Left Mint Cutout Tab with Hover Action Controls */}
                      <div className="travel-card-mint-tab">
                        <h3 className="mint-tab-title">
                          {t(`Laporan Kehati ${year}`, `Kehati Report ${year}`)}
                        </h3>

                        <div className="mint-tab-actions-row">
                          <div className="mint-left-icons">
                            <button 
                              type="button" 
                              className="icon-heart-circle" 
                              aria-label={t('Simpan Favorit', 'Save Favorite')}
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            >
                              <Heart size={15} />
                            </button>
                            <button 
                              type="button" 
                              className="icon-info-btn" 
                              aria-label={t('Informasi Laporan', 'Report Info')}
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            >
                              <Info size={17} />
                            </button>
                          </div>

                          <div className="mint-right-action">
                            <span className="btn-circle-arrow">
                              <ArrowRight size={18} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Bottom Carousel Controls: Dots on left, Arrow buttons on right */}
              <div className="travel-carousel-controls">
                <div className="carousel-dots-list">
                  <span className="dot-pill active" />
                  <span className="dot-circle" />
                  <span className="dot-circle" />
                  <span className="dot-circle" />
                </div>

                <div className="carousel-arrows-group">
                  <button className="carousel-arrow-btn" aria-label="Previous">
                    <ArrowLeft size={18} />
                  </button>
                  <button className="carousel-arrow-btn" aria-label="Next">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .laporan-hero-section {
          padding: 0;
          margin: 0;
          width: 100%;
          background-color: var(--bg-cream, #faf9f6);
        }

        .laporan-hero-canvas {
          position: relative;
          width: 100%;
          min-height: 640px;
          background-image: url('/images/pembangkit.JPG');
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
            rgba(0, 0, 0, 0.25) 0%,
            rgba(0, 0, 0, 0.05) 50%,
            rgba(18, 44, 30, 0.4) 100%
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
          transition: all 0.25s ease;
          box-shadow: 0 4px 15px rgba(18, 44, 30, 0.2);
        }

        :global(.btn-hero-primary:hover) {
          background-color: var(--primary-green, #2d6a4f);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(45, 106, 79, 0.3);
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
          transition: all 0.2s ease;
        }

        .btn-hero-secondary:hover {
          background-color: rgba(18, 44, 30, 0.05);
          border-color: var(--bg-dark-green, #122c1e);
        }

        /* Lithuania Travel Card Grid & Carousel Styling */
        .travel-cards-container {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          width: 100%;
        }

        .travel-cards-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          width: 100%;
        }

        @media (min-width: 640px) {
          .travel-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .travel-cards-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        :global(.travel-year-card) {
          position: relative;
          height: 380px;
          border-radius: 20px;
          overflow: hidden;
          display: block;
          text-decoration: none;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          background-color: #f3f4f6;
        }

        .travel-card-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
        }

        .travel-card-top-tag {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          z-index: 2;
        }

        .badge-new-pill {
          background-color: #ffc107;
          color: #122c1e;
          font-size: 0.75rem;
          font-weight: 800;
          padding: 0.3rem 0.75rem;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        /* Mint Tab: Compact in normal state, smoothly expands on hover */
        .travel-card-mint-tab {
          position: absolute;
          bottom: 0;
          left: 0;
          background-color: #dcefe8;
          border-top-right-radius: 28px;
          padding: 1.35rem 1.65rem;
          width: 84%;
          max-width: 84%;
          z-index: 2;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.travel-year-card:hover .travel-card-mint-tab) {
          padding: 1.4rem 1.65rem 1.35rem 1.65rem;
          width: 88%;
          max-width: 88%;
        }

        .mint-tab-title {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: #122c1e;
          margin: 0;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        /* Action Row: Hidden initially (Gambar 1), reveals and slides in on hover (Gambar 2) */
        .mint-tab-actions-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-height: 0;
          opacity: 0;
          transform: translateY(12px);
          margin-top: 0;
          overflow: hidden;
          pointer-events: none;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.travel-year-card:hover .mint-tab-actions-row) {
          max-height: 50px;
          opacity: 1;
          transform: translateY(0);
          margin-top: 1.15rem;
          pointer-events: auto;
        }

        .mint-left-icons {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .icon-heart-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #ffffff;
          color: #122c1e;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition: all 0.2s ease;
        }

        .icon-heart-circle:hover {
          color: #e11d48;
          transform: scale(1.1);
        }

        .icon-info-btn {
          background: none;
          border: none;
          color: #122c1e;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 4px;
          opacity: 0.85;
          transition: opacity 0.2s ease;
        }

        .icon-info-btn:hover {
          opacity: 1;
          transform: scale(1.1);
        }

        .btn-circle-arrow {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #265345;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(18, 44, 30, 0.15);
        }

        :global(.travel-year-card:hover .btn-circle-arrow:hover) {
          background-color: #122c1e;
          transform: scale(1.08);
        }

        /* Bottom Carousel Controls */
        .travel-carousel-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.5rem;
        }

        .carousel-dots-list {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .dot-pill {
          width: 24px;
          height: 6px;
          background-color: var(--primary-green, #2d6a4f);
          border-radius: 6px;
        }

        .dot-circle {
          width: 6px;
          height: 6px;
          background-color: #cbd5e1;
          border-radius: 50%;
        }

        .carousel-arrows-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .carousel-arrow-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(18, 44, 30, 0.15);
          background-color: #ffffff;
          color: var(--bg-dark-green, #122c1e);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .carousel-arrow-btn:hover {
          background-color: var(--bg-dark-green, #122c1e);
          color: #ffffff;
          border-color: var(--bg-dark-green, #122c1e);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(18, 44, 30, 0.15);
        }
      `}</style>
    </>
  );
}
