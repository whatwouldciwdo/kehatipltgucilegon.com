import type { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/cms/LoginForm';
import { createClient } from '@/lib/supabase/server';
import '../cms.css';

export const metadata: Metadata = { title: 'Masuk CMS | Kehati UBP Cilegon' };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (data?.claims?.sub) redirect('/cms');
  const query = await searchParams;
  return (
    <main className="cms-login-page">
      <section className="cms-login-card cms-raised" aria-labelledby="login-title">
        <div className="cms-login-brand"><Image src="/images/logo-kehati-ubpclg.png" width={180} height={72} alt="Kehati UBP Cilegon" priority /></div>
        <p className="cms-eyebrow">Ruang pengelola</p>
        <h1 id="login-title">Kelola konten situs</h1>
        <p className="cms-login-intro">Masuk dengan akun yang telah didaftarkan oleh administrator.</p>
        {query.error === 'access' && <p className="cms-alert cms-alert-error" role="alert">Akun tidak memiliki akses CMS.</p>}
        <LoginForm />
      </section>
    </main>
  );
}