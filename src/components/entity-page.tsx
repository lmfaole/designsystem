// Astro: plain HTML, or `client:visible` on the app's view when the page holds charts.

import type { ReactNode } from "react"

import { ErrorMessage } from "./error-message"

/**
 * The own page of one thing (`/film/[slug]`): `data` is the answer for its slug, and `null` is a slug with no page, which is
 * an error message (the Astro page may answer 404 itself instead). `children` draws the page.
 */
export function EntityPage<Data>({ data, children }: { data: Data | null; children: (data: Data) => ReactNode }) {
  if (data === null) return <ErrorMessage error={new Error("Fant ingen side her.")} />
  return <>{children(data)}</>
}
