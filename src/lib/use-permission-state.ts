"use client"

import { useEffect, useState } from "react"

import type { PermissionCardState } from "../components/permission-card"

export type PermissionKind = "geolocation" | "notifications"

const supported = (kind: PermissionKind): boolean => (kind === "geolocation" ? "geolocation" in navigator : "Notification" in globalThis)

const fromNotification = (): PermissionCardState => {
  const permission = Notification.permission
  return permission === "default" ? "prompt" : permission
}

/**
 * Whether the browser has given the page `kind`, for a `PermissionCard`: `checking` on the server and in the first render (so both
 * match), then `prompt`, `granted`, `denied` or `unsupported`, and it follows a change made in the browser's settings while the page is
 * open. Asking is the app's (`navigator.geolocation.getCurrentPosition`, `Notification.requestPermission`): show `pending` while it
 * waits and `error` when it fails, over what this returns.
 */
export function usePermissionState(kind: PermissionKind): PermissionCardState {
  const [state, setState] = useState<PermissionCardState>("checking")
  useEffect(() => {
    if (!supported(kind)) {
      setState("unsupported")
      return
    }
    // Without the Permissions API (or with no answer for this name) the state is unknown until asked: offer to ask.
    const fallback = (): void => setState(kind === "notifications" ? fromNotification() : "prompt")
    if (!("permissions" in navigator) || typeof navigator.permissions.query !== "function") {
      fallback()
      return
    }
    let status: PermissionStatus | null = null
    let active = true
    const update = (): void => {
      if (status !== null) setState(status.state)
    }
    navigator.permissions.query({ name: kind }).then(
      (result) => {
        if (!active) return
        status = result
        update()
        result.addEventListener("change", update)
      },
      () => {
        if (active) fallback()
      },
    )
    return () => {
      active = false
      status?.removeEventListener("change", update)
    }
  }, [kind])
  return state
}
