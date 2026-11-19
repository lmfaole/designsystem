import type { Meta, StoryObj } from "@storybook/react-vite"

import { Picture } from "../../src/components/picture"
import { poster, square } from "../sample"

const meta = {
  title: "Media/Picture",
  component: Picture,
  tags: ["autodocs"],
  args: { src: poster(10, "A") },
  parameters: { docs: { description: { component: `### Use it when

one thing's picture in a frame of its own, at the size of a row or a page.

### Do not use it when

decoration, or a picture that carries information (give that its own text).

### Accessibility

Decorative: the name beside it says what it is. The frame is always there, so rows stay level.

### Related

\`PictureRows\`, \`Person\`, \`ImageLightbox\`` } }, },
} satisfies Meta<typeof Picture>
export default meta
type Story = StoryObj<typeof meta>

export const Poster: Story = {}
export const Square: Story = { args: { ratio: "square", src: square(100) } }
export const Hero: Story = { args: { size: "hero" } }
export const Fill: Story = { args: { size: "fill" }, decorators: [(Story) => <div className="w-40"><Story /></div>] }
export const NoPicture: Story = { args: { src: null } }
