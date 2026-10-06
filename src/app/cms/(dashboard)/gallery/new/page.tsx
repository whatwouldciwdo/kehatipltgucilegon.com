import { requireCmsUser } from '@/lib/cms-auth';
import { GalleryForm } from '@/components/cms/GalleryForm';

export const dynamic = 'force-dynamic';

export default async function NewGalleryItemPage() {
  await requireCmsUser();

  return (
    <div className="cms-page">
      <header className="cms-page-header">
        <div>
          <p className="cms-eyebrow">Manajemen Galeri</p>
          <h1>Tambah Aset Foto Baru</h1>
          <p>Tambahkan dokumentasi visual flora, fauna, atau inovasi konservasi baru ke database.</p>
        </div>
      </header>

      <GalleryForm />
    </div>
  );
}
