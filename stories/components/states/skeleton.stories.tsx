import type { Meta, StoryObj } from "@storybook/react-vite"

import { Skeleton } from "../../../src/components/ui/skeleton"

const meta = {
  title: "Components/States/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: `### Use it when

a part waits for its data for longer than a second: a skeleton at the part's final height.

### Do not use it when

something that arrives within a second (show nothing), or something that failed (\`ErrorMessage\`).

### Accessibility

**Handled by the component**

- An empty \`div\` with no role or text, so nothing is announced for it ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Its pulse stops under \`prefers-reduced-motion\` ([2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide))

**You check**

- A group of skeletons is announced once, with a hidden label in a \`role="status"\` region («Henter pull requests») ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))
- When the data arrives, the content takes the skeleton's place; announce it only if it is not where focus is ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))

### Content

A hidden label says what is loading («Henter pull requests»).

### Related

\`EmptyState\`, \`ErrorMessage\`` } }, },
} satisfies Meta<typeof Skeleton>
export default meta
type Story = StoryObj<typeof meta>

/** A skeleton for a line of text. */
export const Line: Story = { args: { className: "h-4 w-48" } }
/** A round skeleton for a picture. */
export const Avatar: Story = { args: { className: "size-12 rounded-full" } }
