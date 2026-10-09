/**
 * Contest time handling.
 *
 * The giveaway close time is authored as a *naive* wall-clock string
 * ("2026-10-12T20:00:00") and is always meant as Eastern Time, because the
 * Official Rules name ET as the official timekeeper for every deadline.
 *
 * `new Date('2026-10-12T20:00:00')` does NOT mean that. With no offset in the
 * string, ECMAScript parses a date-time form in the *runtime's* zone — UTC on
 * Vercel, the visitor's own zone in the browser. The countdown therefore
 * resolved to a different real instant for every viewer: a visitor in Los
 * Angeles counted down to 8:00 PM PT, three hours after the contest actually
 * closed, and the server rendered a third value again.
 *
 * These helpers resolve the string against America/New_York so every surface —
 * server or client, any visitor zone — lands on the same instant and picks up
 * EDT/EST automatically.
 */

export const CONTEST_TIME_ZONE = 'America/New_York';

const NAIVE_ISO = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?)?$/;

/**
 * The UTC offset, in ms, that `timeZone` was observing at the instant `utcMs`.
 * EDT yields -14_400_000; EST yields -18_000_000.
 */
function zoneOffsetMs(utcMs: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(new Date(utcMs));

  const read = (type: string) => {
    const part = parts.find((p) => p.type === type);
    if (!part) throw new Error(`Missing "${type}" from Intl parts for ${timeZone}`);
    return Number(part.value);
  };

  // Some engines emit hour 24 for midnight under hour12:false.
  const hour = read('hour') % 24;
  const asIfUTC = Date.UTC(read('year'), read('month') - 1, read('day'), hour, read('minute'), read('second'));
  return asIfUTC - utcMs;
}

/**
 * Epoch ms for a naive wall-clock string interpreted in Eastern Time.
 *
 *   etWallClockToEpochMs('2026-10-12T20:00:00')
 *     → 8:00 PM EDT → 2026-10-13T00:00:00Z
 */
export function etWallClockToEpochMs(naiveISO: string): number {
  const m = NAIVE_ISO.exec(naiveISO.trim());
  if (!m) throw new Error(`Expected a naive "YYYY-MM-DDTHH:mm[:ss]" datetime, got: ${naiveISO}`);

  const wallAsUTC = Date.UTC(
    Number(m[1]),
    Number(m[2]) - 1,
    Number(m[3]),
    m[4] ? Number(m[4]) : 0,
    m[5] ? Number(m[5]) : 0,
    m[6] ? Number(m[6]) : 0,
  );

  // Subtracting the offset converts wall-clock to the real instant. Resolve
  // twice so a first guess that lands on the far side of a DST transition is
  // corrected by the offset actually in force at the resulting instant.
  const firstPass = wallAsUTC - zoneOffsetMs(wallAsUTC, CONTEST_TIME_ZONE);
  return wallAsUTC - zoneOffsetMs(firstPass, CONTEST_TIME_ZONE);
}

/** Formats an instant in Eastern Time, so the rendered date never shifts by zone. */
export function formatInET(epochMs: number, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-US', { ...options, timeZone: CONTEST_TIME_ZONE }).format(epochMs);
}
