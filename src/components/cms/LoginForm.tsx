'use client';

import { useActionState } from 'react';
import { Lock, UserCheck, ArrowRight } from 'lucide-react';
import { login } from '@/app/cms/actions';
import { SubmitButton } from './SubmitButton';

export function LoginForm() {
  const [state, action] = useActionState(login, {});
  return (
    <form action={action} className="cms-login-form">
      <label className="cms-field">
        <span>Nama pengguna</span>
        <span className="cms-input-wrap">
          <UserCheck size={18} color="#216346" aria-hidden="true" strokeWidth={2} />
          <input name="username" type="text" autoComplete="username" placeholder="Masukkan username" required />
        </span>
      </label>
      <label className="cms-field">
        <span>Kata sandi</span>
        <span className="cms-input-wrap">
          <Lock size={18} color="#216346" aria-hidden="true" strokeWidth={2} />
          <input name="password" type="password" autoComplete="current-password" placeholder="••••••••••••" required />
        </span>
      </label>
      {state.error && <p className="cms-alert cms-alert-error" role="alert">{state.error}</p>}
      <SubmitButton pendingText="Memeriksa akun...">
        Masuk ke CMS <ArrowRight size={16} strokeWidth={2.2} />
      </SubmitButton>
    </form>
  );
}