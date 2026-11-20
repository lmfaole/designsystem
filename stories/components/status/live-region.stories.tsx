import type { Meta, StoryObj } from "@storybook/react-vite"

import { LiveRegion } from "../../../src/components/live-region"
import { Text } from "../../../src/components/text"

const meta = {
  title: "Components/Status/LiveRegion",
  component: LiveRegion,
  tags: ["autodocs"],
  args: { children: <Text>Spilles nå: Hard, Rihanna</Text> },
  parameters: { docs: { description: { component: `### Use it when

a part of the page changes by itself while it is open (what plays now, a figure fetched again): a screen reader is told what changed, politely, without losing its place.

### Do not use it when

the content changes because the reader did something (a button, a filter): that is their own action, and focus and the page already say so. And not for an error (\`ErrorMessage\`).

### Accessibility

**Handled by the component**

- \`aria-live="polite"\` and \`aria-atomic\`: the whole region is read when it changes, after what the reader is doing ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages)).

**You check**

- The region is on the page before its content changes: render it empty, not only when there is something to say.
- What changes is words, not only a picture or a movement. Updating by itself should stop when the page is hidden, and not be faster than the reader can follow ([2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide)).

### Content

One short sentence of what is now so, not «updated».

### Related

\`NowPlayingCard\`, \`Freshness\`, \`StatusLine\`` } }, },
} satisfies Meta<typeof LiveRegion>
export default meta
type Story = StoryObj<typeof meta>

/** A region with a sentence in it. */
export const Default: Story = {}
/** On the page and empty, ready for what will come. */
export const Empty: Story = { args: { children: null } }
