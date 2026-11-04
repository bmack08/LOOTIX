'use client';

// Sticky add-to-cart bar: appears once #pdp-add scrolls out of view and
// hides again when the footer comes in, so it never covers footer links.
// <768: size dropdown + Add to cart only (60px + safe area). >=768: name,
// colour/size/price and the button. With no size picked, Add opens the
// dropdown instead of adding.

import { useEffect, useRef, useState } from 'react';

export default function StickyBar({ title, detail, label, disabled, onAdd, sizes, size, sizeOk, onSize }: {
  title: string; detail: string; label: string; disabled: boolean; onAdd: () => boolean | void;
  sizes: readonly string[] | null; size: string | null; sizeOk: (s: string) => boolean; onSize: (s: string) => void;
}) {
  const [addGone, setAddGone] = useState(false);
  const [footerIn, setFooterIn] = useState(false);
  const sel = useRef<HTMLSelectElement>(null);
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
  useEffect(() => {
    document.documentElement.toggleAttribute('data-sticky-bar', show);
    return () => document.documentElement.removeAttribute('data-sticky-bar');
  }, [show]);

  const add = () => {
    if (sizes && !size && sel.current) {
      sel.current.focus();
      try { (sel.current as HTMLSelectElement & { showPicker?: () => void }).showPicker?.(); } catch { /* needs a user gesture in some browsers */ }
      return;
    }
    onAdd();
  };

  return (
    <div className="pdp-sticky" data-show={show || undefined} aria-hidden={!show}>
      <div className="pdp-sticky-text">
        <strong>{title}</strong>
        <span>{detail}</span>
      </div>
      {sizes ? (
        <label className="pdp-sticky-size">
          <span className="sr-only">Size</span>
          <select ref={sel} value={size ?? ''} onChange={(e) => onSize(e.target.value)} tabIndex={show ? 0 : -1} disabled={disabled}>
            <option value="" disabled>Size</option>
            {sizes.map((s) => (
              <option key={s} value={s} disabled={!sizeOk(s)}>{sizeOk(s) ? s : `${s} (sold out)`}</option>
            ))}
          </select>
        </label>
      ) : null}
      <button type="button" className="pdp-sticky-btn" disabled={disabled} onClick={add} tabIndex={show ? 0 : -1}>{label}</button>
    </div>
  );
}
