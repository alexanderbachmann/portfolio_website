import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

/* Gate for /admin/*. Defense in depth only: every server action and
   route handler re-checks the session with requireOwner(), because a
   proxy matcher never covers Server Function POSTs reliably. This file
   deliberately imports nothing from src/ (proxy runs in its own context). */

const SESSION_COOKIE = 'owner_session';

async function isOwner(request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const secret = process.env.AUTH_SECRET;
  if (!token || !secret) return false;
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
      { algorithms: ['HS256'] }
    );
    return payload.sub === 'owner';
  } catch {
    return false;
  }
}

export async function proxy(request) {
  const { pathname, search } = request.nextUrl;
  const ok = await isOwner(request);

  if (pathname === '/admin/login') {
    return ok
      ? NextResponse.redirect(new URL('/admin', request.url))
      : NextResponse.next();
  }

  if (!ok) {
    const login = new URL('/admin/login', request.url);
    login.searchParams.set('next', pathname + search);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
