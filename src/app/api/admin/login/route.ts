import { NextResponse } from 'next/server';
import { adminConfigured, checkPassword, cookieValue, ADMIN_COOKIE } from '@/lib/admin';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  // No ADMIN_PASSWORD set → no admin login at all.
  if (!adminConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'Admin login is disabled: ADMIN_PASSWORD is not set on the server.' },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!checkPassword(body.password || '')) {
    return NextResponse.json({ ok: false, error: 'Wrong password.' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  // Signed token, not the password itself.
  res.cookies.set(ADMIN_COOKIE, cookieValue(), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 12, // 12h
  });
  return res;
}
