import type { Meta, StoryObj } from "@storybook/react-vite"

import { Text } from "../../src/components/text"

const meta = {
  title: "Typography/Text",
  component: Text,
  tags: ["autodocs"],
  args: { children: "Blåbærsyltetøy på skiva." },
  parameters: { docs: { description: { component: `### Use it when

running text in the few forms the system has: size, tone, weight.

### Do not use it when

a heading (\`Heading\`) or a label next to a field (\`TextField\`).

### Accessibility

**Handled by the component**

- A real element from \`as\` (\`p\` by default), so a paragraph is a paragraph ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Muted and destructive tones are theme tokens that meet 4.5:1 ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum))
- Sizes are in \`rem\`, so text grows with the reader's text size ([1.4.4 Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text))
- Long words break where they must instead of widening the page ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow))

**You check**

- \`as\` matches the meaning (\`dd\` in a definition list, \`time\` for a moment) ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- The destructive tone is never the only sign of an error: say it in words ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- Truncated text loses its end for everyone: the whole text is reachable elsewhere ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))

### Content

Plain words, active voice, «du» to the reader.

### Related

\`Heading\`, \`Lines\`, \`Markdown\`` } }, },
} satisfies Meta<typeof Text>
export default meta
type Story = StoryObj<typeof meta>

/** Running text at the base size and tone. */
export const Default: Story = {}
/** The small size, for secondary lines. */
export const Small: Story = { args: { size: "sm" } }
/** The large size, for a lead paragraph. */
export const Large: Story = { args: { size: "lg" } }
/** The muted tone, for what matters less; it still meets 4.5:1. */
export const Muted: Story = { args: { tone: "muted" } }
/** The destructive tone, for an error or a loss, always with words that say so. */
export const Destructive: Story = { args: { tone: "destructive" } }
/** The semibold weight, for a word that must stand out in a line. */
export const Semibold: Story = { args: { weight: "semibold" } }
/** Tabular figures, so counts line up under each other. */
export const Numeric: Story = { args: { numeric: true, children: "1 111 8 888" } }
/** One line cut with an ellipsis when it does not fit its box. */
export const Truncated: Story = { args: { truncate: true, children: "One long line that is cut with an ellipsis when there is not room for all of it, however long it goes on, and on, and on, and on, and on, and on, and on" }, decorators: [(Story) => <div className="max-w-sm"><Story /></div>] }
