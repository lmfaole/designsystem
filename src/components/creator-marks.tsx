import { appUrl } from "../lib/base-url"

/** Most logos are dark or coloured (the register's: 54 dark and 44 in between of 110, 12 light), so the head gives them a light plate. */
const LOGO = "h-12 w-auto max-w-44 rounded-md bg-logo-plate object-contain p-1.5 backdrop-blur"
/** In a list, on the card's own ground, with no plate. */
const BARE = "h-9 w-auto max-w-36 object-contain"

/** A creator's logo, the name as its alt text and tooltip. */
export function CreatorLogo({ name, logo, plate = true }: { name: string; logo: string; plate?: boolean }) {
  return <img src={appUrl(logo)} alt={name} title={name} decoding="async" className={plate ? LOGO : BARE} />
}

/** The logos of the creators that have one, side by side, for the head of a page; none where none has. */
export function CreatorLogos({ names, logos }: { names: readonly string[]; logos: Readonly<Record<string, string>> }) {
  const found = names.flatMap((name) => (logos[name] === undefined ? [] : [{ name, logo: logos[name] }]))
  if (found.length === 0) return null
  return (
    <span className="grid grid-flow-col items-center justify-start gap-x-4">
      {found.map(({ name, logo }) => (
        <CreatorLogo key={name} name={name} logo={logo} />
      ))}
    </span>
  )
}
