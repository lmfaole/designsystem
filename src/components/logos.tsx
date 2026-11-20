/** Most logos are dark or coloured, so the head gives them a light plate. */
const LOGO = "h-12 w-auto max-w-44 rounded-md bg-logo-plate object-contain p-1.5 backdrop-blur"
/** In a list, on the card's own ground, with no plate. */
const BARE = "h-9 w-auto max-w-36 object-contain"

/**
 * One logo, the name as its alt text and tooltip. `decorative` is a logo beside its own name in text: it is then hidden from a
 * screen reader (`alt=""`), which would otherwise read the name twice.
 */
export function Logo({ name, src, plate = true, decorative = false }: { name: string; src: string; plate?: boolean; decorative?: boolean }) {
  return <img src={src} alt={decorative ? "" : name} title={decorative ? undefined : name} decoding="async" className={plate ? LOGO : BARE} />
}

/** Logos side by side, for the head of a page; none where there are none. */
export function Logos({ logos }: { logos: readonly { name: string; src: string }[] }) {
  if (logos.length === 0) return null
  return (
    <span className="grid grid-flow-col items-center justify-start gap-x-4">
      {logos.map(({ name, src }) => (
        <Logo key={name} name={name} src={src} />
      ))}
    </span>
  )
}
