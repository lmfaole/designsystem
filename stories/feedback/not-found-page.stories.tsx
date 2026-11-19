import type { Meta, StoryObj } from "@storybook/react-vite"

import { NotFoundPage } from "../../src/components/not-found-page"

const meta = {
  title: "Feedback/NotFoundPage",
  component: NotFoundPage,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: `**Use it when** the app has no page for the path (a 404).

**Do not use it when** a thing that does not exist but whose page does (show it empty with \`EmptyState\`).

**Accessibility.** A heading, the text and a link home.

**Content.** Say what was not found and give a way back.

**Related.** \`ErrorPage\`, \`ServerErrorPage\`` } }, },
} satisfies Meta<typeof NotFoundPage>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
