import type { Meta, StoryObj } from "@storybook/react-vite"

import { DatedLinkTable } from "../../src/components/dated-link-table"

const meta = {
  title: "Lists/DatedLinkTable",
  component: DatedLinkTable,
  tags: ["autodocs"],
  args: { dayHead: "Dag", titleHead: "Tittel", rows: [{ key: "1", day: "12. nov.", href: "https://example.com", title: "A link out", source: "example.com" }, { key: "2", day: "11. nov.", href: "https://example.com", title: "Another", source: "example.org" }] },
  parameters: { docs: { description: { component: `**Use it when** a table of links with the date each came out: releases, reports.

**Do not use it when** things that have a page of their own in the app (\`Rows\`).

**Accessibility.** A table with headers; links open in the same window and external ones are marked.

**Content.** The date as the page words it.

**Related.** \`Rows\`, \`Table\`, \`Time\`` } }, },
} satisfies Meta<typeof DatedLinkTable>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
