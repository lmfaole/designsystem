import type { ReactNode } from "react"

import { PAGE_COLUMN, PAGE_PADDING_Y, PANE_COLUMN, READING_COLUMN } from "../lib/page-width"

/** The id of the page area, which the skip link points at. */
export const MAIN_ID = "main-content"

const FOOT = { none: PAGE_PADDING_Y, bar: "pt-10 pb-[calc(--spacing(24)+var(--safe-bottom))]" } as const

/**
 * With a `NavBar`: room at the foot for the bar on a phone, and room at the left for the rail from tablet width up: the rail's
 * 14rem plus the column's gutter. `2xl:pl-66` is needed because `PAGE_COLUMN`'s `2xl:px-10` would otherwise win over `md:pl-60`.
 */
const WITH_NAV = "pt-10 pb-[calc(--spacing(24)+var(--safe-bottom))] md:pb-10 md:pl-60 2xl:pl-66"

/**
 * The frame of a page: the skip link, and the page in `<main>`, in the one column every page stands in. It has no
 * state, so a server renders it and sends no script for it. `foot` is the room at the bottom: `bar` keeps the page
 * clear of a bar fixed to the foot of the screen. `after` follows the page inside the column.
 */
export function PageLayout({ foot = "none", width = "reading", nav, after, children }: { foot?: keyof typeof FOOT; /** The app's `NavBar`: the page leaves room for it, at the foot on a phone and at the left from tablet width up. */ nav?: ReactNode; /** `reading` (the default): one column at a readable width, centred. `pane`: the reading column and a `Split` pane beside it on a wide screen (a detail page with a cover and facts). `wide`: the whole page area, for pages that are mostly pictures or charts. */ width?: "reading" | "pane" | "wide"; after?: ReactNode; children: ReactNode }) {
  return (
    <>
      <a
        href={`#${MAIN_ID}`}
        className="bg-background focus:ring-ring sr-only z-[60] rounded-md px-3 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:ring-2"
      >
        Hopp til innholdet
      </a>
      {nav}
      {/* A named container, so a page can bleed out of the column to the width of the page area (`margin-inline: calc(50% - 50cqw)`) without 100vw overshooting. */}
      <main id={MAIN_ID} className="[container:page/inline-size] outline-none">
        <div className={`${PAGE_COLUMN} ${nav === undefined ? FOOT[foot] : WITH_NAV}`}>
          <div className={width === "reading" ? READING_COLUMN : width === "pane" ? PANE_COLUMN : ""}>
            {children}
            {after}
          </div>
        </div>
      </main>
    </>
  )
}
