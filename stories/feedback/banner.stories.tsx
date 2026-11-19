import type { Meta, StoryObj } from "@storybook/react-vite"

import { Banner } from "../../src/components/banner"

const meta = {
  title: "Feedback/Banner",
  component: Banner,
  tags: ["autodocs"],
  args: { title: "Dataene er fra i går", children: "Synkroniseringen har ikke gått siden 18. november." },
  parameters: { docs: { description: { component: `\`**Use it when** a message is about the whole page or a whole section: old data, a failed source, a snapshot.

**Do not use it when** the message is about one action or one field (put it next to it), or a query failed (\`ErrorMessage\`). There is no toast and a banner cannot be dismissed.

**Accessibility.** \`info\` and \`warning\` are \`role=status\` (announced politely); \`destructive\` is \`role=alert\` (announced at once) and is only for what stops something. The symbol and the title say what kind it is; colour never carries it alone.

**Content.** A title that says what happened, then what to do, with no «Vennligst», «Beklager» or «Ups». One sentence in the body at most.

**Related.** \`ErrorMessage\`, \`StatusLine\`, \`EmptyState\`` } } },
} satisfies Meta<typeof Banner>
export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {}
export const Warning: Story = { args: { tone: "warning", title: "Data kan være gamle" } }
export const Destructive: Story = { args: { tone: "destructive", title: "Kunne ikke hente pull requests", children: "GitHub svarte 401. Lag en ny token." } }
export const TitleOnly: Story = { args: { children: undefined } }
