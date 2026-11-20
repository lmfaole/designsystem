import type { IconName } from "./icons.ts"
import { readSymbol } from "./weather-mood.ts"

/** One hour of a forecast: when it starts (ISO), the temperature then (°C), the precipitation in the hour (mm) and Yr's `symbol_code` for it. */
export interface MeteogramHour {
  time: string
  temperature: number
  precipitation: number
  symbol?: string
}

/** A value axis: its bottom and top, and the values that get a line and a label. */
export interface MeteogramScale {
  min: number
  max: number
  ticks: number[]
}

const ZONE = "Europe/Oslo"
const HOUR = new Intl.DateTimeFormat("nb-NO", { hour: "2-digit", hourCycle: "h23", timeZone: ZONE })
const CLOCK = new Intl.DateTimeFormat("nb-NO", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: ZONE })
const DAY = new Intl.DateTimeFormat("nb-NO", { weekday: "short", timeZone: ZONE })
const DATE = new Intl.DateTimeFormat("nb-NO", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: ZONE })
const DEGREES = new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 })
const MILLIMETRES = new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 1 })

/** The hour on the axis, «14», in Oslo's time. */
export const formatHour = (time: string): string => HOUR.format(new Date(time))
/** The time in the table, «14:00», with the day («fre. 14:00») when the forecast runs over more than one. */
export const formatClock = (time: string, withDay = false): string => (withDay ? `${DAY.format(new Date(time))} ${CLOCK.format(new Date(time))}` : CLOCK.format(new Date(time)))
/** The short name of the day of a time, «fre.», in Oslo. */
export const formatDay = (time: string): string => DAY.format(new Date(time))
/** The day of a time in Oslo, to tell when a new day starts. */
export const dayOf = (time: string): string => DATE.format(new Date(time))
/** A temperature as Yr writes it, whole degrees with a real minus: «−3°» (and never «−0°»). */
export const formatTemperature = (value: number): string => `${DEGREES.format(Math.round(value) === 0 ? 0 : value)}°`
/** Precipitation in millimetres, one decimal at most: «0,4 mm». */
export const formatPrecipitation = (value: number): string => `${MILLIMETRES.format(value)}\u00a0mm`

const STEPS = [1, 2, 5, 10, 20, 50] as const

/** The smallest of the round steps that cuts `range` into at most `parts`. */
function stepFor(range: number, parts: number): number {
  return STEPS.find((step) => range / step <= parts) ?? 100
}

/**
 * The temperature axis: round whole degrees around the lowest and the highest with a step that gives three to five lines, at least 4° tall so a calm day does
 * not look stormy. Zero is a tick whenever it is inside, so the line where frost begins is always drawn.
 */
export function temperatureScale(values: readonly number[]): MeteogramScale {
  const low = Math.min(...values)
  const high = Math.max(...values)
  const middle = (low + high) / 2
  const [from, to] = high - low < 4 ? [middle - 2, middle + 2] : [low, high]
  const step = stepFor(to - from, 4)
  const min = Math.floor(from / step) * step
  const top = Math.ceil(to / step) * step
  const max = top === min ? min + step : top
  const ticks: number[] = []
  for (let tick = min; tick <= max; tick += step) ticks.push(tick)
  return { min, max, ticks }
}

/** The precipitation axis: from zero (a bar starts at zero) to a round top of at least 1 mm, so a drizzle of 0,1 mm stays a small bar. */
export function precipitationScale(values: readonly number[]): MeteogramScale {
  const high = Math.max(1, ...values)
  const step = stepFor(high, 1)
  const max = Math.ceil(high / step) * step
  return { min: 0, max, ticks: [0, max] }
}

/** Where a value stands on a scale, from the top: 0 at `max`, 100 at `min` (a percentage of the band's height). */
export function fromTop(value: number, scale: { min: number; max: number }): number {
  return ((scale.max - value) / (scale.max - scale.min)) * 100
}

/** Where the zero line stands (from the top, in percent) when the axis crosses or touches zero; nothing when it is all above or all below, and then one colour draws the whole line. */
export function zeroLine(scale: { min: number; max: number }): number | null {
  return scale.min <= 0 && scale.max >= 0 ? fromTop(0, scale) : null
}

/** The hours that get a symbol and a label: every `every`th, from the first. */
export function everyNth(count: number, every: number): number[] {
  const step = Math.max(1, Math.round(every))
  return Array.from({ length: Math.ceil(count / step) }, (_, index) => index * step)
}

/** The icon of a weather, by its meaning: the sun or the moon when clear, the cloud with the sun or the moon when partly cloudy. */
export function symbolIcon(code: string): IconName {
  const { kind, period } = readSymbol(code)
  switch (kind) {
    case "clear":
      return period === "day" ? "sun" : "moon"
    case "partly":
      return period === "day" ? "weather" : "weather-night"
    case "cloudy":
      return "clouds"
    default:
      return kind
  }
}

const FIXED: Readonly<Record<string, string>> = { clearsky: "Klarvær", fair: "Lettskyet", partlycloudy: "Delvis skyet", cloudy: "Skyet", fog: "Tåke" }
const FALLING: readonly (readonly [kind: string, noun: string, showers: string])[] = [
  ["sleet", "sludd", "sluddbyger"],
  ["snow", "snø", "snøbyger"],
  ["rain", "regn", "regnbyger"],
]

/** What a `symbol_code` says, in words as Yr says them: «Klarvær», «Delvis skyet», «Lette regnbyger», «Kraftig snø og torden». */
export function describeSymbol(code: string): string {
  const base = code.replace(/_(day|night|polartwilight)$/, "")
  const plain = FIXED[base]
  if (plain !== undefined) return plain
  const thunder = base.includes("thunder")
  const falling = FALLING.find(([kind]) => base.includes(kind))
  if (falling === undefined) return thunder ? "Torden" : "Skyet"
  const showers = base.includes("showers")
  const noun = showers ? falling[2] : falling[1]
  const strength = base.startsWith("light") ? (showers ? "lette " : "lett ") : base.startsWith("heavy") ? (showers ? "kraftige " : "kraftig ") : ""
  const text = `${strength}${noun}${thunder ? " og torden" : ""}`
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * The meteogram's summary in words, for everyone under it: the range of the temperature with when it is lowest and highest, and the precipitation in all with
 * its wettest hour, or that none falls.
 */
export function summariseMeteogram(hours: readonly MeteogramHour[]): string | null {
  const first = hours[0]
  if (first === undefined) return null
  const coldest = hours.reduce((low, hour) => (hour.temperature < low.temperature ? hour : low), first)
  const warmest = hours.reduce((high, hour) => (hour.temperature > high.temperature ? hour : high), first)
  const wettest = hours.reduce((most, hour) => (hour.precipitation > most.precipitation ? hour : most), first)
  const total = hours.reduce((sum, hour) => sum + hour.precipitation, 0)
  const many = hours.some((hour) => dayOf(hour.time) !== dayOf(first.time))
  const at = (hour: MeteogramHour): string => (many ? `${formatDay(hour.time)} kl. ${formatClock(hour.time)}` : `kl. ${formatClock(hour.time)}`)
  const temperature =
    formatTemperature(coldest.temperature) === formatTemperature(warmest.temperature)
      ? `${formatTemperature(coldest.temperature)} hele perioden.`
      : `Fra ${formatTemperature(coldest.temperature)} ${at(coldest)} til ${formatTemperature(warmest.temperature)} ${at(warmest)}.`
  const precipitation = total > 0 ? `${formatPrecipitation(total)} nedbør i alt, mest ${at(wettest)} (${formatPrecipitation(wettest.precipitation)}).` : "Ingen nedbør."
  return `${temperature} ${precipitation}`
}
