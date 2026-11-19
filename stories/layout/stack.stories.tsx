import type { Meta, StoryObj } from "@storybook/react-vite"

import { Stack } from "../../src/components/layout"
const Box = ({ n }: { n: number }) => <div className="rounded-md border bg-muted px-3 py-2 text-sm">Box {n}</div>
const boxes = (count: number) => Array.from({ length: count }, (_, i) => <Box key={i} n={i + 1} />)

const meta = {
  title: "Layout/Stack",
  component: Stack,
  tags: ["autodocs"],
  args: { children: null },
  parameters: { docs: { description: { component: `**Use it when** things stand under each other: the sections of a page, the parts of a card. This is the layout of read content.

**Do not use it when** the things are looked at side by side (\`Tiles\`, \`Grid\`).

**Accessibility.** Order in the DOM is the reading order.

**Related.** \`Inline\`, \`Grid\`, \`Split\`` } }, },
} satisfies Meta<typeof Stack>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { gap: "md" }, render: (args) => <Stack {...args}>{boxes(3)}</Stack> }
export const NoGap: Story = { args: { gap: "none" }, render: (args) => <Stack {...args}>{boxes(3)}</Stack> }
export const Large: Story = { args: { gap: "xl" }, render: (args) => <Stack {...args}>{boxes(3)}</Stack> }
export const Prose: Story = { args: { width: "prose" }, render: (args) => <Stack {...args}><p>A column limited to the measure of a line of text.</p></Stack> }
