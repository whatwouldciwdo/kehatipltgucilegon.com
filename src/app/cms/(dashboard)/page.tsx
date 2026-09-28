import Link from 'next/link';
import { ArrowRight, FilePenLine, FileText, Send } from 'lucide-react';
import { requireCmsUser } from '@/lib/cms-auth';

export default async function CmsDashboard() {
  const { supabase, profile } = await requireCmsUser();
  const [{ count: total }, { count: drafts }, { count: published }, { data: recent }] = await Promise.all([
    supabase.from('articles').select('*', { count: 'exact', head: true }),
    supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
    supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('articles').select('id,title,status,updated_at').order('updated_at', { ascending: false }).limit(5),
  ]);
  return (
    <div className="cms-page">
      <header className="cms-page-header"><div><p className="cms-eyebrow">Ringkasan konten</p><h1>Selamat bekerja, {profile.full_name?.split(' ')[0] || 'Pengelola'}.</h1><p>Periksa draf dan terbitkan pembaruan situs dari satu tempat.</p></div><Link className="cms-button cms-button-primary" href="/cms/articles/new">Tulis artikel</Link></header>
      <section className="cms-stats" aria-label="Statistik artikel">
        <article className="cms-stat cms-raised"><span className="cms-stat-icon"><FileText size={21} /></span><span><strong>{total ?? 0}</strong><small>Semua artikel</small></span></article>
        <article className="cms-stat cms-raised"><span className="cms-stat-icon"><FilePenLine size={21} /></span><span><strong>{drafts ?? 0}</strong><small>Masih draf</small></span></article>
        <article className="cms-stat cms-raised"><span className="cms-stat-icon"><Send size={21} /></span><span><strong>{published ?? 0}</strong><small>Sudah terbit</small></span></article>
      </section>
      <section className="cms-panel cms-raised"><div className="cms-panel-heading"><div><h2>Terakhir diperbarui</h2><p>Lima artikel dengan perubahan terbaru.</p></div><Link href="/cms/articles">Lihat semua <ArrowRight size={17} /></Link></div>
        {!recent?.length ? <div className="cms-empty"><FileText size={30} /><h3>Belum ada artikel</h3><p>Tulis artikel pertama untuk mulai mengisi CMS.</p><Link className="cms-button cms-button-primary" href="/cms/articles/new">Tulis artikel pertama</Link></div> : <div className="cms-list">{recent.map((item) => <Link href={`/cms/articles/${item.id}/edit`} className="cms-list-row" key={item.id}><span><strong>{item.title}</strong><small>Diperbarui {new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(item.updated_at))}</small></span><span className={`cms-status cms-status-${item.status}`}>{item.status === 'published' ? 'Terbit' : 'Draf'}</span></Link>)}</div>}
      </section>
    </div>
  );
}