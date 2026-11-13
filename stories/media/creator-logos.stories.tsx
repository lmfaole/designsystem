import type { Meta, StoryObj } from "@storybook/react-vite"

import { CreatorLogos } from "../../src/components/creator-marks"
import { square } from "../sample"

const meta = {
  title: "Media/CreatorLogos",
  component: CreatorLogos,
  tags: ["autodocs"],
  args: { names: ["Studio A", "Studio B", "No logo"], logos: { "Studio A": square(30, "A"), "Studio B": square(200, "B") } },
} satisfies Meta<typeof CreatorLogos>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
