import type { Meta, StoryObj } from "@storybook/react-vite"

import { TextField } from "../../src/components/text-field"

const meta = {
  title: "Forms/TextField",
  component: TextField,
  tags: ["autodocs"],
  args: { label: "Navn", name: "navn" },
  parameters: { docs: { description: { component: `**Use it when** the reader types one line: a name, an address, a search term, a number.

**Do not use it when** the choice is from a known list (\`NativeSelect\`), or the reader only reads the value (a \`FactList\`). Avoid \`disabled\`: say why instead.

**Accessibility.** A visible label above the field, never a placeholder. The hint and the error are tied to the input with \`aria-describedby\`; the error begins with a hidden «Feil:» and carries a symbol. Validate on submit, not while typing.

**Content.** The label is a noun («E-postadresse»). The hint gives the format. The error says what is wrong and how to fix it, in the same words as the \`FormErrorSummary\`. Mark only the minority: «(valgfritt)» when most fields are required.

**Related.** \`SearchField\`, \`FormErrorSummary\`, \`NativeSelect\`` } } },
} satisfies Meta<typeof TextField>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithHint: Story = { args: { label: "Telefon", name: "telefon", hint: "Åtte siffer, for eksempel 22 22 22 22." } }
export const Optional: Story = { args: { label: "Kallenavn", name: "kallenavn", optional: true } }
export const WithError: Story = { args: { label: "E-postadresse", name: "epost", type: "email", defaultValue: "ola", error: "Skriv en e-postadresse med @, for eksempel ola@eksempel.no." } }
