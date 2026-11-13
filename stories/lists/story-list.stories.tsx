import type { Meta, StoryObj } from "@storybook/react-vite"

import { StoryList } from "../../src/components/story-list"

const meta = {
  title: "Lists/StoryList",
  component: StoryList,
  tags: ["autodocs"],
  args: { stories: [{ key: "1", href: "https://example.com", title: "A large link out to another site", byline: "example.com · 12 poeng" }, { key: "2", href: "https://example.com", title: "A second story", byline: "example.org · 3 poeng" }] },
} satisfies Meta<typeof StoryList>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
