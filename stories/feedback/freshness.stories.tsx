import type { Meta, StoryObj } from "@storybook/react-vite"

import { Freshness } from "../../src/components/freshness"

const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString()

const meta = {
  title: "Feedback/Freshness",
  component: Freshness,
  tags: ["autodocs"],
  args: { at: minutesAgo(1), now: new Date().toISOString(), staleAfterSeconds: 180 },
  parameters: { docs: { description: { component: `**Use it when** a page that renews itself shows when its data was made («Oppdatert 19:27»), usually in the page's lead.

**Do not use it when** the time is part of the content (\`Time\`), or for a change the reader must know about at once (\`Banner\`).

**Accessibility.** A still line, not a live region: the reader finds it and it does not interrupt. Past the threshold it turns into a warning with a symbol and words, never colour alone. \`now\` is the server's time, so the first render is the same on the server and in the browser; after that it follows the device's clock.

**Content.** «Oppdatert 19:27», and past the threshold «Oppdatert 19:27 · dataene kan være gamle». Set \`staleAfterSeconds\` for the source, a few times how often it renews (our own starting point: three renewals for a page).

**Related.** \`Time\`, \`Banner\`, \`ConnectionBanner\`, guide «Fresh data and offline»` } } },
} satisfies Meta<typeof Freshness>
export default meta
type Story = StoryObj<typeof meta>

export const Fresh: Story = {}
export const Stale: Story = { args: { at: minutesAgo(20) } }
