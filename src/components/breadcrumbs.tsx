import { Icon } from "./icon"

export interface Crumb {
  label: string
  href: string
}

/**
 * Where the page is in the app, from the top: the group (`Hjem`, `Medier`), the app, the page, and the page the reader is on last.
 * It is on EVERY page below a place in the `NavBar`: a subpage and a detail page (in an app that belongs to a group, the group is the first
 * crumb, which is how the reader reaches the other apps). A page that IS a place in the `NavBar` (the front page, «Musikk», «Innstillinger»)
 * has no breadcrumbs: the bar marks where the reader is, and «Medier › Innstillinger» would only say it again. The last item is the page itself (`aria-current="page"`, not a link). The first item is the group, and links to the page that
 * lists the apps of it: that is how the reader moves between apps. Do not repeat the page's title in a second heading to say where
 * you are: the breadcrumbs say where, the title says what.
 *
 * On a phone only the parent is shown, as a way back («‹ AdGuard», naming where it goes, never «Tilbake»); from tablet width the
 * whole trail. It is plain links, so it works without a script.
 */
export function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  if (items.length < 2) return null
  const parent = items[items.length - 2]
  return (
    <nav aria-label="Brødsmuler" className="mb-3 text-sm">
      {parent === undefined ? null : (
        <a href={parent.href} className="text-muted-foreground hover:text-foreground inline-flex min-h-10 items-center gap-1 md:hidden">
          <Icon name="back" />
          {parent.label}
        </a>
      )}
      <ol className="text-muted-foreground hidden min-h-10 flex-wrap items-center gap-x-1 md:flex">
        {items.map((item, index) => {
          const current = index === items.length - 1
          return (
            <li key={item.href} className="inline-flex min-w-0 items-center gap-1">
              {index === 0 ? null : <Icon name="chevron-right" size="sm" />}
              {current ? (
                <span aria-current="page" className="text-foreground font-medium">
                  {item.label}
                </span>
              ) : (
                <a href={item.href} className="hover:text-foreground inline-flex min-h-6 items-center underline underline-offset-4">
                  {item.label}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
