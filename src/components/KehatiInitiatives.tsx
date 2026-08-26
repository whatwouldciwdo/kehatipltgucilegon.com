'use client';

import React from 'react';
import { Trees, Bird, Waves, ArrowUpRight } from 'lucide-react';

export default function KehatiInitiatives() {
  const initiatives = [
    {
      icon: <Trees size={32} style={{ color: 'var(--primary-green)' }} />,
      title: 'Taman Kehati & Flora Endemik',
      badge: 'Konservasi Flora',
      desc: 'Pengembangan kawasan hijau seluas 1.5 hektar untuk pelestarian pohon langka khas Banten seperti Kedawung, Merbau, dan buah lokal endemik guna mempertahankan plasma nutfah.',
      stats: '45+ Spesies Flora'
    },
    {
      icon: <Bird size={32} style={{ color: 'var(--primary-green)' }} />,
      title: 'Perlindungan Fauna & Burung Lokal',
      badge: 'Konservasi Fauna',
      desc: 'Pemantauan dan penyediaan habitat alami bagi burung lokal (Elang Bondol, Raja Udang) serta kupu-kupu di sekitar area pembangkit untuk memulihkan keseimbangan ekosistem.',
      stats: '28 Spesies Terdata'
    },
    {
      icon: <Waves size={32} style={{ color: 'var(--primary-green)' }} />,
      title: 'Restorasi Mangrove Pesisir Cilegon',
      badge: 'Ekosistem Pesisir',
      desc: 'Penanaman bibit mangrove secara berkala di pesisir Cilegon untuk mencegah abrasi pantai, menyerap karbon, serta menyediakan tempat pemijahan (nursery ground) biota laut.',
      stats: '12,000+ Mangrove Ditanam'
    }
  ];

  return (
    <section 
      id="kehati" 
      style={{
        padding: '7rem 0 9rem 0',
        backgroundColor: '#f3f1eb',
        width: '100%',
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem' }}>
        {/* Header Block */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '750px',
            margin: '0 auto',
            gap: '1rem',
          }}
        >
          <div className="badge-eco" style={{ backgroundColor: 'rgba(18, 44, 30, 0.06)' }}>Keanekaragaman Hayati</div>
          <h2 
            style={{
              fontSize: 'clamp(1.8rem, 6.5vw, 2.8rem)',
              color: 'var(--bg-dark-green)',
              letterSpacing: '-0.03em',
            }}
          >
            Menjaga Harmoni Alam Melalui Inisiatif Kehati
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', marginTop: '0.5rem' }}>
            Sebagai bagian dari pilar lingkungan PROPER, kami aktif memimpin program pelestarian keanekaragaman hayati flora dan fauna di daratan maupun pesisir pantai PLTGU Cilegon.
          </p>
        </div>

        {/* Initiatives Cards Grid */}
        <div className="grid-3">
          {initiatives.map((item, idx) => (
            <div key={idx} className="card-kehati">
              {/* Card Icon & Badge */}
              <div 
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '2rem'
                }}
              >
                <div 
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(45, 106, 79, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </div>
                <span 
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--primary-green)',
                    backgroundColor: 'rgba(45, 106, 79, 0.06)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '20px',
                  }}
                >
                  {item.badge}
                </span>
              </div>

              {/* Card Content */}
              <h3 
                style={{
                  fontSize: '1.4rem',
                  color: 'var(--bg-dark-green)',
                  marginBottom: '1rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {item.title}
              </h3>
              
              <p 
                style={{
                  fontSize: '0.975rem',
                  color: 'var(--text-muted)',
                  lineHeight: '1.6',
                  flexGrow: 1,
                  marginBottom: '2rem',
                }}
              >
                {item.desc}
              </p>

              {/* Card Footer Info */}
              <div 
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid var(--border-light)',
                  paddingTop: '1.25rem',
                  marginTop: 'auto',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>PENCAPAIAN</span>
                  <span style={{ fontSize: '1.05rem', color: 'var(--bg-dark-green)', fontWeight: 700 }}>{item.stats}</span>
                </div>
                
                <a 
                  href="#tentang" 
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1.5px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--bg-dark-green)',
                    transition: 'var(--transition-fast)',
                  }}
                  className="arrow-link"
                >
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .card-kehati:hover .arrow-link {
          background-color: var(--bg-dark-green);
          color: white;
          border-color: var(--bg-dark-green);
          transform: rotate(45deg);
        }
      `}</style>
    </section>
  );
}
