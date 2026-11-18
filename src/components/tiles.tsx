import { Picture } from "./picture"

/** One tile of a gallery: its picture, its name and the lines under it. */
export interface Tile {
  key: string
  /** Where the tile goes; none for a tile that is not a link. */
  href: string | null
  title: string
  picture: string | null | undefined
  ratio: "poster" | "square"
  /** Under the title, muted: who made it, what it is. */
  detail?: string | null | undefined
  /** More lines, each on a line of its own: a status, a rating, a day. */
  lines?: readonly string[] | undefined
}

const TILE = "group grid content-start gap-2 no-underline"

/**
 * Things as a gallery: pictures in a grid, three across on a phone, then as many as fit at least 9rem each, each tile one link
 * (the picture is as much the link as the name). Many more fit on a line than in a list of rows.
 */
export function Tiles({ tiles }: { tiles: readonly Tile[] }) {
  return (
    <ul className="grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-[repeat(auto-fill,minmax(9rem,1fr))]">
      {tiles.map((tile) => {
        const content = (
          <>
            <Picture size="fill" ratio={tile.ratio} src={tile.picture} />
            <span className="grid gap-0.5 text-xs">
              <span className="line-clamp-2 text-sm font-medium [overflow-wrap:anywhere] group-hover:underline">{tile.title}</span>
              {tile.detail ? <span className="line-clamp-1 text-muted-foreground">{tile.detail}</span> : null}
              {(tile.lines ?? []).map((line) => (
                <span key={line} className="text-muted-foreground">
                  {line}
                </span>
              ))}
            </span>
          </>
        )
        return (
          <li key={tile.key}>
            {tile.href === null ? (
              <span className={TILE}>{content}</span>
            ) : (
              <a href={tile.href} className={TILE}>
                {content}
              </a>
            )}
          </li>
        )
      })}
    </ul>
  )
}
