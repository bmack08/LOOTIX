'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import { GIVEAWAY_ENABLED, TRACKING_ENABLED } from '@/config/flags';

// Consent-gated tracking (Legal 2026-10-27, privacy-pixels-staged):
// - Meta Pixel and TikTok Pixel load only after the visitor clicks Accept. Reject or no choice = no scripts.
// - A Global Privacy Control signal (navigator.globalPrivacyControl) blocks the pixels even after Accept.
// - The footer "Your Privacy Choices" link reopens the banner (window event below).
// - No pixel events on free-entry / mail-in pages; no advanced matching, no automatic form/button events.
// - Vercel Analytics (page views only, no cookies) runs whenever tracking is on, as the Privacy draft
//   lists it without a consent condition.

const STORAGE_KEY = 'lootix-cookie-consent';
export const OPEN_PRIVACY_CHOICES_EVENT = 'lootix:open-privacy-choices';
type Consent = 'accepted' | 'rejected' | null;

const META_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';
const TIKTOK_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || '';

/** Routes where no pixel event may fire: free-entry / mail-in instructions, giveaway pages, admin. */
export function isPixelExcluded(path: string): boolean {
  const p = path.replace(/\/+$/, '') || '/';
  const prefixes = ['/giveaways', '/current-giveaway', '/official-rules', '/admin', '/enter', '/mail-in', '/free-entry'];
  if (prefixes.some((x) => p === x || p.startsWith(x + '/'))) return true;
  // While the giveaway is on, the home sign-up form is a free online entry (sends email).
  if (GIVEAWAY_ENABLED && p === '/') return true;
  return false;
}

function gpcOn(): boolean {
  return typeof navigator !== 'undefined' && (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

type W = Window & { fbq?: any; _fbq?: any; ttq?: any; TiktokAnalyticsObject?: string };

function loadMeta(id: string) {
  const w = window as W;
  if (w.fbq) return;
  const n: any = function (...args: unknown[]) { n.callMethod ? n.callMethod(...args) : n.queue.push(args); };
  n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
  w.fbq = n; if (!w._fbq) w._fbq = n;
  const s = document.createElement('script'); s.async = true; s.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(s);
  w.fbq('set', 'autoConfig', false, id); // no automatic button/form events
  w.fbq('init', id); // no advanced matching data passed
}

function loadTikTok(id: string) {
  const w = window as W;
  if (w.ttq) return;
  w.TiktokAnalyticsObject = 'ttq';
  const ttq: any = (w.ttq = w.ttq || []);
  ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie', 'holdConsent', 'revokeConsent', 'grantConsent'];
  ttq.setAndDefer = (t: any, e: string) => { t[e] = (...a: unknown[]) => { t.push([e, ...a]); }; };
  ttq.methods.forEach((m: string) => ttq.setAndDefer(ttq, m));
  ttq.instance = (t: string) => { const e = ttq._i[t] || []; ttq.methods.forEach((m: string) => ttq.setAndDefer(e, m)); return e; };
  ttq.load = (e: string) => {
    const u = 'https://analytics.tiktok.com/i18n/pixel/events.js';
    ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = u; ttq._t = ttq._t || {}; ttq._t[e] = +new Date(); ttq._o = ttq._o || {}; ttq._o[e] = {};
    const s = document.createElement('script'); s.async = true; s.src = u + '?sdkid=' + e + '&lib=ttq';
    document.head.appendChild(s);
  };
  ttq.load(id);
}

export default function Tracking() {
  const pathname = usePathname() || '/';
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [gpc, setGpc] = useState(false);

  useEffect(() => {
    if (!TRACKING_ENABLED) return;
    let stored: Consent = null;
    try { const v = localStorage.getItem(STORAGE_KEY); if (v === 'accepted' || v === 'rejected') stored = v; } catch {}
    setConsent(stored);
    setGpc(gpcOn());
    setBannerOpen(stored === null);
    setReady(true);
    const open = () => setBannerOpen(true);
    window.addEventListener(OPEN_PRIVACY_CHOICES_EVENT, open);
    return () => window.removeEventListener(OPEN_PRIVACY_CHOICES_EVENT, open);
  }, []);

  const pixelsAllowed = TRACKING_ENABLED && ready && consent === 'accepted' && !gpc;

  // Load and fire PageView only on allowed routes. Scripts are never injected on an excluded route.
  useEffect(() => {
    if (!pixelsAllowed || isPixelExcluded(pathname)) return;
    const w = window as W;
    if (META_ID) { loadMeta(META_ID); w.fbq?.('track', 'PageView'); }
    if (TIKTOK_ID) { loadTikTok(TIKTOK_ID); w.ttq?.page?.(); }
  }, [pixelsAllowed, pathname]);

  if (!TRACKING_ENABLED) return null;

  const choose = (v: 'accepted' | 'rejected') => {
    try { localStorage.setItem(STORAGE_KEY, v); } catch {}
    const wasAccepted = consent === 'accepted';
    setConsent(v);
    setBannerOpen(false);
    // Withdrawing consent after scripts loaded: reload so no pixel code stays on the page.
    if (v === 'rejected' && wasAccepted && ((window as W).fbq || (window as W).ttq)) window.location.reload();
  };

  return (
    <>
      <Analytics />
      {ready && bannerOpen && (
        <div
          role="dialog"
          aria-label="Cookie choices"
          className="fixed z-50 text-parchment"
          style={{ left: 16, right: 16, bottom: 16, maxWidth: 560, margin: '0 auto', background: '#131009', border: '1px solid rgba(198,161,91,0.4)', borderRadius: 4, padding: '20px 22px' }}
        >
          <p className="m-0 text-sand" style={{ fontSize: 14, lineHeight: 1.6 }}>
            We use cookies to run the store. Ad tracking only loads if you accept.
          </p>
          {gpc && (
            <p className="m-0 text-stone" style={{ fontSize: 12, lineHeight: 1.6, marginTop: 8 }}>
              Your browser sends a Global Privacy Control signal, so advertising pixels stay off.
            </p>
          )}
          <div className="flex gap-3 flex-wrap" style={{ marginTop: 14 }}>
            {/* Accept and Decline: same class, size and weight - equally prominent, one click each. */}
            <button type="button" className="btn-brass" style={{ minWidth: 120 }} onClick={() => choose('accepted')}>Accept</button>
            <button type="button" className="btn-brass" style={{ minWidth: 120 }} onClick={() => choose('rejected')}>Decline</button>
          </div>
          <div className="flex gap-4 flex-wrap font-plex" style={{ marginTop: 12, fontSize: 12 }}>
            <button type="button" className="text-brass hover:text-brass-lit" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }} onClick={() => setBannerOpen(true)}>Your Privacy Choices</button>
            <a href="/privacy" className="text-brass hover:text-brass-lit">Privacy Policy</a>
          </div>
        </div>
      )}
    </>
  );
}
