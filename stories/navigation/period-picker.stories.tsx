import type { Meta, StoryObj } from "@storybook/react-vite"

import { PeriodPicker } from "../../src/components/period-picker"

const meta = {
  title: "Navigation/PeriodPicker",
  component: PeriodPicker,
  tags: ["autodocs"],
  args: { periods: ["2026-11", "2026-10", "2026-09"], selected: "2026-11", hrefTo: (p: string) => `#${p}`, formatLabel: (p: string) => p },
} satisfies Meta<typeof PeriodPicker>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const CustomLabel: Story = { args: { label: "Måned" } }
