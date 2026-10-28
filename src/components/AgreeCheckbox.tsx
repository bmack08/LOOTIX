'use client';

import Link from 'next/link';

/**
 * Agreement box shown before any submit that creates an order, a sign-up or an
 * entry (Legal, 2026-10-24). Unchecked by default; the caller keeps the state
 * and blocks its submit until it is checked.
 *
 * `rulesOnly` is for free-entry paths: the entrant agrees to the Official Rules
 * only. Buyers get the same box at checkout, so free entry never has a step
 * that buyers do not also face, and nothing here requires a purchase.
 */
export default function AgreeCheckbox({
  checked,
  onChange,
  rulesOnly = false,
  id = 'agree-terms',
  className,
  style,
  linkClassName = 'text-brass hover:text-brass-lit transition-colors underline',
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  rulesOnly?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  linkClassName?: string;
  disabled?: boolean;
}) {
  return (
    <label htmlFor={id} className={className} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer', ...style }}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        style={{ marginTop: 3, width: 16, height: 16, flex: '0 0 auto' }}
      />
      <span>
        I agree to the{' '}
        {rulesOnly ? null : (
          <>
            <Link href="/terms" target="_blank" className={linkClassName}>Terms of Use</Link>,{' '}
            <Link href="/privacy" target="_blank" className={linkClassName}>Privacy Policy</Link> and{' '}
          </>
        )}
        <Link href="/official-rules" target="_blank" className={linkClassName}>Official Rules</Link>
      </span>
    </label>
  );
}
