import type { Meta, StoryObj } from "@storybook/react-vite"

import { Breadcrumbs } from "../../src/components/breadcrumbs"
import { PageHeader } from "../../src/components/page-header"

const meta = {
  title: "Navigation/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
  args: { items: [{ label: "Hjem", href: "#" }, { label: "AdGuard", href: "#adguard" }, { label: "Enheter", href: "#enheter" }] },
  parameters: { docs: { description: { component: `**Use it when** every page that has a parent: the trail from the group to the page.

**Do not use it when** a top-level page (it has nothing above it) or between sibling pages (\`NavBar\`).

**Accessibility.** A \`nav\` with a list; the current page is \`aria-current="page"\`; on a phone the parent alone is shown as a way back.

**Content.** Labels are the pages' names; the title says what, the crumbs say where.

**Related.** \`NavBar\`, \`SubPages\`, \`PageHeader\`` } }, },
} satisfies Meta<typeof Breadcrumbs>
export default meta
type Story = StoryObj<typeof meta>

/** The whole trail from tablet width, the parent alone as a way back on a phone (narrow the window). The last item is the page itself. */
export const Default: Story = {}

export const WithTitle: Story = {
  render: (args) => (
    <>
      <Breadcrumbs {...args} />
      <PageHeader title="Enheter" lead="Hver enhet som bruker AdGuard." />
    </>
  ),
}

/** One level down: the group and the page. */
export const TwoLevels: Story = { args: { items: [{ label: "Medier", href: "#" }, { label: "Musikk", href: "#musikk" }] } }
