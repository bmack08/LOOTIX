/**
 * Agreement record (Legal, 2026-10-24). Checkout and the sign-up form each show
 * a required box; the APIs reject a request unless `agreed === true`, and the
 * order / entry rows store when, which documents, and which box.
 * No IP address is stored. Bump a version when that document's text changes.
 */
export const TERMS_VERSION = 'terms-2026-10-24';
export const RULES_VERSION = 'rules-2026-10-24';

export type AgreementBox = 'checkout' | 'signup';

export type Agreement = {
  agreed_at: string;
  agreement_version: string;
  agreement_box: AgreementBox;
};

/** Checkout agrees to Terms + Rules; the sign-up box is Rules-only. */
export function makeAgreement(box: AgreementBox, at: Date = new Date()): Agreement {
  return {
    agreed_at: at.toISOString(),
    agreement_version: box === 'checkout' ? `${TERMS_VERSION}+${RULES_VERSION}` : RULES_VERSION,
    agreement_box: box,
  };
}

/** Read the agreement back out of Stripe session metadata (set by /api/checkout). */
export function agreementFromMetadata(md: Record<string, string> | null | undefined): Agreement | null {
  if (!md?.agreed_at || !md.agreement_version) return null;
  return {
    agreed_at: md.agreed_at,
    agreement_version: md.agreement_version,
    agreement_box: md.agreement_box === 'signup' ? 'signup' : 'checkout',
  };
}

export const AGREEMENT_COLUMNS = ['agreed_at', 'agreement_version', 'agreement_box'] as const;

/**
 * True when PostgREST rejected an insert because the agreement columns do not
 * exist yet (migration 20261024_agreement.sql not run). Callers then retry
 * without those columns so a sign-up or a paid order is never lost.
 */
export function isMissingAgreementColumn(status: number, bodyText: string): boolean {
  return (status === 400 || status === 404) && /agreed_at|agreement_version|agreement_box/.test(bodyText);
}

export function withoutAgreementColumns<T extends Record<string, unknown>>(row: T): T {
  const copy: Record<string, unknown> = { ...row };
  for (const c of AGREEMENT_COLUMNS) delete copy[c];
  return copy as T;
}