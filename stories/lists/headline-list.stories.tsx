import type { Meta, StoryObj } from "@storybook/react-vite"

import { HeadlineList } from "../../src/components/headline-list"

const meta = {
  title: "Lists/HeadlineList",
  component: HeadlineList,
  tags: ["autodocs"],
  args: { headlines: [{ key: "1", href: "https://example.com", title: "A headline from elsewhere", note: "example.com · i dag" }, { key: "2", href: "https://example.com", title: "Another one", note: "example.org · i går" }] },
} satisfies Meta<typeof HeadlineList>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
