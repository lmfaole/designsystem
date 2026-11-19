import type { Meta, StoryObj } from "@storybook/react-vite"

import { ErrorMessage } from "../../src/components/error-message"

const meta = {
  title: "Feedback/ErrorMessage",
  component: ErrorMessage,
  tags: ["autodocs"],
  args: { error: new Error("timeout") },
  parameters: { docs: { description: { component: `**Use it when** a query for a page or a section failed. Put it in the part that failed: one failing source never takes the page down.

**Do not use it when** the page itself does not exist (\`NotFoundPage\`), the whole page crashed (\`ServerErrorPage\`), or the message is about the whole page (\`Banner\`).

**Accessibility.** \`role=alert\` and a symbol, so it is announced and not told by colour alone.

**Content.** What went wrong, then what to do: «Kunne ikke hente pull requesten: GitHub svarte 502». No «Vennligst» or «Ups».

**Related.** \`Banner\`, \`EmptyState\`, \`NotFoundPage\`` } }, },
} satisfies Meta<typeof ErrorMessage>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const CustomLead: Story = { args: { children: "Fikk ikke hentet listen" } }
