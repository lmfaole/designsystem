import type { Meta, StoryObj } from "@storybook/react-vite"

import { PageSection } from "../../src/components/page-section"
import { Text } from "../../src/components/text"

const meta = {
  title: "Layout/PageSection",
  component: PageSection,
  tags: ["autodocs"],
  args: { id: "s", title: "Siste", children: null },
  parameters: { docs: { description: { component: `### Use it when

a titled part of a page: an icon, the title and the content, with \`more\` for «Se alle 14».

### Do not use it when

the page's title (\`PageHeader\`) or a group of sections (\`SectionGroup\`).

### Accessibility

**Handled by the component**

- A \`section\` named by its title (\`aria-labelledby\`), so it is a region a screen reader can jump to ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- The title is an \`h2\`; its icon is hidden from assistive technology ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)).
- The «see all» link follows the title in the DOM and is at least 24 px high ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence), [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)).

**You check**

- \`id\` is unique on the page, or the section is named by the wrong heading ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- It is an \`h2\`: use it straight under the page's \`h1\`; parts of a part are a \`SectionGroup\` with \`SubSection\`s ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- \`title\` says what the section holds ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels)).
- \`more.label\` says what it opens in full («Se alle 14 pull requests») ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).

### Content

A noun that says what is in it («Krever deg», «Issues til deg»).

### Related

\`SectionGroup\`, \`Rows\`, \`SummaryBar\`` } }, },
} satisfies Meta<typeof PageSection>
export default meta
type Story = StoryObj<typeof meta>

/** A title and its content, with no icon and no «see all» link. */
export const Default: Story = { args: { id: "latest", title: "Siste", children: <Text>Content of the section.</Text> } }

/** An icon in front of the title says at a glance what the section is about. */
export const WithIcon: Story = { args: { id: "pulls", title: "Pull requests", icon: "pull-request", children: <Text>Content of the section.</Text> } }

/** A section that shows only the first of a list links to all of it, in the title row. */
export const WithMore: Story = { args: { id: "pulls", title: "Pull requests", icon: "pull-request", more: { href: "#", label: "Se alle 14" }, children: <Text>De tre som trenger deg mest.</Text> } }
