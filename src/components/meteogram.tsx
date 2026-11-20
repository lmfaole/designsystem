import { useId } from "react"

import { EMPTY_CHART_MESSAGE } from "../lib/chart-format"
import {
  type MeteogramHour,
  dayOf,
  describeSymbol,
  everyNth,
  formatClock,
  formatDay,
  formatHour,
  formatPrecipitation,
  formatTemperature,
  fromTop,
  precipitationScale,
  summariseMeteogram,
  symbolIcon,
  temperatureScale,
  zeroLine,
} from "../lib/meteogram"
import { ChartEmpty } from "./chart-empty"
import { ChartSummary } from "./chart-summary"
import { ChartTable } from "./chart-table"
import { Icon } from "./icon"
import { Text } from "./text"

interface MeteogramProps {
  /** One entry per hour, in order: when it starts (ISO), the temperature (°C), the precipitation in the hour (mm) and Yr's `symbol_code`. */
  hours: readonly MeteogramHour[]
  /** Names the chart for a screen reader: «Været i Oslo de neste 24 timene». */
  ariaLabel: string
  /** A symbol and an hour label every this many hours; 3 by default. */
  symbolEvery?: number
  /** A text that says what it shows; by default the range of the temperature and the precipitation in all (`summariseMeteogram`). */
  summary?: string
  /** Offer every hour as a table anyone can open («Vis tallene»), not only a screen reader. */
  showTable?: boolean
  /** What it says when there are no hours; «Ingen data i denne perioden.» by default. */
  emptyMessage?: string
}

const TEMPERATURE_HEIGHT = 160
const PRECIPITATION_HEIGHT = 56
const HEIGHT = TEMPERATURE_HEIGHT + PRECIPITATION_HEIGHT + 84
// The rain's colour on a `WeatherStage`, the token elsewhere.
const RAIN = "var(--weather-rain, var(--precipitation))"
// Past this many labels in a row, every other is left out in a narrow room (the table has every hour).
const CROWDED = 8

/** A label or a symbol that is left out every other time when the room is narrow and the row is crowded. */
const thin = (position: number, count: number): string => (count > CROWDED && position % 2 === 1 ? "@max-[32rem]:hidden" : "")

/**
 * The weather hour by hour on one time axis (a meteogram, as Yr and meteoblue draw it): the sky as a symbol every few hours on top, the temperature as a line
 * in the middle, warm above 0° and cold below it with the zero line drawn, and the precipitation as columns at the foot, each band with its own scale. The
 * colour is never the only cue: the zero line and the signed degrees on the axis say which side of frost a value is. A plain `<svg>` and positioned text,
 * rendered on the server; it takes the width of its room and keeps its text at its size, with fewer labels where the room is narrow. Under it a summary,
 * and every hour (time, weather, temperature, precipitation) as a table. For one value over time it is an `AreaChart`; for the weather now, a `WeatherStage`.
 */
export function Meteogram({ hours, ariaLabel, symbolEvery = 3, summary, showTable = false, emptyMessage = EMPTY_CHART_MESSAGE }: MeteogramProps) {
  const id = useId()
  if (hours.length === 0) return <ChartEmpty height={HEIGHT} message={emptyMessage} />
  const count = hours.length
  const left = (index: number): string => `${((index + 0.5) / count) * 100}%`
  const temperature = temperatureScale(hours.map((hour) => hour.temperature))
  const precipitation = precipitationScale(hours.map((hour) => hour.precipitation))
  const zero = zeroLine(temperature)
  const dry = hours.every((hour) => hour.precipitation <= 0)
  const marked = everyNth(count, symbolEvery)
  const firstDay = dayOf(hours[0]?.time ?? "")
  const days = hours.flatMap((hour, index) => (index === 0 || dayOf(hour.time) !== dayOf(hours[index - 1]?.time ?? "") ? [index] : []))
  const manyDays = hours.some((hour) => dayOf(hour.time) !== firstDay)
  const points = hours.map((hour, index) => `${index + 0.5},${fromTop(hour.temperature, temperature).toFixed(2)}`).join(" ")
  const warm = `${id}-warm`
  const cold = `${id}-cold`
  const text = summary ?? summariseMeteogram(hours)
  const line = (stroke: string, clip?: string) => (
    <polyline points={points} fill="none" stroke={stroke} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" {...(clip === undefined ? {} : { clipPath: `url(#${clip})` })} />
  )
  const dayLines = days.filter((index) => index > 0).map((index) => <line key={index} x1={index} x2={index} y1={0} y2={100} stroke="var(--border)" strokeWidth={1} vectorEffect="non-scaling-stroke" />)
  return (
    <div className="@container grid gap-3">
      <div role="img" aria-label={ariaLabel} className="text-muted-foreground grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-2 text-xs tabular-nums">
        {manyDays ? (
          <>
            <span />
            <div className="relative h-5" aria-hidden>
              {days.map((index) => (
                <span key={index} className="text-foreground absolute top-0 font-medium" style={{ left: `${(index / count) * 100}%` }}>
                  {formatDay(hours[index]?.time ?? "")}
                </span>
              ))}
            </div>
          </>
        ) : null}
        <span />
        <div className="text-foreground relative h-8" aria-hidden>
          {marked.map((index, position) => {
            const symbol = hours[index]?.symbol
            return symbol === undefined ? null : (
              <span key={index} className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 ${thin(position, marked.length)}`} style={{ left: left(index) }}>
                <Icon name={symbolIcon(symbol)} size="lg" />
              </span>
            )
          })}
        </div>
        <div className="relative" style={{ height: TEMPERATURE_HEIGHT }} aria-hidden>
          {temperature.ticks.map((tick) => (
            <span key={tick} className={`absolute right-0 -translate-y-1/2 ${tick === 0 ? "text-foreground" : ""}`} style={{ top: `${fromTop(tick, temperature)}%` }}>
              {formatTemperature(tick)}
            </span>
          ))}
        </div>
        <svg className="block w-full overflow-visible" style={{ height: TEMPERATURE_HEIGHT }} viewBox={`0 0 ${count} 100`} preserveAspectRatio="none" aria-hidden>
          {temperature.ticks.map((tick) =>
            tick === 0 ? null : <line key={tick} x1={0} x2={count} y1={fromTop(tick, temperature)} y2={fromTop(tick, temperature)} stroke="var(--border)" strokeWidth={1} vectorEffect="non-scaling-stroke" />,
          )}
          {dayLines}
          {zero === null ? (
            line(temperature.max <= 0 ? "var(--temperature-cold)" : "var(--temperature-warm)")
          ) : (
            <>
              <defs>
                <clipPath id={warm}>
                  <rect x={-1} y={-10} width={count + 2} height={zero + 10} />
                </clipPath>
                <clipPath id={cold}>
                  <rect x={-1} y={zero} width={count + 2} height={110 - zero} />
                </clipPath>
              </defs>
              <line x1={0} x2={count} y1={zero} y2={zero} stroke="var(--muted-foreground)" strokeWidth={1.5} strokeDasharray="4 3" vectorEffect="non-scaling-stroke" />
              {line("var(--temperature-warm)", warm)}
              {line("var(--temperature-cold)", cold)}
            </>
          )}
        </svg>
        <div className="relative mt-5" style={{ height: PRECIPITATION_HEIGHT }} aria-hidden>
          {dry ? null : (
            <>
              <span className="absolute top-0 right-0 -translate-y-1/2 whitespace-nowrap">{formatPrecipitation(precipitation.max)}</span>
              <span className="absolute right-0 bottom-0 translate-y-1/2">0</span>
            </>
          )}
        </div>
        {dry ? (
          <div className="border-border mt-5 flex items-end border-b pb-1" style={{ height: PRECIPITATION_HEIGHT }}>
            <Text as="span" size="xs" tone="muted">
              Ingen nedbør
            </Text>
          </div>
        ) : (
          <svg className="mt-5 block w-full" style={{ height: PRECIPITATION_HEIGHT }} viewBox={`0 0 ${count} 100`} preserveAspectRatio="none" aria-hidden>
            <line x1={0} x2={count} y1={0} y2={0} stroke="var(--border)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
            {dayLines}
            {hours.map((hour, index) => {
              if (hour.precipitation <= 0) return null
              const top = fromTop(hour.precipitation, precipitation)
              return <rect key={index} data-chart-mark x={index + 0.12} y={top} width={0.76} height={100 - top} fill={RAIN} />
            })}
            <line x1={0} x2={count} y1={100} y2={100} stroke="var(--muted-foreground)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
          </svg>
        )}
        <span />
        <div className="relative mt-1 h-5" aria-hidden>
          {marked.map((index, position) => (
            <span key={index} className={`absolute top-0 -translate-x-1/2 ${thin(position, marked.length)}`} style={{ left: left(index) }}>
              {formatHour(hours[index]?.time ?? "")}
            </span>
          ))}
        </div>
      </div>
      {text === null ? null : <ChartSummary text={text} />}
      <ChartTable
        caption={ariaLabel}
        columns={["Tid", "Vær", "Temperatur", "Nedbør"]}
        rows={hours.map((hour) => [formatClock(hour.time, manyDays), hour.symbol === undefined ? "–" : describeSymbol(hour.symbol), formatTemperature(hour.temperature), formatPrecipitation(hour.precipitation)])}
        visible={showTable}
      />
    </div>
  )
}
