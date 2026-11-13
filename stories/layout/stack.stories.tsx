import type { Meta, StoryObj } from "@storybook/react-vite"

import { Stack } from "../../src/components/layout"
const Box = ({ n }: { n: number }) => <div className="rounded-md border bg-muted px-3 py-2 text-sm">Box {n}</div>
const boxes = (count: number) => Array.from({ length: count }, (_, i) => <Box key={i} n={i + 1} />)

const meta = {
  title: "Layout/Stack",
  component: Stack,
  tags: ["autodocs"],
  args: { children: null },
} satisfies Meta<typeof Stack>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { gap: "md" }, render: (args) => <Stack {...args}>{boxes(3)}</Stack> }
export const NoGap: Story = { args: { gap: "none" }, render: (args) => <Stack {...args}>{boxes(3)}</Stack> }
export const Large: Story = { args: { gap: "xl" }, render: (args) => <Stack {...args}>{boxes(3)}</Stack> }
export const Prose: Story = { args: { width: "prose" }, render: (args) => <Stack {...args}><p>A column limited to the measure of a line of text.</p></Stack> }
