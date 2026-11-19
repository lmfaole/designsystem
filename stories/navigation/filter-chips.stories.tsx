import type { Meta, StoryObj } from "@storybook/react-vite"

import { FilterChips } from "../../src/components/filter-chips"

const meta = {
  title: "Navigation/FilterChips",
  component: FilterChips,
  tags: ["autodocs"],
  args: { label: "Kategori", chips: [{ key: "a", label: "Alle", href: "#a", current: true }, { key: "b", label: "Teknologi", href: "#b", current: false }, { key: "c", label: "Politikk", href: "#c", current: false }] },
  parameters: { docs: { description: { component: `**Use it when** a list is narrowed to one of two to six known values; each chip is a link to the filtered page.

**Do not use it when** many values (\`NativeSelect\`) or free text (\`SearchField\`).

**Accessibility.** Real links; the chip that is on is marked with \`aria-current\`.

**Content.** Short nouns; say how many there are after filtering.

**Related.** \`SearchField\`, \`NativeSelect\`, \`SegmentedToggle\`` } }, },
} satisfies Meta<typeof FilterChips>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
