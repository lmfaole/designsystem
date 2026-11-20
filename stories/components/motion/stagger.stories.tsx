import type { Meta, StoryObj } from "@storybook/react-vite"

import { Stagger } from "../../../src/components/reveal"

const meta = {
  title: "Components/Motion/Stagger",
  component: Stagger,
  tags: ["autodocs"],
  args: { children: null },
  parameters: { docs: { description: { component: `### Use it when

items enter one after another when a page arrives.

### Do not use it when

content that changes after load.

### Accessibility

**Handled by the component**

- Movement only, no fade; off under \`prefers-reduced-motion\` ([2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions))
- Six steps at most, once on mount, so it is over in under a second ([2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide))
- Children enter in their reading order and are not reordered ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence))

**You check**

- With \`as="ul"\` or \`"ol"\` the children are \`li\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Used only when the page arrives, not for content that changes after load ([2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions))

### Related

\`Reveal\`, guide «Motion»` } }, },
} satisfies Meta<typeof Stagger>
export default meta
type Story = StoryObj<typeof meta>

/** List items entering one after another. */
export const List: Story = { args: { as: "ul", children: [1, 2, 3, 4].map((n) => <li key={n}>Item {n}</li>) } }
