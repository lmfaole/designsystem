import type { Meta, StoryObj } from "@storybook/react-vite"

import { Skeleton } from "../../src/components/ui/skeleton"

const meta = {
  title: "Primitives/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: `### Use it when

a part waits for its data for longer than a second: a skeleton at the part's final height.

### Do not use it when

something that arrives within a second (show nothing), or something that failed (\`ErrorMessage\`).

### Accessibility

Announce a group of skeletons once with a hidden label, not each one.

### Content

A hidden label says what is loading («Henter pull requests»).

### Related

\`EmptyState\`, \`ErrorMessage\`` } }, },
} satisfies Meta<typeof Skeleton>
export default meta
type Story = StoryObj<typeof meta>

export const Line: Story = { args: { className: "h-4 w-48" } }
export const Avatar: Story = { args: { className: "size-12 rounded-full" } }
