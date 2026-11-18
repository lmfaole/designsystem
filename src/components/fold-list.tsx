import type { ReactNode } from "react"

/** A list of short lines folded under a summary, for what a chart's reader may want to check but not read at first. */
export function FoldList({ summary, items }: { summary: string; items: readonly { key: string; text: ReactNode }[] }) {
  return (
    <details className="mt-4 text-xs text-muted-foreground">
      <summary className="cursor-pointer">{summary}</summary>
      <ul className="mt-2 grid gap-1">
        {items.map((item) => (
          <li key={item.key}>{item.text}</li>
        ))}
      </ul>
    </details>
  )
}
