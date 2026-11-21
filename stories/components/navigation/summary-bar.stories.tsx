import type { Meta, StoryObj } from "@storybook/react-vite"

import { SummaryBar } from "../../../src/components/summary-bar"

const meta = {
  title: "Components/Navigation/SummaryBar",
  component: SummaryBar,
  tags: ["autodocs"],
  args: {
    label: "Oversikt",
    items: [
      { key: "blocked", label: "blokkert", count: 2, href: "#", icon: "warning", tone: "destructive" },
      { key: "ready", label: "klar til merge", count: 1, href: "#", icon: "merge" },
      { key: "review", label: "venter på din review", count: 14, href: "#", icon: "view" },
      { key: "issues", label: "issues", count: 9, href: "#", icon: "issue" },
    ],
  },
  parameters: { docs: { description: { component: `### Use it when

the state of one kind of thing in counts that each link to what they count: under the title of the section it counts (the pull requests' counts in «Pull requests»).

### Do not use it when

a count that links nowhere, figures to compare (\`FactList\`), or all of a page's counts gathered at the top, away from what they count.

### Accessibility

**Handled by the component**

- A \`nav\` named by \`label\`, with the counts as a list of real links ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- Each link's name is the count and its words («2 blokkert»); the icon is hidden ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context), [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)).
- \`destructive\` is also medium weight with a red border, not red text alone ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color)).
- Each link is at least 36 px high ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)).
- The counts wrap onto more lines instead of scrolling sideways ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).

**You check**

- \`label\` names the place the counts are of ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels)).
- Each label is plural and says what is counted, so «14 venter på din review» reads right alone ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).
- A count that changes while the page is open is not announced ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages)).

### Content

Plural labels («blokkert»). Leave out the zeros.

### Related

\`SubPages\`, \`PageSection\`, \`StatusLine\`` } }, },
} satisfies Meta<typeof SummaryBar>
export default meta
type Story = StoryObj<typeof meta>

/** The state of a place as counts that are links: first on a front page, before any list. */
export const Default: Story = {}
