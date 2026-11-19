/** Deterministic sample data for the chart stories: the same picture every time, so a screenshot and a test agree. */
export function seeded(seed: number): () => number {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

export function sampleDays(): { date: string; value: number }[] {
  const random = seeded(7)
  const days: { date: string; value: number }[] = []
  for (let time = Date.UTC(2026, 0, 1); time <= Date.UTC(2026, 10, 15); time += 86_400_000) {
    const date = new Date(time)
    const weekday = (date.getUTCDay() + 6) % 7
    const quiet = random() < 0.25 + (weekday >= 5 ? 0 : 0.15)
    if (quiet && random() < 0.7) continue
    days.push({ date: date.toISOString().slice(0, 10), value: quiet ? 0 : Math.round(random() ** 2 * 60 * (weekday >= 5 ? 1.5 : 1)) })
  }
  return days
}

export function sampleLengths(count: number, mean: number, spread: number, seed: number): number[] {
  const random = seeded(seed)
  return Array.from({ length: count }, () => Math.max(1, Math.round(mean + (random() + random() + random() - 1.5) * spread)))
}
