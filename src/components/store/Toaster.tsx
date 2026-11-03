'use client';

// Shared toast + polite live region for wishlist changes ('lootix:toast').

import { useEffect, useRef, useState } from 'react';

export default function Toaster() {
  const [msg, setMsg] = useState('');
  const [show, setShow] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    const on = (e: Event) => {
      const m = String((e as CustomEvent).detail ?? '');
      setMsg(m.startsWith('Saved') ? 'Saved' : m.startsWith('Removed') ? 'Removed' : m);
      setShow(true);
      clearTimeout(t.current);
      t.current = setTimeout(() => setShow(false), 2000);
      const live = document.getElementById('toast-live');
      if (live) live.textContent = m;
    };
    window.addEventListener('lootix:toast', on);
    return () => window.removeEventListener('lootix:toast', on);
  }, []);
  return (
    <>
      <div className="toast" data-show={show || undefined} aria-hidden="true">{msg}</div>
      <p id="toast-live" className="sr-only" role="status" aria-live="polite" />
    </>
  );
}
