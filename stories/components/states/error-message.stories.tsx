import type { Meta, StoryObj } from "@storybook/react-vite"

import { ErrorMessage } from "../../../src/components/error-message"

const meta = {
  title: "Components/States/ErrorMessage",
  component: ErrorMessage,
  tags: ["autodocs"],
  args: { error: new Error("timeout") },
  parameters: { docs: { description: { component: `### Use it when

a query for a page or a section failed. Put it in the part that failed: one failing source never takes the page down.

### Do not use it when

the page itself does not exist (\`NotFoundPage\`), the whole page crashed (\`ServerErrorPage\`), or the message is about the whole page (\`Banner\`).

### Accessibility

**Handled by the component**

- \`role="alert"\`, so it is announced when it appears ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))
- A warning symbol, hidden from assistive technology, and the error in words, so colour is never alone ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- Long messages wrap anywhere instead of scrolling sideways ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow))
- Text colours are theme tokens whose contrast the theme tests, light and dark ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum))

**You check**

- The lead and \`error.message\` together say what failed in words a person can read, not a stack trace
- One per failed part: several alerts at once interrupt each other ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))

### Content

What went wrong, then what to do: «Kunne ikke hente pull requesten: GitHub svarte 502». No «Vennligst» or «Ups».

### Related

\`Banner\`, \`EmptyState\`, \`NotFoundPage\`` } }, },
} satisfies Meta<typeof ErrorMessage>
export default meta
type Story = StoryObj<typeof meta>

/** The built-in lead («Kunne ikke laste data») followed by the error's own message. */
export const Default: Story = {}
/** A lead written for the part that failed, in place of the default. */
export const CustomLead: Story = { args: { children: "Fikk ikke hentet listen" } }
