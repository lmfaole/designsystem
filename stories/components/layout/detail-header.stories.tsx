import type { Meta, StoryObj } from "@storybook/react-vite"

import { DetailHeader } from "../../../src/components/detail-header"
import { Text } from "../../../src/components/text"
import { poster } from "../../sample"

const meta = {
  title: "Components/Layout/DetailHeader",
  component: DetailHeader,
  tags: ["autodocs"],
  args: { kind: "Artist", title: "CHXRRY", picture: poster(20, "C"), ratio: "square", corners: "round" },
  decorators: [(Story) => <div className="@container max-w-xl">{Story()}</div>],
  parameters: { docs: { description: { component: `### Use it when

the head of a page of one thing (an artist, an album, a film, a person): its main picture and its name together. It is the page's \`<h1>\`, so the page leaves out its own \`PageHeader\`.

The picture stands beside the name on a phone, not above it, so neither is left alone with a gap of page around it. The stage behind them is the picture's own colours, four soft pools drawn in WebGL, that move with the page's light: the pointer, and on a phone how it is held (\`LightSource\`, in the picture). Only four colours are taken from the picture, never the picture itself, and nothing is painted over it, so it is safe for sources whose terms forbid altering their pictures (Spotify's). The backdrop is drawn when the light changes and at no other time: nothing loops.

### Do not use it when

the page is not of one thing with a picture: a list, a front page (\`PageHeader\`). Without a picture the head has its plain tinted ground and the name.

### Accessibility

**Handled by the component**

- The name is the page's one \`h1\`; the kind in words is above it ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), [2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels)).
- The backdrop is decoration, hidden from assistive technology, and is laid over the page at half strength in light and 40 % in dark, with a fade, and the text of the head is the full text colour, so it keeps 4.5:1 on the worst colour a picture can give (a test measures it) ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)).
- Nothing in the head moves by itself: the backdrop moves only with the pointer or the phone, and not at all under \`prefers-reduced-motion\` ([2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide), [2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions)).
- A long name breaks where it must and never runs out of its column ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).

**You check**

- \`title\` is the thing's name; the page has no other \`h1\`.
- What goes in \`children\` is the full text colour, never \`tone="muted"\`: the ground is tinted.
- \`kind\` says what it is in a word, and \`corners\` and \`ratio\` say it as a shape, as the rest of the app does.
- The picture may be read by WebGL only where its host allows it (CORS); where not, the plain ground shows.

### Content

The kind in one word above the name («Artist», «Album», «Låt», «Film», «Serie», «Person»); under it, in \`children\`, only what belongs to the head: by whom, an attribution.

### Related

\`PageHeader\`, \`Picture\` (\`size="hero"\`), \`LightSource\`, «Foundations / Light and shadow»` } }, },
} satisfies Meta<typeof DetailHeader>
export default meta
type Story = StoryObj<typeof meta>

/** An artist: a round portrait beside the name, on the portrait's own colours (move the pointer over the page and the pools of colour move). */
export const Artist: Story = { args: { children: <Text size="sm">Fra Spotify</Text> } }
/** A film: a poster beside the name, the kind with its year. */
export const Poster: Story = { args: { kind: "Film · 1995", title: "Heat", ratio: "poster", corners: "normal", picture: poster(150, "H") } }
/** A long name and a line under it: the name wraps beside the picture and never leaves its column. */
export const LongName: Story = { args: { kind: "Album", title: "Hyperdimensional Rhapsody of the Unfathomably Extended Edition", corners: "sharp", picture: poster(300, "R"), children: <Text size="sm">Shygirl</Text> } }
/** No picture: the plain tinted ground and the name. */
export const WithoutPicture: Story = { args: { picture: null, title: "Ukjent artist" } }
