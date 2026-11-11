/**
 * How many rows of a long list to draw. A list of hundreds of rows drawn at once holds the main thread for seconds on a
 * phone, so the first few are drawn with the page and the rest follow in groups while the browser is idle.
 */

/** Rows drawn with the page itself. */
export const FIRST_ROWS = 30
/** Rows added at each step. */
export const ROWS_PER_STEP = 40

/** The count after one more step: never past `total`, and `total` itself for a list that is no longer than the first rows. */
export function nextCount(count: number, total: number): number {
  return Math.min(total, Math.max(count, FIRST_ROWS) + (count < FIRST_ROWS ? 0 : ROWS_PER_STEP))
}
