import type { Meta, StoryObj } from "@storybook/react-vite"

import { Inline } from "../../src/components/layout"
import { Heading, Text } from "../../src/components/text"
const Box = ({ n }: { n: number }) => <div className="rounded-md border bg-muted px-3 py-2 text-sm">Box {n}</div>
const boxes = (count: number) => Array.from({ length: count }, (_, i) => <Box key={i} n={i + 1} />)

const meta = {
  title: "Layout/Inline",
  component: Inline,
  tags: ["autodocs"],
  args: { children: null },
} satisfies Meta<typeof Inline>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: (args) => <Inline {...args}>{boxes(3)}</Inline> }
export const SpaceBetween: Story = { args: { justify: "between" }, render: (args) => <Inline {...args}>{boxes(2)}</Inline> }
export const Baseline: Story = {
  args: { align: "baseline", gap: "md" },
  render: (args) => (
    <Inline {...args}>
      <Heading level={2} look="section">Baseline</Heading>
      <Text size="sm" tone="muted">aligned on the text, not the box</Text>
    </Inline>
  ),
}
