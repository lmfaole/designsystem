import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "../../../src/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../src/components/ui/card"

const meta = {
  title: "Components/Layout/Card",
  component: Card,
  tags: ["autodocs"],
  subcomponents: { CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter },
  parameters: { docs: { description: { component: `### Use it when

one self-contained item, such as a chart in a \`ChartCard\`.

### Do not use it when

grouping things that belong together (space groups, not boxes) or a list (\`Rows\`).

### Accessibility

**Handled by the component**

- Plain \`div\`s with no role added, so the card is read as its contents, in source order ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence))
- Text colours are the card's theme tokens (\`card-foreground\`, \`muted-foreground\`) ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum))

**You check**

- \`CardTitle\` is a \`div\`: put a \`Heading\` in it at the right level ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- The card is not a link as a whole; the link is the title or an action inside it ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))
- An action in \`CardAction\` names what it does to the card's thing ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels))

### Content

A title that names the thing.

### Related

\`ChartCard\`, \`PictureCard\`, \`PageSection\`` } }, },
} satisfies Meta<typeof Card>
export default meta
type Story = StoryObj<typeof meta>

/** Every part of a card: header with title, description and action, content and footer. */
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
/** The small size, with tighter spacing. */
export const Small: Story = { args: { size: "sm" }, render: Default.render }
