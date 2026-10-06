import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, MapPin, Tag, Pencil, Trash2, Plus, CheckCircle2 } from 'lucide-react';
import { requireCmsUser } from '@/lib/cms-auth';
import { getGalleryItems } from '@/lib/supabase/kehati';
import { deleteGalleryItem } from '@/app/cms/actions';

export const dynamic = 'force-dynamic';

const fallbackGalleryItems = [
  {
    id: 'item-0',
    name: 'Taman Kehati Ring 1 PLTGU',
    category: 'Flora & Lanskap',
    categoryKey: 'flora',
    location: 'Kawasan Konservasi Ring 1',
    badge: '137 Spesies',
    description: 'Kawasan konservasi flora seluas 17.7 hektar dengan keanekaragaman pohon langka dan endemik yang dikelola secara berkelanjutan.',
    coverImage: '/images/kehati-showcase/taman-kehati.jpg',
    stats: '23.670 Batang Flora Terpantau'
  },
  {
    id: 'item-1',
    name: 'Biowing Connect & Avifauna',
    category: 'Fauna & Satwa',
    categoryKey: 'fauna',
    location: 'Zona Suaka Burung Ring 1 & 2',
    badge: '52 Spesies Satwa',
    description: 'Sistem regenerasi hayati alami berbantu satwa burung lokal dan pemantauan 1.122 individu aves di area penyangga.',
    coverImage: '/img/laporan/2026/biowing-connect-system.png',
    stats: '1.122 Individu Aves Teridentifikasi'
  },
  {
    id: 'item-2',
    name: 'Restorasi Mangrove Pesisir',
    category: 'Ekosistem Pesisir',
    categoryKey: 'mangrove',
    location: 'Pesisir Desa Lontar, Kec. Tirtayasa',
    badge: '19.000 Bibit',
    description: 'Rehabilitasi pesisir pantai kritis dengan penanaman kumulatif 19.000 pohon Rhizophora apiculata bersama DLH Kab. Serang.',
    coverImage: '/images/kehati-showcase/restorasi-mangrove.jpg',
    stats: '0.45 Ha Tutupan Mangrove Lestari'
  },
  {
    id: 'item-3',
    name: 'C-Flora Smart Watering IoT',
    category: 'Inovasi Sirkular',
    categoryKey: 'inovasi',
    location: 'Nursery & Kebun Pembibitan',
    badge: 'Smart IoT',
    description: 'Sistem otomasi penyiraman cerdas berbasis sensor kelembaban tanah dan sirkularitas air kondensat ramah energi.',
    coverImage: '/img/laporan/2026/sustainable-cycle-smart-watering.png',
    stats: '100% Efisiensi Air Kondensat'
  }
];

export default async function CmsGalleryPage({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
  await requireCmsUser();
  const dbItems = await getGalleryItems();
  const query = await searchParams;

  const items = dbItems && dbItems.length > 0 ? dbItems : fallbackGalleryItems;

  return (
    <div className="cms-page">
      <header className="cms-page-header">
        <div>
          <p className="cms-eyebrow">Aset & Media</p>
          <h1>Galeri & Dokumentasi Kehati</h1>
          <p>Kelola dokumentasi visual, foto kawasan konservasi, dan inovasi lingkungan di database.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link className="cms-button cms-button-primary" href="/cms/gallery/new">
            <Plus size={18} strokeWidth={2.2} /> Tambah Foto Galeri
          </Link>
          <Link className="cms-button cms-button-quiet" href="/galeri" target="_blank">
            Lihat Galeri Publik
          </Link>
        </div>
      </header>

      {query.success && (
        <p className="cms-alert cms-alert-success" role="status" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <CheckCircle2 size={18} /> Aset galeri berhasil {query.success === 'created' ? 'ditambahkan' : 'diperbarui'}.
        </p>
      )}

      <section className="cms-panel cms-raised">
        <div className="cms-panel-heading">
          <div>
            <h2>Koleksi Foto & Aset ({items.length} item)</h2>
            <p>Terhubung langsung ke tabel <code>kehati_gallery_items</code> di Supabase.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {items.map((item) => (
            <div key={item.id} style={{ border: '1px solid #E5E7EB', borderRadius: '16px', overflow: 'hidden', background: '#FFFFFF', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ position: 'relative', width: '100%', height: '190px', background: '#F3F4F6' }}>
                <Image
                  src={item.coverImage}
                  alt={item.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
                <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(18, 44, 30, 0.85)', backdropFilter: 'blur(4px)', color: '#FFF', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '50px' }}>
                  {item.badge}
                </span>
              </div>
              <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#059669', fontWeight: 800, letterSpacing: '0.06em' }}>
                  {item.category}
                </span>
                <h3 style={{ fontSize: '1.1rem', margin: '0.35rem 0 0.5rem', color: '#111827', fontWeight: 700 }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: '1.5', margin: '0 0 1rem', flex: 1 }}>
                  {item.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#6B7280', borderTop: '1px solid #F3F4F6', paddingTop: '0.85rem' }}>
                  <span>📍 {item.location}</span>
                  {item.stats && <strong style={{ color: '#065F46' }}>{item.stats}</strong>}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', borderTop: '1px dashed #E5E7EB', paddingTop: '0.85rem', justifyContent: 'flex-end' }}>
                  <Link 
                    href={`/cms/gallery/${item.id}/edit`}
                    className="cms-button"
                    style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem', background: '#F0FDF4', color: '#166534', border: '1px solid #BBF7D0' }}
                  >
                    <Pencil size={15} /> Edit
                  </Link>

                  <form action={deleteGalleryItem}>
                    <input type="hidden" name="id" value={item.id} />
                    <button 
                      type="submit"
                      className="cms-button"
                      style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem', background: '#FEF2F2', color: '#991B1B', border: '1px solid #FECACA', cursor: 'pointer' }}
                    >
                      <Trash2 size={15} /> Hapus
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
