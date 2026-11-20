"use client"

import { useEffect, useRef, useState } from "react"

import { createAmbientRenderer, type AmbientRenderer } from "../lib/ambient-shader"
import { lightStore } from "../lib/light"
import { acquireLightInput } from "../lib/light-input"
import { paletteOf } from "../lib/palette"
import { fallbackOf, type PictureSource } from "../lib/picture-sources"
import { cn } from "../lib/utils"

/**
 * Four soft pools of colour taken from a picture, drawn in WebGL behind the head of a page (`DetailHeader`), that move with the page's light: the pointer, and on a phone how it is held. Only four colours are
 * taken from the picture, never the picture itself, so a source that forbids altering its pictures (Spotify's) is not altered. It is drawn when the light changes and at no other time: nothing loops, so
 * there is nothing to pause and it costs no battery at rest. Where WebGL is not there, or the picture may not be read (no CORS), the head has its plain tinted ground. It is decoration, hidden from assistive technology.
 */
export function AmbientBackdrop({ src, sources }: { src?: string | null; sources?: readonly PictureSource[] }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  const shown = src ?? (sources === undefined ? undefined : fallbackOf(sources, 32)?.src)

  useEffect(() => {
    const target = canvas.current
    if (shown === undefined || target === null) return
    let renderer: AmbientRenderer | null = null
    let raf = 0
    let cancelled = false
    const release = acquireLightInput()
    const draw = () => {
      raf = 0
      if (renderer === null) return
      // Half a pixel in four: a blur needs no more, and the browser stretches it smooth.
      renderer.resize(Math.max(2, Math.round(target.clientWidth / 4)), Math.max(2, Math.round(target.clientHeight / 4)))
      renderer.draw(lightStore.current)
    }
    const schedule = () => {
      if (raf === 0 && renderer !== null) raf = requestAnimationFrame(draw)
    }
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
            renderer = createAmbientRenderer(target, paletteOf(context.getImageData(0, 0, 16, 16).data, 16))
          } catch {
            return
          }
          if (renderer === null) return
          draw()
          setReady(true)
      },
      { once: true },
    )
    image.src = shown
    lightStore.listeners.add(schedule)
    const observer = new ResizeObserver(schedule)
    observer.observe(target)
    return () => {
      cancelled = true
      lightStore.listeners.delete(schedule)
      observer.disconnect()
      if (raf !== 0) cancelAnimationFrame(raf)
      renderer?.dispose()
      release()
      setReady(false)
    }
  }, [shown])

  return <canvas ref={canvas} aria-hidden="true" className={cn("absolute inset-0 -z-10 size-full [mask-image:linear-gradient(to_bottom,black_60%,transparent)] opacity-0 transition-opacity", ready && "opacity-50 dark:opacity-40")} />
}
