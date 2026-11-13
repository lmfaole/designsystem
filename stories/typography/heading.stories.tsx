import type { Meta, StoryObj } from "@storybook/react-vite"

import { Heading } from "../../src/components/text"

const meta = {
  title: "Typography/Heading",
  component: Heading,
  tags: ["autodocs"],
  args: { level: 2, children: "A heading" },
} satisfies Meta<typeof Heading>
export default meta
type Story = StoryObj<typeof meta>

export const Page: Story = { args: { level: 1, look: "page" } }
export const Section: Story = { args: { level: 2, look: "section" } }
export const Label: Story = { args: { level: 3, look: "label" } }
export const Item: Story = { args: { level: 3, look: "item" } }
