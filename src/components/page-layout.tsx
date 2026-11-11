import type { ReactNode } from "react"

import { PAGE_COLUMN } from "../lib/page-width"

/** The id of the page area, which the skip link points at. */
export const MAIN_ID = "main-content"

const FOOT = { none: "py-10", bar: "pt-10 pb-[calc(--spacing(24)+var(--safe-bottom))]" } as const

/**
 * The frame of a page: the skip link, and the page in `<main>`, in the one column every page stands in. It has no
 * state, so a server renders it and sends no script for it. `foot` is the room at the bottom: `bar` keeps the page
 * clear of a bar fixed to the foot of the screen. `after` follows the page inside the column.
 */
export function PageLayout({ foot = "none", after, children }: { foot?: keyof typeof FOOT; after?: ReactNode; children: ReactNode }) {
  return (
    <>
      <a
        href={`#${MAIN_ID}`}
        className="bg-background focus:ring-ring sr-only z-[60] rounded-md px-3 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:ring-2"
      >
        Hopp til innholdet
      </a>
      {/* A named container, so a page can bleed out of the column to the width of the page area (`margin-inline: calc(50% - 50cqw)`) without 100vw overshooting. */}
      <main id={MAIN_ID} className="[container:page/inline-size] outline-none">
        <div className={`${PAGE_COLUMN} ${FOOT[foot]}`}>
          {children}
          {after}
        </div>
      </main>
    </>
  )
}
