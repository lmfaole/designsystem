import type { Meta, StoryObj } from "@storybook/react-vite"

import { ErrorPage } from "../../src/components/error-page"
import { Button } from "../../src/components/ui/button"

const meta = {
  title: "Feedback/ErrorPage",
  component: ErrorPage,
  tags: ["autodocs"],
  args: { status: 403, title: "Ingen tilgang", description: "Du har ikke lov til å se denne siden." },
  parameters: { docs: { description: { component: `### Use it when

a whole page stands for an HTTP status (403, 404, 500).

### Do not use it when

an error in one part of a page (\`ErrorMessage\`).

### Accessibility

The status is large text, with a heading and a way back.

### Content

Say what happened and give a way back; never blame the reader.

### Related

\`NotFoundPage\`, \`ServerErrorPage\`, \`ErrorMessage\`` } }, },
} satisfies Meta<typeof ErrorPage>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { actions: <Button asChild><a href="#">Tilbake</a></Button> } }
