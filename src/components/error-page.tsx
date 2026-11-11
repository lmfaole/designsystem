import type { ReactNode } from "react"

interface ErrorPageProps {
  /** The HTTP-style status the page stands for, shown large: 404, 500, 403. */
  status: number
  title: string
  description: ReactNode
  /** What the reader can do next, e.g. a link home or a reload button. */
  actions?: ReactNode
}

/**
 * The one layout every error page shares, so a 404 in `cv` and a 500 in
 * `budget` look like the same site. Rendered inside `AppLayout`, so the
 * header and the cross-app sidebar stay, and the way out is always there.
 * The Worker-side twin, for when React cannot run at all, is
 * `@designsystem/config/error-pages`.
 */
export function ErrorPage({ status, title, description, actions }: ErrorPageProps) {
  return (
    <section
      aria-labelledby="error-page-title"
      className="grid justify-items-start gap-3 py-16 [grid-template-areas:'status'_'title'_'description'_'actions']"
    >
      <p className="text-muted-foreground font-mono text-sm [grid-area:status]">{status}</p>
      <h1 id="error-page-title" className="text-3xl font-semibold tracking-tight [grid-area:title]">
        {title}
      </h1>
      <div className="text-muted-foreground max-w-prose [grid-area:description]">{description}</div>
      {actions ? <div className="mt-3 flex flex-wrap gap-2 [grid-area:actions]">{actions}</div> : null}
    </section>
  )
}
