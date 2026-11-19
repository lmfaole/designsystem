import type { Meta, StoryObj } from "@storybook/react-vite"

import { NumberCell, NumberHead } from "../../src/components/number-cell"
import { Table, TableBody, TableHeader, TableRow } from "../../src/components/ui/table"

const meta = {
  title: "Tables/NumberCell",
  component: NumberCell,
  tags: ["autodocs"],
  subcomponents: { NumberHead },
  args: { children: "1 234" },
  decorators: [(Story) => <Table><TableHeader><TableRow><NumberHead>Antall</NumberHead></TableRow></TableHeader><TableBody><TableRow><Story /></TableRow></TableBody></Table>],
  parameters: { docs: { description: { component: `**Use it when** a column of figures that line up: digits of one width, to the right.

**Do not use it when** text (\`DataCell\`).

**Accessibility.** A real cell; the header is right-aligned with the figures.

**Content.** Figures formatted in nb-NO; a minus is −.

**Related.** \`Table\`, \`DataCell\`` } }, },
} satisfies Meta<typeof NumberCell>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
