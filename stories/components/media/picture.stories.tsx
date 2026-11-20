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
/** No picture: the frame stays, so rows stay level. */
export const NoPicture: Story = { args: { src: null } }

/** The same picture in three widths: the browser takes the smallest that is sharp at the size it is drawn (`srcset`, `sizes`), not the largest. */
export const WithSources: Story = {
  args: { src: null, sources: [{ src: poster(10, "S"), width: 92 }, { src: poster(40, "M"), width: 185 }, { src: poster(70, "L"), width: 342 }] },
}

/** The picture that leads a detail page: fetched at once and first (`priority`), the only one on the page. */
export const Priority: Story = { args: { size: "hero", priority: true } }
