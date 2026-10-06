import Link from 'next/link';
import { FileText, Pencil, Plus, Trash2, FilePlus2, CheckCircle2 } from 'lucide-react';
import { deleteArticle } from '../../actions';
import { requireCmsUser } from '@/lib/cms-auth';

export default async function ArticlesPage({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
  const { supabase } = await requireCmsUser();
  const { data: articles } = await supabase.from('articles').select('id,title,slug,status,updated_at').order('updated_at', { ascending: false });
  const query = await searchParams;

  return (
    <div className="cms-page">
      <header className="cms-page-header">
        <div>
          <p className="cms-eyebrow">Pustaka Konten</p>
          <h1>Artikel Publikasi</h1>
          <p>Kelola naskah, status publikasi, dan alamat URL halaman artikel.</p>
        </div>
        <Link className="cms-button cms-button-primary" href="/cms/articles/new">
          <Plus size={18} strokeWidth={2.2} /> Tulis artikel
        </Link>
      </header>

      {query.success && (
        <p className="cms-alert cms-alert-success" role="status" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} /> Artikel berhasil {query.success === 'created' ? 'dibuat' : 'diperbarui'}.
        </p>
      )}

      <section className="cms-panel cms-raised">
        {!articles?.length ? (
          <div className="cms-empty">
            <div className="cms-empty-icon-wrap">
              <FilePlus2 size={34} strokeWidth={1.8} />
            </div>
            <h2>Daftar artikel masih kosong</h2>
            <p>Buat naskah pertama dan simpan sebagai draf atau langsung terbitkan.</p>
            <Link className="cms-button cms-button-primary" href="/cms/articles/new">
              <Plus size={18} strokeWidth={2.2} /> Tulis artikel pertama
            </Link>
          </div>
        ) : (
          <div className="cms-table-wrap">
            <table className="cms-table">
              <thead>
                <tr>
                  <th>Judul Artikel</th>
                  <th>Status</th>
                  <th>Diperbarui</th>
                  <th><span className="sr-only">Tindakan</span></th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id}>
                    <td>
                      <strong>{article.title}</strong>
                      <small>/artikel/{article.slug}</small>
                    </td>
                    <td>
                      <span className={`cms-status cms-status-${article.status}`}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: article.status === 'published' ? '#16a34a' : '#d97706' }} />
                        {article.status === 'published' ? 'Terbit' : 'Draf'}
                      </span>
                    </td>
                    <td>
                      {new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(article.updated_at))}
                    </td>
                    <td>
                      <div className="cms-row-actions">
                        <Link href={`/cms/articles/${article.id}/edit`} aria-label={`Edit ${article.title}`}>
                          <Pencil size={17} strokeWidth={2} />
                        </Link>
                        <form action={deleteArticle}>
                          <input type="hidden" name="id" value={article.id} />
                          <button type="submit" aria-label={`Hapus ${article.title}`}>
                            <Trash2 size={17} strokeWidth={2} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}