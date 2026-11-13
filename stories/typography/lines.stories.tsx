import type { Meta, StoryObj } from "@storybook/react-vite"

import { Lines } from "../../src/components/lines"

const meta = {
  title: "Typography/Lines",
  component: Lines,
  tags: ["autodocs"],
  args: { items: [] },
} satisfies Meta<typeof Lines>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { items: ["1982", "Blade Runner", null, "Ridley Scott"] } }
