import type { Meta, StoryObj } from "@storybook/react-vite"

import { SearchField } from "../../src/components/search-field"

const meta = {
  title: "Forms/SearchField",
  component: SearchField,
  tags: ["autodocs"],
  args: { label: "Søk i pull requests", action: "#" },
  parameters: { docs: { description: { component: `### Use it when

a list is long enough that the reader needs to find one thing in it.

### Do not use it when

a few filters narrow it (\`FilterChips\`) or the list is short. It is not hidden behind an icon.

### Accessibility

A \`form role="search"\` with a visible label and a button in words. It sends a GET request, so the result page has an address and works without script.

### Content

The label says what is searched («Søk i pull requests»). Say how many results there were («5 treff») and use an \`EmptyState\` for none.

### Related

\`TextField\`, \`FilterChips\`, \`EmptyState\`, \`Pagination\`` } } },
} satisfies Meta<typeof SearchField>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithQuery: Story = { args: { q: "tema" } }
