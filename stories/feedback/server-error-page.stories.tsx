import type { Meta, StoryObj } from "@storybook/react-vite"

import { ServerErrorPage } from "../../src/components/server-error-page"

const meta = {
  title: "Feedback/ServerErrorPage",
  component: ServerErrorPage,
  tags: ["autodocs"],
} satisfies Meta<typeof ServerErrorPage>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
