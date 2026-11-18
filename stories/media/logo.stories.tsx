import type { Meta, StoryObj } from "@storybook/react-vite"

import { Logo } from "../../src/components/logos"
import { square } from "../sample"

const meta = {
  title: "Media/Logo",
  component: Logo,
  tags: ["autodocs"],
  args: { name: "Studio", src: square(30, "S") },
} satisfies Meta<typeof Logo>
export default meta
type Story = StoryObj<typeof meta>

export const Plate: Story = {}
export const Bare: Story = { args: { plate: false } }
