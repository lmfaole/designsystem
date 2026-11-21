import type { Meta, StoryObj } from "@storybook/react-vite"

import { PageColumn } from "../../../src/components/layout"
import { PageHeader } from "../../../src/components/page-header"
import { SubPages } from "../../../src/components/sub-pages"
import { Button } from "../../../src/components/ui/button"

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

a page is nothing but its subpages (a settings overview, «Innstillinger»): the list straight under the title, each row with its \`value\`. Or several subpages that belong together in one list.

### Do not use it when

one subpage continues a section (the history under «Siste avspillinger»): that is the section's own foot, \`PageSection\` with \`continues\`, which makes the section a card with one link to the subpage at its foot. Not for top-level places (\`NavBar\`), as cards or buttons, or to gather all of a page's subpages at the top, away from what they continue.

### Accessibility

**Handled by the component**

- A \`nav\` named by \`label\`, with the pages as a list of real links ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- Each row is one link; its name is the page's name and the line of what is on it ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).
- The icons are hidden from assistive technology ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)).
- Each row is at least 48 px high ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)).
- Nothing is drawn for an empty list.

**You check**

- \`label\` says whose pages these are ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels)).
- \`value\` (on a settings overview) says what is chosen there now, in words ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).
- \`description\` says what is on the page, so the link can be chosen from its text ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).
- The same pages in the same order every time the page is shown ([3.2.3 Consistent Navigation](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation)).

### Content

One line says what is on the page, not what it is called. On a settings overview, \`value\` is what is chosen now in a few words («Mørkt · effekter av»), and the description may be left out.

### Related

\`PageSection\` (\`continues\`), \`NavBar\`, \`Breadcrumbs\`, \`SummaryBar\`` } }, },
} satisfies Meta<typeof SubPages>
export default meta
type Story = StoryObj<typeof meta>

/** The pages under this page, in one column: an icon, the name, and one line of what is on it. Not cards, not buttons. */
export const Default: Story = {}

/**
 * The settings overview («Innstillinger»): one subpage per kind of setting, each with what is chosen there now (`value`), and «Vis introen igjen» at the foot. Each subpage has
 * its own small form (see SettingsSection, «Settings subpage»).
 */
export const SettingsOverview: Story = {
  args: {
    label: "Innstillinger",
    pages: [
      { href: "#konto", label: "Konto", icon: "person", value: "lmfaole" },
      { href: "#repoer", label: "Repoer", icon: "repository", value: "withastro/astro og vercel/next.js" },
      { href: "#forside", label: "Forsiden", icon: "home", value: "Været, Avganger, GitHub · 2 skjult" },
      { href: "#tid", label: "Tid på døgnet", icon: "time", value: "Automatisk · 4 deler av døgnet" },
      { href: "#posisjon", label: "Posisjon", icon: "place", value: "Tillatt" },
      { href: "#utseende", label: "Utseende", icon: "settings", value: "Mørkt · effekter av" },
      { href: "#app", label: "Appen", icon: "device", value: "Ikke installert" },
    ],
  },
  render: (args) => (
    <PageColumn>
      <PageHeader title="Innstillinger" lead="Det du har valgt, i denne nettleseren." />
      <SubPages {...args} />
      <form method="post" action="#">
        <Button type="submit" name="rerun" value="1" variant="outline">
          Vis introen igjen
        </Button>
      </form>
    </PageColumn>
  ),
}
