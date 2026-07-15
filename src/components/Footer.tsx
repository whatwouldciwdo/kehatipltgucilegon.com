'use client';

import React from 'react';
import { Leaf } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-green">
      <div className="container">
        {/* Upper Footer: Branding Message & Nav Links */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            marginBottom: '2rem'
          }}
          className="footer-grid-upper"
        >
          {/* Large Typographic Catchphrase */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 
              style={{
                fontSize: 'clamp(3.5rem, 6.5vw, 5.5rem)',
                fontWeight: 800,
                color: 'var(--text-light)',
                letterSpacing: '-0.04em',
                lineHeight: '0.9',
              }}
            >
              Stay green.
            </h2>
            <p style={{ color: 'var(--text-light-muted)', fontSize: '1.05rem', maxWidth: '400px', lineHeight: '1.5' }}>
              Membangkitkan energi listrik berkualitas tinggi dengan komitmen penuh menjaga kelestarian lingkungan dan keanekaragaman hayati demi generasi masa depan.
            </p>
          </div>

          {/* Links Section Grid */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2.5rem',
            }}
            className="footer-links-container"
          >
            {/* Column 1: Main Pages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="#" className="footer-link-primary">Tentang UBP Cilegon</a>
              <a href="#proper" className="footer-link-primary">Kinerja PROPER</a>
              <a href="#kehati" className="footer-link-primary">Keanekaragaman Hayati</a>
              <a href="#" className="footer-link-primary">Dokumentasi Kegiatan</a>
              <a href="#" className="footer-link-primary">Kebijakan Mutu & K3L</a>
              <a href="#" className="footer-link-primary">Pusat Informasi</a>
            </div>

            {/* Column 2: Secondary / Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="#" className="footer-link-secondary">Karir</a>
              <a href="#kontak" className="footer-link-secondary">Hubungi Kami</a>
              <a href="#" className="footer-link-secondary">Laporan Kinerja Lingkungan</a>
              <a href="#" className="footer-link-secondary">Pengaduan Masyarakat (WBS)</a>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div className="footer-divider" />

        {/* Lower Footer: Logo, Address, Policies, Socials, Copyright */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem',
            alignItems: 'flex-start',
            marginTop: '1.5rem',
          }}
          className="footer-grid-lower"
        >
          {/* Logo & Corporate Tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(250, 250, 250, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-lime)',
              }}
            >
              <Leaf size={18} strokeWidth={2.5} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-light)' }}>PLN INDONESIA POWER</span>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-light-muted)', letterSpacing: '0.05em' }}>UBP CILEGON</span>
            </div>
          </div>

          {/* Company Office Address */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Kantor Operasional
            </span>
            <p style={{ color: 'var(--text-light-muted)', fontSize: '0.875rem', lineHeight: '1.5', maxWidth: '350px' }}>
              PT PLN Indonesia Power UBP Cilegon<br />
              Jl. Raya Merak KM. 119, Suralaya, Pulomerak,<br />
              Kota Cilegon, Banten 42438, Indonesia.
            </p>
          </div>

          {/* Legal / Policy links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <a href="#" className="footer-policy-link">Kebijakan Privasi</a>
            <a href="#" className="footer-policy-link">Syarat & Ketentuan</a>
            <a href="#" className="footer-policy-link">Kepatuhan Regulasi</a>
            <a href="#" className="footer-policy-link">Sertifikasi ISO 14001</a>
          </div>
        </div>

        {/* Bottom Bar: Social Icons & Copyright */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem',
            marginTop: '3.5rem',
            borderTop: '1px solid rgba(250, 250, 250, 0.05)',
            paddingTop: '2rem',
          }}
          className="footer-bottom-bar"
        >
          {/* Social Icons (custom SVG matching Lucide stroke style) */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
                <polygon points="10 15 15 12 10 9"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>

          {/* Copyright text */}
          <div style={{ fontSize: '0.85rem', color: 'var(--text-light-muted)', textAlign: 'center' }}>
            © {currentYear} PT PLN Indonesia Power UBP Cilegon. All rights reserved.
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-link-primary {
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--text-light);
          letter-spacing: -0.02em;
          transition: var(--transition-fast);
        }
        .footer-link-primary:hover {
          color: var(--accent-lime);
          transform: translateX(4px);
        }
        
        .footer-link-secondary {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-light-muted);
          transition: var(--transition-fast);
        }
        .footer-link-secondary:hover {
          color: var(--text-light);
        }

        .footer-policy-link {
          color: var(--text-light-muted);
          transition: var(--transition-fast);
        }
        .footer-policy-link:hover {
          color: var(--text-light);
        }

        .social-icon {
          color: var(--text-light-muted);
          transition: var(--transition-fast);
        }
        .social-icon:hover {
          color: var(--text-light);
          transform: translateY(-2px);
        }

        @media (min-width: 768px) {
          .footer-grid-upper {
            grid-template-columns: 1.3fr 1fr !important;
            gap: 4rem !important;
          }
          .footer-grid-lower {
            grid-template-columns: 1fr 1fr 1fr !important;
            gap: 2rem !important;
          }
          .footer-bottom-bar {
            flex-direction: row !important;
            gap: 0 !important;
          }
        }
      `}</style>
    </footer>
  );
}
