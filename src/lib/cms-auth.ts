import 'server-only';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export type CmsProfile = {
  id: string;
  full_name: string | null;
  role: 'admin' | 'editor';
};

export async function requireCmsUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;

  if (error || !userId) redirect('/cms/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name, role')
    .eq('id', userId)
    .single<CmsProfile>();

  if (!profile) redirect('/cms/login?error=access');
  return { supabase, profile, email: String(data.claims.email ?? '') };
}