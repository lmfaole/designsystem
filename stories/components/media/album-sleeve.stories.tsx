import type { Meta, StoryObj } from "@storybook/react-vite"

import { AlbumSleeve } from "../../../src/components/album-sleeve"
import { albumCover } from "../../sample"

const meta = {
  title: "Components/Media/AlbumSleeve",
  component: AlbumSleeve,
  tags: ["autodocs"],
  args: { src: albumCover("#1a0b2e", "#5b1a8f", "#e0245e", "#f5c542") },
  parameters: { docs: { description: { component: `### Use it when

the main picture of the page of an album: its cover whole on a slab of plastic, with a record pulled half out of it, that tilts toward the page's light (move the pointer over the page; on a phone, tilt it) and catches it. \`DetailHeader\` takes it with \`sleeve\`.

It is the cover with something added (a record, a gleam of plastic), so it is for covers the app may alter (Last.fm's, its own), **never for Spotify's**, whose terms forbid overlays and crops. Where WebGL is not there, before it is ready and under \`prefers-reduced-motion\` it is the cover alone as a sharp square (\`Picture\`), in the same place. It is drawn when the light changes and at no other time: nothing loops.

### Do not use it when

the page is not of an album (an artist, a film), or the cover is Spotify's, or a row's thumbnail.

### Accessibility

**Handled by the component**

- Decoration: hidden from assistive technology; the album's name and artist are in the page's head beside it ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)).
- Nothing moves by itself: it tilts only with the pointer or the phone, and not at all under \`prefers-reduced-motion\` ([2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide), [2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions)).
- The gleam is a soft highlight that moves at the pace of a hand: nothing flashes ([2.3.1 Three Flashes or Below Threshold](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold)).
- A page has a few WebGL surfaces at most; with none to spare it is the CSS cover ([«Light and shadow»](?path=/docs/foundations-light-and-shadow--docs)).

**You check**

- The cover is Last.fm's or the app's own, never Spotify's.
- The cover may be read by WebGL only where its host allows it (CORS).

### Content

None: it draws a picture.

### Related

\`DetailHeader\` (\`sleeve\`), \`Picture\`, \`AmbientBackdrop\`, «Foundations / Light and shadow»` } }, },
} satisfies Meta<typeof AlbumSleeve>
export default meta
type Story = StoryObj<typeof meta>

/** A sleeve in 3D with a record half out: move the pointer over the page and it tilts toward the light, and the plastic's gleam moves across the cover. */
export const Default: Story = {}
/** A light cover: the gleam is plastic, not the cover, so it shows on pale art too. */
export const LightCover: Story = { args: { src: albumCover("#f6efe6", "#e9d3bd", "#d6b9a0", "#ffffff") } }
