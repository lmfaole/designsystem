import type { Meta, StoryObj } from "@storybook/react-vite"

import { PeriodPicker } from "../../src/components/period-picker"

const meta = {
  title: "Navigation/PeriodPicker",
  component: PeriodPicker,
  tags: ["autodocs"],
  args: { periods: ["2026-11", "2026-10", "2026-09"], selected: "2026-11", hrefTo: (p: string) => `#${p}`, formatLabel: (p: string) => p },
  parameters: { docs: { description: { component: `**Use it when** the reader chooses a period (a week, a month, a year); choosing goes to that address.

**Do not use it when** a free date (a native date field).

**Accessibility.** A native \`select\`, so the list is the platform's own picker; each option carries its address and the page navigates when one is chosen.

**Content.** The label names the period («Måned»).

**Related.** \`SegmentedToggle\`, \`NativeSelect\`` } }, },
} satisfies Meta<typeof PeriodPicker>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const CustomLabel: Story = { args: { label: "Måned" } }
