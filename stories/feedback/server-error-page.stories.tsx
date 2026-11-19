import type { Meta, StoryObj } from "@storybook/react-vite"

import { ServerErrorPage } from "../../src/components/server-error-page"

const meta = {
  title: "Feedback/ServerErrorPage",
  component: ServerErrorPage,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: `### Use it when

a page crashed while rendering (a 500).

### Do not use it when

a failed query in one part (\`ErrorMessage\`).

### Accessibility

A heading, the text and a way to reload.

### Content

Say that the page could not load and what to do (reload); no error code as the only content.

### Related

\`ErrorPage\`, \`NotFoundPage\`, \`ErrorMessage\`` } }, },
} satisfies Meta<typeof ServerErrorPage>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
