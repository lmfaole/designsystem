import type { Meta, StoryObj } from "@storybook/react-vite"

import { UsernameForm } from "../../../src/components/username-form"

const meta = {
  title: "Components/Onboarding/UsernameForm",
  component: UsernameForm,
  tags: ["autodocs"],
  args: {
    title: "Hvem skal vi hente data for?",
    body: "Bare offentlige data vises. Brukernavnet lagres i en informasjonskapsel i denne nettleseren.",
    action: "/start/api/brukernavn",
    back: "/start/github",
    fields: [{ name: "github", label: "GitHub-brukernavn", placeholder: "octocat", autoComplete: "username" }],
  },
  parameters: { docs: { description: { component: `### Use it when

a page shows a person's data and does not yet know whose: ask for the username first, and show nothing personal until it is given.

### Do not use it when

the page needs no name (the weather, the departures), or for a sign-in: this only says whose public data to fetch.

### Accessibility

**Handled by the component**

- A labelled section with a real heading (\`headingLevel\`), found in the outline ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Each field has its label above it, always visible; a placeholder is only an example ([3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions))
- An error is in words beside the field, tied to it with \`aria-describedby\` and \`aria-invalid\` ([3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification))
- No capital letter and no spelling check in a name typed exactly ([3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions))
- A plain form that works without script, sent from the keyboard ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))

**You check**

- The error says what to do («Fant ingen GitHub-bruker med det navnet. Sjekk stavingen.») ([3.3.3 Error Suggestion](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion))
- The name that was typed comes back in the field after an error ([3.3.7 Redundant Entry](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry))

### Content

A question as the title, «Hent data» on the button, and in the body that only public data is shown and where the name is kept.

### Related

\`UserChip\`, \`TextField\`, \`IntroCallout\`` } } },
} satisfies Meta<typeof UsernameForm>
export default meta
type Story = StoryObj<typeof meta>

/** One name, before anything has been given. */
export const Default: Story = {}
/** Two names for one app, the first already given. */
export const TwoServices: Story = {
  args: {
    back: "/historikk",
    action: "/api/brukernavn",
    fields: [
      { name: "lastfm", label: "Last.fm-brukernavn", value: "ole" },
      { name: "trakt", label: "Trakt-brukernavn", hint: "Profilen må være offentlig." },
    ],
  },
}
/** A name the service did not know, sent back with the error beside the field. */
export const WithError: Story = {
  args: { fields: [{ name: "github", label: "GitHub-brukernavn", value: "octocatt", error: "Fant ingen GitHub-bruker med navnet «octocatt». Sjekk stavingen." }] },
}
