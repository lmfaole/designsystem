import type { Meta, StoryObj } from "@storybook/react-vite"

import { Split } from "../../src/components/layout"
import { Heading } from "../../src/components/text"
const Box = ({ n }: { n: number }) => <div className="rounded-md border bg-muted px-3 py-2 text-sm">Box {n}</div>
const boxes = (count: number) => Array.from({ length: count }, (_, i) => <Box key={i} n={i + 1} />)

const meta = {
  title: "Layout/Split",
  component: Split,
  tags: ["autodocs"],
  args: { rail: null, children: null },
  parameters: { docs: { description: { component: `**Use it when** a rail of reference (a cover and its facts) stands beside the main content on a wide screen.

**Do not use it when** read content or a menu in a rail (read content stands in one column, navigation is the \`NavBar\`).

**Accessibility.** The rail comes after the main content in the DOM, so the reading order is unchanged.

**Related.** \`Stack\`, \`PageLayout\`` } }, },
} satisfies Meta<typeof Split>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { rail: <Heading level={2} look="label">Facts</Heading>, children: null },
  render: (args) => <Split {...args}>{boxes(8)}</Split>,
}
