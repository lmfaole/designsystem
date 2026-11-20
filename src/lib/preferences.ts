/**
 * What a visitor has chosen for how an app looks and behaves (the first-run wizard, `FirstRun`, and the settings page), kept in one cookie, `prefs`, as a query string:
 * `theme=system|light|dark`, `effects=on|off`, `tilt=on|off` and `sections=a,b,c`. What is absent is the default: the device's theme, effects on, tilt off, every section. Pure, so the server reads
 * it before it draws the page and nothing flashes, and a test pins it.
 */

export const PREFS_COOKIE = "prefs"

export type Theme = "system" | "light" | "dark"
export type OnOff = "on" | "off"

export type Prefs = {
  theme: Theme
  effects: OnOff
  tilt: OnOff
  /** The front page's sections, in order; absent is all of them. */
  sections?: string[]
}

export const DEFAULT_PREFS: Prefs = { theme: "system", effects: "on", tilt: "off" }

/** A year, in seconds. */
const MAX_AGE = 60 * 60 * 24 * 365

const isTheme = (value: string | null): value is Theme => value === "system" || value === "light" || value === "dark"
const isOnOff = (value: string | null): value is OnOff => value === "on" || value === "off"

/** The cookie's value read back; anything missing or not understood is the default. Takes the raw (still encoded) value or the decoded one. */
export function parsePrefs(value: string | null | undefined): Prefs {
  if (value === null || value === undefined || value === "") return { ...DEFAULT_PREFS }
  let text = value
  try {
    text = decodeURIComponent(value)
  } catch {
    // Not encoded after all: read as it is.
  }
  const params = new URLSearchParams(text)
  const theme = params.get("theme")
  const effects = params.get("effects")
  const tilt = params.get("tilt")
  const prefs: Prefs = {
    theme: isTheme(theme) ? theme : DEFAULT_PREFS.theme,
    effects: isOnOff(effects) ? effects : DEFAULT_PREFS.effects,
    tilt: isOnOff(tilt) ? tilt : DEFAULT_PREFS.tilt,
  }
  const sections = params.get("sections")
  if (sections !== null) {
    prefs.sections = [
      ...new Set(
        sections
          .split(",")
          .map((section) => section.trim())
          .filter((section) => section !== ""),
      ),
    ]
  }
  return prefs
}

/** The cookie's value (not yet encoded for a cookie): every choice written out, so it reads the same whatever the defaults become. */
export function serializePrefs(prefs: Prefs): string {
  const params = new URLSearchParams({ theme: prefs.theme, effects: prefs.effects, tilt: prefs.tilt })
  if (prefs.sections !== undefined) params.set("sections", prefs.sections.join(","))
  return params.toString()
}

/** A whole `Set-Cookie` value for the serialised prefs: for a year, on the app's base path, `SameSite=Lax`, `Secure`. */
export function prefsCookieString(value: string, path: string): string {
  return `${PREFS_COOKIE}=${encodeURIComponent(value)}; Path=${path === "" ? "/" : path}; Max-Age=${MAX_AGE}; SameSite=Lax; Secure`
}

export type HtmlAttributes = { "data-theme"?: "light" | "dark"; "data-effects"?: "off"; "data-tilt"?: OnOff }

/**
 * What to put on `<html>` on the server, so the page is drawn as chosen from its first frame: `data-theme` only when it is not the device's, `data-effects="off"` only when the effects are off
 * (`lib/effects`), and `data-tilt` always, which the light reads before what the browser has kept (`lib/light-preference`).
 */
export function htmlAttributes(prefs: Prefs): HtmlAttributes {
  const attributes: HtmlAttributes = { "data-tilt": prefs.tilt }
  if (prefs.theme !== "system") attributes["data-theme"] = prefs.theme
  if (prefs.effects === "off") attributes["data-effects"] = "off"
  return attributes
}
