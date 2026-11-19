/**
 * Colour maths for checking the tokens of `theme.css`, with no dependency: oklch to sRGB, WCAG contrast, and a simulation of colour-vision
 * deficiency. The system's tokens are oklch, so a contrast ratio is worked out here from the same values the browser reads.
 */

export type Rgb = readonly [number, number, number]
export interface Oklch {
  l: number
  c: number
  h: number
  /** 0 to 1; a token with an alpha channel is laid over what is behind it. */
  a: number
}

/** `oklch(0.5 0.14 250)` or `oklch(1 0 0 / 10%)`. */
export function parseOklch(value: string): Oklch {
  const match = /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+)(%?))?\s*\)/.exec(value)
  if (match === null) throw new Error(`not an oklch colour: ${value}`)
  const alpha = match[4] === undefined ? 1 : match[5] === "%" ? Number(match[4]) / 100 : Number(match[4])
  return { l: Number(match[1]), c: Number(match[2]), h: Number(match[3]), a: alpha }
}

const clip = (x: number) => Math.min(1, Math.max(0, x))

function unclipped({ l, c, h }: Oklch): Rgb {
  const a = c * Math.cos((h * Math.PI) / 180)
  const b = c * Math.sin((h * Math.PI) / 180)
  const l3 = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m3 = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s3 = (l - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3, -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3, -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3]
}

/** Linear sRGB of an oklch colour (Björn Ottosson's oklab matrices), clipped to the gamut. */
export function toLinear(colour: Oklch): Rgb {
  const [r, g, b] = unclipped(colour)
  return [clip(r), clip(g), clip(b)]
}

/** Whether the colour is inside the sRGB gamut, so that a browser shows it as written and not with its chroma reduced. */
export function inGamut(colour: Oklch): boolean {
  return unclipped(colour).every((value) => value >= -0.0005 && value <= 1.0005)
}

const encode = (x: number) => (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055)
const decode = (x: number) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)

/** `top` over `below`, mixed the way a browser does it: in the encoded sRGB values, not in linear light. */
export function over(top: Rgb, alpha: number, below: Rgb): Rgb {
  const mixed = top.map((value, index) => decode(encode(value) * alpha + encode(below[index] ?? 0) * (1 - alpha)))
  return [mixed[0] ?? 0, mixed[1] ?? 0, mixed[2] ?? 0]
}

/** WCAG relative luminance of a linear sRGB colour. */
export const luminance = ([r, g, b]: Rgb): number => 0.2126 * r + 0.7152 * g + 0.0722 * b

/** WCAG contrast ratio, 1 to 21. */
export function contrast(a: Rgb, b: Rgb): number {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return ((high ?? 0) + 0.05) / ((low ?? 0) + 0.05)
}

/** The colour as it looks on `below`: an alpha channel laid over it. */
export function onto(colour: Oklch, below: Rgb): Rgb {
  return colour.a < 1 ? over(toLinear(colour), colour.a, below) : toLinear(colour)
}

/** Machado, Oliveira and Fernandes (2009), severity 1.0, applied to linear sRGB. */
export const CVD = {
  protan: [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
  deutan: [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.01182, 0.04294, 0.968881]],
  tritan: [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.3039]],
} as const

export function simulate(rgb: Rgb, matrix: readonly (readonly number[])[]): Rgb {
  const row = (index: number) => clip((matrix[index]?.[0] ?? 0) * rgb[0] + (matrix[index]?.[1] ?? 0) * rgb[1] + (matrix[index]?.[2] ?? 0) * rgb[2])
  return [row(0), row(1), row(2)]
}

/** Oklab of a linear sRGB colour. */
export function toOklab([r, g, b]: Rgb): readonly [number, number, number] {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s]
}

/** The distance between two colours in oklab, times 100: about 2 is just noticeable, 8 or more is plainly different. */
export function distance(a: Rgb, b: Rgb): number {
  const [l1, a1, b1] = toOklab(a)
  const [l2, a2, b2] = toOklab(b)
  return 100 * Math.hypot(l1 - l2, a1 - a2, b1 - b2)
}
