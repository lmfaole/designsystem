"use client"

import { useEffect, useRef, useState, type PointerEvent } from "react"
import { createPortal } from "react-dom"

import { DEFAULT_LIGHT, lightFromPointer } from "../lib/light"
import { acquireLightInput, aimLight, requestTilt, tiltSupport } from "../lib/light-input"
import { sampleCover } from "../lib/sample-cover"
import { Icon } from "./icon"
import { Text } from "./text"
import { Button } from "./ui/button"

type Support = ReturnType<typeof tiltSupport>
type Status = "idle" | "asking" | "on" | "denied"

/** Sets the radio `name` of `form` to `value`, and tells the form, as a click on it would; marked as ours (a `CustomEvent`), so it does not ask again. */
const choose = (form: HTMLFormElement | null, name: string, value: "on" | "off"): void => {
  const field = form?.elements.namedItem(name)
  const radios = field instanceof RadioNodeList ? [...field] : field instanceof HTMLInputElement ? [field] : []
  const radio = radios.find((one) => one instanceof HTMLInputElement && one.value === value)
  if (!(radio instanceof HTMLInputElement) || radio.checked) return
  radio.checked = true
  radio.dispatchEvent(new CustomEvent("change", { bubbles: true }))
}

const WORDS: Record<Support, string> = {
  ask: "Telefonen spør deg først. Trykk på knappen og svar «Tillat».",
  free: "Vipp telefonen, så flytter lyset seg.",
  none: "Bevegelse er ikke støttet på denne enheten. Her følger lyset pekeren i stedet.",
  still: "Enheten din ber om mindre bevegelse, så lyset står stille.",
}

/** Asks for the tilt, says how it went, and sets the form's radio to the answer. */
async function askTilt(form: HTMLFormElement | null, name: string, setStatus: (status: Status) => void) {
  setStatus("asking")
  const granted = await requestTilt()
  setStatus(granted ? "on" : "denied")
  choose(form, name, granted ? "on" : "off")
}

/** What the light does in the card, said on the card itself (the picture is hidden from a screen reader, which hears it from the status region). */
const TAGS: Record<Support, string> = {
  ask: "Telefonen spør deg når du velger dette",
  free: "Vipp telefonen",
  none: "Simulering med peker",
  still: "Står stille: enheten ber om mindre bevegelse",
}

/**
 * The light following how a phone is held, as a picture to choose by. With `mode`, one sample for a `ChoiceCards` option's `preview` (the recommended use, `layout="visual"`, two cards «Følg
 * telefonen» and «Fast lys»):
 *
 * - `mode="follow"`: a lit surface whose pool of light, sun and cover shadow follow the tilt. Choosing the radio `name` (`tilt`) of its form with the value `on` asks the phone (iOS asks the
 *   visitor, and it must come from that tap or key, which it does); a no sets the radio back to `off`. What happened is said in a status region for a screen reader. On a desktop the pointer over
 *   the surface moves the light instead, labelled «Simulering med peker».
 * - `mode="still"`: the same surface with the light where it stands when nothing moves it.
 *
 * Without `mode` (deprecated, kept as it was): one surface, a «Tillat bevegelse» button and the status, above a separate radio. Under `prefers-reduced-motion` nothing moves. `src` is a cover to
 * show; without one a made-up cover is drawn in the theme's colours.
 */
export function TiltPreview({ name = "tilt", src, mode }: { name?: string; src?: string; mode?: "follow" | "still" }) {
  const root = useRef<HTMLDivElement>(null)
  const [support, setSupport] = useState<Support>("none")
  const [status, setStatus] = useState<Status>("idle")
  const [cover, setCover] = useState<string | null>(src ?? null)
  const [mounted, setMounted] = useState(false)

  const ask = (form: HTMLFormElement | null) => askTilt(form, name, setStatus)

  useEffect(() => {
    const element = root.current
    if (element === null) return
    setSupport(tiltSupport())
    if (src === undefined) setCover(sampleCover(element))
    setMounted(true)
    if (mode === "still") return
    const release = acquireLightInput()
    const form = element.closest("form")
    const change = (event: Event) => {
      const target = event.target
      if (event instanceof CustomEvent || !(target instanceof HTMLInputElement) || target.name !== name || !target.checked || target.value !== "on") return
      const can = tiltSupport()
      if (can === "ask" || can === "free") void askTilt(form, name, setStatus)
    }
    form?.addEventListener("change", change)
    return () => {
      form?.removeEventListener("change", change)
      release()
    }
  }, [name, src, mode])

  const simulated = support === "none" && mode !== "still"
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (!simulated) return
    // The page's pointer would put the light by the whole screen: here the surface is the screen.
    event.stopPropagation()
    const box = event.currentTarget.getBoundingClientRect()
    aimLight(lightFromPointer(event.clientX - box.left, event.clientY - box.top, box.width, box.height))
  }

  const said = status === "on" ? "Lyset følger nå telefonen." : status === "denied" ? "Du sa nei, så lyset står stille. Du kan endre det i nettleserens innstillinger for nettstedet." : WORDS[support]

  if (mode !== undefined) {
    const tag = mode === "still" ? null : status === "denied" ? "Du sa nei: lyset står stille" : status === "on" ? "Lyset følger telefonen" : TAGS[support]
    return (
      <div
        ref={root}
        onPointerMove={move}
        onPointerLeave={() => simulated && aimLight(DEFAULT_LIGHT)}
        className={`light-spot bg-muted/30 relative grid h-44 place-items-center overflow-hidden ${mode === "still" ? "[--light-x:-0.5] [--light-y:-0.7]" : ""}`}
      >
        <span aria-hidden="true" className="light-dot text-foreground">
          <Icon name="sun" size="lg" />
        </span>
        <span aria-hidden="true" className="lit-frame bg-muted block size-24 overflow-hidden rounded-md">
          {cover === null ? null : <img src={cover} alt="" className="size-full object-cover" />}
        </span>
        {tag === null ? null : <span className="bg-background/80 text-muted-foreground absolute start-2 bottom-2 rounded-sm px-1.5 py-0.5 text-xs font-medium">{tag}</span>}
        {mode === "follow" && mounted && status !== "idle"
          ? createPortal(
              <p role="status" className="sr-only">
                {said}
              </p>,
              document.body,
            )
          : null}
      </div>
    )
  }

  return (
    <div ref={root} className="grid gap-3">
      <div onPointerMove={move} onPointerLeave={() => simulated && aimLight(DEFAULT_LIGHT)} className="light-spot border-border bg-muted/30 relative grid h-44 place-items-center overflow-hidden rounded-xl border">
        <span aria-hidden="true" className="light-dot text-foreground">
          <Icon name="sun" size="lg" />
        </span>
        <span aria-hidden="true" className="lit-frame bg-muted block size-24 overflow-hidden rounded-md">
          {cover === null ? null : <img src={cover} alt="" className="size-full object-cover" />}
        </span>
        {simulated ? <span className="bg-background/80 text-muted-foreground absolute start-2 bottom-2 rounded-sm px-1.5 py-0.5 text-xs font-medium">Simulering med peker</span> : null}
      </div>
      <div className="grid gap-2" role="status">
        <Text size="sm" tone="muted">
          {said}
        </Text>
      </div>
      {support === "ask" || support === "free" ? (
        <div>
          <Button type="button" variant="outline" aria-disabled={status === "asking" ? true : undefined} onClick={(event) => status !== "asking" && void ask(event.currentTarget.closest("form"))}>
            <Icon name="device" slot="start" />
            Tillat bevegelse
          </Button>
        </div>
      ) : null}
    </div>
  )
}
