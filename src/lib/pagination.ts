export type PageItem = number | "gap"

/**
 * The page numbers to show: the first, the last, the current and the ones next to it, with a gap where pages are left out
 * (`1 … 4 5 6 … 12`). Always the same count of items where there are many pages, so the control does not jump about.
 */
export function pageWindow(current: number, total: number, around = 1): PageItem[] {
  if (total <= 1) return total === 1 ? [1] : []
  const page = Math.min(Math.max(1, Math.round(current)), total)
  const wanted = new Set([1, total, ...Array.from({ length: around * 2 + 1 }, (_, i) => page - around + i)].filter((n) => n >= 1 && n <= total))
  const sorted = [...wanted].sort((a, b) => a - b)
  const items: PageItem[] = []
  let previous = 0
  for (const n of sorted) {
    if (n - previous === 2) items.push(previous + 1)
    else if (n - previous > 2) items.push("gap")
    items.push(n)
    previous = n
  }
  return items
}
