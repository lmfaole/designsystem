import { createElement } from "react"

import { ICONS, MIRRORED_ICONS, type IconName } from "../lib/icons"

const SIZES = { sm: 14, md: 16, lg: 20 } as const
const TONES = ["inherit", "muted", "destructive", "primary"] as const

/**
 * An icon, asked for by what it means (`name`, a key of `ICONS` in `lib/icons.ts`). Use one wherever it makes a thing
 * quicker to find or to understand: a status next to its words, the kind of a row, the title of a section, an action on
 * a button (see «Icons» in the README). It is decorative by default and hidden from a screen reader, because the words
 * beside it say what it says; give it a `label` only where it stands alone and carries the meaning (the kind of a row).
 * `slot` is for a `Button`, which spaces an icon at the start or the end of its text.
 *
 * It is an inline `<svg>` that the server renders as plain HTML: no icon component and no script, the shapes are data, and
 * the look (size, stroke, colour, mirroring in right-to-left text, forced colours) is CSS in `icon.css`.
 */
export function Icon({ name, size = "md", tone = "inherit", label, slot }: { name: IconName; size?: keyof typeof SIZES; tone?: (typeof TONES)[number]; /** What it means to a screen reader; none, and it is hidden. */ label?: string; slot?: "start" | "end" }) {
  const pixels = SIZES[size]
  return (
    <svg
      className="ds-icon size-(--icon-size)"
      viewBox="0 0 24 24"
      width={pixels}
      height={pixels}
      data-size={size}
      data-tone={tone}
      {...(MIRRORED_ICONS.includes(name) ? { "data-mirror": "" } : {})}
      {...(label === undefined ? { "aria-hidden": true, focusable: "false" } : { role: "img", "aria-label": label })}
      {...(slot === undefined ? {} : { "data-icon": slot === "start" ? "inline-start" : "inline-end" })}
    >
      {ICONS[name].map(([tag, attributes], index) => createElement(tag, { key: index, ...attributes }))}
    </svg>
  )
}
