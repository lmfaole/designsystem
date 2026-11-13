import type { Meta, StoryObj } from "@storybook/react-vite"

import { ChartCard } from "../../src/components/chart-card"
import { ColumnChart } from "../../src/components/column-chart"
import { MONTHS } from "../sample"

const meta = {
  title: "Charts/ChartCard",
  component: ChartCard,
  tags: ["autodocs"],
  args: { title: "Per måned", description: "Antall avspillinger", children: <ColumnChart data={MONTHS} ariaLabel="Per måned" valueLabel="Avspillinger" height={200} /> },
} satisfies Meta<typeof ChartCard>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Empty: Story = { args: { empty: true, emptyMessage: "Ingenting å vise ennå." } }
