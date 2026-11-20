import type { Meta, StoryObj } from "@storybook/react-vite"

import { NotFoundPage } from "../../../src/components/not-found-page"

const meta = {
  title: "Patterns/Error pages/NotFoundPage",
  component: NotFoundPage,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: `### Use it when

the app has no page for the path (a 404).

### Do not use it when

a thing that does not exist but whose page does (show it empty with \`EmptyState\`).

### Accessibility

**Handled by the component**

- Through \`ErrorPage\`: an \`<h1>\` that names the section, then the text and the action, in reading order ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), [1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence))
- The way back is a real link with words («Gå til forsiden») ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))
- Text colours are theme tokens whose contrast the theme tests, light and dark ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum))

**You check**

- The document's \`<title>\` says the page was not found ([2.4.2 Page Titled](https://www.w3.org/WAI/WCAG22/Understanding/page-titled))
- No other \`<h1>\` on the page ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Under a base path, \`home\` is the app's front page (\`/start/\`); without it the link goes to the site's root \`/\` ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))

### Content

Say what was not found and give a way back.

### Related

\`ErrorPage\`, \`ServerErrorPage\`` } }, },
} satisfies Meta<typeof NotFoundPage>
export default meta
type Story = StoryObj<typeof meta>

/** The ready-made 404 with its link to the front page. */
export const Default: Story = {}
