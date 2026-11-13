import type { Meta, StoryObj } from "@storybook/react-vite"

import { SrTableHead } from "../../src/components/sr-table-head"

const meta = {
  title: "Tables/SrTableHead",
  component: SrTableHead,
  tags: ["autodocs"],
  args: { columns: ["Navn", "Antall"] },
} satisfies Meta<typeof SrTableHead>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { decorators: [(Story) => <table><Story /></table>] }
