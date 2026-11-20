import type { Meta, StoryObj } from "@storybook/react-vite"

import { EmptyState } from "../../../src/components/empty-state"

const meta = {
  title: "Components/States/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  args: { title: "Ingen åpne pull requests", description: "Alt er behandlet." },
  parameters: { docs: { description: { component: `\`### Use it when

a list or page has nothing to show. Say what it would hold, why it is empty if the reader can change that, and one next step if there is one.

### Do not use it when

many sections of a front page are empty at once (a quiet line of text each), or a query failed (\`ErrorMessage\`).

### Accessibility

**Handled by the component**

- It replaces the empty structure, so no table header is read over no rows ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- The icon is decorative and hidden from assistive technology ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- The action is a real link (\`LinkButton\`), reached and followed from the keyboard ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))
- Text colours are theme tokens whose contrast the theme tests, light and dark ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum))

**You check**

- The title is text, not a heading: the section around it gives the heading ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))
- The action's words say where it goes ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))
- When the list empties without a page load (a filter), say the result in a status message ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))

### Content

«Ingen treff. Prøv færre filtre.» when filtered; «Ingen åpne pull requests. Alt er behandlet.» when nothing is wrong; never «Noe gikk galt».

### Related

\`Banner\`, \`ErrorMessage\`, \`Skeleton\`` } } },
} satisfies Meta<typeof EmptyState>
export default meta
type Story = StoryObj<typeof meta>

/** A title and a reason, with no icon or action: the quiet form. */
export const Default: Story = {}
/** With an icon and one next step, as after a search with no results. */
export const WithAction: Story = { args: { icon: "search", title: "Ingen treff", description: "Prøv færre filtre.", action: { href: "#", label: "Nullstill filtre" } } }
/** The title alone, where nothing more needs saying. */
export const TitleOnly: Story = { args: { description: undefined } }
