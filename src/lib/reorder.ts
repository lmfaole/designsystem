/**
 * Moving one item of a list a place up or down: what `ReorderList` does in the browser, and what the app's endpoint does without JavaScript. There each «Flytt opp» / «Flytt ned» is
 * a submit button `name="move" value="<id>:up|down"`, sent with the list's hidden field (the order as it stands, comma ids); the endpoint reads both, saves
 * `applyMove(order, move)` and redirects back to the settings page.
 */

export type MoveDirection = "up" | "down"

/** `"<id>:up"` or `"<id>:down"` read back; anything else is `null`. The id may itself hold a colon: the direction is after the last one. */
export function parseMove(move: string | null | undefined): { id: string; direction: MoveDirection } | null {
  if (move === null || move === undefined) return null
  const at = move.lastIndexOf(":")
  if (at <= 0) return null
  const id = move.slice(0, at)
  const direction = move.slice(at + 1)
  return direction === "up" || direction === "down" ? { id, direction } : null
}

/** The order with the item of `move` (`"<id>:up|down"`) one place up or down; unchanged (a copy) when the move is not understood, the id is not there, or it is already at that end. */
export function applyMove(order: readonly string[], move: string | null | undefined): string[] {
  const next = [...order]
  const parsed = parseMove(move)
  if (parsed === null) return next
  const from = next.indexOf(parsed.id)
  const to = parsed.direction === "up" ? from - 1 : from + 1
  if (from === -1 || to < 0 || to >= next.length) return next
  const [item] = next.splice(from, 1)
  if (item !== undefined) next.splice(to, 0, item)
  return next
}

/** The order with the item at `from` moved to `to` (a drag); unchanged (a copy) when either is outside the list. */
export function moveTo<T>(order: readonly T[], from: number, to: number): T[] {
  const next = [...order]
  if (from < 0 || from >= next.length || to < 0 || to >= next.length || from === to) return next
  const [item] = next.splice(from, 1)
  if (item !== undefined) next.splice(to, 0, item)
  return next
}
