import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, waitFor } from "storybook/test"

import { NavBar } from "../../../src/components/nav-bar"
import { NewBadge } from "../../../src/components/new-badge"
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

the way between an app's top-level places: a bar at the foot on a phone, a rail from tablet width. Three to five places is best; with more (an app's «Innstillinger» is the last, with the \`settings\` icon) the bar scrolls sideways on a phone, and the rail shows them all.

### Do not use it when

going into a page's subpages (\`SubPages\`), narrowing a list (\`FilterChips\`) or switching views (\`SegmentedToggle\`). It is navigation, not tabs.

### Accessibility

**Handled by the component**

- A \`nav\` named by \`label\`, with the places as a list of real links ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- The current place is \`aria-current="page"\`, and also medium weight on a filled pill or row, not only another colour ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), [1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color)).
- The icons are hidden from assistive technology; the label under each is the link's name ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)).
- With more places than fit on a phone, the bar scrolls sideways (each at least 72 px wide, snapping into place), the place cut at the edge and a fade show there is more, and the current place is scrolled into view when the page opens; nothing wraps or shrinks below its target size ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).
- Each place is at least 56 px high on a phone and 40 px on the rail ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)).

**You check**

- The same places in the same order on every page ([3.2.3 Consistent Navigation](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation)).
- Each label is the same word as the title of the page it opens ([3.2.4 Consistent Identification](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification)).
- \`label\` names the menu («Hovedmeny») ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels)).
- It is given to \`PageLayout\` as \`nav\`, so the page leaves room and nothing focused hides under the bar ([2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum)).
- Through \`PageLayout\` the skip link jumps past it ([2.4.1 Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks)).

### Content

One word each, the same order on every page. «Innstillinger» is the last place in every app.

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

/** A place that is new carries a `NewBadge` as its `badge`: over the icon on a phone, after the label on the rail. */
export const WithNewBadge: Story = {
  args: { items: items.map((item) => (item.key === "weather" ? { ...item, badge: <NewBadge until="2027-01-01T00:00:00Z" now="2026-11-20T12:00:00Z" /> } : item)) },
  render: (args) => (
    <PageLayout nav={<NavBar {...args} />}>
      <PageHeader title="Forside" lead="onsdag 18. november" />
      <Text>«Vær» is new until the new year.</Text>
    </PageLayout>
  ),
}

const seven = [
  { key: "front", label: "Forside", href: "#", icon: "home", current: false },
  { key: "pulls", label: "Pull requests", href: "#", icon: "pull-request", current: false },
  { key: "issues", label: "Issues", href: "#", icon: "issue", current: false },
  { key: "discussions", label: "Samtaler", href: "#", icon: "discussion", current: false },
  { key: "weather", label: "Vær", href: "#", icon: "weather", current: false },
  { key: "transport", label: "Avganger", href: "#", icon: "bus", current: false },
  { key: "settings", label: "Innstillinger", href: "#", icon: "settings", current: true },
] as const

const page = (args: Parameters<typeof NavBar>[0]) => (
  <PageLayout nav={<NavBar {...args} />}>
    <PageHeader title="Innstillinger" lead="Sju steder i menyen" />
    <Text>On a phone the bar scrolls sideways and opens with the current place, «Innstillinger», in view; the rail shows every place.</Text>
  </PageLayout>
)

/** Seven places on a phone: the bar scrolls sideways, snapping to each place, and opens with the current one (the last) in view; the edge that has more is faded. */
export const ManyOnAPhone: Story = {
  args: { items: seven },
  globals: { viewport: { value: "compact", isRotated: false } },
  render: page,
  play: async ({ canvasElement }) => {
    const list = canvasElement.querySelector("nav ul")
    const current = canvasElement.querySelector("nav [aria-current=page]")
    if (!(list instanceof HTMLElement) || !(current instanceof HTMLElement)) throw new Error("No bar")
    // Only where the bar is narrower than its places: the test's browser may be wider than a phone.
    if (list.scrollWidth <= list.clientWidth) return
    await waitFor(() => {
      const box = list.getBoundingClientRect()
      const place = current.getBoundingClientRect()
      expect(place.left).toBeGreaterThanOrEqual(box.left - 1)
      expect(place.right).toBeLessThanOrEqual(box.right + 1)
    })
    await waitFor(() => expect(list.hasAttribute("data-more-start")).toBe(true))
    await expect(list.hasAttribute("data-more-end")).toBe(false)
  },
}

/** The same seven places on a desktop: the rail shows them all, «Innstillinger» last. */
export const ManyOnADesktop: Story = {
  args: { items: seven },
  globals: { viewport: { value: "expanded", isRotated: false } },
  render: page,
}
