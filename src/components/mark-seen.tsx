"use client"

import { useEffect } from "react"

import { markSeen } from "../lib/onboarding-client"

/**
 * Records that the reader has been here: on the page a `NewBadge` points to, it adds `id@version` to the `seen` cookie under
 * `cookiePath` once the page is shown, so the badge is gone on the next page. Draws nothing.
 */
export function MarkSeen({ id, version = 1, cookiePath }: { id: string; version?: number; cookiePath: string }) {
  useEffect(() => markSeen(id, version, cookiePath), [id, version, cookiePath])
  return null
}
