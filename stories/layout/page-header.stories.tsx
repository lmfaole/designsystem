import type { Meta, StoryObj } from "@storybook/react-vite"

import { PageHeader } from "../../src/components/page-header"
import { Button } from "../../src/components/ui/button"

const meta = {
  title: "Layout/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  args: { title: "Musikk" },
} satisfies Meta<typeof PageHeader>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { title: "Musikk" } }
export const WithLead: Story = { args: { title: "Musikk", lead: "Det jeg har hørt på den siste tiden." } }
export const WithActions: Story = { args: { title: "Musikk", lead: "Med knapper ved siden av.", actions: <Button variant="outline" size="sm">Innstillinger</Button> } }
