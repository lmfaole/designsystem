import type { Meta, StoryObj } from "@storybook/react-vite"

import { Stack } from "../../../src/components/layout"
const Box = ({ n }: { n: number }) => <div className="rounded-md border bg-muted px-3 py-2 text-sm">Box {n}</div>
const boxes = (count: number) => Array.from({ length: count }, (_, i) => <Box key={i} n={i + 1} />)

const meta = {
  title: "Components/Layout/Stack",
  component: Stack,
  tags: ["autodocs"],
  args: { children: null },
  parameters: { docs: { description: { component: `### Use it when

things stand under each other: the sections of a page, the parts of a card. This is the layout of read content.

### Do not use it when

the things are looked at side by side (\`Tiles\`, \`Grid\`).

### Accessibility

**Handled by the component**

- The children stand under each other in DOM order, the order they are read in ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence)).
- One column that never grows wider than its parent ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).
- No semantics of its own: a \`div\`, or the element given as \`as\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).

**You check**

- \`as="ul"\` or \`as="section"\` where the children are a list or a part of the page ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- A group shown only by spacing also has a heading or an element that says so ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).

### Related

\`Inline\`, \`Grid\`, \`Split\`` } }, },
} satisfies Meta<typeof Stack>
export default meta
type Story = StoryObj<typeof meta>

/** Three things under each other at the default `md` gap. */
export const Default: Story = { args: { gap: "md" }, render: (args) => <Stack {...args}>{boxes(3)}</Stack> }
/** `gap="none"`: no room between, for parts that make one thing. */
export const NoGap: Story = { args: { gap: "none" }, render: (args) => <Stack {...args}>{boxes(3)}</Stack> }
/** `gap="xl"`: the room between the parts of a page. */
export const Large: Story = { args: { gap: "xl" }, render: (args) => <Stack {...args}>{boxes(3)}</Stack> }
/** `width="prose"`: a column at the measure of a line of text. */
export const Prose: Story = { args: { width: "prose" }, render: (args) => <Stack {...args}><p>A column limited to the measure of a line of text.</p></Stack> }
