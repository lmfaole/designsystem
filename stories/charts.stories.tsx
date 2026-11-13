import type { Meta, StoryObj } from "@storybook/react-vite"

import { AreaChart } from "../src/components/area-chart"
import { ChartCard } from "../src/components/chart-card"
import { ColumnChart } from "../src/components/column-chart"
import { DonutChart } from "../src/components/donut-chart"
import { RankedBarChart } from "../src/components/ranked-bar-chart"
import { StackedColumnChart } from "../src/components/stacked-column-chart"
import { MONTHS } from "./sample"

const meta = { title: "Charts/Charts" } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Column: Story = { name: "ColumnChart", render: () => <ColumnChart data={MONTHS} ariaLabel="Avspillinger per måned" valueLabel="Avspillinger" height={240} /> }

export const Area: Story = { name: "AreaChart", render: () => <AreaChart data={MONTHS} ariaLabel="Utvikling over tid" valueLabel="Avspillinger" height={240} /> }

export const Ranked: Story = {
  name: "RankedBarChart",
  render: () => <RankedBarChart data={[{ label: "Alfa", value: 42 }, { label: "Beta", value: 31 }, { label: "Gamma", value: 18 }, { label: "Delta", value: 7 }]} ariaLabel="Mest spilt" valueLabel="Avspillinger" />,
}

export const Stacked: Story = {
  name: "StackedColumnChart",
  render: () => (
    <StackedColumnChart
      ariaLabel="Per måned og sjanger"
      height={260}
      series={["Rock", "Jazz", "Pop"]}
      data={MONTHS.slice(0, 6).flatMap((m, i) => [
        { label: m.label, series: "Rock", value: m.value },
        { label: m.label, series: "Jazz", value: (i * 5) % 11 },
        { label: m.label, series: "Pop", value: 8 + i },
      ])}
    />
  ),
}

export const Donut: Story = {
  name: "DonutChart",
  render: () => <DonutChart ariaLabel="Andel per sjanger" formatValue={(value) => `${value} avspillinger`} data={[{ label: "Rock", value: 120 }, { label: "Jazz", value: 80 }, { label: "Pop", value: 60 }, { label: "Folk", value: 30 }, { label: "Klassisk", value: 20 }, { label: "Annet", value: 12 }, { label: "Mer", value: 5 }]} />,
}

export const InCard: Story = {
  name: "ChartCard",
  render: () => (
    <div className="grid max-w-xl gap-4">
      <ChartCard title="Per måned" description="Antall avspillinger"><ColumnChart data={MONTHS} ariaLabel="Per måned" valueLabel="Avspillinger" height={200} /></ChartCard>
      <ChartCard title="Ingen data" empty emptyMessage="Ingenting å vise ennå."><span /></ChartCard>
    </div>
  ),
}
