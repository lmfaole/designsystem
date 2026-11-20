import type { Meta, StoryObj } from "@storybook/react-vite"

import { PageHeader } from "../../../src/components/page-header"
import { SubPages } from "../../../src/components/sub-pages"

const meta = {
  title: "Components/Navigation/SubPages",
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

**Handled by the component**

- A \`nav\` named by \`label\`, with the pages as a list of real links ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- Each row is one link; its name is the page's name and the line of what is on it ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).
- The icons are hidden from assistive technology ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)).
- Each row is at least 48 px high ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)).
- Nothing is drawn for an empty list.

**You check**

- \`label\` says whose pages these are ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels)).
- \`description\` says what is on the page, so the link can be chosen from its text ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).
- The same pages in the same order every time the page is shown ([3.2.3 Consistent Navigation](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation)).

### Content

One line says what is on the page, not what it is called.

### Related

\`NavBar\`, \`Breadcrumbs\`, \`SummaryBar\`` } }, },
} satisfies Meta<typeof SubPages>
export default meta
type Story = StoryObj<typeof meta>

/** The pages under this page, in one column: an icon, the name, and one line of what is on it. Not cards, not buttons. */
export const Default: Story = {}

/** Straight under the page's title, where the list goes on a real page. */
export const UnderATitle: Story = {
  render: (args) => (
    <>
      <PageHeader title="AdGuard" lead="Hva som blokkeres i nettet hjemme." />
      <SubPages {...args} />
    </>
  ),
}
