---
name: designsystem-components
description: Use when choosing which design system component to use for something, or when adding or changing a component, an icon meaning, a story or a release in the design system repository. Covers the catalogue by purpose, the closed-props rules, tests, stories, README and versioning.
---

# Components: choose, and extend

## Look a component up

- **The catalogue as data:** <https://lmfaole.github.io/designsystem/manifests/components.json> (every component: its description, props with
  types and JSDoc, and the code of each story) and `…/manifests/docs.json` (the guides). Read it before guessing a prop.
- **In this repository**, with `npm run storybook` running, the `storybook` MCP server (`.mcp.json`, `@storybook/addon-mcp`) lists
  components and docs, previews stories and runs their tests (`test-run`).

## Choose by purpose

| You need | Use |
| --- | --- |
| Things under each other (text, lists, sections) | `Stack`; short things in a line `Inline` |
| Things that are LOOKED AT in columns | `Grid` (`tiles`, `cards`, `charts`, a count), `Tiles`; a pane beside the main content `Split` (`position` start or end) in a `PageLayout width="pane"` |
| The page frame, its title | `PageLayout`, `PageColumn`, `PageHeader` |
| A titled part of a page | `PageSection`; a set that belongs together `SectionGroup` + `SubSection`; a link to all of it: `more` |
| Text, a heading, a link | `Text`, `Heading`, `TextLink`; out to another site `ExternalLink`, `LinkButton external` |
| Text written in Markdown (a description, a comment) | `Markdown`, never HTML inserted; `size="sm"` for a comment |
| A list of things | `Rows` (icon / rank / poster lead), `PictureRows`, `EntityRows`, `Tiles`, `HeadlineList`, `StoryList`, `DatedLinkTable` |
| Terms and their values (facts about one thing) | `FactList`: one value or several stacked under one term; links on a line `LinkList` |
| A status | `StatusLine` (under a title), `Badge` (next to a name in a row); a count that links `SummaryBar` |
| A message about a page or section | `Banner`; a failed query `ErrorMessage`; nothing to show `EmptyState` |
| Fresh data, offline, streamed parts | `Freshness` (when it was made, and when it is old), `ConnectionBanner`, `StreamedSection` with `SectionSkeleton` |
| A time | `Time` (relative when recent, a date later, the exact time always at hand) |
| Code | `Code` (inline or a block), `CopyButton` for a value to copy; long content out of the way `Disclosure` |
| A form (rare) | `TextField`, `SearchField`, `FormErrorSummary`; a choice from a list `NativeSelect`; a sort `SortHeader` |
| A number's shape over time | `Sparkline` beside the number; a chart `AreaChart`, `ColumnChart`, `RankedBarChart`, `StackedColumnChart`, `DonutChart` in a `ChartCard` |
| A relation, a distribution, a rhythm or a change | `ScatterChart` (two measures), `Histogram` (many values of one thing), `BoxPlot` (spread of several groups), `CalendarHeatmap` (days), `Heatmap` (two categories), `DumbbellChart` (two moments) |
| A value against a goal | `Progress`; pages of a long list with addresses `Pagination` |
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
2. Add a story in `stories/<group>/<name>.stories.tsx` and, if it is a new idea, mention it in the right **Guide**. A story file:
   - CSF 3 with `satisfies Meta<typeof X>`, `args` on the meta for the default, the story Default first, then **one story per variant and per state**
     a page meets (Empty, Loading, Error, a long text, ShowTable), named for what it shows;
   - the description in the template: **Use it when**, **Do not use it when**, **Accessibility**, **Content**, **Related**;
   - `args` for what a page passes, `render` only where a story needs state or other components, never a styling of its own;
   - a **`play` test** for anything that reacts (a toggle, an overlay, a fold): it does what a reader does (`userEvent`, by role and name)
     and checks the result and the state a screen reader hears (`aria-pressed`, `open`, focus back). A browser's own key handling (Esc in
     a dialog, Enter on a summary) is not simulated: click, and check focus with Tab;
   - **each story says why it exists** in a JSDoc line above it (the docs page and the manifest show it): what a reader sees here that the
     others do not show;
   - a rule that is easy to break gets a **do and a don't as stories**: `Dont…` (its JSDoc starts with «**Ikke:**», says what goes wrong and
     names the right way; tagged `!manifest`, so no agent copies it) and `Do…` right after it («**Gjør:**»);
   - the **Accessibility** section says what the component handles and then what the page must still check («You check»), each point with
     its WCAG 2.2 criterion where there is one;
   - the component's JSDoc is its description in the docs and the manifest: say what it is for in the first sentence; give each prop a
     JSDoc line. A component on its way in or out is tagged `experimental` or `deprecated` (hidden in the sidebar by default) and `!manifest`;
   - every story is a test: `npm run test:stories` renders each in Chromium in the light and the dark theme, runs its `play` and fails
     on an axe violation (`a11y: { test: "error" }`). Fix the component, never turn the check off for a story.
3. Add a test if it carries a rule (`src/*.test.ts` reads the source and pins it).
4. Update the README (the table of what is here, the rules if it adds one) and the migration notes.
5. `npm test`, `npm run test:stories` and `npm run build-storybook` must pass. CI also compares every story's picture with the
   reference it keeps (`.github/workflows/visual.yml`); a change that is meant to look different is followed by a run of that workflow
   by hand with «update», which commits the new references (never make them on a laptop: its fonts draw other pixels). Look at the story with the toolbar's **Tema** «Begge» (light
   and dark side by side), **Skjermlesertekst** «Synlig» (what a screen reader hears, drawn dashed) and **Viewport** (the five width classes
   of the guide «Wide screens»).

## Add an icon meaning

The set is **complete on purpose**: a read-mostly dashboard's meanings (work, state, people and time, place and weather, getting around, content, home and devices, money, data, actions, direction) are all there, so a page never waits for an icon. Look in the Catalogue first.
If a meaning really is missing, **add it at once**, without waiting for a second use: put it in its group in `scripts/icon-set.mjs` (named for the meaning, one Lucide glyph for it) and run `npm run icons`; the Catalogue, the types and the tests follow. Two meanings may not share a glyph, and a glyph with no meaning is decoration and does not belong.

## Release

Additive change → minor version (`5.3.0`); breaking → major, with a «Migrating to X» section in the README. Push to `main`,
tag `vX.Y.Z` (`git tag vX.Y.Z && git push origin vX.Y.Z`); projects pin a tag or a commit.

## Server and client

A component renders on the server by default. One that uses a hook or a handler starts with `"use client"` (a test checks this) and its first render matches the server: no clock, random number or `window` in render, and time is passed in (`now`). Client components: `ChartFrame`, `CommandButton`, `CopyButton`, `FormErrorSummary`, `Freshness`, `ConnectionBanner`, `Overlay`, `SegmentedToggle`, `VirtualTbody`. Guide: **Server rendering**.
