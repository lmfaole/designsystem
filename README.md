# designsystem

The design system of lmfaole's apps and pages, in a repository of its own: the theme (colours, radius, fonts, motion), the building
blocks a page is put together from, and the components built on them. React 19 and Tailwind 4, **shipped as source**
(`src/`, TypeScript and CSS): there is no build step and no published package.

It knows nothing about the projects that use it. No app registry, no routes, no data: a component takes what it shows as
props. What is specific to a project (which apps exist, their colours, their pages) lives in that project and builds on this.

## Use it

```jsonc
// package.json: a git dependency, locked to a tag
"@lmfaole/designsystem": "github:lmfaole/designsystem#v1.0.0"
```

```css
/* the project's stylesheet: the tokens, fonts and base styles, and Tailwind told to read this package's classes */
@import "@lmfaole/designsystem/theme.css";
```

```tsx
import { PageColumn, Stack } from "@lmfaole/designsystem/components/layout"
import { Heading, Text } from "@lmfaole/designsystem/components/text"
```

Because it is source inside `node_modules`:

- **Next.js**: add the package to `transpilePackages`.
- **Vite / Astro** must bundle it on the server instead of leaving it external: `vite.ssr.noExternal: ["@lmfaole/designsystem"]`.
- **Tailwind** finds the classes through the `@source` lines of `theme.css`; a project needs none of its own for this package.
- **Node's test runner** does not strip types under `node_modules`, so a test cannot import a module of this package directly.
  Test what the project owns; the modules here have their tests here.

A project without a build step (plain CSS and JS) takes only the tokens: read the two `:root` blocks of `src/theme.css` and the
font files of `@fontsource-variable/geist` and `@fontsource-variable/jetbrains-mono`, as the hjemmeserver app of the Nextcloud
repository does (`scripts/design-tokens.ts` there).

## What is here

| Path | What |
| --- | --- |
| `src/theme.css` | The tokens (`--background`, `--primary`, `--radius`, `--series-*` …), light and dark, the fonts and the base styles. Imports `motion.css`, `shell.css` and `overlay.css`. |
| `src/components/layout.tsx`, `text.tsx` | The building blocks: `Stack`, `Inline`, `Grid`, `PageColumn`; `Text`, `Heading`, `TextLink`. |
| `src/components/page-layout.tsx`, `page-header.tsx`, `page-section.tsx`, `nav-cards.tsx` | The frame and the parts of a page. |
| `src/components/ui/` | Generated shadcn/ui (button, button-group, card, native-select, separator, skeleton, table), exported as `components/<name>`. Add one with `npx shadcn@latest add <component>`; never hand-edit one. |
| `src/components/page-tabs.tsx`, `back-link.tsx`, `summary-bar.tsx`, `link-button.tsx` | Navigation between and into pages. See «Pages and navigation» below. |
| `src/components/icon.tsx`, `status-line.tsx`, `src/lib/icons.ts` | Icons: `Icon` (a meaning from `ICONS`), `StatusLine` (statuses with a symbol), and the register of meanings. See «Icons» below. |
| `src/components/*-chart.tsx`, `chart-frame.tsx` | Charts on TanStack Charts, themed through `chart-frame.tsx`. |
| `src/components/*.tsx` (the rest) | Rows, lists, cards, covers, links, overlays, error pages. |
| `src/lib/` | What the components share: `cn` (`utils`), icons, the page column and the columns of a list (`page-width`), link style, small pure helpers with tests. |

## The rules

1. **A project has no styling of its own.** A page is put together from these components; it writes no `className`, `style`
   or stylesheet. When nothing fits, the markup becomes a component here, named for what it is, never for the project.
2. **Closed props.** A choice is a named variant (`gap: "sm" | "md"`, `tone: "muted"`), never a class handed in. A component
   that still takes `className` keeps it for other components of this package only.
3. **One spacing and type scale.** A gap is `none | xs | sm | md | lg | xl`; text is `Text`'s sizes and `Heading`'s looks.
4. **Motion comes from the tokens** (`--motion-*` in `motion.css`): entrances move and never fade text, and everything is off
   under `prefers-reduced-motion`.
5. **Tokens only.** No colour, radius or font outside `theme.css`.
6. **A select is a native `<select>`.** Every list of choices, short or long (a filter, a period, a month), is `NativeSelect`, so a
   phone shows its own picker and a desktop its own menu. Never a menu drawn in the page: no Radix `Select`, no listbox or
   combobox, no popover or sheet of buttons or links standing in for one. Choosing a value does what the page needs:
   a form submit, or going to an address (`select[data-navigates]`, `enableNavigatingSelects`).
7. **One reading direction: down.** What is read (titles, lists of text, the sections of a page) stands in **one column, under
   each other, in the order it matters**: first the thing that matters most, the rest by priority below it. Never a grid that
   makes the reader read across and then down (a Z-pattern): a row of equal columns puts the order in doubt, hides what comes
   first and gives the eye more to do. The page has a **reading column** (`PageLayout` `width="reading"`, the default: 48rem,
   centred); on a wide screen the rest is **margin, not more columns**. Columns are for what is **looked at and not read**:
   pictures (`Tiles`), charts (`Grid columns="charts"`), cards of equal weight, a few figures and chips, and a `Split` rail of
   *reference* (a cover and its facts) beside the main content; such a page can be `width="wide"`. Do not bring back a list
   in columns, `Grid columns="sections"` or a group that spreads its parts: `src/desktop.test.ts` fails on it. Check a page at
   400, 1440 and 2560 px. See «Reading and hierarchy» below.
8. **Closed by default: data decides.** A component takes no `className` and no `style`, and spreads no `ComponentProps<...>`:
   the look is the component's, not the caller's. Props are closed unions (`tone: "muted"`), never a string of classes. What a
   kind of data implies is derived from the data, not passed: a poster or a square from the picture's kind, a link's look from
   being a name that has a page. A `ReactNode` slot is only for content that is truly free text or another component of this
   package. `src/strict.test.ts` fails on a new open prop; its `ALLOWED` list may only shrink.
   **Cards.** A card (`Card`, `Panel`) is only for one self-contained item that is comparable with its siblings of the same kind
   or clickable as a whole, or a frame around a chart. It needs real content of its own (a picture, figures, facts, a chart)
   and at least two of its kind on the page, or the page's one chart. Everything else is a `PageSection` (a short noun title)
   with a list, a table, a `dl` or `Text`. Cards are not nested. A title is a short noun phrase, not a sentence.
9. English for code and comments; on-screen text in a component is Norwegian (bokmål).
10. **Use icons where they carry meaning, and use them freely there.** A section's title, the kind of a row, a status, an
    action on a button, a page to go to: each is found and understood faster with a symbol beside its words, and the
    components take one (`icon`, `lead="icon"`, `StatusLine`). An icon is a **meaning** from `ICONS` (`lib/icons.ts`), asked
    for with `<Icon name="…" />`; never a `lucide-react` import in a page, never decoration, and never the colour alone
    (a status has a symbol and words). See «Icons» below.
11. **A place is three levels: front page, list, detail, and the front page is a digest.** A front page shows the state in
    counts and the few things that need the reader most, with a link to all of it; a list page holds everything of one kind;
    a detail page one thing, with its own address. **Internal first:** a tap on a row opens the app's own page for it; a link
    out to another site is marked, says where it goes, and comes last. See «Pages and navigation» below.

## Work on it

```sh
npm install
npm run verify      # typecheck, lint and the tests
```

A change is released as a tag: bump `version` in `package.json`, commit, `git tag v<version>`, `git push --follow-tags`, and
raise the tag in the projects that use it (`npm install @lmfaole/designsystem@github:lmfaole/designsystem#v<version>`).
A change that removes or renames a component, a prop or a token is a new major version.

## Grouping sections

Things that belong together (everything about pull requests) are a `SectionGroup` with `SubSection`s inside, so the reader meets them
as one part with one title. The subsections stand **under each other**, in the order they matter (rule 7):

```tsx
<Stack gap="xl">
  <SectionGroup id="pulls" title="Pull requests" icon="pull-request">
    <SubSection id="blocked" title="Blokkert">…</SubSection>
    <SubSection id="ready" title="Klar til merge">…</SubSection>
  </SectionGroup>
  <PageSection id="weather" title="Vær">…</PageSection>
</Stack>
```

The group's title is an `<h2>`, the subsections' `<h3>`s. A section or group that shows only the first of a list has `more`
(«Se alle 14») in its title row.

## Reading and hierarchy

The full guide, with examples, is in Storybook (**Guides / Reading and hierarchy**). The rules:

1. **One direction: down.** Everything that is read stands under each other in one column (`width="reading"`, 48rem, centred).
   Extra width is margin. Columns only for what is *looked at*: pictures, charts, cards of equal weight, a few figures, a
   reference rail (`Split`).
2. **Order is priority.** Top to bottom is most to least important, the same on a phone and a desktop. The layout never reorders
   by convenience; if two things matter equally, one still goes first.
3. **One thing first.** The first thing the eye lands on is the one that matters most on the screen. Not two.
4. **Three levels, visibly different.** Page title, section title, item: each differs in size, weight or case. Add no fourth
   level of emphasis; `destructive` and bold are for what stops something.
5. **Space groups, lines and boxes do not.** Things that belong together are close (`xs`, `sm`); groups are further apart (`lg`,
   `xl`). The gap between sections is always greater than the gap inside one. Rules and cards are for the rare thing that must
   be set apart (see rule 8).
6. **One left edge, a short eye path.** Everything starts at the same left edge; a row's date or count is at the end of the *same
   row*, within a measure the eye can cross (48rem). Prose is 45–75 characters (`max-w-prose`).
7. **Rows are scanned down the left.** Each row starts with the same thing (the kind, then the name); the name is the strongest
   part, the rest is `muted` and small. Rows of one list have one structure.
8. **Do not make the reader choose a path.** One column is one path. Do not put two lists side by side to be compared (that is a
   table); do not hide the rest behind tabs when it fits under.
9. **Short before long.** A summary and the few that matter first; the long list after (the front page and the list page).

## Skills

The rules are also written as **Claude Code skills** (`.claude/skills/`), so a session that builds or changes a page follows them
without being reminded:

| Skill | For |
| --- | --- |
| `designsystem-ux` | The structure of pages: levels, the front page as a digest, lists and details, links, navigation, states |
| `designsystem-ui` | The look: layout, type, colour and state, cards, icons, density, motion |
| `designsystem-hierarchy` | Reading and hierarchy: one column, order is priority, one thing first, space not boxes |
| `designsystem-accessibility` | WCAG 2.2 AA: semantics, keyboard, contrast, icons, tables, live updates, how to check |
| `designsystem-content` | The words: Norwegian bokmål, titles, controls, states, dates and numbers |
| `designsystem-components` | Which component for what, and how to add or release one |
| `designsystem-review` | A checklist across all of them, run before work is called done |

They are used in this repository as they are. **In a project that uses the design system**, install them with
`npx designsystem-skills` (copies the `designsystem-*` folders into the project's `.claude/skills/`, never touching its own;
commit the result) and keep them current with `npx designsystem-skills --check` after upgrading the design system.
`src/skills.test.ts` fails if a skill's header is wrong or it names a component that no longer exists.

## Pages and navigation

The full guide, with live examples, is in Storybook (**Guides / Pages and navigation**). The rules:

**Three levels, no more.** Front page → list → detail. A fourth level means the structure is wrong.

| Level | It is | It answers |
| --- | --- | --- |
| Front page | A **digest**: the state in counts, then the few things that need you most | Do I have to do something now? |
| List | **Everything** of one kind, in groups by what needs you most | What is there? |
| Detail | **One thing**, enough to decide what to do without leaving | What is this, and what do I do? |

**The front page is a digest.**
1. **Summary first:** a `SummaryBar` of counts, each a link to what it counts, before any list.
2. **A few, by need:** three to five items per section, in the order of what needs the reader (blocked before waiting), then
   `more` («Se alle 14») on the section. Never the whole list.
3. **One screen of what matters**, two at most on a phone. A section with nothing for the reader shows one quiet line, never an
   empty box.
4. **Complete at rest:** what matters is visible without a click; «Se alle» is navigation, never a «vis mer» that opens in place.
5. **State in form:** a symbol and words; `destructive` only for what stops something.

**A detail page** has an address of its own and this anatomy: `BackLink` (names the list) → `PageHeader` (title, one line of
where it is from) → `StatusLine` → what it is (an excerpt, a `FactList`) → what happened last → actions → **the link out, last**.
It is never only a dialog.

**Links.** Internal first: a row's name links to the app's own page when there is one. A link out (`ExternalLink`,
`LinkButton external`) carries the external symbol, is read as external, names the place («Åpne på GitHub», never «Les mer»), and
comes last, once for each place. A credit in running text («Værdata fra Yr») is an `ExternalLink`. Links open in the same window.

**Navigation.** `PageTabs` between sibling pages, in the same order on every page of the set, the current one marked, a count
after a name where there is something to count; at most six. `BackLink` one level up on every detail page.

| Component | For |
| --- | --- |
| `SummaryBar` | The state of a place in counts that are links; first on a front page |
| `PageTabs` | The way between sibling pages |
| `BackLink` | One level up, naming where |
| `more` on `PageSection`, `SubSection`, `SectionGroup` | «Se alle 14» in a section's title row |
| `LinkButton` | An action that goes somewhere; `external` for a link out |
| `ExternalLink` | A link out in running text, always marked |

## Icons

**Use an icon wherever it makes something quicker to find or to understand.** The design system makes it the easy way: an
icon is a *meaning* you ask for, and the components that show titles, rows, statuses, actions and errors take one.
The full guide, with the catalogue of every meaning, is in Storybook (**Icons / Guide** and **Icons / Catalogue**).

```tsx
import { Icon } from "@lmfaole/designsystem/components/icon"
import { StatusLine } from "@lmfaole/designsystem/components/status-line"

// A section's title, and the kind of each row
<SectionGroup id="pulls" title="Pull requests" icon="pull-request">
  <SubSection id="blocked" title="Blokkert" icon="warning">
    <Rows lead="icon" rows={[{ key: "1", icon: "pull-request", iconLabel: "Pull request", body: "…", trailing: "i dag" }]} />
  </SubSection>
</SectionGroup>

// A status: a symbol and its words, so it reads the same without colour
<StatusLine items={[{ text: "Tester feilet", icon: "failure", tone: "destructive" }, { text: "Godkjent", icon: "success" }]} />

// An action
<Button variant="outline"><Icon name="refresh" slot="start" />Oppdater</Button>
```

| Where | How |
| --- | --- |
| A section's title | `icon` on `PageSection`, `SectionGroup`, `SubSection` |
| The kind of a row | `Rows` with `lead="icon"`; `icon`, `iconLabel`, `iconTone` per row |
| A status | `StatusLine`, an `icon` per item; `destructive` is for what stops something |
| An action | `<Icon name="…" slot="start" />` (or `"end"`) inside a `Button`; an icon-only button needs an `aria-label` |
| A page to go to | `icon` on a `NavCards` link |
| An error | `ErrorMessage` has one |

- **Meanings, not glyphs.** `ICONS` in `src/lib/icons.ts` names icons for what they *mean* (`merge`, `waiting`, `failure`,
  `place`, `weather`), so two pages that mean the same thing show the same symbol and changing a glyph is one line. Look for
  the meaning there first; add one (under its group, and to the Catalogue story, which does not compile until it is there)
  only when a page needs one that is not.
- **Where not:** decoration (an icon that means nothing), the same icon on every row of a list (use it to tell kinds and
  states apart), and an unlabelled icon where it is ambiguous. There is no green: a good status is plain, one that stops
  something is `destructive`.
- **Accessibility.** Decorative by default (`aria-hidden`); give `label` where an icon stands alone and carries the meaning.
  A status never relies on colour alone.
- **Enforced:** `src/lib/icons.test.ts` fails on a `lucide-react` import outside `lib/icons.ts` and `ui/`, on two meanings
  sharing a glyph, and on an `Icon` that is not hidden by default or that takes a class.

## Migrating to 6.0

6.0 makes the reading direction «down» the rule (rule 7). **Breaking:**

| 5.x | 6.0 |
| --- | --- |
| Lists of rows (`Rows`, `PictureRows`, `EntityRows`), `HeadlineList`, `StoryList`, `FoldList` and `EntryList` flowed into several columns on a wide screen | One column, under each other. `LIST_COLUMNS` (`lib/page-width`) is gone |
| `Grid columns="sections"` | Removed: stack the sections (`Stack`); put what belongs together in a `SectionGroup` |
| `SectionGroup width="row"` / `"cell"` | `width` is gone: the subsections always stand under each other |
| A page filled the whole page area | `PageLayout` and `PageColumn` have `width="reading"` (the default: 48rem, centred); use `width="wide"` for a page that is mostly pictures or charts |

Pictures (`Tiles`), charts, `Grid` counts, `NavCards` and `Split` are unchanged: they are looked at, not read.

## Migrating to 5.4

Additive: the skills (above) and the `designsystem-skills` command.

## Migrating to 5.3

5.3 is additive, with one visible change: **`ExternalLink` now always carries the external symbol** and is read as external
(it left the reader to guess before). New: `PageTabs`, `BackLink`, `SummaryBar`, `LinkButton`, `more` on the section
components, the `back` icon, and the rules above.

## Migrating to 5.2

5.2 is additive: `Icon`, `StatusLine`, the `ICONS` register, `icon` on `PageSection`/`SectionGroup`/`SubSection`,
`Rows` `lead="icon"`, and an icon in `ErrorMessage` (a warning symbol in front of its text). `NavCards` links take an
`IconName` as well as an icon component (prefer the name). A page that imports from `lucide-react` should import from
`lib/icons` instead, or better ask for a meaning with `<Icon name="…" />`.

## Migrating to 5.0

5.0 removes what was specific to one kind of content (music, film, CVs) or to one framework, and leaves general building blocks.
Pictures and links are plain addresses: resolving a base path is the project's, not a component's.

| 4.x | 5.0 |
| --- | --- |
| `Cover` (`url`) | `Picture` (`src`) |
| `MediaRows` (`cover`, `subtitle`, `when`), `TrackRows` | `PictureRows` (`picture`, `detail`, `aside`); a track is a title with a `detail` of artist and album |
| `Gallery` (`slug`, `link` render prop, `year`, `meta`) | `Tiles` (`href`, `detail`, `lines`) |
| `CreatorLogo`, `CreatorLogos` (`names` + `logos` map) | `Logo` (`src`), `Logos` (`logos: {name, src}[]`) |
| `BackdropCard` | `PictureCard` |
| `CoverLightbox` | `ImageLightbox` |
| `PageLinks` (`to`, app base, Astro prefetch, left-out pages) | `NavCards` (`href`; leave out the current page yourself) |
| `CvSection`, `CvList`, `CvEntry`, `CvEmployer`, `CvRole`, `CvProjects`, `CvProject`, `CvLinkList`; `CvNote` | `EntrySection`, `EntryList`, `DatedEntry`, `EntryGroup`, `GroupItem`, `SubItems`, `SubItem`, `LinkItems`; `Text size="sm" tone="muted"` |
| `EntityRow` `loved` | removed |
| `EntityPage`, `lib/base-url` (`appUrl`) | removed |
