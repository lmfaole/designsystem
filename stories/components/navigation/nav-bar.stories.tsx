import type { Meta, StoryObj } from "@storybook/react-vite"

import { NavBar } from "../../../src/components/nav-bar"
import { PageHeader } from "../../../src/components/page-header"
import { PageLayout } from "../../../src/components/page-layout"
import { Text } from "../../../src/components/text"

const items = [
  { key: "front", label: "Forside", href: "#", icon: "home", current: true },
  { key: "pulls", label: "Pull requests", href: "#", icon: "pull-request", current: false },
  { key: "issues", label: "Issues", href: "#", icon: "issue", current: false },
  { key: "discussions", label: "Samtaler", href: "#", icon: "discussion", current: false },
  { key: "weather", label: "Vær", href: "#", icon: "weather", current: false },
] as const

const meta = {
  title: "Components/Navigation/NavBar",
  component: NavBar,
  tags: ["autodocs"],
  args: { label: "Hovedmeny", title: "Startside", items },
  parameters: { docs: { description: { component: `### Use it when

the way between an app's top-level places: a bar at the foot on a phone, a rail from tablet width. Three to five places.

### Do not use it when

going into a page's subpages (\`SubPages\`), narrowing a list (\`FilterChips\`) or switching views (\`SegmentedToggle\`). It is navigation, not tabs.

### Accessibility

**Handled by the component**

- A \`nav\` named by \`label\`, with the places as a list of real links ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- The current place is \`aria-current="page"\`, and also medium weight on a filled pill or row, not only another colour ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), [1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color)).
- The icons are hidden from assistive technology; the label under each is the link's name ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)).
- Each place is at least 56 px high on a phone and 40 px on the rail ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)).

**You check**

- The same places in the same order on every page ([3.2.3 Consistent Navigation](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation)).
- Each label is the same word as the title of the page it opens ([3.2.4 Consistent Identification](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification)).
- \`label\` names the menu («Hovedmeny») ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels)).
- It is given to \`PageLayout\` as \`nav\`, so the page leaves room and nothing focused hides under the bar ([2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum)).
- Through \`PageLayout\` the skip link jumps past it ([2.4.1 Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks)).

### Content

One word each, the same order on every page.

### Related

\`Breadcrumbs\`, \`SubPages\`, \`PageLayout\`` } }, layout: "fullscreen" },
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
