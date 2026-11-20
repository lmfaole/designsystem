"use client"

import { useEffect, useRef, useState } from "react"

import { sampleCover } from "../lib/sample-cover"
import { AlbumSleeve } from "./album-sleeve"
import { Stage } from "./stage"
import { Text } from "./text"

type Choice = "on" | "off"

const SAMPLES = [
  { choice: "on", title: "Med effekter", body: "Bakgrunnen og coveret tegnes i 3D og følger lyset." },
  { choice: "off", title: "Uten effekter", body: "Det samme, flatt og stille. Bruker mindre strøm." },
] as const

/** The value of the radio `name` in `form`, or `null` where there is none. */
const chosen = (form: HTMLFormElement | null, name: string): Choice | null => {
  const field = form?.elements.namedItem(name)
  const value = field instanceof RadioNodeList || field instanceof HTMLInputElement ? field.value : null
  return value === "on" || value === "off" ? value : null
}

/**
 * The effects (WebGL) as they are and as they are not, side by side: the same `Stage` and `AlbumSleeve` live, and below `data-effects="off"` as a visitor who turns them off gets them, flat and
 * still. The one that matches the radio `name` (`effects`) of the same form is marked as chosen, and follows it as it changes; outside a form `value` says which. The live one is drawn only once it
 * is on the screen, and is drawn even where the page has the effects off, since it is a preview. Under `prefers-reduced-motion` both stand still, and it says so. `src` is a cover to show; without
 * one a made-up cover is drawn in the theme's colours.
 */
export function EffectsPreview({ name = "effects", value = "on", src }: { name?: string; value?: Choice; src?: string }) {
  const root = useRef<HTMLDivElement>(null)
  const [choice, setChoice] = useState<Choice>(value)
  const [cover, setCover] = useState<string | null>(src ?? null)
  const [visible, setVisible] = useState(false)
  const [still, setStill] = useState(false)

  useEffect(() => {
    const element = root.current
    if (element === null) return
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    if (src === undefined) setCover(sampleCover(element))
    const form = element.closest("form")
    const sync = () => setChoice(chosen(form, name) ?? value)
    sync()
    form?.addEventListener("change", sync)
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setVisible(true)
        observer.disconnect()
      }
    })
    observer.observe(element)
    return () => {
      form?.removeEventListener("change", sync)
      observer.disconnect()
    }
  }, [name, value, src])

  return (
    <div ref={root} className="grid gap-2">
      <div className="grid gap-3 sm:grid-cols-2">
        {SAMPLES.map((sample) => {
          const selected = sample.choice === choice
          return (
            <figure key={sample.choice} data-effects={sample.choice} className={`grid content-start gap-2 rounded-xl border p-2 ${selected ? "border-primary ring-primary ring-1" : "border-border"}`}>
              <div aria-hidden="true" className="@container">
                <Stage picture={sample.choice === "on" && !visible ? null : cover}>
                  <div className="flex justify-center">{cover === null || (sample.choice === "on" && !visible) ? <div className="bg-muted aspect-[146/100] h-28 rounded-sm" /> : <AlbumSleeve key={cover} src={cover} />}</div>
                </Stage>
              </div>
              <figcaption className="grid gap-0.5 px-1">
                <Text as="span" size="sm" weight="medium">
                  {sample.title}
                  {selected ? <span className="text-muted-foreground font-normal"> · valgt</span> : null}
                </Text>
                <Text as="span" size="xs" tone="muted">
                  {sample.body}
                </Text>
              </figcaption>
            </figure>
          )
        })}
      </div>
      {still ? (
        <Text size="sm" tone="muted">
          Enheten din ber om mindre bevegelse, så effektene står stille her uansett.
        </Text>
      ) : null}
    </div>
  )
}
