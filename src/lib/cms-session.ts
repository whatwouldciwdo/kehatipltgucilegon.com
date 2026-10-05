import 'server-only';

import { createHmac, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { cookies } from 'next/headers';

const scrypt = promisify(scryptCallback);
const COOKIE_NAME = 'cms_session';
const SESSION_MAX_AGE = 60 * 60 * 8;

type SessionPayload = { username: string; expiresAt: number };

function cleanEnv(val: string | undefined): string {
  if (!val) return '';
  return val.trim().replace(/^["']|["']$/g, '');
}

function getCmsEnv() {
  const username = cleanEnv(process.env.CMS_USERNAME);
  const passwordHash = cleanEnv(process.env.CMS_PASSWORD_HASH);
  const sessionSecret = cleanEnv(process.env.CMS_SESSION_SECRET);

  const missing: string[] = [];
  if (!username) missing.push('CMS_USERNAME');
  if (!passwordHash) missing.push('CMS_PASSWORD_HASH');
  if (!sessionSecret) missing.push('CMS_SESSION_SECRET');

  if (missing.length > 0) {
    throw new Error(`Variabel environment CMS belum lengkap di Netlify / .env: ${missing.join(', ')}.`);
  }

  if (sessionSecret.length < 32) {
    throw new Error('CMS_SESSION_SECRET harus memiliki sedikitnya 32 karakter.');
  }

  return { username, passwordHash, sessionSecret };
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function sign(value: string, secret: string) {
  return createHmac('sha256', secret).update(value).digest('base64url');
}

export async function verifyLocalCredentials(username: string, password: string) {
  const env = getCmsEnv();
  const parts = env.passwordHash.split(':');
  if (parts.length !== 2) {
    throw new Error('CMS_PASSWORD_HASH tidak valid. Format harus salt:hex (dihasilkan dari npm run cms:hash-password).');
  }

  const [salt, expectedHex] = parts;
  if (!salt || !expectedHex || !/^[a-f0-9]{128}$/i.test(expectedHex)) {
    throw new Error('CMS_PASSWORD_HASH tidak valid. Pastikan hash 128 karakter heksadesimal.');
  }

  const actual = (await scrypt(password, salt, 64)) as Buffer;
  const expected = Buffer.from(expectedHex, 'hex');
  const usernameMatches = safeEqual(username.trim(), env.username);
  const passwordMatches = actual.length === expected.length && timingSafeEqual(actual, expected);
  return usernameMatches && passwordMatches;
}

export async function createCmsSession(username: string) {
  const { sessionSecret } = getCmsEnv();
  const payload: SessionPayload = { username: username.trim(), expiresAt: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, `${encoded}.${sign(encoded, sessionSecret)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
    priority: 'high',
  });
}

export async function deleteCmsSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  cookieStore.set(COOKIE_NAME, '', { maxAge: 0, path: '/' });
}

export async function getCmsSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const separator = token.lastIndexOf('.');
  if (separator < 1) return null;
  const encoded = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  try {
    const { sessionSecret } = getCmsEnv();
    if (!safeEqual(signature, sign(encoded, sessionSecret))) return null;
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString()) as SessionPayload;
    if (!payload.username || payload.expiresAt <= Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}