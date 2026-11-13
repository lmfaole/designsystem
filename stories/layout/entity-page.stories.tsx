import type { Meta, StoryObj } from "@storybook/react-vite"

import { EntityPage } from "../../src/components/entity-page"
import { Text } from "../../src/components/text"

const meta = {
  title: "Layout/EntityPage",
  component: EntityPage,
  tags: ["autodocs"],
} satisfies Meta<typeof EntityPage>
export default meta
type Story = StoryObj<typeof meta>

export const WithData: Story = {
  args: { data: { name: "Blade Runner" }, children: (data) => <Text>{(data as { name: string }).name}</Text> },
}
export const NoPage: Story = { args: { data: null, children: () => null } }
