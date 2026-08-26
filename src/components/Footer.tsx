'use client';

import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-green">
      <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Upper Footer: 4 Columns Layout */}
        <div className="footer-grid-upper">
          {/* Column 1: Brand Logo, Address, Contact, Socials */}
          <div className="footer-brand-col">
            <div className="footer-logo">
              <img src="/images/logo-pln.png" alt="PLN Logo" className="footer-logo-img" />
              <div className="footer-logo-text">
                <span className="logo-title">PLN</span>
                <span className="logo-subtitle">INDONESIA POWER</span>
                <span className="logo-sub-subtitle">UBP CILEGON</span>
              </div>
              <div className="footer-kehati-badge">
                <img
                  src="/images/logo-kehati-ubpclgv2.png"
                  alt="Kehati UBP Cilegon"
                  className="footer-kehati-logo"
                />
              </div>
            </div>
            
            <p className="footer-address">
              PT PLN Indonesia Power UBP Cilegon<br />
              Jl. Raya Merak KM. 119, Suralaya, Pulomerak,<br />
              Kota Cilegon, Banten 42438, Indonesia.
            </p>
            
            <div className="footer-contact">
              <span>Tel: +62 254 5750077</span>
              <span>Email: info@plnindonesiapower.co.id</span>
            </div>
            
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">f</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">ig</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">in</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">yt</a>
            </div>
          </div>

          {/* Column 2: PROPER Sublinks */}
          <div className="footer-nav-col">
            <h3>PROPER KLHK</h3>
            <a href="#proper">Laporan PROPER</a>
            <a href="#proper">Reduksi Emisi</a>
            <a href="#proper">Efisiensi Energi</a>
            <a href="#proper">Standard Hijau</a>
          </div>

          {/* Column 3: Kehati Sublinks */}
          <div className="footer-nav-col">
            <h3>Keanekaragaman Hayati</h3>
            <a href="#kehati">Restorasi Mangrove</a>
            <a href="#kehati">Taman Kehati</a>
            <a href="#kehati">Konservasi Flora</a>
            <a href="#kehati">Pemberdayaan</a>
          </div>

          {/* Column 4: Tentang Kami Sublinks */}
          <div className="footer-nav-col">
            <h3>Tentang Kami</h3>
            <a href="#tentang">Visi & Misi</a>
            <a href="#tentang">Profil UBP</a>
            <a href="#tentang">Hubungi Kami</a>
            <a href="#">Karir</a>
          </div>
        </div>

        {/* Horizontal Divider Line */}
        <div className="footer-divider" />

        {/* Lower Footer: Badges & Policy Links */}
        <div className="footer-lower-row">
          {/* Left: Badges */}
          <div className="footer-badges">
            <div className="badge-pill">PROPER EMAS</div>
            <div className="badge-pill">ISO 14001</div>
            <div className="badge-pill">ISO 9001</div>
          </div>

          {/* Right: Policy Horizontal Links */}
          <div className="footer-policy-links">
            <a href="#">Kebijakan Privasi</a>
            <a href="#">Syarat & Ketentuan</a>
            <a href="#">Sitemap</a>
            <a href="#">WBS</a>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="footer-copyright">
          © {currentYear} Sistem Informasi dan PROPER PLN Indonesia Power UBP Cilegon. All Rights Reserved.
        </div>
      </div>

      <style jsx>{`
        .footer-green {
          background-color: var(--bg-dark-green);
          color: var(--text-light);
          padding: 5rem 0 3rem 0;
          position: relative;
          overflow: hidden;
          border-radius: 40px 40px 0 0;
          margin: 0 70px;
          font-family: var(--font-outfit), system-ui, sans-serif;
        }

        .footer-grid-upper {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          flex-wrap: wrap;
        }

        .footer-logo-img {
          height: 36px;
          width: auto;
          object-fit: contain;
        }

        .footer-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .footer-kehati-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 0.4rem;
          padding: 0.45rem 0.6rem;
          border-radius: 12px;
          background-color: #ffffff;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.14);
        }

        .footer-kehati-logo {
          display: block;
          width: auto;
          height: 54px;
          object-fit: contain;
        }

        .logo-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #23aae1;
          letter-spacing: 0.15em;
        }

        .logo-subtitle {
          font-size: 0.7rem;
          font-weight: 500;
          color: #ffffff;
          letter-spacing: 0.08em;
          margin-top: -2px;
        }

        .logo-sub-subtitle {
          font-size: 0.6rem;
          font-weight: 500;
          color: var(--text-light-muted);
          letter-spacing: 0.05em;
          margin-top: 1px;
        }

        .footer-address {
          color: var(--text-light-muted);
          font-size: 0.85rem;
          line-height: 1.5;
          margin: 0;
        }

        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          font-size: 0.85rem;
          color: var(--text-light-muted);
        }

        .footer-socials {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-top: 0.5rem;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #e9d5ff; /* light lavender */
          color: #1e3f35; /* dark green */
          font-weight: bold;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }

        .social-icon:hover {
          background-color: #f3e8ff;
          transform: translateY(-2px);
        }

        .footer-nav-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-nav-col h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.01em;
        }

        .footer-nav-col a {
          color: var(--text-light-muted);
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .footer-nav-col a:hover {
          color: #ffffff;
          transform: translateX(2px);
        }

        .footer-divider {
          border-top: 1px solid rgba(250, 250, 250, 0.08);
          margin: 2.5rem 0;
        }

        .footer-lower-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 2rem;
          margin-bottom: 2.5rem;
        }

        .footer-badges {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .badge-pill {
          padding: 0.4rem 1rem;
          border-radius: 30px;
          border: 1px solid rgba(250, 250, 250, 0.15);
          font-size: 0.75rem;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.05em;
          background-color: rgba(250, 250, 250, 0.03);
        }

        .footer-policy-links {
          display: flex;
          gap: 2rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .footer-policy-links a {
          color: var(--text-light-muted);
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.2s ease;
        }

        .footer-policy-links a:hover {
          color: #ffffff;
        }

        .footer-copyright {
          font-size: 0.85rem;
          color: var(--text-light-muted);
          text-align: left;
          border-top: 1px solid rgba(250, 250, 250, 0.05);
          padding-top: 1.5rem;
        }

        @media (max-width: 992px) {
          .footer-green {
            margin: 0 20px;
            border-radius: 32px 32px 0 0;
            padding: 4rem 0 2rem 0;
          }
          .footer-grid-upper {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .footer-grid-upper {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .footer-lower-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
          .footer-policy-links {
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .footer-green {
            margin: 0 12px;
            border-radius: 24px 24px 0 0;
          }
          .footer-kehati-badge {
            margin-left: 0;
            padding: 0.4rem 0.5rem;
          }
          .footer-kehati-logo {
            height: 48px;
          }
        }
      `}</style>
    </footer>
  );
}
