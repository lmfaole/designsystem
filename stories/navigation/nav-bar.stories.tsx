import type { Meta, StoryObj } from "@storybook/react-vite"

import { NavBar } from "../../src/components/nav-bar"
import { PageHeader } from "../../src/components/page-header"
import { PageLayout } from "../../src/components/page-layout"
import { Text } from "../../src/components/text"

const items = [
  { key: "front", label: "Forside", href: "#", icon: "home", current: true },
  { key: "pulls", label: "Pull requests", href: "#", icon: "pull-request", current: false },
  { key: "issues", label: "Issues", href: "#", icon: "issue", current: false },
  { key: "discussions", label: "Samtaler", href: "#", icon: "discussion", current: false },
  { key: "weather", label: "Vær", href: "#", icon: "weather", current: false },
] as const

const meta = {
  title: "Navigation/NavBar",
  component: NavBar,
  tags: ["autodocs"],
  args: { label: "Hovedmeny", title: "Startside", items },
  parameters: { docs: { description: { component: `**Use it when** the way between an app's top-level places: a bar at the foot on a phone, a rail from tablet width. Three to five places.

**Do not use it when** going into a page's subpages (\`SubPages\`), narrowing a list (\`FilterChips\`) or switching views (\`SegmentedToggle\`). It is navigation, not tabs.

**Accessibility.** A \`nav\` with real links; the current place is \`aria-current="page"\`; one-word labels under an icon.

**Content.** One word each, the same order on every page.

**Related.** \`Breadcrumbs\`, \`SubPages\`, \`PageLayout\`` } }, layout: "fullscreen" },
} satisfies Meta<typeof NavBar>
export default meta
type Story = StoryObj<typeof meta>

/**
 * Navigation between the top-level places of an app: a bar at the foot of the screen on a phone (narrow the window), a rail down the
 * left side from tablet width. It is navigation, not tabs: it goes to another page. Given to `PageLayout` as `nav`.
 */
export const Default: Story = {
  render: (args) => (
    <PageLayout nav={<NavBar {...args} />}>
      <PageHeader title="Forside" lead="onsdag 18. november" />
      <Text>The page leaves room for the bar at the foot, and for the rail at the left.</Text>
    </PageLayout>
  ),
}
