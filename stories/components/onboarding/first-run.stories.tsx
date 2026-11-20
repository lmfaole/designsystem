import type { Decorator, Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { FirstRun } from "../../../src/components/first-run"
import { FirstRunEnhancer } from "../../../src/components/first-run-enhancer"
import { steps } from "./first-run-steps"

/** A frame the wizard fills (it is fixed to the screen, and a transform makes the frame its screen), so a story shows it as a page would; `parameters.frame` narrows it. */
const frame: Decorator = (Story, { parameters }) => (
  <div className={`relative h-[36rem] overflow-hidden rounded-lg border [transform:translateZ(0)] [&_dialog]:h-full! ${parameters["frame"] === "phone" ? "w-[24rem]" : ""}`}>
    <Story />
  </div>
)

/** Where the stories' wizard asks the server to check a step; `Validation` answers it as a server would. */
const VALIDATE = "/start/api/innstillinger/sjekk"

const meta = {
  title: "Components/Onboarding/FirstRun",
  component: FirstRun,
  tags: ["autodocs"],
  args: {
    open: true,
    title: "Kom i gang",
    action: "/start/api/innstillinger",
    back: "/start",
    steps: steps(),
  },
  argTypes: { steps: { control: false } },
  decorators: [frame],
  render: (args) => (
    <>
      <FirstRun {...args} />
      <FirstRunEnhancer id={args.id ?? "first-run"} modal={false} />
    </>
  ),
  parameters: {
    docs: {
      story: { inline: false, height: "36rem" },
      description: {
        component: `### Use it when

an app is first opened and a few choices make it the visitor's own: whose data, what to show, the theme, the effects, the tilt, installing. It opens on any page while the \`seen\` cookie lacks \`first-run@1\`, drawn \`open\` by the server so nothing flashes, and is gone for good after «Ferdig» or «Hopp over». The same choices are on the settings page (\`SettingsSection\`), with «Vis introen igjen».

Two parts: \`FirstRun\` is the markup, drawn on the server with any fields in its steps; \`FirstRunEnhancer\` (a client island that draws nothing) makes it a wizard by its \`id\`. The steps' \`content\` are the native fields (\`TextField\`, \`ChoiceCards\`, \`CheckboxList\`, \`ListField\`) and the previews (\`ThemeSample\`, \`EffectsPreview\`, \`TiltPreview\`).

**The server.** One form, \`POST\` to \`action\`, with \`back\`, the fields and \`skip=1\` from «Hopp over». It saves the choices (the \`prefs\` cookie: \`lib/preferences\`), marks \`first-run@1\` in \`seen\` and answers \`303\` to \`back\`. With \`validateUrl\`, each step is sent there first with \`validate=<step>\` and \`accept: application/json\`, answered \`{ "errors": { "<field>": "<melding>" } }\` (\`{}\` is fine); the errors stand under the fields and the step stays. Without JavaScript the server checks everything and on an error answers \`303\` back with \`?forste-gang=<step>\` (and the values), so the page draws it open at \`initialStep\` with the errors; add \`#first-run-<step>\` to scroll to it.

### Do not use it when

one page needs one word (use \`IntroCallout\`), or one thing must be known before a page can show anything (use \`UsernameForm\` on that page). Never for news or a sign-in.

### Accessibility

**Handled by the component**

- A labelled \`<dialog>\`; with the enhancer a modal (\`showModal\`): the page behind is inert and does not scroll, focus stays inside ([2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order))
- Each step is a section with a real heading that begins «Trinn 2 av 8»; focus moves to it at each step, so a screen reader reads where it is ([3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions))
- Esc does nothing: leaving is «Hopp over», which tells the server. Enter in a field is «Neste», and «Ferdig» on the last step
- An error from the server is shown in words with a symbol under its field, tied with \`aria-describedby\` and \`aria-invalid\`, and focus moves to the field ([3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification))
- Without JavaScript every step stands under the other, with one «Ferdig»: nothing is lost
- Steps move in from the side they come from, and land at once under \`prefers-reduced-motion\` ([2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions))

**You check**

- Every step can be passed as it is: a sensible default in every field, and nothing required that the visitor may not want to give.
- The server answers \`validate\` quickly, and says what to do in the error.

### Content

A step is a question or a short title («Lyst eller mørkt?»), a sentence on why, and its fields. Six to eight steps at most; welcome first, installing last. The buttons are «Tilbake», «Neste», «Ferdig» and «Hopp over».

### Related

\`FirstRunEnhancer\`, \`SettingsSection\`, \`ChoiceCards\`, \`EffectsPreview\`, \`TiltPreview\`, \`IntroCallout\`, \`UsernameForm\`, \`lib/preferences\`, \`lib/onboarding\``,
      },
    },
  },
} satisfies Meta<typeof FirstRun>
export default meta
type Story = StoryObj<typeof meta>

/** The first step, as a visitor meets it. «Neste» goes on, and «Tilbake» back. */
export const Welcome: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { name: /Trinn 1 av 8\W+Velkommen til Startside/ })).toBeVisible()
    await expect(canvas.queryByRole("button", { name: "Tilbake" })).toBeNull()
    await userEvent.click(canvas.getByRole("button", { name: "Neste" }))
    const second = canvas.getByRole("heading", { name: /Trinn 2 av 8/ })
    await expect(second).toBeVisible()
    await expect(second).toHaveFocus()
    await expect(canvas.getByText("2 av 8")).toBeVisible()
    await userEvent.click(canvas.getByRole("button", { name: "Tilbake" }))
    await expect(canvas.getByRole("heading", { name: /Trinn 1 av 8/ })).toHaveFocus()
  },
}

/** A field, and the server's check of it (`validateUrl`): «Neste» sends the step, and the error stands under the field. */
export const Validation: Story = {
  args: { initialStep: "github", validateUrl: VALIDATE },
  beforeEach: () => {
    const original = globalThis.fetch
    globalThis.fetch = async (input, init) =>
      String(input) === VALIDATE ? Response.json({ errors: { github: "Fant ingen GitHub-bruker som heter «lmfaole». Sjekk stavingen." } }) : original(input, init)
    return () => {
      globalThis.fetch = original
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Neste" }))
    const field = canvas.getByRole("textbox", { name: "GitHub-brukernavn" })
    await waitFor(() => expect(field).toHaveAttribute("aria-invalid", "true"))
    await expect(field).toHaveAccessibleDescription(/Fant ingen GitHub-bruker/)
    await expect(field).toHaveFocus()
    await expect(canvas.getByRole("heading", { name: /Trinn 2 av 8/ })).toBeVisible()
  },
}

/** The effects: the live WebGL sample beside the flat one; the one chosen below is marked, and follows the choice. */
export const Effects: Story = { args: { initialStep: "effekter" } }

/** The theme, each choice drawn by its own tokens. */
export const Theme: Story = { args: { initialStep: "tema" } }

/** The tilt. On a desktop it says so, and the pointer over the surface moves the light, marked as a simulation. */
export const Tilt: Story = { args: { initialStep: "bevegelse" } }

/** The last step: «Ferdig» sends it all. */
export const Last: Story = { args: { initialStep: "installer" } }

/** Dark. */
export const Dark: Story = { args: { initialStep: "tema" }, globals: { theme: "dark" } }

/** On a phone. */
export const Phone: Story = { args: { initialStep: "effekter" }, parameters: { frame: "phone" }, globals: { viewport: { value: "compact", isRotated: false } } }

/** As the server drew it, after an error it found without JavaScript: open at that step with the error under the field. */
export const ServerError: Story = { args: { initialStep: "github", steps: steps({ github: "Fant ingen GitHub-bruker som heter «lmfaole». Sjekk stavingen." }) } }

/** Without JavaScript: every step under the other in one scrolling page, and one «Ferdig». */
export const WithoutJavaScript: Story = { render: (args) => <FirstRun {...args} /> }
