'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Leaf } from 'lucide-react';
import gsap from 'gsap';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);
  const curvePathRef = useRef<SVGPathElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [currentHref, setCurrentHref] = useState('#');

  // Track scroll position to adjust header opacity/size
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // SVG Bezier Curve calculations based on viewport height
  const getInitialPath = (h: number) =>
    `M100 0 L200 0 L200 ${h} L100 ${h} Q-100 ${h / 2} 100 0`;

  const getTargetPath = (h: number) =>
    `M100 0 L200 0 L200 ${h} L100 ${h} Q100 ${h / 2} 100 0`;

  // Initialize GSAP menu timeline
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const OFFSCREEN = 480 + 100;
    const h = window.innerHeight;

    // Set initial closed curve path
    if (curvePathRef.current) {
      curvePathRef.current.setAttribute('d', getInitialPath(h));
    }

    // Main GSAP slide-in & morph timeline
    const tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.8, ease: 'power3.inOut' },
    });

    tl
      // 1. Slide panel in from right
      .fromTo(menuRef.current,
        { x: OFFSCREEN },
        { x: 0 },
        0
      )
      // 2. Morph path from bowed inward to flat
      .fromTo(curvePathRef.current,
        { attr: { d: getInitialPath(h) } },
        { attr: { d: getTargetPath(h) }, duration: 1 },
        0
      )
      // 3. Stagger-fade links in from the right
      .fromTo(linksRef.current,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.05 },
        0
      );

    timelineRef.current = tl;

    // Window resize handler to maintain SVG path heights
    const handleResize = () => {
      const freshH = window.innerHeight;
      const progress = tl.progress();
      const isReversing = tl.reversed();
      const openState = progress > 0 && !isReversing;
      
      if (curvePathRef.current) {
        curvePathRef.current.setAttribute('d', openState ? getTargetPath(freshH) : getInitialPath(freshH));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    const tl = timelineRef.current;
    if (!tl) return;

    if (!isOpen) {
      setIsOpen(true);
      burgerRef.current?.classList.add('header__burger--active');
      tl.play();
      setIndicator(currentHref);
    } else {
      setIsOpen(false);
      burgerRef.current?.classList.remove('header__burger--active');
      gsap.to('.menu__indicator', { scale: 0, duration: 0.3 });
      tl.reverse();
    }
  };

  const setIndicator = (href: string) => {
    linksRef.current.forEach(link => {
      if (!link) return;
      const dot = link.querySelector('.menu__indicator');
      const dataHref = link.getAttribute('data-href');
      gsap.to(dot, {
        scale: dataHref === href ? 1 : 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  };

  const handleLinkClick = (href: string) => {
    setCurrentHref(href);
    setIsOpen(false);
    burgerRef.current?.classList.remove('header__burger--active');
    gsap.to('.menu__indicator', { scale: 0, duration: 0.3 });
    timelineRef.current?.reverse();
    
    // Smooth scroll to the target ID
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems = [
    { label: 'Beranda', href: '#' },
    { label: 'PROPER KLHK', href: '#proper' },
    { label: 'Keanekaragaman Hayati', href: '#kehati' },
    { label: 'Tentang Pembangkit', href: '#tentang' },
  ];

  return (
    <>
      {/* Floating Navbar Container */}
      <div 
        className={`nav-container ${isScrolled ? 'scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 40px)',
          maxWidth: '1100px',
          height: '76px',
          backgroundColor: '#faf9f6', // Light warm cream background matching mockups
          borderRadius: '24px',
          border: '1px solid var(--border-light)',
          boxShadow: isScrolled ? '0 12px 30px rgba(18, 44, 30, 0.08)' : '0 8px 20px rgba(18, 44, 30, 0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
          zIndex: 90,
          transition: 'var(--transition-smooth)',
        }}
      >
        {/* Left Side Links */}
        <div style={{ display: 'flex', gap: '2rem', flex: 1 }} className="nav-items-left">
          <a href="#" onClick={() => handleLinkClick('#')} className="nav-bar-link">Beranda</a>
          <a href="#proper" onClick={() => handleLinkClick('#proper')} className="nav-bar-link">PROPER</a>
          <a href="#kehati" onClick={() => handleLinkClick('#kehati')} className="nav-bar-link">Kehati</a>
        </div>

        {/* Center Logo */}
        <a 
          href="#" 
          onClick={() => handleLinkClick('#')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            color: 'var(--bg-dark-green)',
            textDecoration: 'none',
          }}
        >
          <Leaf size={24} style={{ color: 'var(--primary-green)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, letterSpacing: '-0.02em' }}>PLN IP</span>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--primary-green)' }}>UBP CILEGON</span>
          </div>
        </a>

        {/* Right Side Links */}
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'flex-end', flex: 1 }} className="nav-items-right">
          <a href="#tentang" onClick={() => handleLinkClick('#tentang')} className="nav-bar-link">Tentang Kami</a>
          <a href="#proper" onClick={() => handleLinkClick('#proper')} className="nav-bar-link">Laporan</a>
          <a href="#kontak" onClick={() => handleLinkClick('#kontak')} className="nav-bar-link">Kontak</a>
        </div>
      </div>

      {/* Circular Menu Toggle Button floating in top right */}
      <header className="header">
        <div className="header__button" onClick={toggleMenu} style={{ backgroundColor: 'var(--bg-dark-green)' }}>
          <div className="header__burger" ref={burgerRef}></div>
        </div>
      </header>

      {/* Slide-In Curved Menu (Ported from Downloads/navmenu) */}
      <div 
        className="menu" 
        ref={menuRef} 
        style={{ 
          display: 'block', 
          transform: 'translateX(580px)',
        }}
      >
        <div className="menu__body">
          {/* Navigation Links */}
          <nav className="menu__nav" ref={navRef} onMouseLeave={() => setIndicator(currentHref)}>
            <div className="menu__header">
              <p>Navigasi Pilihan</p>
            </div>

            {menuItems.map((item, idx) => (
              <div
                key={idx}
                className="menu__link"
                data-href={item.href}
                ref={(el) => { if (el) linksRef.current[idx] = el; }}
                onMouseEnter={() => setIndicator(item.href)}
                onClick={() => handleLinkClick(item.href)}
              >
                <div className="menu__indicator"></div>
                <a href={item.href} onClick={(e) => e.preventDefault()}>
                  {item.label}
                </a>
              </div>
            ))}
          </nav>

          {/* Social Links Footer */}
          <div className="menu__footer">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>

        {/* Dynamic Curved Edge SVG */}
        <svg className="menu__curve">
          <path ref={curvePathRef} fill="rgb(41, 41, 41)"></path>
        </svg>
      </div>

      <style jsx>{`
        /* Navigation Bar items hover animations */
        .nav-bar-link {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-muted);
          transition: var(--transition-fast);
        }
        .nav-bar-link:hover {
          color: var(--bg-dark-green);
        }

        /* Floating header circular toggle button styling */
        .header {
          padding: 20px;
          position: fixed;
          right: 20px;
          top: 18px;
          z-index: 110;
        }
        .header__button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 25px rgba(18, 44, 30, 0.15);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .header__button:hover {
          transform: scale(1.08);
        }
        .header__burger {
          width: 100%;
          position: relative;
          pointer-events: none;
        }
        .header__burger::after,
        .header__burger::before {
          content: "";
          display: block;
          height: 2px;
          width: 22px;
          margin: auto;
          background-color: #fff;
          position: relative;
          transition: transform 0.3s, top 0.3s;
        }
        .header__burger::after  { top: -4px; }
        .header__burger::before { top: 4px;  }

        :global(.header__burger--active)::after {
          transform: rotate(45deg);
          top: -1px;
        }
        :global(.header__burger--active)::before {
          transform: rotate(-45deg);
          top: 1px;
        }

        /* Slide-In Curved Menu Panel Styling */
        .menu {
          height: 100vh;
          width: 480px;
          background-color: rgb(41, 41, 41);
          position: fixed;
          right: 0;
          top: 0;
          color: #fff;
          z-index: 100;
          box-shadow: -10px 0 40px rgba(0, 0, 0, 0.25);
        }
        .menu__body {
          height: 100%;
          padding: 100px 70px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .menu__nav {
          display: flex;
          flex-direction: column;
          font-size: 2.8rem;
          gap: 16px;
          margin-top: 40px;
        }
        .menu__header {
          color: rgb(153, 153, 153);
          border-bottom: 1px solid rgba(153, 153, 153, 0.2);
          text-transform: uppercase;
          font-size: 11px;
          margin-bottom: 30px;
        }
        .menu__header p {
          padding-bottom: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
        }
        .menu__link {
          position: relative;
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .menu__link a {
          text-decoration: none;
          color: #fff;
          font-weight: 300;
          transition: color 0.2s ease;
        }
        .menu__link:hover a {
          color: var(--light-green);
        }
        .menu__indicator {
          width: 8px;
          height: 8px;
          background-color: var(--light-green);
          border-radius: 50%;
          position: absolute;
          left: -24px;
          transform: scale(0);
        }
        .menu__footer {
          display: flex;
          width: 100%;
          justify-content: space-between;
          font-size: 13px;
          gap: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 20px;
        }
        .menu__footer a {
          color: rgb(180, 180, 180);
          text-decoration: none;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .menu__footer a:hover {
          color: #fff;
        }
        .menu__curve {
          position: absolute;
          top: 0;
          left: -99px;
          width: 100px;
          height: 100%;
          fill: rgb(41, 41, 41);
          stroke: none;
        }

        /* Mobile adaptation */
        @media (max-width: 768px) {
          .nav-items-left, .nav-items-right {
            display: none !important;
          }
          .nav-container {
            justify-content: center !important;
            padding: 0 1rem !important;
            width: calc(100% - 120px) !important;
            left: 20px !important;
            transform: none !important;
          }
          .menu {
            width: 100% !important;
          }
        }
      `}</style>
    </>
  );
}
