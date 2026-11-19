import type { Meta, StoryObj } from "@storybook/react-vite"

import { PageColumn } from "../../src/components/layout"
const Box = ({ n }: { n: number }) => <div className="rounded-md border bg-muted px-3 py-2 text-sm">Box {n}</div>
const boxes = (count: number) => Array.from({ length: count }, (_, i) => <Box key={i} n={i + 1} />)

const meta = {
  title: "Layout/PageColumn",
  component: PageColumn,
  tags: ["autodocs"],
  args: { children: null },
  parameters: { docs: { description: { component: `### Use it when

the one column a page's content stands in, at the reading width or wide.

### Do not use it when

inside another column.

### Accessibility

**Handled by the component**

- The children stand under each other in DOM order ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence)).
- 16 px gutters on a phone and one column, so nothing scrolls sideways at 320 px ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).
- No semantics of its own: a \`div\`, or the element given as \`as\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).

**You check**

- Inside \`PageLayout\` the page already has its \`main\`; standing alone it needs \`as="main"\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- The headings of what stands in it go in order ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).

### Related

\`PageLayout\`, \`Stack\`` } }, },
} satisfies Meta<typeof PageColumn>
export default meta
type Story = StoryObj<typeof meta>

/** Three parts under each other in the reading column, inside the page's gutters. */
export const Default: Story = { render: (args) => <PageColumn {...args}>{boxes(3)}</PageColumn> }
