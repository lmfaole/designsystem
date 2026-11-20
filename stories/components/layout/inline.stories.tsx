import type { Meta, StoryObj } from "@storybook/react-vite"

import { Inline } from "../../../src/components/layout"
import { Heading, Text } from "../../../src/components/text"
const Box = ({ n }: { n: number }) => <div className="rounded-md border bg-muted px-3 py-2 text-sm">Box {n}</div>
const boxes = (count: number) => Array.from({ length: count }, (_, i) => <Box key={i} n={i + 1} />)

const meta = {
  title: "Components/Layout/Inline",
  component: Inline,
  tags: ["autodocs"],
  args: { children: null },
  parameters: { docs: { description: { component: `### Use it when

a few small things sit on one line: a count and a label, a button and a link.

### Do not use it when

the things are read in order down the page (\`Stack\`).

### Accessibility

**Handled by the component**

- The children are in DOM order, the order they are read in; \`between\` only moves them apart ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence)).
- It wraps instead of scrolling sideways ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).
- No semantics of its own: a \`div\`, or the element given as \`as\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).

**You check**

- \`as="ul"\` when the children are a list of things ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- Small controls side by side keep the gap that makes each a 24 px target or spaced like one ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)).

### Related

\`Stack\`, \`StatusLine\`` } }, },
} satisfies Meta<typeof Inline>
export default meta
type Story = StoryObj<typeof meta>

/** Three things in a row at the default `sm` gap, wrapping when the row is full. */
export const Default: Story = { render: (args) => <Inline {...args}>{boxes(3)}</Inline> }
/** `justify="between"`: one thing at each end, as a title and its action. */
export const SpaceBetween: Story = { args: { justify: "between" }, render: (args) => <Inline {...args}>{boxes(2)}</Inline> }
/** `align="baseline"`: a heading and small text aligned on their text, not their boxes. */
export const Baseline: Story = {
  args: { align: "baseline", gap: "md" },
  render: (args) => (
    <Inline {...args}>
      <Heading level={2} look="section">Baseline</Heading>
      <Text size="sm" tone="muted">aligned on the text, not the box</Text>
    </Inline>
  ),
}
