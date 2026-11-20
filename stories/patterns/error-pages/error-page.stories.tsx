import type { Meta, StoryObj } from "@storybook/react-vite"

import { ErrorPage } from "../../../src/components/error-page"
import { Button } from "../../../src/components/ui/button"

const meta = {
  title: "Patterns/Error pages/ErrorPage",
  component: ErrorPage,
  tags: ["autodocs"],
  args: { status: 403, title: "Ingen tilgang", description: "Du har ikke lov til å se denne siden." },
  parameters: { docs: { description: { component: `### Use it when

a whole page stands for an HTTP status (403, 404, 500).

### Do not use it when

an error in one part of a page (\`ErrorMessage\`).

### Accessibility

**Handled by the component**

- The title is an \`<h1>\` and names the section (\`aria-labelledby\`) ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), [2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))
- Status, title, text and actions come in reading order ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence))
- Text colours are theme tokens whose contrast the theme tests, light and dark ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum))

**You check**

- The document's \`<title>\` says the same as the heading ([2.4.2 Page Titled](https://www.w3.org/WAI/WCAG22/Understanding/page-titled))
- No other \`<h1>\` on the page, and only one error page (its heading id is fixed) ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- The \`actions\` are links or buttons whose words say where they go ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))

### Content

Say what happened and give a way back; never blame the reader.

### Related

\`NotFoundPage\`, \`ServerErrorPage\`, \`ErrorMessage\`` } }, },
} satisfies Meta<typeof ErrorPage>
export default meta
type Story = StoryObj<typeof meta>

/** A 403 with one way back: the layout every error page shares. */
export const Default: Story = { args: { actions: <Button asChild><a href="#">Tilbake</a></Button> } }
