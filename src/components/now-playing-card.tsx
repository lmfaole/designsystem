import type { ReactNode } from "react"

import type { PictureSource } from "../lib/picture-sources"
import { Inline, Stack } from "./layout"
import { TiltButton } from "./tilt-button"
import { LiveDot } from "./live-dot"
import { Picture } from "./picture"
import { Text } from "./text"

/**
 * What plays now, large: the record as a disc that turns under the page's light (`Picture disc`, drawn in WebGL, a tap pauses it), the words «Spilles nå» with the pulsing dot, the title and a line under it.
 * The disc is lit by the pointer and, on a phone, by how it is held (`LightSource` is in the disc; the `TiltButton` here lets an iPhone switch it on, once). Put it first on the page, once: it is the one thing that moves.
 */
export function NowPlayingCard({ picture, sources, title, detail, label = "Spilles nå" }: { picture?: string | null; sources?: readonly PictureSource[]; /** What plays: a name, a link. */ title: ReactNode; /** Under the title: by whom, from which album. */ detail?: ReactNode; /** What says it is playing now, with the dot. */ label?: string }) {
  return (
    <Inline gap="md">
      <Picture ratio="square" size="hero" disc src={picture ?? null} {...(sources === undefined ? {} : { sources })} />
      <Stack gap="xs">
        <Inline gap="xs">
          <LiveDot />
          <Text as="span" size="sm" weight="medium">
            {label}
          </Text>
        </Inline>
        <Text size="lg" weight="medium">
          {title}
        </Text>
        {detail === undefined ? null : (
          <Text size="sm" tone="muted">
            {detail}
          </Text>
        )}
        <TiltButton />
      </Stack>
    </Inline>
  )
}
