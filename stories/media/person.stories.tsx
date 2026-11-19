import type { Meta, StoryObj } from "@storybook/react-vite"

import { Person } from "../../src/components/person"
import { square } from "../sample"

const meta = {
  title: "Media/Person",
  component: Person,
  tags: ["autodocs"],
  args: { name: "Kari Nordmann", src: square(7) },
  parameters: { docs: { description: { component: `### Use it when

a person is named: reviewers, authors, who answered.

### Do not use it when

a thing that is not a person (\`Picture\`).

### Accessibility

The picture is decorative and the name beside it says who; the frame is always there so names stay level.

### Content

The name as the source gives it.

### Related

\`FactList\`, \`Rows\`, \`Picture\`` } }, },
} satisfies Meta<typeof Person>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const NoPicture: Story = { args: { src: null } }
