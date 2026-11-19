import type { Meta, StoryObj } from "@storybook/react-vite"

import { Reveal } from "../../src/components/reveal"
import { Text } from "../../src/components/text"

const meta = {
  title: "Motion/Reveal",
  component: Reveal,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: `### Use it when

one block rises into place when it first shows.

### Do not use it when

content that changes on a refetch, a sort or a filter, or more than once per mount.

### Accessibility

**Handled by the component**

- Movement only, no fade, so the text keeps its contrast while it moves ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum))
- Off under \`prefers-reduced-motion\` ([2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions))
- It runs once on mount, for under a second ([2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide))
- The block stays where it is in the reading order ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence))

**You check**

- Used once per mount on the first view, not on a refetch, sort or filter ([2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions))
- \`as\` fits the content (\`ul\` for a list) ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))

### Related

\`CountUp\`, \`Stagger\`, guide «Motion»` } }, },
} satisfies Meta<typeof Reveal>
export default meta
type Story = StoryObj<typeof meta>

/** One block rising into place once. */
export const Default: Story = { args: { children: <Text>This block rises into place (movement only, no fade).</Text> } }
