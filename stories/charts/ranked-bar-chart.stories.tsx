import type { Meta, StoryObj } from "@storybook/react-vite"

import { RankedBarChart } from "../../src/components/ranked-bar-chart"

const meta = {
  title: "Charts/RankedBarChart",
  component: RankedBarChart,
  tags: ["autodocs"],
  args: { data: [{ label: "Alfa", value: 42 }, { label: "Beta", value: 31 }, { label: "Gamma", value: 18 }, { label: "Delta", value: 7 }], ariaLabel: "Mest spilt", valueLabel: "Avspillinger" },
  parameters: { docs: { description: { component: `**Use it when** things are ranked by one number, longest first (most played, biggest cost).

**Do not use it when** the order is not the point (\`ColumnChart\`), or there are more than ten bars.

**Accessibility.** A \`ChartTable\` has every value in the same order; the bars carry their names.

**Content.** Names are the strongest part; show at most ten and say where the rest is.

**Related.** \`ColumnChart\`, \`ChartCard\`, \`Rows\`` } }, },
} satisfies Meta<typeof RankedBarChart>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
