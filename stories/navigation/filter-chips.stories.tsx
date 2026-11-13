import type { Meta, StoryObj } from "@storybook/react-vite"

import { FilterChips } from "../../src/components/filter-chips"

const meta = {
  title: "Navigation/FilterChips",
  component: FilterChips,
  tags: ["autodocs"],
  args: { label: "Kategori", chips: [{ key: "a", label: "Alle", href: "#a", current: true }, { key: "b", label: "Teknologi", href: "#b", current: false }, { key: "c", label: "Politikk", href: "#c", current: false }] },
} satisfies Meta<typeof FilterChips>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
