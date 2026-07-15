'use client';

import React from 'react';
import Header from '@/components/Header';

import KehatiInitiatives from '@/components/KehatiInitiatives';
import Footer from '@/components/Footer';
import IntroAnimation from '@/components/IntroAnimation';

export default function Home() {
  return (
    <>
      {/* Header Navigation */}
      <Header />

      <main style={{ width: '100%', overflowX: 'hidden' }}>
        <IntroAnimation />
        
        {/* Section 1: Hero */}
        <section className="hero" style={{ minHeight: '100vh', position: 'relative' }}>
          {/* Background image matching the preloader center image */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/img/3.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 1,
            }}
          />
        </section>

        {/* Section 1.5: Metrics Section (Clean, separate section below the hero fold) */}
        <section style={{ backgroundColor: '#ffffff', padding: '4rem 0', borderBottom: '1px solid var(--border-light)', position: 'relative', zIndex: 10 }}>
          <div className="container">
            <div className="metrics-container">
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--bg-dark-green)', lineHeight: 1.1 }}>740 MW</div>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.5rem' }}>Kapasitas Listrik Bersih</div>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--bg-dark-green)', lineHeight: 1.1 }}>PROPER Hijau</div>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.5rem' }}>Peringkat Kinerja KLHK</div>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--bg-dark-green)', lineHeight: 1.1 }}>1.5 Hektar</div>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.5rem' }}>Kawasan Hutan Kehati</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Kehati Conservation initiatives */}
        <KehatiInitiatives />

        {/* Section 4: About UBP Cilegon (Environmental Policy) */}
        <section 
          id="tentang" 
          style={{ 
            padding: '7rem 0',
            backgroundColor: 'var(--bg-cream)',
            borderTop: '1px solid var(--border-light)',
            width: '100%',
          }}
        >
          <div className="container">
            <div className="grid-2" style={{ gap: '4rem', alignItems: 'center' }}>
              <div>
                <h2 
                  style={{
                    fontSize: 'clamp(1.7rem, 6vw, 2.5rem)',
                    color: 'var(--bg-dark-green)',
                    letterSpacing: '-0.03em',
                    marginBottom: '1.5rem',
                  }}
                >
                  Mewujudkan Pembangkit Listrik Berkelanjutan
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.7' }}>
                  PT PLN Indonesia Power Unit Bisnis Pembangkitan (UBP) Cilegon meyakini bahwa penyediaan energi listrik tidak boleh mengorbankan masa depan ekosistem bumi. Terletak di tepi perairan Selat Sunda, Cilegon, kami mengoperasikan pembangkit listrik tenaga gas uap modern dengan tingkat efisiensi termal tinggi.
                </p>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                  Melalui sistem manajemen lingkungan terintegrasi, pemantauan ketat kualitas air limbah dan emisi gas buang, serta inisiatif konservasi keanekaragaman hayati, kami berkomitmen untuk melampaui standar kepatuhan regulasi lingkungan di Indonesia demi kelestarian alam bersama.
                </p>
              </div>

              <div className="policy-card">
                <h3 style={{ fontSize: '1.4rem', color: 'var(--bg-dark-green)' }}>
                  Kebijakan Lingkungan & Keberlanjutan
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary-green)', marginTop: '8px', flexShrink: 0 }} />
                    <p style={{ fontSize: '0.95rem', margin: 0 }}>
                      Menerapkan prinsip sirkular ekonomi dalam pengelolaan limbah operasional pembangkit.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary-green)', marginTop: '8px', flexShrink: 0 }} />
                    <p style={{ fontSize: '0.95rem', margin: 0 }}>
                      Mengurangi emisi GRK (Gas Rumah Kaca) secara progresif melalui optimasi operasional unit.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary-green)', marginTop: '8px', flexShrink: 0 }} />
                    <p style={{ fontSize: '0.95rem', margin: 0 }}>
                      Melindungi flora dan fauna pesisir Selat Sunda melalui pemberdayaan masyarakat dan mitigasi dampak lingkungan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Matching Image 3 layout */}
      <Footer />
    </>
  );
}
