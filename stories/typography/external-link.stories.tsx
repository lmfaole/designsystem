import type { Meta, StoryObj } from "@storybook/react-vite"

import { ExternalLink } from "../../src/components/external-link"

const meta = {
  title: "Typography/ExternalLink",
  component: ExternalLink,
  tags: ["autodocs"],
  args: { href: "https://example.com", children: "example.com" },
  parameters: { docs: { description: { component: `### Use it when

a link out to another site, in running text or as a pill among a thing's other places.

### Do not use it when

a link that stays in the app (\`TextLink\`, \`CardLink\`).

### Accessibility

**Handled by the component**

- A native \`<a href>\`, opened in the same tab, with \`rel="noopener noreferrer"\` always set ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- Says «(eksternt nettsted)» to a screen reader, so the reader knows before they leave ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))
- The external symbol is hidden from a screen reader; the hidden words carry its meaning ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- Underlined in text, bordered as a pill, so it is not told by colour alone ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- Keeps the browser's focus outline; nothing removes it, and forced colours draw a real outline ([2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible))

**You check**

- The text names the place («GitHub»), never «Klikk her» ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))
- Pills in a row stand far enough apart for a 24px target ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum))

### Content

Names the place: «GitHub», not «Klikk her».

### Related

\`LinkButton\`, \`TextLink\`` } }, },
} satisfies Meta<typeof ExternalLink>
export default meta
type Story = StoryObj<typeof meta>

/** A link out in running text: underlined, with the external symbol after it. */
export const Text: Story = {}
/** The bordered form a row of links to a thing's other sites takes. */
export const Pill: Story = { args: { look: "pill" } }
