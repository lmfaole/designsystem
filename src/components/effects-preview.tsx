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

/** The cover on its stage, as the effects `choice` draws it; the live one waits for `visible`. */
function Sample({ choice, cover, visible }: { choice: Choice; cover: string | null; visible: boolean }) {
  const waiting = cover === null || (choice === "on" && !visible)
  return (
    <div data-effects={choice} aria-hidden="true" className="@container">
      <Stage picture={waiting ? null : cover}>
        <div className="flex justify-center">{waiting ? <div className="bg-muted aspect-[146/100] h-28 rounded-sm sm:h-32" /> : <AlbumSleeve key={cover} src={cover} />}</div>
      </Stage>
    </div>
  )
}

/**
 * The effects (WebGL) as a picture to choose by. With `mode`, one sample for a `ChoiceCards` option's `preview` (the recommended use, `layout="visual"`): `mode="on"` is the same `Stage` and
 * `AlbumSleeve` live, drawn only once it is on the screen and even where the page has the effects off, since it is a preview; `mode="off"` is what a visitor who turns them off gets, flat and
 * still (`data-effects="off"`). Under `prefers-reduced-motion` the live one stands still too, and says so. `src` is a cover to show; without one a made-up cover is drawn in the theme's colours.
 *
 * Without `mode` (deprecated, kept as it was): both side by side above a separate radio, the one matching the radio `name` (`effects`) of the same form marked as chosen.
 */
export function EffectsPreview({ name = "effects", value = "on", src, mode }: { name?: string; value?: Choice; src?: string; mode?: Choice }) {
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
    const form = mode === undefined ? element.closest("form") : null
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
  }, [name, value, src, mode])

  if (mode !== undefined) {
    return (
      <div ref={root} className="relative">
        <Sample choice={mode} cover={cover} visible={visible} />
        {mode === "on" && still ? <span className="bg-background/80 text-muted-foreground absolute start-2 bottom-2 rounded-sm px-1.5 py-0.5 text-xs font-medium">Står stille: enheten ber om mindre bevegelse</span> : null}
      </div>
    )
  }

  return (
    <div ref={root} className="grid gap-2">
      <div className="grid gap-3 sm:grid-cols-2">
        {SAMPLES.map((sample) => {
          const selected = sample.choice === choice
          return (
            <figure key={sample.choice} className={`grid content-start gap-2 rounded-xl border p-2 ${selected ? "border-primary ring-primary ring-1" : "border-border"}`}>
              <Sample choice={sample.choice} cover={cover} visible={visible} />
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
