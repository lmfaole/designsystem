import type { Meta, StoryObj } from "@storybook/react-vite"

import { Reveal } from "../../src/components/reveal"
import { Text } from "../../src/components/text"

const meta = {
  title: "Motion/Reveal",
  component: Reveal,
  tags: ["autodocs"],
} satisfies Meta<typeof Reveal>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: <Text>This block rises into place (movement only, no fade).</Text> } }
