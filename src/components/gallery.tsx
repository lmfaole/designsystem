import type { ReactNode } from "react"

import { Cover } from "./cover"

/** One work of a gallery: its picture, its name and the lines under it. */
export interface GalleryItem {
  key: string
  /** The path of its own page; none for a work with no page, whose tile is not a link. */
  slug: string | null
  title: string
  year?: number | null | undefined
  cover: string | null | undefined
  ratio: "poster" | "square"
  /** Who made it. */
  subtitle?: string | null | undefined
  /** Where the log has it: a status, a rating, an amount, a day, each on a line of its own. */
  meta?: readonly string[] | undefined
}

/** The app's own link to a work's page, wrapped round a whole tile: the picture is as much the link as the name. */
export type TileLink<Item extends GalleryItem = GalleryItem> = (item: Item & { slug: string }, children: ReactNode, className: string) => ReactNode

const TILE = "group grid content-start gap-2 no-underline"

/**
 * Works as a gallery: pictures in a grid, three across on a phone, then as many as fit at least 9rem each, each tile one link. Many more fit
 * on a line than in a list of rows, so a long list is shorter to look through.
 */
export function Gallery<Item extends GalleryItem>({ items, link }: { items: readonly Item[]; link: TileLink<Item> }) {
  return (
    <ul className="grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-[repeat(auto-fill,minmax(9rem,1fr))]">
      {items.map((item) => {
        const tile = (
          <>
            <Cover size="fill" ratio={item.ratio} url={item.cover} />
            <span className="grid gap-0.5 text-xs">
              <span className="line-clamp-2 text-sm font-medium [overflow-wrap:anywhere] group-hover:underline">
                {item.title}
                {item.year == null ? null : <span className="font-normal text-muted-foreground"> ({item.year})</span>}
              </span>
              {item.subtitle ? <span className="line-clamp-1 text-muted-foreground">{item.subtitle}</span> : null}
              {(item.meta ?? []).map((line) => (
                <span key={line} className="text-muted-foreground">
                  {line}
                </span>
              ))}
            </span>
          </>
        )
        return <li key={item.key}>{item.slug === null ? <span className={TILE}>{tile}</span> : link({ ...item, slug: item.slug }, tile, TILE)}</li>
      })}
    </ul>
  )
}
