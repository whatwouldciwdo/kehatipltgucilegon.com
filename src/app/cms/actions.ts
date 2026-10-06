'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireCmsUser } from '@/lib/cms-auth';
import { createCmsSession, deleteCmsSession, verifyLocalCredentials } from '@/lib/cms-session';

export type FormState = { error?: string };

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim();
}

function validSlug(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function isRedirectError(err: unknown): boolean {
  return Boolean(
    err &&
    typeof err === 'object' &&
    'digest' in err &&
    typeof (err as { digest?: unknown }).digest === 'string' &&
    (err as { digest: string }).digest.startsWith('NEXT_REDIRECT')
  );
}

// ==========================================
// AUTH ACTIONS
// ==========================================
export async function login(_: FormState, formData: FormData): Promise<FormState> {
  const username = text(formData, 'username');
  const password = String(formData.get('password') ?? '');
  if (!username || !password) return { error: 'Nama pengguna dan kata sandi wajib diisi.' };

  try {
    const isValid = await verifyLocalCredentials(username, password);
    if (!isValid) return { error: 'Nama pengguna atau kata sandi tidak sesuai.' };
    await createCmsSession(username);
  } catch (err: unknown) {
    if (isRedirectError(err)) throw err;
    console.error('CMS Login Error:', err);
    return { error: err instanceof Error ? err.message : 'Terjadi kesalahan sistem saat memproses login.' };
  }

  redirect('/cms');
}

export async function logout() {
  await deleteCmsSession();
  redirect('/cms/login');
}

// ==========================================
// ARTICLE ACTIONS
// ==========================================
function articlePayload(formData: FormData) {
  const title = text(formData, 'title');
  const slug = text(formData, 'slug').toLowerCase();
  const excerpt = text(formData, 'excerpt');
  const body = text(formData, 'body');
  const status = text(formData, 'status') === 'published' ? 'published' : 'draft';
  if (title.length < 3 || title.length > 160) return { error: 'Judul harus terdiri dari 3 sampai 160 karakter.' };
  if (!validSlug(slug)) return { error: 'Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung.' };
  if (excerpt.length > 320) return { error: 'Ringkasan maksimal 320 karakter.' };
  return { data: { title, slug, excerpt, body, status } };
}

export async function createArticle(_: FormState, formData: FormData): Promise<FormState> {
  try {
    const { supabase } = await requireCmsUser();
    const payload = articlePayload(formData);
    if ('error' in payload) return { error: payload.error };
    const publishedAt = payload.data.status === 'published' ? new Date().toISOString() : null;
    const { error } = await supabase.from('articles').insert({ ...payload.data, author_id: null, published_at: publishedAt });
    if (error?.code === '23505') return { error: 'Slug sudah dipakai artikel lain.' };
    if (error) return { error: `Artikel gagal disimpan: ${error.message}` };
    revalidatePath('/cms');
    revalidatePath('/cms/articles');
  } catch (err: unknown) {
    if (isRedirectError(err)) throw err;
    return { error: err instanceof Error ? err.message : 'Gagal membuat artikel.' };
  }

  redirect('/cms/articles?success=created');
}

export async function updateArticle(_: FormState, formData: FormData): Promise<FormState> {
  try {
    const { supabase } = await requireCmsUser();
    const id = text(formData, 'id');
    const payload = articlePayload(formData);
    if (!id) return { error: 'ID artikel tidak ditemukan.' };
    if ('error' in payload) return { error: payload.error };
    const publishedAt = payload.data.status === 'published' ? new Date().toISOString() : null;
    const { error } = await supabase.from('articles').update({ ...payload.data, published_at: publishedAt }).eq('id', id);
    if (error?.code === '23505') return { error: 'Slug sudah dipakai artikel lain.' };
    if (error) return { error: `Perubahan gagal disimpan: ${error.message}` };
    revalidatePath('/cms');
    revalidatePath('/cms/articles');
  } catch (err: unknown) {
    if (isRedirectError(err)) throw err;
    return { error: err instanceof Error ? err.message : 'Gagal memperbarui artikel.' };
  }

  redirect('/cms/articles?success=updated');
}

export async function deleteArticle(formData: FormData) {
  try {
    const { supabase } = await requireCmsUser();
    const id = text(formData, 'id');
    if (id) await supabase.from('articles').delete().eq('id', id);
    revalidatePath('/cms');
    revalidatePath('/cms/articles');
  } catch (err: unknown) {
    if (isRedirectError(err)) throw err;
    console.error('Delete article error:', err);
  }
}

// ==========================================
// GALLERY & ASSET ACTIONS
// ==========================================
function parseDetailImages(raw: string): string[] {
  return raw
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function galleryPayload(formData: FormData) {
  const name = text(formData, 'name');
  const category = text(formData, 'category');
  const category_key = text(formData, 'category_key') || 'flora';
  const location = text(formData, 'location');
  const badge = text(formData, 'badge');
  const description = text(formData, 'description');
  const cover_image = text(formData, 'cover_image');
  const detailImagesRaw = text(formData, 'detail_images');
  const stats = text(formData, 'stats');
  const sort_order = parseInt(text(formData, 'sort_order') || '0', 10);

  if (name.length < 2) return { error: 'Nama/Judul aset foto wajib diisi.' };
  if (!cover_image) return { error: 'URL atau path foto sampul wajib diisi.' };
  if (!description) return { error: 'Deskripsi aset foto wajib diisi.' };

  const detail_images = parseDetailImages(detailImagesRaw);
  if (detail_images.length === 0) {
    detail_images.push(cover_image);
  }

  return {
    data: {
      name,
      category: category || 'Flora & Lanskap',
      category_key,
      location: location || 'Kawasan PLTGU Cilegon',
      badge: badge || 'Konservasi',
      description,
      cover_image,
      detail_images,
      stats: stats || null,
      sort_order: isNaN(sort_order) ? 0 : sort_order,
    }
  };
}

export async function createGalleryItem(_: FormState, formData: FormData): Promise<FormState> {
  try {
    const { supabase } = await requireCmsUser();
    const payload = galleryPayload(formData);
    if ('error' in payload) return { error: payload.error };

    const customId = text(formData, 'id') || `item-${Date.now()}`;

    const { error } = await supabase.from('kehati_gallery_items').insert({
      id: customId,
      ...payload.data
    });

    if (error) return { error: `Gagal menyimpan aset galeri: ${error.message}` };

    revalidatePath('/galeri');
    revalidatePath('/gallery');
    revalidatePath('/cms');
    revalidatePath('/cms/gallery');
  } catch (err: unknown) {
    if (isRedirectError(err)) throw err;
    return { error: err instanceof Error ? err.message : 'Gagal membuat aset galeri.' };
  }

  redirect('/cms/gallery?success=created');
}

export async function updateGalleryItem(_: FormState, formData: FormData): Promise<FormState> {
  try {
    const { supabase } = await requireCmsUser();
    const id = text(formData, 'id');
    if (!id) return { error: 'ID aset galeri tidak ditemukan.' };

    const payload = galleryPayload(formData);
    if ('error' in payload) return { error: payload.error };

    const { error } = await supabase
      .from('kehati_gallery_items')
      .update({
        ...payload.data,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) return { error: `Gagal memperbarui aset galeri: ${error.message}` };

    revalidatePath('/galeri');
    revalidatePath('/gallery');
    revalidatePath('/cms');
    revalidatePath('/cms/gallery');
  } catch (err: unknown) {
    if (isRedirectError(err)) throw err;
    return { error: err instanceof Error ? err.message : 'Gagal memperbarui aset galeri.' };
  }

  redirect('/cms/gallery?success=updated');
}

export async function deleteGalleryItem(formData: FormData) {
  try {
    const { supabase } = await requireCmsUser();
    const id = text(formData, 'id');
    if (id) {
      await supabase.from('kehati_gallery_items').delete().eq('id', id);
    }
    revalidatePath('/galeri');
    revalidatePath('/gallery');
    revalidatePath('/cms');
    revalidatePath('/cms/gallery');
  } catch (err: unknown) {
    if (isRedirectError(err)) throw err;
    console.error('Delete gallery item error:', err);
  }
}