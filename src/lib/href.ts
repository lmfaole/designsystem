import { appUrl } from "./base-url.ts"

/** A path of this app with a query string, as a plain link needs it: under the app's base, parameters in the order given, none left empty. */
export function searchHref(path: string, search: Record<string, string> = {}): string {
  const query = new URLSearchParams(Object.entries(search).filter(([, value]) => value !== "")).toString()
  return query === "" ? appUrl(path) : `${appUrl(path)}?${query}`
}

/** The current page with these parameters changed and the others kept, for a select that goes to another period. */
export function searchHrefHere(changes: Record<string, string>): string {
  const search = new URLSearchParams(window.location.search)
  for (const [name, value] of Object.entries(changes)) search.set(name, value)
  return `${window.location.pathname}?${search.toString()}`
}
