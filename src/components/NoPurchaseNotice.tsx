import Link from 'next/link';
import { NO_PURCHASE_LINE, FREE_ENTRY_HREF, FREE_ENTRY_LINK_TEXT } from '@/config/giveaway';

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
 * `children` is appended after the line and the link, for the page-specific
 * tail that usually follows ("18+ only, void where prohibited." etc).
 */
export default function NoPurchaseNotice({
  as: Tag = 'p',
  className,
  style,
  linkClassName = 'text-brass hover:text-brass-lit transition-colors',
  linkStyle,
  children,
}: {
  as?: 'p' | 'span' | 'div';
  className?: string;
  style?: React.CSSProperties;
  linkClassName?: string;
  linkStyle?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  return (
    <Tag className={className} style={style}>
      {NO_PURCHASE_LINE}{' '}
      <Link href={FREE_ENTRY_HREF} className={linkClassName} style={linkStyle}>
        {FREE_ENTRY_LINK_TEXT}
      </Link>
      .{children ? <> {children}</> : null}
    </Tag>
  );
}
