import type { Meta, StoryObj } from "@storybook/react-vite"

import { BrandIcon } from "../../../src/components/brand-icon"
import { Inline } from "../../../src/components/layout"
import { Text } from "../../../src/components/text"
import { BRAND_MARKS, type BrandName } from "../../../src/lib/brand-marks"

const meta = {
  title: "Foundations/Icons/BrandIcon",
  component: BrandIcon,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: `### Use it when

A link goes to a service a reader knows by its mark: GitHub, Spotify, Bluesky, Mastodon, Steam, PlayStation, Last.fm, Trakt, TMDB, Yr, Entur, OpenStreetMap; or a source is named with its mark (\`SourceList\`).

### Do not use it when

The thing is a meaning, not a service (\`Icon\`), or the service is not in the closed set (use its name in words; LinkedIn is not in Simple Icons any more).

### Accessibility

**Handled by the component**

- By default \`role="img"\` named with the service's name, as the service writes it ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- \`decorative\` hides it (\`aria-hidden\`), for when the words beside it name the service ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- It is drawn in \`currentColor\`, so it keeps the contrast of its text and shows in forced colours ([1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))

**You check**

- Use \`decorative\` only when the words beside it already name the service ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- A link that is only the mark says where it goes through that name; add words when the place is more than the service ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))
- The link around it is at least 24 by 24px ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum))

### Content

The name of the service, as the service writes it.

### Related

\`Icon\`, \`ExternalLink\`, guide «Colour and state»` } } },
} satisfies Meta<typeof BrandIcon>
export default meta
type Story = StoryObj<typeof meta>

/** One mark, named for a screen reader. */
export const Default: Story = { args: { name: "github" } }

/** Every mark in the closed set, decorative, with its name beside it. */
export const All: Story = {
  args: { name: "github" },
  render: () => (
    <Inline gap="lg">
      {(Object.keys(BRAND_MARKS) as BrandName[]).map((name) => (
        <Inline key={name} gap="xs"><BrandIcon name={name} size="lg" decorative /><Text size="sm">{name}</Text></Inline>
      ))}
    </Inline>
  ),
}
