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

/** An icon in front of the title says at a glance what the section is about. */
export const WithIcon: Story = { args: { id: "pulls", title: "Pull requests", icon: "pull-request", children: <Text>Content of the section.</Text> } }

/** A section that shows only the first of a list links to all of it, in the title row. */
export const WithMore: Story = { args: { id: "pulls", title: "Pull requests", icon: "pull-request", more: { href: "#", label: "Se alle 14" }, children: <Text>De tre som trenger deg mest.</Text> } }
