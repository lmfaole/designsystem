import type { Meta, StoryObj } from "@storybook/react-vite"

import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "../../src/components/ui/native-select"

const meta = {
  title: "Primitives/NativeSelect",
  component: NativeSelect,
  tags: ["autodocs"],
  subcomponents: { NativeSelectOption, NativeSelectOptGroup },
  args: { "aria-label": "Type", children: [<NativeSelectOption key="a">Alle</NativeSelectOption>, <NativeSelectOption key="b">Filmer</NativeSelectOption>, <NativeSelectOption key="c">Serier</NativeSelectOption>] },
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
