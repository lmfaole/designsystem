import type { Meta, StoryObj } from "@storybook/react-vite"

import { Badge } from "../../../src/components/badge"
import { DetailHeader } from "../../../src/components/detail-header"
import { Inline } from "../../../src/components/layout"
import { Text } from "../../../src/components/text"
import { albumCover, poster } from "../../sample"

const meta = {
  title: "Components/Layout/DetailHeader",
  component: DetailHeader,
  tags: ["autodocs"],
  args: { kind: "Artist", title: "CHXRRY", picture: poster(20, "C"), ratio: "square", corners: "round" },
  decorators: [(Story, { parameters }) => <div className={`@container ${typeof parameters["width"] === "string" ? parameters["width"] : "max-w-xl"}`}>{Story()}</div>],
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

The kind in one word above the name («Artist», «Album», «Låt», «Film», «Serie», «Person»); under it, in \`children\`, only what belongs to the head: by whom, an attribution, a few genres.

\`figures\` are the two or three numbers that say most about the thing to this reader («10 903 avspillinger», «22 % av alt du har hørt»): large, under the name, each said here and **not again** in the page's facts. A rank is said in words in \`kind\` («Din nest mest spilte artist»), not as a figure; when something started is shown by a chart further down, not by a figure.

### Size

\`size="large"\` is for a page whose picture is its face: an artist's or a person's portrait (Spotify's artist pictures are large and sharp). The picture is \`Picture size="feature"\`, as wide as its cell and lit on its frame like the hero, uncropped beyond its shape and with nothing over it. On a phone the name goes first, the whole width of the head (a long name does not wrap in a narrow column), and the picture is under it, about half the head wide, **beside the figures**, so it is never alone with a gap of page around it; from a wide head (\`@3xl\`) the picture is beside the name, at 16rem and from \`@5xl\` 20rem, and the name, the figures and \`children\` are a column centred on it. Use the default size for a cover, a poster or a sleeve: the thing's name matters more than its picture there.

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
/** An album: with `sleeve` its cover is a sleeve in 3D with a record half out, tilting with the light, on a stage of the cover's colours. For Last.fm's covers, never Spotify's. */
export const Album: Story = { args: { kind: "Album", title: "Rated R", ratio: "square", corners: "sharp", sleeve: true, picture: albumCover("#1a0b2e", "#5b1a8f", "#e0245e", "#f5c542"), children: <Text size="sm">av Rihanna</Text> } }
/** Figures: the two or three numbers that say most, large under the name. */
export const WithFigures: Story = { args: { kind: "Din nest mest spilte artist", figures: [{ value: "10 903", label: "avspillinger" }, { value: "22 %", label: "av alt du har hørt" }] } }
/** `size="large"`: the portrait is the page's face. On a phone the name first and the picture beside the figures; on a wide head the picture beside the name, the rest centred on it. */
export const Large: Story = {
  args: {
    size: "large",
    kind: "Din nest mest spilte artist",
    title: "Röyksopp",
    figures: [{ value: "10 903", label: "avspillinger" }, { value: "22 %", label: "av alt du har hørt" }],
    children: (
      <Inline as="ul" gap="xs" aria-label="Sjangere">
        <li><Badge>Electronic</Badge></li>
        <li><Badge>norwegian</Badge></li>
      </Inline>
    ),
  },
  parameters: { width: "max-w-4xl" },
}
/** `size="large"` on a phone: the name the width of the head, the portrait under it beside the figures. */
export const LargeOnPhone: Story = { args: { ...Large.args }, parameters: { width: "max-w-[22rem]" } }
/** `size="large"` without figures: the portrait under the name, larger than half the head, on a phone. */
export const LargeWithoutFigures: Story = { args: { size: "large", kind: "Artist", title: "Kings of Convenience", picture: poster(60, "K") }, parameters: { width: "max-w-[22rem]" } }
/** No picture: the plain tinted ground and the name. */
export const WithoutPicture: Story = { args: { picture: null, title: "Ukjent artist" } }
