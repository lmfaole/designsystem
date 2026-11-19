import type { Meta, StoryObj } from "@storybook/react-vite"

import { Progress } from "../../src/components/progress"

const meta = {
  title: "Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
  args: { label: "Disk", value: 93, valueText: "93 % full" },
  parameters: { docs: { description: { component: `**Use it when** one value is shown against a goal or a limit: a listening goal, a disk, a backlog read.

**Do not use it when** something is waiting (use \`Skeleton\` or text), or when it is several parts of a whole (\`DonutChart\`, \`SummaryBar\`).

**Accessibility.** Read as a meter (\`role="meter"\` with its range and a value in words). The label and the value are always visible, so the bar never stands alone and no colour is used.

**Content.** The label is a noun («Disk»); the value says it in words («93 % full», «12 av 40»).

**Related.** \`SummaryBar\`, \`DonutChart\`, \`Skeleton\`` } } },
} satisfies Meta<typeof Progress>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Counted: Story = { args: { label: "Lest", value: 12, max: 40, valueText: "12 av 40" } }
export const Empty: Story = { args: { value: 0, valueText: undefined, label: "Mål" } }
export const WithTarget: Story = { args: { label: "Lest", value: 12, max: 40, valueText: "12 av 40", target: 30 } }
export const PastTheTarget: Story = { args: { label: "Lyttemål", value: 36, max: 40, valueText: "36 av 40", target: 30 } }
