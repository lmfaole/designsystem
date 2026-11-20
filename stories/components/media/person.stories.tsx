import type { Meta, StoryObj } from "@storybook/react-vite"

import { Person } from "../../../src/components/person"
import { square } from "../../sample"

const meta = {
  title: "Components/Media/Person",
  component: Person,
  tags: ["autodocs"],
  args: { name: "Kari Nordmann", src: square(7) },
  parameters: { docs: { description: { component: `### Use it when

a person is named: reviewers, authors, who answered.

### Do not use it when

a thing that is not a person (\`Picture\`).

### Accessibility

**Handled by the component**

- The picture is decorative (\`alt=""\`, hidden), since the name beside it says who ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- A long name wraps instead of overflowing ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow))

**You check**

- The name is written as the source gives it
- Where the person has a page, wrap it in a link whose text is the name ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))

### Content

The name as the source gives it.

### Related

\`FactList\`, \`Rows\`, \`Picture\`` } }, },
} satisfies Meta<typeof Person>
export default meta
type Story = StoryObj<typeof meta>

/** A name with its round picture. */
export const Default: Story = {}
/** No picture: the frame stays, so names line up. */
export const NoPicture: Story = { args: { src: null } }
