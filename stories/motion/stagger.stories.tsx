import type { Meta, StoryObj } from "@storybook/react-vite"

import { Stagger } from "../../src/components/reveal"

const meta = {
  title: "Motion/Stagger",
  component: Stagger,
  tags: ["autodocs"],
  args: { children: null },
} satisfies Meta<typeof Stagger>
export default meta
type Story = StoryObj<typeof meta>

export const List: Story = { args: { as: "ul", children: [1, 2, 3, 4].map((n) => <li key={n}>Item {n}</li>) } }
