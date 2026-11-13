import type { Meta, StoryObj } from "@storybook/react-vite"

import { ErrorPage } from "../../src/components/error-page"
import { Button } from "../../src/components/ui/button"

const meta = {
  title: "Feedback/ErrorPage",
  component: ErrorPage,
  tags: ["autodocs"],
  args: { status: 403, title: "Ingen tilgang", description: "Du har ikke lov til å se denne siden." },
} satisfies Meta<typeof ErrorPage>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { actions: <Button asChild><a href="#">Tilbake</a></Button> } }
