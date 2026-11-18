import type { Meta, StoryObj } from "@storybook/react-vite"

import { Picture } from "../../src/components/picture"
import { poster, square } from "../sample"

const meta = {
  title: "Media/Picture",
  component: Picture,
  tags: ["autodocs"],
  args: { src: poster(10, "A") },
} satisfies Meta<typeof Picture>
export default meta
type Story = StoryObj<typeof meta>

export const Poster: Story = {}
export const Square: Story = { args: { ratio: "square", src: square(100) } }
export const Hero: Story = { args: { size: "hero" } }
export const Fill: Story = { args: { size: "fill" }, decorators: [(Story) => <div className="w-40"><Story /></div>] }
export const NoPicture: Story = { args: { src: null } }
