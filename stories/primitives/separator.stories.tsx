import type { Meta, StoryObj } from "@storybook/react-vite"

import { Separator } from "../../src/components/ui/separator"

const meta = {
  title: "Primitives/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: `### Use it when

a break between two unrelated parts where space does not do it.

### Do not use it when

grouping (space groups; do not draw lines or boxes).

### Accessibility

A thematic break that is hidden from assistive technology when it is decoration.

### Related

\`Stack\`, \`PageSection\`` } }, },
} satisfies Meta<typeof Separator>
export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = { decorators: [(Story) => <div className="grid max-w-sm gap-3"><span>Above</span><Story /><span>Below</span></div>] }
export const Vertical: Story = { args: { orientation: "vertical" }, decorators: [(Story) => <div className="flex h-5 items-center gap-3"><span>Left</span><Story /><span>Right</span></div>] }
