import 'server-only';
import { createHash, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

export const SESSION_COOKIE = 'owner_session';
/* Non-httpOnly hint so client components can show owner-only links
   without making public pages dynamic. Purely cosmetic: every admin
   route, action, and route handler is gated server-side. */
export const OWNER_HINT_COOKIE = 'jmb_owner';

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

function secretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('AUTH_SECRET must be set and at least 32 characters long');
  }
  return new TextEncoder().encode(secret);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Nothing is stored, so no slow hash is needed: both sides are hashed to
 * equal-length buffers for a constant-time comparison, and failures pay
 * a fixed delay to keep online guessing slow.
 */
export async function verifyPassword(candidate) {
  const expected = process.env.ADMIN_PASSWORD ?? '';
  const a = createHash('sha256').update(String(candidate ?? '')).digest();
  const b = createHash('sha256').update(expected).digest();
  const ok = expected.length > 0 && timingSafeEqual(a, b);
  if (!ok) await sleep(400);
  return ok;
}

const cookieBase = {
  sameSite: 'lax',
  path: '/',
  maxAge: SESSION_TTL_SECONDS,
  secure: process.env.NODE_ENV === 'production',
};

export async function createSession() {
  const token = await new SignJWT({ role: 'owner' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject('owner')
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(secretKey());

  const store = await cookies();
  store.set(SESSION_COOKIE, token, { ...cookieBase, httpOnly: true });
  store.set(OWNER_HINT_COOKIE, '1', { ...cookieBase, httpOnly: false });
}

export async function verifySessionToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      algorithms: ['HS256'],
    });
    return payload.sub === 'owner' ? payload : null;
  } catch {
    return null;
  }
}

export async function getSession() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export async function requireOwner() {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');
  return session;
}

export async function destroySession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  store.delete(OWNER_HINT_COOKIE);
}
