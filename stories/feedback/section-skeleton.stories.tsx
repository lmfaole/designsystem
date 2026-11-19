import type { Meta, StoryObj } from "@storybook/react-vite"

import { SectionSkeleton } from "../../src/components/section-skeleton"

const meta = {
  title: "Feedback/SectionSkeleton",
  component: SectionSkeleton,
  tags: ["autodocs"],
  args: { title: "pull requests", lines: 3 },
  parameters: { docs: { description: { component: `**Use it when** a section is on its way and the page should not jump when it arrives: it stands at the section's final height.

**Do not use it when** the part arrives within a second (show nothing), or has failed (\`ErrorMessage\`). Put it in a \`StreamedSection\`, not by hand.

**Accessibility.** One status for the whole part with a hidden label («Henter pull requests»), not one announcement for each bar.

**Content.** The label names what is loading. \`lines\` is about how many rows the section will have.

**Related.** \`StreamedSection\`, \`Skeleton\`, \`EmptyState\`` } } },
} satisfies Meta<typeof SectionSkeleton>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Short: Story = { args: { lines: 1 } }
