import type { Meta, StoryObj } from "@storybook/react-vite"

import { Time } from "../../src/components/time"

const meta = {
  title: "Typography/Time",
  component: Time,
  tags: ["autodocs"],
  args: { value: "2026-11-19T09:00:00Z", now: new Date("2026-11-19T12:00:00Z") },
  parameters: { docs: { description: { component: `\`**Use it when** a moment is shown: when something happened or will happen.

**Do not use it when** the date is the content (a release date in a table of releases): use \`format="date"\` there.

**Accessibility.** Renders \`<time datetime>\` with the exact time in the title. \`now\` is passed in, never read in the component, so the server and the browser tell the same story and a first render has no clock in it.

**Content.** Relative under seven days («for 3 timer siden», «i går»), a date from then on («2. nov. 2026»); Norwegian bokmål and Oslo time. Add the exact time (\`format="datetime"\`) where relative is not enough.

**Related.** \`CountUp\`, \`DatedEntry\`` } } },
} satisfies Meta<typeof Time>
export default meta
type Story = StoryObj<typeof meta>

export const Recent: Story = {}
export const Yesterday: Story = { args: { value: "2026-11-18T12:00:00Z" } }
export const Older: Story = { args: { value: "2026-11-02T10:30:00Z" } }
export const Datetime: Story = { args: { format: "datetime" } }
export const Future: Story = { args: { value: "2026-11-19T14:00:00Z" } }
