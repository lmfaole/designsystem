import type { Meta, StoryObj } from "@storybook/react-vite"

import { Picture } from "../../../src/components/picture"
import { poster, square } from "../../sample"

const meta = {
  title: "Components/Media/Picture",
  component: Picture,
  tags: ["autodocs"],
  args: { src: poster(10, "A") },
  parameters: { docs: { description: { component: `### Use it when

one thing's picture in a frame of its own, at the size of a row or a page.

**The shape says what kind of thing it is** (\`corners\`): a reader tells a person from a record from a film before reading a word. Choose one shape for each kind of thing in an app and keep it everywhere that kind shows,
in a row and on its own page: \`round\` for a person or a band (with \`ratio="square"\`), \`sharp\` for a record's cover or a plate, \`soft\` for a single or a tile, \`normal\` (the default) for a poster. A kind has one shape; a shape
never means two kinds, and is never decoration. Where a source's terms say its pictures may not be cropped, do not use \`round\` for them.

### Do not use it when

decoration, or a picture that carries information (give that its own text).

### Accessibility

**Handled by the component**

- Decorative: the frame is hidden and the \`img\` has \`alt=""\` ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))

**You check**

- The thing's name is written next to it ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- A picture that carries information is not a \`Picture\`: give it its own text alternative ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))

### Related

\`PictureRows\`, \`Person\`, \`ImageLightbox\`` } }, },
} satisfies Meta<typeof Picture>
export default meta
type Story = StoryObj<typeof meta>

/** The 2:3 frame at row size. */
export const Poster: Story = {}
/** The square frame, for a cover or an avatar. */
export const Square: Story = { args: { ratio: "square", src: square(100) } }
/** The size that heads the thing's own page. */
export const Hero: Story = { args: { size: "hero" } }
/** As wide as its cell, for a gallery tile. */
export const Fill: Story = { args: { size: "fill" }, decorators: [(Story) => <div className="w-40"><Story /></div>] }
/** A sleeve or a plate: a record's cover. */
export const Sharp: Story = { args: { ratio: "square", corners: "sharp", src: square(100) } }
/** A tile with large corners: a single, a song. */
export const Soft: Story = { args: { ratio: "square", corners: "soft", src: square(100) } }
/** A person or a band: a circle, with the top of the picture kept (a portrait's face is there). */
export const Round: Story = { args: { ratio: "square", corners: "round", src: poster(40, "P") } }
/** All four, side by side: one kind of thing each. */
export const Shapes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Picture ratio="poster" src={poster(10, "F")} />
      <Picture ratio="square" corners="sharp" src={square(100)} />
      <Picture ratio="square" corners="soft" src={square(160)} />
      <Picture ratio="square" corners="round" src={poster(40, "P")} />
    </div>
  ),
}
/** No picture: the frame stays, so rows stay level. */
export const NoPicture: Story = { args: { src: null } }

/** The same picture in three widths: the browser takes the smallest that is sharp at the size it is drawn (`srcset`, `sizes`), not the largest. */
export const WithSources: Story = {
  args: { src: null, sources: [{ src: poster(10, "S"), width: 92 }, { src: poster(40, "M"), width: 185 }, { src: poster(70, "L"), width: 342 }] },
}

/** The picture that leads a detail page: fetched at once and first (`priority`), the only one on the page. */
export const Priority: Story = { args: { size: "hero", priority: true } }
/** `disc`: a record playing now, round with a hole in the middle. It turns slowly for as long as it plays (12 s a turn), and is still for anyone who asks for less motion; the words «Spilles nå» always stand beside it. */
export const Disc: Story = { args: { ratio: "square", disc: true, src: poster(40, "A") } }
