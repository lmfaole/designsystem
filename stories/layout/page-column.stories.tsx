import type { Meta, StoryObj } from "@storybook/react-vite"

import { PageColumn } from "../../src/components/layout"
const Box = ({ n }: { n: number }) => <div className="rounded-md border bg-muted px-3 py-2 text-sm">Box {n}</div>
const boxes = (count: number) => Array.from({ length: count }, (_, i) => <Box key={i} n={i + 1} />)

const meta = {
  title: "Layout/PageColumn",
  component: PageColumn,
  tags: ["autodocs"],
  args: { children: null },
} satisfies Meta<typeof PageColumn>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: (args) => <PageColumn {...args}>{boxes(3)}</PageColumn> }
