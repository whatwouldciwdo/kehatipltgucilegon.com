'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { createArticle, updateArticle, type FormState } from '@/app/cms/actions';
import { SubmitButton } from './SubmitButton';

type Article = { id: string; title: string; slug: string; excerpt: string; body: string; status: 'draft' | 'published' };

export function ArticleForm({ article }: { article?: Article }) {
  const action = article ? updateArticle : createArticle;
  const [state, formAction] = useActionState<FormState, FormData>(action, {});
  const [title, setTitle] = useState(article?.title ?? '');
  const [slug, setSlug] = useState(article?.slug ?? '');
  const [slugEdited, setSlugEdited] = useState(Boolean(article));
  const makeSlug = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  return (
    <form action={formAction} className="cms-editor-form">
      {article && <input type="hidden" name="id" value={article.id} />}
      <div className="cms-editor-main cms-raised">
        <label className="cms-field"><span>Judul artikel</span><input name="title" value={title} onChange={(event) => { setTitle(event.target.value); if (!slugEdited) setSlug(makeSlug(event.target.value)); }} minLength={3} maxLength={160} required /></label>
        <label className="cms-field"><span>Slug URL</span><span className="cms-slug-prefix">/artikel/ <input name="slug" value={slug} onChange={(event) => { setSlugEdited(true); setSlug(makeSlug(event.target.value)); }} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" required /></span><small>Huruf kecil, angka, dan tanda hubung.</small></label>
        <label className="cms-field"><span>Ringkasan</span><textarea name="excerpt" defaultValue={article?.excerpt} rows={3} maxLength={320} placeholder="Ringkasan singkat untuk daftar artikel." /></label>
        <label className="cms-field"><span>Isi artikel</span><textarea name="body" defaultValue={article?.body} rows={14} placeholder="Tulis isi artikel di sini." /></label>
      </div>
      <aside className="cms-editor-side cms-raised">
        <h2>Publikasi</h2>
        <label className="cms-field"><span>Status</span><select name="status" defaultValue={article?.status ?? 'draft'}><option value="draft">Draf</option><option value="published">Terbit</option></select></label>
        <p className="cms-help">Artikel berstatus terbit dapat dibaca melalui API publik setelah migrasi terpasang.</p>
        {state.error && <p className="cms-alert cms-alert-error" role="alert">{state.error}</p>}
        <div className="cms-form-actions"><SubmitButton pendingText="Menyimpan...">Simpan artikel</SubmitButton><Link className="cms-button cms-button-quiet" href="/cms/articles">Batal</Link></div>
      </aside>
    </form>
  );
}