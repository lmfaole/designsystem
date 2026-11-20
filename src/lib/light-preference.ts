/**
 * What the reader has said about letting the light follow the phone (`deviceorientation`), kept in the browser so that they are asked once, not at every visit. `on`: they
 * said yes; `denied`: they said no (not asked again); nothing: not asked yet. Storage can be missing or refuse (a private window, blocked site data), and then nothing is kept and
 * nothing breaks. Pure over the storage it is given, so a test pins it.
 */

export type TiltPreference = "on" | "denied" | null

export const TILT_KEY = "ds-light-tilt"

type Reading = Pick<Storage, "getItem">
type Writing = Pick<Storage, "setItem" | "removeItem">

export function readTiltPreference(storage: Reading | null): TiltPreference {
  try {
    const value = storage?.getItem(TILT_KEY)
    return value === "on" || value === "denied" ? value : null
  } catch {
    return null
  }
}

export function writeTiltPreference(storage: Writing | null, value: TiltPreference): void {
  try {
    if (value === null) storage?.removeItem(TILT_KEY)
    else storage?.setItem(TILT_KEY, value)
  } catch {
    // Kept nowhere: the reader is asked again next time, which is all that is lost.
  }
}

/**
 * The answer that counts: what the app has put on `<html>` from the visitor's choice (`data-tilt`, from the `prefs` cookie, `lib/preferences`) comes first, `on` as a yes and `off` as a no; where it
 * says nothing, what the browser has kept.
 */
export function resolveTiltPreference(attribute: string | null | undefined, storage: Reading | null): TiltPreference {
  if (attribute === "on") return "on"
  if (attribute === "off") return "denied"
  return readTiltPreference(storage)
}

/** The browser's local storage, or `null` where there is none or touching it throws. */
export function browserStorage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage
  } catch {
    return null
  }
}
