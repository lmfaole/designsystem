import type { Meta, StoryObj } from "@storybook/react-vite"

import { PageHeader } from "../../src/components/page-header"
import { SubPages } from "../../src/components/sub-pages"

const meta = {
  title: "Navigation/SubPages",
  component: SubPages,
  tags: ["autodocs"],
  args: {
    label: "Sider i AdGuard",
    pages: [
      { href: "#enheter", label: "Enheter", icon: "settings", description: "Hver enhet som bruker AdGuard, og hvor mye den spør." },
      { href: "#historikk", label: "Historikk", icon: "calendar", description: "Hva som ble blokkert, en dag om gangen." },
      { href: "#drift", label: "Drift", icon: "info", description: "Om tjenesten kjører, og hvor fersk dataen er." },
    ],
  },
  parameters: { docs: { description: { component: `### Use it when

a page has subpages: a list in one column under the title (icon, name, one line).

### Do not use it when

top-level places (\`NavBar\`), or as cards or buttons.

### Accessibility

A \`nav\` with a list of real links.

### Content

One line says what is on the page, not what it is called.

### Related

\`NavBar\`, \`Breadcrumbs\`, \`SummaryBar\`` } }, },
} satisfies Meta<typeof SubPages>
export default meta
type Story = StoryObj<typeof meta>

/** The pages under this page, in one column: an icon, the name, and one line of what is on it. Not cards, not buttons. */
export const Default: Story = {}

export const UnderATitle: Story = {
  render: (args) => (
    <>
      <PageHeader title="AdGuard" lead="Hva som blokkeres i nettet hjemme." />
      <SubPages {...args} />
    </>
  ),
}
