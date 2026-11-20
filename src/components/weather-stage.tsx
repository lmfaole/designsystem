import type { CSSProperties, ReactNode } from "react"

import { weatherAccent, weatherPalette } from "../lib/weather-mood"
import { AmbientBackdrop } from "./ambient-backdrop"
import { Stage } from "./stage"
import { WeatherParticles } from "./weather-particles"

/**
 * The weather as a ground, drawn in WebGL in the colours of the weather itself (clear and warm, grey cloud, dark blue rain, pale snow, a night sky after dark) and holding still: it does not follow the pointer or the tilt. On it the weather itself moves as particles (`WeatherParticles`: rain, snow, mist, stars), still under `prefers-reduced-motion`. Beneath it, `--weather-accent` (the weather's colour) and `--weather-rain` are set, for the marks of charts that stand on it: `color="var(--weather-accent)"`. `symbol` is Yr's `symbol_code` («clearsky_day», «lightrainshowers_night»); the colours go over to the new weather's in one move when it changes, and nothing loops.
 * By default it is a `Stage`, a rounded surface the weather's own content stands on. With `page` it is the ground of the whole page, fixed behind everything and weaker, so the page's text, muted text too, keeps 4.5:1
 * (a test measures it on every weather). Where WebGL is not there it is the plain ground. Decoration, hidden from assistive technology.
 */
export function WeatherStage({ symbol, page = false, as, children }: { /** Yr's `symbol_code` for the weather shown: `clearsky_day`, `rain`, `heavysnow`. */ symbol: string; /** The ground of the whole page, behind everything, instead of a surface of its own. */ page?: boolean; as?: "div" | "header" | "section"; children: ReactNode }) {
  const palette = weatherPalette(symbol)
  // What is drawn on the weather in its colours: `--weather-accent` is this weather's, `--weather-rain` is always the rain's, for what falls.
  const colours: CSSProperties & Record<`--${string}`, string> = { "--weather-accent": weatherAccent(symbol), "--weather-rain": weatherAccent("rain") }
  if (page)
    return (
      <div className="contents" style={colours}>
        <AmbientBackdrop palette={palette} page />
        <WeatherParticles symbol={symbol} page />
        {children}
      </div>
    )
  return (
    <div className="contents" style={colours}>
      <Stage {...(as === undefined ? {} : { as })} palette={palette}>
        <WeatherParticles symbol={symbol} />
        {children}
      </Stage>
    </div>
  )
}
