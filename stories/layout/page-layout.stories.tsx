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

/** The default: one reading column at a readable width, centred. The rest of a wide screen is margin, not more columns. */
export const Reading: Story = { args: { children: <Text>One column, at a width the eye can follow.</Text> } }
/** For pages that are mostly pictures or charts: the whole page area. */
export const Wide: Story = { args: { width: "wide", children: <Text>The whole page area.</Text> } }
