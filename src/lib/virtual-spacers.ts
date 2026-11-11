/**
 * The two empty rows that stand in for the rows of a long table that are not drawn. The rows are in the flow of the
 * table, so its semantics stay, and the spacers keep the scroll height the whole list would have.
 */

/** A row the virtualizer puts on screen: where it starts and ends, counted from the top of the scroll area. */
export interface Placed {
  start: number
  end: number
}

/**
 * The heights of the spacer above the first drawn row and the one below the last. `margin` is how far the list begins below
 * the top of the scroll area, `gap` the space the table leaves between rows (which it also leaves beside a spacer),
 * and `total` the height of the whole list.
 */
export function spacers(first: Placed | undefined, last: Placed | undefined, total: number, margin: number, gap: number): { top: number; bottom: number } {
  if (first === undefined || last === undefined) return { top: 0, bottom: 0 }
  return { top: Math.max(0, first.start - margin - gap), bottom: Math.max(0, total - (last.end - margin) - gap) }
}
