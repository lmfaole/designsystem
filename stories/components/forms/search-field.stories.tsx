import type { Meta, StoryObj } from "@storybook/react-vite"

import { SearchField } from "../../../src/components/search-field"

const meta = {
  title: "Components/Forms/SearchField",
  component: SearchField,
  tags: ["autodocs"],
  args: { label: "Søk i pull requests", action: "#" },
  parameters: { docs: { description: { component: `### Use it when

a list is long enough that the reader needs to find one thing in it.

### Do not use it when

a few filters narrow it (\`FilterChips\`) or the list is short. It is not hidden behind an icon.

### Accessibility

**Handled by the component**

- A \`form\` with \`role="search"\`, so it is found as a landmark ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- A visible \`<label>\` tied to the input ([3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions), [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- The button says «Søk» in words; its icon is hidden ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content), [2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))
- A GET form: it is sent with Enter or the button, with no script ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))
- The input shows a focus ring from the \`ring\` token ([2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible))

**You check**

- The label says what is searched («Søk i pull requests») ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))
- \`name\` is unique on the page: it is also the input's id ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- The result page says how many results there were, and the document's \`<title>\` names the search ([2.4.2 Page Titled](https://www.w3.org/WAI/WCAG22/Understanding/page-titled))

### Content

The label says what is searched («Søk i pull requests»). Say how many results there were («5 treff») and use an \`EmptyState\` for none.

### Related

\`TextField\`, \`FilterChips\`, \`EmptyState\`, \`Pagination\`` } } },
} satisfies Meta<typeof SearchField>
export default meta
type Story = StoryObj<typeof meta>

/** An empty search with its visible label and button. */
export const Default: Story = {}
/** Back on the result page, with the query kept in the field. */
export const WithQuery: Story = { args: { q: "tema" } }
