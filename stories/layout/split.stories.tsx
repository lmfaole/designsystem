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
} satisfies Meta<typeof Split>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { rail: <Heading level={2} look="label">Facts</Heading>, children: null },
  render: (args) => <Split {...args}>{boxes(8)}</Split>,
}
