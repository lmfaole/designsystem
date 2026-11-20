import type { Meta, StoryObj } from "@storybook/react-vite"

import { SectionSkeleton } from "../../../src/components/section-skeleton"

const meta = {
  title: "Components/States/SectionSkeleton",
  component: SectionSkeleton,
  tags: ["autodocs"],
  args: { title: "pull requests", lines: 3 },
  parameters: { docs: { description: { component: `### Use it when

a section is on its way and the page should not jump when it arrives: it stands at the section's final height.

### Do not use it when

the part arrives within a second (show nothing), or has failed (\`ErrorMessage\`). Put it in a \`StreamedSection\`, not by hand.

### Accessibility

**Handled by the component**

- One \`role="status"\` with \`aria-busy\` and a hidden «Henter …» label for the whole part; the bars have no text to read ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))
- The pulse of the bars stops under reduced motion (the safety net in \`motion.css\`) ([2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions))

**You check**

- \`title\` names what is loading, in words that fit after «Henter» ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))
- When the content arrives, the reader is not told: if they must be, say it in a status message ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))

### Content

The label names what is loading. \`lines\` is about how many rows the section will have.

### Related

\`StreamedSection\`, \`Skeleton\`, \`EmptyState\`` } } },
} satisfies Meta<typeof SectionSkeleton>
export default meta
type Story = StoryObj<typeof meta>

/** Three rows, the usual height of a section on its way. */
export const Default: Story = {}
/** One row, for a section that holds a single line. */
export const Short: Story = { args: { lines: 1 } }
