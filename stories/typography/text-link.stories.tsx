import type { Meta, StoryObj } from "@storybook/react-vite"

import { TextLink } from "../../src/components/text"

const meta = {
  title: "Typography/TextLink",
  component: TextLink,
  tags: ["autodocs"],
  args: { href: "#", children: "A link" },
  parameters: { docs: { description: { component: `### Use it when

a link that continues in the same place, in running text.

### Do not use it when

a link out (\`ExternalLink\`) or an action that goes somewhere as a button (\`LinkButton\`).

### Accessibility

**Handled by the component**

- A native \`<a href>\`: a link to every assistive technology and to the keyboard ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- Underlined (dotted, solid on hover), so it is not told by colour alone ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- At least 24px tall (\`min-h-6\`) ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum))
- \`external\` sets \`rel="noopener noreferrer"\` and ends the link with the external symbol and «(eksternt nettsted)» for a screen reader (\`ExternalMark\`) ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))
- Keeps the browser's focus outline; nothing removes it, and forced colours draw a real outline ([2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible))

**You check**

- The text says where it goes, never «Klikk her» or «Les mer» ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))
- With \`external\` the reader is not told they leave: use \`ExternalLink\` for a link out ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))

### Content

Never «Klikk her» or «Les mer».

### Related

\`ExternalLink\`, \`CardLink\`, \`LinkButton\`` } }, },
} satisfies Meta<typeof TextLink>
export default meta
type Story = StoryObj<typeof meta>

/** A link that stays in the app, in running text. */
export const Internal: Story = {}
/** With `external`: the same look, `rel` set, but no external mark (see `ExternalLink`). */
export const External: Story = { args: { external: true, href: "https://example.com" } }
