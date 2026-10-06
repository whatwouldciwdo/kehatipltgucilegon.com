import Link from 'next/link';
import { ArrowRight, FileEdit, Files, CheckCircle2, AlertTriangle, FilePlus2, Sparkles, Plus } from 'lucide-react';
import { requireCmsUser } from '@/lib/cms-auth';

type RecentArticle = {
  id: string;
  title: string;
  status: string;
  updated_at: string;
};

export default async function CmsDashboard() {
  const { supabase, profile } = await requireCmsUser();

  let total = 0;
  let drafts = 0;
  let published = 0;
  let recent: RecentArticle[] = [];
  let dbError: string | null = null;

  try {
    const [resTotal, resDrafts, resPublished, resRecent] = await Promise.all([
      supabase.from('articles').select('*', { count: 'exact', head: true }),
      supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
      supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'published'),
      supabase.from('articles').select('id,title,status,updated_at').order('updated_at', { ascending: false }).limit(5),
    ]);

    if (resTotal.error) {
      dbError = resTotal.error.message;
    } else {
      total = resTotal.count ?? 0;
      drafts = resDrafts.count ?? 0;
      published = resPublished.count ?? 0;
      recent = (resRecent.data as RecentArticle[]) ?? [];
    }
  } catch (err: unknown) {
    dbError = err instanceof Error ? err.message : 'Gagal menghubungi database Supabase.';
  }

  return (
    <div className="cms-page">
      <header className="cms-page-header">
        <div>
          <p className="cms-eyebrow">Ruang Pengelola</p>
          <h1>Selamat bekerja, {profile.full_name?.split(' ')[0] || 'Pengelola'}.</h1>
          <p>Periksa draf dan terbitkan pembaruan situs dari satu tempat.</p>
        </div>
        <Link className="cms-button cms-button-primary" href="/cms/articles/new">
          <Plus size={18} /> Tulis artikel
        </Link>
      </header>

      {dbError && (
        <div className="cms-alert cms-alert-error" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <AlertTriangle size={20} />
          <div>
            <strong>Koneksi Database Supabase:</strong> {dbError}.<br />
            <small>Pastikan Anda telah menjalankan migrasi SQL di Supabase SQL Editor dan memeriksa variabel environment di Netlify.</small>
          </div>
        </div>
      )}

      <section className="cms-stats" aria-label="Statistik artikel">
        <article className="cms-stat cms-raised">
          <span className="cms-stat-icon icon-emerald">
            <Files size={22} strokeWidth={2} />
          </span>
          <span>
            <strong>{total}</strong>
            <small>Semua artikel</small>
          </span>
        </article>

        <article className="cms-stat cms-raised">
          <span className="cms-stat-icon icon-amber">
            <FileEdit size={22} strokeWidth={2} />
          </span>
          <span>
            <strong>{drafts}</strong>
            <small>Masih draf</small>
          </span>
        </article>

        <article className="cms-stat cms-raised">
          <span className="cms-stat-icon icon-sky">
            <CheckCircle2 size={22} strokeWidth={2} />
          </span>
          <span>
            <strong>{published}</strong>
            <small>Sudah terbit</small>
          </span>
        </article>
      </section>

      <section className="cms-panel cms-raised">
        <div className="cms-panel-heading">
          <div>
            <h2>Terakhir diperbarui</h2>
            <p>Lima artikel dengan perubahan terbaru.</p>
          </div>
          <Link href="/cms/articles">Lihat semua <ArrowRight size={17} /></Link>
        </div>

        {!recent?.length ? (
          <div className="cms-empty">
            <div className="cms-empty-icon-wrap">
              <FilePlus2 size={34} strokeWidth={1.8} />
            </div>
            <h3>Belum ada artikel</h3>
            <p>Tulis naskah pertama Anda untuk mulai mempublikasikan konten di situs Kehati.</p>
            <Link className="cms-button cms-button-primary" href="/cms/articles/new">
              <Plus size={18} /> Tulis artikel pertama
            </Link>
          </div>
        ) : (
          <div className="cms-list">
            {recent.map((item) => (
              <Link href={`/cms/articles/${item.id}/edit`} className="cms-list-row" key={item.id}>
                <span>
                  <strong>{item.title}</strong>
                  <small>Diperbarui {new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(item.updated_at))}</small>
                </span>
                <span className={`cms-status cms-status-${item.status}`}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.status === 'published' ? '#16a34a' : '#d97706' }} />
                  {item.status === 'published' ? 'Terbit' : 'Draf'}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}