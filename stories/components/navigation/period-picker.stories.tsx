import type { Meta, StoryObj } from "@storybook/react-vite"

import { PeriodPicker } from "../../../src/components/period-picker"

const meta = {
  title: "Components/Navigation/PeriodPicker",
  component: PeriodPicker,
  tags: ["autodocs"],
  args: { periods: ["2026-11", "2026-10", "2026-09"], selected: "2026-11", hrefTo: (p: string) => `#${p}`, formatLabel: (p: string) => p },
  parameters: { docs: { description: { component: `### Use it when

the reader chooses a period (a week, a month, a year); choosing goes to that address.

### Do not use it when

a free date (a native date field).

### Accessibility

**Handled by the component**

- A native \`select\` named by \`label\` («Periode»), with the chosen period selected ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)).
- The keyboard and the picker are the platform's own ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard)).
- The focus ring of \`NativeSelect\` ([2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible)).
- 48 px high ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)).
- Says in advance that a choice changes the page («Siden bytter til perioden du velger.», its description), and the arrow keys of a closed select step through the periods without leaving: the page changes on Enter or when focus leaves ([3.2.2 On Input](https://www.w3.org/WAI/WCAG22/Understanding/on-input)).

**You check**

- The name is only for a screen reader: where the options do not say what they are, show a label ([3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions)).
- \`formatLabel\` gives words a reader knows («november 2026», not «2026-11») ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels)).
- The page runs \`enableNavigatingSelects\` once, or choosing does nothing.

### Content

The label names the period («Måned»).

### Related

\`SegmentedToggle\`, \`NativeSelect\`` } }, },
} satisfies Meta<typeof PeriodPicker>
export default meta
type Story = StoryObj<typeof meta>

/** Three months with the latest chosen, named «Periode» for a screen reader. */
export const Default: Story = {}
/** `label` changes what a screen reader calls it («Måned»). */
export const CustomLabel: Story = { args: { label: "Måned" } }
