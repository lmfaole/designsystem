import type { Meta, StoryObj } from "@storybook/react-vite"

import { LiveDot } from "../../src/components/live-dot"

const meta = {
  title: "Feedback/LiveDot",
  component: LiveDot,
  tags: ["autodocs"],
} satisfies Meta<typeof LiveDot>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
