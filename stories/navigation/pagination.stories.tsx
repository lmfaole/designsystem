import type { Meta, StoryObj } from "@storybook/react-vite"

import { Pagination } from "../../src/components/pagination"

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  args: { current: 6, total: 12, hrefFor: (page: number) => `?side=${page}` },
  parameters: { docs: { description: { component: `**Use it when** a long list has an address for each page (\`?side=3\`), so a page can be bookmarked and shared.

**Do not use it when** a short list with a clear sort and filters would do, or the list is endless (a \`VirtualRows\` or a progressive count keeps one page).

**Accessibility.** A \`nav\` with real links, «Forrige» and «Neste» in words, the current page marked with \`aria-current="page"\`, targets of at least 36 px, and a gap that is hidden from screen readers.

**Content.** The words are «Forrige» and «Neste»; page numbers are labelled «Side 6» for a screen reader.

**Related.** \`VirtualRows\`, \`FilterChips\`, \`SubPages\`` } } },
} satisfies Meta<typeof Pagination>
export default meta
type Story = StoryObj<typeof meta>

export const Middle: Story = {}
export const First: Story = { args: { current: 1 } }
export const Last: Story = { args: { current: 12 } }
export const Few: Story = { args: { total: 3, current: 2 } }
export const One: Story = { args: { total: 1 } }
