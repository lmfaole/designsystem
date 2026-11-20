import type { Meta, StoryObj } from "@storybook/react-vite"

import { Banner } from "../../../src/components/banner"

const meta = {
  title: "Components/Status/Banner",
  component: Banner,
  tags: ["autodocs"],
  args: { title: "Dataene er fra i går", children: "Synkroniseringen har ikke gått siden 18. november." },
  parameters: { docs: { description: { component: `\`### Use it when

a message is about the whole page or a whole section: old data, a failed source, a snapshot.

### Do not use it when

the message is about one action or one field (put it next to it), or a query failed (\`ErrorMessage\`). There is no toast and a banner cannot be dismissed.

### Accessibility

**Handled by the component**

- \`info\` and \`warning\` are \`role="status"\`, announced politely ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))
- \`destructive\` is \`role="alert"\`, announced at once ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))
- The symbol is hidden from assistive technology; the title says what kind of message it is ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The kind is told by the symbol and the words, never by colour alone ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- Text colours are theme tokens whose contrast the theme tests, light and dark ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum))

**You check**

- The title says what happened in words, without the tone ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- A banner added after load is announced only if a live region was already there: render it with the page, or keep the slot on the page ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))
- \`destructive\` only for what stops something, so an alert does not interrupt for less ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))
- A link in the body says where it goes ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))

### Content

A title that says what happened, then what to do, with no «Vennligst», «Beklager» or «Ups». One sentence in the body at most.

### Related

\`ErrorMessage\`, \`StatusLine\`, \`EmptyState\`` } } },
} satisfies Meta<typeof Banner>
export default meta
type Story = StoryObj<typeof meta>

/** The default, polite banner with a title and one sentence. */
export const Info: Story = {}
/** A warning, still announced politely, for data that may be out of date. */
/** What the reader did has worked: «Lagret» under the title of a settings page after the server saved it and sent the reader back (`?lagret=1`). */
export const Success: Story = { args: { tone: "success", title: "Lagret", children: "Forsiden viser nå delene i rekkefølgen du valgte." } }

export const Warning: Story = { args: { tone: "warning", title: "Data kan være gamle" } }
/** The destructive banner, announced at once, for a failure that stops something. */
export const Destructive: Story = { args: { tone: "destructive", title: "Kunne ikke hente pull requests", children: "GitHub svarte 401. Lag en ny token." } }
/** A title with no body, where the title says it all. */
export const TitleOnly: Story = { args: { children: undefined } }
