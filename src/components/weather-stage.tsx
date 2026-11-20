import type { ReactNode } from "react"

import { weatherPalette } from "../lib/weather-mood"
import { Stage } from "./stage"

/**
 * The ground the weather of a page stands on: a `Stage` whose backdrop is the colours of the weather itself (clear and warm, grey cloud, dark blue rain, pale snow, a night sky after dark), drawn in WebGL
 * and moving with the page's light, as a picture's colours are under `DetailHeader`. `symbol` is Yr's `symbol_code` («clearsky_day», «lightrainshowers_night»); the colours go over to the new weather's in one move
 * when it changes. Nothing loops. Text on it is the page's full text colour, never muted (a test measures 4.5:1 on every weather). Where WebGL is not there it is the plain tinted ground.
 */
export function WeatherStage({ symbol, as, children }: { /** Yr's `symbol_code` for the weather shown: `clearsky_day`, `rain`, `heavysnow`. */ symbol: string; as?: "div" | "header" | "section"; children: ReactNode }) {
  return (
    <Stage {...(as === undefined ? {} : { as })} palette={weatherPalette(symbol)}>
      {children}
    </Stage>
  )
}
