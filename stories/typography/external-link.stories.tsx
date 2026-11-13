import type { Meta, StoryObj } from "@storybook/react-vite"

import { ExternalLink } from "../../src/components/external-link"

const meta = {
  title: "Typography/ExternalLink",
  component: ExternalLink,
  tags: ["autodocs"],
  args: { href: "https://example.com", children: "example.com" },
} satisfies Meta<typeof ExternalLink>
export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {}
export const Pill: Story = { args: { look: "pill" } }
