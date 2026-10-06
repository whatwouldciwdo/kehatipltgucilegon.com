'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Image as ImageIcon, MapPin, Tag, BarChart2, Check, ArrowLeft } from 'lucide-react';
import { createGalleryItem, updateGalleryItem, type FormState } from '@/app/cms/actions';
import { SubmitButton } from './SubmitButton';

export type GalleryFormData = {
  id: string;
  name: string;
  category: string;
  categoryKey: string;
  location: string;
  badge: string;
  description: string;
  coverImage: string;
  detailImages?: string[];
  stats?: string | null;
  sortOrder?: number;
};

interface GalleryFormProps {
  item?: GalleryFormData;
}

export function GalleryForm({ item }: GalleryFormProps) {
  const action = item ? updateGalleryItem : createGalleryItem;
  const [state, formAction] = useActionState<FormState, FormData>(action, {});

  const [coverImage, setCoverImage] = useState(item?.coverImage ?? '/images/kehati-showcase/taman-kehati.jpg');
  const [detailImagesText, setDetailImagesText] = useState(
    item?.detailImages ? item.detailImages.join('\n') : item?.coverImage ?? ''
  );

  return (
    <form action={formAction} className="cms-editor-form">
      {item && <input type="hidden" name="id" value={item.id} />}

      <div className="cms-editor-main cms-raised">
        <label className="cms-field">
          <span>Nama / Judul Aset Foto</span>
          <input 
            name="name" 
            defaultValue={item?.name} 
            placeholder="Contoh: Taman Kehati Ring 1 PLTGU" 
            minLength={2} 
            required 
          />
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <label className="cms-field">
            <span>Kategori Tampilan</span>
            <input 
              name="category" 
              defaultValue={item?.category ?? 'Flora & Lanskap'} 
              placeholder="Contoh: Flora & Lanskap" 
              required 
            />
          </label>

          <label className="cms-field">
            <span>Filter Kategori</span>
            <select name="category_key" defaultValue={item?.categoryKey ?? 'flora'}>
              <option value="flora">Flora (Tanaman & Pohon)</option>
              <option value="fauna">Fauna (Satwa & Burung)</option>
              <option value="mangrove">Mangrove (Restorasi Pesisir)</option>
              <option value="inovasi">Inovasi & Fasilitas Hijau</option>
              <option value="all">Umum / Semua</option>
            </select>
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <label className="cms-field">
            <span>Lokasi Konservasi</span>
            <input 
              name="location" 
              defaultValue={item?.location ?? 'Kawasan Konservasi Ring 1'} 
              placeholder="Contoh: Kawasan Konservasi Ring 1" 
              required 
            />
          </label>

          <label className="cms-field">
            <span>Badge / Label Singkat</span>
            <input 
              name="badge" 
              defaultValue={item?.badge ?? '137 Spesies'} 
              placeholder="Contoh: 137 Spesies / Smart IoT" 
              required 
            />
          </label>
        </div>

        <label className="cms-field">
          <span>Deskripsi Konservasi</span>
          <textarea 
            name="description" 
            defaultValue={item?.description} 
            rows={4} 
            placeholder="Deskripsikan keanekaragaman hayati, tujuan konservasi, atau teknologi yang diterapkan pada aset ini." 
            required 
          />
        </label>

        <label className="cms-field">
          <span>URL Foto Sampul (Cover Image)</span>
          <input 
            name="cover_image" 
            value={coverImage} 
            onChange={(e) => setCoverImage(e.target.value)} 
            placeholder="/images/kehati-showcase/taman-kehati.jpg atau URL https://..." 
            required 
          />
          <small>Gunakan path lokal di /images/... atau URL gambar publik beresolusi tinggi.</small>
        </label>

        {coverImage && (
          <div style={{ marginTop: '0.5rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E5E7EB', position: 'relative', width: '100%', height: '220px', background: '#F3F4F6' }}>
            <Image
              src={coverImage}
              alt="Preview"
              fill
              style={{ objectFit: 'cover' }}
              unoptimized
            />
            <span style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.7)', color: '#FFF', fontSize: '0.75rem', padding: '4px 10px', borderRadius: '50px' }}>
              Preview Foto Sampul
            </span>
          </div>
        )}

        <label className="cms-field" style={{ marginTop: '1rem' }}>
          <span>Foto Detail / Multi-Angle (1 Baris per URL)</span>
          <textarea 
            name="detail_images" 
            value={detailImagesText} 
            onChange={(e) => setDetailImagesText(e.target.value)} 
            rows={4} 
            placeholder={"/images/kehati-showcase/taman-kehati.jpg\n/images/gallery/product-1.webp\n/images/gallery/product-1-detail-1.webp"} 
          />
          <small>Masukkan 1 baris per URL foto untuk galeri multi-angle.</small>
        </label>
      </div>

      <aside className="cms-editor-side cms-raised">
        <h2>Atribut Aset</h2>

        <label className="cms-field">
          <span>Statistik Capaian (Opsional)</span>
          <input 
            name="stats" 
            defaultValue={item?.stats ?? ''} 
            placeholder="Contoh: 23.670 Batang Flora Terpantau" 
          />
          <small>Tampil di bagian bawah kartu galeri interaktif.</small>
        </label>

        <label className="cms-field">
          <span>Urutan Tampilan (Sort Order)</span>
          <input 
            type="number" 
            name="sort_order" 
            defaultValue={item?.sortOrder ?? 0} 
            min={0} 
          />
          <small>Semakin kecil angka, semakin depan posisi kartu di galeri.</small>
        </label>

        {state.error && (
          <p className="cms-alert cms-alert-error" role="alert" style={{ fontSize: '0.85rem' }}>
            {state.error}
          </p>
        )}

        <div className="cms-form-actions" style={{ marginTop: '1rem' }}>
          <SubmitButton pendingText="Menyimpan...">
            <Check size={17} /> {item ? 'Simpan Perubahan' : 'Tambah ke Galeri'}
          </SubmitButton>
          <Link className="cms-button cms-button-quiet" href="/cms/gallery">
            <ArrowLeft size={16} /> Batal
          </Link>
        </div>
      </aside>
    </form>
  );
}
