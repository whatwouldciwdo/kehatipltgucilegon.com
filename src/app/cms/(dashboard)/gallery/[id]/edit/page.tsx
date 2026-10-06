import { notFound } from 'next/navigation';
import { requireCmsUser } from '@/lib/cms-auth';
import { GalleryForm, type GalleryFormData } from '@/components/cms/GalleryForm';

export const dynamic = 'force-dynamic';

interface EditGalleryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditGalleryItemPage({ params }: EditGalleryPageProps) {
  const { id } = await params;
  const { supabase } = await requireCmsUser();

  const { data: dbItem } = await supabase
    .from('kehati_gallery_items')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (!dbItem) {
    notFound();
  }

  const formData: GalleryFormData = {
    id: dbItem.id,
    name: dbItem.name,
    category: dbItem.category,
    categoryKey: dbItem.category_key,
    location: dbItem.location,
    badge: dbItem.badge,
    description: dbItem.description,
    coverImage: dbItem.cover_image,
    detailImages: dbItem.detail_images || [],
    stats: dbItem.stats,
    sortOrder: dbItem.sort_order,
  };

  return (
    <div className="cms-page">
      <header className="cms-page-header">
        <div>
          <p className="cms-eyebrow">Penyuntingan Aset</p>
          <h1>Edit Koleksi Galeri</h1>
          <p>Perbarui foto, deskripsi, lokasi, atau statistik pencapaian.</p>
        </div>
      </header>

      <GalleryForm item={formData} />
    </div>
  );
}
