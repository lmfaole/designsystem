import { BRAND_MARKS, BRAND_NAMES, type BrandName } from "../lib/brand-marks"

const SIZES = { sm: 14, md: 16, lg: 20, xl: 28 } as const

/**
 * The mark of a service a person recognises by it (GitHub, Spotify, Bluesky, Mastodon, Steam, PlayStation), for a link that goes there. It is not an
 * `Icon`: a mark is not a meaning, so it is not in `ICONS`, it is never recoloured by a tone (it follows the text colour, which
 * keeps it in the contrast of its surroundings, and in forced colours) and it always carries the service's name for a screen
 * reader unless the words beside it already say it (`decorative`). A service that is not in the closed set has no mark; use the
 * words, or an `Icon` for what the link is (`external`).
 */
export function BrandIcon({ name, size = "md", decorative = false }: { name: BrandName; size?: keyof typeof SIZES; /** The words beside it already name the service. */ decorative?: boolean }) {
  const pixels = SIZES[size]
  return (
    <svg
      className="ds-icon size-(--icon-size)"
      viewBox="0 0 24 24"
      width={pixels}
      height={pixels}
      data-size={size}
      data-tone="inherit"
      {...(decorative ? { "aria-hidden": true, focusable: "false" } : { role: "img", "aria-label": BRAND_NAMES[name] })}
    >
      <path d={BRAND_MARKS[name]} fill="currentColor" stroke="none" />
    </svg>
  )
}
