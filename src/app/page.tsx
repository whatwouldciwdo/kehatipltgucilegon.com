'use strict';

import React from 'react';
import Header from '@/components/Header';
import ScrollRevealSection from '@/components/ScrollRevealSection';
import ProperProgram from '@/components/ProperProgram';
import KehatiInitiatives from '@/components/KehatiInitiatives';
import Footer from '@/components/Footer';
import { ArrowRight, Leaf, Eye, ShieldCheck, TreePine } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Header Navigation */}
      <Header />

      <main style={{ width: '100%' }}>
        
        {/* Section 1: Hero */}
        <section className="hero">
          {/* Subtle Eco-themed background design */}
          <div 
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: '60vw',
              height: '60vw',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(116, 198, 157, 0.15) 0%, rgba(250, 249, 246, 0) 70%)',
              zIndex: 1,
              pointerEvents: 'none'
            }}
          />
          <div 
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '-5%',
              width: '40vw',
              height: '40vw',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(45, 106, 79, 0.05) 0%, rgba(250, 249, 246, 0) 70%)',
              zIndex: 1,
              pointerEvents: 'none'
            }}
          />

          <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
            <div className="grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
              
              {/* Left Column: Headline and Pitch */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', alignSelf: 'flex-start' }}>
                  <span className="badge-eco" style={{ margin: 0 }}>
                    PT PLN Indonesia Power UBP Cilegon
                  </span>
                </div>
                
                <h1 
                  style={{
                    fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                    fontWeight: 800,
                    color: 'var(--bg-dark-green)',
                    letterSpacing: '-0.04em',
                    lineHeight: '1.1',
                  }}
                >
                  Energi Bersih,<br />
                  <span style={{ color: 'var(--primary-green)' }}>Lestari Negeriku.</span>
                </h1>
                
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Pembangkit Listrik Tenaga Gas dan Uap (PLTGU) Cilegon hadir sebagai pelopor energi andal ramah lingkungan. Kami bersinergi menjaga kelestarian keanekaragaman hayati dan menargetkan standar PROPER tertinggi.
                </p>
                
                <div 
                  style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '1rem', 
                    marginTop: '1rem' 
                  }}
                >
                  <a href="#proper" className="btn-green">
                    <span>Pelajari PROPER</span>
                    <ArrowRight size={18} />
                  </a>
                  <a href="#kehati" className="btn-outline">
                    <span>Inisiatif Kehati</span>
                  </a>
                </div>

                {/* Micro metrics highlight */}
                <div 
                  style={{ 
                    display: 'flex', 
                    gap: '2.5rem', 
                    marginTop: '2.5rem',
                    borderTop: '1px solid var(--border-light)',
                    paddingTop: '2rem'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--bg-dark-green)' }}>740 MW</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Kapasitas Listrik Bersih</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--bg-dark-green)' }}>PROPER Hijau</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Peringkat Kinerja KLHK</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--bg-dark-green)' }}>1.5 Hektar</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Kawasan Hutan Kehati</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Premium Floating Mockup/Card */}
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  position: 'relative'
                }}
              >
                {/* Visual card representing environmental metrics */}
                <div 
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid var(--border-light)',
                    borderRadius: '28px',
                    padding: '2.5rem',
                    boxShadow: '0 30px 60px rgba(18, 44, 30, 0.08)',
                    width: '100%',
                    maxWidth: '480px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <TreePine size={24} style={{ color: 'var(--primary-green)' }} />
                      <span style={{ fontWeight: 700, color: 'var(--bg-dark-green)' }}>Eco-Monitor UBP Cilegon</span>
                    </div>
                    <span 
                      style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: 700, 
                        color: '#2d6a4f', 
                        backgroundColor: '#d2e5d9', 
                        padding: '0.25rem 0.65rem',
                        borderRadius: '20px'
                      }}
                    >
                      Aktif
                    </span>
                  </div>

                  {/* Mock plant graphic / visual representation */}
                  <div 
                    style={{
                      height: '180px',
                      borderRadius: '18px',
                      background: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      padding: '2rem',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Abstract design elements */}
                    <div 
                      style={{
                        position: 'absolute',
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        top: '-20px',
                        right: '-20px',
                      }}
                    />
                    <Leaf size={48} style={{ color: 'var(--accent-lime)', opacity: 0.9, zIndex: 2 }} />
                    <span style={{ fontSize: '1.2rem', fontWeight: 700, zIndex: 2, letterSpacing: '-0.01em', textAlign: 'center' }}>
                      PLTGU Cilegon: Harmoni Energi
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', zIndex: 2, textAlign: 'center' }}>
                      Pembangkitan Ramah Lingkungan & Rendah Emisi
                    </span>
                  </div>

                  {/* Core Value points inside card */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <ShieldCheck size={20} style={{ color: 'var(--primary-green)', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Sertifikasi ISO 14001:2015 Pengelolaan Lingkungan</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <ShieldCheck size={20} style={{ color: 'var(--primary-green)', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Pemantauan Emisi Udara secara Real-time (CEMS)</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 2: Scroll-Driven expanding container covering PROPER program details */}
        <ScrollRevealSection>
          <ProperProgram />
        </ScrollRevealSection>

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
                    fontSize: '2.5rem',
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

              <div 
                style={{
                  backgroundColor: 'white',
                  borderRadius: '24px',
                  border: '1px solid var(--border-light)',
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                }}
              >
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
