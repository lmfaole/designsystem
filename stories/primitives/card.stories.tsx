import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "../../src/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../src/components/ui/card"

const meta = {
  title: "Primitives/Card",
  component: Card,
  tags: ["autodocs"],
  subcomponents: { CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter },
} satisfies Meta<typeof Card>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>A line under the title.</CardDescription>
        <CardAction><Button size="sm" variant="outline">Action</Button></CardAction>
      </CardHeader>
      <CardContent>Content of the card.</CardContent>
      <CardFooter>Footer</CardFooter>
    </Card>
  ),
}
export const Small: Story = { args: { size: "sm" }, render: Default.render }
