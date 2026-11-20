"use client"

import { useEffect, useRef, useState } from "react"

import { Icon } from "./icon"
import { Button } from "./ui/button"

/**
 * Copies a value that is hard to write by hand (an id, a hash, a command, an address) to the clipboard and says so in words
 * (`Kopiert`), announced politely, again on every copy. If the browser refuses, it says that instead of pretending. The value is shown next to it
 * (in a `Code`); the button never hides it.
 */
export function CopyButton({ value, label = "Kopier" }: { value: string; label?: string }) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle")
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  async function copy() {
    clearTimeout(timer.current)
    // Emptied first, so a second copy is a change the status region announces again, not the same «Kopiert» left standing.
    setState("idle")
    let next: "done" | "failed" = "done"
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      next = "failed"
    }
    requestAnimationFrame(() => setState(next))
    timer.current = setTimeout(() => setState("idle"), 2500)
  }
  return (
    <span className="inline-flex items-center gap-2">
      <Button type="button" variant="outline" size="sm" onClick={copy}>
        <Icon name={state === "done" ? "done" : "copy"} slot="start" />
        {label}
      </Button>
      <span role="status" className="text-muted-foreground text-xs">
        {state === "done" ? "Kopiert" : state === "failed" ? "Kunne ikke kopiere" : ""}
      </span>
    </span>
  )
}
