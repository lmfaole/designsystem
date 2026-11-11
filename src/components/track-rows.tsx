import type { ReactNode } from "react"

import { Cover } from "./cover"
import { SrTableHead } from "./sr-table-head"

/** One listen or one loved track: the cover, then the track, the artist (with when it happened at the end of its line) and the album each on a line. */
export interface TrackRow {
  key: string
  cover: string | null
  track: ReactNode
  artist: ReactNode
  /** Empty where the track has no album. */
  album: ReactNode
  when: ReactNode
}

// The track has the whole width; the time ends the artist's line, so a long title never squeezes it into a narrow column.
const AREAS = "grid grid-cols-[auto_minmax(0,max-content)_auto_1fr] items-center gap-x-1 [grid-template-areas:'cover_track_track_track'_'cover_artist_when_.'_'cover_album_album_album']"

/**
 * Tracks as rows in one layout, the latest listens and the loved ones alike. A table, so a screen reader hears each cell
 * with its column (`whenHead` names the last one); the layout is a grid.
 */
export function TrackRows({ rows, whenHead }: { rows: readonly TrackRow[]; whenHead: string }) {
  return (
    <table role="table" className="block">
      <SrTableHead columns={["Omslag", "Låt", "Artist", "Album", whenHead]} />
      <tbody role="rowgroup" className="grid gap-2">
        {rows.map((row) => (
          <tr role="row" key={row.key} className={AREAS}>
            <td role="cell" className="mr-2 [grid-area:cover]">
              <Cover ratio="square" url={row.cover} />
            </td>
            <td role="rowheader" className="min-w-0 truncate font-medium [grid-area:track]">
              {row.track}
            </td>
            <td role="cell" className="min-w-0 truncate text-sm text-muted-foreground [grid-area:artist]">
              {row.artist}
            </td>
            <td role="cell" className="min-w-0 truncate text-sm text-muted-foreground [grid-area:album]">
              {row.album}
            </td>
            <td role="cell" className="text-sm whitespace-nowrap text-muted-foreground [grid-area:when] before:content-['·_']">
              {row.when}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
