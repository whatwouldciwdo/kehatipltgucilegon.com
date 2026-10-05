import 'server-only';
import { redirect } from 'next/navigation';
import { getCmsSession } from '@/lib/cms-session';
import { createAdminClient } from '@/lib/supabase/admin';

export async function requireCmsUser() {
  const session = await getCmsSession();
  if (!session) redirect('/cms/login');
  return {
    supabase: createAdminClient(),
    profile: { full_name: session.username, role: 'admin' as const },
  };
}