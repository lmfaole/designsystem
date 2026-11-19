"use client"

import { useEffect, useState } from "react"

import { Banner } from "./banner"

/**
 * Says so when the device is offline. The live region is always on the page, so a change is announced once and politely; what it says is a
 * hint, because `navigator.onLine` only knows that a network exists, not that a source can be reached (MDN): nothing is disabled or hidden,
 * and a source that really fails shows its own error in its own part. Offline is not an error; the page that is on screen is the last one
 * that was fetched. Only one of these on a page, and it goes at the top.
 */
export function ConnectionBanner() {
  const [offline, setOffline] = useState(false)
  useEffect(() => {
    setOffline(!navigator.onLine)
    const off = () => setOffline(true)
    const on = () => setOffline(false)
    window.addEventListener("offline", off)
    window.addEventListener("online", on)
    return () => {
      window.removeEventListener("offline", off)
      window.removeEventListener("online", on)
    }
  }, [])
  return (
    <div role="status">
      {offline ? (
        <Banner tone="warning" title="Du er frakoblet">
          Det du ser er fra sist siden ble hentet. Alt kan leses som før.
        </Banner>
      ) : null}
    </div>
  )
}
