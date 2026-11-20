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

/** How much the light adds at the brightest spot of the backdrop, in the shader (`lib/ambient-shader.ts`), as a share of white. */
export const BACKDROP_HIGHLIGHT = 0.16
