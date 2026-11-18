import type { ReactNode } from "react"

import { Stack } from "./layout"
import { Text } from "./text"

/** The parts of a long page of dated entries (a CV, a changelog, a history): a titled section, and the entries, groups, items and sub-items that go in it. */
export function EntrySection({ title, children }: { title: string; children: ReactNode }) {
  const id = `heading-${title}`
  return (
    <section className="grid gap-4" aria-labelledby={id}>
      <h2 id={id} className="text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  )
}

/** A list of entries under each other, with room between them (`none` where each entry has its own rule and padding). */
export function EntryList({ children }: { children: ReactNode }) {
  return <ul className="grid gap-y-6">{children}</ul>
}

/** One dated line of a section: the period on the left, what it was and where under it. */
export function DatedEntry({ period, title, meta, text }: { period: string; title: string; meta?: string; text?: string | null }) {
  return (
    <li className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4">
      <Text as="span" tone="muted" weight="medium" numeric>{period}</Text>
      <div className="grid gap-1">
        <h3 className="font-semibold">{title}</h3>
        {meta ? <Text size="sm" tone="muted">{meta}</Text> : null}
        {text ? <Stack width="prose"><Text>{text}</Text></Stack> : null}
      </div>
    </li>
  )
}

/** A group with its items: the name and place on the left, the items (a `GroupItem` each) beside them. */
export function EntryGroup({ name, place, children }: { name: string; place?: string | null; children: ReactNode }) {
  return (
    <li className="grid gap-4 border-t py-6 sm:grid-cols-[11rem_1fr] sm:gap-8">
      <div className="grid content-start gap-0.5">
        <h3 className="font-semibold">{name}</h3>
        {place ? <Text size="sm" tone="muted">{place}</Text> : null}
      </div>
      <ul className="grid gap-6">{children}</ul>
    </li>
  )
}

/** An item of a group: title and period on one line, the description under, then its sub-items. */
export function GroupItem({ title, period, description, children }: { title: string; period: string; description?: string | null; children?: ReactNode }) {
  return (
    <li className="grid gap-1">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h4 className="text-lg font-semibold">{title}</h4>
        <Text as="span" size="sm" tone="muted" numeric>{period}</Text>
      </div>
      {description ? <Stack width="prose"><Text>{description}</Text></Stack> : null}
      {children}
    </li>
  )
}

/** The sub-items of an item, set off from it by a line on the left. */
export function SubItems({ label, children }: { label: string; children: ReactNode }) {
  return (
    <ul className="mt-2 grid gap-3 border-l pl-4" aria-label={label}>
      {children}
    </ul>
  )
}

/** One sub-item: its name, address and description, then whatever the page adds. */
export function SubItem({ title, url, description, children }: { title: string | null; url?: string | null; description?: string | null; children?: ReactNode }) {
  return (
    <li className="grid gap-1">
      <h5 className="text-sm font-semibold">{title}</h5>
      {url ? <Text size="sm" tone="muted">{url}</Text> : null}
      {description ? <Stack width="prose"><Text size="sm">{description}</Text></Stack> : null}
      {children}
    </li>
  )
}

/** Links to other places, side by side. */
export function LinkItems({ children }: { children: ReactNode }) {
  return <ul className="flex flex-wrap gap-x-6 gap-y-2">{children}</ul>
}
