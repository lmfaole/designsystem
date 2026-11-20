/** How a place in a ranking moved since the list before it. Never colour alone: `changeWords` says it. */
export type RankChange = { kind: "up" | "down"; by: number } | { kind: "same" } | { kind: "new" }

/** What a change says in words («Opp 3», «Ned 1», «Uendret», «Ny»); a move of nothing is «Uendret», however it was asked for. */
export function changeWords(change: RankChange): string {
  if (change.kind === "new") return "Ny"
  if (change.kind === "same" || !Number.isFinite(change.by) || Math.round(change.by) < 1) return "Uendret"
  return `${change.kind === "up" ? "Opp" : "Ned"} ${Math.round(change.by).toLocaleString("nb-NO")}`
}

/** The width of each row's bar as a whole percent of the largest amount; `null` for a row with no amount, and 0 for every row when the largest is nothing. */
export function barPercents(amounts: readonly (number | undefined)[]): (number | null)[] {
  const largest = Math.max(0, ...amounts.map((amount) => amount ?? 0))
  return amounts.map((amount) => (amount === undefined ? null : largest <= 0 ? 0 : Math.round((Math.min(Math.max(amount, 0), largest) / largest) * 100)))
}
