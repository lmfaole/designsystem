import type { Meta, StoryObj } from "@storybook/react-vite"

import { NotFoundPage } from "../../src/components/not-found-page"

const meta = {
  title: "Feedback/NotFoundPage",
  component: NotFoundPage,
  tags: ["autodocs"],
} satisfies Meta<typeof NotFoundPage>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
