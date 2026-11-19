---
name: designsystem-components
description: Use when choosing which design system component to use for something, or when adding or changing a component, an icon meaning, a story or a release in the design system repository. Covers the catalogue by purpose, the closed-props rules, tests, stories, README and versioning.
---

# Components: choose, and extend

## Choose by purpose

| You need | Use |
| --- | --- |
| Things under each other (text, lists, sections) | `Stack`; short things in a line `Inline` |
| Things that are LOOKED AT in columns | `Grid` (`tiles`, `cards`, `charts`, a count), `Tiles`; a rail of reference `Split` |
| The page frame, its title | `PageLayout`, `PageColumn`, `PageHeader` |
| A titled part of a page | `PageSection`; a set that belongs together `SectionGroup` + `SubSection`; a link to all of it: `more` |
| Text, a heading, a link | `Text`, `Heading`, `TextLink`; out to another site `ExternalLink`, `LinkButton external` |
| Text written in Markdown (a description, a comment) | `Markdown`, never HTML inserted; `size="sm"` for a comment |
| A list of things | `Rows` (icon / rank / poster lead), `PictureRows`, `EntityRows`, `Tiles`, `HeadlineList`, `StoryList`, `DatedLinkTable` |
| Terms and their values (facts about one thing) | `FactList`: one value or several stacked under one term; links on a line `LinkList` |
| A status | `StatusLine` (under a title), `Badge` (next to a name in a row); a count that links `SummaryBar` |
| A message about a page or section | `Banner`; a failed query `ErrorMessage`; nothing to show `EmptyState` |
| A time | `Time` (relative when recent, a date later, the exact time always at hand) |
| Code | `Code` (inline or a block); long content out of the way `Disclosure` |
| The way between pages | top-level pages `NavBar` (bar at the foot on a phone, rail from tablet width; given to `PageLayout` as `nav`); where you are and the way back `Breadcrumbs`; the pages under this page `SubPages`; narrowing a list `FilterChips`; a view switch `SegmentedToggle` |
| An icon | `Icon` (a meaning from `ICONS` in `src/lib/icons.ts`) |
| A picture | `Picture`, `PictureCard`, `ImageLightbox`, `Logo`, `Logos` |
| A person named (reviewers, authors, who wrote last) | `Person`: the name with their round picture beside it |
| A card | `Card` (see the cards rule), `ChartCard` for a chart |
| A chart | `AreaChart`, `ColumnChart`, `StackedColumnChart`, `DonutChart`, `RankedBarChart`, in a `ChartFrame` |
| An error, not found | `ErrorMessage`, `ErrorPage`, `NotFoundPage`, `ServerErrorPage` |
| A dialog, a sheet, a popover | `Overlay`, `CommandButton` |
| A choice from a list | `NativeSelect`, never a drawn menu; switching period `PeriodPicker` |
| Dated entries (a CV, a history) | `EntrySection`, `EntryList`, `DatedEntry`, `EntryGroup`, `GroupItem` |
| Motion | `Reveal`, `Stagger`, `CountUp` (tokens only) |

If the thing is not here, **add a component**; do not style in the project.

## Rules every component keeps

1. **Closed props.** A choice is a named variant (`gap: "sm"`, `tone: "muted"`), never a class or a style. No `className`, `style` or
   `ComponentProps<…>` props (`src/strict.test.ts` fails on them).
2. **Data decides.** What a kind of data implies is derived from the data, not passed.
3. **Tokens only** for colour, radius, font, motion. English in code, Norwegian on screen.
4. **Server-renderable** unless it needs state: no hook, no `"use client"` in a component that can be plain.
5. **Icons** come from `src/lib/icons.ts` by meaning; no `lucide-react` import outside it and `ui/`.
6. **Accessible** (see **designsystem-accessibility**) and **content-checked** (see **designsystem-content**).
7. **One reading direction: down.** Text, lists and sections stand under each other in the reading column; columns only for what is looked at. `src/desktop.test.ts` pins this (see **designsystem-hierarchy**).

## Add or change a component

1. Make it in `src/components/<name>.tsx`; export it (`exports` in `package.json` already maps `./components/*`).
2. Add a story in `stories/<group>/<name>.stories.tsx` (autodocs, one story per variant) and, if it is a new idea, mention it in the
   right **Guide**.
3. Add a test if it carries a rule (`src/*.test.ts` reads the source and pins it).
4. Update the README (the table of what is here, the rules if it adds one) and the migration notes.
5. `npm run verify` (typecheck, lint, tests) and `npm run build-storybook` must pass. Look at the story in light and dark and at
   400 px.

## Add an icon meaning

Look in the Catalogue first. If it is missing, add it to `ICONS` in `src/lib/icons.ts`, named for the **meaning**, under its group,
and to the Catalogue story (it does not compile until it is there). Two meanings may not share a glyph.

## Release

Additive change → minor version (`5.3.0`); breaking → major, with a «Migrating to X» section in the README. Push to `main`,
tag `vX.Y.Z` (`git tag vX.Y.Z && git push origin vX.Y.Z`); projects pin a tag or a commit.
