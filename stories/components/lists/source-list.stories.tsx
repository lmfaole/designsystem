import type { Meta, StoryObj } from "@storybook/react-vite"

import { SourceList } from "../../../src/components/source-list"

const meta = {
  title: "Components/Lists/SourceList",
  component: SourceList,
  tags: ["autodocs"],
  args: {
    sources: [
      { name: "Last.fm", brand: "lastfm", href: "https://www.last.fm", description: "Det du har spilt og det som spilles nå, hentet på nytt hvert minutt." },
      { name: "Trakt", brand: "trakt", href: "https://trakt.tv", description: "Filmene og episodene du har sett, hentet på nytt hvert femte minutt." },
      { name: "Spotify", brand: "spotify", href: "https://open.spotify.com", description: "Bilder av artister, og lenker til dem på Spotify." },
      { name: "TMDB", brand: "tmdb", href: "https://www.themoviedb.org", description: "Plakater, hvem som er med og fakta om filmer og serier.", credit: "Denne siden bruker TMDB API, men er ikke støttet eller sertifisert av TMDB." },
    ],
  },
  parameters: { docs: { description: { component: `### Use it when

an app says where its data comes from: once, at the foot of «Innstillinger», each source with its mark beside its name, what the app gets from it, and the credit its terms ask for.

### Do not use it when

a page says that a source did not answer or how old its data is (\`Freshness\`, \`ErrorMessage\`), or facts about one thing (\`FactList\`).

### Accessibility

**Handled by the component**

- A real description list: each source a \`dt\`, what it gives a \`dd\` ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- The mark is \`decorative\`: the name beside it says the source, so it is not read twice ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)).
- The name is an \`ExternalLink\`, which says it leaves the site ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)).
- The marks are drawn in the text colour, so they keep its contrast and show in forced colours ([1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)).

**You check**

- A heading before the list («Kilder») ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)).
- Each description says what the app gets, in plain words ([3.1.5 Reading Level](https://www.w3.org/WAI/WCAG22/Understanding/reading-level)).

### Content

The name as the source writes it. The description is one sentence of what it gives; the credit is the words its terms ask for, as they ask for them.

### Related

\`BrandIcon\`, \`FactList\`, \`SettingsSection\`` } } },
} satisfies Meta<typeof SourceList>
export default meta
type Story = StoryObj<typeof meta>

/** Medier's sources: each mark beside its name, and TMDB's sentence as its credit. */
export const Default: Story = {}

/** Startside's: Entur's own mark, and OpenStreetMap's credit. */
export const WithCredits: Story = {
  args: {
    sources: [
      { name: "GitHub", brand: "github", href: "https://github.com", description: "Offentlige pull requests, saker og diskusjoner for brukeren du har valgt." },
      { name: "Entur", brand: "entur", href: "https://entur.no", description: "Stasjoner og avganger." },
      { name: "Yr", brand: "yr", href: "https://www.yr.no", description: "Værdata fra Meteorologisk institutt." },
      { name: "OpenStreetMap", brand: "openstreetmap", href: "https://www.openstreetmap.org/copyright", description: "Navnet på stedet du er.", credit: "© OpenStreetMap-bidragsytere." },
    ],
  },
}
