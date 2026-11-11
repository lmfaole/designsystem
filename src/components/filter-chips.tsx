/** One chip: a link to the page filtered on it, `current` for the one that is on. */
export interface FilterChip {
  key: string
  label: string
  href: string
  current: boolean
}

const CHIP = "inline-flex min-h-12 items-center rounded-full border px-4 text-sm hover:bg-muted/50 aria-[current=true]:bg-muted aria-[current=true]:font-medium"

/** A row of links that narrows a list to one kind (a category); they are plain links, so it works without a script. */
export function FilterChips({ label, chips }: { label: string; chips: readonly FilterChip[] }) {
  return (
    <nav aria-label={label} className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <a key={chip.key} href={chip.href} className={CHIP} aria-current={chip.current}>
          {chip.label}
        </a>
      ))}
    </nav>
  )
}
