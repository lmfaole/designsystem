import type { Meta, StoryObj } from "@storybook/react-vite"

import { TimeField } from "../../../src/components/time-field"

const meta = {
  title: "Components/Forms/TimeField",
  component: TimeField,
  tags: ["autodocs"],
  args: { name: "starts.morgen", label: "Morgenen starter", value: "06:00", hint: "Hele kvarter, for eksempel 06:30." },
  parameters: { docs: { description: { component: `### Use it when

a time of day is chosen: when the parts of the day start.

### Do not use it when

a date or a moment in a calendar (a date field), or a duration.

### Accessibility

**Handled by the component**

- The native time field (the device's own picker), with its label above, the hint and the error tied to it ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), [3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions)).
- An error is in words with a symbol ([3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification)).

**You check**

- The hint says the step when it is not a minute («Hele timer»); the server checks the time again and says what is wrong in the error.

### Content

The label is what starts or ends («Morgenen starter»).

### Related

\`TextField\`, \`NativeSelect\`, \`ToggleMatrix\`` } } },
} satisfies Meta<typeof TimeField>
export default meta
type Story = StoryObj<typeof meta>

/** A quarter-hour time. */
export const Default: Story = {}

/** Whole hours only. */
export const WholeHours: Story = { args: { name: "starts.kveld", label: "Kvelden starter", value: "17:00", step: 3600, hint: "Hele timer." } }

/** The server found an error. */
export const WithError: Story = { args: { value: "10:00", error: "Morgenen må starte før arbeidsdagen (08:00)" } }
