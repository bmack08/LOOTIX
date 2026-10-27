'use client';

import { TRACKING_ENABLED } from '@/config/flags';
import { OPEN_PRIVACY_CHOICES_EVENT } from './Tracking';

/** Footer link that reopens the cookie banner. Renders nothing while tracking is off. */
export default function PrivacyChoicesLink({ className, style }: { className?: string; style?: React.CSSProperties }) {
  if (!TRACKING_ENABLED) return null;
  return (
    <button
      type="button"
      className={className}
      style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', ...style }}
      onClick={() => window.dispatchEvent(new Event(OPEN_PRIVACY_CHOICES_EVENT))}
    >
      Your Privacy Choices
    </button>
  );
}
