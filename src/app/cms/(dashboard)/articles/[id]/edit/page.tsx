import { notFound } from 'next/navigation';
import { ArticleForm } from '@/components/cms/ArticleForm';
import { requireCmsUser } from '@/lib/cms-auth';

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireCmsUser();
  const { data: article } = await supabase.from('articles').select('id,title,slug,excerpt,body,status').eq('id', id).single();
  if (!article) notFound();
  return <div className="cms-page"><header className="cms-page-header"><div><p className="cms-eyebrow">Penyuntingan</p><h1>Edit artikel</h1><p>Perbarui naskah atau ubah status publikasinya.</p></div></header><ArticleForm article={article} /></div>;
}