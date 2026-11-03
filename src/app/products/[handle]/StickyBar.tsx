'use client';

// Sticky add-to-cart bar: appears once #pdp-add scrolls out of view and
// hides again when the footer comes in, so it never covers footer links.

import { useEffect, useState } from 'react';

export default function StickyBar({ title, detail, label, disabled, onAdd }: {
  title: string; detail: string; label: string; disabled: boolean; onAdd: () => void;
}) {
  const [addGone, setAddGone] = useState(false);
  const [footerIn, setFooterIn] = useState(false);
  useEffect(() => {
    const btn = document.getElementById('pdp-add');
    const foot = document.querySelector('footer');
    const io = new IntersectionObserver((es) => {
      for (const e of es) {
        if (e.target === btn) setAddGone(!e.isIntersecting && e.boundingClientRect.top < 0);
        else setFooterIn(e.isIntersecting);
      }
    });
    if (btn) io.observe(btn);
    if (foot) io.observe(foot);
    return () => io.disconnect();
  }, []);
  const show = addGone && !footerIn;
  return (
    <div className="pdp-sticky" data-show={show || undefined} aria-hidden={!show}>
      <div className="pdp-sticky-text">
        <strong>{title}</strong>
        <span>{detail}</span>
      </div>
      <button type="button" className="pdp-sticky-btn" disabled={disabled} onClick={onAdd} tabIndex={show ? 0 : -1}>{label}</button>
    </div>
  );
}
