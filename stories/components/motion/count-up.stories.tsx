import type { Meta, StoryObj } from "@storybook/react-vite"

import { CountUp } from "../../../src/components/count-up"

const meta = {
  title: "Components/Motion/CountUp",
  component: CountUp,
  tags: ["autodocs"],
  args: { value: 12345 },
  parameters: { docs: { description: { component: `### Use it when

a whole number counts up when it first shows (a total on a front page).

### Do not use it when

a number that changes on refetch, a sort or a filter (it would count every time).

### Accessibility

**Handled by the component**

- The real, formatted number is text in the HTML; the climbing counter is hidden from a screen reader ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Under \`prefers-reduced-motion\` the number is there at once ([2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions))
- It runs once, for under a second, so no pause control is needed ([2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide))

**You check**

- \`format\` and the text around it say what the number counts ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))
- Used only on the first view, never on a refetch, sort or filter ([2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions))

### Related

\`Reveal\`, guide «Motion»` } }, },
} satisfies Meta<typeof CountUp>
export default meta
type Story = StoryObj<typeof meta>

/** A number counting up to its plain value. */
export const Default: Story = {}
/** A formatted final text with its unit. */
export const Formatted: Story = { args: { format: (v: number) => v.toLocaleString("nb-NO") + " avspillinger" } }
