import type { Meta, StoryObj } from "@storybook/react-vite"

import { TextLink } from "../../src/components/text"

const meta = {
  title: "Typography/TextLink",
  component: TextLink,
  tags: ["autodocs"],
  args: { href: "#", children: "A link" },
} satisfies Meta<typeof TextLink>
export default meta
type Story = StoryObj<typeof meta>

export const Internal: Story = {}
export const External: Story = { args: { external: true, href: "https://example.com" } }
