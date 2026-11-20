import type { Meta, StoryObj } from "@storybook/react-vite"

import { Heading } from "../../../src/components/text"

const meta = {
  title: "Components/Text/Heading",
  component: Heading,
  tags: ["autodocs"],
  args: { level: 2, children: "A heading" },
  parameters: { docs: { description: { component: `### Use it when

a heading: \`level\` is the element and the look is chosen apart, so the page's outline and its looks are decided separately.

### Do not use it when

bold text that is not a heading (\`Text\`).

### Accessibility

**Handled by the component**

- Renders a real \`h1\`–\`h4\` from \`level\`, so the outline is in the markup, not the look ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- The look is chosen apart from the level, so a small heading never needs a skipped level ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Text sizes are in \`rem\` and wrap, so they grow with the reader's text size ([1.4.4 Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text))

**You check**

- One \`h1\` per page and no skipped levels ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- The heading says what the section is about ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))
- Something that only looks like a heading uses \`Text\`, not \`Heading\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))

### Content

A title is a noun or a short phrase, in sentence case.

### Related

\`PageHeader\`, \`PageSection\`, \`Text\`` } }, },
} satisfies Meta<typeof Heading>
export default meta
type Story = StoryObj<typeof meta>

/** The page's title: `h1` with the largest look. */
export const Page: Story = { args: { level: 1, look: "page" } }
/** A section's heading: `h2` with the section look. */
export const Section: Story = { args: { level: 2, look: "section" } }
/** A small uppercase label above a group, still a real heading. */
export const Label: Story = { args: { level: 3, look: "label" } }
/** The heading of one item in a list, for a level below the section. */
export const Item: Story = { args: { level: 3, look: "item" } }
