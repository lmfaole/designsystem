import type { Meta, StoryObj } from "@storybook/react-vite"

import { ErrorMessage } from "../../src/components/error-message"

const meta = {
  title: "Feedback/ErrorMessage",
  component: ErrorMessage,
  tags: ["autodocs"],
  args: { error: new Error("timeout") },
} satisfies Meta<typeof ErrorMessage>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const CustomLead: Story = { args: { children: "Fikk ikke hentet listen" } }
