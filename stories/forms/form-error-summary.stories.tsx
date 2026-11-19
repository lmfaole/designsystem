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

It takes focus when it appears, is announced (\`role="alert"\`), and each error is a link to its field. The words are the same as beside the field.

### Content

«Det er et problem», then one line per error that says what is wrong and how to fix it. No «Vennligst», «Beklager» or «ugyldig».

### Related

\`TextField\`, \`Banner\`, \`ErrorMessage\`` } } },
} satisfies Meta<typeof FormErrorSummary>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const None: Story = { args: { errors: [] } }
