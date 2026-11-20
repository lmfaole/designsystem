import type { ReactNode } from "react"

import type { PictureSource } from "../lib/picture-sources"
import { AmbientBackdrop } from "./ambient-backdrop"

/**
 * The ground the main thing of a page stands on: a rounded surface whose backdrop is four colours taken from the picture and drawn in WebGL, moving with the page's light (`AmbientBackdrop`). `DetailHeader` and
 * `NowPlayingCard` stand on one. Text on it is the page's full text colour, never muted: the ground is tinted, and muted text would fall under 4.5:1. Without a picture it is the plain tinted ground.
 */
export function Stage({ as: Tag = "div", picture, sources, children }: { as?: "div" | "header" | "section"; picture?: string | null; sources?: readonly PictureSource[]; children: ReactNode }) {
  return (
    <Tag className="bg-muted/30 relative isolate overflow-hidden rounded-2xl p-5 @3xl:p-8">
      <AmbientBackdrop src={picture ?? null} {...(sources === undefined ? {} : { sources })} />
      {children}
    </Tag>
  )
}
