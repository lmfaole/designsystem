import type { Meta, StoryObj } from "@storybook/react-vite"

import { CardLink } from "../../src/components/card-link"

const meta = {
  title: "Typography/CardLink",
  component: CardLink,
  tags: ["autodocs"],
  args: { href: "#", children: "Ridley Scott" },
} satisfies Meta<typeof CardLink>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Strong: Story = { args: { look: "strong" } }
export const Block: Story = { args: { look: "block" } }
