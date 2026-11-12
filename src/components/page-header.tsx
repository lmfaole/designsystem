import type { ReactNode } from "react"

const SPACE = { default: "mb-6", none: "" } as const

/**
 * A page's own `<h1>` and an optional one-line lead-in, above its content, with room for the page's controls beside the
 * title. `space` is the room under it: `none` where what follows stands in a layout that spaces its parts itself.
 */
export function PageHeader({ title, lead, actions, space = "default" }: { title: string; lead?: string | undefined; /** Buttons or menus shown alongside the title. */ actions?: ReactNode; space?: keyof typeof SPACE }) {
  return (
    <header className={SPACE[space]}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-balance 2xl:text-4xl">{title}</h1>
        {actions}
      </div>
      {lead ? <p className="text-muted-foreground mt-2 max-w-2xl text-sm 2xl:text-base">{lead}</p> : null}
    </header>
  )
}
