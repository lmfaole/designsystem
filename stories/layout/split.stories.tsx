import type { Meta, StoryObj } from "@storybook/react-vite"

import { Split } from "../../src/components/layout"
import { PageLayout } from "../../src/components/page-layout"
import { Heading } from "../../src/components/text"
const Box = ({ n }: { n: number }) => <div className="rounded-md border bg-muted px-3 py-2 text-sm">Box {n}</div>
const boxes = (count: number) => Array.from({ length: count }, (_, i) => <Box key={i} n={i + 1} />)

const meta = {
  title: "Layout/Split",
  component: Split,
  tags: ["autodocs"],
  args: { rail: null, children: null },
  parameters: { layout: "fullscreen", docs: { description: { component: `**Use it when** a page has something to look up beside what is read: a cover, its facts and the link out (\`position="start"\`, a detail page), or related things and a summary (\`position="end"\`). Inside a \`PageLayout width="pane"\`, the pane is beside the main content from the \`expanded\` width class (56rem of room) and in line below it; the main content keeps the reading column's 48rem.

**Do not use it when** it would hold read content, a second list or navigation (read content stands in one column, navigation is the \`NavBar\`), or the page is in the default reading column (there is no room, so it stays one column).

**Accessibility.** The DOM order is the order on a phone and the order a screen reader reads: \`start\` puts the pane first, \`end\` after the main content. The pane is an \`aside\`. Nothing in the pane may be the only place something is said.

**Content.** The pane holds short things: a picture, a \`FactList\`, one \`LinkButton\` out.

**Related.** \`PageLayout\`, \`Stack\`, \`Grid\`, guide «Wide screens»` } }, },
} satisfies Meta<typeof Split>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { rail: <Heading level={2} look="label">Facts</Heading>, children: null },
  render: (args) => <PageLayout width="pane"><Split {...args}>{boxes(8)}</Split></PageLayout>,
}

export const PaneEnd: Story = {
  args: { rail: <Heading level={2} look="label">Related</Heading>, children: null, position: "end" },
  render: (args) => <PageLayout width="pane"><Split {...args}>{boxes(8)}</Split></PageLayout>,
}
