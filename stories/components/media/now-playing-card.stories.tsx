import type { Meta, StoryObj } from "@storybook/react-vite"

import { NowPlayingCard } from "../../../src/components/now-playing-card"
import { poster } from "../../sample"

const meta = {
  title: "Components/Media/NowPlayingCard",
  component: NowPlayingCard,
  tags: ["autodocs"],
  args: { picture: poster(10, "A"), title: "Hard", detail: "Rihanna, Jeezy · Rated R" },
  parameters: { docs: { description: { component: `### Use it when

what plays now should be the first thing on a page, once: a record as a disc that turns slowly under the page's light, with the words «Spilles nå», a pulsing dot, the title and a line under it.

The disc is drawn in WebGL (the cover turns, the reflections do not, and the cover shapes them: its hue where the spectrum starts and how much of its colour is in it, how vivid it is how tight the bands are, how light it is how much it shines) and follows the page's one light: move the pointer over the page, or tilt the phone (\`LightSource\`, which the card carries; iOS asks first, with a button). A tap on the disc pauses it. Where WebGL is not there, it is the same in CSS.

### Do not use it when

there is more than one thing playing, or on a page that does not show what plays: the disc is the one thing that moves on a page. For the song in a list, use \`PictureRows\` with \`live\`.

### Accessibility

**Handled by the component**

- The turning loops for as long as it plays, which WCAG 2.2.2 asks to be pausable: the disc is a button («Stopp snurringen», «Start snurringen»), and under \`prefers-reduced-motion\` it does not turn and there is nothing to press ([2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide)).
- «Spilles nå» is in words; the disc and the dot are decoration, never the only signal ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color)).
- The light is soft and large, and nothing flashes ([2.3.1 Three Flashes or Below Threshold](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold)).
- The canvas is hidden from assistive technology; the drawing stops when the disc is off the screen or the tab is hidden.

**You check**

- \`title\` names what plays and is a link where it has a page.
- The cover may be read by WebGL only where its host allows it (CORS); where not, the CSS disc is shown.

### Content

«Spilles nå» (change it only for another language), the title, and by whom.

### Related

\`Picture\` (\`disc\`), \`LightSource\`, \`LiveDot\`, \`PictureRows\` (\`live\`)` } }, },
} satisfies Meta<typeof NowPlayingCard>
export default meta
type Story = StoryObj<typeof meta>

/** The card on a page: move the pointer to move the light; a tap on the disc pauses it. */
export const Default: Story = {}
/** A cover that may not be cropped or have anything on it (Spotify's): `disc` off, and it is shown as it is, sharp and still. */
export const WithoutDisc: Story = { args: { disc: false } }
/** With the title as a link, as on a page. */
export const WithLink: Story = { args: { title: <a href="#hard" className="underline">Hard</a> } }
