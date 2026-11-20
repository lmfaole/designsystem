import type { ReactNode } from "react"

import { ENTITY_LINK } from "../lib/link-style"

const LOOKS = { block: "motion-lift block rounded-lg no-underline", strong: "font-medium" } as const

/**
 * A link to the card of a name that has a page (`detailHref`), with the look every such name shares. `block` is for a link
 * that holds a picture and a text: it fills its line, is not underlined and lifts a little under a pointer. `strong` is the name of a row.
 */
export function CardLink({ href, look, children }: { href: string; look?: keyof typeof LOOKS; children: ReactNode }) {
  return (
    <a href={href} className={look === undefined ? ENTITY_LINK : `${ENTITY_LINK} ${LOOKS[look]}`}>
      {children}
    </a>
  )
}
