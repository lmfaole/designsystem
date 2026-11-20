"use client"

import { SEEN_COOKIE, addSeen, seenCookieString } from "./onboarding"

const readSeen = (): string | undefined => {
  const prefix = `${SEEN_COOKIE}=`
  return document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix))
    ?.slice(prefix.length)
}

/**
 * Records in the browser that `id` has been seen at `version`, in the `seen` cookie under `path` (the app's base path), so the
 * server leaves it out of the next page. Does nothing outside a browser.
 */
export function markSeen(id: string, version: number, path: string): void {
  if (typeof document === "undefined") return
  document.cookie = seenCookieString(addSeen(readSeen(), id, version), path)
}
