import type { Meta, StoryObj } from "@storybook/react-vite"

import { PageLayout } from "../../src/components/page-layout"
import { Text } from "../../src/components/text"

const meta = {
  title: "Layout/PageLayout",
  component: PageLayout,
  tags: ["autodocs"],
  args: { children: null },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PageLayout>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: <Text>Content of the page.</Text> } }
export const WithBarFoot: Story = { args: { foot: "bar", children: <Text>Room at the bottom for a fixed bar.</Text> } }
