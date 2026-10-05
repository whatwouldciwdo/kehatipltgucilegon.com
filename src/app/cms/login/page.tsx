import type { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/cms/LoginForm';
import { getCmsSession } from '@/lib/cms-session';
import '../cms.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Masuk CMS | Kehati UBP Cilegon' };

export default async function LoginPage() {
  if (await getCmsSession()) redirect('/cms');
  return (
    <main className="cms-login-page">
      <section className="cms-login-card cms-raised" aria-labelledby="login-title">
        <div className="cms-login-brand"><Image src="/images/logo-kehati-ubpclg.png" width={180} height={72} alt="Kehati UBP Cilegon" priority /></div>
        <p className="cms-eyebrow">Ruang pengelola</p>
        <h1 id="login-title">Kelola konten situs</h1>
        <p className="cms-login-intro">Masuk dengan akun pengelola lokal.</p>
        <LoginForm />
      </section>
    </main>
  );
}