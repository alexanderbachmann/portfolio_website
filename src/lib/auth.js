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
  /* Trimmed on both sides: a password pasted into the Vercel dashboard or
     typed into the form often carries a trailing newline or space, which
     would otherwise present as a permanent, undiagnosable wrong password. */
  const expected = (process.env.ADMIN_PASSWORD ?? '').trim();
  const a = createHash('sha256').update(String(candidate ?? '').trim()).digest();
  const b = createHash('sha256').update(expected).digest();
  const ok = expected.length > 0 && timingSafeEqual(a, b);
  if (!ok) await sleep(400);
  return ok;
}

/* Best effort brake on password guessing, now that the footer links to the
   sign in page. Serverless instances are short lived and not shared, so
   this is a speed bump; the real defences are the password itself and the
   fixed delay above. */
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 8;
const MAX_TRACKED_CLIENTS = 500;
const failures = new Map();

/* Expired entries first, then oldest first if a burst of distinct clients
   (a spoofed x-forwarded-for, say) is arriving faster than the window
   retires them. Map preserves insertion order, so the first keys are the
   oldest. Without the second pass the map would grow without bound and
   every attempt would pay a full scan. */
function pruneFailures(now) {
  for (const [key, entry] of failures) {
    if (now - entry.first > LOCKOUT_WINDOW_MS) failures.delete(key);
  }
  for (const key of failures.keys()) {
    if (failures.size <= MAX_TRACKED_CLIENTS) break;
    failures.delete(key);
  }
}

/** Milliseconds left on the lockout for this client, or 0 if not locked. */
export function loginLockRemainingMs(key) {
  const entry = failures.get(key);
  if (!entry) return 0;
  const elapsed = Date.now() - entry.first;
  if (elapsed > LOCKOUT_WINDOW_MS) {
    failures.delete(key);
    return 0;
  }
  return entry.count >= MAX_FAILURES ? LOCKOUT_WINDOW_MS - elapsed : 0;
}

export function recordLoginFailure(key) {
  const now = Date.now();
  if (failures.size > MAX_TRACKED_CLIENTS) pruneFailures(now);
  const entry = failures.get(key);
  if (!entry || now - entry.first > LOCKOUT_WINDOW_MS) {
    failures.set(key, { count: 1, first: now });
    return;
  }
  entry.count += 1;
}

export function clearLoginFailures(key) {
  failures.delete(key);
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
