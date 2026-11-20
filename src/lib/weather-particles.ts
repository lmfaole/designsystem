import { readSymbol, type WeatherKind, type WeatherPeriod } from "./weather-mood.ts"

/** What a weather looks like as moving things: streaks of rain, flakes of snow, drifting mist, slow cloud, stars. Pure, so a test pins it. */
export type ParticleShape = "streak" | "flake" | "mist" | "mote" | "star"

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
}

const RAIN: ParticleSpec = { shape: "streak", density: 28, fall: [700, 1000], wind: -120, size: [14, 26], alpha: 0.55 }
const SNOW: ParticleSpec = { shape: "flake", density: 22, fall: [30, 80], wind: 14, size: [1.5, 3.5], alpha: 0.9 }

/** The particles of a weather. */
export function particlesOf(code: string): ParticleSpec[] {
  const { kind, period } = readSymbol(code)
  return specOf(kind, period)
}

function specOf(kind: WeatherKind, period: WeatherPeriod): ParticleSpec[] {
  switch (kind) {
    case "rain":
      return [RAIN]
    case "thunder":
      return [{ ...RAIN, density: 40, fall: [900, 1200], wind: -180 }]
    case "sleet":
      return [{ ...RAIN, density: 16, size: [8, 14] }, { ...SNOW, density: 12, fall: [120, 200] }]
    case "snow":
      return [SNOW]
    case "fog":
      return [{ shape: "mist", density: 1.6, fall: [0, 0], wind: 12, size: [160, 300], alpha: 0.12 }]
    case "cloudy":
      return [{ shape: "mist", density: 1, fall: [0, 0], wind: 8, size: [200, 340], alpha: 0.1 }]
    case "partly":
      return [{ shape: "mist", density: 0.6, fall: [0, 0], wind: 8, size: [200, 340], alpha: 0.1 }]
    case "clear":
      return period === "night"
        ? [{ shape: "star", density: 7, fall: [0, 0], wind: 0, size: [0.8, 1.8], alpha: 0.9 }]
        : [{ shape: "mote", density: 3, fall: [-14, -6], wind: 4, size: [1.5, 3], alpha: 0.7 }]
  }
}

export interface Particle {
  x: number
  y: number
  /** 0 to 1, fixed per particle: picks its speed and size inside the spec's ranges, and its phase. */
  seed: number
}

export const countOf = (spec: ParticleSpec, width: number, height: number): number => Math.round((spec.density * width * height) / 100_000)

const lerp = (range: readonly [number, number], t: number): number => range[0] + (range[1] - range[0]) * t

export const sizeOf = (spec: ParticleSpec, seed: number): number => lerp(spec.size, seed)

/** Where a particle is after `seconds`: it falls and drifts, and comes in again on the other side. Stars and the rest that do not fall only drift or stay. */
export function advance(particle: Particle, spec: ParticleSpec, seconds: number, width: number, height: number): Particle {
  const speed = lerp(spec.fall, particle.seed)
  const sway = spec.shape === "flake" || spec.shape === "mote" ? Math.sin(particle.y / 60 + particle.seed * 6.28) * 10 : 0
  let x = particle.x + (spec.wind * (0.6 + particle.seed * 0.8) + sway) * seconds
  let y = particle.y + speed * seconds
  const margin = spec.shape === "mist" ? spec.size[1] : spec.size[1] * 2
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
