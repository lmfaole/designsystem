import { readSymbol, type WeatherKind, type WeatherPeriod } from "./weather-mood.ts"

/** What a weather looks like as moving things: streaks of rain, flakes of snow, drifting mist, slow cloud, stars. Pure, so a test pins it. */
export type ParticleShape = "streak" | "flake" | "mist" | "cloud" | "mote" | "star" | "sun"

export interface ParticleSpec {
  shape: ParticleShape
  /** How many per 100 000 px² of surface. */
  density: number
  /** Fall speed in px/s (negative rises), as a range. */
  fall: readonly [number, number]
  /** Sideways speed in px/s: the wind. */
  wind: number
  /** Size in px: the length of a streak, the radius of the rest. */
  size: readonly [number, number]
  /** Strength of one particle, 0 to 1. */
  alpha: number
  /** A fixed number instead of one by the surface's size. */
  count?: number
}

/** The sun's glow: a warm light, drawn from its own colour and not the text's, in the corner of the surface. */
export const SUN_GLOW = "oklch(0.88 0.14 85)"
export const SUN_ANCHOR = { x: 0.82, y: 0.1 } as const

const RAIN_FAR: ParticleSpec = { shape: "streak", density: 14, fall: [450, 650], wind: -70, size: [8, 14], alpha: 0.35 }
const RAIN_NEAR: ParticleSpec = { shape: "streak", density: 14, fall: [900, 1200], wind: -160, size: [22, 34], alpha: 0.6 }
const SNOW_FAR: ParticleSpec = { shape: "flake", density: 18, fall: [20, 45], wind: 8, size: [1, 2], alpha: 0.6 }
const SNOW_NEAR: ParticleSpec = { shape: "flake", density: 8, fall: [60, 110], wind: 18, size: [2.5, 4.5], alpha: 0.9 }
const RAIN = [RAIN_FAR, RAIN_NEAR]
const SNOW = [SNOW_FAR, SNOW_NEAR]
const CLOUD: ParticleSpec = { shape: "cloud", density: 0.7, fall: [0, 0], wind: 9, size: [90, 170], alpha: 0.12 }
const SUN: ParticleSpec = { shape: "sun", density: 0, count: 1, fall: [0, 0], wind: 0, size: [300, 300], alpha: 0.3 }

/** The particles of a weather: the far and the near of the rain and the snow, clouds that drift, a sun in the corner, stars. */
export function particlesOf(code: string): ParticleSpec[] {
  const { kind, period } = readSymbol(code)
  return specOf(kind, period)
}

function specOf(kind: WeatherKind, period: WeatherPeriod): ParticleSpec[] {
  switch (kind) {
    case "rain":
      return [CLOUD, ...RAIN]
    case "thunder":
      return [{ ...CLOUD, density: 1, alpha: 0.16 }, ...RAIN.map((spec) => ({ ...spec, density: spec.density * 1.5, wind: spec.wind * 1.3 }))]
    case "sleet":
      return [CLOUD, { ...RAIN_NEAR, density: 12, size: [8, 14] }, { ...SNOW_NEAR, density: 10, fall: [120, 200] }]
    case "snow":
      return [CLOUD, ...SNOW]
    case "fog":
      return [{ shape: "mist", density: 1.6, fall: [0, 0], wind: 12, size: [160, 300], alpha: 0.12 }]
    case "cloudy":
      return [{ ...CLOUD, density: 1.1 }]
    case "partly":
      return period === "night" ? [{ ...CLOUD, density: 0.6 }] : [SUN, { ...CLOUD, density: 0.6 }]
    case "clear":
      return period === "night"
        ? [{ shape: "star", density: 7, fall: [0, 0], wind: 0, size: [0.8, 1.8], alpha: 0.9 }]
        : [SUN, { shape: "mote", density: 3, fall: [-14, -6], wind: 4, size: [1.5, 3], alpha: 0.7 }]
  }
}

export interface Particle {
  x: number
  y: number
  /** 0 to 1, fixed per particle: picks its speed and size inside the spec's ranges, and its phase. */
  seed: number
}

export const countOf = (spec: ParticleSpec, width: number, height: number): number => spec.count ?? Math.round((spec.density * width * height) / 100_000)

const lerp = (range: readonly [number, number], t: number): number => range[0] + (range[1] - range[0]) * t

export const sizeOf = (spec: ParticleSpec, seed: number): number => lerp(spec.size, seed)

/** Where a particle is after `seconds`: it falls and drifts, and comes in again on the other side. Stars and the rest that do not fall only drift or stay. */
export function advance(particle: Particle, spec: ParticleSpec, seconds: number, width: number, height: number): Particle {
  const speed = lerp(spec.fall, particle.seed)
  const sway = spec.shape === "flake" || spec.shape === "mote" ? Math.sin(particle.y / 60 + particle.seed * 6.28) * 10 : 0
  let x = particle.x + (spec.wind * (0.6 + particle.seed * 0.8) + sway) * seconds
  let y = particle.y + speed * seconds
  const margin = spec.shape === "mist" || spec.shape === "cloud" ? spec.size[1] : spec.size[1] * 2
  if (y > height + margin) y -= height + margin * 2
  else if (y < -margin) y += height + margin * 2
  if (x > width + margin) x -= width + margin * 2
  else if (x < -margin) x += width + margin * 2
  return { x, y, seed: particle.seed }
}

/** A fixed, quick sequence of numbers from 0 to 1: the same scattering every time, so a test can pin it. */
function sequence(start: number): () => number {
  let state = start >>> 0 || 1
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    return state / 4294967296
  }
}

/** `count` particles spread over the surface. */
export function scatter(count: number, width: number, height: number, start = 1): Particle[] {
  const next = sequence(start)
  return Array.from({ length: count }, () => ({ x: next() * width, y: next() * height, seed: next() }))
}
