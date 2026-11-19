import { heatColour } from "../lib/chart-colors"
import { HEAT_STEPS } from "../lib/heatmap"

/** «Mindre … Mer» with the five steps between, under a heat map: the scale is quantiles, so it says «less» and «more», not numbers it could not keep. */
export function HeatLegend() {
  return (
    <div className="text-muted-foreground flex items-center gap-1.5 text-xs" aria-hidden>
      Mindre
      {Array.from({ length: HEAT_STEPS + 1 }, (_, level) => (
        <span key={level} className="border-border size-3 rounded-[3px] border" style={{ background: heatColour(level), forcedColorAdjust: "none" }} />
      ))}
      Mer
    </div>
  )
}
