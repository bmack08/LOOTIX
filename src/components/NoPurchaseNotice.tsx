import Link from 'next/link';
import { NO_PURCHASE_LINE, FREE_ENTRY_HREF, FREE_ENTRY_LINK_TEXT, ODDS_LEAD } from '@/config/giveaway';

/**
 * The standard no-purchase disclosure + a link to the free mail-in entry
 * method. One component so the required wording exists in exactly one place
 * (NO_PURCHASE_LINE in src/config/giveaway.ts) and can never drift between
 * pages.
 *
 * Use it wherever entries are mentioned to the public. Styling is the caller's
 * job — pass `className`/`style` to match the surrounding fine print, and
 * `linkClassName`/`linkStyle` for the inverted cream sections where the brass
 * link colour is unreadable.
 *
 * `linkLead` makes the lead "No purchase necessary" itself the link to the
 * free-entry rules (Legal's wording for the per-dollar cue pairs) instead of
 * appending the separate "Free entry by mail" link.
 *
 * `children` is appended after the line and the link, for the page-specific
 * tail that usually follows ("18+ only, void where prohibited." etc).
 */
export default function NoPurchaseNotice({
  as: Tag = 'p',
  line = NO_PURCHASE_LINE,
  className,
  style,
  linkClassName = 'text-brass hover:text-brass-lit transition-colors',
  linkStyle,
  linkLead = false,
  children,
}: {
  as?: 'p' | 'span' | 'div';
  /** Odds wording to print; defaults to the standard line. */
  line?: string;
  className?: string;
  style?: React.CSSProperties;
  linkClassName?: string;
  linkStyle?: React.CSSProperties;
  linkLead?: boolean;
  children?: React.ReactNode;
}) {
  if (linkLead && line.startsWith(ODDS_LEAD)) {
    return (
      <Tag className={className} style={style}>
        <Link href={FREE_ENTRY_HREF} className={linkClassName} style={linkStyle}>
          {ODDS_LEAD}
        </Link>
        {line.slice(ODDS_LEAD.length)}
        {children ? <> {children}</> : null}
      </Tag>
    );
  }
  return (
    <Tag className={className} style={style}>
      {line}{' '}
      <Link href={FREE_ENTRY_HREF} className={linkClassName} style={linkStyle}>
        {FREE_ENTRY_LINK_TEXT}
      </Link>
      .{children ? <> {children}</> : null}
    </Tag>
  );
}
