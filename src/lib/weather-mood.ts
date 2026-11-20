import type { Rgb } from "./palette"

/**
 * The four colours of a weather, for the backdrop of a stage (`WeatherStage`): what Yr's `symbol_code` («clearsky_day», «lightrainshowers_night», «heavysnow») looks like, as colour. Pure, so a test pins it.
 * Every colour keeps its lightness in the band `lively` keeps a picture's colours in (0.34 to 0.62), so the text on the stage holds 4.5:1 as it does on a picture's; a test measures it.
 */

export type WeatherKind = "clear" | "partly" | "cloudy" | "fog" | "rain" | "sleet" | "snow" | "thunder"
export type WeatherPeriod = "day" | "night"

/** What a `symbol_code` is: the kind of weather, and whether it is day or night (twilight counts as night: the sun is down). */
export function readSymbol(code: string): { kind: WeatherKind; period: WeatherPeriod } {
  const period: WeatherPeriod = code.endsWith("_day") ? "day" : "night"
  const base = code.replace(/_(day|night|polartwilight)$/, "")
  if (base.includes("thunder")) return { kind: "thunder", period }
  if (base.includes("sleet")) return { kind: "sleet", period }
  if (base.includes("snow")) return { kind: "snow", period }
  if (base.includes("rain")) return { kind: "rain", period }
  if (base === "fog") return { kind: "fog", period }
  if (base === "cloudy") return { kind: "cloudy", period }
  if (base === "partlycloudy") return { kind: "partly", period }
  if (base === "clearsky" || base === "fair") return { kind: "clear", period }
  return { kind: "cloudy", period }
}

type Hsl = readonly [hue: number, saturation: number, lightness: number]

const DAY: Record<WeatherKind, readonly [Hsl, Hsl, Hsl, Hsl]> = {
  clear: [[205, 0.8, 0.58], [48, 0.9, 0.56], [195, 0.7, 0.55], [32, 0.9, 0.58]],
  partly: [[208, 0.6, 0.58], [45, 0.7, 0.58], [212, 0.35, 0.6], [200, 0.5, 0.58]],
  cloudy: [[214, 0.14, 0.55], [210, 0.12, 0.6], [218, 0.16, 0.5], [205, 0.1, 0.58]],
  fog: [[200, 0.1, 0.6], [190, 0.12, 0.62], [210, 0.08, 0.58], [195, 0.1, 0.6]],
  rain: [[214, 0.4, 0.4], [208, 0.3, 0.46], [222, 0.4, 0.36], [200, 0.28, 0.5]],
  sleet: [[205, 0.3, 0.5], [215, 0.22, 0.44], [195, 0.28, 0.56], [220, 0.26, 0.42]],
  snow: [[200, 0.4, 0.62], [210, 0.3, 0.58], [190, 0.35, 0.6], [220, 0.28, 0.56]],
  thunder: [[252, 0.4, 0.36], [262, 0.35, 0.42], [230, 0.4, 0.34], [48, 0.7, 0.5]],
}

const NIGHT: Record<WeatherKind, readonly [Hsl, Hsl, Hsl, Hsl]> = {
  clear: [[232, 0.6, 0.36], [250, 0.5, 0.42], [218, 0.6, 0.35], [265, 0.4, 0.4]],
  partly: [[228, 0.45, 0.36], [240, 0.35, 0.42], [215, 0.4, 0.36], [255, 0.3, 0.4]],
  cloudy: [[222, 0.16, 0.36], [215, 0.12, 0.42], [228, 0.18, 0.34], [210, 0.1, 0.4]],
  fog: [[215, 0.1, 0.42], [205, 0.1, 0.46], [220, 0.08, 0.4], [210, 0.1, 0.44]],
  rain: [[222, 0.4, 0.34], [214, 0.3, 0.38], [228, 0.4, 0.34], [208, 0.26, 0.4]],
  sleet: [[212, 0.26, 0.38], [222, 0.2, 0.36], [205, 0.24, 0.42], [228, 0.22, 0.34]],
  snow: [[212, 0.3, 0.46], [222, 0.25, 0.42], [200, 0.28, 0.46], [232, 0.22, 0.4]],
  thunder: [[255, 0.4, 0.34], [265, 0.35, 0.38], [235, 0.4, 0.34], [50, 0.6, 0.42]],
}

function fromHsl([hue, saturation, lightness]: Hsl): Rgb {
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
  const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1))
  const m = lightness - chroma / 2
  const sector = Math.floor((((hue % 360) + 360) % 360) / 60)
  const [r, g, b] = [[chroma, x, 0], [x, chroma, 0], [0, chroma, x], [0, x, chroma], [x, 0, chroma], [chroma, 0, x]][sector] ?? [0, 0, 0]
  return [Math.round(((r ?? 0) + m) * 255), Math.round(((g ?? 0) + m) * 255), Math.round(((b ?? 0) + m) * 255)]
}

/** The four backdrop colours of a weather, in the order upper left, upper right, lower left, lower right (as `paletteOf` gives a picture's). */
export function weatherPalette(code: string): [Rgb, Rgb, Rgb, Rgb] {
  const { kind, period } = readSymbol(code)
  const [a, b, c, d] = (period === "day" ? DAY : NIGHT)[kind]
  return [fromHsl(a), fromHsl(b), fromHsl(c), fromHsl(d)]
}

const unit = (channel: number): string => (channel / 255).toFixed(3)

/**
 * The colour of a weather as a mark on the page (a line, a column, a dot): the weather's own first colour, drawn toward the text colour by a third, so it keeps its hue and stays dark enough on the light page and light enough on the dark one.
 * A CSS colour, for `color` on a chart or `--weather-accent`.
 */
export function weatherAccent(code: string): string {
  const [r, g, b] = weatherPalette(code)[0]
  return `color-mix(in oklab, color(srgb ${unit(r)} ${unit(g)} ${unit(b)}) 68%, var(--foreground))`
}
