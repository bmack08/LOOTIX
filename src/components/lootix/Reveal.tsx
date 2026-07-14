'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Restrained scroll reveal — rise-in 0.7s ease, once, on enter.
 * Honors prefers-reduced-motion (renders visible, no transform).
 * This is the site's core motion primitive per the design system:
 * "Rise-in 0.7–0.9s. No pulsing / neon glow."
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as any;
  return (
    <Comp
      ref={ref as any}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Comp>
  );
}
