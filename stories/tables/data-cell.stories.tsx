import type { Meta, StoryObj } from "@storybook/react-vite"

import { DataCell } from "../../src/components/data-cell"
import { Table, TableBody, TableRow } from "../../src/components/ui/table"

const meta = {
  title: "Tables/DataCell",
  component: DataCell,
  tags: ["autodocs"],
  args: { children: "Alfa" },
  decorators: [(Story) => <Table><TableBody><TableRow><Story /></TableRow></TableBody></Table>],
} satisfies Meta<typeof DataCell>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Muted: Story = { args: { tone: "muted" } }
export const Medium: Story = { args: { weight: "medium" } }
export const Numeric: Story = { args: { numeric: true, children: "1 234" } }
