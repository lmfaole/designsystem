import { Icon } from "./icon"

/**
 * The way back up one level, at the top of a page that belongs to a list («Pull requests», «Issues»): it names where it goes,
 * never just «Tilbake», so the reader knows the place before they go. A detail page always has one, over its title.
 */
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="text-muted-foreground hover:text-foreground mb-3 inline-flex min-h-10 items-center gap-1 text-sm">
      <Icon name="back" />
      {label}
    </a>
  )
}
