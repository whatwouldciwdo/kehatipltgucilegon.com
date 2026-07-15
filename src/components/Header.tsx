'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Leaf, Search, Heart, User, Globe, ChevronDown, FileText, Wind, Award, Compass, Trees, Users, Activity, HelpCircle, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';

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
  const [showUtility, setShowUtility] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
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
      if (y > threshold) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }

      // Stage 3: Hide navbar completely when scrolled close to the footer
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      if (y + clientHeight >= scrollHeight - 400) {
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
      gsap.fromTo(headerRef.current,
        { y: -200, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 6.0 }
      );
    }
  }, []);

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
        className={`header-wrapper ${isCollapsed ? 'header-collapsed' : ''} ${isMenuOpen ? 'menu-open-active' : ''} ${activeDropdown ? 'has-dropdown-open' : ''} ${isNavbarHidden ? 'navbar-hidden' : ''} ${isCollapsed && showUtility ? 'utility-visible' : ''}`}
      >
        {/* Top Navigation Bar containing Hamburger, Logo, Links, and Icons */}
        <div className="main-nav">
          {/* Left Group: Hamburger + Logo */}
          <div className="nav-left-group">
            <button 
              className={`hamburger-btn ${isMenuOpen ? 'open' : ''} ${isCollapsed ? 'scrolled' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className="line line-1"></span>
              <span className="line line-2"></span>
            </button>

            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleLinkClick('#'); }}
              className="logo"
            >
              <img src="/images/logo-pln.png" alt="PLN Logo" className="logo-img" />
              <div className="logo-text">
                <span className="logo-title">PLN</span>
                <span className="logo-subtitle">INDONESIA POWER</span>
                <span className="logo-sub-subtitle">UBP CILEGON</span>
              </div>
            </a>
          </div>

          {/* Links (Hidden on Mobile) */}
          <nav className="nav-links">
            <div className="nav-item-group">
              <a 
                href="#proper" 
                onClick={(e) => { e.preventDefault(); handleLinkClick('#proper'); }} 
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
                href="#kehati" 
                onClick={(e) => { e.preventDefault(); handleLinkClick('#kehati'); }} 
                className="nav-link-text"
              >
                Keanekaragaman Hayati
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
                href="#tentang" 
                onClick={(e) => { e.preventDefault(); handleLinkClick('#tentang'); }} 
                className="nav-link-text"
              >
                Tentang Kami
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
              <a href="#proper" onClick={(e) => { e.preventDefault(); handleLinkClick('#proper'); }}>Laporan Tahunan</a>
              <a href="#kontak" onClick={(e) => { e.preventDefault(); handleLinkClick('#kontak'); }}>Kontak UBP</a>
            </div>
            <span className="divider">|</span>
            <div className="socials">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">ig</a>
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="YouTube">yt</a>
            </div>
            <span className="divider">|</span>
            <a href="#masuk" className="utility-action">
              <User size={14} />
              <span>Masuk</span>
            </a>
            <span className="divider">|</span>
            <button className="lang-btn">
              <Globe size={14} />
              <span>ID</span>
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
                <a href="#kehati" onClick={(e) => { e.preventDefault(); handleLinkClick('#kehati'); setActiveDropdown(null); }} className="megamenu-item">
                  <div className="megamenu-item-content">
                    <div className="megamenu-icon">
                      <Compass size={20} />
                    </div>
                    <span className="megamenu-text">Restorasi Mangrove</span>
                  </div>
                  <div className="megamenu-item-arrow">
                    <ArrowRight size={16} />
                  </div>
                </a>
                <a href="#kehati" onClick={(e) => { e.preventDefault(); handleLinkClick('#kehati'); setActiveDropdown(null); }} className="megamenu-item">
                  <div className="megamenu-item-content">
                    <div className="megamenu-icon">
                      <Trees size={20} />
                    </div>
                    <span className="megamenu-text">Taman Kehati</span>
                  </div>
                  <div className="megamenu-item-arrow">
                    <ArrowRight size={16} />
                  </div>
                </a>
                <a href="#kehati" onClick={(e) => { e.preventDefault(); handleLinkClick('#kehati'); setActiveDropdown(null); }} className="megamenu-item">
                  <div className="megamenu-item-content">
                    <div className="megamenu-icon">
                      <Leaf size={20} />
                    </div>
                    <span className="megamenu-text">Konservasi Flora</span>
                  </div>
                  <div className="megamenu-item-arrow">
                    <ArrowRight size={16} />
                  </div>
                </a>
                <a href="#kehati" onClick={(e) => { e.preventDefault(); handleLinkClick('#kehati'); setActiveDropdown(null); }} className="megamenu-item">
                  <div className="megamenu-item-content">
                    <div className="megamenu-icon">
                      <Users size={20} />
                    </div>
                    <span className="megamenu-text">Pemberdayaan</span>
                  </div>
                  <div className="megamenu-item-arrow">
                    <ArrowRight size={16} />
                  </div>
                </a>
              </div>
            )}

            {activeDropdown === 'tentang' && (
              <div className="megamenu-content">
                <a href="#tentang" onClick={(e) => { e.preventDefault(); handleLinkClick('#tentang'); setActiveDropdown(null); }} className="megamenu-item">
                  <div className="megamenu-item-content">
                    <div className="megamenu-icon">
                      <Award size={20} />
                    </div>
                    <span className="megamenu-text">Visi & Misi</span>
                  </div>
                  <div className="megamenu-item-arrow">
                    <ArrowRight size={16} />
                  </div>
                </a>
                <a href="#tentang" onClick={(e) => { e.preventDefault(); handleLinkClick('#tentang'); setActiveDropdown(null); }} className="megamenu-item">
                  <div className="megamenu-item-content">
                    <div className="megamenu-icon">
                      <Compass size={20} />
                    </div>
                    <span className="megamenu-text">Profil UBP</span>
                  </div>
                  <div className="megamenu-item-arrow">
                    <ArrowRight size={16} />
                  </div>
                </a>
                <a href="#tentang" onClick={(e) => { e.preventDefault(); handleLinkClick('#tentang'); setActiveDropdown(null); }} className="megamenu-item">
                  <div className="megamenu-item-content">
                    <div className="megamenu-icon">
                      <HelpCircle size={20} />
                    </div>
                    <span className="megamenu-text">Hubungi Kami</span>
                  </div>
                  <div className="megamenu-item-arrow">
                    <ArrowRight size={16} />
                  </div>
                </a>
              </div>
            )}
          </div>
        )}

        {/* Desktop Hero Main Content (Collapsible at Stage 2) */}
        <div className="collapsible-content" style={{ marginTop: isCollapsed ? '0' : '3.5rem' }}>
          <div className="hero-split">
            {/* Left Column: Big Headline */}
            <div className="hero-left">
              <h1 className="hero-title">
                Energi Bersih,<br />
                Lestari Negeriku.
              </h1>
            </div>

            {/* Right Column: Description & Action */}
            <div className="hero-right">
              <p className="hero-desc">
                Pembangkit Listrik Tenaga Gas dan Uap (PLTGU) Cilegon hadir sebagai pelopor energi andal ramah lingkungan, bersinergi menjaga kelestarian keanekaragaman hayati menuju masa depan hijau.
              </p>
              <a href="#proper" className="btn-green">
                Pelajari PROPER
              </a>
            </div>
          </div>
        </div>

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
                    <span>Keanekaragaman Hayati</span>
                    <span className="arrow-right">→</span>
                  </button>
                  <button onClick={() => setMobileSubmenu('tentang')} className="mobile-nav-item">
                    <span>Tentang Kami</span>
                    <span className="arrow-right">→</span>
                  </button>
                </div>

                {/* Actions, Extras and Socials */}
                <div className="mobile-actions-wrapper">
                  <div className="mobile-actions-row">
                    <a href="#masuk" onClick={() => setIsMenuOpen(false)} className="mobile-action-btn">
                      <User size={16} />
                      <span>Masuk</span>
                    </a>
                    <button className="mobile-lang-btn">
                      <Globe size={16} />
                      <span>ID</span>
                      <ChevronDown size={14} />
                    </button>
                  </div>

                  <div className="mobile-divider"></div>

                  <div className="mobile-extra-links">
                    <a href="#proper" onClick={() => setIsMenuOpen(false)}>Laporan Tahunan</a>
                    <a href="#kontak" onClick={() => setIsMenuOpen(false)}>Kontak UBP</a>
                  </div>

                  <div className="mobile-bottom-bar">
                    <div className="mobile-logo-circle">
                      <Leaf size={18} style={{ color: '#ffffff' }} />
                    </div>
                    <div className="mobile-social-icons">
                      <a href="#" aria-label="Facebook">f</a>
                      <a href="#" aria-label="Instagram">ig</a>
                      <a href="#" aria-label="LinkedIn">in</a>
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
                      <a href="#kehati" onClick={(e) => { e.preventDefault(); handleLinkClick('#kehati'); setIsMenuOpen(false); setMobileSubmenu(null); }} className="mobile-submenu-item">
                        <Compass size={18} />
                        <span>Restorasi Mangrove</span>
                      </a>
                      <a href="#kehati" onClick={(e) => { e.preventDefault(); handleLinkClick('#kehati'); setIsMenuOpen(false); setMobileSubmenu(null); }} className="mobile-submenu-item">
                        <Trees size={18} />
                        <span>Taman Kehati</span>
                      </a>
                      <a href="#kehati" onClick={(e) => { e.preventDefault(); handleLinkClick('#kehati'); setIsMenuOpen(false); setMobileSubmenu(null); }} className="mobile-submenu-item">
                        <Leaf size={18} />
                        <span>Konservasi Flora</span>
                      </a>
                      <a href="#kehati" onClick={(e) => { e.preventDefault(); handleLinkClick('#kehati'); setIsMenuOpen(false); setMobileSubmenu(null); }} className="mobile-submenu-item">
                        <Users size={18} />
                        <span>Pemberdayaan</span>
                      </a>
                    </>
                  )}
                  {mobileSubmenu === 'tentang' && (
                    <>
                      <a href="#tentang" onClick={(e) => { e.preventDefault(); handleLinkClick('#tentang'); setIsMenuOpen(false); setMobileSubmenu(null); }} className="mobile-submenu-item">
                        <Award size={18} />
                        <span>Visi & Misi</span>
                      </a>
                      <a href="#tentang" onClick={(e) => { e.preventDefault(); handleLinkClick('#tentang'); setIsMenuOpen(false); setMobileSubmenu(null); }} className="mobile-submenu-item">
                        <Compass size={18} />
                        <span>Profil UBP</span>
                      </a>
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
          border-radius: 0 0 40px 40px;
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.08);
          z-index: 100;
          opacity: 0;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          box-sizing: border-box;
          padding: 2.5rem 3.5rem;
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
          max-height: 500px;
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

        .logo {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          text-decoration: none;
        }
        .logo-img {
          height: 40px;
          width: auto;
          object-fit: contain;
        }
        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
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
          margin-top: -4px;
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

        .megamenu-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .megamenu-item {
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

        .megamenu-item:hover {
          color: #1e3f35;
          background-color: #ffffff;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
        }

        .megamenu-item-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          height: 100%;
          gap: 0.5rem;
        }

        .megamenu-icon {
          color: #1e3f35;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .megamenu-item:hover .megamenu-icon {
          transform: translateY(-2px);
        }

        .megamenu-text {
          font-size: 0.85rem;
          font-weight: 600;
          line-height: 1.3;
          text-align: left;
          color: #374151;
          transition: color 0.2s ease;
        }

        .megamenu-item:hover .megamenu-text {
          color: #1e3f35;
        }

        .megamenu-item-arrow {
          opacity: 0;
          transform: translateX(-5px);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          color: #1e3f35;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .megamenu-item:hover .megamenu-item-arrow {
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
          gap: 4rem;
          flex-wrap: wrap;
          width: 100%;
        }
        .hero-left {
          flex: 1 1 50%;
          min-width: 320px;
        }
        .hero-right {
          flex: 1 1 35%;
          min-width: 280px;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .hero-title {
          font-size: clamp(2.2rem, 5vw, 4.2rem);
          font-weight: 500;
          color: #111827;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin: 0;
        }
        .hero-desc {
          font-size: 1.05rem;
          color: #4b5563;
          line-height: 1.6;
          margin: 0;
        }
        
        .btn-green {
          background-color: #1e3f35;
          color: #ffffff;
          padding: 0.75rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.95rem;
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
            top: 0;
            left: 20px;
            right: 20px;
            padding: 1.5rem;
            border-radius: 0 0 32px 32px;
            max-height: 900px;
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          .header-collapsed {
            top: 0;
            left: 20px;
            right: 20px;
            padding: 0.75rem 1.25rem;
            border-radius: 0 0 20px 20px;
            max-height: none;
          }

          /* Menu Open State on Mobile */
          .header-wrapper.menu-open-active {
            height: calc(100vh - 20px) !important;
            max-height: calc(100vh - 20px) !important;
            border-radius: 0 0 32px 32px !important;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15) !important;
          }

          .menu-open-active .collapsible-content {
            display: none !important;
          }

          .hamburger-btn {
            display: flex;
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
            left: 12px;
            right: 12px;
            padding: 1rem;
            border-radius: 0 0 24px 24px;
          }
          
          .header-collapsed {
            left: 12px;
            right: 12px;
            padding: 0.6rem 0.8rem;
            border-radius: 0 0 16px 16px;
            max-height: none;
          }

          .header-wrapper.menu-open-active {
            left: 12px !important;
            right: 12px !important;
            height: calc(100vh - 24px) !important;
            max-height: calc(100vh - 24px) !important;
            border-radius: 0 0 24px 24px !important;
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
