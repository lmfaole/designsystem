import type { Meta, StoryObj } from "@storybook/react-vite"

import { Separator } from "../../../src/components/ui/separator"

const meta = {
  title: "Components/Layout/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: `### Use it when

a break between two unrelated parts where space does not do it.

### Do not use it when

grouping (space groups; do not draw lines or boxes).

### Accessibility

**Handled by the component**

- Decorative by default: hidden from assistive technology, a line only ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- With \`decorative={false}\` it is \`role="separator"\` with its orientation ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))

**You check**

- Pass \`decorative={false}\` only when the break means something the headings do not say ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- A meaningful separator is not the only thing that tells the parts apart ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))

### Related

\`Stack\`, \`PageSection\`` } }, },
} satisfies Meta<typeof Separator>
export default meta
type Story = StoryObj<typeof meta>

/** A line between two parts stacked above each other. */
export const Horizontal: Story = { decorators: [(Story) => <div className="grid max-w-sm gap-3"><span>Above</span><Story /><span>Below</span></div>] }
/** A line between two things side by side, as tall as its row. */
export const Vertical: Story = { args: { orientation: "vertical" }, decorators: [(Story) => <div className="flex h-5 items-center gap-3"><span>Left</span><Story /><span>Right</span></div>] }
