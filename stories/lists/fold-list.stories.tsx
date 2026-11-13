import type { Meta, StoryObj } from "@storybook/react-vite"

import { FoldList } from "../../src/components/fold-list"

const meta = {
  title: "Lists/FoldList",
  component: FoldList,
  tags: ["autodocs"],
  args: { summary: "Vis alle verdier", items: [{ key: "1", text: "jan: 12" }, { key: "2", text: "feb: 18" }, { key: "3", text: "mar: 9" }] },
} satisfies Meta<typeof FoldList>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
