import 'server-only';

import { createHmac, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { cookies } from 'next/headers';

const scrypt = promisify(scryptCallback);
const COOKIE_NAME = 'cms_session';
const SESSION_MAX_AGE = 60 * 60 * 8;

type SessionPayload = { username: string; expiresAt: number };

function getCmsEnv() {
  const username = process.env.CMS_USERNAME;
  const passwordHash = process.env.CMS_PASSWORD_HASH;
  const sessionSecret = process.env.CMS_SESSION_SECRET;
  if (!username || !passwordHash || !sessionSecret) throw new Error('Konfigurasi akun lokal CMS belum lengkap. Periksa .env.local.');
  if (sessionSecret.length < 32) throw new Error('CMS_SESSION_SECRET harus memiliki sedikitnya 32 karakter.');
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
  const [salt, expectedHex] = env.passwordHash.split(':');
  if (!salt || !expectedHex || !/^[a-f0-9]{128}$/i.test(expectedHex)) throw new Error('CMS_PASSWORD_HASH tidak valid. Buat hash dengan npm run cms:hash-password.');
  const actual = (await scrypt(password, salt, 64)) as Buffer;
  const expected = Buffer.from(expectedHex, 'hex');
  const usernameMatches = safeEqual(username, env.username);
  const passwordMatches = timingSafeEqual(actual, expected);
  return usernameMatches && passwordMatches;
}

export async function createCmsSession(username: string) {
  const { sessionSecret } = getCmsEnv();
  const payload: SessionPayload = { username, expiresAt: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  (await cookies()).set(COOKIE_NAME, `${encoded}.${sign(encoded, sessionSecret)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/cms',
    maxAge: SESSION_MAX_AGE,
    priority: 'high',
  });
}

export async function deleteCmsSession() {
  (await cookies()).delete(COOKIE_NAME);
}

export async function getCmsSession(): Promise<SessionPayload | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
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