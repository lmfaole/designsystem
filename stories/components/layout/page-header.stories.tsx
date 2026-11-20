import type { Meta, StoryObj } from "@storybook/react-vite"

import { PageHeader } from "../../../src/components/page-header"
import { Button } from "../../../src/components/ui/button"

const meta = {
  title: "Components/Layout/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  args: { title: "Musikk" },
  parameters: { docs: { description: { component: `### Use it when

every page: its title as the one \`h1\` and one line of lead-in, with room for the page's controls.

### Do not use it when

a section title (\`PageSection\`).

### Accessibility

**Handled by the component**

- The title is the page's \`h1\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- The lead is a paragraph after the title, and the actions follow the title in the DOM ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence)).
- Title and actions wrap under each other on a narrow screen ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).

**You check**

- One \`PageHeader\` per page, so one \`h1\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- The title says what the page is and matches the document's \`title\` ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels), [2.4.2 Page Titled](https://www.w3.org/WAI/WCAG22/Understanding/page-titled)).
- Every control in \`actions\` has a name ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)).

### Content

A title that names the page; the lead says what is on it, in one line.

### Related

\`PageSection\`, \`Breadcrumbs\`, \`PageLayout\`` } }, },
} satisfies Meta<typeof PageHeader>
export default meta
type Story = StoryObj<typeof meta>

/** The title alone: the page's one `h1`. */
export const Default: Story = { args: { title: "Musikk" } }
/** A one-line lead under the title. */
export const WithLead: Story = { args: { title: "Musikk", lead: "Det jeg har hørt på den siste tiden." } }
/** A control beside the title, which wraps under it on a narrow screen. */
export const WithActions: Story = { args: { title: "Musikk", lead: "Med knapper ved siden av.", actions: <Button variant="outline" size="sm">Innstillinger</Button> } }
