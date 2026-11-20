import type { Meta, StoryObj } from "@storybook/react-vite"

import { Logo } from "../../../src/components/logos"
import { square } from "../../sample"

const meta = {
  title: "Components/Media/Logo",
  component: Logo,
  tags: ["autodocs"],
  args: { name: "Studio", src: square(30, "S") },
  parameters: { docs: { description: { component: `### Use it when

one maker's or source's mark with a light plate so dark logos show.

### Do not use it when

decoration.

### Accessibility

**Handled by the component**

- The logo is an \`img\` with \`name\` as its \`alt\` and title; with \`decorative\` it is \`alt=""\`, for a logo beside its own name ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))

**You check**

- \`name\` is the maker's or source's name, not «logo» ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- Where the name is already written next to it, set \`decorative\`, or a screen reader hears it twice ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- With \`plate={false}\`, a dark logo still shows on the card's ground

### Related

\`Logos\`, \`Picture\`` } }, },
} satisfies Meta<typeof Logo>
export default meta
type Story = StoryObj<typeof meta>

/** The light plate, so a dark logo shows. */
export const Plate: Story = {}
/** No plate, on the card's own ground. */
export const Bare: Story = { args: { plate: false } }
/** Beside its own name: hidden from a screen reader, which reads the name once, from the text. */
export const Decorative: Story = {
  args: { decorative: true },
  render: (args) => (
    <span className="inline-flex items-center gap-3">
      <Logo {...args} />
      Studio
    </span>
  ),
}
