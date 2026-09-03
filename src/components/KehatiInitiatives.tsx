'use client';

import React from 'react';
import Link from 'next/link';
import { Trees, Bird, Waves, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function KehatiInitiatives() {
  const { t } = useLanguage();

  const initiatives = [
    {
      icon: <Trees size={32} style={{ color: 'var(--primary-green)' }} />,
      title: t('Taman Kehati & Flora Konservasi', 'Kehati Park & Flora Conservation'),
      badge: t('Konservasi Flora', 'Flora Conservation'),
      desc: t(
        'Pengembangan kawasan hijau seluas 17.7 hektar (Ring 1) untuk pelestarian pohon langka dan endemik seperti Angsana, Mahoni, Pohon Pelangi, Palem Botol, serta sistem C-Flora IoT.',
        'Developing a 17.7-hectare green conservation zone (Ring 1) preserving rare and endemic trees including Angsana, Mahogany, Rainbow Eucalyptus, Bottle Palm, and C-Flora IoT.'
      ),
      stats: t('137 Spesies (23.670 Batang)', '137 Species (23,670 Stems)'),
      href: '/laporan/2026#flora'
    },
    {
      icon: <Bird size={32} style={{ color: 'var(--primary-green)' }} />,
      title: t('Perlindungan Fauna & Biowing Connect', 'Fauna Protection & Biowing Connect'),
      badge: t('Konservasi Fauna', 'Fauna Conservation'),
      desc: t(
        'Pemantauan 52 jenis fauna dan 1.122 individu aves via sistem Biowing Connect yang memanfaatkan burung sebagai penyebar benih alami regenerasi keanekaragaman hayati.',
        'Monitoring 52 fauna species and 1,122 birds via Biowing Connect system utilizing avian natural seed dispersal for ecosystem regeneration.'
      ),
      stats: t('52 Jenis (1.268 Individu)', '52 Species (1,268 Fauna)'),
      href: '/laporan/2026#fauna'
    },
    {
      icon: <Waves size={32} style={{ color: 'var(--primary-green)' }} />,
      title: t('Restorasi Mangrove Pesisir Serang', 'Coastal Mangrove Restoration Serang'),
      badge: t('Ekosistem Pesisir', 'Coastal Ecosystem'),
      desc: t(
        'Penanaman kumulatif 19.000 bibit mangrove Rhizophora apiculata di pesisir kritis Desa Lontar, Kec. Tirtayasa bekerjasama dengan DLH Kab. Serang dan KTH Segara Biru.',
        'Cumulative planting of 19,000 Rhizophora apiculata mangrove seedlings in critical coastlines of Lontar Village, partnering with Serang Environmental Agency.'
      ),
      stats: t('19.000 Pohon (0,45 Ha)', '19,000 Mangroves (0.45 Ha)'),
      href: '/laporan/2026#program-mangrove'
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
                
                <Link 
                  href={item.href} 
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
                  aria-label={item.title}
                >
                  <ArrowUpRight size={18} />
                </Link>
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
