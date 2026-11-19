import type { Meta, StoryObj } from "@storybook/react-vite"

import { TextField } from "../../src/components/text-field"

const meta = {
  title: "Forms/TextField",
  component: TextField,
  tags: ["autodocs"],
  args: { label: "Navn", name: "navn" },
  parameters: { docs: { description: { component: `### Use it when

the reader types one line: a name, an address, a search term, a number.

### Do not use it when

the choice is from a known list (\`NativeSelect\`), or the reader only reads the value (a \`FactList\`). Avoid \`disabled\`: say why instead.

### Accessibility

**Handled by the component**

- A visible \`<label>\` tied to the input, never a placeholder ([3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions), [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- The hint and the error are tied to the input with \`aria-describedby\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- With an error the input is \`aria-invalid\`, and the error is in words that begin with a hidden «Feil:» ([3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification), [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- The error has a symbol and words, so it is not told by the red border alone ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color))
- The input shows a focus ring from the \`ring\` token ([2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible))

**You check**

- The label names the field and «(valgfritt)» marks only the minority ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels), [3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions))
- The hint gives the format before the reader types ([3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions))
- The error says what is wrong and how to fix it, and appears after submit, not while typing ([3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification), [3.3.3 Error Suggestion](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion))
- \`name\` is unique on the page: it is the input's id ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- \`autoComplete\` is set for fields about the reader (name, e-mail)

### Content

The label is a noun («E-postadresse»). The hint gives the format. The error says what is wrong and how to fix it, in the same words as the \`FormErrorSummary\`. Mark only the minority: «(valgfritt)» when most fields are required.

### Related

\`SearchField\`, \`FormErrorSummary\`, \`NativeSelect\`` } } },
} satisfies Meta<typeof TextField>
export default meta
type Story = StoryObj<typeof meta>

/** The label and the input alone. */
export const Default: Story = {}
/** A hint for the format, tied to the input. */
export const WithHint: Story = { args: { label: "Telefon", name: "telefon", hint: "Åtte siffer, for eksempel 22 22 22 22." } }
/** An optional field, marked «(valgfritt)». */
export const Optional: Story = { args: { label: "Kallenavn", name: "kallenavn", optional: true } }
/** An error with its symbol and hidden «Feil:», tied to the input and marked invalid. */
export const WithError: Story = { args: { label: "E-postadresse", name: "epost", type: "email", defaultValue: "ola", error: "Skriv en e-postadresse med @, for eksempel ola@eksempel.no." } }
