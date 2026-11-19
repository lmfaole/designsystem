import type { Meta, StoryObj } from "@storybook/react-vite"

import { PageHeader } from "../../src/components/page-header"
import { Button } from "../../src/components/ui/button"

const meta = {
  title: "Layout/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  args: { title: "Musikk" },
  parameters: { docs: { description: { component: `**Use it when** every page: its title as the one \`h1\` and one line of lead-in, with room for the page's controls.

**Do not use it when** a section title (\`PageSection\`).

**Accessibility.** The one \`h1\` of the page; the lead is a paragraph under it.

**Content.** A title that names the page; the lead says what is on it, in one line.

**Related.** \`PageSection\`, \`Breadcrumbs\`, \`PageLayout\`` } }, },
} satisfies Meta<typeof PageHeader>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { title: "Musikk" } }
export const WithLead: Story = { args: { title: "Musikk", lead: "Det jeg har hørt på den siste tiden." } }
export const WithActions: Story = { args: { title: "Musikk", lead: "Med knapper ved siden av.", actions: <Button variant="outline" size="sm">Innstillinger</Button> } }
