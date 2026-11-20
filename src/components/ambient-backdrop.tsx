"use client"

import { useEffect, useRef, useState } from "react"

import { acquireGlSlot } from "../lib/gl-budget"
import { createAmbientRenderer, type AmbientRenderer } from "../lib/ambient-shader"
import { lightStore } from "../lib/light"
import { acquireLightInput } from "../lib/light-input"
import { easeOut, mixPalette, PALETTE_MS, paletteOf, type Rgb } from "../lib/palette"
import { fallbackOf, type PictureSource } from "../lib/picture-sources"
import { cn } from "../lib/utils"

type Palette = readonly [Rgb, Rgb, Rgb, Rgb]

/**
 * Four soft pools of colour taken from a picture, drawn in WebGL behind a stage (`DetailHeader`, `NowPlayingCard`), that move with the page's light: the pointer, and on a phone how it is held. Only four
 * colours are taken from the picture, never the picture itself, so a source that forbids altering its pictures (Spotify's) is not altered. It is drawn when the light changes and at no other time, except
 * for one move of 0.7 s when the picture changes (what plays changes, and the colours go over to the new ones and settle): nothing loops, so there is nothing to pause and it costs no battery at rest. A page
 * has a few WebGL surfaces at most (`lib/gl-budget.ts`); a context the browser takes away is made again when it is given back. Where WebGL is not there, or the picture may not be read (no CORS), the stage has
 * its plain tinted ground. It is decoration, hidden from assistive technology.
 */
export function AmbientBackdrop({ src, sources, palette, page = false }: { src?: string | null; sources?: readonly PictureSource[]; /** Four colours to draw as they are, instead of taking them from a picture (`WeatherStage`). */ palette?: Palette; /** Behind the whole page, not one stage: fixed to the screen, weaker (`PAGE_BACKDROP_OPACITY`, so muted text holds 4.5:1 on it too) and with no fade at the foot. */ page?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  const apply = useRef<((palette: Palette) => void) | null>(null)
  const shown = src ?? (sources === undefined ? undefined : fallbackOf(sources, 32)?.src)

  // The surface: a renderer for as long as the component is there, and the light it draws by.
  useEffect(() => {
    const target = canvas.current
    if (target === null) return
    const slot = acquireGlSlot()
    if (slot === null) return
    const release = acquireLightInput()
    let renderer: AmbientRenderer | null = null
    let current: Palette | null = null
    let from: Palette | null = null
    let to: Palette | null = null
    let started = 0
    let raf = 0
    const draw = (now: number) => {
      raf = 0
      if (renderer === null || current === null) return
      if (from !== null && to !== null) {
        const t = Math.min(1, (now - started) / PALETTE_MS)
        current = mixPalette(from, to, easeOut(t))
        renderer.setPalette(current)
        if (t >= 1) {
          from = null
          to = null
        }
      }
      // Half a pixel in four: a blur needs no more, and the browser stretches it smooth.
      renderer.resize(Math.max(2, Math.round(target.clientWidth / 4)), Math.max(2, Math.round(target.clientHeight / 4)))
      renderer.draw(lightStore.current)
      if (from !== null) raf = requestAnimationFrame(draw)
    }
    const schedule = () => {
      if (raf === 0 && renderer !== null) raf = requestAnimationFrame(draw)
    }
    const build = () => {
      if (current === null) return
      renderer = createAmbientRenderer(target, current)
      if (renderer !== null) {
        schedule()
        setReady(true)
      }
    }
    apply.current = (next) => {
      if (current === null) {
        current = next
        build()
        return
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        current = next
        from = null
        to = null
      } else {
        from = current
        to = next
        started = performance.now()
      }
      schedule()
    }
    const lost = (event: Event) => {
      event.preventDefault()
      renderer = null
      setReady(false)
    }
    lightStore.listeners.add(schedule)
    target.addEventListener("webglcontextlost", lost)
    target.addEventListener("webglcontextrestored", build)
    const observer = new ResizeObserver(schedule)
    observer.observe(target)
    return () => {
      apply.current = null
      lightStore.listeners.delete(schedule)
      target.removeEventListener("webglcontextlost", lost)
      target.removeEventListener("webglcontextrestored", build)
      observer.disconnect()
      if (raf !== 0) cancelAnimationFrame(raf)
      renderer?.dispose()
      release()
      slot()
      setReady(false)
    }
  }, [])

  // Colours given as they are (the weather's): handed to the surface the same way, and gone over to when they change.
  const given = palette === undefined ? null : palette.flat().join(",")
  useEffect(() => {
    if (palette !== undefined) apply.current?.(palette)
    // `given` stands for the colours: a new array of the same ones is not a change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [given])

  // The picture: its four colours, handed to the surface (a first time it is made from them, after that the colours go over).
  useEffect(() => {
    if (shown === undefined || given !== null) return
    let cancelled = false
    const image = new Image()
    image.crossOrigin = "anonymous"
    image.addEventListener(
      "load",
      () => {
        if (cancelled) return
        try {
          const small = document.createElement("canvas")
          small.width = 16
          small.height = 16
          const context = small.getContext("2d", { willReadFrequently: true })
          if (context === null) return
          context.drawImage(image, 0, 0, 16, 16)
          apply.current?.(paletteOf(context.getImageData(0, 0, 16, 16).data, 16))
        } catch {
          // The picture may not be read (no CORS): the stage keeps its plain ground.
        }
      },
      { once: true },
    )
    image.src = shown
    return () => {
      cancelled = true
    }
  }, [shown, given])

  return (
    <canvas
      ref={canvas}
      aria-hidden="true"
      className={cn(
        "-z-10 size-full opacity-0 transition-opacity",
        page ? "pointer-events-none fixed inset-0" : "absolute inset-0 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]",
        ready && (page ? "opacity-15 dark:opacity-[0.18]" : "opacity-50 dark:opacity-40"),
      )}
    />
  )
}
