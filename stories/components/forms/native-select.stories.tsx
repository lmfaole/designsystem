import type { Meta, StoryObj } from "@storybook/react-vite"

import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "../../../src/components/ui/native-select"

const meta = {
  title: "Components/Forms/NativeSelect",
  component: NativeSelect,
  tags: ["autodocs"],
  subcomponents: { NativeSelectOption, NativeSelectOptGroup },
  args: { "aria-label": "Type", children: [<NativeSelectOption key="a">Alle</NativeSelectOption>, <NativeSelectOption key="b">Filmer</NativeSelectOption>, <NativeSelectOption key="c">Serier</NativeSelectOption>] },
  parameters: { docs: { description: { component: `### Use it when

the reader chooses one from a known list: the platform's own picker.

### Do not use it when

two to six values that narrow a list (\`FilterChips\`) or an either/or view (\`SegmentedToggle\`).

### Accessibility

**Handled by the component**

- A native \`<select>\`: the keyboard works, and a phone opens its own picker ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))
- Role, value and \`disabled\` are the platform's own ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- A focus ring in the \`ring\` token on keyboard focus ([2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible))
- The chevron is hidden from assistive technology ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))

**You check**

- A visible \`<label>\` tied to it, or an \`aria-label\` where the label is elsewhere ([3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions))
- Choosing a value does not by itself go to another page or submit a form ([3.2.2 On Input](https://www.w3.org/WAI/WCAG22/Understanding/on-input))
- \`aria-invalid\` only marks the border: say what is wrong in words ([3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification))

### Content

The label names what is chosen.

### Related

\`PeriodPicker\`, \`TextField\`, \`FilterChips\`` } }, },
} satisfies Meta<typeof NativeSelect>
export default meta
type Story = StoryObj<typeof meta>

/** A native picker with three options. */
export const Default: Story = {}
/** The small size, for a toolbar. */
export const Small: Story = { args: { size: "sm" } }
/** The native disabled state: faded and not focusable. */
export const Disabled: Story = { args: { disabled: true } }
/** Options in labelled groups (`NativeSelectOptGroup`). */
export const Grouped: Story = {
  render: (args) => (
    <NativeSelect {...args}>
      <NativeSelectOptGroup label="Medier"><NativeSelectOption>Musikk</NativeSelectOption><NativeSelectOption>Podkast</NativeSelectOption></NativeSelectOptGroup>
      <NativeSelectOptGroup label="Annet"><NativeSelectOption>Bøker</NativeSelectOption></NativeSelectOptGroup>
    </NativeSelect>
  ),
}
