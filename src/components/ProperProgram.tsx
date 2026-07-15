'use client';

import React from 'react';
import { Award, Zap, Shield, CheckCircle, Flame, Droplet, Trees } from 'lucide-react';

export default function ProperProgram() {
  const properRatings = [
    { 
      rating: 'Emas (Gold)', 
      color: '#ffd700', 
      desc: 'Tingkat tertinggi. Menunjukkan keunggulan lingkungan yang konsisten, inovasi sosial, dan pemberdayaan masyarakat berkelanjutan.',
      active: true,
      status: 'Target Pencapaian'
    },
    { 
      rating: 'Hijau (Green)', 
      color: '#4caf50', 
      desc: 'Melampaui ketaatan (Beyond Compliance) melalui efisiensi energi, pengurangan emisi, dan pengelolaan keanekaragaman hayati.',
      active: true,
      status: 'Pencapaian Saat Ini'
    },
    { 
      rating: 'Biru (Blue)', 
      color: '#2196f3', 
      desc: 'Telah melakukan upaya pengelolaan lingkungan hidup sesuai dengan ketentuan dan peraturan yang berlaku (Compliance).',
      active: false,
      status: 'Baseline Kepatuhan'
    }
  ];

  const stats = [
    { icon: <Zap size={24} style={{ color: '#ffb703' }} />, title: 'Efisiensi Energi', value: '45,820 GJ', desc: 'Melalui inovasi siklus PLTGU' },
    { icon: <Flame size={24} style={{ color: '#e63946' }} />, title: 'Reduksi Emisi CO2', value: '12,450 Ton', desc: 'Penggunaan gas alam bersih' },
    { icon: <Droplet size={24} style={{ color: '#4cc9f0' }} />, title: 'Konservasi Air', value: '18,200 m³', desc: 'Sistem daur ulang air kondensat' },
    { icon: <Trees size={24} style={{ color: '#2a9d8f' }} />, title: 'Keanekaragaman Hayati', value: '1.24 H.I.', desc: 'Kehati flora & fauna di UBP Cilegon' }
  ];

  return (
    <section 
      id="proper" 
      style={{
        padding: '5rem 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {/* Title Block */}
        <div className="grid-2" style={{ alignItems: 'flex-start' }}>
          <div>
            <div className="badge-eco">Program PROPER KLHK</div>
            <h2 
              style={{
                fontSize: '2.8rem',
                color: 'var(--bg-dark-green)',
                letterSpacing: '-0.03em',
                marginBottom: '1.5rem',
              }}
            >
              Komitmen Pengelolaan Lingkungan Hidup
            </h2>
          </div>
          <div>
            <p style={{ marginBottom: '1rem', fontSize: '1.15rem', color: 'var(--text-muted)' }}>
              PT. PLN Indonesia Power UBP Cilegon secara konsisten menerapkan standard pengelolaan lingkungan terbaik melalui program <strong>PROPER</strong> (Program Penilaian Peringkat Kinerja Perusahaan dalam Pengelolaan Lingkungan Hidup).
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
              Tujuan kami adalah mencapai tingkat <strong>PROPER EMAS</strong> melalui integrasi operasional pembangkit ramah lingkungan, reduksi limbah B3, program efisiensi sumber daya, dan pemberdayaan masyarakat sekitar kawasan PLTGU Cilegon.
            </p>
          </div>
        </div>

        {/* Content Showcase Grid */}
        <div className="grid-2" style={{ gap: '3rem', marginTop: '1rem' }}>
          {/* Left: Achievements & Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--bg-dark-green)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={24} style={{ color: 'var(--primary-green)' }} />
              Inisiatif Efisiensi & Kinerja Lingkungan
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {stats.map((stat, idx) => (
                <div 
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(250,250,250,0.8)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    transition: 'var(--transition-smooth)',
                  }}
                  className="stat-card"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {stat.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--bg-dark-green)' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)', marginTop: '0.25rem' }}>
                      {stat.title}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      {stat.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: PROPER Ratings Level */}
          <div 
            style={{
              backgroundColor: 'white',
              border: '1px solid var(--border-light)',
              borderRadius: '24px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <h3 style={{ fontSize: '1.5rem', color: 'var(--bg-dark-green)', marginBottom: '0.5rem' }}>
              Peringkat PROPER UBP Cilegon
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {properRatings.map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    border: `1px solid ${item.active ? 'var(--border-light)' : 'rgba(0,0,0,0.03)'}`,
                    borderRadius: '16px',
                    padding: '1.25rem',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    backgroundColor: item.active ? 'rgba(45, 106, 79, 0.02)' : 'rgba(0,0,0,0.01)',
                    opacity: item.active ? 1 : 0.7,
                    position: 'relative',
                  }}
                >
                  {/* Rating indicator badge */}
                  <div 
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: item.color,
                      marginTop: '4px',
                      flexShrink: 0,
                      boxShadow: `0 0 10px ${item.color}80`
                    }}
                  />
                  
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <h4 style={{ fontSize: '1.1rem', color: 'var(--text-dark)' }}>{item.rating}</h4>
                      {item.active && (
                        <span 
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.6rem',
                            borderRadius: '20px',
                            backgroundColor: item.color === '#ffd700' ? 'rgba(255, 193, 7, 0.15)' : 'rgba(76, 175, 80, 0.15)',
                            color: item.color === '#ffd700' ? '#c89300' : 'var(--primary-green)'
                          }}
                        >
                          {item.status}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .stat-card:hover {
          transform: translateY(-4px);
          background-color: white !important;
          box-shadow: 0 10px 20px rgba(18, 44, 30, 0.04);
          border-color: rgba(45, 106, 79, 0.2) !important;
        }
      `}</style>
    </section>
  );
}
