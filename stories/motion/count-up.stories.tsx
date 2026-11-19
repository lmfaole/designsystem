import type { Meta, StoryObj } from "@storybook/react-vite"

import { CountUp } from "../../src/components/count-up"

const meta = {
  title: "Motion/CountUp",
  component: CountUp,
  tags: ["autodocs"],
  args: { value: 12345 },
  parameters: { docs: { description: { component: `**Use it when** a whole number counts up when it first shows (a total on a front page).

**Do not use it when** a number that changes on refetch, a sort or a filter (it would count every time).

**Accessibility.** The real formatted number is in the HTML and is all that is shown with less motion.

**Related.** \`Reveal\`, guide «Motion»` } }, },
} satisfies Meta<typeof CountUp>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Formatted: Story = { args: { format: (v: number) => v.toLocaleString("nb-NO") + " avspillinger" } }
