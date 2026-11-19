import type { Meta, StoryObj } from "@storybook/react-vite"

import { Progress } from "../../src/components/progress"

const meta = {
  title: "Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
  args: { label: "Disk", value: 93, valueText: "93 % full" },
  parameters: { docs: { description: { component: `### Use it when

one value is shown against a goal or a limit: a listening goal, a disk, a backlog read.

### Do not use it when

something is waiting (use \`Skeleton\` or text), or when it is several parts of a whole (\`DonutChart\`, \`SummaryBar\`).

### Accessibility

**Handled by the component**

- \`role="meter"\` named by the label, with its range, its value and the words as \`aria-valuetext\` ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- The value is clamped to the range, so the meter never reports a value outside it ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- The label and the value are visible text, so the bar never carries the value alone ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- The target mark is hidden from assistive technology; the goal is in the words («mål 30») ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))

**You check**

- The label names what is measured, and differs from other meters on the page ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))
- \`valueText\` says the value with its unit, as it should be read («93 % full») ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Not for something that is loading: a wait is a status, not a meter ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))

### Content

The label is a noun («Disk»); the value says it in words («93 % full», «12 av 40»).

### Related

\`SummaryBar\`, \`DonutChart\`, \`Skeleton\`` } } },
} satisfies Meta<typeof Progress>
export default meta
type Story = StoryObj<typeof meta>

/** A value against a limit, with the value in words. */
export const Default: Story = {}
/** A count against a total, with a `max` other than 100. */
export const Counted: Story = { args: { label: "Lest", value: 12, max: 40, valueText: "12 av 40" } }
/** Nothing yet and no `valueText`: the percentage is shown in its place. */
export const Empty: Story = { args: { value: 0, valueText: undefined, label: "Mål" } }
/** A bullet: a goal marked on the bar and said in words, not yet reached. */
export const WithTarget: Story = { args: { label: "Lest", value: 12, max: 40, valueText: "12 av 40", target: 30 } }
/** A bullet whose value has gone past its goal. */
export const PastTheTarget: Story = { args: { label: "Lyttemål", value: 36, max: 40, valueText: "36 av 40", target: 30 } }
