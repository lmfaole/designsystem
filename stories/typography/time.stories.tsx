import type { Meta, StoryObj } from "@storybook/react-vite"

import { Time } from "../../src/components/time"

const meta = {
  title: "Typography/Time",
  component: Time,
  tags: ["autodocs"],
  args: { value: "2026-11-19T09:00:00Z", now: new Date("2026-11-19T12:00:00Z") },
  parameters: { docs: { description: { component: `### Use it when

a moment is shown: when something happened or will happen.

### Do not use it when

the date is the content (a release date in a table of releases): use \`format="date"\` there.

### Accessibility

**Handled by the component**

- A \`<time datetime>\` with the exact ISO moment, readable by machines ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- \`now\` is passed in, so the server and the browser render the same text and nothing changes after load ([3.2.2 On Input](https://www.w3.org/WAI/WCAG22/Understanding/on-input))

**You check**

- The exact time in \`title\` is shown on hover only: where it matters, use \`format="datetime"\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- The words around it say what the moment is («Oppdatert», «Publisert») ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))

### Content

Relative under seven days («for 3 timer siden», «i går»), a date from then on («2. nov. 2026»); Norwegian bokmål and Oslo time. Add the exact time (\`format="datetime"\`) where relative is not enough.

### Related

\`CountUp\`, \`DatedEntry\`` } } },
} satisfies Meta<typeof Time>
export default meta
type Story = StoryObj<typeof meta>

/** A moment hours ago, told relative to `now`. */
export const Recent: Story = {}
/** A moment the day before, told as «i går». */
export const Yesterday: Story = { args: { value: "2026-11-18T12:00:00Z" } }
/** A moment more than seven days ago, told as a date. */
export const Older: Story = { args: { value: "2026-11-02T10:30:00Z" } }
/** With `format="datetime"`: the exact date and clock in the text. */
export const Datetime: Story = { args: { format: "datetime" } }
/** A moment after `now`, told as «om …». */
export const Future: Story = { args: { value: "2026-11-19T14:00:00Z" } }
