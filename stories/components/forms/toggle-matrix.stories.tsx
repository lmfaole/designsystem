import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"

import { ToggleMatrix } from "../../../src/components/toggle-matrix"

const meta = {
  title: "Components/Forms/ToggleMatrix",
  component: ToggleMatrix,
  tags: ["autodocs"],
  args: {
    legend: "Hva vises når på døgnet?",
    hint: "Kryss av for delene som skal stå på forsiden i hver del av døgnet.",
    namePrefix: "show",
    rows: [
      { id: "vaer", label: "Været" },
      { id: "transport", label: "Avganger" },
      { id: "github", label: "GitHub" },
      { id: "kalender", label: "Kalender" },
      { id: "nyheter", label: "Nyheter" },
    ],
    columns: [
      { id: "morgen", label: "Morgen" },
      { id: "arbeidsdag", label: "Arbeidsdag" },
      { id: "kveld", label: "Kveld" },
      { id: "natt", label: "Natt" },
    ],
    values: { morgen: ["vaer", "transport", "kalender"], arbeidsdag: ["github", "kalender"], kveld: ["vaer", "nyheter"], natt: [] },
  },
  parameters: { docs: { description: { component: `### Use it when

the same short list is switched on or off in each of a few groups: the sections shown in each part of the day.

### Do not use it when

one group (\`CheckboxList\`), more than about five columns (split it into pages), or the cells hold more than yes or no.

### Accessibility

**Handled by the component**

- Native checkboxes in a \`<fieldset>\` with its \`<legend>\`; each column is a group named by the column, each box named by its row, so «Morgen, gruppe; Været, avmerkingsboks» is read in the table and in the list alike ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)).
- On a phone each column is a list of its own under the other, with the names beside the boxes, and nothing scrolls sideways ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)).
- Each cell is the box's label, so the whole cell is the target ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)).
- An error is in words with a symbol, tied to the group ([3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification)).

**You check**

- The server reads \`formData.getAll("<namePrefix>.<columnId>")\` for each column, and a column with none as «none» only from a form that had the matrix.

### Content

The legend asks the question; the rows and the columns are names of a word or two.

### Related

\`CheckboxList\`, \`ReorderList\`, \`SettingsSection\`` } } },
} satisfies Meta<typeof ToggleMatrix>
export default meta
type Story = StoryObj<typeof meta>

/** On a wide screen, a table: the sections down the side, the parts of the day across. */
export const Default: Story = {
  globals: { viewport: { value: "expanded", isRotated: false } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const morning = canvas.getByRole("group", { name: "Morgen" })
    const weather = within(morning).getByRole("checkbox", { name: "Været" })
    await expect(weather).toBeChecked()
    await expect(weather.getAttribute("name")).toBe("show.morgen")
    await expect(weather.getAttribute("value")).toBe("vaer")
    await expect(within(canvas.getByRole("group", { name: "Natt" })).getAllByRole("checkbox").filter((box) => box instanceof HTMLInputElement && box.checked)).toHaveLength(0)
  },
}

/** On a phone each part of the day is a list of its own, under the other. */
export const Phone: Story = { globals: { viewport: { value: "compact", isRotated: false } } }

/** The server found an error. */
export const WithError: Story = { args: { error: "Velg minst én del for hver del av døgnet", values: { morgen: ["vaer"] } } }
