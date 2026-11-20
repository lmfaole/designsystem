import type { ReactNode } from "react"

import type { PictureSource } from "../lib/picture-sources"
import { LiveDot } from "./live-dot"
import { Picture } from "./picture"
import { Stage } from "./stage"
import { Text } from "./text"
import { TiltButton } from "./tilt-button"

/**
 * What plays now, large: the record as a disc that turns slowly under the page's light (`Picture disc`, drawn in WebGL, a tap pauses it), on a stage of the cover's own colours (`Stage`), the words «Spilles nå»
 * with the pulsing dot, the title and a line under it. The disc is lit by the pointer and, on a phone, by how it is held (`LightSource` is in the disc; the `TiltButton` here lets an iPhone switch it on, once).
 * When the song changes (the card is given another picture), the colours of the stage go over to the new cover's and settle, and the disc takes the new cover. Put it first on the page, once: it is the one
 * thing that moves. Text on the stage is the full text colour, never muted.
 */
export function NowPlayingCard({ picture, sources, title, detail, label = "Spilles nå", disc = true }: { picture?: string | null; sources?: readonly PictureSource[]; /** What plays: a name, a link. */ title: ReactNode; /** Under the title: by whom, from which album. */ detail?: ReactNode; /** What says it is playing now, with the dot. */ label?: string; /** A disc (the default), or the cover as it is, sharp and still: for a cover that may not be cropped or have anything on it (Spotify's). */ disc?: boolean }) {
  return (
    <Stage picture={picture ?? null} {...(sources === undefined ? {} : { sources })}>
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 @3xl:gap-x-8">
        <Picture ratio="square" size="hero" {...(disc ? { disc: true } : { corners: "sharp" as const })} src={picture ?? null} {...(sources === undefined ? {} : { sources })} />
        <div className="grid min-w-0 gap-1 [overflow-wrap:anywhere]">
          <div className="flex items-center gap-1">
            <LiveDot />
            <Text as="span" size="sm" weight="medium">
              {label}
            </Text>
          </div>
          <Text size="lg" weight="medium">
            {title}
          </Text>
          {detail === undefined ? null : <Text size="sm">{detail}</Text>}
          <TiltButton />
        </div>
      </div>
    </Stage>
  )
}
