import type { Meta, StoryObj } from "@storybook/react-vite"

import { FoldList } from "../../src/components/fold-list"

const meta = {
  title: "Lists/FoldList",
  component: FoldList,
  tags: ["autodocs"],
  args: { summary: "Vis alle verdier", items: [{ key: "1", text: "jan: 12" }, { key: "2", text: "feb: 18" }, { key: "3", text: "mar: 9" }] },
  parameters: { docs: { description: { component: `**Use it when** a short list a chart's reader may want to check but not read at first.

**Do not use it when** what matters (it must be on the page at rest; \`Disclosure\` is the general form).

**Accessibility.** A native \`details\` with a summary; works without script and from the keyboard.

**Content.** The summary says what is inside.

**Related.** \`Disclosure\`, \`ChartCard\`` } }, },
} satisfies Meta<typeof FoldList>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
