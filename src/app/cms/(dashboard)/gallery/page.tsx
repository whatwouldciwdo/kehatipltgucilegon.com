import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, MapPin, Tag, ExternalLink } from 'lucide-react';
import { requireCmsUser } from '@/lib/cms-auth';
import { getGalleryItems } from '@/lib/supabase/kehati';

export const dynamic = 'force-dynamic';

export default async function CmsGalleryPage() {
  await requireCmsUser();
  const galleryItems = await getGalleryItems();

  const items = galleryItems || [
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

  return (
    <div className="cms-page">
      <header className="cms-page-header">
        <div>
          <p className="cms-eyebrow">Aset & Media</p>
          <h1>Galeri & Dokumentasi Kehati</h1>
          <p>Koleksi dokumentasi visual, foto kawasan konservasi, dan inovasi yang terdaftar di Supabase.</p>
        </div>
        <Link className="cms-button cms-button-primary" href="/galeri" target="_blank">
          Lihat Galeri Publik
        </Link>
      </header>

      <section className="cms-panel cms-raised">
        <div className="cms-panel-heading">
          <div>
            <h2>Koleksi Foto & Aset Interaktif ({items.length} item)</h2>
            <p>Terhubung ke tabel <code>kehati_gallery_items</code> di database.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {items.map((item) => (
            <div key={item.id} style={{ border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden', background: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', width: '100%', height: '180px', background: '#F3F4F6' }}>
                <Image
                  src={item.coverImage}
                  alt={item.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
                <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', color: '#FFF', fontSize: '0.75rem', fontWeight: 600, padding: '3px 8px', borderRadius: '50px' }}>
                  {item.badge}
                </span>
              </div>
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#059669', fontWeight: 700, letterSpacing: '0.05em' }}>
                  {item.category}
                </span>
                <h3 style={{ fontSize: '1.05rem', margin: '0.25rem 0 0.5rem', color: '#111827' }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#4B5563', lineHeight: '1.45', margin: '0 0 0.75rem', flex: 1 }}>
                  {item.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#6B7280', borderTop: '1px solid #F3F4F6', paddingTop: '0.75rem' }}>
                  <span>📍 {item.location}</span>
                  {item.stats && <strong style={{ color: '#065F46' }}>{item.stats}</strong>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
