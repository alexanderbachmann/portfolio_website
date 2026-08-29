import { NextResponse } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';

/* Gate for /admin/*. Defense in depth only: every server action and
   route handler re-checks the session with requireOwner(), because a
   proxy matcher never covers Server Function POSTs reliably. This file
   deliberately imports nothing from src/ (proxy runs in its own context),
   so the few constants below are kept in sync with src/lib/auth.js. */

const SESSION_COOKIE = 'owner_session';
const OWNER_HINT_COOKIE = 'jmb_owner';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;
/* Slide the session once it is a day old, so an owner who keeps writing
   never hits the hard expiry and silently loses the Write and Edit links. */
const REFRESH_AFTER_SECONDS = 60 * 60 * 24;

function secretKey() {
  const secret = process.env.AUTH_SECRET;
  /* Same rule as src/lib/auth.js. Accepting a shorter secret here would let
     the proxy and the app disagree about the very same cookie. */
  if (!secret || secret.length < 32) return null;
  return new TextEncoder().encode(secret);
}

async function readSession(request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const key = secretKey();
  if (!token || !key) return null;
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] });
    return payload.sub === 'owner' ? payload : null;
  } catch {
    return null;
  }
}

const isNavigation = (request) =>
  request.method === 'GET' || request.method === 'HEAD';

async function refreshed(request, response, payload) {
  /* Navigations only. Re-issuing on a POST would race the sign out action,
     which deletes both cookies on the very same response. */
  if (!isNavigation(request)) return response;

  const key = secretKey();
  const issuedAt = typeof payload?.iat === 'number' ? payload.iat : 0;
  const age = Math.floor(Date.now() / 1000) - issuedAt;
  if (!key || age < REFRESH_AFTER_SECONDS) return response;

  const token = await new SignJWT({ role: 'owner' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject('owner')
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(key);

  const base = {
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
    secure: process.env.NODE_ENV === 'production',
  };
  response.cookies.set(SESSION_COOKIE, token, { ...base, httpOnly: true });
  response.cookies.set(OWNER_HINT_COOKIE, '1', { ...base, httpOnly: false });
  return response;
}

export async function proxy(request) {
  const { pathname, search } = request.nextUrl;
  const session = await readSession(request);

  if (pathname === '/admin/login') {
    return session
      ? refreshed(
          request,
          NextResponse.redirect(new URL('/admin', request.url)),
          session
        )
      : NextResponse.next();
  }

  if (!session) {
    /* Server Actions POST to the route they were called from. A redirect
       preserves the method, so the action body would be resent to a route
       that cannot resolve it and the editor would throw with an unsaved
       draft on screen. Answer the POST here instead: the client shows the
       error and the draft survives. */
    if (!isNavigation(request)) {
      /* The content type must be exactly text/plain: Next only surfaces the
         body as the thrown Error message on that exact match, so the default
         text/plain;charset=UTF-8 would hide this sentence. */
      return new NextResponse('Your session expired. Sign in again.', {
        status: 401,
        headers: { 'content-type': 'text/plain' },
      });
    }
    const login = new URL('/admin/login', request.url);
    login.searchParams.set('next', pathname + search);
    return NextResponse.redirect(login);
  }

  return refreshed(request, NextResponse.next(), session);
}

export const config = {
  matcher: ['/admin/:path*'],
};
