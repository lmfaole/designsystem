import type { Meta, StoryObj } from "@storybook/react-vite"

import { CardLink } from "../../src/components/card-link"

const meta = {
  title: "Typography/CardLink",
  component: CardLink,
  tags: ["autodocs"],
  args: { href: "#", children: "Ridley Scott" },
  parameters: { docs: { description: { component: `### Use it when

a name that has a page: a link in a row or a card.

### Do not use it when

a link out (\`ExternalLink\`).

### Accessibility

**Handled by the component**

- A native \`<a href>\`: a link to every assistive technology and to the keyboard ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- Underlined (dotted, solid on hover), so it is not told by colour alone ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- At least 24px tall (\`min-h-6\`), even in a line of small text ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum))
- Keeps the browser's focus outline; nothing removes it, and forced colours draw a real outline ([2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible))

**You check**

- The text is the name of the thing, so the link says where it goes ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))
- In \`block\`, a picture beside the name has empty \`alt\` when the name already says it ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- Links stand far enough apart in a row of names that a 24px target has room ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum))

### Content

The name of the thing.

### Related

\`TextLink\`, \`Rows\`` } }, },
} satisfies Meta<typeof CardLink>
export default meta
type Story = StoryObj<typeof meta>

/** The plain look of a name that has a page, as it reads in running text. */
export const Default: Story = {}
/** The name of a row: weightier, so it stands out from the row's other facts. */
export const Strong: Story = { args: { look: "strong" } }
/** A link that holds a picture and a text: fills its line and is not underlined. */
export const Block: Story = { args: { look: "block" } }
