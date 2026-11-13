import type { Meta, StoryObj } from "@storybook/react-vite"

import { CreatorLogo } from "../../src/components/creator-marks"
import { square } from "../sample"

const meta = {
  title: "Media/CreatorLogo",
  component: CreatorLogo,
  tags: ["autodocs"],
  args: { name: "Studio", logo: square(30, "S") },
} satisfies Meta<typeof CreatorLogo>
export default meta
type Story = StoryObj<typeof meta>

export const Plate: Story = {}
export const Bare: Story = { args: { plate: false } }
