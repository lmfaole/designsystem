/** The vertical offset of each name from its line's last point: above it, and a step further down for each name whose line ends within a twelfth of the range of the one above. */
export function nameOffsets(ends: readonly { name: string; last: number }[], range: number): Map<string, number> {
  const offsets = new Map<string, number>()
  let previous: { last: number; dy: number } | undefined
  for (const end of ends.toSorted((a, b) => b.last - a.last)) {
    const close = previous !== undefined && range > 0 && previous.last - end.last < range / 12
    const dy = close && previous !== undefined ? previous.dy + 14 : -8
    offsets.set(end.name, dy)
    previous = { last: end.last, dy }
  }
  return offsets
}
