import type { Meta, StoryObj } from "@storybook/react-vite"

import { LineBadge } from "../../../src/components/line-badge"

const meta = {
  title: "Components/Status/LineBadge",
  component: LineBadge,
  tags: ["autodocs"],
  args: { line: "31", mode: "bus" },
  parameters: { docs: { description: { component: `### Use it when

a public transport line is named: in a \`DepartureBoard\`, beside a trip, in a notice about a line. The symbol and colour of its kind and its code, as Ruter paints them.

### Do not use it when

it is a status or a kind of something else (\`Badge\`), or the kind of transport alone with no line (an \`Icon\`: \`bus\`, \`tram\`, \`metro\`, \`rail\`, \`ferry\`).

### Accessibility

**Handled by the component**

- A screen reader hears the kind and the code in words: «Buss 31», «T-bane 5», «Tog L2» ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The kind has a symbol of its own, so it is not told by colour alone ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- The code keeps 4.5:1 on each kind's colour in light and dark (tokens \`--transit-*\`, a test) ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum))

**You check**

- The mode is the line's own, as Entur gives it (\`water\` is \`ferry\`, \`coach\` and the rest \`other\`)
- It is not a link or a button

### Content

The line's public code as Entur writes it («31», «L2», «R10», «B1»); no prefix such as «Linje».

### Related

\`DepartureBoard\`, \`Badge\`, \`Icon\`` } } },
} satisfies Meta<typeof LineBadge>
export default meta
type Story = StoryObj<typeof meta>

/** A bus line. */
export const Default: Story = {}

/** Every kind, each with its symbol and colour. */
export const Modes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <LineBadge line="31" mode="bus" />
      <LineBadge line="17" mode="tram" />
      <LineBadge line="5" mode="metro" />
      <LineBadge line="L2" mode="rail" />
      <LineBadge line="B1" mode="ferry" />
      <LineBadge line="" mode="other" />
    </div>
  ),
}

/** The small size, for a line in running text or a dense list. */
export const Small: Story = { args: { line: "R10", mode: "rail", size: "sm" } }
