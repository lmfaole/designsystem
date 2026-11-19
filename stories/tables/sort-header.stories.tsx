import type { Meta, StoryObj } from "@storybook/react-vite"

import { SortHeader } from "../../src/components/sort-header"

const meta = {
  title: "Tables/SortHeader",
  component: SortHeader,
  tags: ["autodocs"],
  decorators: [(Story) => <table><thead><tr><Story /></tr></thead></table>],
  args: { label: "Oppdatert", href: "?sorter=oppdatert", direction: "descending" },
  parameters: { docs: { description: { component: `**Use it when** a table has columns the reader may sort by. The link goes to the same page sorted by this column.

**Do not use it when** the order is the point and fixed (a ranking), or the list is \`Rows\`.

**Accessibility.** \`aria-sort\` on the header cell says which column is sorted and which way; the control is a real link of at least 24 px, so the sorted page has an address and works without script.

**Content.** The label is the column's name. Default to the most recent first, or alphabetical by the first column.

**Related.** \`Table\`, \`Pagination\`, \`FilterChips\`` } } },
} satisfies Meta<typeof SortHeader>
export default meta
type Story = StoryObj<typeof meta>

export const Sorted: Story = {}
export const Ascending: Story = { args: { direction: "ascending" } }
export const Unsorted: Story = { args: { direction: "none" } }
