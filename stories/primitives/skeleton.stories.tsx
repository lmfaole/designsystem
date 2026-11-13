import type { Meta, StoryObj } from "@storybook/react-vite"

import { Skeleton } from "../../src/components/ui/skeleton"

const meta = {
  title: "Primitives/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>
export default meta
type Story = StoryObj<typeof meta>

export const Line: Story = { args: { className: "h-4 w-48" } }
export const Avatar: Story = { args: { className: "size-12 rounded-full" } }
