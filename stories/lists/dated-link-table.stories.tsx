import type { Meta, StoryObj } from "@storybook/react-vite"

import { DatedLinkTable } from "../../src/components/dated-link-table"

const meta = {
  title: "Lists/DatedLinkTable",
  component: DatedLinkTable,
  tags: ["autodocs"],
  args: { dayHead: "Dag", titleHead: "Tittel", rows: [{ key: "1", day: "12. nov.", href: "https://example.com", title: "A link out", source: "example.com" }, { key: "2", day: "11. nov.", href: "https://example.com", title: "Another", source: "example.org" }] },
} satisfies Meta<typeof DatedLinkTable>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
