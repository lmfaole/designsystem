import type { Meta, StoryObj } from "@storybook/react-vite"

import { FormErrorSummary } from "../../src/components/form-error-summary"

const meta = {
  title: "Forms/FormErrorSummary",
  component: FormErrorSummary,
  tags: ["autodocs"],
  args: { errors: [{ field: "navn", message: "Skriv et navn." }, { field: "epost", message: "Skriv en e-postadresse med @." }] },
  parameters: { docs: { description: { component: `### Use it when

a form has been sent and has errors. It stands at the top of the page.

### Do not use it when

a single field is wrong in a form of one field (the message beside the field is enough), or for a failed query (\`ErrorMessage\`).

### Accessibility

**Handled by the component**

- \`role="alert"\`, announced when it appears ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))
- Takes focus when it appears (\`tabIndex={-1}\`), so the reader starts at the errors ([2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order))
- Each error is a link to its field by \`name\` ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context), [3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification))
- A warning symbol, hidden from assistive technology, and «Det er et problem» in words, so colour is not alone ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- Text colours are theme tokens whose contrast the theme tests, light and dark ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum))

**You check**

- Each \`field\` is the \`name\` of a field on the page, so the link lands on it ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))
- Each message says what is wrong and how to fix it, in the same words as beside the field ([3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification), [3.3.3 Error Suggestion](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion))
- Show it only after the form is sent, with what the reader wrote kept in the fields

### Content

«Det er et problem», then one line per error that says what is wrong and how to fix it. No «Vennligst», «Beklager» or «ugyldig».

### Related

\`TextField\`, \`Banner\`, \`ErrorMessage\`` } } },
} satisfies Meta<typeof FormErrorSummary>
export default meta
type Story = StoryObj<typeof meta>

/** Two errors, each a link to its field. */
export const Default: Story = {}
/** No errors: it renders nothing. */
export const None: Story = { args: { errors: [] } }
