import type { Meta, StoryObj } from "@storybook/react-vite"

import { Grid } from "../../src/components/layout"
const Box = ({ n }: { n: number }) => <div className="rounded-md border bg-muted px-3 py-2 text-sm">Box {n}</div>
const boxes = (count: number) => Array.from({ length: count }, (_, i) => <Box key={i} n={i + 1} />)

const meta = {
  title: "Layout/Grid",
  component: Grid,
  tags: ["autodocs"],
  args: { children: null },
} satisfies Meta<typeof Grid>
export default meta
type Story = StoryObj<typeof meta>

export const Columns2: Story = { args: { columns: 2 }, render: (args) => <Grid {...args}>{boxes(6)}</Grid> }
export const Columns3: Story = { args: { columns: 3 }, render: (args) => <Grid {...args}>{boxes(6)}</Grid> }
export const Columns4: Story = { args: { columns: 4 }, render: (args) => <Grid {...args}>{boxes(8)}</Grid> }
export const Tiles: Story = { args: { columns: "tiles" }, render: (args) => <Grid {...args}>{boxes(10)}</Grid> }
export const Cards: Story = { args: { columns: "cards" }, render: (args) => <Grid {...args}>{boxes(6)}</Grid> }
export const Sections: Story = { args: { columns: "sections" }, render: (args) => <Grid {...args}>{boxes(3)}</Grid> }
export const Charts: Story = { args: { columns: "charts" }, render: (args) => <Grid {...args}>{boxes(3)}</Grid> }
