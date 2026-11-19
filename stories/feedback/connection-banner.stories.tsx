import type { Meta, StoryObj } from "@storybook/react-vite"

import { ConnectionBanner } from "../../src/components/connection-banner"

const meta = {
  title: "Feedback/ConnectionBanner",
  component: ConnectionBanner,
  tags: ["autodocs"],
  args: {},
  parameters: { docs: { description: { component: `**Use it when** an installed or open page should say that the device is offline. One at the top of the page.

**Do not use it when** a source fails (that part shows its own \`ErrorMessage\`), or to disable anything: offline is not an error and the page on screen is the last one fetched.

**Accessibility.** The live region (\`role="status"\`) is always on the page, so a change is announced once and politely. What it says is a hint: \`navigator.onLine\` only knows that a network exists, not that a source can be reached (MDN), so it is never used to stop anything.

**Content.** «Du er frakoblet. Det du ser er fra sist siden ble hentet.» When the device is back, nothing is said: the notice just goes.

**Related.** \`Banner\`, \`Freshness\`, guide «Fresh data and offline»` } } },
} satisfies Meta<typeof ConnectionBanner>
export default meta
type Story = StoryObj<typeof meta>

export const Online: Story = {}
