/**
 * Where the app is mounted, from Vite's `base` (`/music/`; `/` for the app at the root), always with a
 * trailing slash. Node's test runner has no `import.meta.env`, so it is the root there.
 */
export const BASE_URL: string = import.meta.env?.BASE_URL ?? "/"

/** A path of this app (`/covers/x.jpg`) as the browser asks for it: under the app's base. */
export function appUrl(path: string, base: string = BASE_URL): string {
  if (/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(path)) return path
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`
}
