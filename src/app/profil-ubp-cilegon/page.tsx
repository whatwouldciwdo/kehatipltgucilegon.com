'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Zap, 
  ShieldCheck, 
  Award, 
  Trees, 
  MapPin, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  Globe, 
  Users, 
  FileText, 
  Flame, 
  Leaf, 
  Waves,
  Building2,
  Calendar,
  Target,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function ProfilUbpCilegonPage() {
  const { t } = useLanguage();
  const [activeStoryIndex, setActiveStoryIndex] = React.useState(1);

  const storiesData = [
    {
      badge: 'PROPER KLHK',
      title: t(
        'Konsistensi Raihan PROPER Emas: Standar Pengelolaan Lingkungan PLTGU Cilegon',
        'PROPER Gold Consistency: Environmental Excellence at PLTGU Cilegon'
      ),
      img: '/images/pembangkit.JPG'
    },
    {
      badge: 'INOVASI KEHATI',
      title: t(
        'Peluncuran Biowing Connect: Digitalisasi Regenerasi Flora Alami Berbantu Satwa Burung',
        'Launching Biowing Connect: Digital Flora Regeneration Assisted by Birds'
      ),
      img: '/img/laporan/2026/biowing-connect-system.png'
    },
    {
      badge: 'RESTORASI PESISIR',
      title: t(
        'Penanaman 19.000 Bibit Mangrove Rhizophora di Kawasan Konservasi Desa Lontar',
        '19,000 Rhizophora Mangroves Flourish in Serang Coastal Conservation Zone'
      ),
      img: '/img/laporan/2026/penanaman-mangrove-2026.png'
    },
    {
      badge: 'TEKNOLOGI HIJAU',
      title: t(
        'C – Flora Smart Watering: Efisiensi Sirkular Air dan Pembibitan Mandiri Berbasis IoT',
        'C – Flora Smart Watering: IoT Closed-Loop Water Efficiency and Seedling Nursery'
      ),
      img: '/img/laporan/2026/sustainable-cycle-smart-watering.png'
    },
    {
      badge: 'FAUNA & HABITAT',
      title: t(
        'Peningkatan Populasi 37 Spesies Burung Melalui Perluasan RTH Ring 1 & 2',
        'Avian Population Surge Across 37 Bird Species via Green Space Expansion'
      ),
      img: '/img/laporan/2026/peningkatan-pengamatan-jumlah-aves-2026.png'
    }
  ];

  const handlePrevStory = () => {
    setActiveStoryIndex((prev) => (prev > 0 ? prev - 1 : storiesData.length - 1));
  };

  const handleNextStory = () => {
    setActiveStoryIndex((prev) => (prev < storiesData.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      <Header />

      <main style={{ width: '100%', overflowX: 'clip', backgroundColor: 'var(--bg-cream, #faf9f6)' }}>
        {/* Full-Width Hero Section with Bottom-Left Corner Card (Lithuania Travel Layout) */}
        <section className="profil-hero-section">
          <div className="profil-hero-canvas">
            <div className="canvas-overlay" />

            {/* Top-Right Floating Metrics Pills */}
            <div className="hero-top-stats">
              <div className="floating-stat-pill">
                <Zap size={16} color="var(--primary-green, #2d6a4f)" />
                <span className="stat-pill-num">740 MW</span>
                <span className="stat-pill-text">{t('Kapasitas Terpasang', 'Installed Capacity')}</span>
              </div>
              <div className="floating-stat-pill">
                <Trees size={16} color="var(--primary-green, #2d6a4f)" />
                <span className="stat-pill-num">17,7 Ha</span>
                <span className="stat-pill-text">{t('Area Konservasi Ring 1 & 2', 'Conservation Area')}</span>
              </div>
              <div className="floating-stat-pill">
                <Award size={16} color="var(--primary-green, #2d6a4f)" />
                <span className="stat-pill-num">PROPER Emas</span>
                <span className="stat-pill-text">{t('Keunggulan Lingkungan', 'Environmental Excellence')}</span>
              </div>
            </div>

            {/* Bottom-Left White Editorial Corner Card */}
            <div className="hero-corner-card">
              <nav className="hero-breadcrumb" aria-label="Breadcrumb">
                <Link href="/" className="crumb-link">{t('Beranda', 'Home')}</Link>
                <span className="crumb-sep">/</span>
                <span className="crumb-link">{t('Tentang Kami', 'About Us')}</span>
                <span className="crumb-sep">/</span>
                <span className="crumb-current">{t('Profil UBP Cilegon', 'UBP Cilegon Profile')}</span>
              </nav>

              <h1 className="hero-heading">
                {t('Profil PT PLN Indonesia Power UBP Cilegon', 'Profile of PT PLN Indonesia Power UBP Cilegon')}
              </h1>

              <p className="hero-subtext">
                {t(
                  'Unit Bisnis Pembangkitan (UBP) Cilegon mengoperasikan Pembangkit Listrik Tenaga Gas dan Uap (PLTGU) berkapasitas 740 MW dengan teknologi Combined Cycle ramah lingkungan, menopang keandalan sistem kelistrikan Jawa-Madura-Bali serta memelopori pelestarian keanekaragaman hayati berkelanjutan.',
                  'Cilegon Generation Business Unit (UBP Cilegon) operates a 740 MW Combined Cycle Power Plant with eco-efficient technology, supporting the Jamali electricity grid while pioneering sustainable biodiversity conservation.'
                )}
              </p>

              <div className="hero-buttons-row">
                <a href="#ikhtisar-unit" className="btn-hero-primary">
                  <span>{t('Ikhtisar Operasi Unit', 'Unit Operations Overview')}</span>
                  <ArrowRight size={16} />
                </a>
                <Link href="/laporan" className="btn-hero-secondary">
                  <span>{t('Laporan Kehati 2023 - 2026', 'Biodiversity Reports')}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Full-Width Editorial Storytelling (Wesley College Asymmetric Layout) */}
        <section className="editorial-story-section">
          {/* Big Editorial Running Text Marquee Strip with Lightning Icon */}
          <div className="editorial-headline-strip" aria-hidden="true">
            <div className="editorial-marquee-track">
              {[1, 2, 3].map((idx) => (
                <div key={idx} className="marquee-segment">
                  <span className="marquee-text-item">{t('UBP Cilegon', 'UBP Cilegon')}</span>
                  <Zap size={32} className="marquee-lightning-icon" />
                  <span className="marquee-text-item">{t('Energi Andal Berkelanjutan', 'Reliable Sustainable Energy')}</span>
                  <Zap size={32} className="marquee-lightning-icon" />
                  <span className="marquee-text-item">{t('Suaka Hayati Nusantara', 'Biodiversity Sanctuary')}</span>
                  <Zap size={32} className="marquee-lightning-icon" />
                  <span className="marquee-text-item">{t('Harmoni Pembangkitan & Alam', 'Harmony of Industry & Nature')}</span>
                  <Zap size={32} className="marquee-lightning-icon" />
                  <span className="marquee-text-item">{t('Keunggulan PROPER Emas', 'PROPER Gold Excellence')}</span>
                  <Zap size={32} className="marquee-lightning-icon" />
                </div>
              ))}
            </div>
          </div>

          {/* Asymmetric 2-Column Grid */}
          <div className="editorial-inner-container">
            <div className="editorial-dual-grid">
              {/* Left: Tall Portrait Photograph */}
              <div className="editorial-left-col">
                <div className="portrait-image-wrapper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/images/pltgu-cilegon-2.png" 
                    alt="Pembangkit Listrik PLTGU Cilegon" 
                    className="portrait-img"
                  />
                </div>
              </div>

              {/* Right: Landscape Photo + Editorial Prose + Circular CTA */}
              <div className="editorial-right-col">
                <div className="landscape-image-wrapper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/images/pltgu-cilegon.jpg" 
                    alt="Kawasan Operasi PLTGU Cilegon" 
                    className="landscape-img"
                  />
                </div>

                <div className="editorial-text-box">
                  <p className="editorial-prose">
                    {t(
                      'Di PT PLN Indonesia Power UBP Cilegon, kami meyakini bahwa keandalan penyediaan listrik 740 MW untuk sistem Jawa-Madura-Bali harus senantiasa berjalan selaras dengan pemulihan ekosistem alami. Bersama para perwira pembangkit dan masyarakat sekitar, kami menjaga 17,7 hektar kawasan konservasi, merehabilitasi 19.000 mangrove pesisir, serta memelopori inovasi sirkular yang memberikan dampak nyata bagi kelestarian bumi.',
                      'At PT PLN Indonesia Power UBP Cilegon, we believe that delivering 740 MW of reliable electricity for the Jamali grid must go hand in hand with ecosystem restoration. Together with our engineering teams and local communities, we safeguard 17.7 hectares of conservation zones, plant 19,000 coastal mangroves, and pioneer circular green innovations that make a lasting difference.'
                    )}
                  </p>

                  <div className="editorial-cta-row">
                    <span className="editorial-cta-label">{t('Komitmen Keberlanjutan Kami', 'Our Sustainability Commitment')}</span>
                    <a href="#ikhtisar-unit" className="editorial-circle-arrow" aria-label="Lihat Selengkapnya">
                      <ArrowRight size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Full-Width Slate-Blue Bento Grid Operational & Environmental Excellence */}
        <section className="bento-excellence-section">
          <div className="bento-inner-container">
            <div className="bento-header-row">
              <div className="bento-header-left">
                <span className="bento-kicker">{t('KEUNGGULAN OPERASI & LINGKUNGAN', 'OPERATIONAL & ENVIRONMENTAL EXCELLENCE')}</span>
                <h2 className="bento-main-title">
                  {t(
                    'Mewujudkan Keunggulan Energi Berkelanjutan',
                    'Empowering Sustainable Energy Excellence'
                  )}
                </h2>
              </div>
              <div className="bento-header-right">
                <p className="bento-header-desc">
                  {t(
                    'Kami memprioritaskan keandalan pasokan listrik 740 MW dengan standar efisiensi termal dan kepatuhan lingkungan tertinggi. Melalui integrasi digitalisasi pemantauan dan konservasi ekosistem, UBP Cilegon terus memimpin inovasi Beyond Compliance.',
                    'We prioritize 740 MW power reliability with top-tier thermal efficiency and environmental governance. Through digital monitoring integration and habitat conservation, UBP Cilegon leads Beyond Compliance innovations.'
                  )}
                </p>
                <a href="#ikhtisar-unit" className="bento-learn-link">
                  <span>{t('Pelajari Selengkapnya', 'Learn more')}</span>
                  <div className="bento-arrow-circle">
                    <ArrowRight size={15} />
                  </div>
                </a>
              </div>
            </div>

            {/* 3-Column Bento Grid */}
            <div className="bento-grid-container">
              {/* Column 1: Dark Navy Success Stats Card */}
              <div className="bento-col bento-col-stats">
                <div className="bento-navy-card">
                  <h3 className="navy-card-title">{t('Tingkat Kinerja Unit', 'Our Performance Rate')}</h3>

                  <div className="navy-stat-block">
                    <span className="navy-stat-num">99.4%</span>
                    <span className="navy-stat-desc">{t('Kesiapan Pembangkit (EAF) Jamali', 'Plant Availability Factor (EAF)')}</span>
                  </div>

                  <div className="navy-stat-block">
                    <span className="navy-stat-num">740 MW</span>
                    <span className="navy-stat-desc">{t('Total Pasokan Listrik Terpasang', 'Total Installed Capacity')}</span>
                  </div>
                </div>
              </div>

              {/* Column 2: Center Image + Bottom Narrative Slate Card */}
              <div className="bento-col bento-col-center">
                <div className="bento-center-img-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/images/college-life/study-spaces.jpg" 
                    alt="Monitoring dan Analisis Data UBP Cilegon" 
                    className="bento-img"
                  />
                </div>
                <div className="bento-slate-text-card">
                  <p className="slate-text-content">
                    {t(
                      'Penerapan otomasi cerdas IoT Iron Mus, sirkulasi air tertutup, dan pelestarian 17,7 hektar habitat flora & fauna nusantara.',
                      'Deployment of smart IoT automation, closed-loop water reuse, and preservation of 17.7 hectares of Indonesian flora & fauna habitats.'
                    )}
                  </p>
                </div>
              </div>

              {/* Column 3: Dark Navy List Card + Bottom Plaque Photo */}
              <div className="bento-col bento-col-achievements">
                <div className="bento-navy-list-card">
                  <ul className="bento-badge-list">
                    <li className="badge-list-item">
                      <span className="badge-circle-num">1</span>
                      <span className="badge-list-text">{t('PROPER Emas KLHK RI', 'PROPER Gold Ministry of Environment')}</span>
                    </li>
                    <li className="badge-list-item">
                      <span className="badge-circle-num">4</span>
                      <span className="badge-list-text">{t('Sertifikasi ISO Internasional', 'International ISO Certifications')}</span>
                    </li>
                    <li className="badge-list-item">
                      <span className="badge-circle-num">137</span>
                      <span className="badge-list-text">{t('Spesies Flora Terinventarisasi', 'Documented Flora Species')}</span>
                    </li>
                    <li className="badge-list-item">
                      <span className="badge-circle-num">19k</span>
                      <span className="badge-list-text">{t('Bibit Mangrove Ditanam', 'Mangroves Planted in Serang')}</span>
                    </li>
                  </ul>
                </div>

                <div className="bento-plaque-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/images/Piala Proper/2025.png" 
                    alt="Penghargaan PROPER Emas UBP Cilegon" 
                    className="plaque-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Full-Width Tiered Vision, Mission, and Values Section (Wesley College Layout) */}
        <section id="visi-misi" className="vision-mission-tiered-section">
          {/* Top Intro Bar */}
          <div className="vm-intro-bar">
            <div className="vm-inner-container vm-intro-grid">
              <div className="vm-intro-left">
                <span className="vm-intro-kicker">{t('VISION, MISSION AND VALUES', 'VISION, MISSION AND VALUES')}</span>
                <h2 className="vm-intro-title">
                  {t('The PLN IP Vision', 'The PLN IP Vision')}
                </h2>
              </div>
              <div className="vm-intro-right">
                <p className="vm-intro-desc">
                  {t(
                    'Di PT PLN Indonesia Power UBP Cilegon, kami senantiasa berpegang teguh pada komitmen jangka panjang untuk menghadirkan energi listrik berkeandalan tinggi, mendorong pertumbuhan industri nasional, serta mewujudkan keharmonisan ekosistem lingkungan hidup. Visi, misi, dan nilai-nilai luhur kami menjadi kompas pemandu setiap langkah transformasi operasional.',
                    'At PT PLN Indonesia Power UBP Cilegon, we have always been committed to delivering highly reliable electricity, supporting national economic growth, and fostering harmonious environmental sustainability. Our vision, mission, and core values guide every step of our operational journey.'
                  )}
                </p>
                <a href="#ikhtisar-unit" className="vm-history-link">
                  <span>{t('Sejarah Operasi Unit', 'Our History')}</span>
                  <div className="vm-arrow-circle">
                    <ArrowRight size={15} />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Tier 1: Our Vision (Deep Midnight Navy) */}
          <div className="vm-tier vm-tier-vision">
            <div className="vm-inner-container vm-tier-grid">
              <div className="vm-tier-left">
                <h3 className="vm-tier-heading">{t('Our Vision', 'Our Vision')}</h3>
              </div>
              <div className="vm-tier-right">
                <p className="vm-vision-statement">
                  {t(
                    'Menjadi Perusahaan Pembangkitan Tenaga Listrik Terkemuka dan Berkelanjutan Berkelas Dunia.',
                    'To be the leading and sustainable world-class power generation company, driving energy transition and environmental stewardship.'
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Tier 2: Our Mission (Slate Blue) */}
          <div className="vm-tier vm-tier-mission">
            <div className="vm-inner-container vm-tier-grid">
              <div className="vm-tier-left">
                <h3 className="vm-tier-heading">{t('Our Mission', 'Our Mission')}</h3>
              </div>
              <div className="vm-tier-right">
                <p className="vm-mission-intro">
                  {t(
                    'Sebagai pilar utama keandalan energi kelistrikan nasional, kami bertekad untuk:',
                    'As a vital pillar of national energy reliability, we seek to:'
                  )}
                </p>
                <ul className="vm-mission-bullets">
                  <li>
                    {t(
                      'Menyediakan energi listrik yang andal, efisien, bermutu tinggi, dan berwawasan lingkungan secara berkelanjutan.',
                      'Provide reliable, efficient, high-quality, and environmentally sustainable electricity continuously.'
                    )}
                  </li>
                  <li>
                    {t(
                      'Melakukan tata kelola pembangkitan berstandar global dengan memprioritaskan K3, keandalan aset, dan kepatuhan Beyond Compliance.',
                      'Implement world-class plant management prioritizing HSE, asset excellence, and Beyond Compliance governance.'
                    )}
                  </li>
                  <li>
                    {t(
                      'Mengembangkan kompetensi talenta unggul insan pembangkit serta memberdayakan masyarakat di sekitar kawasan operasional.',
                      'Nurture human capital talent excellence and empower local communities across our operational footprint.'
                    )}
                  </li>
                  <li>
                    {t(
                      'Melestarikan keanekaragaman hayati dan ekosistem pesisir melalui inovasi teknologi hijau yang terukur dan berdampak nyata.',
                      'Preserve biodiversity and coastal ecosystems through measurable green technologies and high-impact restoration.'
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tier 3: Our Values (Dark Charcoal / AKHLAK) */}
          <div className="vm-tier vm-tier-values">
            <div className="vm-inner-container vm-tier-grid">
              <div className="vm-tier-left">
                <h3 className="vm-tier-heading">{t('Our Values', 'Our Values')}</h3>
              </div>
              <div className="vm-tier-right">
                <p className="vm-values-statement">
                  {t(
                    'Seluruh insan PLN IP UBP Cilegon memegang teguh tata nilai utama AKHLAK (Amanah, Kompeten, Harmonis, Loyal, Adaptif, Kolaboratif) sebagai fondasi karakter, integritas kerja, dan dedikasi pelayanan tanpa henti bagi kemajuan bangsa.',
                    'At our plant, we embrace the AKHLAK core values (Trustworthy, Competent, Harmonious, Loyal, Adaptive, Collaborative) as our foundational compass for integrity, excellence, and unwavering dedication to the nation.'
                  )}
                </p>
                <div className="vm-values-pill-row">
                  <span className="vm-val-pill"><strong>A</strong>manah</span>
                  <span className="vm-val-pill"><strong>K</strong>ompeten</span>
                  <span className="vm-val-pill"><strong>H</strong>armonis</span>
                  <span className="vm-val-pill"><strong>L</strong>oyal</span>
                  <span className="vm-val-pill"><strong>A</strong>daptif</span>
                  <span className="vm-val-pill"><strong>K</strong>olaboratif</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical & Operational Specs Container */}
        <div className="container" style={{ padding: '4.5rem 2rem 7rem 2rem' }}>
          
          {/* Section 4: Ikhtisar & Data Teknis Unit */}
          <section id="ikhtisar-unit" className="content-block">
            <div className="block-header">
              <span className="block-badge">{t('Ikhtisar Unit Pembangkitan', 'Power Plant Overview')}</span>
              <h2 className="block-title">{t('Keandalan Energi Ramah Lingkungan', 'Eco-Efficient Energy Reliability')}</h2>
              <p className="block-desc">
                {t(
                  'PLTGU Cilegon berlokasi strategis di pesisir Selat Sunda, memanfaatkan gas alam sebagai bahan bakar utama dengan efisiensi termal tinggi untuk menekan intensitas emisi gas rumah kaca.',
                  'Strategically located on the Sunda Strait coast, PLTGU Cilegon utilizes natural gas as primary fuel with high thermal efficiency to minimize greenhouse gas intensity.'
                )}
              </p>
            </div>

            <div className="specs-grid">
              <div className="spec-card">
                <div className="spec-icon-box">
                  <Zap size={24} />
                </div>
                <div className="spec-content">
                  <span className="spec-label">{t('Kapasitas Total Terpasang', 'Total Installed Capacity')}</span>
                  <h3 className="spec-val">740 MW</h3>
                  <p className="spec-sub">2 Gas Turbine (2x240 MW) + 1 Steam Turbine (260 MW)</p>
                </div>
              </div>

              <div className="spec-card">
                <div className="spec-icon-box">
                  <Flame size={24} />
                </div>
                <div className="spec-content">
                  <span className="spec-label">{t('Bahan Bakar Utama', 'Primary Fuel')}</span>
                  <h3 className="spec-val">Gas Alam (Clean Gas)</h3>
                  <p className="spec-sub">{t('Emisi SOx dan Partikulat mendekati nol', 'Near-zero SOx and particulate emissions')}</p>
                </div>
              </div>

              <div className="spec-card">
                <div className="spec-icon-box">
                  <MapPin size={24} />
                </div>
                <div className="spec-content">
                  <span className="spec-label">{t('Lokasi Kawasan Operasi', 'Operational Location')}</span>
                  <h3 className="spec-val">Kab. Serang, Banten</h3>
                  <p className="spec-sub">Desa Margasari, Kec. Puloampel (Pesisir Teluk Banten)</p>
                </div>
              </div>

              <div className="spec-card">
                <div className="spec-icon-box">
                  <Globe size={24} />
                </div>
                <div className="spec-content">
                  <span className="spec-label">{t('Interkoneksi Jaringan', 'Grid Interconnection')}</span>
                  <h3 className="spec-val">SUTET 500 kV & 150 kV</h3>
                  <p className="spec-sub">{t('Penyangga vital sistem kelistrikan Jamali', 'Vital pillar of Java-Madura-Bali grid')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Komitmen Keanekaragaman Hayati (Beyond Compliance) */}
          <section className="content-block">
            <div className="kehati-banner-card">
              <div className="kehati-banner-left">
                <div className="vm-badge" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff' }}>
                  <Leaf size={14} />
                  <span>{t('Komitmen Beyond Compliance', 'Beyond Compliance Commitment')}</span>
                </div>
                <h2 className="kehati-banner-title">
                  {t(
                    'Dedikasi Pelestarian Keanekaragaman Hayati UBP Cilegon',
                    'Dedication to Biodiversity Conservation at UBP Cilegon'
                  )}
                </h2>
                <p className="kehati-banner-desc">
                  {t(
                    'PLTGU Cilegon mendedikasikan 17,7 Hektar kawasan Ring 1 & Ring 2 sebagai suaka keanekaragaman flora dan fauna alami, merehabilitasi 19.000 mangrove pesisir, serta mengembangkan inovasi mutakhir seperti Biowing Connect dan C-Flora Smart IoT.',
                    'PLTGU Cilegon dedicates 17.7 Hectares of Ring 1 & 2 as a natural flora & fauna sanctuary, restoring 19,000 coastal mangroves, and innovating systems like Biowing Connect and C-Flora Smart IoT.'
                  )}
                </p>
                <div className="kehati-banner-actions">
                  <Link href="/laporan/2026" className="btn-banner-light">
                    <span>{t('Lihat Laporan Lengkap 2026', 'Explore 2026 Report')}</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link href="/laporan" className="btn-banner-outline">
                    <span>{t('Arsip Semua Tahun', 'All Years Archive')}</span>
                  </Link>
                </div>
              </div>

              <div className="kehati-banner-stats">
                <div className="banner-stat-box">
                  <span className="banner-stat-num">23.670</span>
                  <span className="banner-stat-label">{t('Batang Flora Terpantau', 'Monitored Flora Stems')}</span>
                </div>
                <div className="banner-stat-box">
                  <span className="banner-stat-num">19.000</span>
                  <span className="banner-stat-label">{t('Bibit Mangrove Ditanam', 'Mangrove Seedlings Planted')}</span>
                </div>
                <div className="banner-stat-box">
                  <span className="banner-stat-num">1.122</span>
                  <span className="banner-stat-label">{t('Populasi Satwa Aves', 'Avian Wildlife Population')}</span>
                </div>
                <div className="banner-stat-box">
                  <span className="banner-stat-num">H&apos; 3,374</span>
                  <span className="banner-stat-label">{t('Indeks Keragaman Shannon-Wiener', 'Shannon-Wiener Diversity')}</span>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Section 6: Full-Width Wesley College Stories Carousel Section */}
        <section className="stories-carousel-section">
          <div className="stories-header">
            <span className="stories-kicker">{t('NEWS & EVENTS', 'NEWS & EVENTS')}</span>
            <h2 className="stories-main-title">{t('Cerita & Publikasi UBP Cilegon', 'UBP Cilegon Stories')}</h2>
            <p className="stories-subtitle">
              {t(
                'Ikuti kabar terkini seputar pencapaian, inovasi keanekaragaman hayati, dan dedikasi pelestarian lingkungan di sekitar kawasan operasional kami.',
                'Read about the achievements, environmental innovations, and community perspectives of our vibrant operational ecosystem.'
              )}
            </p>
          </div>

          {/* Full-Width Carousel Viewport with Edge Fade Vignettes */}
          <div className="stories-viewport-container">
            <div className="stories-edge-fade-left" />
            <div className="stories-edge-fade-right" />

            <div 
              className="stories-slider-track"
              style={{
                transform: `translateX(calc(50vw - (var(--card-width) / 2) - (${activeStoryIndex} * (var(--card-width) + var(--card-gap)))))`
              }}
            >
              {storiesData.map((story, idx) => {
                const isActive = idx === activeStoryIndex;
                return (
                  <div 
                    key={idx} 
                    className={`story-card ${isActive ? 'is-active-story' : ''}`}
                    onClick={() => setActiveStoryIndex(idx)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={story.img} 
                      alt={story.title} 
                      className="story-card-img" 
                    />
                    <div className="story-card-overlay" />
                    <div className="story-card-body">
                      <span className="story-badge">{story.badge}</span>
                      <h3 className="story-card-title">
                        {story.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Centered Pill Capsule Navigation Controls & View All Link */}
          <div className="stories-bottom-actions">
            <div className="stories-controls">
              <button 
                className="story-pill-nav-btn" 
                onClick={handlePrevStory}
                aria-label="Previous Story"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                className="story-pill-nav-btn" 
                onClick={handleNextStory}
                aria-label="Next Story"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <Link href="/laporan" className="stories-view-all-link">
              <span>{t('Lihat semua publikasi', 'View all')}</span>
              <div className="view-all-circle-icon">
                <ArrowRight size={13} />
              </div>
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .profil-hero-section {
          padding: 0;
          margin: 0;
          width: 100%;
          background-color: var(--bg-cream, #faf9f6);
        }

        .profil-hero-canvas {
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
          font-size: 0.95rem;
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

        .btn-hero-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--bg-dark-green, #122c1e);
          color: #ffffff;
          padding: 0.85rem 1.75rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 4px 15px rgba(18, 44, 30, 0.2);
        }

        .btn-hero-primary:hover {
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

        /* Full-Width Editorial Storytelling Section (Wesley College Layout) */
        .editorial-story-section {
          width: 100%;
          background-color: var(--bg-cream, #faf9f6);
          padding-bottom: 6rem;
        }

        .editorial-headline-strip {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 2.25rem 0 3.25rem 0;
          border-bottom: 1px solid rgba(18, 44, 30, 0.1);
          margin-bottom: 4.5rem;
          display: flex;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 6%,
            black 94%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 6%,
            black 94%,
            transparent 100%
          );
        }

        .editorial-marquee-track {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          animation: profilMarqueeScroll 40s linear infinite;
        }

        @keyframes profilMarqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .marquee-segment {
          display: inline-flex;
          align-items: center;
          gap: 2rem;
          padding-right: 2rem;
        }

        .marquee-text-item {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(2.5rem, 5.5vw, 4.5rem);
          font-weight: 600;
          color: var(--bg-dark-green, #122c1e);
          letter-spacing: -0.03em;
          line-height: 1;
        }

        :global(.marquee-lightning-icon) {
          color: #f59e0b;
          flex-shrink: 0;
          fill: #f59e0b;
          filter: drop-shadow(0 2px 6px rgba(245, 158, 11, 0.4));
        }

        .editorial-inner-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 3.5rem;
        }

        .editorial-dual-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: flex-start;
        }

        @media (min-width: 900px) {
          .editorial-dual-grid {
            grid-template-columns: 1.15fr 1fr;
            gap: 5rem;
          }
        }

        .editorial-left-col {
          width: 100%;
        }

        .portrait-image-wrapper {
          width: 100%;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(18, 44, 30, 0.08);
          background-color: #f3f4f6;
        }

        .portrait-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .portrait-image-wrapper:hover .portrait-img {
          transform: scale(1.03);
        }

        .editorial-right-col {
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
        }

        .landscape-image-wrapper {
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 12px 35px rgba(18, 44, 30, 0.08);
          background-color: #f3f4f6;
        }

        .landscape-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .landscape-image-wrapper:hover .landscape-img {
          transform: scale(1.03);
        }

        .editorial-text-box {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .editorial-prose {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 1.05rem;
          line-height: 1.75;
          color: #374151;
          margin: 0;
        }

        .editorial-cta-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .editorial-cta-label {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
        }

        .editorial-circle-arrow {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: #ffffff;
          border: 1.5px solid rgba(18, 44, 30, 0.2);
          color: var(--bg-dark-green, #122c1e);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .editorial-circle-arrow:hover {
          background-color: var(--bg-dark-green, #122c1e);
          color: #ffffff;
          border-color: var(--bg-dark-green, #122c1e);
          transform: translateX(4px);
        }

        /* Full-Width Slate-Blue Bento Excellence Section */
        .bento-excellence-section {
          width: 100%;
          background-color: #557285;
          padding: 6rem 0;
          color: #ffffff;
          box-shadow: 0 20px 50px rgba(18, 44, 30, 0.12);
        }

        .bento-inner-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 3.5rem;
        }

        .bento-header-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          margin-bottom: 3.5rem;
          align-items: flex-end;
        }

        @media (min-width: 900px) {
          .bento-header-row {
            grid-template-columns: 1.25fr 1fr;
            gap: 4rem;
          }
        }

        .bento-kicker {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 800;
          color: #b7dbfc;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.85rem;
        }

        .bento-main-title {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(2rem, 4.5vw, 3.25rem);
          font-weight: 600;
          color: #ffffff;
          line-height: 1.15;
          letter-spacing: -0.025em;
          margin: 0;
        }

        .bento-header-desc {
          font-size: 0.95rem;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 1.25rem 0;
        }

        .bento-learn-link {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .bento-learn-link:hover {
          color: #b7dbfc;
        }

        .bento-arrow-circle {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .bento-learn-link:hover .bento-arrow-circle {
          border-color: #ffffff;
          background-color: rgba(255, 255, 255, 0.15);
          transform: translateX(4px);
        }

        /* Bento 3-Column Grid */
        .bento-grid-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.75rem;
          align-items: stretch;
        }

        @media (min-width: 900px) {
          .bento-grid-container {
            grid-template-columns: 1.15fr 1.35fr 1.15fr;
          }
        }

        .bento-col {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        /* Column 1: Dark Navy Card */
        .bento-navy-card {
          background-color: #26384e;
          border-radius: 20px;
          padding: 2.5rem 2.25rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
        }

        .navy-card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 2rem 0;
          letter-spacing: -0.01em;
        }

        .navy-stat-block {
          margin-bottom: 2rem;
        }

        .navy-stat-block:last-child {
          margin-bottom: 0;
        }

        .navy-stat-num {
          display: block;
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(3rem, 5vw, 4.25rem);
          font-weight: 500;
          color: #ffffff;
          line-height: 1;
          letter-spacing: -0.03em;
          margin-bottom: 0.5rem;
        }

        .navy-stat-desc {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.4;
          display: block;
        }

        /* Column 2: Center Image + Bottom Slate Text */
        .bento-center-img-card {
          border-radius: 20px;
          overflow: hidden;
          height: 240px;
          background-color: #f3f4f6;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .bento-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }

        .bento-center-img-card:hover .bento-img {
          transform: scale(1.04);
        }

        .bento-slate-text-card {
          background-color: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 2.25rem 2rem;
          flex: 1;
          display: flex;
          align-items: center;
          backdrop-filter: blur(8px);
        }

        .slate-text-content {
          font-size: 1.05rem;
          line-height: 1.65;
          color: #ffffff;
          margin: 0;
          font-weight: 500;
        }

        /* Column 3: Navy List Card + Bottom Plaque */
        .bento-navy-list-card {
          background-color: #26384e;
          border-radius: 20px;
          padding: 2rem 1.75rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
        }

        .bento-badge-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .badge-list-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .badge-circle-num {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: #4a6682;
          color: #ffffff;
          font-size: 0.85rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .badge-list-text {
          font-size: 0.95rem;
          font-weight: 600;
          color: #ffffff;
        }

        .bento-plaque-card {
          border-radius: 20px;
          overflow: hidden;
          height: 180px;
          background-color: #1e293b;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .plaque-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.5s ease;
        }

        .bento-plaque-card:hover .plaque-img {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .bento-excellence-section {
            padding: 3rem 1.5rem;
          }
        }

        /* Full-Width Tiered Vision, Mission, and Values Section (Wesley College Style) */
        .vision-mission-tiered-section {
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .vm-inner-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 3.5rem;
          width: 100%;
        }

        /* Intro Top Bar */
        .vm-intro-bar {
          background-color: #233448;
          padding: 5.5rem 0 4.5rem 0;
          color: #ffffff;
        }

        .vm-intro-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: flex-start;
        }

        @media (min-width: 900px) {
          .vm-intro-grid {
            grid-template-columns: 1.1fr 1.35fr;
            gap: 4.5rem;
          }
        }

        .vm-intro-kicker {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 800;
          color: #b7dbfc;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.85rem;
        }

        .vm-intro-title {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 600;
          color: #ffffff;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0;
        }

        .vm-intro-desc {
          font-size: 1.05rem;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.88);
          margin: 0 0 1.5rem 0;
        }

        .vm-history-link {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .vm-history-link:hover {
          color: #b7dbfc;
        }

        .vm-arrow-circle {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .vm-history-link:hover .vm-arrow-circle {
          border-color: #ffffff;
          background-color: rgba(255, 255, 255, 0.15);
          transform: translateX(4px);
        }

        /* Generic Tier */
        .vm-tier {
          width: 100%;
          padding: 4.5rem 0;
          color: #ffffff;
        }

        .vm-tier-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: flex-start;
        }

        @media (min-width: 900px) {
          .vm-tier-grid {
            grid-template-columns: 1.1fr 1.35fr;
            gap: 4.5rem;
          }
        }

        .vm-tier-heading {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(2rem, 4.5vw, 3.5rem);
          font-weight: 600;
          color: #ffffff;
          line-height: 1.15;
          letter-spacing: -0.025em;
          margin: 0;
        }

        /* Tier 1: Vision (Deep Midnight Navy) */
        .vm-tier-vision {
          background-color: #1a2736;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .vm-vision-statement {
          font-size: 1.25rem;
          line-height: 1.7;
          color: #ffffff;
          font-weight: 400;
          margin: 0;
        }

        /* Tier 2: Mission (Slate Blue) */
        .vm-tier-mission {
          background-color: #557285;
        }

        .vm-mission-intro {
          font-size: 1.1rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 1.25rem 0;
        }

        .vm-mission-bullets {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.95rem;
        }

        .vm-mission-bullets li {
          font-size: 1.05rem;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.92);
        }

        /* Tier 3: Values (Dark Charcoal / AKHLAK) */
        .vm-tier-values {
          background-color: #1f2428;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .vm-values-statement {
          font-size: 1.1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.88);
          margin: 0 0 1.75rem 0;
        }

        .vm-values-pill-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .vm-val-pill {
          background-color: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 50px;
          padding: 0.45rem 1.15rem;
          font-size: 0.9rem;
          color: #ffffff;
          transition: all 0.2s ease;
        }

        .vm-val-pill strong {
          color: #6ee7b7;
          margin-right: 0.2rem;
        }

        .vm-val-pill:hover {
          background-color: rgba(255, 255, 255, 0.15);
          border-color: #6ee7b7;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .vm-inner-container {
            padding: 0 1.5rem;
          }

          .vm-tier {
            padding: 3rem 0;
          }
        }

        /* Content Blocks */
        .content-block {
          margin-bottom: 5rem;
        }

        .block-header {
          max-width: 760px;
          margin-bottom: 2.5rem;
        }

        .block-badge {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--primary-green, #2d6a4f);
          background-color: rgba(45, 106, 79, 0.08);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-bottom: 0.6rem;
        }

        .block-title {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.3rem);
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
          letter-spacing: -0.02em;
          margin: 0 0 0.75rem 0;
        }

        .block-desc {
          font-size: 1rem;
          color: #4b5563;
          line-height: 1.6;
          margin: 0;
        }

        /* Specs Grid */
        .specs-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 640px) {
          .specs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .specs-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .spec-card {
          background-color: #ffffff;
          border: 1px solid rgba(18, 44, 30, 0.08);
          border-radius: 20px;
          padding: 2rem 1.75rem;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .spec-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(18, 44, 30, 0.08);
          border-color: rgba(45, 106, 79, 0.3);
        }

        .spec-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background-color: rgba(45, 106, 79, 0.1);
          color: var(--primary-green, #2d6a4f);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spec-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-muted, #57655e);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .spec-val {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
          margin: 0.25rem 0 0.5rem 0;
        }

        .spec-sub {
          font-size: 0.85rem;
          color: #6b7280;
          line-height: 1.4;
          margin: 0;
        }

        /* Vision & Mission Layout */
        .vision-mission-wrapper {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 900px) {
          .vision-mission-wrapper {
            grid-template-columns: 1fr 1.35fr;
          }
        }

        .vision-card {
          background: linear-gradient(145deg, #ffffff 0%, #f4f8f6 100%);
          border: 1px solid rgba(45, 106, 79, 0.15);
          border-radius: 24px;
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.03);
        }

        .mission-card {
          background-color: #ffffff;
          border: 1px solid rgba(18, 44, 30, 0.08);
          border-radius: 24px;
          padding: 3rem 2.5rem;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.03);
        }

        .vm-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--primary-green, #2d6a4f);
          background-color: rgba(45, 106, 79, 0.1);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 1.25rem;
          align-self: flex-start;
        }

        .vm-title {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: 1.45rem;
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
          line-height: 1.35;
          margin-bottom: 1rem;
        }

        .vm-desc {
          font-size: 0.95rem;
          color: #4b5563;
          line-height: 1.6;
          margin: 0;
        }

        .mission-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .mission-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          font-size: 0.95rem;
          color: #374151;
          line-height: 1.5;
        }

        :global(.mission-check) {
          color: var(--primary-green, #2d6a4f);
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        /* AKHLAK Grid */
        .akhlak-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.25rem;
        }

        .akhlak-card {
          background-color: #ffffff;
          border: 1px solid rgba(18, 44, 30, 0.08);
          border-radius: 20px;
          padding: 2rem 1.5rem;
          text-align: center;
          transition: all 0.25s ease;
        }

        .akhlak-card:hover {
          transform: translateY(-4px);
          border-color: var(--primary-green, #2d6a4f);
          box-shadow: 0 10px 25px rgba(45, 106, 79, 0.1);
        }

        .akhlak-letter {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--bg-dark-green, #122c1e) 0%, var(--primary-green, #2d6a4f) 100%);
          color: #ffffff;
          font-size: 1.35rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem auto;
        }

        .akhlak-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
          margin-bottom: 0.5rem;
        }

        .akhlak-desc {
          font-size: 0.825rem;
          color: #6b7280;
          line-height: 1.45;
          margin: 0;
        }

        /* Kehati Feature Banner */
        .kehati-banner-card {
          background: linear-gradient(135deg, var(--bg-dark-green, #122c1e) 0%, #1c4530 100%);
          border-radius: 28px;
          padding: 4rem 3.5rem;
          color: #ffffff;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          box-shadow: 0 20px 50px rgba(18, 44, 30, 0.2);
        }

        @media (min-width: 992px) {
          .kehati-banner-card {
            grid-template-columns: 1.3fr 1fr;
            align-items: center;
          }
        }

        .kehati-banner-title {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(1.75rem, 3.5vw, 2.3rem);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.25;
          margin-bottom: 1.25rem;
        }

        .kehati-banner-desc {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .kehati-banner-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-banner-light {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #ffffff;
          color: var(--bg-dark-green, #122c1e);
          padding: 0.85rem 1.75rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .btn-banner-light:hover {
          background-color: #e5f3ed;
          transform: translateY(-2px);
        }

        .btn-banner-outline {
          display: inline-flex;
          align-items: center;
          padding: 0.8rem 1.6rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.95rem;
          color: #ffffff;
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-banner-outline:hover {
          background-color: rgba(255, 255, 255, 0.1);
          border-color: #ffffff;
        }

        .kehati-banner-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .banner-stat-box {
          background-color: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 18px;
          padding: 1.75rem 1.5rem;
          backdrop-filter: blur(8px);
        }

        .banner-stat-num {
          display: block;
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: 1.85rem;
          font-weight: 800;
          color: #6ee7b7;
          margin-bottom: 0.35rem;
        }

        .banner-stat-label {
          font-size: 0.825rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
          line-height: 1.35;
        }

        /* Certifications Grid */
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }

        .cert-item {
          background-color: #ffffff;
          border: 1px solid rgba(18, 44, 30, 0.08);
          border-radius: 20px;
          padding: 2rem 1.75rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
          transition: all 0.25s ease;
        }

        .cert-item:hover {
          transform: translateY(-4px);
          border-color: var(--primary-green, #2d6a4f);
          box-shadow: 0 10px 30px rgba(18, 44, 30, 0.08);
        }

        :global(.cert-icon) {
          color: var(--primary-green, #2d6a4f);
          margin-bottom: 1rem;
        }

        .cert-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
          margin-bottom: 0.35rem;
        }

        .cert-desc {
          font-size: 0.85rem;
          color: #6b7280;
          line-height: 1.4;
          margin: 0;
        }

        /* Full-Width Wesley College Stories Carousel Section */
        .stories-carousel-section {
          --card-width: clamp(560px, 48vw, 760px);
          --card-gap: 2.25rem;
          --card-height: clamp(380px, 32vw, 470px);
          width: 100%;
          background-color: var(--bg-cream, #faf9f6);
          padding: 6.5rem 0 6rem 0;
          overflow: hidden;
          border-top: 1px solid rgba(18, 44, 30, 0.08);
        }

        .stories-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 3.5rem auto;
          padding: 0 1.5rem;
        }

        .stories-kicker {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 800;
          color: #4a6682;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
        }

        .stories-main-title {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(2.4rem, 5vw, 3.75rem);
          font-weight: 600;
          color: var(--bg-dark-green, #122c1e);
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin: 0 0 1rem 0;
        }

        .stories-subtitle {
          font-size: 1.05rem;
          color: #4b5563;
          line-height: 1.65;
          margin: 0;
        }

        /* Viewport with Side Fade Vignettes */
        .stories-viewport-container {
          position: relative;
          width: 100vw;
          overflow: hidden;
          margin-bottom: 2.5rem;
        }

        .stories-edge-fade-left {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 14vw;
          background: linear-gradient(to right, var(--bg-cream, #faf9f6) 20%, transparent 100%);
          z-index: 10;
          pointer-events: none;
        }

        .stories-edge-fade-right {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 14vw;
          background: linear-gradient(to left, var(--bg-cream, #faf9f6) 20%, transparent 100%);
          z-index: 10;
          pointer-events: none;
        }

        .stories-slider-track {
          display: flex;
          gap: var(--card-gap);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          width: max-content;
        }

        .story-card {
          position: relative;
          width: var(--card-width);
          height: var(--card-height);
          border-radius: 0;
          overflow: hidden;
          cursor: pointer;
          background-color: #1e293b;
          flex-shrink: 0;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .story-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .story-card:hover .story-card-img {
          transform: scale(1.04);
        }

        .story-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.88) 0%,
            rgba(0, 0, 0, 0.3) 45%,
            transparent 75%
          );
          pointer-events: none;
        }

        .story-card-body {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2.5rem 2.25rem;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          align-items: flex-start;
        }

        .story-badge {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.55);
          padding: 0.2rem 0.6rem;
          border-radius: 2px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          backdrop-filter: blur(4px);
        }

        .story-card-title {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(1.3rem, 2vw, 1.75rem);
          font-weight: 600;
          color: #ffffff;
          line-height: 1.25;
          letter-spacing: -0.015em;
          margin: 0;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
        }

        /* Bottom Controls & View All Link */
        .stories-bottom-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
        }

        .stories-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .story-pill-nav-btn {
          width: 54px;
          height: 36px;
          border-radius: 50px;
          background-color: transparent;
          border: 1.5px solid rgba(18, 44, 30, 0.35);
          color: var(--bg-dark-green, #122c1e);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .story-pill-nav-btn:hover {
          background-color: var(--bg-dark-green, #122c1e);
          color: #ffffff;
          border-color: var(--bg-dark-green, #122c1e);
        }

        .stories-view-all-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--bg-dark-green, #122c1e);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .stories-view-all-link:hover {
          color: var(--primary-green, #2d6a4f);
        }

        .view-all-circle-icon {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 1px solid rgba(18, 44, 30, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .stories-view-all-link:hover .view-all-circle-icon {
          background-color: var(--primary-green, #2d6a4f);
          color: #ffffff;
          border-color: var(--primary-green, #2d6a4f);
          transform: translateX(3px);
        }

        @media (max-width: 768px) {
          .stories-carousel-section {
            --card-width: 85vw;
            --card-height: 380px;
            padding: 4.5rem 0;
          }

          .hero-corner-card {
            padding: 3rem 2rem 2.5rem 2rem;
            max-width: 100%;
            border-top-right-radius: 36px;
          }

          .hero-top-stats {
            padding: 8rem 1.5rem 1rem 1.5rem;
          }

          .kehati-banner-card {
            padding: 2.5rem 1.5rem;
          }
        }
      `}</style>
    </>
  );
}
