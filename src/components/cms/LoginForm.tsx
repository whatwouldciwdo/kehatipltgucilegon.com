'use client';

import { useActionState } from 'react';
import { LockKeyhole, User } from 'lucide-react';
import { login } from '@/app/cms/actions';
import { SubmitButton } from './SubmitButton';

export function LoginForm() {
  const [state, action] = useActionState(login, {});
  return (
    <form action={action} className="cms-login-form">
      <label className="cms-field"><span>Nama pengguna</span><span className="cms-input-wrap"><User size={18} aria-hidden="true" /><input name="username" type="text" autoComplete="username" required /></span></label>
      <label className="cms-field"><span>Kata sandi</span><span className="cms-input-wrap"><LockKeyhole size={18} aria-hidden="true" /><input name="password" type="password" autoComplete="current-password" required /></span></label>
      {state.error && <p className="cms-alert cms-alert-error" role="alert">{state.error}</p>}
      <SubmitButton pendingText="Memeriksa akun...">Masuk ke CMS</SubmitButton>
    </form>
  );
}