import { MODE_NAMES, type TransitMode } from "../lib/departures"
import type { IconName } from "../lib/icons"
import { Icon } from "./icon"

export type { TransitMode } from "../lib/departures"

const COLOURS: Readonly<Record<TransitMode, string>> = {
  bus: "bg-(--transit-bus) text-(--transit-bus-foreground)",
  tram: "bg-(--transit-tram) text-(--transit-tram-foreground)",
  metro: "bg-(--transit-metro) text-(--transit-metro-foreground)",
  rail: "bg-(--transit-rail) text-(--transit-rail-foreground)",
  ferry: "bg-(--transit-ferry) text-(--transit-ferry-foreground)",
  other: "bg-(--transit-other) text-(--transit-other-foreground)",
}

const ICON: Readonly<Record<TransitMode, IconName>> = { bus: "bus", tram: "tram", metro: "metro", rail: "rail", ferry: "ferry", other: "route" }

const SIZES = { sm: "gap-0.5 rounded-sm px-1 text-xs", md: "gap-1 rounded-md px-1.5 py-0.5 text-sm" } as const

/**
 * A public transport line: the symbol of its kind and its code (`31`, `L2`) on the kind's colour, as Ruter paints them (bus red, tram
 * blue, T-bane orange, train green, boat teal). The symbol tells the kind apart without the colour, and a screen reader hears «Buss 31».
 * The text on each colour keeps 4.5:1 in both themes (tokens `--transit-*`, a test). Used by `DepartureBoard`; on its own beside a trip.
 */
export function LineBadge({ line, mode, size = "md" }: { line: string; mode: TransitMode; size?: keyof typeof SIZES }) {
  return (
    <span className={`inline-flex shrink-0 items-center font-semibold leading-tight tabular-nums whitespace-nowrap ${SIZES[size]} ${COLOURS[mode]}`}>
      <Icon name={ICON[mode]} size="sm" />
      <span aria-hidden="true">{line}</span>
      <span className="sr-only">{line === "" ? MODE_NAMES[mode] : `${MODE_NAMES[mode]} ${line}`}</span>
    </span>
  )
}
