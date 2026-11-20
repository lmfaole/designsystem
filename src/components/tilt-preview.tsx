"use client"

import { useEffect, useRef, useState, type PointerEvent } from "react"

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

/**
 * A small lit surface that shows the light following how a phone is held: a pool of light and a sun where the light is, and a cover whose shadow falls away from it. «Tillat bevegelse» asks the
 * phone (iOS asks the visitor, from this tap) and sets the radio `name` (`tilt`) of the same form to «on»; a no sets it back to «off» and says so. Choosing «on» in that radio asks too, since the
 * choice is a tap. On a desktop it says the device has no tilt and lets the pointer over the surface move the light instead, marked as a simulation. Under `prefers-reduced-motion` nothing moves.
 */
/** Asks for the tilt, says how it went, and sets the form's radio to the answer. */
async function askTilt(form: HTMLFormElement | null, name: string, setStatus: (status: Status) => void) {
  setStatus("asking")
  const granted = await requestTilt()
  setStatus(granted ? "on" : "denied")
  choose(form, name, granted ? "on" : "off")
}

export function TiltPreview({ name = "tilt", src }: { name?: string; src?: string }) {
  const root = useRef<HTMLDivElement>(null)
  const [support, setSupport] = useState<Support>("none")
  const [status, setStatus] = useState<Status>("idle")
  const [cover, setCover] = useState<string | null>(src ?? null)

  const ask = (form: HTMLFormElement | null) => askTilt(form, name, setStatus)

  useEffect(() => {
    const element = root.current
    if (element === null) return
    setSupport(tiltSupport())
    if (src === undefined) setCover(sampleCover(element))
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
  }, [name, src])

  const simulated = support === "none"
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (!simulated) return
    // The page's pointer would put the light by the whole screen: here the surface is the screen.
    event.stopPropagation()
    const box = event.currentTarget.getBoundingClientRect()
    aimLight(lightFromPointer(event.clientX - box.left, event.clientY - box.top, box.width, box.height))
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
          {status === "on" ? "Lyset følger nå telefonen." : status === "denied" ? "Du sa nei, så lyset står stille. Du kan endre det i nettleserens innstillinger for nettstedet." : WORDS[support]}
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
