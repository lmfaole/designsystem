"use client"

import { useEffect, useRef, useState } from "react"

import { createDiscRenderer, type DiscRenderer } from "../lib/disc-shader"
import { lightStore } from "../lib/light"
import { DRAWN, FRAMES, type Size } from "../lib/picture-frames"
import { fallbackOf, srcSetOf, type PictureSource } from "../lib/picture-sources"
import { cn } from "../lib/utils"

/** How long one turn takes, in milliseconds: the same as `--motion-duration-disc`. */
const TURN_MS = 12_000

/**
 * A record playing now. It is drawn in WebGL (the cover turns, the light does not: reflections follow the page's one light, `lib/light.ts`), and until that is ready, or where WebGL
 * is not there, in CSS (the cover turns under two bands of light that follow the same light). A tap stops the turning and starts it again: the one loop here that runs for more
 * than five seconds can be paused (WCAG 2.2.2). Under `prefers-reduced-motion` it does not turn and there is nothing to press. Decorative: say «playing now» in words beside it.
 */
export function Disc({ src, sources, size = "row" }: { src: string | null | undefined; sources?: readonly PictureSource[]; size?: Size }) {
  const drawn = DRAWN.square[size]
  const set = srcSetOf(sources, drawn)
  const shown = src ?? (sources === undefined ? undefined : fallbackOf(sources, drawn)?.src)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [lit, setLit] = useState(false)
  const frame = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const pausedNow = useRef(false)
  pausedNow.current = paused

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(query.matches)
    const change = () => setReduced(query.matches)
    query.addEventListener("change", change)
    return () => query.removeEventListener("change", change)
  }, [])

  useEffect(() => {
    const target = canvas.current
    // Read here, not from state: the state is set in an effect of its own, after this one has run once.
    if (reduced || shown === undefined || target === null || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let renderer: DiscRenderer | null = null
    let raf = 0
    let last = 0
    let turn = 0
    let onScreen = true
    let cancelled = false
    const stop = () => {
      if (raf !== 0) cancelAnimationFrame(raf)
      raf = 0
    }
    const loop = (now: number) => {
      raf = 0
      if (renderer === null) return
      const elapsed = last === 0 ? 0 : Math.min(now - last, 100)
      last = now
      if (!pausedNow.current) turn += (elapsed / TURN_MS) * Math.PI * 2
      renderer.resize(Math.max(1, Math.round(target.clientWidth * Math.min(window.devicePixelRatio || 1, 2))))
      renderer.draw(turn, lightStore.current)
      if (onScreen && !document.hidden) raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (raf === 0 && renderer !== null && onScreen && !document.hidden) {
        last = 0
        raf = requestAnimationFrame(loop)
      }
    }
    const image = new Image()
    image.crossOrigin = "anonymous"
    image.onload = () => {
      if (cancelled) return
      renderer = createDiscRenderer(target, image)
      if (renderer === null) return
      setLit(true)
      start()
    }
    image.src = shown
    const observer = new IntersectionObserver((entries) => {
      onScreen = entries.some((entry) => entry.isIntersecting)
      if (onScreen) start()
      else stop()
    })
    if (frame.current !== null) observer.observe(frame.current)
    const visibility = () => (document.hidden ? stop() : start())
    const lost = (event: Event) => {
      event.preventDefault()
      stop()
      renderer = null
      setLit(false)
    }
    document.addEventListener("visibilitychange", visibility)
    target.addEventListener("webglcontextlost", lost)
    return () => {
      cancelled = true
      stop()
      observer.disconnect()
      document.removeEventListener("visibilitychange", visibility)
      target.removeEventListener("webglcontextlost", lost)
      renderer?.dispose()
      setLit(false)
    }
  }, [shown, reduced])

  const body = (
    <>
      <span className={cn("absolute inset-0", lit ? "hidden" : !reduced && "motion-disc", paused && "[animation-play-state:paused]")}>
        {shown ? <img src={shown} {...(set === null ? {} : { srcSet: set.srcSet, sizes: set.sizes })} alt="" loading="lazy" decoding="async" width={SIZES_PX[size]} height={SIZES_PX[size]} className="size-full object-cover object-top" /> : null}
        <span className="bg-background ring-foreground/25 absolute top-1/2 left-1/2 size-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full ring-1" />
      </span>
      <span aria-hidden="true" className={cn("light-sheen absolute inset-0 rounded-full", lit && "hidden")} />
      <canvas ref={canvas} aria-hidden="true" className={cn("absolute inset-0 size-full", !lit && "hidden")} />
    </>
  )
  const shape = cn("relative shrink-0 overflow-hidden rounded-full bg-muted", FRAMES.square[size], size === "hero" && "elevation-2")
  if (reduced) {
    return (
      <span ref={frame} aria-hidden="true" className={shape}>
        {body}
      </span>
    )
  }
  return (
    <button ref={frame as React.RefObject<HTMLButtonElement>} type="button" aria-label={paused ? "Start snurringen" : "Stopp snurringen"} onClick={() => setPaused((now) => !now)} className={cn(shape, "focus-visible:ring-ring cursor-pointer p-0 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none")}>
      {body}
    </button>
  )
}

const SIZES_PX = { row: 40, hero: 112, fill: 200 } as const
