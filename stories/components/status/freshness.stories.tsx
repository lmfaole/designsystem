import type { Meta, StoryObj } from "@storybook/react-vite"

import { Freshness } from "../../../src/components/freshness"

// A fixed «now», so the story reads the same every time (and its picture in the visual test does not change with the clock).
const NOW = Date.parse("2026-11-19T12:00:00Z")
const minutesAgo = (minutes: number) => new Date(NOW - minutes * 60_000).toISOString()

const meta = {
  title: "Components/Status/Freshness",
  component: Freshness,
  tags: ["autodocs"],
  args: { at: minutesAgo(1), now: new Date(NOW).toISOString(), staleAfterSeconds: 180 },
  parameters: { docs: { description: { component: `### Use it when

a page that renews itself shows when its data was made («Oppdatert 19:27»), usually in the page's lead.

### Do not use it when

the time is part of the content (\`Time\`), or for a change the reader must know about at once (\`Banner\`).

### Accessibility

**Handled by the component**

- A still line, not a live region, so renewing every 30 seconds never interrupts a screen reader ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))
- Past the threshold the warning is in words and a symbol; no colour is used ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- The symbol is hidden from assistive technology; the words say it ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))

**You check**

- When the reader must know at once that data is old, add a \`Banner\`: this line is not announced ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))
- It sits in the page's lead, where it is found in reading order ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence))
- It renders nothing when \`at\` is not a valid time: the page must not depend on it

### Content

«Oppdatert 19:27», and past the threshold «Oppdatert 19:27 · dataene kan være gamle». Set \`staleAfterSeconds\` for the source, a few times how often it renews (our own starting point: three renewals for a page).

### Related

\`Time\`, \`Banner\`, \`ConnectionBanner\`, guide «Fresh data and offline»` } } },
} satisfies Meta<typeof Freshness>
export default meta
type Story = StoryObj<typeof meta>

/** Within the threshold: a plain «Oppdatert» line. */
export const Fresh: Story = {}
/** Past the threshold: the line becomes a warning in words with a symbol. */
export const Stale: Story = { args: { at: minutesAgo(20) } }
