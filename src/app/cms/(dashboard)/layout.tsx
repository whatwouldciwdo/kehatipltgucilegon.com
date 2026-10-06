import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FileText, 
  LayoutDashboard, 
  LogOut, 
  PlusCircle, 
  ExternalLink, 
  BarChart3, 
  Sparkles,
  Layers,
  PenLine
} from 'lucide-react';
import { logout } from '../actions';
import { requireCmsUser } from '@/lib/cms-auth';
import '../cms.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'CMS Kehati UBP Cilegon', robots: { index: false, follow: false } };

export default async function CmsLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireCmsUser();
  const displayName = profile.full_name || 'Pengelola';
  return (
    <div className="cms-shell">
      <aside className="cms-sidebar">
        <Link className="cms-brand" href="/cms">
          <Image src="/images/logo-kehati-ubpclg.png" width={142} height={57} alt="Kehati UBP Cilegon" priority />
          <span>Panel Pengelola Konservasi</span>
        </Link>
        <nav className="cms-nav" aria-label="Navigasi CMS">
          <Link href="/cms">
            <span className="cms-nav-icon"><LayoutDashboard size={18} strokeWidth={2} /></span>
            <span>Ringkasan</span>
          </Link>
          <Link href="/cms/reports">
            <span className="cms-nav-icon"><BarChart3 size={18} strokeWidth={2} /></span>
            <span>Indikator & Laporan</span>
          </Link>
          <Link href="/cms/gallery">
            <span className="cms-nav-icon"><Sparkles size={18} strokeWidth={2} /></span>
            <span>Galeri & Aset</span>
          </Link>
          <Link href="/cms/articles">
            <span className="cms-nav-icon"><FileText size={18} strokeWidth={2} /></span>
            <span>Artikel Publikasi</span>
          </Link>
          <Link href="/cms/articles/new">
            <span className="cms-nav-icon"><PenLine size={18} strokeWidth={2} /></span>
            <span>Tulis Artikel</span>
          </Link>
        </nav>
        <div className="cms-account cms-inset">
          <span className="cms-avatar" aria-hidden="true">{displayName.charAt(0).toUpperCase()}</span>
          <span><strong>{displayName}</strong><small>Administrator lokal</small></span>
        </div>
        <div className="cms-sidebar-actions">
          <Link href="/" target="_blank">Lihat situs <ExternalLink size={14} /></Link>
          <form action={logout}><button type="submit">Keluar <LogOut size={14} /></button></form>
        </div>
      </aside>
      <main className="cms-content">{children}</main>
      <nav className="cms-mobile-nav" aria-label="Navigasi CMS seluler">
        <Link href="/cms">
          <LayoutDashboard size={18} />
          <span>Ringkasan</span>
        </Link>
        <Link href="/cms/reports">
          <BarChart3 size={18} />
          <span>Laporan</span>
        </Link>
        <Link href="/cms/gallery">
          <Sparkles size={18} />
          <span>Galeri</span>
        </Link>
        <Link href="/cms/articles">
          <FileText size={18} />
          <span>Artikel</span>
        </Link>
      </nav>
    </div>
  );
}