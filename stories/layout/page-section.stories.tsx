import type { Meta, StoryObj } from "@storybook/react-vite"

import { PageSection } from "../../src/components/page-section"
import { Text } from "../../src/components/text"

const meta = {
  title: "Layout/PageSection",
  component: PageSection,
  tags: ["autodocs"],
  args: { id: "s", title: "Siste", children: null },
} satisfies Meta<typeof PageSection>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { id: "latest", title: "Siste", children: <Text>Content of the section.</Text> } }
