import type { Meta, StoryObj } from "@storybook/react-vite"

import { StreamedSection } from "../../../src/components/streamed-section"

const meta = {
  title: "Components/States/StreamedSection",
  component: StreamedSection,
  tags: ["autodocs"],
  args: { title: "pull requests", children: "Her kommer innholdet." },
  parameters: { docs: { description: { component: `### Use it when

a part of a server-rendered page arrives on its own while the rest is already shown: around each source that is slow, so the slowest does not hold the page back.

### Do not use it when

the content is already there (a plain section), or around a source that can throw: it returns its failure as a value and shows its own \`ErrorMessage\`.

### Accessibility

**Handled by the component**

- While waiting it shows a \`SectionSkeleton\`: one status for the part, with a hidden «Henter …» label ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))
- The content replaces the skeleton in the same place, so reading order stays ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence))

**You check**

- \`title\` names what is loading ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages))
- The content that arrives has its own heading in the page's heading order ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Focus is not on anything inside the fallback, since it is replaced ([2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order))

### Content

The title names what is loading.

### Related

\`SectionSkeleton\`, \`ErrorMessage\`, guide «Server rendering»` } } },
} satisfies Meta<typeof StreamedSection>
export default meta
type Story = StoryObj<typeof meta>

/** The content has arrived, so the skeleton fallback is no longer shown. */
export const Arrived: Story = {}
