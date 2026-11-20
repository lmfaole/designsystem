import type { Meta, StoryObj } from "@storybook/react-vite"

import { CopyButton } from "../../../src/components/copy-button"

const meta = {
  title: "Components/Actions/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  args: { value: "npm run skills" },
  parameters: { docs: { description: { component: `### Use it when

a value is hard to write by hand: an id, a hash, a command, an address.

### Do not use it when

the value is secret (do not put a token on the page), or the page is the only place it is needed.

### Accessibility

**Handled by the component**

- A native \`<button>\` with its text always visible, which is also its name ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- The result («Kopiert», «Kunne ikke kopiere») is said in a polite live region (\`role="status"\`) ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))
- The icon is decorative; the words carry the meaning ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The focus ring and the at least 24px target of \`Button\` ([2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible))

**You check**

- The label says what is copied when there is more than one on the page («Kopier kommando») ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))
- The value is shown next to it (in a \`Code\`), so the reader can see what they copy ([3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions))

### Content

The label says what is copied when it is not obvious («Kopier kommando»). Show the value next to it, in a \`Code\`.

### Related

\`Code\`, \`LinkButton\`` } } },
} satisfies Meta<typeof CopyButton>
export default meta
type Story = StoryObj<typeof meta>

/** The default label, «Kopier», for a value shown next to it. */
export const Default: Story = {}
/** A label that says what is copied, for a page with more than one. */
export const WithLabel: Story = { args: { label: "Kopier kommando" } }
