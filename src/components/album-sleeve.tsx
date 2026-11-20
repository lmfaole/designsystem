"use client"

import { useEffect, useRef, useState } from "react"

import { effectsEnabled } from "../lib/effects"
import { acquireGlSlot } from "../lib/gl-budget"
import { lightStore } from "../lib/light"
import { acquireLightInput } from "../lib/light-input"
import { easeOut, paletteOf, type Rgb } from "../lib/palette"
import { DRAWN } from "../lib/picture-frames"
import { fallbackOf, type PictureSource } from "../lib/picture-sources"
import { createSleeveRenderer, type SleeveRenderer } from "../lib/sleeve-shader"
import { cn } from "../lib/utils"
import { Picture } from "./picture"

/** The label of the record: the most vivid of the cover's four colours, so the record belongs to the cover. */
function labelOf(image: HTMLImageElement): Rgb {
  try {
    const small = document.createElement("canvas")
    small.width = 16
    small.height = 16
    const context = small.getContext("2d", { willReadFrequently: true })
    if (context === null) return [180, 60, 50]
    context.drawImage(image, 0, 0, 16, 16)
    const colours = paletteOf(context.getImageData(0, 0, 16, 16).data, 16)
    return colours.reduce((best, colour) => (Math.max(...colour) - Math.min(...colour) > Math.max(...best) - Math.min(...best) ? colour : best))
  } catch {
    return [180, 60, 50]
  }
}

/** How long the record takes to slide out of the sleeve when it is first drawn, in milliseconds. */
const SLIDE_MS = 900

/**
 * An album's sleeve in 3D (the main picture of the page of an album): the cover whole on a slab of plastic with a record pulled half out of it, that tilts toward the page's light (the pointer, and on a phone how it is
 * held) and catches it. It is the cover with something added (a record, a gleam), so it is for covers the app may alter (Last.fm's), never for Spotify's. Until WebGL is ready, and where it is not there or under
 * `prefers-reduced-motion`, it is the cover alone as a sharp square (`Picture`), in the same place, so nothing moves when it takes over: the record is inside the sleeve then, and slides out once (`SLIDE_MS`).
 * After that it is drawn when the light changes and at no other time: nothing loops.
 */
export function AlbumSleeve({ src, sources }: { src?: string | null; sources?: readonly PictureSource[] }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [lit, setLit] = useState(false)
  const shown = src ?? (sources === undefined ? undefined : fallbackOf(sources, DRAWN.square.hero)?.src)

  useEffect(() => {
    const target = canvas.current
    if (shown === undefined || target === null || !effectsEnabled(target) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const slot = acquireGlSlot()
    if (slot === null) return
    const release = acquireLightInput()
    let renderer: SleeveRenderer | null = null
    let loaded: { image: HTMLImageElement; label: Rgb } | null = null
    let raf = 0
    let cancelled = false
    // When the record began to slide out; `null` before it is first drawn. A context given back draws it out at once: the slide is shown once.
    let slideStart: number | null = null
    const draw = () => {
      raf = 0
      if (renderer === null) return
      slideStart ??= performance.now()
      const out = easeOut((performance.now() - slideStart) / SLIDE_MS)
      renderer.resize(Math.max(2, Math.round(target.clientHeight * Math.min(window.devicePixelRatio || 1, 2))))
      renderer.draw(lightStore.current, out)
      // The one move it makes: frames go on only until the record is out, then it waits for the light again.
      if (out < 1) schedule()
    }
    const schedule = () => {
      if (raf === 0 && renderer !== null) raf = requestAnimationFrame(draw)
    }
    const build = () => {
      if (loaded === null || cancelled) return
      renderer = createSleeveRenderer(target, loaded.image, loaded.label)
      if (renderer === null) return
      draw()
      setLit(true)
    }
    const image = new Image()
    image.crossOrigin = "anonymous"
    image.addEventListener(
      "load",
      () => {
        loaded = { image, label: labelOf(image) }
        build()
      },
      { once: true },
    )
    image.src = shown
    const lost = (event: Event) => {
      event.preventDefault()
      renderer = null
      setLit(false)
    }
    lightStore.listeners.add(schedule)
    target.addEventListener("webglcontextlost", lost)
    target.addEventListener("webglcontextrestored", build)
    const observer = new ResizeObserver(schedule)
    observer.observe(target)
    return () => {
      cancelled = true
      lightStore.listeners.delete(schedule)
      target.removeEventListener("webglcontextlost", lost)
      target.removeEventListener("webglcontextrestored", build)
      observer.disconnect()
      if (raf !== 0) cancelAnimationFrame(raf)
      renderer?.dispose()
      release()
      slot()
      setLit(false)
    }
  }, [shown])

  return (
    <div className="relative aspect-[146/100] h-28 shrink-0 sm:h-32 @3xl:h-44 @5xl:h-56">
      <div className={cn("absolute top-0 left-0", lit && "invisible")}>
        <Picture ratio="square" size="hero" corners="sharp" priority src={src ?? null} {...(sources === undefined ? {} : { sources })} />
      </div>
      <canvas ref={canvas} aria-hidden="true" className={cn("absolute inset-0 size-full", !lit && "hidden")} />
    </div>
  )
}
