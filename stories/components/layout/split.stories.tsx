import type { Meta, StoryObj } from "@storybook/react-vite"

import { Split } from "../../../src/components/layout"
import { PageLayout } from "../../../src/components/page-layout"
import { Heading } from "../../../src/components/text"
const Box = ({ n }: { n: number }) => <div className="rounded-md border bg-muted px-3 py-2 text-sm">Box {n}</div>
const boxes = (count: number) => Array.from({ length: count }, (_, i) => <Box key={i} n={i + 1} />)

const meta = {
  title: "Components/Layout/Split",
  component: Split,
  tags: ["autodocs"],
  args: { rail: null, children: null },
  parameters: { layout: "fullscreen", docs: { description: { component: `### Use it when

a page has something to look up beside what is read: a cover and its facts (\`position="start"\`, a detail page; the link out stays last in the main content), or related things and a summary (\`position="end"\`). Inside a \`PageLayout width="pane"\`, the pane is beside the main content from the \`expanded\` width class (56rem of room) and in line below it; the main content keeps the reading column's 48rem.

### Do not use it when

it would hold read content, a second list or navigation (read content stands in one column, navigation is the \`NavBar\`), or the page is in the default reading column (there is no room, so it stays one column).

### Accessibility

**Handled by the component**

- The pane is an \`aside\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- The DOM order is the order on a phone and for a screen reader: \`start\` puts the pane first, \`end\` after the main content ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence)).
- One column below the \`expanded\` width, so nothing scrolls sideways at 320 px ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).

**You check**

- The pane starts with a heading; with more than one \`aside\` on the page, each needs a name ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- With \`start\` the pane comes first for the keyboard too: keep it short ([2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order)).
- Nothing in the pane is the only place something is said.

### Content

The pane holds short things: a picture and a \`FactList\`. A link out is last in the main content, not in the pane, which comes first on a phone.

### Related

\`PageLayout\`, \`Stack\`, \`Grid\`, guide «Wide screens»` } }, },
} satisfies Meta<typeof Split>
export default meta
type Story = StoryObj<typeof meta>

/** The pane first (`start`): who the page is about, at the left on a desktop and above on a phone. */
export const Default: Story = {
  args: { rail: <Heading level={2} look="label">Facts</Heading>, children: null },
  render: (args) => <PageLayout width="pane"><Split {...args}>{boxes(8)}</Split></PageLayout>,
}

/** `position="end"`: the pane supports the main content, at the right on a desktop and under it on a phone. */
export const PaneEnd: Story = {
  args: { rail: <Heading level={2} look="label">Related</Heading>, children: null, position: "end" },
  render: (args) => <PageLayout width="pane"><Split {...args}>{boxes(8)}</Split></PageLayout>,
}
