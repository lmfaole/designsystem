import type { Meta, StoryObj } from "@storybook/react-vite"

import { Inline } from "../../../src/components/layout"
import { LinkButton } from "../../../src/components/link-button"

const meta = {
  title: "Components/Actions/LinkButton",
  component: LinkButton,
  tags: ["autodocs"],
  args: { href: "#", children: "Se alle" },
  parameters: { docs: { description: { component: `### Use it when

an action that goes somewhere: «Åpne på GitHub». \`external\` is the last action on a page.

### Do not use it when

a link that only continues in the same place (\`TextLink\`).

### Accessibility

**Handled by the component**

- A real link that looks like a button: a screen reader hears a link, and Enter follows it ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value), [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard)).
- The focus ring of \`Button\` ([2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible)).
- \`external\` adds the external symbol and «(eksternt nettsted)» for a screen reader ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).
- The icons are hidden from assistive technology; the words carry the meaning ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)).
- 32 px high ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)).

**You check**

- The text says where it goes («Åpne på GitHub», never «Klikk her») ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).
- It only goes somewhere: an action that changes something is a \`Button\` ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)).
- A link out is the last action on the page, so it is also last in the focus order ([2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order)).

### Content

A verb that names the place: «Åpne på GitHub», never «Les mer».

### Related

\`ExternalLink\`, \`TextLink\`, \`Button\`` } }, },
} satisfies Meta<typeof LinkButton>
export default meta
type Story = StoryObj<typeof meta>

/** A link inside the app in the outline look: no external mark. */
export const Default: Story = {}

/** A link out: marked with the external symbol, read as external, and the LAST action on a page. */
export const External: Story = { args: { href: "https://github.com", external: true, children: "Åpne på GitHub" } }

/** An icon in front for the kind of place, next to a link out with its external mark at the end. */
export const WithIcon: Story = {
  render: () => (
    <Inline gap="md">
      <LinkButton href="#" icon="pull-request" variant="secondary">Pull requests</LinkButton>
      <LinkButton href="https://github.com" external>Åpne på GitHub</LinkButton>
    </Inline>
  ),
}
