"use client"

import { useEffect, useId, useRef, useState } from "react"

import { Icon } from "./icon"
import { Text } from "./text"
import { Button } from "./ui/button"
import { markSeen } from "../lib/onboarding-client"

/** The event a Chromium browser fires when the page can be installed; not in TypeScript's DOM types. */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

type Mode = "install" | "ios"

const isInstallEvent = (event: Event): event is BeforeInstallPromptEvent => "prompt" in event && "userChoice" in event

// Safari on iOS says it runs from the home screen with its own `navigator.standalone`.
const standalone = (): boolean => window.matchMedia("(display-mode: standalone)").matches || ("standalone" in navigator && navigator.standalone === true)

/** Safari on an iPhone or iPad (an iPad says it is a Mac with touch), where installing is «Legg til på Hjem-skjerm» in the share menu. */
const iosSafari = (): boolean => {
  const agent = navigator.userAgent
  const ios = /iPhone|iPad|iPod/.test(agent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  return ios && /Safari/.test(agent) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(agent)
}

/**
 * The offer to install the app, once, in the flow of the front page: in a browser that can install it (Chromium's
 * `beforeinstallprompt`) a button «Installer» that opens the browser's own dialog, and in Safari on an iPhone or iPad the way to do it
 * by hand. Nothing on the server, nothing when `seen` (the `seen` cookie, `isSeen(seen, id)`), nothing in the installed app, and nothing
 * where the browser cannot install. «Ikke nå», an answer in the browser's dialog and an install record `id` under `cookiePath`, so it is
 * not offered again. `preview` shows a mode at once, for the docs only.
 */
export function InstallPrompt({ appName, seen, cookiePath, id = "install", preview }: { appName: string; seen: boolean; cookiePath: string; id?: string; preview?: Mode }) {
  const [mode, setMode] = useState<Mode | null>(preview ?? null)
  const deferred = useRef<BeforeInstallPromptEvent | null>(null)
  const titleId = useId()

  useEffect(() => {
    if (seen || preview !== undefined || standalone()) return
    const onPrompt = (event: Event): void => {
      if (!isInstallEvent(event)) return
      event.preventDefault()
      deferred.current = event
      setMode("install")
    }
    const onInstalled = (): void => {
      deferred.current = null
      setMode(null)
      markSeen(id, 1, cookiePath)
    }
    window.addEventListener("beforeinstallprompt", onPrompt)
    window.addEventListener("appinstalled", onInstalled)
    if (iosSafari()) setMode("ios")
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt)
      window.removeEventListener("appinstalled", onInstalled)
    }
  }, [seen, preview, id, cookiePath])

  if (seen || mode === null) return null

  const close = (): void => {
    deferred.current = null
    setMode(null)
    markSeen(id, 1, cookiePath)
  }

  const install = async (): Promise<void> => {
    const event = deferred.current
    if (event === null) return
    await event.prompt()
    await event.userChoice
    close()
  }

  return (
    <section aria-labelledby={titleId} className="border-border flex items-start gap-3 rounded-lg border p-4">
      <span className="pt-0.5">
        <Icon name="download" tone="muted" />
      </span>
      <div className="grid min-w-0 flex-1 gap-3">
        <div className="grid gap-1">
          <Text weight="medium" id={titleId}>
            Installer {appName}
          </Text>
          {mode === "install" ? (
            <Text size="sm" tone="muted">
              Legg appen på hjem-skjermen eller i programmene, så åpner den i et eget vindu.
            </Text>
          ) : (
            <Text size="sm" tone="muted">
              Trykk Del <Icon name="share" size="sm" tone="muted" /> og så Legg til på Hjem-skjerm.
            </Text>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {mode === "install" ? (
            <Button type="button" onClick={() => void install()}>
              Installer
            </Button>
          ) : null}
          <Button type="button" variant={mode === "install" ? "ghost" : "outline"} onClick={close}>
            Ikke nå
          </Button>
        </div>
      </div>
    </section>
  )
}
