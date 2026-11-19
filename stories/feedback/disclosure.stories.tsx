import type { Meta, StoryObj } from "@storybook/react-vite"

import { Disclosure } from "../../src/components/disclosure"

const meta = {
  title: "Feedback/Disclosure",
  component: Disclosure,
  tags: ["autodocs"],
  args: { summary: "Hele loggen", children: "Linje 1 og linje 2." },
  parameters: { docs: { description: { component: `\`**Use it when** longer content that the reader does not need to decide can stay behind one line: a whole log, the notes of a chart.

**Do not use it when** it holds what matters (it must be on the page at rest, never behind a click), or it should be a page with an address, or it would be nested. It is not an accordion: do not stack many.

**Accessibility.** A native \`<details>\`: it works without script and from the keyboard, and the browser announces open and closed.

**Content.** The summary says what is inside («Hele loggen»), not «Vis mer».

**Related.** \`FoldList\`, \`PageSection\`` } } },
} satisfies Meta<typeof Disclosure>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
