'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Search, Heart, User, Globe, ChevronDown, FileText, Wind, Award, Compass, Trees, Users, Activity, HelpCircle, ShieldCheck, ArrowRight, ArrowLeft, BarChart3, Camera } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '@/context/LanguageContext';

// Custom wheelchair SVG to match the reference icon exactly
const WheelchairIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="5" r="2" />
    <path d="M9 13a4 4 0 1 0 8 0" />
    <path d="M9 9h6l-2 5H9" />
    <path d="m12 17 3 3" />
  </svg>
);

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { lang, toggleLang, t } = useLanguage();
  const [showUtility, setShowUtility] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(!isHomePage);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const threshold = window.innerHeight - 100;
      const scrollingUp = y < lastScrollY.current;
      lastScrollY.current = y;
      
      // Stage 1: Show utility bar when scrolling UP or at top; hide when scrolling DOWN
      if (y <= 20) {
        setShowUtility(true);
      } else if (scrollingUp) {
        setShowUtility(true);
      } else {
        setShowUtility(false);
      }

      // Stage 2: Collapse/expand based on scroll position (hero visibility)
      if (!isHomePage || y > threshold) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }

      // Stage 3: Hide navbar completely when scrolled close to the footer (desktop only)
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      if (window.innerWidth > 992 && y + clientHeight >= scrollHeight - 400) {
        setIsNavbarHidden(true);
      } else {
        setIsNavbarHidden(false);
      }
    };
    
    // Run once on mount
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (headerRef.current) {
      if (isHomePage) {
        gsap.fromTo(headerRef.current,
          { y: -200, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: 'power4.out', delay: 5.0 }
        );
      } else {
        gsap.fromTo(headerRef.current,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0 }
        );
      }
    }
  }, [isHomePage]);

  const handleLinkClick = (href: string) => {
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`header-wrapper ${(!isHomePage || isCollapsed) ? 'header-collapsed' : ''} ${isMenuOpen ? 'menu-open-active' : ''} ${activeDropdown ? 'has-dropdown-open' : ''} ${isNavbarHidden ? 'navbar-hidden' : ''} ${((!isHomePage || isCollapsed) && showUtility) ? 'utility-visible' : ''}`}
      >
        {/* Top Navigation Bar containing Hamburger, Logo, Links, and Icons */}
        <div className="main-nav">
          {/* Left Group: Hamburger + Logo */}
          <div className="nav-left-group">
            <button 
              className={`hamburger-btn ${isMenuOpen ? 'open' : ''} ${(!isHomePage || isCollapsed) ? 'scrolled' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className="line line-1"></span>
              <span className="line line-2"></span>
            </button>

            <a 
              href="/"
              className="logo"
            >
              <img src="/images/logo-pln.png" alt="PLN Logo" className="logo-img" />
              <div className="logo-text">
                <span className="logo-title">PLN</span>
                <span className="logo-subtitle">INDONESIA POWER</span>
                <span className="logo-sub-subtitle">UBP CILEGON</span>
              </div>
              <span className="logo-divider" aria-hidden="true" />
              <img
                src="/images/logo-kehati-ubpclgv2.png"
                alt="Kehati UBP Cilegon"
                className="kehati-logo-img"
              />
            </a>
          </div>

          {/* Links (Hidden on Mobile) */}
          <nav className="nav-links">
            <div className="nav-item-group">
              <a 
                href="/#proper" 
                onClick={(e) => { 
                  if (window.location.pathname === '/') {
                    e.preventDefault(); 
                    handleLinkClick('#proper'); 
                  }
                }} 
                className="nav-link-text"
              >
                PROPER KLHK
              </a>
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'proper' ? null : 'proper')}
                className={`nav-link-chevron ${activeDropdown === 'proper' ? 'active' : ''}`}
                aria-label="Toggle PROPER Dropdown"
              >
                <ChevronDown size={14} className="chevron-icon" />
              </button>
            </div>

            <div className="nav-item-group">
              <a 
                href="/#kehati" 
                onClick={(e) => { 
                  if (window.location.pathname === '/') {
                    e.preventDefault(); 
                    handleLinkClick('#kehati'); 
                  }
                }} 
                className="nav-link-text"
              >
                {t('Keanekaragaman Hayati', 'Biodiversity')}
              </a>
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'kehati' ? null : 'kehati')}
                className={`nav-link-chevron ${activeDropdown === 'kehati' ? 'active' : ''}`}
                aria-label="Toggle Kehati Dropdown"
              >
                <ChevronDown size={14} className="chevron-icon" />
              </button>
            </div>


            <div className="nav-item-group">
              <a 
                href="/#tentang" 
                onClick={(e) => { 
                  if (window.location.pathname === '/') {
                    e.preventDefault(); 
                    handleLinkClick('#tentang'); 
                  }
                }} 
                className="nav-link-text"
              >
                {t('Tentang Kami', 'About Us')}
              </a>
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'tentang' ? null : 'tentang')}
                className={`nav-link-chevron ${activeDropdown === 'tentang' ? 'active' : ''}`}
                aria-label="Toggle Tentang Dropdown"
              >
                <ChevronDown size={14} className="chevron-icon" />
              </button>
            </div>
          </nav>

          {/* Icons */}
          <div className="nav-icons">
            <button className="icon-btn" aria-label="Search">
              <Search size={20} strokeWidth={1.8} />
            </button>
            <button className="icon-btn" aria-label="Accessibility">
              <WheelchairIcon size={20} />
            </button>
            <button className="icon-btn" aria-label="Favorites">
              <Heart size={20} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Desktop Utility Bar (Collapsible at Stage 1, hidden on mobile) */}
        <div className={`utility-collapsible ${!showUtility ? 'collapsed' : ''}`}>
          <div className="utility-bar">
            <div className="utility-links">
              <Link href="/laporan">{t('Laporan Tahunan', 'Annual Reports')}</Link>
              <a href="/#kontak">{t('Kontak UBP', 'Contact UBP')}</a>
            </div>
            <span className="divider">|</span>
            <div className="socials">
              <a href="#" aria-label="Instagram">ig</a>
              <a href="#" aria-label="YouTube">yt</a>
            </div>
            <span className="divider">|</span>
            <a href="#masuk" className="utility-action">
              <User size={14} />
              <span>{t('Masuk', 'Login')}</span>
            </a>
            <span className="divider">|</span>
            <button 
              className="lang-btn"
              onClick={toggleLang}
              title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
              style={{ cursor: 'pointer' }}
            >
              <Globe size={14} />
              <span style={{ fontWeight: 700, letterSpacing: '0.05em' }}>{lang.toUpperCase()}</span>
              <ChevronDown size={12} style={{ marginLeft: '2px' }} />
            </button>
          </div>
        </div>

        {/* Megamenu dropdown area */}
        {activeDropdown && (
          <div className="megamenu-wrapper">
            {activeDropdown === 'proper' && (
              <div className="megamenu-content">
                <a href="#proper" onClick={(e) => { e.preventDefault(); handleLinkClick('#proper'); setActiveDropdown(null); }} className="megamenu-item">
                  <div className="megamenu-item-content">
                    <div className="megamenu-icon">
                      <FileText size={20} />
                    </div>
                    <span className="megamenu-text">Laporan PROPER</span>
                  </div>
                  <div className="megamenu-item-arrow">
                    <ArrowRight size={16} />
                  </div>
                </a>
                <a href="#proper" onClick={(e) => { e.preventDefault(); handleLinkClick('#proper'); setActiveDropdown(null); }} className="megamenu-item">
                  <div className="megamenu-item-content">
                    <div className="megamenu-icon">
                      <Wind size={20} />
                    </div>
                    <span className="megamenu-text">Reduksi Emisi</span>
                  </div>
                  <div className="megamenu-item-arrow">
                    <ArrowRight size={16} />
                  </div>
                </a>
                <a href="#proper" onClick={(e) => { e.preventDefault(); handleLinkClick('#proper'); setActiveDropdown(null); }} className="megamenu-item">
                  <div className="megamenu-item-content">
                    <div className="megamenu-icon">
                      <Activity size={20} />
                    </div>
                    <span className="megamenu-text">Efisiensi Energi</span>
                  </div>
                  <div className="megamenu-item-arrow">
                    <ArrowRight size={16} />
                  </div>
                </a>
                <a href="#proper" onClick={(e) => { e.preventDefault(); handleLinkClick('#proper'); setActiveDropdown(null); }} className="megamenu-item">
                  <div className="megamenu-item-content">
                    <div className="megamenu-icon">
                      <ShieldCheck size={20} />
                    </div>
                    <span className="megamenu-text">Standard Hijau</span>
                  </div>
                  <div className="megamenu-item-arrow">
                    <ArrowRight size={16} />
                  </div>
                </a>
              </div>
            )}

            {activeDropdown === 'kehati' && (
              <div className="megamenu-content">
                <a href="/laporan/2026#program-mangrove" onClick={() => setActiveDropdown(null)} className="megamenu-item">
                  <div className="megamenu-item-content">
                    <div className="megamenu-icon">
                      <Compass size={20} />
                    </div>
                    <span className="megamenu-text">{t('Restorasi Mangrove', 'Mangrove Restoration')}</span>
                  </div>
                  <div className="megamenu-item-arrow">
                    <ArrowRight size={16} />
                  </div>
                </a>
                <a href="/laporan/2026#program-pelestarian-alami" onClick={() => setActiveDropdown(null)} className="megamenu-item">
                  <div className="megamenu-item-content">
                    <div className="megamenu-icon">
                      <Trees size={20} />
                    </div>
                    <span className="megamenu-text">{t('Taman Kehati', 'Kehati Park')}</span>
                  </div>
                  <div className="megamenu-item-arrow">
                    <ArrowRight size={16} />
                  </div>
                </a>
                <a href="/laporan/2026#program-biowing-connect" onClick={() => setActiveDropdown(null)} className="megamenu-item">
                  <div className="megamenu-item-content">
                    <div className="megamenu-icon">
                      <Leaf size={20} />
                    </div>
                    <span className="megamenu-text">{t('Konservasi Flora', 'Flora Conservation')}</span>
                  </div>
                  <div className="megamenu-item-arrow">
                    <ArrowRight size={16} />
                  </div>
                </a>
                <a href="/laporan/2026#program-apotek-hidup" onClick={() => setActiveDropdown(null)} className="megamenu-item">
                  <div className="megamenu-item-content">
                    <div className="megamenu-icon">
                      <Users size={20} />
                    </div>
                    <span className="megamenu-text">{t('Pemberdayaan', 'Community Empowerment')}</span>
                  </div>
                  <div className="megamenu-item-arrow">
                    <ArrowRight size={16} />
                  </div>
                </a>
                <Link href="/galeri" onClick={() => setActiveDropdown(null)} className="megamenu-item">
                  <div className="megamenu-item-content">
                    <div className="megamenu-icon">
                      <Camera size={20} />
                    </div>
                    <span className="megamenu-text">{t('Galeri Kehati', 'Kehati Gallery')}</span>
                  </div>
                  <div className="megamenu-item-arrow">
                    <ArrowRight size={16} />
                  </div>
                </Link>
              </div>
            )}

            {activeDropdown === 'tentang' && (
              <div className="megamenu-content">
                <a href="/#tentang" onClick={(e) => { if (window.location.pathname === '/') { e.preventDefault(); handleLinkClick('#tentang'); } setActiveDropdown(null); }} className="megamenu-item">
                  <div className="megamenu-item-content">
                    <div className="megamenu-icon">
                      <Award size={20} />
                    </div>
                    <span className="megamenu-text">{t('Visi & Misi', 'Vision & Mission')}</span>
                  </div>
                  <div className="megamenu-item-arrow">
                    <ArrowRight size={16} />
                  </div>
                </a>
                <a href="/profil-ubp-cilegon" onClick={() => setActiveDropdown(null)} className="megamenu-item">
                  <div className="megamenu-item-content">
                    <div className="megamenu-icon">
                      <Compass size={20} />
                    </div>
                    <span className="megamenu-text">{t('Profil UBP', 'UBP Profile')}</span>
                  </div>
                  <div className="megamenu-item-arrow">
                    <ArrowRight size={16} />
                  </div>
                </a>
                <Link href="/praktik-tata-kelola" onClick={() => setActiveDropdown(null)} className="megamenu-item">
                  <div className="megamenu-item-content">
                    <div className="megamenu-icon">
                      <ShieldCheck size={20} />
                    </div>
                    <span className="megamenu-text">{t('Praktik Tata Kelola', 'Governance (GCG)')}</span>
                  </div>
                  <div className="megamenu-item-arrow">
                    <ArrowRight size={16} />
                  </div>
                </Link>
                <a href="/#tentang" onClick={(e) => { if (window.location.pathname === '/') { e.preventDefault(); handleLinkClick('#tentang'); } setActiveDropdown(null); }} className="megamenu-item">
                  <div className="megamenu-item-content">
                    <div className="megamenu-icon">
                      <HelpCircle size={20} />
                    </div>
                    <span className="megamenu-text">{t('Hubungi Kami', 'Contact Us')}</span>
                  </div>
                  <div className="megamenu-item-arrow">
                    <ArrowRight size={16} />
                  </div>
                </a>
              </div>
            )}
          </div>
        )}

        {/* Desktop Hero Main Content (Rendered only on Homepage) */}
        {isHomePage && (
          <div className="collapsible-content" style={{ marginTop: isCollapsed ? '0' : '1.75rem' }}>
            <div className="hero-split">
              {/* Left Column: Big Headline */}
              <div className="hero-left">
                <h1 className="hero-title">
                  {t('Energi Bersih,', 'Clean Energy,')}<br />
                  {t('Lestari Negeriku.', 'Sustaining Our Nation.')}
                </h1>
              </div>

              {/* Right Column: Description & Action */}
              <div className="hero-right">
                <p className="hero-desc">
                  {t(
                    'PLTGU Cilegon mempelopori energi andal ramah lingkungan dan kelestarian keanekaragaman hayati menuju masa depan hijau.',
                    'PLTGU Cilegon pioneers clean reliable energy and biodiversity conservation towards a sustainable green future.'
                  )}
                </p>
                <a href="/#proper" className="btn-green">
                  {t('Pelajari PROPER', 'Explore PROPER')}
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu Drawer (Visible only when isMenuOpen is true on mobile viewports) */}
        {isMenuOpen && (
          <div className="mobile-menu-drawer">
            {/* Main Menu or Submenu */}
            {!mobileSubmenu ? (
              <>
                {/* Nav Links Box */}
                <div className="mobile-nav-box">
                  <button onClick={() => setMobileSubmenu('proper')} className="mobile-nav-item">
                    <span>PROPER KLHK</span>
                    <span className="arrow-right">→</span>
                  </button>
                  <button onClick={() => setMobileSubmenu('kehati')} className="mobile-nav-item">
                    <span>{t('Keanekaragaman Hayati', 'Biodiversity')}</span>
                    <span className="arrow-right">→</span>
                  </button>
                  <button onClick={() => setMobileSubmenu('tentang')} className="mobile-nav-item">
                    <span>{t('Tentang Kami', 'About Us')}</span>
                    <span className="arrow-right">→</span>
                  </button>
                </div>

                {/* Actions, Extras and Socials */}
                <div className="mobile-actions-wrapper">
                  <div className="mobile-actions-row">
                    <a href="#masuk" onClick={() => setIsMenuOpen(false)} className="mobile-action-btn">
                      <User size={16} />
                      <span>{t('Masuk', 'Login')}</span>
                    </a>
                    <button 
                      className="mobile-lang-btn"
                      onClick={toggleLang}
                      style={{ cursor: 'pointer' }}
                    >
                      <Globe size={16} />
                      <span style={{ fontWeight: 700 }}>{lang.toUpperCase()}</span>
                      <ChevronDown size={14} />
                    </button>
                  </div>

                  <div className="mobile-divider"></div>

                  <div className="mobile-extra-links">
                    <Link href="/laporan" onClick={() => setIsMenuOpen(false)}>{t('Laporan Tahunan', 'Annual Reports')}</Link>
                    <a href="/#kontak" onClick={() => setIsMenuOpen(false)}>{t('Kontak UBP', 'Contact UBP')}</a>
                  </div>

                  <div className="mobile-bottom-bar">
                    <div className="mobile-logo-circle">
                      <Leaf size={18} style={{ color: '#ffffff' }} />
                    </div>
                    <div className="mobile-social-icons">
                      <a href="#" aria-label="Instagram">ig</a>
                      <a href="#" aria-label="YouTube">yt</a>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="mobile-submenu-panel">
                {/* Back button + Title */}
                <div className="mobile-submenu-header">
                  <button className="mobile-back-btn" onClick={() => setMobileSubmenu(null)}>
                    <ArrowLeft size={20} />
                  </button>
                  <span className="mobile-submenu-title">
                    {mobileSubmenu === 'proper' && 'PROPER KLHK'}
                    {mobileSubmenu === 'kehati' && 'Keanekaragaman Hayati'}
                    {mobileSubmenu === 'tentang' && 'Tentang Kami'}
                  </span>
                </div>

                {/* Submenu Items */}
                <div className="mobile-submenu-list">
                  {mobileSubmenu === 'proper' && (
                    <>
                      <a href="#proper" onClick={(e) => { e.preventDefault(); handleLinkClick('#proper'); setIsMenuOpen(false); setMobileSubmenu(null); }} className="mobile-submenu-item">
                        <FileText size={18} />
                        <span>Laporan PROPER</span>
                      </a>
                      <a href="#proper" onClick={(e) => { e.preventDefault(); handleLinkClick('#proper'); setIsMenuOpen(false); setMobileSubmenu(null); }} className="mobile-submenu-item">
                        <Wind size={18} />
                        <span>Reduksi Emisi</span>
                      </a>
                      <a href="#proper" onClick={(e) => { e.preventDefault(); handleLinkClick('#proper'); setIsMenuOpen(false); setMobileSubmenu(null); }} className="mobile-submenu-item">
                        <Activity size={18} />
                        <span>Efisiensi Energi</span>
                      </a>
                      <a href="#proper" onClick={(e) => { e.preventDefault(); handleLinkClick('#proper'); setIsMenuOpen(false); setMobileSubmenu(null); }} className="mobile-submenu-item">
                        <ShieldCheck size={18} />
                        <span>Standard Hijau</span>
                      </a>
                    </>
                  )}
                  {mobileSubmenu === 'kehati' && (
                    <>
                      <Link href="/laporan/2026#program-mangrove" onClick={() => { setIsMenuOpen(false); setMobileSubmenu(null); }} className="mobile-submenu-item">
                        <Compass size={18} />
                        <span>{t('Restorasi Mangrove', 'Mangrove Restoration')}</span>
                      </Link>
                      <Link href="/laporan/2026#program-pelestarian-alami" onClick={() => { setIsMenuOpen(false); setMobileSubmenu(null); }} className="mobile-submenu-item">
                        <Trees size={18} />
                        <span>{t('Taman Kehati', 'Kehati Park')}</span>
                      </Link>
                      <Link href="/laporan/2026#program-biowing-connect" onClick={() => { setIsMenuOpen(false); setMobileSubmenu(null); }} className="mobile-submenu-item">
                        <Leaf size={18} />
                        <span>{t('Konservasi Flora', 'Flora Conservation')}</span>
                      </Link>
                      <Link href="/laporan/2026#program-apotek-hidup" onClick={() => { setIsMenuOpen(false); setMobileSubmenu(null); }} className="mobile-submenu-item">
                        <Users size={18} />
                        <span>{t('Pemberdayaan', 'Community Empowerment')}</span>
                      </Link>
                      <Link href="/galeri" onClick={() => { setIsMenuOpen(false); setMobileSubmenu(null); }} className="mobile-submenu-item">
                        <Camera size={18} />
                        <span>{t('Galeri Kehati', 'Kehati Gallery')}</span>
                      </Link>
                    </>
                  )}
                  {mobileSubmenu === 'tentang' && (
                    <>
                      <a href="#tentang" onClick={(e) => { e.preventDefault(); handleLinkClick('#tentang'); setIsMenuOpen(false); setMobileSubmenu(null); }} className="mobile-submenu-item">
                        <Award size={18} />
                        <span>Visi & Misi</span>
                      </a>
                      <a href="/profil-ubp-cilegon" onClick={() => { setIsMenuOpen(false); setMobileSubmenu(null); }} className="mobile-submenu-item">
                        <Compass size={18} />
                        <span>Profil UBP</span>
                      </a>
                      <Link href="/praktik-tata-kelola" onClick={() => { setIsMenuOpen(false); setMobileSubmenu(null); }} className="mobile-submenu-item">
                        <ShieldCheck size={18} />
                        <span>Praktik Tata Kelola</span>
                      </Link>
                      <a href="#tentang" onClick={(e) => { e.preventDefault(); handleLinkClick('#tentang'); setIsMenuOpen(false); setMobileSubmenu(null); }} className="mobile-submenu-item">
                        <HelpCircle size={18} />
                        <span>Hubungi Kami</span>
                      </a>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </header>

      <style jsx>{`
        .header-wrapper {
          position: fixed;
          top: 0;
          left: 70px;
          right: 70px;
          max-width: 1680px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 0 0 32px 32px;
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.08);
          z-index: 100;
          opacity: 0;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          box-sizing: border-box;
          padding: 1.5rem 3rem;
          max-height: 900px;
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          display: flex;
          flex-direction: column;
        }

        .header-wrapper.navbar-hidden {
          transform: translateY(-200px) !important;
          opacity: 0 !important;
          pointer-events: none;
        }

        .header-collapsed {
          top: 0;
          left: 70px;
          right: 70px;
          border-radius: 0 0 24px 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          padding: 1.2rem 2.5rem;
          max-height: 80px;
          border-bottom: 1px solid var(--border-light);
          justify-content: center;
        }

        /* When collapsed but utility bar is visible (scrolling up), expand to fit both rows */
        .header-collapsed.utility-visible {
          max-height: 140px;
          justify-content: flex-start;
        }

        .header-wrapper.has-dropdown-open {
          max-height: 700px !important;
          overflow: visible !important;
        }

        .header-collapsed.has-dropdown-open {
          max-height: 450px !important;
          overflow: visible !important;
          justify-content: flex-start !important;
        }

        /* Hamburger button kustom */
        .hamburger-btn {
          display: none;
          position: relative;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid #e5e7eb;
          background-color: #ffffff;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 6px;
          padding: 0;
          transition: all 0.3s ease;
          z-index: 101;
        }

        .hamburger-btn .line {
          display: block;
          width: 18px;
          height: 2px;
          background-color: #1f2937;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hamburger-btn.open,
        .hamburger-btn.scrolled {
          background-color: #1f2937;
          border-color: #1f2937;
        }

        .hamburger-btn.open .line,
        .hamburger-btn.scrolled .line {
          background-color: #ffffff;
        }

        /* Group left-aligned navbar items (logo + burger on mobile) */
        .nav-left-group {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        /* Stage 1: Utility Bar collapsible styling */
        .utility-collapsible {
          opacity: 1;
          max-height: 50px;
          transition: opacity 0.3s ease, max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), margin-bottom 0.4s ease;
          overflow: hidden;
          margin-bottom: 1rem;
          order: 1; /* Position utility above navigation visually in desktop */
        }
        
        .utility-collapsible.collapsed {
          opacity: 0;
          max-height: 0;
          margin-bottom: 0 !important;
          pointer-events: none;
        }

        /* Stage 2: Hero Content collapsible styling */
        .collapsible-content {
          opacity: 1;
          max-height: 400px;
          transition: opacity 0.35s ease, max-height 0.6s cubic-bezier(0.16, 1, 0.3, 1), margin-top 0.6s ease, padding 0.6s ease;
          overflow: hidden;
          order: 4;
        }

        .header-collapsed .collapsible-content {
          opacity: 0;
          max-height: 0;
          margin-top: 0 !important;
          margin-bottom: 0 !important;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          pointer-events: none;
        }


        /* Utility Bar Styling */
        .utility-bar {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 1.25rem;
          font-size: 0.8rem;
          color: #6b7280;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        .utility-links {
          display: flex;
          gap: 1.25rem;
        }
        .utility-links a {
          color: #6b7280;
          text-decoration: none;
          font-weight: 400;
          transition: color 0.2s;
        }
        .utility-links a:hover {
          color: var(--bg-dark-green);
        }

        .socials {
          display: flex;
          gap: 1.25rem;
        }
        .socials a {
          color: #6b7280;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .socials a:hover {
          color: var(--bg-dark-green);
        }
        .divider {
          color: #e5e7eb;
        }
        .utility-action {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: #6b7280;
          text-decoration: none;
          font-weight: 400;
        }
        .utility-action:hover {
          color: var(--bg-dark-green);
        }
        .lang-btn {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 400;
          padding: 0;
        }
        .lang-btn:hover {
          color: var(--bg-dark-green);
        }

        /* Main Nav Bar Styling */
        .main-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          order: 2;
        }

        .logo,
        :global(.logo) {
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 0.8rem !important;
          text-decoration: none;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .logo-img,
        :global(.logo-img) {
          height: 40px;
          width: auto;
          object-fit: contain;
          flex-shrink: 0;
          display: block;
        }
        .logo-divider,
        :global(.logo-divider) {
          width: 1px;
          height: 36px;
          background-color: #d1d5db;
          flex-shrink: 0;
          display: block;
        }
        .kehati-logo-img,
        :global(.kehati-logo-img) {
          height: 42px;
          width: auto;
          object-fit: contain;
          flex-shrink: 0;
          display: block;
        }
        .logo-text,
        :global(.logo-text) {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
          flex-shrink: 0;
        }
        .logo-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: #23aae1;
          letter-spacing: 0.15em;
          line-height: 1.1;
        }
        .logo-subtitle {
          font-size: 0.75rem;
          font-weight: 500;
          color: #000000;
          line-height: 1.1;
          margin-top: -1px;
          letter-spacing: 0.08em;
        }
        .logo-sub-subtitle {
          font-size: 0.65rem;
          font-weight: 500;
          color: #000000;
          letter-spacing: 0.05em;
          line-height: 1.1;
          margin-top: 1px;
        }

        .nav-links {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .nav-item-group {
          display: flex;
          align-items: center;
          background-color: transparent;
          border-radius: 30px;
          transition: background-color 0.2s ease;
        }

        .nav-link-text {
          font-size: 0.95rem;
          font-weight: 500;
          color: #1f2937;
          text-decoration: none;
          padding: 0.5rem 0.5rem 0.5rem 1rem;
          border-radius: 30px 0 0 30px;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .nav-link-text:hover {
          background-color: #eaecf0;
          color: #111827;
        }

        .nav-link-chevron {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 1rem 0.5rem 0.5rem;
          border-radius: 0 30px 30px 0;
          transition: background-color 0.2s ease, color 0.2s ease;
          color: #9ca3af;
        }

        .nav-link-chevron:hover {
          background-color: #eaecf0;
          color: #111827;
        }

        .nav-link-chevron.active {
          color: #1e3f35;
        }

        .nav-link-chevron :global(.chevron-icon) {
          transition: transform 0.3s ease;
        }

        .nav-link-chevron.active :global(.chevron-icon) {
          transform: rotate(180deg);
        }

        /* Megamenu layout styles */
        .megamenu-wrapper {
          order: 3; /* Sits between main-nav (2) and collapsible-content (4) */
          background-color: #f8fafc;
          border-radius: 24px;
          padding: 2rem;
          margin-top: 1rem;
          margin-bottom: 1rem;
          border: 1px solid rgba(0, 0, 0, 0.05);
          animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .megamenu-content,
        :global(.megamenu-content) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .megamenu-item,
        :global(.megamenu-item) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-decoration: none;
          color: #4b5563;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 1.25rem;
          border-radius: 16px;
          width: 220px;
          height: 100px;
          background-color: transparent;
          box-sizing: border-box;
        }

        .megamenu-item:hover,
        :global(.megamenu-item:hover) {
          color: #1e3f35;
          background-color: #ffffff;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
        }

        .megamenu-item-content,
        :global(.megamenu-item-content) {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          height: 100%;
          gap: 0.5rem;
        }

        .megamenu-icon,
        :global(.megamenu-icon) {
          color: #1e3f35;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .megamenu-item:hover .megamenu-icon,
        :global(.megamenu-item:hover .megamenu-icon) {
          transform: translateY(-2px);
        }

        .megamenu-text,
        :global(.megamenu-text) {
          font-size: 0.85rem;
          font-weight: 600;
          line-height: 1.3;
          text-align: left;
          color: #374151;
          transition: color 0.2s ease;
        }

        .megamenu-item:hover .megamenu-text,
        :global(.megamenu-item:hover .megamenu-text) {
          color: #1e3f35;
        }

        .megamenu-item-arrow,
        :global(.megamenu-item-arrow) {
          opacity: 0;
          transform: translateX(-5px);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          color: #1e3f35;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .megamenu-item:hover .megamenu-item-arrow,
        :global(.megamenu-item:hover .megamenu-item-arrow) {
          opacity: 1;
          transform: translateX(0);
        }

        .nav-icons {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .icon-btn {
          background: none;
          border: none;
          color: #1f2937;
          cursor: pointer;
          transition: transform 0.2s, color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }
        .icon-btn:hover {
          color: var(--primary-green);
          transform: scale(1.05);
        }

        /* Hero Content Styling */
        .hero-split {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 2.5rem;
          flex-wrap: wrap;
          width: 100%;
        }
        .hero-left {
          flex: 1 1 50%;
          min-width: 280px;
        }
        .hero-right {
          flex: 1 1 35%;
          min-width: 260px;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .hero-title {
          font-size: clamp(1.65rem, 3vw, 2.5rem);
          font-weight: 500;
          color: #111827;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin: 0;
        }
        .hero-desc {
          font-size: 0.95rem;
          color: #4b5563;
          line-height: 1.55;
          margin: 0;
        }
        
        .btn-green {
          background-color: #1e3f35;
          color: #ffffff;
          padding: 0.6rem 1.6rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
          border: none;
          box-shadow: none;
          text-align: center;
          align-self: flex-start;
        }
        .btn-green:hover {
          background-color: #122c1e;
          transform: translateY(-1px);
        }

        /* Mobile Drawer Styling */
        .mobile-menu-drawer {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-top: 2rem;
          height: calc(100% - 60px);
          overflow-y: auto;
          padding-bottom: 2rem;
          order: 4;
        }

        .mobile-nav-box {
          background-color: #f3f4f6;
          border-radius: 20px;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
        }

        .mobile-nav-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 1.5rem;
          font-size: 1.05rem;
          font-weight: 600;
          color: #1f2937;
          text-decoration: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
          transition: background-color 0.2s;
        }
        .mobile-nav-item:last-child {
          border-bottom: none;
        }
        .mobile-nav-item:hover {
          background-color: rgba(0, 0, 0, 0.02);
          border-radius: 12px;
        }
        .mobile-nav-item {
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          font-family: inherit;
        }

        .arrow-right {
          font-size: 1.2rem;
          color: #1e3f35;
        }

        .mobile-actions-wrapper {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .mobile-actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .mobile-action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #4b5563;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .mobile-lang-btn {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: none;
          border: none;
          color: #4b5563;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .mobile-divider {
          height: 1px;
          background-color: #e5e7eb;
          width: 100%;
        }

        .mobile-extra-links {
          display: flex;
          gap: 2rem;
        }
        .mobile-extra-links a {
          color: #6b7280;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .mobile-bottom-bar {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .mobile-logo-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #1e3f35;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-social-icons {
          display: flex;
          gap: 1.5rem;
        }
        .mobile-social-icons a {
          color: #6b7280;
          text-decoration: none;
          font-size: 1.05rem;
          font-weight: 600;
        }

        /* Mobile submenu panel */
        .mobile-submenu-panel {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .mobile-submenu-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 0.5rem;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 0.5rem;
        }

        .mobile-back-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          cursor: pointer;
          color: #1e3f35;
          transition: background-color 0.2s ease;
        }

        .mobile-back-btn:hover {
          background-color: #f3f4f6;
        }

        .mobile-submenu-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1f2937;
        }

        .mobile-submenu-list {
          display: flex;
          flex-direction: column;
        }

        .mobile-submenu-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.2rem 1.5rem;
          font-size: 1rem;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
          transition: background-color 0.2s ease;
        }

        .mobile-submenu-item:last-child {
          border-bottom: none;
        }

        .mobile-submenu-item:hover {
          background-color: #f9fafb;
          border-radius: 12px;
        }

        .mobile-submenu-item :global(svg) {
          color: #1e3f35;
          flex-shrink: 0;
        }

        /* Responsive adaptation */
        @media (max-width: 992px) {
          .header-wrapper {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0.75rem 1.25rem !important;
            border-radius: 0 0 16px 16px !important;
            max-height: 72px !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
            background-color: rgba(255, 255, 255, 0.98) !important;
            backdrop-filter: blur(12px) !important;
            z-index: 1000 !important;
            box-sizing: border-box !important;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          
          .header-collapsed {
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            padding: 0.75rem 1.25rem !important;
            border-radius: 0 0 16px 16px !important;
            max-height: 72px !important;
          }

          /* Hide old desktop collapsible hero content on mobile entirely */
          .collapsible-content {
            display: none !important;
          }

          /* Keep navbar always fixed and visible on mobile */
          .header-wrapper.navbar-hidden {
            transform: none !important;
            opacity: 1 !important;
            pointer-events: auto !important;
          }

          /* Menu Open State on Mobile: Clean Fullscreen Drawer */
          .header-wrapper.menu-open-active {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100% !important;
            height: 100dvh !important;
            max-height: 100dvh !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            padding: 0.75rem 1.25rem 2.5rem 1.25rem !important;
            overflow-y: auto !important;
            background-color: #ffffff !important;
            z-index: 1001 !important;
          }

          .menu-open-active .collapsible-content {
            display: none !important;
          }

          .hamburger-btn {
            display: flex !important;
          }

          .nav-links {
            display: none !important;
          }
          
          .nav-icons {
            gap: 1rem;
          }
          
          .utility-collapsible {
            display: none !important;
          }
          
          .hero-split {
            gap: 1.5rem;
          }
          
          .hero-right {
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .header-wrapper {
            padding: 0.65rem 0.9rem !important;
            border-radius: 0 0 12px 12px !important;
            max-height: 68px !important;
          }
          
          .header-collapsed {
            padding: 0.65rem 0.9rem !important;
            border-radius: 0 0 12px 12px !important;
            max-height: 68px !important;
          }

          .header-wrapper.menu-open-active {
            padding: 0.65rem 0.9rem 2.5rem 0.9rem !important;
          }

          .logo-title {
            font-size: 1rem !important;
          }

          .logo-subtitle {
            font-size: 0.65rem !important;
            margin-top: 0px !important;
          }

          .logo-sub-subtitle {
            font-size: 0.55rem !important;
          }

          .logo-img {
            height: 30px !important;
          }

          .logo-divider {
            height: 26px;
          }

          .kehati-logo-img {
            height: 30px;
          }

          .nav-left-group {
            gap: 0.5rem !important;
          }

          .logo {
            gap: 0.4rem !important;
          }

          .nav-icons {
            gap: 0.75rem !important;
          }

          .hamburger-btn {
            width: 38px !important;
            height: 38px !important;
            gap: 4px !important;
          }
          
          .hamburger-btn .line {
            width: 14px !important;
          }

          .icon-btn {
            padding: 2px !important;
          }

          .icon-btn :global(svg) {
            width: 18px !important;
            height: 18px !important;
          }
        }
      `}</style>
    </>
  );
}
