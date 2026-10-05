import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, LayoutDashboard, LogOut, Plus, ExternalLink } from 'lucide-react';
import { logout } from '../actions';
import { requireCmsUser } from '@/lib/cms-auth';
import '../cms.css';

export const metadata: Metadata = { title: 'CMS Kehati UBP Cilegon', robots: { index: false, follow: false } };

export default async function CmsLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireCmsUser();
  const displayName = profile.full_name || 'Pengelola';
  return (
    <div className="cms-shell">
      <aside className="cms-sidebar">
        <Link className="cms-brand" href="/cms"><Image src="/images/logo-kehati-ubpclg.png" width={142} height={57} alt="Kehati UBP Cilegon" priority /><span>Content management</span></Link>
        <nav className="cms-nav" aria-label="Navigasi CMS">
          <Link href="/cms"><LayoutDashboard size={20} /><span>Ringkasan</span></Link>
          <Link href="/cms/articles"><FileText size={20} /><span>Artikel</span></Link>
          <Link href="/cms/articles/new"><Plus size={20} /><span>Tulis artikel</span></Link>
        </nav>
        <div className="cms-account cms-inset"><span className="cms-avatar" aria-hidden="true">{displayName.charAt(0).toUpperCase()}</span><span><strong>{displayName}</strong><small>Administrator lokal</small></span></div>
        <div className="cms-sidebar-actions"><Link href="/" target="_blank">Lihat situs <ExternalLink size={16} /></Link><form action={logout}><button type="submit">Keluar <LogOut size={16} /></button></form></div>
      </aside>
      <main className="cms-content">{children}</main>
      <nav className="cms-mobile-nav" aria-label="Navigasi CMS seluler"><Link href="/cms"><LayoutDashboard size={20} /><span>Ringkasan</span></Link><Link href="/cms/articles"><FileText size={20} /><span>Artikel</span></Link><Link href="/cms/articles/new"><Plus size={20} /><span>Tulis</span></Link></nav>
    </div>
  );
}