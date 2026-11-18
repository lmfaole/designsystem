import type { Meta, StoryObj } from "@storybook/react-vite"

import { Breadcrumbs } from "../../src/components/breadcrumbs"
import { PageHeader } from "../../src/components/page-header"

const meta = {
  title: "Navigation/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
  args: { items: [{ label: "Hjem", href: "#" }, { label: "AdGuard", href: "#adguard" }, { label: "Enheter", href: "#enheter" }] },
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
