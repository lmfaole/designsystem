import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "../../src/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "../../src/components/ui/button-group"

const meta = {
  title: "Primitives/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  subcomponents: { ButtonGroupText, ButtonGroupSeparator },
  args: { children: [<Button key="a" variant="outline">Dag</Button>, <Button key="b" variant="outline">Uke</Button>, <Button key="c" variant="outline">Måned</Button>] },
} satisfies Meta<typeof ButtonGroup>
export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {}
export const WithText: Story = { render: () => <ButtonGroup><ButtonGroupText>Sorter</ButtonGroupText><ButtonGroupSeparator /><Button variant="outline">Navn</Button></ButtonGroup> }
export const Vertical: Story = { args: { orientation: "vertical" }, decorators: [(Story) => <div className="w-fit"><Story /></div>] }
