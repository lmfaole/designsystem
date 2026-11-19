import type { Meta, StoryObj } from "@storybook/react-vite"

import { ServerErrorPage } from "../../src/components/server-error-page"

const meta = {
  title: "Feedback/ServerErrorPage",
  component: ServerErrorPage,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: `### Use it when

a page crashed while rendering (a 500).

### Do not use it when

a failed query in one part (\`ErrorMessage\`).

### Accessibility

**Handled by the component**

- Through \`ErrorPage\`: an \`<h1>\` that names the section, then the text and the actions, in reading order ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), [1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence))
- Both ways out are real links with words: reload (an empty address works without script) and the front page ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context), [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))
- Text colours are theme tokens whose contrast the theme tests, light and dark ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum))

**You check**

- The document's \`<title>\` says the page could not load ([2.4.2 Page Titled](https://www.w3.org/WAI/WCAG22/Understanding/page-titled))
- No other \`<h1>\` on the page ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- The front-page link goes to \`/\`: under a base path, check that it reaches the app

### Content

Say that the page could not load and what to do (reload); no error code as the only content.

### Related

\`ErrorPage\`, \`NotFoundPage\`, \`ErrorMessage\`` } }, },
} satisfies Meta<typeof ServerErrorPage>
export default meta
type Story = StoryObj<typeof meta>

/** The ready-made 500 with its reload and front-page links. */
export const Default: Story = {}
