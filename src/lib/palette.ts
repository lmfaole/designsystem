/**
 * The four colours of a picture, one for each quarter of it, made ready for a backdrop: what `DetailHeader` paints behind a picture from the picture's own colours (never the picture itself). Pure, so a
 * test pins it; the pixels come from a small canvas the picture was drawn on.
 */

export type Rgb = [number, number, number]

/** The mean of the pixels of one quarter (`quarter` 0 to 3: upper left, upper right, lower left, lower right) of a `size` × `size` square of RGBA pixels. */
export function quarterMean(pixels: ArrayLike<number>, size: number, quarter: number): Rgb {
  const half = Math.floor(size / 2)
  const x0 = quarter % 2 === 0 ? 0 : half
  const y0 = quarter < 2 ? 0 : half
  let r = 0
  let g = 0
  let b = 0
  let n = 0
  for (let y = y0; y < y0 + half; y += 1) {
    for (let x = x0; x < x0 + half; x += 1) {
      const at = (y * size + x) * 4
      if ((pixels[at + 3] ?? 255) < 16) continue
      r += pixels[at] ?? 0
      g += pixels[at + 1] ?? 0
      b += pixels[at + 2] ?? 0
      n += 1
    }
  }
  return n === 0 ? [128, 128, 128] : [r / n, g / n, b / n]
}

/** A colour with its saturation lifted and its lightness kept in a middle band: the mean of a photo is grey and a backdrop should still be coloured, never white or black. */
export function lively([r, g, b]: Rgb, lift = 1.35): Rgb {
  const max = Math.max(r, g, b) / 255
  const min = Math.min(r, g, b) / 255
  let lightness = (max + min) / 2
  const delta = max - min
  let saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1))
  let hue = 0
  if (delta !== 0) {
    if (max === r / 255) hue = ((g - b) / 255 / delta + 6) % 6
    else if (max === g / 255) hue = (b - r) / 255 / delta + 2
    else hue = (r - g) / 255 / delta + 4
  }
  saturation = Math.min(1, saturation * lift)
  lightness = Math.min(0.62, Math.max(0.34, lightness))
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
  const x = chroma * (1 - Math.abs((hue % 2) - 1))
  const m = lightness - chroma / 2
  const [r1, g1, b1] = hue < 1 ? [chroma, x, 0] : hue < 2 ? [x, chroma, 0] : hue < 3 ? [0, chroma, x] : hue < 4 ? [0, x, chroma] : hue < 5 ? [x, 0, chroma] : [chroma, 0, x]
  return [Math.round((r1 + m) * 255), Math.round((g1 + m) * 255), Math.round((b1 + m) * 255)]
}

/** The four backdrop colours of a `size` × `size` square of RGBA pixels, one per quarter, in the order upper left, upper right, lower left, lower right. */
export function paletteOf(pixels: ArrayLike<number>, size: number): [Rgb, Rgb, Rgb, Rgb] {
  return [lively(quarterMean(pixels, size, 0)), lively(quarterMean(pixels, size, 1)), lively(quarterMean(pixels, size, 2)), lively(quarterMean(pixels, size, 3))]
}

/**
 * How strongly the backdrop is laid over the page, as a share: weak enough that the text of the head (the page's full text colour, never the muted one: muted text is only 4.6:1 on a plain page) keeps
 * 4.5:1 on the worst colour a picture can give, with the light's highlight on it. A test measures it.
 */
export const BACKDROP_OPACITY = { light: 0.5, dark: 0.4 } as const

/** The same for a backdrop behind a whole page (`WeatherStage page`): muted text (4.6:1 on a plain page, a little more in the light theme) is on it too, so it is laid on much more weakly. A test measures it. */
export const PAGE_BACKDROP_OPACITY = { light: 0.15, dark: 0.18 } as const

/** How much the light adds at the brightest spot of the backdrop, in the shader (`lib/ambient-shader.ts`), as a share of white. */
export const BACKDROP_HIGHLIGHT = 0.16

/** What a picture is like as a whole, three numbers from 0 to 1: its main hue (a share of a turn), how saturated it is, and how light. The disc lets them shape what its reflections do. */
export interface CoverTraits {
  hue: number
  saturation: number
  lightness: number
}

/** The traits of a `size` × `size` square of RGBA pixels: the mean colour of the whole, as a hue, a saturation and a lightness. */
export function coverTraits(pixels: ArrayLike<number>, size: number): CoverTraits {
  const quarters = [0, 1, 2, 3].map((quarter) => quarterMean(pixels, size, quarter))
  const [r, g, b] = [0, 1, 2].map((channel) => quarters.reduce((sum, colour) => sum + (colour[channel] ?? 0), 0) / 4 / 255) as [number, number, number]
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const lightness = (max + min) / 2
  const delta = max - min
  const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1))
  let hue = 0
  if (delta !== 0) hue = (max === r ? ((g - b) / delta + 6) % 6 : max === g ? (b - r) / delta + 2 : (r - g) / delta + 4) / 6
  return { hue, saturation: Math.min(1, saturation), lightness }
}

/** Traits for a cover that could not be read: nothing leans one way or the other. */
export const NEUTRAL_TRAITS: CoverTraits = { hue: 0.1, saturation: 0.4, lightness: 0.5 }

/** The palette a share `t` (0 to 1) of the way from one to another: what a backdrop is while it changes colour when the picture changes. */
export function mixPalette(from: readonly [Rgb, Rgb, Rgb, Rgb], to: readonly [Rgb, Rgb, Rgb, Rgb], t: number): [Rgb, Rgb, Rgb, Rgb] {
  const share = Math.min(1, Math.max(0, t))
  const mixed = (a: Rgb, b: Rgb): Rgb => [a[0] + (b[0] - a[0]) * share, a[1] + (b[1] - a[1]) * share, a[2] + (b[2] - a[2]) * share]
  return [mixed(from[0], to[0]), mixed(from[1], to[1]), mixed(from[2], to[2]), mixed(from[3], to[3])]
}

/** A move that is fast at first and settles (cubic ease-out), for a share of the way `t` from 0 to 1. */
export const easeOut = (t: number): number => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3)

/** How long a backdrop takes to change colour, in milliseconds: one move, then it is still. */
export const PALETTE_MS = 700
