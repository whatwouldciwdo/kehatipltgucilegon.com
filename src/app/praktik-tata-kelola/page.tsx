'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Scale, 
  FileCheck, 
  Users, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  TrendingUp, 
  Building2, 
  Eye, 
  AlertCircle, 
  Lock, 
  FileText,
  BadgeCheck,
  ChevronRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function PraktikTataKelolaPage() {
  const { t } = useLanguage();
  const [imgError, setImgError] = useState(false);

  // 7 Objectives of GCG Implementation
  const gcgObjectives = [
    {
      id: 1,
      icon: <TrendingUp size={24} className="text-emerald-700" />,
      title: t('Kesinambungan Usaha', 'Business Continuity'),
      desc: t(
        'Tercapainya kesinambungan usaha dan pencapaian target strategis perusahaan secara konsisten.',
        'Achieving business continuity and strategic corporate objectives consistently.'
      ),
    },
    {
      id: 2,
      icon: <Users size={24} className="text-emerald-700" />,
      title: t('Kemandirian Organ Perusahaan', 'Organ Independence'),
      desc: t(
        'Pemberdayaan fungsi dan kemandirian organ perusahaan yang terdiri dari RUPS, Dewan Komisaris, dan Direksi.',
        'Empowering the functions and independence of corporate organs: GMS, Board of Commissioners, and Board of Directors.'
      ),
    },
    {
      id: 3,
      icon: <Scale size={24} className="text-emerald-700" />,
      title: t('Integritas Keputusan', 'Decision Integrity'),
      desc: t(
        'Pengambilan keputusan oleh Pemegang Saham, Dewan Komisaris, dan Direksi dilandasi oleh nilai moral yang tinggi serta kepatuhan terhadap peraturan perundang-undangan.',
        'Decision making by Shareholders, Commissioners, and Directors guided by high moral standards and legal compliance.'
      ),
    },
    {
      id: 4,
      icon: <Award size={24} className="text-emerald-700" />,
      title: t('Tanggung Jawab Sosial & Lingkungan', 'Social & Environmental Responsibility'),
      desc: t(
        'Terciptanya kesadaran dan tanggung jawab sosial Perusahaan terhadap masyarakat serta kelestarian lingkungan sekitar pembangkit.',
        'Cultivating corporate social awareness and responsibility toward communities and environmental preservation.'
      ),
    },
    {
      id: 5,
      icon: <CheckCircle2 size={24} className="text-emerald-700" />,
      title: t('Optimalisasi Nilai Pemegang Saham', 'Shareholder Value Optimization'),
      desc: t(
        'Optimalisasi nilai perusahaan bagi Pemegang Saham dengan tetap memperhatikan hak dan kepentingan para pemangku kepentingan lainnya.',
        'Optimizing company value for Shareholders while safeguarding stakeholder interests.'
      ),
    },
    {
      id: 6,
      icon: <Building2 size={24} className="text-emerald-700" />,
      title: t('Peningkatan Daya Saing', 'Competitiveness Enhancement'),
      desc: t(
        'Peningkatan daya saing Perusahaan secara nasional maupun internasional melalui efisiensi dan tata kelola berstandar tinggi.',
        'Strengthening national and international competitiveness through efficiency and top-tier governance.'
      ),
    },
    {
      id: 7,
      icon: <FileCheck size={24} className="text-emerald-700" />,
      title: t('Mekanisme Check & Balance', 'Check & Balance Mechanism'),
      desc: t(
        'Mendorong manajemen melakukan mekanisme check and balance pada setiap fungsi dalam proses bisnis berdasarkan prinsip-prinsip GCG.',
        'Fostering robust check and balance mechanisms across all business functions rooted in GCG principles.'
      ),
    },
  ];

  // Core Guidelines & Supporting Policies
  const coreGuidelines = [
    {
      title: t('Pedoman Kebijakan Tata Kelola (GCG Code)', 'Good Corporate Governance Code'),
      badge: t('Pedoman Induk', 'Master Guideline'),
      desc: t(
        'Pedoman komprehensif yang menjadi acuan utama dalam mengelola tata kelola bisnis perusahaan secara transparan dan beretika.',
        'Comprehensive guidelines serving as the primary benchmark in managing business governance transparently and ethically.'
      ),
    },
    {
      title: t('Pedoman Etika Perusahaan (Code of Conduct)', 'Corporate Code of Conduct'),
      badge: t('Standar Etika', 'Ethical Standard'),
      desc: t(
        'Standar perilaku dan integritas moral bagi seluruh jajaran insan PT Indonesia Power dalam berinteraksi dengan pemangku kepentingan.',
        'Behavioral and moral integrity standards for all personnel in engaging with stakeholders.'
      ),
    },
    {
      title: t('Pedoman Kerja Direksi & Komisaris (Board Manual)', 'Board Manual'),
      badge: t('Tata Kerja Organ', 'Organ Workflow'),
      desc: t(
        'Acuan operasional dan hubungan kerja kolegial antara Dewan Komisaris dan Direksi dalam melaksanakan tugas pengawasan dan pengurusan.',
        'Operational reference and collegiate relationship between Commissioners and Directors in supervision and management.'
      ),
    },
    {
      title: t('Pedoman Pengelolaan Perusahaan (InPower IMS)', 'InPower IMS Manual'),
      badge: t('Sistem Terintegrasi', 'Integrated System'),
      desc: t(
        'Sistem manajemen terintegrasi untuk menjamin kualitas operasional, keandalan pembangkit, keselamatan kerja, dan perlindungan lingkungan.',
        'Integrated management system ensuring operational quality, power plant reliability, safety, and environmental protection.'
      ),
    },
    {
      title: t('Pedoman Kebijakan Manajemen Risiko', 'Risk Management Policy'),
      badge: t('Manajemen Risiko', 'Risk Management'),
      desc: t(
        'Kerangka kerja mitigasi risiko menyeluruh untuk mengidentifikasi, mengukur, dan mengendalikan risiko usaha di seluruh rantai operasional.',
        'Comprehensive risk mitigation framework to identify, assess, and control business risks across all operations.'
      ),
    },
    {
      title: t('Pedoman Sistem Pengendalian Internal', 'Internal Control System'),
      badge: t('Audit & Kontrol', 'Audit & Control'),
      desc: t(
        'Sistem pengawasan berkala dan kepatuhan prosedur guna memastikan keabsahan transaksi, akurasi laporan keuangan, dan efektivitas proses bisnis.',
        'Periodic oversight and compliance system ensuring transactional validity, financial report accuracy, and business efficacy.'
      ),
    },
  ];

  const supportingPolicies = [
    {
      title: t('Kebijakan Whistle Blowing System (WBS)', 'Whistleblowing System Policy'),
      desc: t('Mekanisme pelaporan dugaan pelanggaran hukum dan etika dengan perlindungan kerahasiaan penuh bagi pelapor.', 'Violation reporting channel with strict whistleblower protection.'),
      icon: <AlertCircle size={20} />,
    },
    {
      title: t('Kebijakan Pengendalian Gratifikasi', 'Gratification Control Policy'),
      desc: t('Pedoman penolakan dan pelaporan gratifikasi guna menegakkan budaya anti suap dan integritas kerja.', 'Guidelines on rejecting and reporting gifts/gratifications to uphold anti-bribery culture.'),
      icon: <Lock size={20} />,
    },
    {
      title: t('Laporan Harta Kekayaan Pejabat (LHKPN)', 'Asset Declaration Policy (LHKPN)'),
      desc: t('Kewajiban pelaporan kekayaan pejabat perusahaan secara berkala kepada KPK demi akuntabilitas publik.', 'Mandatory asset reporting to KPK for corporate officials ensuring public accountability.'),
      icon: <FileText size={20} />,
    },
    {
      title: t('Kebijakan Indonesia Power Bersih', 'Clean Indonesia Power Policy'),
      desc: t('Komitmen zero-tolerance terhadap segala bentuk kecurangan, pemerasan, dan penyalahgunaan wewenang.', 'Zero-tolerance pledge against fraud, extortion, and abuse of authority across all tiers.'),
      icon: <ShieldCheck size={20} />,
    },
    {
      title: t('Kebijakan Benturan Kepentingan', 'Conflict of Interest Policy'),
      desc: t('Tata kelola pencegahan dan penanganan situasi di mana kepentingan pribadi dapat memengaruhi objektivitas tugas.', 'Preventing and resolving situations where personal interests could bias official duties.'),
      icon: <Scale size={20} />,
    },
    {
      title: t('Kebijakan Transparansi Informasi Publik', 'Public Information Transparency Policy'),
      desc: t('Pemberian akses informasi perusahaan yang akurat, mutakhir, dan relevan sesuai ketentuan perundang-undangan.', 'Providing accurate, timely, and relevant corporate information under freedom of information laws.'),
      icon: <Eye size={20} />,
    },
  ];

  return (
    <>
      <Header />

      <main style={{ width: '100%', overflowX: 'clip', backgroundColor: 'var(--bg-cream, #faf9f6)' }}>
        {/* Full-Width Hero Section - Signature Corner Card Layout matching Profil & Laporan pages */}
        <section className="gcg-hero-section">
          <div className="gcg-hero-canvas">
            {/* Dark gradient overlay */}
            <div className="canvas-overlay" />

            {/* Top-Right Floating Metrics / Standard Pills */}
            <div className="hero-top-stats">
              <div className="floating-stat-pill">
                <ShieldCheck size={16} color="var(--primary-green, #2d6a4f)" />
                <span className="stat-pill-num">Permen BUMN</span>
                <span className="stat-pill-text">{t('No. Per-01/MBU/2011', 'No. Per-01/MBU/2011')}</span>
              </div>
              <div className="floating-stat-pill">
                <FileCheck size={16} color="var(--primary-green, #2d6a4f)" />
                <span className="stat-pill-num">SK-16/S</span>
                <span className="stat-pill-text">{t('Standar Penerapan GCG', 'GCG Standard')}</span>
              </div>
              <div className="floating-stat-pill">
                <Award size={16} color="var(--primary-green, #2d6a4f)" />
                <span className="stat-pill-num">ISO 37001</span>
                <span className="stat-pill-text">{t('Sistem Anti Penyuapan (SMAP)', 'Anti-Bribery System')}</span>
              </div>
            </div>

            {/* Bottom-Left White Editorial Corner Card */}
            <div className="hero-corner-card">
              <nav className="hero-breadcrumb" aria-label="Breadcrumb">
                <Link href="/" className="crumb-link">{t('Beranda', 'Home')}</Link>
                <span className="crumb-sep">/</span>
                <span className="crumb-link">{t('Tentang Kami', 'About Us')}</span>
                <span className="crumb-sep">/</span>
                <span className="crumb-current">{t('Praktik Tata Kelola (GCG)', 'Governance Practices')}</span>
              </nav>

              <h1 className="hero-heading">
                {t('Praktik Tata Kelola Perusahaan', 'Corporate Governance Practices')}
              </h1>

              <p className="hero-subtext">
                {t(
                  'Perusahaan memandang Good Corporate Governance (GCG) sebagai instrumen fundamental untuk menjaga kelangsungan usaha, memelihara kepercayaan pemangku kepentingan, dan menumbuhkan integritas moral berbasis standar Kementerian BUMN.',
                  'The company views Good Corporate Governance (GCG) as a vital instrument to safeguard business sustainability, nurture stakeholder trust, and foster moral integrity based on Ministry of SOEs standards.'
                )}
              </p>

              <div className="hero-buttons-row">
                <a href="#tujuan-gcg" className="btn-hero-primary">
                  <span>{t('Tujuan Implementasi GCG', 'GCG Implementation Goals')}</span>
                  <ArrowRight size={16} />
                </a>
                <a href="#pedoman-kebijakan" className="btn-hero-secondary">
                  <span>{t('Pedoman & Kebijakan', 'Guidelines & Policies')}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Overview & Foundation */}
        <section className="gcg-section gcg-overview-section">
          <div className="gcg-container">
            <div className="gcg-overview-grid">
              {/* Left Column: Narrative Prose */}
              <div className="gcg-prose-col">
                <div className="section-label">
                  <Sparkles size={16} />
                  <span>{t('LANDASAN & KOMITMEN', 'FOUNDATION & COMMITMENT')}</span>
                </div>

                <h2 className="section-title">
                  {t('Menjaga Kelangsungan Usaha & Kepercayaan Pemangku Kepentingan', 'Sustaining Business Continuity & Stakeholder Trust')}
                </h2>

                <div className="prose-body">
                  <p className="lead-paragraph">
                    {t(
                      'Perusahaan memandang praktik tata Kelola Perusahaan yang baik (GCG) merupakan alat untuk menjaga kelangsungan usaha, menjaga kepercayaan para pemangku kepentingan, dan menumbuhkan integritas Perusahaan. Pedoman Tata Kelola Perusahaan disusun sebagai acuan dalam mengelola PT Indonesia Power berdasarkan prinsip Good Corporate Governance (GCG) yang menjadi kaidah dan pedoman bagi pengurus perusahaan dalam menjalankan aktivitas bisnisnya.',
                      'The company views Good Corporate Governance (GCG) practices as a vital instrument in safeguarding business sustainability, nurturing stakeholder trust, and fostering corporate integrity. The Corporate Governance Guidelines are formulated as a guiding reference in managing PT Indonesia Power based on GCG principles that serve as foundational rules and benchmarks for management in executing business activities.'
                    )}
                  </p>

                  <p>
                    {t(
                      'Sebagai wujud penerapan GCG yang komprehensif, PT Indonesia Power mengadopsi standar penerapan GCG untuk Badan Usaha Milik Negara (BUMN) yang dikeluarkan oleh Kantor Kementerian Negara BUMN, yaitu Peraturan Menteri Negara BUMN No. Per-01/MBU/2011 dan SK-16/S MBU/2012.',
                      'As a tangible manifestation of comprehensive GCG implementation, PT Indonesia Power adopts GCG standards for State-Owned Enterprises (SOEs) enacted by the Ministry of SOEs, specifically Regulation of the Minister of SOEs No. Per-01/MBU/2011 and SK-16/S MBU/2012.'
                    )}
                  </p>
                </div>

                <div className="principles-mini-grid">
                  <div className="principle-box">
                    <span className="principle-letter">T</span>
                    <div className="principle-info">
                      <strong>{t('Transparansi', 'Transparency')}</strong>
                      <span>{t('Keterbukaan informasi material', 'Openness of material facts')}</span>
                    </div>
                  </div>
                  <div className="principle-box">
                    <span className="principle-letter">A</span>
                    <div className="principle-info">
                      <strong>{t('Akuntabilitas', 'Accountability')}</strong>
                      <span>{t('Kejelasan fungsi & struktur', 'Clarity of role & structure')}</span>
                    </div>
                  </div>
                  <div className="principle-box">
                    <span className="principle-letter">R</span>
                    <div className="principle-info">
                      <strong>{t('Responsibilitas', 'Responsibility')}</strong>
                      <span>{t('Kepatuhan hukum & etika', 'Legal & ethical compliance')}</span>
                    </div>
                  </div>
                  <div className="principle-box">
                    <span className="principle-letter">I</span>
                    <div className="principle-info">
                      <strong>{t('Independensi', 'Independency')}</strong>
                      <span>{t('Bebas benturan kepentingan', 'Free from conflict of interest')}</span>
                    </div>
                  </div>
                  <div className="principle-box">
                    <span className="principle-letter">F</span>
                    <div className="principle-info">
                      <strong>{t('Fairness', 'Fairness')}</strong>
                      <span>{t('Kewajaran & kesetaraan hak', 'Fairness & equal stakeholder rights')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Anti Suap Image / Showcase Card */}
              <div className="gcg-image-col">
                <div className="anti-suap-card">
                  <div className="anti-suap-img-frame">
                    {!imgError ? (
                      <img 
                        src="/images/Anti Suap.png" 
                        alt="Komitmen Sistem Manajemen Anti Penyuapan (SMAP) PT Indonesia Power" 
                        className="anti-suap-img"
                        onError={() => setImgError(true)}
                      />
                    ) : (
                      <div className="anti-suap-placeholder">
                        <div className="placeholder-icon-circle">
                          <ShieldCheck size={48} className="shield-icon" />
                        </div>
                        <h3 className="placeholder-title">{t('Sistem Manajemen Anti Penyuapan (SMAP)', 'Anti-Bribery Management System (SMAP)')}</h3>
                        <p className="placeholder-desc">
                          {t(
                            'Penerapan ISO 37001 SMAP dan prinsip 4 NOs (No Bribery, No Kickback, No Gift, No Luxurious Hospitality) di seluruh unit operasional PLTGU Cilegon.',
                            'Implementation of ISO 37001 SMAP and the 4 NOs principles across all PLTGU Cilegon operational units.'
                          )}
                        </p>
                        <div className="placeholder-badge">
                          <BadgeCheck size={16} />
                          <span>SNI ISO 37001:2016 Certified</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="anti-suap-caption">
                    <h4>{t('Budaya Integritas & Anti Penyuapan', 'Integrity & Anti-Bribery Culture')}</h4>
                    <p>
                      {t(
                        'PT Indonesia Power berkomitmen menjalankan seluruh proses bisnis pembangkitan secara bersih, transparan, dan bebas dari praktik suap maupun gratifikasi.',
                        'PT Indonesia Power is committed to executing all power generation operations cleanly, transparently, and free from bribery or unlawful gratification.'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Objectives of GCG (7 Poin) */}
        <section id="tujuan-gcg" className="gcg-section gcg-objectives-section">
          <div className="gcg-container">
            <div className="section-header-center">
              <div className="section-label">
                <TargetIcon size={16} />
                <span>{t('TUJUAN GCG', 'GCG OBJECTIVES')}</span>
              </div>
              <h2 className="section-title">
                {t('Tujuan Implementasi GCG di Indonesia Power', 'Objectives of GCG Implementation at Indonesia Power')}
              </h2>
              <p className="section-subtitle">
                {t(
                  'Tujuh sasaran strategis penerapan tata kelola perusahaan yang baik untuk menjamin keunggulan kinerja operasional dan perlindungan nilai pemangku kepentingan.',
                  'Seven strategic goals of good corporate governance implementation ensuring operational excellence and stakeholder value preservation.'
                )}
              </p>
            </div>

            <div className="objectives-grid">
              {gcgObjectives.map((item) => (
                <div key={item.id} className="objective-card">
                  <div className="objective-header">
                    <div className="objective-number">0{item.id}</div>
                    <div className="objective-icon-wrap">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="objective-title">{item.title}</h3>
                  <p className="objective-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Core Governance Guidelines (Pedoman Utama) */}
        <section id="pedoman-kebijakan" className="gcg-section gcg-guidelines-section">
          <div className="gcg-container">
            <div className="section-header-left">
              <div className="section-label">
                <BookOpen size={16} />
                <span>{t('KERANGKA KEBIJAKAN', 'POLICY FRAMEWORK')}</span>
              </div>
              <h2 className="section-title">
                {t('Pedoman Tata Kelola Perusahaan', 'Corporate Governance Guidelines')}
              </h2>
              <p className="section-subtitle">
                {t(
                  'Pedoman baku yang diberlakukan oleh PT Indonesia Power sebagai landasan operasional dan pengawasan seluruh jajaran organisasi.',
                  'Standard manuals enforced by PT Indonesia Power as operational and supervisory foundations across all organization tiers.'
                )}
              </p>
            </div>

            <div className="guidelines-grid">
              {coreGuidelines.map((guide, idx) => (
                <div key={idx} className="guideline-card">
                  <div className="guideline-badge">{guide.badge}</div>
                  <h3 className="guideline-title">{guide.title}</h3>
                  <p className="guideline-desc">{guide.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Supporting Governance Policies (Kebijakan Pendukung) */}
        <section className="gcg-section gcg-supporting-section">
          <div className="gcg-container">
            <div className="section-header-center">
              <div className="section-label">
                <ShieldCheck size={16} />
                <span>{t('KEBIJAKAN PENDUKUNG', 'SUPPORTING POLICIES')}</span>
              </div>
              <h2 className="section-title">
                {t('Kebijakan Pendukung Praktik Tata Kelola', 'Supporting Governance Policies')}
              </h2>
              <p className="section-subtitle">
                {t(
                  'Rangkaian instrumen kebijakan terintegrasi untuk menegakkan integritas, kepatuhan, serta transparansi informasi publik.',
                  'Integrated policy instruments reinforcing integrity, compliance, and public information transparency.'
                )}
              </p>
            </div>

            <div className="supporting-grid">
              {supportingPolicies.map((policy, idx) => (
                <div key={idx} className="supporting-card">
                  <div className="supporting-icon-box">
                    {policy.icon}
                  </div>
                  <div className="supporting-content">
                    <h3 className="supporting-title">{policy.title}</h3>
                    <p className="supporting-desc">{policy.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Whistleblowing & Contact Banner */}
        <section className="gcg-section gcg-wbs-section">
          <div className="gcg-container">
            <div className="wbs-card">
              <div className="wbs-glow" />
              <div className="wbs-content">
                <div className="wbs-kicker">
                  <AlertCircle size={18} />
                  <span>{t('SALURAN PENGADUAN RESMI', 'OFFICIAL REPORTING CHANNEL')}</span>
                </div>
                <h2 className="wbs-title">
                  {t('Whistle Blowing System (WBS) & Pengendalian Gratifikasi', 'Whistleblowing System & Gratification Control')}
                </h2>
                <p className="wbs-text">
                  {t(
                    'Apabila Anda mengetahui adanya indikasi pelanggaran terhadap Pedoman Etika Perusahaan, praktik suap, benturan kepentingan, maupun kecurangan di lingkungan PT Indonesia Power UBP Cilegon, laporkan secara rahasia dan aman melalui portal pengaduan resmi.',
                    'If you suspect any violations against Code of Conduct, bribery, conflicts of interest, or fraud in PT Indonesia Power UBP Cilegon, submit a secure and confidential report through our official portal.'
                  )}
                </p>
                <div className="wbs-actions">
                  <a 
                    href="https://wbs.pln.co.id" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="wbs-primary-btn"
                  >
                    <span>{t('Portal Pengaduan WBS', 'WBS Reporting Portal')}</span>
                    <ExternalLink size={16} />
                  </a>
                  <Link href="/#kontak" className="wbs-secondary-btn">
                    <span>{t('Hubungi UBP Cilegon', 'Contact UBP Cilegon')}</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        /* Hero Section - Matching Profil & Laporan page */
        .gcg-hero-section {
          width: 100%;
          background-color: var(--bg-cream, #faf9f6);
        }

        .gcg-hero-canvas {
          position: relative;
          width: 100%;
          min-height: 640px;
          background-image: url('/images/pltgu-cilegon-2.png');
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
            rgba(18, 44, 30, 0.45) 100%
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

        /* Container */
        .gcg-container {
          width: 100%;
          max-width: 100%;
          padding: 0 clamp(1.5rem, 5vw, 6rem);
          margin: 0 auto;
          box-sizing: border-box;
        }

        /* Generic Section Styles */
        .gcg-section {
          padding: clamp(4.5rem, 7vw, 6.5rem) 0;
          border-bottom: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
        }

        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: 0.825rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--primary-green, #2d6a4f);
          margin-bottom: 1rem;
          text-transform: uppercase;
        }

        .section-title {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.025em;
          color: var(--bg-dark-green, #122c1e);
          margin-bottom: 1.25rem;
        }

        .section-subtitle {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--text-muted, #57655e);
          max-width: 720px;
        }

        .section-header-center {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: clamp(3rem, 5vw, 4.5rem);
        }

        .section-header-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: clamp(3rem, 5vw, 4rem);
        }

        /* Section 1: Overview & Foundation */
        .gcg-overview-section {
          background-color: #ffffff;
        }

        .gcg-overview-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
          gap: clamp(2.5rem, 5vw, 5.5rem);
          align-items: flex-start;
        }

        .gcg-prose-col {
          display: flex;
          flex-direction: column;
        }

        .prose-body {
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
          margin-bottom: 2.5rem;
        }

        .lead-paragraph {
          font-size: 1.15rem;
          line-height: 1.75;
          color: #1f2a24;
          font-weight: 500;
        }

        .prose-body p {
          font-size: 1.05rem;
          line-height: 1.75;
          color: var(--text-muted, #57655e);
        }

        .principles-mini-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 1rem;
        }

        .principle-box {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.85rem 1rem;
          background: #f8f7f2;
          border: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
          border-radius: 8px;
        }

        .principle-letter {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--primary-green, #2d6a4f);
          line-height: 1;
        }

        .principle-info {
          display: flex;
          flex-direction: column;
        }

        .principle-info strong {
          font-size: 0.9rem;
          color: var(--bg-dark-green, #122c1e);
        }

        .principle-info span {
          font-size: 0.75rem;
          color: var(--text-muted, #57655e);
          line-height: 1.3;
        }

        /* Image / Anti Suap Card */
        .gcg-image-col {
          display: flex;
          flex-direction: column;
        }

        .anti-suap-card {
          background: #faf9f6;
          border: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.05);
        }

        .anti-suap-img-frame {
          width: 100%;
          min-height: 280px;
          background: #122c1e;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .anti-suap-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        .anti-suap-placeholder {
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          color: #ffffff;
          gap: 1.25rem;
        }

        .placeholder-icon-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(116, 198, 157, 0.15);
          border: 1px solid rgba(116, 198, 157, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-lime, #b7e4c7);
        }

        .placeholder-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.3;
        }

        .placeholder-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          max-width: 440px;
        }

        .placeholder-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.9rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--accent-lime, #b7e4c7);
        }

        .anti-suap-caption {
          padding: 1.75rem 2rem;
          background: #ffffff;
        }

        .anti-suap-caption h4 {
          font-size: 1.15rem;
          color: var(--bg-dark-green, #122c1e);
          margin-bottom: 0.5rem;
        }

        .anti-suap-caption p {
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--text-muted, #57655e);
        }

        /* Section 2: Objectives Grid */
        .gcg-objectives-section {
          background-color: var(--bg-cream, #faf9f6);
        }

        .objectives-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.75rem;
        }

        .objective-card {
          background: #ffffff;
          border: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
          border-radius: 12px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }

        .objective-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.06);
        }

        .objective-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .objective-number {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          color: rgba(18, 44, 30, 0.2);
          line-height: 1;
        }

        .objective-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(45, 106, 79, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-green, #2d6a4f);
        }

        .objective-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
          margin-bottom: 0.85rem;
          line-height: 1.35;
        }

        .objective-desc {
          font-size: 0.975rem;
          line-height: 1.65;
          color: var(--text-muted, #57655e);
        }

        /* Section 3: Core Guidelines Grid */
        .gcg-guidelines-section {
          background-color: #ffffff;
        }

        .guidelines-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 2rem;
        }

        .guideline-card {
          background: #faf9f6;
          border: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
          border-radius: 12px;
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
        }

        .guideline-card:hover {
          transform: translateY(-4px);
          border-color: var(--primary-green, #2d6a4f);
        }

        .guideline-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.3rem 0.75rem;
          background: rgba(45, 106, 79, 0.1);
          color: var(--primary-green, #2d6a4f);
          border-radius: 4px;
          margin-bottom: 1.25rem;
        }

        .guideline-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
          margin-bottom: 0.85rem;
          line-height: 1.35;
        }

        .guideline-desc {
          font-size: 0.975rem;
          line-height: 1.65;
          color: var(--text-muted, #57655e);
        }

        /* Section 4: Supporting Policies Grid */
        .gcg-supporting-section {
          background-color: var(--bg-cream, #faf9f6);
        }

        .supporting-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 1.75rem;
        }

        .supporting-card {
          background: #ffffff;
          border: 1px solid var(--border-light, rgba(18, 44, 30, 0.08));
          border-radius: 12px;
          padding: 1.75rem;
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }

        .supporting-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(18, 44, 30, 0.06);
          color: var(--primary-green, #2d6a4f);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .supporting-content {
          display: flex;
          flex-direction: column;
        }

        .supporting-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--bg-dark-green, #122c1e);
          margin-bottom: 0.5rem;
          line-height: 1.35;
        }

        .supporting-desc {
          font-size: 0.925rem;
          line-height: 1.6;
          color: var(--text-muted, #57655e);
        }

        /* Section 5: WBS Callout Banner */
        .gcg-wbs-section {
          background-color: #ffffff;
          padding-bottom: 6rem;
        }

        .wbs-card {
          background: linear-gradient(135deg, #122c1e 0%, #1c4530 100%);
          border-radius: 16px;
          padding: clamp(3rem, 6vw, 4.5rem) clamp(2rem, 5vw, 4rem);
          position: relative;
          overflow: hidden;
          color: #ffffff;
        }

        .wbs-glow {
          position: absolute;
          bottom: -40%;
          right: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(116, 198, 157, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .wbs-content {
          position: relative;
          z-index: 2;
          max-width: 820px;
        }

        .wbs-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent-lime, #b7e4c7);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          margin-bottom: 1.25rem;
        }

        .wbs-title {
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          font-weight: 700;
          line-height: 1.25;
          margin-bottom: 1.25rem;
          color: #ffffff;
        }

        .wbs-text {
          font-size: 1.05rem;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 2.25rem;
        }

        .wbs-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
          align-items: center;
        }

        .wbs-primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.9rem 1.75rem;
          background: var(--light-green, #74c69d);
          color: #122c1e;
          font-weight: 700;
          font-size: 0.95rem;
          border-radius: 8px;
          text-decoration: none;
          min-height: 44px;
          box-sizing: border-box;
          transition: all 0.25s ease;
        }

        .wbs-primary-btn:hover {
          background: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .wbs-primary-btn:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 4px;
        }

        .wbs-secondary-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.9rem 1.5rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          font-weight: 600;
          font-size: 0.95rem;
          border-radius: 8px;
          text-decoration: none;
          min-height: 44px;
          box-sizing: border-box;
          transition: all 0.25s ease;
        }

        .wbs-secondary-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .wbs-secondary-btn:focus-visible {
          outline: 2px solid var(--accent-lime, #b7e4c7);
          outline-offset: 4px;
        }

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

          .gcg-overview-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .guidelines-grid {
            grid-template-columns: 1fr;
          }

          .supporting-grid {
            grid-template-columns: 1fr;
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

          .objectives-grid {
            grid-template-columns: 1fr;
          }

          .principles-mini-grid {
            grid-template-columns: 1fr 1fr;
          }

          .wbs-actions {
            flex-direction: column;
            width: 100%;
          }

          .wbs-primary-btn,
          .wbs-secondary-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}

// Icon helper
function TargetIcon(props: React.SVGProps<SVGSVGElement> & { size?: number }) {
  const size = props.size || 24;
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  );
}
