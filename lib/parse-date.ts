/**
 * Parse date string to timestamp. Handles:
 * - ISO (YYYY-MM-DD)
 * - US format (M/D/YYYY, MM/DD/YYYY)
 * - EU format (D/M/YYYY when first number > 12)
 * Returns 0 for invalid/empty dates.
 * Safe for client components (no Node.js deps).
 */
export function parseDateToTimestamp(dateStr: string): number {
  const s = (dateStr ?? "").trim();
  if (!s) return 0;

  // ISO format YYYY-MM-DD
  const isoMatch = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (isoMatch) {
    const d = new Date(
      parseInt(isoMatch[1], 10),
      parseInt(isoMatch[2], 10) - 1,
      parseInt(isoMatch[3], 10)
    );
    return isNaN(d.getTime()) ? 0 : d.getTime();
  }

  // M/D/YYYY or D/M/YYYY
  const slashMatch = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (slashMatch) {
    const n1 = parseInt(slashMatch[1], 10);
    const n2 = parseInt(slashMatch[2], 10);
    const year = parseInt(slashMatch[3], 10);
    let month: number;
    let day: number;
    if (n1 > 12) {
      day = n1;
      month = n2 - 1;
    } else if (n2 > 12) {
      month = n1 - 1;
      day = n2;
    } else {
      month = n1 - 1;
      day = n2;
    }
    const d = new Date(year, month, day);
    return isNaN(d.getTime()) ? 0 : d.getTime();
  }

  const d = new Date(s);
  return isNaN(d.getTime()) ? 0 : d.getTime();
}
