'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, LogIn } from 'lucide-react';
import './cms.css';

export default function CmsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('CMS Runtime Error:', error);
  }, [error]);

  return (
    <main className="cms-login-page">
      <section className="cms-login-card cms-raised" style={{ maxWidth: '520px' }}>
        <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '12px', background: '#FEE2E2', color: '#B91C1C', marginBottom: '1rem' }}>
          <AlertTriangle size={32} />
        </div>
        <p className="cms-eyebrow" style={{ color: '#B91C1C' }}>Terjadi Masalah Server</p>
        <h1 style={{ fontSize: '1.4rem', margin: '0.25rem 0 1rem' }}>Gagal Memuat Halaman CMS</h1>
        
        <div className="cms-alert cms-alert-error" style={{ textAlign: 'left', wordBreak: 'break-word', marginBottom: '1rem' }}>
          {error.message || 'Terjadi kesalahan internal pada server Next.js saat memuat data CMS.'}
        </div>

        <div style={{ textAlign: 'left', fontSize: '0.85rem', color: '#4B5563', lineHeight: '1.5', background: '#F9FAFB', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
          <strong style={{ color: '#1F2937' }}>Langkah Pengecekan:</strong>
          <ul style={{ paddingLeft: '1.2rem', margin: '0.5rem 0 0' }}>
            <li>Pastikan variabel berikut sudah ada di Netlify Dashboard: <code>CMS_USERNAME</code>, <code>CMS_PASSWORD_HASH</code>, <code>CMS_SESSION_SECRET</code>, <code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>SUPABASE_SERVICE_ROLE_KEY</code>.</li>
            <li>Pastikan tidak ada spasi atau tanda kutip ganda/tunggal ekstra pada nilai variabel di Netlify.</li>
            <li>Pastikan tabel <code>articles</code> sudah dibuat di Supabase SQL Editor.</li>
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', width: '100%' }}>
          <button
            onClick={() => reset()}
            className="cms-button cms-button-primary"
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <RefreshCw size={16} /> Coba Lagi
          </button>
          <Link
            href="/cms/login"
            className="cms-button"
            style={{ flex: 1, justifyContent: 'center', background: '#F3F4F6', color: '#374151' }}
          >
            <LogIn size={16} /> Ke Login
          </Link>
        </div>
      </section>
    </main>
  );
}
