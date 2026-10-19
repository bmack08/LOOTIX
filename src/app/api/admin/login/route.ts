import { NextResponse } from 'next/server';
import { checkPassword, cookieValue, ADMIN_COOKIE, adminConfigured } from '@/lib/admin';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  // Fail closed and say so plainly: an unset ADMIN_PASSWORD is a deployment
  // problem, not a wrong password, and the two should not look alike.
  if (!adminConfigured()) {
    console.error('Admin login unavailable: ADMIN_PASSWORD is not set in this environment');
    return NextResponse.json(
      { ok: false, error: 'Admin access is not configured on this deployment.' },
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
  res.cookies.set(ADMIN_COOKIE, cookieValue(), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 12, // 12h
  });
  return res;
}
