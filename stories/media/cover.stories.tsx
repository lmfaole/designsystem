import type { Meta, StoryObj } from "@storybook/react-vite"

import { Cover } from "../../src/components/cover"
import { poster, square } from "../sample"

const meta = {
  title: "Media/Cover",
  component: Cover,
  tags: ["autodocs"],
  args: { url: poster(10, "A") },
} satisfies Meta<typeof Cover>
export default meta
type Story = StoryObj<typeof meta>

export const Poster: Story = {}
export const Square: Story = { args: { ratio: "square", url: square(100) } }
export const Hero: Story = { args: { size: "hero" } }
export const Fill: Story = { args: { size: "fill" }, decorators: [(Story) => <div className="w-40"><Story /></div>] }
export const NoPicture: Story = { args: { url: null } }
