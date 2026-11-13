import type { Meta, StoryObj } from "@storybook/react-vite"

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../src/components/ui/table"

const meta = {
  title: "Primitives/Table",
  component: Table,
  tags: ["autodocs"],
  subcomponents: { TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption },
} satisfies Meta<typeof Table>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A table</TableCaption>
      <TableHeader><TableRow><TableHead>Navn</TableHead><TableHead className="text-right">Antall</TableHead></TableRow></TableHeader>
      <TableBody>
        <TableRow><TableCell>Alfa</TableCell><TableCell className="text-right">12</TableCell></TableRow>
        <TableRow><TableCell>Beta</TableCell><TableCell className="text-right">7</TableCell></TableRow>
      </TableBody>
      <TableFooter><TableRow><TableCell>Sum</TableCell><TableCell className="text-right">19</TableCell></TableRow></TableFooter>
    </Table>
  ),
}
