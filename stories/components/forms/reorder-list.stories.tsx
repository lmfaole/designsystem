import type { Meta, StoryObj } from "@storybook/react-vite"
import { flushSync } from "react-dom"
import { hydrateRoot } from "react-dom/client"
import { renderToString } from "react-dom/server"
import { expect, spyOn, userEvent, waitFor, within } from "storybook/test"

import { ReorderList } from "../../../src/components/reorder-list"
import { Button } from "../../../src/components/ui/button"

const meta = {
  title: "Components/Forms/ReorderList",
  component: ReorderList,
  tags: ["autodocs"],
  args: {
    name: "order",
    legend: "Rekkefølgen på forsiden",
    hint: "Dra i håndtaket, eller bruk pilene.",
    items: [
      { id: "vaer", label: "Været", description: "Akkurat nå og de neste timene.", icon: "weather" },
      { id: "transport", label: "Avganger", description: "Fra holdeplassene nær deg.", icon: "bus" },
      { id: "github", label: "GitHub", description: "Det som har skjedd i repoene du følger.", icon: "pull-request" },
      { id: "kalender", label: "Kalender", icon: "calendar" },
      { id: "nyheter", label: "Nyheter", icon: "article" },
    ],
  },
  decorators: [
    (Story) => (
      <form method="post" action="#" onSubmit={(event) => event.preventDefault()} className="grid max-w-xl gap-4">
        <Story />
      </form>
    ),
  ],
  parameters: { docs: { description: { component: `### Use it when

the visitor chooses the order of a short list: the sections of a front page. Five to ten items.

### Do not use it when

which of them are shown (\`CheckboxList\`, beside it), a long list (sort it by a rule instead), or one of a few (\`ChoiceCards\`).

### Accessibility

**Handled by the component**

- A \`<fieldset>\` with its \`<legend>\`, the items an ordered list ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- Every move can be made without dragging: «Flytt Været opp» and «Flytt Været ned» are buttons, named with the item, that keep the focus on the item as it moves ([2.5.7 Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements), [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard)). The handle is for the pointer only and hidden from a screen reader.
- Each move is said politely, «Været flyttet til plass 2 av 5» ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages)).
- The handle and the buttons are at least 36 px ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)); the rows that make room move in the motion tokens' time, at once under reduced motion.
- Without JavaScript the buttons are submit buttons (\`name="move" value="<id>:up|down"\`) and the server moves the item.

**You check**

- The list is in a \`<form>\` that posts to an endpoint that reads \`order\` (comma ids) and, from a button without JavaScript, \`move\`: it saves \`applyMove(order, move)\` (\`lib/reorder\`) and redirects back to the page.
- Read the saved order with \`orderSections(ids, prefs.order)\` (\`lib/preferences\`), so a section that is new comes last and one that is gone is left out.
- In Astro it is an island (\`client:load\`); drawn without, it works as without JavaScript.

### Content

The legend says what is ordered («Rekkefølgen på forsiden»); the labels are the sections' own names.

### Related

\`CheckboxList\`, \`SettingsSection\`, \`ToggleMatrix\`` } } },
} satisfies Meta<typeof ReorderList>
export default meta
type Story = StoryObj<typeof meta>

const order = (canvasElement: HTMLElement) => canvasElement.querySelector<HTMLInputElement>("input[type=hidden][name=order]")?.value

/** Five sections of a front page, with a handle to drag and buttons to move each one a place. */
export const Default: Story = {}

/** On a phone: the handle is for a finger (it does not scroll the page), and the buttons stay beside the name. */
export const Phone: Story = { globals: { viewport: { value: "compact", isRotated: false } } }

/** The keyboard: «Flytt Været ned» moves it, keeps the focus on it, and says where it went; at the end the button is off and the focus moves to the other one. */
export const Keyboard: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const down = await canvas.findByRole("button", { name: "Flytt Været ned" })
    await waitFor(() => expect(down.getAttribute("type")).toBe("button"))
    down.focus()
    await userEvent.keyboard("{Enter}")
    await waitFor(() => expect(order(canvasElement)).toBe("transport,vaer,github,kalender,nyheter"))
    await expect(canvas.getByRole("button", { name: "Flytt Været ned" })).toHaveFocus()
    await waitFor(() => expect(canvasElement.querySelector("[data-reorder-status]")?.textContent).toBe("Været flyttet til plass 2 av 5"))
    await userEvent.keyboard(" ")
    await waitFor(() => expect(order(canvasElement)).toBe("transport,github,vaer,kalender,nyheter"))
    await userEvent.tab({ shift: true })
    await expect(canvas.getByRole("button", { name: "Flytt Været opp" })).toHaveFocus()
    await userEvent.keyboard("{Enter}")
    await userEvent.keyboard("{Enter}")
    await waitFor(() => expect(order(canvasElement)).toBe("vaer,transport,github,kalender,nyheter"))
    await expect(canvas.getByRole("button", { name: "Flytt Været opp" })).toBeDisabled()
    await expect(canvas.getByRole("button", { name: "Flytt Været ned" })).toHaveFocus()
    await expect(canvasElement.querySelector("[data-reorder-status]")?.textContent).toBe("Været flyttet til plass 1 av 5")
  },
}

/** A drag with the pointer: the handle of «Kalender» dragged up past two rows puts it third. */
export const Drag: Story = {
  play: async ({ canvasElement }) => {
    const rows = await waitFor(() => {
      const found = [...canvasElement.querySelectorAll<HTMLLIElement>("li[data-id]")]
      expect(found[0]?.querySelector("[data-reorder-handle]")?.hasAttribute("hidden")).toBe(false)
      return found
    })
    const handle = rows[3]?.querySelector("[data-reorder-handle]")
    const target = rows[1]
    if (!(handle instanceof HTMLElement) || target === undefined) throw new Error("No handle")
    const start = handle.getBoundingClientRect()
    const x = start.left + start.width / 2
    const y = start.top + start.height / 2
    const end = target.getBoundingClientRect().top + target.getBoundingClientRect().height * 0.4
    handle.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, button: 0, pointerId: 1, clientX: x, clientY: y, isPrimary: true }))
    for (let step = 1; step <= 10; step += 1) window.dispatchEvent(new PointerEvent("pointermove", { bubbles: true, pointerId: 1, clientX: x, clientY: y + ((end - y) * step) / 10 }))
    window.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 1, clientX: x, clientY: end }))
    await waitFor(() => expect(order(canvasElement)).toBe("vaer,kalender,transport,github,nyheter"))
    await waitFor(() => expect(canvasElement.querySelector("[data-reorder-status]")?.textContent).toBe("Kalender flyttet til plass 2 av 5"))
  },
}

/** Without JavaScript (the server's markup): no handle, and each button sends the form with `move=<id>:up|down` for the server to apply. */
export const WithoutJavaScript: Story = {
  render: (args) => <div data-host="" dangerouslySetInnerHTML={{ __html: renderToString(<ReorderList {...args} />) }} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const down = canvas.getByRole("button", { name: "Flytt GitHub ned" })
    await expect(down.getAttribute("type")).toBe("submit")
    await expect(down.getAttribute("name")).toBe("move")
    await expect(down.getAttribute("value")).toBe("github:down")
    await expect(canvas.getByRole("button", { name: "Flytt Været opp" })).toBeDisabled()
    await expect(canvasElement.querySelector("[data-reorder-handle]")?.hasAttribute("hidden")).toBe(true)
  },
}

/** Drawn on the server and hydrated: no hydration error, and then enhanced. */
export const Hydrated: Story = {
  render: () => <div data-host="" className="contents" />,
  play: async ({ canvasElement, args }) => {
    const host = canvasElement.querySelector("[data-host]")
    if (!(host instanceof HTMLElement)) throw new Error("No host")
    const page = <ReorderList {...args} name="hydrated" />
    host.innerHTML = renderToString(page)
    const errors: unknown[] = []
    const logged = spyOn(console, "error")
    flushSync(() => {
      hydrateRoot(host, page, { onRecoverableError: (error) => errors.push(error) })
    })
    await waitFor(() => expect(host.querySelector("[data-reorder-list][data-enhanced]")).not.toBeNull())
    await expect(errors).toEqual([])
    await expect(logged).not.toHaveBeenCalled()
    logged.mockRestore()
  },
}

/** In a settings form, with its own «Lagre». */
export const InAForm: Story = {
  render: (args) => (
    <>
      <input type="hidden" name="back" value="/start/innstillinger/forside" />
      <ReorderList {...args} />
      <div>
        <Button type="submit" size="lg">
          Lagre
        </Button>
      </div>
    </>
  ),
}
