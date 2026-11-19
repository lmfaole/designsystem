import type { Meta, StoryObj } from "@storybook/react-vite"

import { StreamedSection } from "../../src/components/streamed-section"

const meta = {
  title: "Feedback/StreamedSection",
  component: StreamedSection,
  tags: ["autodocs"],
  args: { title: "pull requests", children: "Her kommer innholdet." },
  parameters: { docs: { description: { component: `### Use it when

a part of a server-rendered page arrives on its own while the rest is already shown: around each source that is slow, so the slowest does not hold the page back.

### Do not use it when

the content is already there (a plain section), or around a source that can throw: it returns its failure as a value and shows its own \`ErrorMessage\`.

### Accessibility

The fallback is a \`SectionSkeleton\` with one status for the part. The fallback is never \`null\`: an empty place makes the page jump.

### Content

The title names what is loading.

### Related

\`SectionSkeleton\`, \`ErrorMessage\`, guide «Server rendering»` } } },
} satisfies Meta<typeof StreamedSection>
export default meta
type Story = StoryObj<typeof meta>

export const Arrived: Story = {}
