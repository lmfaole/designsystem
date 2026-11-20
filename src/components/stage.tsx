import type { ReactNode } from "react"

import type { Rgb } from "../lib/palette"
import type { PictureSource } from "../lib/picture-sources"
import { AmbientBackdrop } from "./ambient-backdrop"

/**
 * The ground the main thing of a page stands on: a rounded surface whose backdrop is four colours taken from the picture and drawn in WebGL, moving with the page's light (`AmbientBackdrop`). `DetailHeader` and
 * `NowPlayingCard` stand on one. Text on it is the page's full text colour, never muted: the ground is tinted, and muted text would fall under 4.5:1. Without a picture it is the plain tinted ground.
 */
export function Stage({ as: Tag = "div", picture, sources, palette, children }: { as?: "div" | "header" | "section"; picture?: string | null; sources?: readonly PictureSource[]; /** Four colours to draw instead of a picture's (`WeatherStage`): upper left, upper right, lower left, lower right. */ palette?: readonly [Rgb, Rgb, Rgb, Rgb]; children: ReactNode }) {
  return (
    <Tag className="bg-muted/30 relative isolate overflow-hidden rounded-2xl p-5 @3xl:p-8">
      <AmbientBackdrop src={picture ?? null} {...(sources === undefined ? {} : { sources })} {...(palette === undefined ? {} : { palette })} />
      {children}
    </Tag>
  )
}
