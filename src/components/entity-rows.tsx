import { Children, type ReactNode, useId } from "react"

import { useProgressiveCount } from "../lib/use-progressive-count"
import { SrTableHead } from "./sr-table-head"
import { VIRTUAL_FROM, VirtualTbody } from "./virtual-rows"
import { LIST_COLUMNS } from "../lib/page-width"

/** The lines of a list on the page of a thing (an artist's albums, an album's tracks), as a table: a screen reader hears the count and the extra with the name they belong to. */
export function EntityRows({ caption, children }: { caption: string; children: ReactNode }) {
  const rows = Children.toArray(children)
  const virtual = rows.length >= VIRTUAL_FROM
  const drawn = useProgressiveCount(virtual ? 0 : rows.length)
  return (
    <table role="table" aria-rowcount={virtual ? rows.length + 1 : undefined} className="block">
      <caption className="sr-only">{caption}</caption>
      <SrTableHead columns={["Omslag", "Navn", "Antall", "Mer"]} />
      {virtual ? (
        <VirtualTbody rows={rows} />
      ) : (
        <tbody role="rowgroup" className={`grid gap-y-2 ${LIST_COLUMNS}`}>
          {rows.slice(0, drawn)}
        </tbody>
      )}
    </table>
  )
}

interface EntityRowProps {
  /** The picture, already in its frame. */
  picture: ReactNode
  /** The name, usually a link to the page of the thing. */
  name: ReactNode
  /** The name as plain text, for what the info button is called. */
  label: string
  /** A line under the name: a track number, who it was with. */
  detail?: ReactNode
  /** How often it was played, as the page words it, shown at the end. */
  count: string
  /** Shown dimmer: a track of the album that was never played. */
  muted?: boolean
  /** Marked with a heart: a track that was loved. */
  loved?: boolean
  /** What is said of it at more length, in a popover from an «i» at the end of the line; none, no button. */
  info?: ReactNode
}

/** A picture, a name, a count and maybe an info button: one line of `EntityRows`. */
export function EntityRow({ picture, name, label, detail, count, muted = false, loved = false, info }: EntityRowProps) {
  const infoId = useId()
  return (
    <tr role="row" className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-x-3">
      {/* Never played: the picture is dimmed and the name is the muted colour. Dimming the whole row would drop the text under the contrast it needs. */}
      <td role="cell" className={muted ? "opacity-60" : undefined}>
        {picture}
      </td>
      <td role="rowheader" className={`min-w-0 font-medium ${muted ? "text-muted-foreground" : ""}`}>
        <span className="block truncate">{name}</span>
        {detail ? <span className="block truncate text-sm font-normal text-muted-foreground">{detail}</span> : null}
      </td>
      <td role="cell" className="text-sm whitespace-nowrap text-muted-foreground">
        {loved ? (
          <span role="img" aria-label="Elsket">
            ♥{" "}
          </span>
        ) : null}
        {count}
      </td>
      <td role="cell">
        {info ? (
          // The popover attribute opens and closes it in the browser itself, so it works with scripts off.
          <>
            <button type="button" popoverTarget={infoId} aria-label={`Om ${label}`} className="grid size-6 cursor-pointer place-items-center rounded-full border text-xs font-semibold text-muted-foreground">
              i
            </button>
            <div id={infoId} popover="auto" className="m-auto w-[min(24rem,calc(100vw-2rem))] rounded-xl border bg-popover p-4 text-sm text-popover-foreground backdrop:bg-black/30">
              <p className="mb-3 font-medium">{label}</p>
              {info}
            </div>
          </>
        ) : null}
      </td>
    </tr>
  )
}
