"use client"

import { useEffect, useRef } from "react"

import { effectsEnabled } from "../lib/effects"
import { advance, countOf, scatter, particlesOf, sizeOf, SUN_ANCHOR, SUN_GLOW, type Particle, type ParticleSpec } from "../lib/weather-particles"
import { cn } from "../lib/utils"

/** The puffs of a cloud: offset sideways and up, in units of its size, and a share of it. */
const PUFFS = [[-0.9, 0.15, 0.55], [-0.4, -0.1, 0.75], [0.2, -0.2, 0.9], [0.8, 0, 0.7], [1.2, 0.2, 0.5]] as const

function draw(context: CanvasRenderingContext2D, spec: ParticleSpec, particles: Particle[], color: string, time: number) {
  context.fillStyle = color
  context.strokeStyle = color
  for (const particle of particles) {
    const size = sizeOf(spec, particle.seed)
    if (spec.shape === "streak") {
      context.globalAlpha = spec.alpha * (0.4 + particle.seed * 0.6)
      context.lineWidth = 1
      context.beginPath()
      context.moveTo(particle.x, particle.y)
      context.lineTo(particle.x - spec.wind * (size / 1000) * 3, particle.y - size)
      context.stroke()
    } else if (spec.shape === "sun") {
      const x = context.canvas.width * SUN_ANCHOR.x
      const y = context.canvas.height * SUN_ANCHOR.y
      const glow = context.createRadialGradient(x, y, 0, x, y, size)
      glow.addColorStop(0, SUN_GLOW)
      glow.addColorStop(1, "transparent")
      context.globalAlpha = spec.alpha
      context.fillStyle = glow
      context.fillRect(x - size, y - size, size * 2, size * 2)
      context.fillStyle = color
    } else if (spec.shape === "cloud") {
      // A cloud is a few soft puffs side by side, the middle one the largest.
      context.globalAlpha = spec.alpha
      for (const [dx, dy, scale] of PUFFS) {
        const r = size * scale
        const px = particle.x + dx * size
        const py = particle.y + dy * size
        const puff = context.createRadialGradient(px, py, 0, px, py, r)
        puff.addColorStop(0, color)
        puff.addColorStop(1, "transparent")
        context.fillStyle = puff
        context.fillRect(px - r, py - r, r * 2, r * 2)
      }
      context.fillStyle = color
    } else if (spec.shape === "mist") {
      const gradient = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, size)
      gradient.addColorStop(0, color)
      gradient.addColorStop(1, "transparent")
      context.globalAlpha = spec.alpha
      context.fillStyle = gradient
      context.fillRect(particle.x - size, particle.y - size, size * 2, size * 2)
      context.fillStyle = color
    } else {
      // Stars twinkle slowly; the rest are steady.
      context.globalAlpha = spec.shape === "star" ? spec.alpha * (0.45 + 0.55 * Math.abs(Math.sin(time / 1800 + particle.seed * 20))) : spec.alpha * (0.5 + particle.seed * 0.5)
      context.beginPath()
      context.arc(particle.x, particle.y, size, 0, Math.PI * 2)
      context.fill()
    }
  }
  context.globalAlpha = 1
}

/**
 * What the weather looks like, as particles on a canvas (2D, no library): rain and thunder as streaks falling aslant, snow as flakes drifting down, sleet as both, fog and cloud as slow mist, a clear night as twinkling stars
 * and a clear day as a few rising motes. In the text colour at low strength, behind the content, and not part of the page for assistive technology. Under `prefers-reduced-motion`, and where the visitor turned the effects off (`data-effects="off"`), it is drawn once and still; it does not run in a
 * tab that is hidden, and it does not follow the pointer.
 */
export function WeatherParticles({ symbol, page = false }: { /** Yr's `symbol_code`. */ symbol: string; /** Fixed to the screen, behind the whole page, instead of filling its parent. */ page?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const target = canvas.current
    const context = target?.getContext("2d") ?? null
    if (target === null || context === null) return
    const specs = particlesOf(symbol)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let groups: Particle[][] = []
    let raf = 0
    let last = 0
    let color = "currentColor"
    // The visual tests ask for a still picture (`data-still` on the page), so the reference is the same every time.
    // A visitor who turned the effects off (`data-effects="off"`) gets them still too, as under reduced motion.
    const still = document.documentElement.hasAttribute("data-still") || !effectsEnabled(target)

    const build = () => {
      const width = target.clientWidth
      const height = target.clientHeight
      target.width = width
      target.height = height
      color = getComputedStyle(target).color
      groups = specs.map((spec, index) => scatter(countOf(spec, width, height), width, height, index + 1))
    }
    const paint = (time: number) => {
      context.clearRect(0, 0, target.width, target.height)
      specs.forEach((spec, index) => draw(context, spec, groups[index] ?? [], color, time))
    }
    const frame = (time: number) => {
      const seconds = last === 0 ? 0 : Math.min((time - last) / 1000, 0.1)
      last = time
      groups = groups.map((group, index) => {
        const spec = specs[index]
        return spec === undefined ? group : group.map((particle) => advance(particle, spec, seconds, target.width, target.height))
      })
      paint(time)
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
      last = 0
    }
    const sync = () => {
      stop()
      if (specs.length === 0) return
      if (reduced.matches || still || document.hidden) paint(0)
      else raf = requestAnimationFrame(frame)
    }
    const resize = () => {
      build()
      sync()
    }

    build()
    sync()
    const observer = new ResizeObserver(resize)
    observer.observe(target)
    reduced.addEventListener("change", sync)
    document.addEventListener("visibilitychange", sync)
    return () => {
      stop()
      observer.disconnect()
      reduced.removeEventListener("change", sync)
      document.removeEventListener("visibilitychange", sync)
    }
  }, [symbol])

  return <canvas ref={canvas} aria-hidden="true" className={cn("pointer-events-none text-foreground", page ? "fixed inset-0 -z-10 size-full opacity-40" : "absolute inset-0 -z-10 size-full opacity-40")} />
}
