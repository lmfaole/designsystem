import type { ReactNode } from "react"

import type { PictureCorners } from "../lib/picture-frames"
import type { PictureSource } from "../lib/picture-sources"
import { AmbientBackdrop } from "./ambient-backdrop"
import { Picture } from "./picture"
import { Heading, Text } from "./text"

/**
 * The head of a page of a thing (an artist, an album, a film, a person): its main picture and its name together, on a stage whose ground is the picture's own colours drawn in WebGL, moving with the page's light.
 * It is the page's `<h1>`, so the page leaves out its own title. On a phone the picture stands beside the name and not above it, so neither is alone; the picture is the lit main picture
 * (`Picture size="hero"`, lit on its frame), and nothing is painted over it. What belongs to the head goes in `children`, under the name: by whom, an attribution. Text in the head is the full text colour, never `muted`: the ground is tinted, and muted text would fall under 4.5:1.
 */
export function DetailHeader({ kind, title, picture, sources, ratio = "square", corners = "normal", children }: { /** What kind of thing it is, in words above the name: «Artist», «Album», «Film». */ kind: string; /** Its name: the page's `<h1>`. */ title: string; picture?: string | null; sources?: readonly PictureSource[]; ratio?: "poster" | "square"; /** What kind of thing it is, as a shape (see `PictureCorners`). */ corners?: PictureCorners; children?: ReactNode }) {
  return (
    <header className="bg-muted/30 relative isolate overflow-hidden rounded-2xl p-5 @3xl:p-8">
      <AmbientBackdrop src={picture ?? null} {...(sources === undefined ? {} : { sources })} />
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 @3xl:gap-x-8">
        <Picture src={picture ?? null} {...(sources === undefined ? {} : { sources })} ratio={ratio} corners={corners} size="hero" priority />
        <div className="grid min-w-0 gap-1 [overflow-wrap:anywhere]">
          <Text size="sm" weight="medium">
            {kind}
          </Text>
          <Heading level={1}>{title}</Heading>
          {children}
        </div>
      </div>
    </header>
  )
}
