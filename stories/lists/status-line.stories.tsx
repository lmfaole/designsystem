import type { Meta, StoryObj } from "@storybook/react-vite"

import { StatusLine } from "../../src/components/status-line"

const meta = {
  title: "Lists/StatusLine",
  component: StatusLine,
  tags: ["autodocs"],
  args: { items: [{ text: "Tester OK", icon: "success" }, { text: "Godkjent", icon: "success" }, { text: "Stille i 3 dager", icon: "time", tone: "muted" }] },
} satisfies Meta<typeof StatusLine>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** What stops something is `destructive`: red, medium weight and a symbol, so it reads the same without colour. */
export const Blocked: Story = { args: { items: [{ text: "Tester feilet", icon: "failure", tone: "destructive" }, { text: "Konflikter", icon: "warning", tone: "destructive" }, { text: "2 åpne kommentarer", icon: "discussion", tone: "destructive" }] } }
export const Waiting: Story = { args: { items: [{ text: "Tester kjører", icon: "pending", tone: "muted" }, { text: "Venter på review", icon: "waiting", tone: "muted" }] } }
export const NoIcons: Story = { args: { items: [{ text: "Utkast" }, { text: "Ny i dag", tone: "muted" }] } }
