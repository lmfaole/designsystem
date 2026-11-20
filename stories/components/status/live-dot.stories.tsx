import type { Meta, StoryObj } from "@storybook/react-vite"

import { LiveDot } from "../../../src/components/live-dot"

const meta = {
  title: "Components/Status/LiveDot",
  component: LiveDot,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: `### Use it when

something is live and updates by itself (a feed, a status).

### Do not use it when

the page merely loads fresh data, or as the only sign that something is live (say «live» in text).

### Accessibility

**Handled by the component**

- \`aria-hidden\`, so a screen reader meets nothing empty ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The pulse stops when the device asks for reduced motion ([2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions))

**You check**

- The word «Live» is beside it in text, so the dot is never the only sign ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content), [1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- The pulse loops for as long as it is shown: keep it small and to one per thing that is live ([2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide))

### Content

Always say «Live» in text next to it.

### Related

\`Time\`, \`Banner\`` } }, },
} satisfies Meta<typeof LiveDot>
export default meta
type Story = StoryObj<typeof meta>

/** The dot on its own; on a page it always sits beside the word «Live». */
export const Default: Story = {}
