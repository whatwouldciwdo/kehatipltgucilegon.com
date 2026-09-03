'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Trees, 
  Bird, 
  Waves, 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  Leaf
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Report2026PreviewSection() {
  const { t } = useLanguage();

  const metrics = [
    {
      icon: <Trees size={26} color="var(--primary-green, #2d6a4f)" />,
      num: '23.670',
      unit: t('Batang', 'Stems'),
      label: t('Flora Terpantau', 'Monitored Flora'),
      detail: t('137 Spesies (H\' 3.374)', '137 Species (H\' 3.374)'),
      growth: '+32.7%',
      href: '/laporan/2026#flora'
    },
    {
      icon: <Bird size={26} color="var(--primary-green, #2d6a4f)" />,
      num: '1.268',
      unit: t('Individu', 'Indiv.'),
      label: t('Fauna & Satwa', 'Fauna & Wildlife'),
      detail: t('52 Jenis (1.122 Aves, H\' 3.267)', '52 Species (1,122 Birds, H\' 3.267)'),
      growth: '+65.5%',
      href: '/laporan/2026#fauna'
    },
    {
      icon: <Waves size={26} color="var(--primary-green, #2d6a4f)" />,
      num: '19.000',
      unit: t('Pohon', 'Trees'),
      label: t('Mangrove Ditanam', 'Mangroves Planted'),
      detail: t('0.45 Ha Pesisir Lontar', '0.45 Ha Coastal Area'),
      growth: '+31.0%',
      href: '/laporan/2026#program-mangrove'
    },
    {
      icon: <Leaf size={26} color="var(--primary-green, #2d6a4f)" />,
      num: '17,7',
      unit: t('Hektar', 'Hectares'),
      label: t('Zona Konservasi', 'Conservation Zone'),
      detail: t('Ring 1 & 2 PLTGU Cilegon', 'Ring 1 & 2 Buffer Area'),
      growth: t('PROPER Emas', 'PROPER Gold'),
      href: '/laporan/2026#analitik'
    },
  ];

  const highlights = [
    {
      tag: t('Inovasi Unggulan 2026', 'Flagship Innovation 2026'),
      tagColor: 'var(--primary-green, #2d6a4f)',
      title: t('Biowing Connect: Digitalisasi Regenerasi Alami', 'Biowing Connect: Digital Natural Regeneration'),
      desc: t(
        'Pemanfaatan satwa burung lokal pemakan buah sebagai agen penyebar benih alami, dipantau melalui sensor spasial dan sistem analitik keanekaragaman hayati.',
        'Utilizing native frugivorous birds as natural seed dispersers, tracked via spatial IoT sensors and biodiversity analytics.'
      ),
      img: '/img/laporan/2026/biowing-connect-system.png',
      href: '/laporan/2026#program-biowing-connect',
    },
    {
      tag: t('Teknologi Sirkular', 'Circular Technology'),
      tagColor: '#007bff',
      title: t('C-Flora Smart Watering IoT', 'C-Flora Smart Watering IoT'),
      desc: t(
        'Sistem otomasi penyiraman kebun bibit berbasis kelembaban tanah dengan sirkularitas air kondensat pembangkit untuk efisiensi sumber daya air 100%.',
        'IoT automated nursery watering based on soil moisture recycling plant condensate water for 100% water resource efficiency.'
      ),
      img: '/img/laporan/2026/sustainable-cycle-smart-watering.png',
      href: '/laporan/2026#program-c-flora',
    },
    {
      tag: t('Ekosistem Pesisir', 'Coastal Ecosystem'),
      tagColor: '#d97706',
      title: t('Restorasi 19.000 Mangrove Desa Lontar', '19,000 Mangrove Restoration at Lontar'),
      desc: t(
        'Penanaman kumulatif Rhizophora apiculata untuk menahan abrasi pantai, merestorasi tambak kritis, dan membangun habitat biota pesisir Teluk Banten.',
        'Cumulative Rhizophora apiculata planting mitigating coastal abrasion, restoring critical wetlands, and fostering marine habitats.'
      ),
      img: '/img/laporan/2026/penanaman-mangrove-2026.png',
      href: '/laporan/2026#program-mangrove',
    }
  ];

  return (
    <section className="report-2026-preview-section" aria-label="Ikhtisar Laporan Kehati 2026">
      <div className="report-2026-container">
        {/* Header Block */}
        <div className="report-2026-header" data-reveal>
          <div className="header-left">
            <h2 className="report-preview-title">
              {t('Ikhtisar Capaian Keanekaragaman Hayati 2026', '2026 Biodiversity Achievement Overview')}
            </h2>
            <p className="report-preview-subtitle">
              {t(
                'Data pemantauan status konservasi flora, suaka satwa fauna, restorasi ekosistem pesisir, serta inovasi teknologi hijau mutakhir di kawasan PLTGU Cilegon.',
                'Monitoring data of flora conservation, wildlife sanctuary, coastal mangrove restoration, and cutting-edge green technologies at PLTGU Cilegon.'
              )}
            </p>
          </div>

          <div className="header-right">
            <Link href="/laporan/2026" className="btn-open-full-report">
              <span>{t('Buka Laporan Lengkap 2026', 'Open Full 2026 Report')}</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards Grid */}
        <div className="report-metrics-grid">
          {metrics.map((m, idx) => (
            <Link key={idx} href={m.href} className="metric-card-link" data-reveal="scale" data-reveal-delay={idx * 90}>
              <div className="metric-card-top">
                <div className="metric-icon-box">
                  {m.icon}
                </div>
                <span className="metric-growth-badge">{m.growth}</span>
              </div>

              <div className="metric-val-row">
                <span className="metric-main-num">{m.num}</span>
                <span className="metric-unit">{m.unit}</span>
              </div>

              <h3 className="metric-label">{m.label}</h3>
              <p className="metric-detail">{m.detail}</p>

              <div className="metric-card-footer">
                <span className="footer-link-text">{t('Lihat Detail', 'View Detail')}</span>
                <ArrowUpRight size={14} className="footer-arrow" />
              </div>
            </Link>
          ))}
        </div>

        {/* 3 Featured Highlights Bento Cards */}
        <div className="report-highlights-grid">
          {highlights.map((item, idx) => (
            <div key={idx} className="highlight-card" data-reveal data-reveal-delay={idx * 110}>
              <div className="highlight-img-wrapper">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="highlight-img" 
                  loading="lazy"
                />
              </div>

              <div className="highlight-body">
                <span className="highlight-tag" style={{ color: item.tagColor }}>
                  {item.tag}
                </span>
                <h3 className="highlight-title">{item.title}</h3>
                <p className="highlight-desc">{item.desc}</p>

                <Link href={item.href} className="highlight-link">
                  <span>{t('Pelajari Program', 'Learn About Program')}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .report-2026-preview-section {
          width: 100%;
          background-color: #ffffff;
          padding: clamp(4rem, 6.5vw, 6.5rem) 0;
          position: relative;
          border-bottom: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
        }

        .report-2026-container {
          width: 100%;
          max-width: 100%;
          padding: 0 clamp(1.5rem, 5vw, 6rem);
          margin: 0 auto;
          box-sizing: border-box;
        }

        /* Header Block */
        .report-2026-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 2.5rem;
          margin-bottom: clamp(2.5rem, 4vw, 3.5rem);
          flex-wrap: wrap;
        }

        .header-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          max-width: 760px;
        }

        .report-preview-title {
          font-family: var(--font-outfit), system-ui, sans-serif;
          font-size: clamp(2rem, 3.8vw, 2.85rem);
          font-weight: 800;
          color: var(--bg-dark-green, #122c1e);
          line-height: 1.2;
          letter-spacing: -0.025em;
          margin-bottom: 0.85rem;
        }

        .report-preview-subtitle {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--text-muted, #57655e);
        }

        .btn-open-full-report {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.9rem 1.75rem;
          background: var(--bg-dark-green, #122c1e);
          color: #ffffff;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          min-height: 44px;
          box-sizing: border-box;
          transition: all 0.25s ease;
          box-shadow: 0 4px 15px rgba(18, 44, 30, 0.15);
          white-space: nowrap;
        }

        .btn-open-full-report:hover {
          background: var(--primary-green, #2d6a4f);
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(45, 106, 79, 0.28);
        }

        /* 4 Metrics Grid */
        .report-metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: clamp(2.5rem, 4vw, 3.5rem);
        }

        .metric-card-link {
          background: #faf9f6;
          border: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
          border-radius: 16px;
          padding: 1.75rem 1.5rem;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
          box-sizing: border-box;
        }

        .metric-card-link:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
          border-color: var(--primary-green, #2d6a4f);
        }

        .metric-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .metric-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(45, 106, 79, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .metric-growth-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary-green, #2d6a4f);
          background: rgba(45, 106, 79, 0.12);
          padding: 0.25rem 0.65rem;
          border-radius: 20px;
        }

        .metric-val-row {
          display: flex;
          align-items: baseline;
          gap: 0.35rem;
          margin-bottom: 0.35rem;
        }

        .metric-main-num {
          font-family: var(--font-outfit), system-ui, sans-serif;
          font-size: clamp(1.8rem, 2.2vw, 2.3rem);
          font-weight: 800;
          color: var(--bg-dark-green, #122c1e);
          line-height: 1;
        }

        .metric-unit {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-muted, #57655e);
        }

        .metric-label {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
          margin-bottom: 0.35rem;
        }

        .metric-detail {
          font-size: 0.85rem;
          color: var(--text-muted, #57655e);
          line-height: 1.4;
          margin-bottom: 1.25rem;
          flex-grow: 1;
        }

        .metric-card-footer {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.825rem;
          font-weight: 700;
          color: var(--primary-green, #2d6a4f);
          border-top: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
          padding-top: 0.85rem;
          margin-top: auto;
        }

        .footer-arrow {
          transition: transform 0.2s ease;
        }

        .metric-card-link:hover .footer-arrow {
          transform: translate(2px, -2px);
        }

        /* 3 Highlights Bento Grid */
        .report-highlights-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }

        .highlight-card {
          background: #faf9f6;
          border: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }

        .highlight-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 32px rgba(0, 0, 0, 0.07);
        }

        .highlight-img-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #122c1e;
        }

        .highlight-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .highlight-card:hover .highlight-img {
          transform: scale(1.05);
        }

        .highlight-body {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .highlight-tag {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.65rem;
        }

        .highlight-title {
          font-family: var(--font-outfit), system-ui, sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
          line-height: 1.35;
          margin-bottom: 0.75rem;
        }

        .highlight-desc {
          font-size: 0.925rem;
          line-height: 1.65;
          color: var(--text-muted, #57655e);
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .highlight-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--primary-green, #2d6a4f);
          text-decoration: none;
          transition: all 0.2s ease;
          margin-top: auto;
        }

        .highlight-link:hover {
          color: var(--bg-dark-green, #122c1e);
          transform: translateX(3px);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1100px) {
          .report-metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .report-highlights-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .report-2026-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .btn-open-full-report {
            width: 100%;
            justify-content: center;
          }

          .report-metrics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
