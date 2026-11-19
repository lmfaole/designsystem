import type { Meta, StoryObj } from "@storybook/react-vite"

import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "../../src/components/ui/native-select"

const meta = {
  title: "Primitives/NativeSelect",
  component: NativeSelect,
  tags: ["autodocs"],
  subcomponents: { NativeSelectOption, NativeSelectOptGroup },
  args: { "aria-label": "Type", children: [<NativeSelectOption key="a">Alle</NativeSelectOption>, <NativeSelectOption key="b">Filmer</NativeSelectOption>, <NativeSelectOption key="c">Serier</NativeSelectOption>] },
  parameters: { docs: { description: { component: `### Use it when

the reader chooses one from a known list: the platform's own picker.

### Do not use it when

two to six values that narrow a list (\`FilterChips\`) or an either/or view (\`SegmentedToggle\`).

### Accessibility

A native \`select\` with a visible label, so a phone gets its wheel or sheet.

### Content

The label names what is chosen.

### Related

\`PeriodPicker\`, \`TextField\`, \`FilterChips\`` } }, },
} satisfies Meta<typeof NativeSelect>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Small: Story = { args: { size: "sm" } }
export const Disabled: Story = { args: { disabled: true } }
export const Grouped: Story = {
  render: (args) => (
    <NativeSelect {...args}>
      <NativeSelectOptGroup label="Medier"><NativeSelectOption>Musikk</NativeSelectOption><NativeSelectOption>Podkast</NativeSelectOption></NativeSelectOptGroup>
      <NativeSelectOptGroup label="Annet"><NativeSelectOption>Bøker</NativeSelectOption></NativeSelectOptGroup>
    </NativeSelect>
  ),
}
