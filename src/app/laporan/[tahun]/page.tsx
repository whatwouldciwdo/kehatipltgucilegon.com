'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { Calendar, UserCheck, ShieldCheck, FileCheck, Layers, Sparkles, Trees, Bird, Waves, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YearNavigation from '@/components/laporan/YearNavigation';
import KpiCards from '@/components/laporan/KpiCards';
import InnovationCard from '@/components/laporan/InnovationCard';
import ReportAnalyticsSection from '@/components/laporan/ReportAnalyticsSection';
import TableOfContentsNav from '@/components/laporan/TableOfContentsNav';
import SpeciesTable from '@/components/laporan/SpeciesTable';
import ProgramSection from '@/components/laporan/ProgramSection';
import { useLanguage } from '@/context/LanguageContext';
import { REPORTS_DATA, ReportYearData } from '@/data/kehati-data';

interface ReportPageProps {
  params: Promise<{
    tahun: string;
  }>;
}

export default function YearlyReportPage({ params }: ReportPageProps) {
  const resolvedParams = use(params);
  const yearNum = parseInt(resolvedParams.tahun, 10);
  const { t } = useLanguage();

  const reportData: ReportYearData | undefined = REPORTS_DATA[yearNum];
  const prevReportData: ReportYearData | undefined = REPORTS_DATA[yearNum - 1];

  if (!reportData) {
    notFound();
  }

  return (
    <>
      <Header />

      <main style={{ width: '100%', overflowX: 'clip', backgroundColor: 'var(--bg-cream, #faf9f6)' }}>
        {/* Hero Section of the Report Year - Lithuania Travel inspired full-width layout */}
        <section className="report-detail-hero">
          <div className="report-hero-canvas">
            <div className="canvas-overlay" />

            {/* Top Meta Strip: Approval & Date */}
            <div className="hero-top-meta">
              <div className="meta-pill">
                <Calendar size={13} />
                <span>{t('Periode:', 'Period:')} {t(reportData.periodId, reportData.periodEn)}</span>
              </div>
              <div className="meta-pill">
                <span>{t('Pengesahan:', 'Approved:')} {reportData.date}</span>
              </div>
            </div>

            {/* Bottom-Left White Editorial Content Card */}
            <div className="hero-corner-card">
              <nav className="hero-breadcrumb" aria-label="Breadcrumb">
                <Link href="/" className="crumb-link">{t('Beranda', 'Home')}</Link>
                <span className="crumb-sep">/</span>
                <Link href="/laporan" className="crumb-link">{t('Laporan Kehati', 'Kehati Reports')}</Link>
                <span className="crumb-sep">/</span>
                <span className="crumb-current">{t(`Tahun ${yearNum}`, `Year ${yearNum}`)}</span>
              </nav>

                <h1 className="report-main-title">
                  {t(
                    `Laporan Keberhasilan Program Kehati ${yearNum}`,
                    `Biodiversity Implementation Report ${yearNum}`
                  )}
                </h1>

                <p className="report-main-subtext">
                  {t(
                    `Dokumentasi resmi pemantauan status keanekaragaman flora & fauna di Ring 1 & 2, penanaman ${reportData.totalMangrove.toLocaleString('id-ID')} mangrove, serta inovasi teknologi ramah lingkungan PT PLN Indonesia Power UBP Cilegon.`,
                    `Official monitoring outcomes of flora & fauna across Ring 1 & 2, ${reportData.totalMangrove.toLocaleString('id-ID')} mangroves planted, and green technology innovations at PT PLN Indonesia Power UBP Cilegon.`
                  )}
                </p>

                {/* Author & Validation Meta Strip */}
                <div className="meta-signatures-row">
                  <div className="meta-sig-item">
                    <span className="sig-label">{t('Disiapkan Oleh:', 'Prepared by:')}</span>
                    <span className="sig-name">{reportData.authors.join(', ')}</span>
                  </div>
                  {reportData.approvers.slice(0, 2).map((appr, idx) => (
                    <div key={idx} className="meta-sig-item">
                      <span className="sig-label">{t(appr.titleId, appr.titleEn)}:</span>
                      <span className="sig-name">{appr.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </section>

        {/* Year Tabs Navigation */}
        <YearNavigation currentYear={yearNum} />

        {/* Main Content Area */}
        <div className="container" style={{ padding: '3.5rem 2rem 7rem 2rem' }}>
          {/* Executive Summary Metrics */}
          <KpiCards data={reportData} prevData={prevReportData} />

          {/* Flagship Innovation Highlight */}
          {reportData.innovationHighlight && (
            <InnovationCard 
              innovation={reportData.innovationHighlight} 
              year={yearNum} 
            />
          )}

          {/* Table of Contents (Daftar Isi Laporan Resmi) */}
          <TableOfContentsNav programs={reportData.programs} year={yearNum} />

          {/* ========================================================================= */}
          {/* SEKSI 1: STATUS KEANEKARAGAMAN HAYATI */}
          {/* ========================================================================= */}
          <section id="status" className="report-chapter-section">
            <div className="chapter-banner">
              <div className="chapter-pill">{t('Status Konservasi', 'Conservation Status')}</div>
              <h2 className="chapter-heading">
                {t('1. Status Keanekaragaman Hayati (Flora & Fauna)', '1. Biodiversity Status (Flora & Fauna)')}
              </h2>
              <p className="chapter-desc">
                {t(
                  'Pemantauan status konservasi keanekaragaman hayati mencakup inventarisasi taksonomi, sebaran populasi, status kelangkaan (IUCN Red List & PermenLHK), serta indeks keragaman Shannon-Wiener.',
                  'Biodiversity conservation status monitoring covering taxonomy inventory, population distribution, IUCN & national protection status, and Shannon-Wiener diversity index.'
                )}
              </p>
            </div>

            {/* 1.1. Status Jenis Flora */}
            <div id="status-flora" className="subchapter-box">
              <SpeciesTable 
                titleId={`1.1. Status Jenis Flora (${yearNum})`}
                titleEn={`1.1. Flora Species Status (${yearNum})`}
                subtitleId={`Inventarisasi ${reportData.speciesCountFlora} spesies flora di kawasan konservasi Ring 1 & Ring 2 PT PLN IP UBP Cilegon.`}
                subtitleEn={`Inventory of ${reportData.speciesCountFlora} flora species across Ring 1 & Ring 2 conservation areas of PT PLN IP UBP Cilegon.`}
                speciesList={reportData.floraList}
                year={yearNum}
                type="flora"
              />
            </div>

            {/* 1.2. Status Jenis Fauna */}
            <div id="status-fauna" className="subchapter-box">
              <SpeciesTable 
                titleId={`1.2. Status Jenis Fauna (${yearNum})`}
                titleEn={`1.2. Fauna Species Status (${yearNum})`}
                subtitleId={`Inventarisasi ${reportData.speciesCountFauna} jenis satwa (Aves, Reptil, Amfibi, Ikan) terpantau di kawasan PLTGU Cilegon.`}
                subtitleEn={`Inventory of ${reportData.speciesCountFauna} fauna species (Birds, Reptiles, Amphibians, Fish) monitored in PLTGU Cilegon area.`}
                speciesList={reportData.faunaList}
                year={yearNum}
                type="fauna"
              />
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SEKSI 2: ABSOLUT PROGRAM & ALOKASI ANGGARAN */}
          {/* ========================================================================= */}
          <section id="absolut" className="report-chapter-section">
            <div className="chapter-banner">
              <div className="chapter-pill">{t('Analisis & Evaluasi', 'Analytics & Evaluation')}</div>
              <h2 className="chapter-heading">
                {t('2. Capaian Absolut & Alokasi Anggaran', '2. Absolute Outcomes & Budget Allocation')}
              </h2>
              <p className="chapter-desc">
                {t(
                  'Rekapitulasi peningkatan capaian absolut seluruh program konservasi dari baseline hingga tahun berjalan beserta alokasi realisasi anggaran lingkungan hidup.',
                  'Comprehensive summary of absolute achievements across all conservation programs from baseline to current year along with environmental budget investments.'
                )}
              </p>
            </div>

            <ReportAnalyticsSection 
              reportData={reportData} 
              year={yearNum} 
            />
          </section>

          {/* ========================================================================= */}
          {/* BAB 3: PENJELASAN PER PROGRAM KONSERVASI */}
          {/* ========================================================================= */}
          <section className="report-chapter-section">
            <ProgramSection 
              programs={reportData.programs} 
              year={yearNum} 
            />
          </section>

          {/* Bottom Navigation Link */}
          <div className="bottom-nav-box">
            <Link href="/laporan" className="btn-back-overview">
              <ArrowLeft size={16} />
              <span>{t('Kembali ke Ringkasan Semua Laporan (2023 - 2026)', 'Back to All Reports Overview (2023 - 2026)')}</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .report-detail-hero {
          padding: 0;
          margin: 0;
          width: 100%;
          background-color: var(--bg-cream, #faf9f6);
        }

        .report-hero-canvas {
          position: relative;
          width: 100%;
          min-height: 620px;
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

        .hero-top-meta {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          padding: 10.5rem 4rem 2rem 2rem;
          flex-wrap: wrap;
        }

        .meta-pill {
          background-color: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 50px;
          padding: 0.45rem 1.15rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--bg-dark-green, #122c1e);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
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
          font-size: 0.825rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
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

        .report-main-title {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(1.75rem, 3.5vw, 2.4rem);
          font-weight: 700;
          line-height: 1.15;
          margin-bottom: 0.85rem;
          color: var(--bg-dark-green, #122c1e);
          letter-spacing: -0.025em;
        }

        .report-main-subtext {
          font-size: 0.95rem;
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 1.75rem;
        }

        .meta-signatures-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 1rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(18, 44, 30, 0.08);
        }

        .meta-sig-item {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .sig-label {
          font-size: 0.7rem;
          color: var(--text-muted, #57655e);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .sig-name {
          font-size: 0.875rem;
          color: var(--bg-dark-green, #122c1e);
          font-weight: 700;
        }

        .report-chapter-section {
          margin-bottom: 4rem;
          scroll-margin-top: 100px;
        }

        .chapter-banner {
          background: linear-gradient(135deg, rgba(45, 106, 79, 0.08) 0%, rgba(18, 44, 30, 0.03) 100%);
          border-left: 4px solid var(--primary-green, #2d6a4f);
          border-radius: 0 16px 16px 0;
          padding: 1.75rem 2rem;
          margin-bottom: 2.25rem;
        }

        .chapter-pill {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--primary-green, #2d6a4f);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 0.35rem;
        }

        .chapter-heading {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(1.4rem, 3vw, 1.85rem);
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.015em;
        }

        .chapter-desc {
          font-size: 0.95rem;
          color: #4b5563;
          line-height: 1.6;
          margin: 0;
          max-width: 900px;
        }

        .subchapter-box {
          margin-bottom: 2.5rem;
          scroll-margin-top: 100px;
        }

        .bottom-nav-box {
          display: flex;
          justify-content: center;
          margin-top: 3rem;
        }

        :global(.btn-back-overview) {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #ffffff;
          color: var(--bg-dark-green, #122c1e);
          border: 1.5px solid var(--border-light, rgba(18, 44, 30, 0.15));
          padding: 0.85rem 1.75rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
        }

        :global(.btn-back-overview:hover) {
          background-color: var(--bg-dark-green, #122c1e);
          color: #ffffff;
          border-color: var(--bg-dark-green, #122c1e);
          box-shadow: 0 8px 25px rgba(18, 44, 30, 0.15);
        }

        @media (max-width: 768px) {
          .chapter-banner {
            padding: 1.25rem 1.25rem;
          }
        }
      `}</style>
    </>
  );
}
