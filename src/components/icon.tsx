import { ICONS, type IconName } from "../lib/icons"

const SIZES = { sm: "size-3.5", md: "size-4", lg: "size-5" } as const
const TONES = { inherit: "", muted: "text-muted-foreground", destructive: "text-destructive", primary: "text-primary" } as const

/**
 * An icon, asked for by what it means (`name`, a key of `ICONS` in `lib/icons.ts`). Use one wherever it makes a thing
 * quicker to find or to understand: a status next to its words, the kind of a row, the title of a section, an action on
 * a button (see «Icons» in the README). It is decorative by default and hidden from a screen reader, because the words
 * beside it say what it says; give it a `label` only where it stands alone and carries the meaning (the kind of a row).
 * `slot` is for a `Button`, which spaces an icon at the start or the end of its text.
 */
export function Icon({ name, size = "md", tone = "inherit", label, slot }: { name: IconName; size?: keyof typeof SIZES; tone?: keyof typeof TONES; /** What it means to a screen reader; none, and it is hidden. */ label?: string; slot?: "start" | "end" }) {
  const Glyph = ICONS[name]
  return (
    <Glyph
      className={`shrink-0 ${SIZES[size]} ${TONES[tone]}`}
      {...(label === undefined ? { "aria-hidden": true } : { role: "img", "aria-label": label })}
      {...(slot === undefined ? {} : { "data-icon": slot === "start" ? "inline-start" : "inline-end" })}
    />
  )
}
