/**
 * What a visitor has seen of an app's onboarding (an intro, a «Nytt» badge, the offer to install), kept in one cookie that the
 * server reads, so a page renders without what was dismissed and nothing flashes. The value is a comma-separated list of
 * `id@version` («intro-transport@1,new-historikk@1,install@1»), oldest first; a garbled part is ignored. Raising an intro's
 * version shows it again to those who saw an older one. Strictly functional: flags, no tracking.
 */

export const SEEN_COOKIE = "seen"

/** What has been seen: an id and the highest version of it. */
export type Seen = ReadonlyMap<string, number>

const MAX_ENTRIES = 60
const MAX_LENGTH = 1500
const ID = /^[a-z0-9][a-z0-9_-]{0,63}$/
const ENTRY = /^([^@]+)@(\d{1,6})$/

const decode = (value: string): string => {
  if (!value.includes("%")) return value
  try {
    return decodeURIComponent(value)
  } catch {
    return ""
  }
}

const validVersion = (version: number): boolean => Number.isInteger(version) && version >= 1

/** The seen ids in the cookie's value (raw or URL-encoded); a missing value is nothing seen. */
export function parseSeen(value: string | undefined | null): Seen {
  const seen = new Map<string, number>()
  if (value === undefined || value === null) return seen
  for (const part of decode(value).split(",")) {
    const match = ENTRY.exec(part.trim())
    if (match === null) continue
    const id = match[1] ?? ""
    const version = Number(match[2])
    if (!ID.test(id) || !validVersion(version)) continue
    const known = seen.get(id)
    if (known !== undefined) seen.delete(id)
    seen.set(id, Math.max(known ?? 0, version))
  }
  return seen
}

/** Whether `id` has been seen at `version` or a later one. */
export function isSeen(seen: Seen, id: string, version = 1): boolean {
  return (seen.get(id) ?? 0) >= version
}

const serialise = (seen: Seen): string => [...seen].map(([id, version]) => `${id}@${version}`).join(",")

/**
 * The cookie's value with `id@version` added as the newest entry (once; a later version replaces an earlier one, never the other
 * way). The oldest entries go when there are more than 60 or the value is longer than 1500 characters. An id that is not lowercase
 * letters, digits, `-` and `_` is not added.
 */
export function addSeen(value: string | undefined | null, id: string, version = 1): string {
  const seen = new Map(parseSeen(value))
  if (ID.test(id) && validVersion(version)) {
    const known = seen.get(id) ?? 0
    seen.delete(id)
    seen.set(id, Math.max(known, version))
  }
  while (seen.size > MAX_ENTRIES || (seen.size > 1 && serialise(seen).length > MAX_LENGTH)) {
    const oldest = seen.keys().next().value
    if (oldest === undefined) break
    seen.delete(oldest)
  }
  return serialise(seen)
}

/** A `Set-Cookie` value (or `document.cookie` assignment) for the seen cookie under the app's base path, kept a year. */
export function seenCookieString(value: string, path: string): string {
  return `${SEEN_COOKIE}=${encodeURIComponent(value)}; path=${path}; max-age=31536000; samesite=lax; secure`
}

/** Whether something is still new: `now` is before `until` (both ISO times). A time that cannot be read is not new. */
export function isNew(until: string, now: string): boolean {
  const end = Date.parse(until)
  const at = Date.parse(now)
  if (Number.isNaN(end) || Number.isNaN(at)) return false
  return at < end
}
