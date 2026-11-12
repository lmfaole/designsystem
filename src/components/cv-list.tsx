import type { ReactNode } from "react"

/** The parts of a CV page: a titled section, and the dated entries, employers, roles and projects that go in it. Closed props only, so every CV reads the same. */
export function CvSection({ title, children }: { title: string; children: ReactNode }) {
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
export function CvList({ gap = "lg", children }: { gap?: "none" | "lg"; children: ReactNode }) {
  return <ul className={gap === "none" ? "grid" : "grid gap-6 xl:grid-cols-[repeat(auto-fill,minmax(min(100%,30rem),1fr))] xl:gap-x-10"}>{children}</ul>
}

/** One dated line of a section (a degree): the period on the left, what it was and where under it. */
export function CvEntry({ period, title, meta, text }: { period: string; title: string; meta?: string; text?: string | null }) {
  return (
    <li className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4">
      <span className="font-medium text-muted-foreground tabular-nums">{period}</span>
      <div className="grid gap-1">
        <h3 className="font-semibold">{title}</h3>
        {meta ? <p className="text-sm text-muted-foreground">{meta}</p> : null}
        {text ? <p className="max-w-prose leading-relaxed">{text}</p> : null}
      </div>
    </li>
  )
}

/** An employer with its roles: the name and place on the left, the roles (a `CvRole` each) beside them. */
export function CvEmployer({ name, place, children }: { name: string; place?: string | null; children: ReactNode }) {
  return (
    <li className="grid gap-4 border-t py-6 sm:grid-cols-[11rem_1fr] sm:gap-8">
      <div className="grid content-start gap-0.5">
        <h3 className="font-semibold">{name}</h3>
        {place ? <p className="text-sm text-muted-foreground">{place}</p> : null}
      </div>
      <ul className="grid gap-6">{children}</ul>
    </li>
  )
}

/** A role at an employer: title and period on one line, the description under, then its projects. */
export function CvRole({ title, period, description, children }: { title: string; period: string; description?: string | null; children?: ReactNode }) {
  return (
    <li className="grid gap-1">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h4 className="text-lg font-semibold">{title}</h4>
        <span className="text-sm text-muted-foreground tabular-nums">{period}</span>
      </div>
      {description ? <p className="max-w-prose leading-relaxed">{description}</p> : null}
      {children}
    </li>
  )
}

/** The projects of a role, set off from it by a line on the left. */
export function CvProjects({ label, children }: { label: string; children: ReactNode }) {
  return (
    <ul className="mt-2 grid gap-3 border-l pl-4" aria-label={label}>
      {children}
    </ul>
  )
}

/** One project: its name, address and description, then whatever the page adds (the latest commit). */
export function CvProject({ title, url, description, children }: { title: string | null; url?: string | null; description?: string | null; children?: ReactNode }) {
  return (
    <li className="grid gap-1">
      <h5 className="text-sm font-semibold">{title}</h5>
      {url ? <p className="text-sm text-muted-foreground">{url}</p> : null}
      {description ? <p className="max-w-prose text-sm leading-relaxed">{description}</p> : null}
      {children}
    </li>
  )
}

/** A small muted line of running text under a project, for links inside it. */
export function CvNote({ children }: { children: ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>
}

/** Links to other places, side by side. */
export function CvLinkList({ children }: { children: ReactNode }) {
  return <ul className="flex flex-wrap gap-x-6 gap-y-2">{children}</ul>
}
