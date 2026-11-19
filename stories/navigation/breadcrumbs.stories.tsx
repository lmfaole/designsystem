import type { Meta, StoryObj } from "@storybook/react-vite"

import { Breadcrumbs } from "../../src/components/breadcrumbs"
import { PageHeader } from "../../src/components/page-header"

const meta = {
  title: "Navigation/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
  args: { items: [{ label: "Hjem", href: "#" }, { label: "AdGuard", href: "#adguard" }, { label: "Enheter", href: "#enheter" }] },
  parameters: { docs: { description: { component: `### Use it when

every page that has a parent: the trail from the group to the page.

### Do not use it when

a top-level page (it has nothing above it) or between sibling pages (\`NavBar\`).

### Accessibility

**Handled by the component**

- A \`nav\` named «Brødsmuler», with the trail as an ordered list ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- The last item is the page itself, \`aria-current="page"\` and not a link ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- The chevrons between items are hidden from assistive technology ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)).
- On a phone only the parent is shown, as a link named after where it goes ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context), [1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).
- The way back on a phone is 40 px high, the links of the trail at least 24 px ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)).
- Nothing is drawn for fewer than two items.

**You check**

- Each label is the title of the page it links to, the same words on every page ([3.2.4 Consistent Identification](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification)).
- The breadcrumbs stand in the same place on every page that has a parent ([3.2.3 Consistent Navigation](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation)).
- The last label matches the page's \`h1\` ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels)).

### Content

Labels are the pages' names; the title says what, the crumbs say where.

### Related

\`NavBar\`, \`SubPages\`, \`PageHeader\`` } }, },
} satisfies Meta<typeof Breadcrumbs>
export default meta
type Story = StoryObj<typeof meta>

/** The whole trail from tablet width, the parent alone as a way back on a phone (narrow the window). The last item is the page itself. */
export const Default: Story = {}

/** Above the page's title, as on a real page: the breadcrumbs say where, the title says what. */
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
