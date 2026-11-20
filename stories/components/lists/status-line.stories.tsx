import type { Meta, StoryObj } from "@storybook/react-vite"

import { StatusLine } from "../../../src/components/status-line"

const meta = {
  title: "Components/Lists/StatusLine",
  component: StatusLine,
  tags: ["autodocs"],
  args: { items: [{ text: "Tester OK", icon: "success" }, { text: "Godkjent", icon: "success" }, { text: "Stille i 3 dager", icon: "time", tone: "muted" }] },
  parameters: { docs: { description: { component: `### Use it when

short statuses stand on one line under a title: «Tester feilet», «Godkjent».

### Do not use it when

one word beside a name in a row (\`Badge\`) or a count that links (\`SummaryBar\`).

### Accessibility

**Handled by the component**

- A real list, one item per status ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- Each status is words; the icon beside it is hidden from assistive technology, so nothing is said twice ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)).
- \`destructive\` is also medium weight and carries its symbol, so it does not rely on red ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color)).
- The statuses wrap onto more lines instead of scrolling sideways ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).
- Nothing is drawn for an empty list.

**You check**

- \`text\` says the whole status; the icon only repeats it ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color)).
- The text is extra small: check the contrast of \`muted\` on its background ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)).
- A status that changes while the page is open is not announced: put it in a live region where the reader must hear it ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages)).

### Content

Sentence case, one meaning for one word; \`destructive\` only for what stops something.

### Related

\`Badge\`, \`SummaryBar\`, \`Banner\`` } }, },
} satisfies Meta<typeof StatusLine>
export default meta
type Story = StoryObj<typeof meta>

/** Everyday statuses: two done, one `muted`. */
export const Default: Story = {}

/** What stops something is `destructive`: red, medium weight and a symbol, so it reads the same without colour. */
export const Blocked: Story = { args: { items: [{ text: "Tester feilet", icon: "failure", tone: "destructive" }, { text: "Konflikter", icon: "warning", tone: "destructive" }, { text: "2 åpne kommentarer", icon: "discussion", tone: "destructive" }] } }
/** What is under way is `muted`: grey words with a symbol, never red. */
export const Waiting: Story = { args: { items: [{ text: "Tester kjører", icon: "pending", tone: "muted" }, { text: "Venter på review", icon: "waiting", tone: "muted" }] } }
/** Statuses without symbols: plain words, where no sign at a glance is needed. */
export const NoIcons: Story = { args: { items: [{ text: "Utkast" }, { text: "Ny i dag", tone: "muted" }] } }
