/** The texts the distribution and relation charts say about themselves when nobody has written better, in Norwegian. See `chart-summary.ts` for the simple ones. */
import { formatChartValue as fmt } from "./chart-format.ts"
import { dayName, type CalendarDay } from "./heatmap.ts"
import { type Bin, type FiveNumbers, type LinearFit, strengthWord } from "./stats.ts"

/** What a value counts: one word for every number («min»), or the singular and the plural («1 visning», «2 visninger»). */
export type Unit = string | { one: string; many: string }

/** The word for `n` of the unit; the plural for a word that has no singular given. */
export const unitWord = (n: number, unit: Unit): string => (typeof unit === "string" ? unit : n === 1 ? unit.one : unit.many)

export function summariseCalendar(days: readonly CalendarDay[], unit: Unit): string | null {
  if (days.length === 0) return null
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date))
  const total = sorted.reduce((sum, day) => sum + day.value, 0)
  const active = sorted.filter((day) => day.value > 0)
  const busiest = sorted.reduce((best, day) => (day.value > best.value ? day : best), sorted[0] ?? { date: "", value: 0 })
  const range = `${dayName(sorted[0]?.date ?? "")} til ${dayName(sorted.at(-1)?.date ?? "")}`
  const peak = busiest.value > 0 ? ` Travleste dag: ${dayName(busiest.date)} (${fmt(busiest.value)}).` : ""
  return `Kalenderdiagram, ${range}: ${fmt(total)} ${unitWord(total, unit)} på ${fmt(active.length)} av ${fmt(sorted.length)} dager.${peak}`
}

export function summariseHeatMatrix(cells: readonly { row: string; column: string; value: number | null }[], unit: Unit): string | null {
  const filled = cells.filter((cell): cell is { row: string; column: string; value: number } => cell.value !== null)
  const top = filled.reduce<(typeof filled)[number] | null>((best, cell) => (best === null || cell.value > best.value ? cell : best), null)
  if (top === null) return null
  return `Varmekart over ${fmt(filled.length)} ruter. Høyest: ${top.row}, ${top.column} (${fmt(top.value)} ${unitWord(top.value, unit)}).`
}

export function summariseScatter(fit: LinearFit | null, n: number, xName: string, yName: string): string | null {
  if (n === 0) return null
  if (fit === null) return `Punktdiagram med ${fmt(n)} punkter: ${yName} mot ${xName}.`
  const direction = fit.slope > 0 ? "høyere" : "lavere"
  return `Punktdiagram med ${fmt(n)} punkter: ${yName} mot ${xName}. Trendlinjen går mot ${direction} ${yName} når ${xName} øker, ${strengthWord(fit.r2)} (r² = ${fmt(Math.round(fit.r2 * 100) / 100)}). En sammenheng er ikke det samme som en årsak.`
}

export function summariseHistogram(bins: readonly Bin[], n: number, median: number | null, unit: string): string | null {
  if (n === 0 || median === null) return null
  const tallest = bins.reduce((best, bin) => (bin.count > best.count ? bin : best), bins[0] ?? { from: 0, to: 0, count: 0 })
  return `Histogram over ${fmt(n)} verdier. Median ${fmt(median)} ${unit}. Flest verdier ligger mellom ${fmt(tallest.from)} og ${fmt(tallest.to)} ${unit} (${fmt(tallest.count)}).`.replace(" .", ".")
}

export function summariseBoxes(groups: readonly { name: string; summary: FiveNumbers | null }[], unit: string): string | null {
  const filled = groups.filter((group): group is { name: string; summary: FiveNumbers } => group.summary !== null)
  if (filled.length === 0) return null
  const highest = filled.reduce((best, group) => (group.summary.median > best.summary.median ? group : best), filled[0] as (typeof filled)[number])
  const outliers = filled.reduce((sum, group) => sum + group.summary.outliers.length, 0)
  const tail = outliers > 0 ? ` ${fmt(outliers)} verdier ligger utenfor strekene.` : ""
  return `Boksdiagram for ${fmt(filled.length)} grupper. Høyest median: ${highest.name} (${fmt(highest.summary.median)} ${unit}).${tail}`
}

export function summariseDumbbell(rows: readonly { label: string; from: number; to: number }[], fromLabel: string, toLabel: string): string | null {
  if (rows.length === 0) return null
  const change = (row: { from: number; to: number }) => row.to - row.from
  const biggest = rows.reduce((best, row) => (Math.abs(change(row)) > Math.abs(change(best)) ? row : best), rows[0] as (typeof rows)[number])
  const up = rows.filter((row) => change(row) > 0).length
  const down = rows.filter((row) => change(row) < 0).length
  return `Endring fra ${fromLabel} til ${toLabel}: ${fmt(up)} opp, ${fmt(down)} ned. Størst endring: ${biggest.label} (${change(biggest) > 0 ? "+" : ""}${fmt(change(biggest))}).`
}
