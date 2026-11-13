import type { Meta, StoryObj } from "@storybook/react-vite"

import { Separator } from "../../src/components/ui/separator"

const meta = {
  title: "Primitives/Separator",
  component: Separator,
  tags: ["autodocs"],
} satisfies Meta<typeof Separator>
export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = { decorators: [(Story) => <div className="grid max-w-sm gap-3"><span>Above</span><Story /><span>Below</span></div>] }
export const Vertical: Story = { args: { orientation: "vertical" }, decorators: [(Story) => <div className="flex h-5 items-center gap-3"><span>Left</span><Story /><span>Right</span></div>] }
