import type { ReactNode } from "react"

import { ENTITY_LINK } from "../lib/link-style"

/**
 * Text in the few forms the design system has, so an app never sets a size, a weight or a colour itself
 * (`docs/UI-COMPONENTS.md`). `Heading` is the look of a heading and `level` the element, so the outline of a page and
 * its looks are chosen apart.
 */
const SIZES = { xs: "text-xs", sm: "text-sm", base: "text-base", lg: "text-lg" } as const
const TONES = { default: "", muted: "text-muted-foreground", destructive: "text-destructive" } as const
const WEIGHTS = { normal: "", medium: "font-medium", semibold: "font-semibold" } as const
const HEADINGS = {
  page: "font-heading text-3xl font-medium text-balance",
  section: "text-lg font-semibold",
  label: "text-sm font-semibold tracking-widest text-muted-foreground uppercase",
  item: "font-heading text-base font-medium",
} as const

interface TextProps {
  as?: "p" | "span" | "div" | "small" | "time" | "dt" | "dd" | "li"
  size?: keyof typeof SIZES
  tone?: keyof typeof TONES
  weight?: keyof typeof WEIGHTS
  /** Figures that line up under each other: a count, a clock. */
  numeric?: boolean
  /** One line, cut with an ellipsis; without it a long word breaks where it must. */
  truncate?: boolean
  children?: ReactNode
  id?: string
  dateTime?: string
}

export function Text({ as: Tag = "p", size = "base", tone = "default", weight = "normal", numeric = false, truncate = false, children, ...rest }: TextProps) {
  return (
    <Tag className={`min-w-0 ${SIZES[size]} ${TONES[tone]} ${WEIGHTS[weight]} ${numeric ? "tabular-nums" : ""} ${truncate ? "truncate" : "[overflow-wrap:anywhere]"}`} {...rest}>
      {children}
    </Tag>
  )
}

export function Heading({ level, look = level === 1 ? "page" : level === 2 ? "section" : "label", id, children }: { level: 1 | 2 | 3 | 4; look?: keyof typeof HEADINGS; id?: string; children: ReactNode }) {
  const Tag = `h${level}` as const
  return (
    <Tag id={id} className={HEADINGS[look]}>
      {children}
    </Tag>
  )
}

/**
 * A link in or beside text, with the look every name that has a page shares (`ENTITY_LINK`). `external` is a link out
 * to another site, opened without handing the new page a `window.opener`.
 */
export function TextLink({ href, size = "base", weight = "normal", external = false, children }: { href: string; size?: keyof typeof SIZES; weight?: keyof typeof WEIGHTS; external?: boolean; children: ReactNode }) {
  return (
    <a href={href} className={`${ENTITY_LINK} ${SIZES[size]} ${WEIGHTS[weight]}`} {...(external ? { rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  )
}
