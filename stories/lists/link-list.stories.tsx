import type { Meta, StoryObj } from "@storybook/react-vite"

import { LinkList } from "../../src/components/fact-list"

const meta = {
  title: "Lists/LinkList",
  component: LinkList,
  tags: ["autodocs"],
  args: { links: [["IMDb", "https://example.com"], ["Wikipedia", "https://example.com"], ["Missing", null]] },
} satisfies Meta<typeof LinkList>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
