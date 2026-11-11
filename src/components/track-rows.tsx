import type { ReactNode } from "react"

import { Cover } from "./cover"
import { SrTableHead } from "./sr-table-head"

/** One listen or one loved track: the cover, then the track, the artist and the album each on a line, and when it happened. */
export interface TrackRow {
  key: string
  cover: string | null
  track: ReactNode
  artist: ReactNode
  /** Empty where the track has no album. */
  album: ReactNode
  when: ReactNode
}

const AREAS = "grid grid-cols-[auto_1fr_auto] items-center gap-x-3 [grid-template-areas:'cover_track_when'_'cover_artist_when'_'cover_album_when']"

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
            <td role="cell" className="[grid-area:cover]">
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
            <td role="cell" className="text-sm whitespace-nowrap text-muted-foreground [grid-area:when]">
              {row.when}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
