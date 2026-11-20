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
font files of `@fontsource-variable/atkinson-hyperlegible-next` and `@fontsource-variable/atkinson-hyperlegible-mono`, as the hjemmeserver app of the Nextcloud
repository does (`scripts/design-tokens.ts` there).

## What is here

| Path | What |
| --- | --- |
| `src/theme.css` | The tokens (`--background`, `--primary`, `--radius`, `--series-*` …), light and dark, the fonts and the base styles. Imports `motion.css`, `shell.css` and `overlay.css`. |
| `src/components/layout.tsx`, `text.tsx` | The building blocks: `Stack`, `Inline`, `Grid`, `PageColumn`; `Text`, `Heading`, `TextLink`. |
| `src/components/page-layout.tsx`, `page-header.tsx`, `page-section.tsx` | The frame and the parts of a page. |
| `src/components/ui/` | Generated shadcn/ui (button, button-group, card, native-select, separator, skeleton, table), exported as `components/<name>`. Add one with `npx shadcn@latest add <component>`; never hand-edit one. |
| `src/components/nav-bar.tsx`, `breadcrumbs.tsx`, `sub-pages.tsx`, `summary-bar.tsx`, `link-button.tsx` | Navigation between and into pages. See «Pages and navigation» below. |
| `src/components/icon.tsx`, `status-line.tsx`, `src/lib/icons.ts` | Icons: `Icon` (a meaning from `ICONS`), `StatusLine` (statuses with a symbol), and the register of meanings; `brand-icon.tsx`, `src/lib/brand-marks.ts`: `BrandIcon`, the mark of GitHub, Spotify, Bluesky, Mastodon, Steam or PlayStation for a link there. See «Icons» below. |
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

A change is released by bumping `version` in `package.json` and pushing to `main`: CI checks it (`tsc`, the tests), Storybook is published, and the workflow `tag.yml` tags the commit `v<version>` when that version has no tag yet. A project then runs **`npx designsystem-bump`** (the latest `main`, or a commit or `v<version>` as its argument): it pins the same commit in every `package.json` of the repository, brings the lockfile in step, installs the skills again and checks them, so the project never follows the rules of an older version without anyone seeing it. `--dry-run` says what would change.

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

The full guide, with examples, is in Storybook (**Patterns / Reading and hierarchy**). The rules:

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

The full guide, with live examples, is in Storybook (**Patterns / Pages and navigation**). The rules:

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

**A detail page** has an address of its own and this anatomy: `Breadcrumbs` (the parent is the way back on a phone) → `PageHeader` (title, one line of
where it is from) → `StatusLine` → what it is (an excerpt, a `FactList`) → what happened last → actions → **the link out, last**.
It is never only a dialog.

**Links.** Internal first: a row's name links to the app's own page when there is one. A link out (`ExternalLink`,
`LinkButton external`) carries the external symbol, is read as external, names the place («Åpne på GitHub», never «Les mer»), and
comes last, once for each place. A credit in running text («Værdata fra Yr») is an `ExternalLink`. Links open in the same window.

**Navigation.** `NavBar` between the top-level places of an app, given to `PageLayout` as `nav`: a **bar at the foot of the screen on a
phone** (an icon over a one-word label, in the reach of the thumb) and a **rail down the left side from tablet width up**. Three to
five places, the same order on every page, the current one marked (`aria-current="page"`); on a detail page the list it belongs to
is the current place. It is **navigation, not tabs**: tabs switch between views of the *same content on one page* (GOV.UK: tabs
"switch views within a page", service navigation "links across a service"; Material 3: a navigation bar and a rail for top-level
places, tabs for secondary content), and the design system hides no content in tabs, so there is no tabs component.

**Where an app's pages are shown (one model for every app).** Under the hub there are three levels: the app's front page → a page →
a subpage or a detail.

| Where | What |
| --- | --- |
| An app's top-level pages (front page, Status, AdGuard …) | `NavBar` (bar at the foot on a phone, rail from tablet width); at most five |
| Every page that has a parent (a subpage, a detail, and a page of an app that belongs to a group) | `Breadcrumbs` at the top: the whole trail from tablet width, the parent alone as a way back on a phone. A page with nothing above it (a standalone app's front page) has none |
| A page that has subpages | `SubPages` under the title: a list in ONE column (icon, name, one line of what is on it), never cards or buttons |
| Moving between apps | The first crumb is the group (`Hjem`, `Medier`) and links to the page that lists its apps |

The breadcrumbs say *where*, the title says *what*: do not repeat a page's title in a second heading. There is no side menu and no
grid of cards for pages.

| Component | For |
| --- | --- |
| `SummaryBar` | The state of a place in counts that are links; first on a front page |
| `NavBar` | The way between the top-level places: a bar at the foot on a phone, a rail at the left from tablet width |
| `Breadcrumbs` | Where the page is, on every page below the top level; the parent alone as a way back on a phone |
| `SubPages` | The pages under this page, as a list (icon, name, one line) under the title |
| `Person` | A person's name with their round picture beside it: in a list of facts (several reviewers), a comment, a row |
| `more` on `PageSection`, `SubSection`, `SectionGroup` | «Se alle 14» in a section's title row |
| `LinkButton` | An action that goes somewhere; `external` for a link out |
| `ExternalLink` | A link out in running text, always marked |

## Description lists

`FactList` is a description list (`<dl>`): a **term** and what belongs to it. A term has **one value or several**, and several things
of one kind are several values of *one* term, each on a line of its own, under the term, which is written once:

```tsx
<FactList
  facts={[
    ["Gren", "refactor/textarea-forenkling → main"],
    ["Venter på review fra", ["zenabii", "kristianulv23", "Stormoen"]], // three lines under one term
    ["Reviews", ["copilot: kommenterte", "piofinn: godkjent"]],
    ["Tildelt", []], // nothing: the term is left out
  ]}
/>
```

- **Several of a kind stack.** Reviewers, assignees, labels, branches, tags, authors: each a value of its term, under each other. Never
  `"a, b, c"` in one line: a list is scanned down, a sentence is read along, and a long name wraps in the middle of the line.
- **One term, written once.** Do not repeat the label on every line, and do not make several terms of one kind («Reviewer», «Reviewer»).
- **Terms without a value are left out**, and so is the list when none is left. Do not write «Ingen» or «–».
- **Short terms, short values.** A term is a noun (`Gren`, `Størrelse`); a value that is long text is not a fact but a section.
- **When to use it:** facts about *one thing* (a detail page's «Fakta»). Facts that compare *many things* are a table; things that are
  the content of the page are a `PageSection` with `Rows`.
- Semantics: `<dl>` with a `<div>` per term holding its `<dt>` and every `<dd>`; a screen reader reads «term: value, value».

## Markdown

`Markdown` (`components/markdown`) shows text written in Markdown (a pull request's description, a comment, a README) in the
design system's own forms: headings, lists, task lists, code, quotes, tables, links and pictures are drawn by the design system,
never by the text. It is the one way to show Markdown: **do not convert it to HTML and insert it.**

```tsx
<PageSection id="about" title="Beskrivelse" icon="info">
  <Markdown source={pull.body} />
</PageSection>
```

- **GitHub-flavoured and safe.** Tables, task lists, strike-through and bare links work; raw HTML in the text is *ignored*, not
  inserted, and unsafe addresses (`javascript:`) are dropped.
- **Headings are demoted** (`from="h3"`, the default; `"h4"` inside a subsection) so the text never breaks the page's outline.
- **Links out are marked** as external (`ExternalLink`); a link to an anchor or inside the app is a plain link.
- **Code scrolls in its own box**, tables in theirs: never the page.
- `size="sm"` for a comment. Not for text the app writes itself: that is `Text`.
- Cut a long text at a paragraph, not in the middle of a construct, and say where the rest is.

## Icons

**Use an icon wherever it makes something quicker to find or to understand.** The design system makes it the easy way: an
icon is a *meaning* you ask for, and the components that show titles, rows, statuses, actions and errors take one.
The set is **complete on purpose** (157 meanings in eleven groups), so a page never waits for an icon; a meaning that is missing is added at once in `scripts/icon-set.mjs` and `npm run icons` regenerates the shapes (`src/lib/icon-nodes.ts`), the types and the Catalogue. An icon is an inline `<svg>` rendered as plain HTML with its look in CSS (`src/icon.css`: a size property, `currentColor`, mirroring under `:dir(rtl)`); no icon component runs in the browser.
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
| A page to go to | `icon` on a `NavBar` item or a `SubPages` page |
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

## States and messages (8.4)

What a page says when it has nothing, is old, is loading or has failed. Researched against the documentation of GOV.UK, Primer, Carbon and Atlassian; the rules are in the `designsystem-ux` (§5), `designsystem-content` and `designsystem-components` skills and in Storybook, **Patterns / States and messages**.

| Component | For |
| --- | --- |
| `EmptyState` | Nothing to show: what would be here, why, and one next step. Replaces the whole empty structure |
| `Banner` | A message about the whole page or a section: old data, a failed source. Cannot be dismissed; `destructive` is announced at once |
| `Badge` | One short word about a thing, next to its name in a row. Words and symbol, never colour alone |
| `Time` | A moment: relative under seven days, a date after, the exact time always in `title` and `datetime`; `now` is passed in |
| `Disclosure` | Longer content out of the way, a native `<details>`; never what matters |
| `Code` | Code in a sentence or on lines of its own (a block scrolls inside its box and can be focused) |
| `CopyButton` | Copies a value that is hard to write by hand and says so in words («Kopiert») in a polite live region |
| `Progress` | One value against a goal or a limit, as a meter with its label and value in words; never colour |
| `TextField` | One native text input with its label above, a hint and an error tied to it; `optional` marks the minority |
| `SearchField` | A search that goes to the same page with `?q=`, with its label and button in words |
| `FormErrorSummary` | The errors of a sent form at the top of the page, with focus, each a link to its field |
| `SortHeader` | A column header that sorts through a link and sets `aria-sort` |
| `Pagination` | The way between pages of a long list that has an address for each page: real links, «Forrige» and «Neste», the current page marked |

There is **no toast** and no tooltip: a toast disappears before it can be read, and a tooltip hides words from touch and keyboard. Say it in a `Banner` or next to what it is about, and put the words beside the icon.

## 8.34

**`DetailHeader`: the head of a page of a thing, composed.** The main picture (`Picture size="hero"`, lit on its frame) and the name together, the picture beside the name on a phone and not above it with a gap of page around it, on a stage whose ground is four colours taken from the picture (`lib/palette.ts`) and drawn in WebGL (`AmbientBackdrop`, `lib/ambient-shader.ts`) that move with the page's light. Only colours are taken from the picture, never the picture, so it is safe for sources that forbid altering pictures (Spotify's); the backdrop is drawn when the light changes and at no other time, so nothing loops. It is the page's `<h1>`. `lightStore.listeners` are called whenever the light has moved.

## 8.33

**The main picture is lit; the tilt answer is kept.** A `Picture size="hero"` (and the record of `NowPlayingCard`) is the one thing a page lights: a hero is lit on its **frame**, automatically (`lit-frame`: a shadow away from the light and a rim of light towards it, both outside the picture, nothing painted over it), and carries the light's source with it, so the light follows the pointer with nothing added to the page. A reflection over a picture stays the disc's alone: where a source's terms forbid cropping or overlays (Spotify), the frame is all there is. `TiltButton` (put one by the main picture; `NowPlayingCard` has one) lets the light follow how a phone is held, and the answer is kept in `localStorage` (`ds-light-tilt`: `on` or `denied`): asked once, not at every visit; allowed before, it is listened to at once, and if iOS has forgotten, the next tap asks. `LightSource` no longer draws a button. The shadow of a hero is no longer `shadow-md`. «Foundations / Light and shadow» has the rules, «Where the light goes».

## 8.32

**A system for light and shadow** («Foundations / Light and shadow»). A page has one light (`--light-x`, `--light-y`, `lib/light.ts`, `light.css`): `elevation-1` to `-3` are shadows that fall away from it, and `LightSource` moves it with the pointer and, on a phone, with its tilt (iOS asks first). `Picture disc` is now a WebGL record: the cover turns, the reflections stand on the line from the light and move with it, a tap pauses it (WCAG 2.2.2), and it is the same in CSS where WebGL is not there. `NowPlayingCard` is the record large, with «Spilles nå», the dot, the title and a line under it. Light and shadow are depth, never information, and still under `prefers-reduced-motion`.

## 8.31

**The disc turns for as long as it plays.** Slow (12 s a turn) and forever, instead of three turns that slow to a stop; still under `prefers-reduced-motion`. See «Foundations / Motion», loops.

## 8.30

**A song playing now is a spinning disc.** `Picture` takes `disc` (square ratio): the picture is round with a hole in the middle and turns slowly for as long as it plays (`--motion-duration-disc`, 12 s a turn, linear, forever; still under `prefers-reduced-motion`). That is a loop past five seconds, which WCAG 2.2.2 asks to be pausable: it is a choice for the look, small, never alone, and written down in «Foundations / Motion». `PictureRows` rows take `live`: the picture is a disc and the aside, in full text colour with the pulsing `LiveDot`, is what says it («Spilles nå»): the motion is never the only signal.

## 8.29

**`Rows`: `trailing` is optional.** When no row has one, the value column is not drawn (nor its screen-reader header), so a long title has the whole width. Put the time or the count in the body's own line instead, as the pull request lists of the start page now do.

## 8.28

**`RankedRows`: a top list.** The place of each thing (counted by the list, so the order is the data's), an optional picture in a `corners` shape, the name with the whole width, under it how the place moved since the list before (`change`: `up`, `down`, `same`, `new`, always in words, the arrow only a hint) and the score in words at the end of the line, with a thin bar for how far each is from the first (`amount`; each bar is a share of the largest). A table for a screen reader, which hears the place, the name and the score of a row together. No design system we looked at (Carbon, Material, Shopify's, the GOV.UK family) has a ranking component: they say an ordered list for ranked things, the place as real text, and a change that never rests on colour alone; that is what it does.

## 8.27.1

`Picture corners="soft"` has corners of 30 % of its width, not 22 %: at the size of a row the soft tile and the sharp plate were hard to tell apart.

## 8.27

**Shape language for pictures.** `Picture` and `PictureRows` take `corners`: `normal` (the default, as before), `sharp` (a sleeve or a plate), `soft` (a tile with large corners) and `round` (a person or a band; with `ratio="square"`, the top
of the picture kept). The shape says what kind of thing the picture is of, so a reader tells a person from a record from a film before reading a word: choose one shape for each kind in an app and keep it wherever that kind
shows, in a row and on its own page. A row can differ from its list (`PictureRow.corners`). Where a source's terms forbid cropping its pictures, do not use `round` for them.

## 8.26

**Motion and microinteractions**, from research on Carbon, Material 3, Atlassian, Fluent, Primer, NN/g, Saffer and WCAG
(**Foundations / Motion**, rewritten: tokens by purpose, enter and exit, the state model of every control, response times, loops,
opening and closing, what may move, reduced motion).

- **Tokens by purpose**: `enter` 250, `exit` 200 (new: exits are shorter), `reveal` 300, `slow` 400 (was 450), `data` 700 (bars and
  `CountUp`, in place of multipliers), and the easings `enter`, `exit` (softer than the old `ease-in`), `standard`, `spring` (`linear()`,
  falls back to `enter`) and `linear`. `base`, `ease-out` and `ease-in` stay as aliases; nothing in an app has to change.
- **Entrances are quicker**: a rise is 300 ms, the stagger 40 ms and five steps, so a list has settled within half a second.
- **No loop over five seconds** (WCAG 2.2.2, level A): `LiveDot` beats twice and is still; the skeleton's pulse waits a second and
  beats twice.
- **Tailwind's transitions and pulse follow the tokens**, so the generated shadcn parts move on the system's timing.
- **The focus ring is solid**: the global outline and shadcn's `ring-ring/50` were half strength, under 3:1 (WCAG 1.4.11).
- **Overlays close on the exit timing**; `Disclosure` opens and closes smoothly where the browser can animate to `height: auto`.
- **The page's view transition** is asked for only without a reduced-motion wish, runs on the tokens, and is in the safety net.
- **Feedback**: `CopyButton` announces every copy and no longer lets an old timer clear a new «Kopiert»; `FilterChips` and links have a
  pressed state; `CardLink look="block"` lifts under a pointer; `PeriodPicker` dims the page (`main[aria-busy]`) until the next one arrives;
  `SectionSkeleton` drops `aria-busy`, which kept a screen reader from saying «Henter …».
- `motion-lift` fades a shadow drawn once instead of animating `box-shadow`.

## 8.25

**New typefaces: Atkinson Hyperlegible Next and Mono**, one superfamily from the Braille Institute, in place of Geist and JetBrains Mono.

- All text and **every heading** is the sans (`font-heading` is now `font-sans`); the mono (`font-mono`) is only short uppercase labels
  (`Heading look="label"`), code and status codes. Page titles are semibold with tight tracking.
- Why, with the measurements of seven pairs: **Foundations / Typography**, «Typefaces». In short: one family shares x-height, capitals and
  figures, so labels and titles agree; monospace made titles long and uneven; letters that look alike (I l 1, O 0) are told apart; 50 KB
  of fonts in place of 68.
- A project with its own font-face rules (the hjemmeserver app) takes the two new packages: `@fontsource-variable/atkinson-hyperlegible-next`
  and `@fontsource-variable/atkinson-hyperlegible-mono`.

## 8.24

**Storybook is organised by what a reader needs**, not by how a part is made: five roots in the order you need them.

- **Start** (Welcome, status and contributing), **Foundations** (tokens, icons, typography, colour and state, grouping and spacing,
  motion), **Components** by purpose (Layout, Text, Links, Actions, Navigation, Lists, Tables, Charts, Media, Forms, Status, States,
  Overlays, Motion), **Patterns** (how pages are built, and the error pages) and **Engineering** (closed until opened).
- Inside a group the most used comes first, not the alphabet. «Primitives» (how shadcn made a part) and «Feedback» (status, empty and
  loading states and whole pages in one heap) are gone: each part stands with what it is for.
- **Components / Overview**: every component by what you need, one table per group, each name a link to its page.
- The files follow the sidebar (`stories/components/<group>/…`, `stories/foundations`, `stories/patterns`, `stories/engineering`), and the
  reference pictures moved with them. `src/stories.test.ts` fails on a title with no place in `storySort`, a component missing from the
  overview, a file outside its root's folder, and a link between docs pages that leads nowhere.
- The addresses of the pages changed with their titles (`?path=/docs/components-lists-rows--docs`, was `lists-rows`): a bookmark to an
  old one opens Storybook's start.

## 8.23

The gaps 8.21 left under «You check» are closed:

- **`ChartCard` and `PictureCard` titles are headings**, `<h3>` by default, with `level` (`2 | 3 | 4`) to fit the outline (`CardHeading`
  inside shadcn's `CardTitle`, which stays a `<div>`). A page that put its own heading around a card's title drops it.
- **Every link out says so**: `ExternalMark` (the external symbol and «(eksternt nettsted)» for a screen reader) ends `ExternalLink`,
  `TextLink external`, and the links of `DatedLinkTable` and `StoryList`.
- **`Logo decorative`**: `alt=""` for a logo beside its own name.
- **`PeriodPicker` keeps WCAG 3.2.2**: it says in advance that a choice changes the page, and `enableNavigatingSelects` lets the arrow
  keys of a closed select step through the periods, going on Enter or when focus leaves (`decide`, tested); a pointer choice goes at once.
- **`PageSection level={3}`** for a section under another heading.
- **`NotFoundPage` and `ServerErrorPage` take `home`**, the app's front page under a base path (`/start/`); `/` by default.

## 8.22

Performance and sustainability, researched against web.dev, the Web Almanac 2025, the W3C Web Sustainability Guidelines, the Sustainable
Web Design Model v4, GOV.UK and W3C COGA (guide **Performance and sustainability**):
- **`Picture`** takes `sources` (the widths its source offers: `srcset` with a `sizes` that is the width it is drawn at, so a 40 px thumbnail
  takes the small file) and `priority` (the one picture that leads the page: eager and `fetchpriority="high"`; every other is lazy).
- **`npx designsystem-budget <dist>`** weighs every built page (HTML, CSS and script gzipped, the `latin` font files, its own pictures) against a
  budget (500 KB a page; 150 script, 50 CSS, 100 fonts), fails above it, and gives grams of CO2e per view and the SWDM v4 rating. A page of
  this system is about 85 KB without pictures: 0.013 g, A+.
- The skills: light pages in `designsystem-ui`, a check in `designsystem-review`, refresh no faster than the data changes in `designsystem-ux`.
- Myths written down: dark mode saves energy only on OLED at high brightness; `prefers-reduced-data` is in no browser yet.

## 8.21

- **Every component page's Accessibility section** is now what the component handles and what the page must still check («You check»), each
  point with its WCAG 2.2 criterion, and every story says in a line why it exists. Writing them down against the code found claims it did
  not keep and gaps that are now fixed: the scroll regions of `Heatmap` and `CalendarHeatmap` and the zoom button of `ImageLightbox` have a
  focus ring, and **`SegmentedToggle` takes a required `label`** (its group had no name). What is not fixed is written under «You check»
  on the page: `CardTitle` is no heading, `TextLink external`, `DatedLinkTable` and `StoryList` do not say a link leaves, `Logo` has no
  decorative mode, `PeriodPicker` changes the page on a choice, `PageSection`'s title is always an `h2`.
- **Visual regression in CI**: `npm run test:visual` compares every story's picture with the reference kept in `__screenshots__`; the
  Visual workflow makes the references, and only there: a new story's on the push that adds it, a changed one by hand with «update».
- `CalendarHeatmap` and `Heatmap` take `unit` as `{ one, many }`, so a count of one reads «1 visning».

## 8.20

How well-made design systems use Storybook (Primer, Carbon, Fluent, Spectrum, Polaris, Atlassian; Digdir, NAV Aksel, Equinor, Skatteetaten,
SpareBank 1), and what was taken:
- **Tema «Begge»**: a story in light and in dark side by side (Primer's «All», SpareBank 1's «Begge moduser»); the tokens now follow
  `data-theme` on any element, not only the root.
- **Skjermlesertekst «Synlig»** (Skatteetaten): what only a screen reader hears is drawn, dashed, where it stands. It found the first wrong
  one at once: `Rows` stories said «Antall» over a column of dates.
- **`lang="nb"`** on the stories' document (it said `en` over Norwegian text), and controls without handlers, refs and aria attributes.
- **Do and don't as stories** (Digdir, Equinor, Aksel): `Dont…` («Ikke:», kept out of the manifest) and `Do…` («Gjør:»); the first pair is
  sections side by side against under each other (`Grid`).
- **A Welcome page** that says how to use it, how to read it and where an agent finds it as data.
- The skills: a JSDoc line on each story saying why it exists; the Accessibility section as what the component handles and what the page
  must still check, with WCAG 2.2 criteria.

Not taken, with the reason: a snapshot story per component and visual regression (Digdir, Aksel, Primer: their pictures need one fixed
machine; a later step in CI), a language toolbar (the system has one language), pseudo-states for hover and focus in snapshots (with the
snapshots), docs generated from one data file per component (Atlassian, Equinor: worth it when the README and the stories drift).

## 8.19

Storybook used as more than a gallery, from three research passes over its documentation (docs, controls and testing, organisation and AI):
- **A catalogue for agents:** the build writes `manifests/components.json` (every component with its description, props and story code) and
  `manifests/docs.json` (the guides), published with Storybook; `@storybook/addon-mcp` serves components, stories, docs and test runs to an
  agent in this repository (`.mcp.json`). The skills point at both.
- **Docs pages:** the template's sections are headings (a test holds them), a table of contents on every page, a code panel, WCAG 2.2 AA and
  best-practice rules in the axe run, required props first in the props table, and live examples in the guides (`Canvas`).
- **Organisation:** a `manager.ts` with the system's name and link and the accessibility panel first; `experimental` and `deprecated` tags,
  hidden in the sidebar by default; the token pages kept out of the components manifest.
- **Tests:** the light and dark runs set the theme with `initialGlobals`, as the toolbar does.

Not taken: `react-docgen-typescript` (it needs TypeScript's JavaScript API, which TypeScript 7 does not have), visual snapshot tests (their
pictures differ between machines; a later step, in CI only), CSF Factories (still a preview).

## 8.18

Storybook as the system's test bench, from Storybook's own guidance (the Vitest addon, accessibility tests) and how other design systems keep
theirs: every story is a test (`npm run test:stories`, `@storybook/addon-vitest`): it renders in Chromium **in the light and the dark theme**,
runs its `play` test and **fails on an axe violation** (`a11y: { test: "error" }`); CI runs it. The toolbar has **Tema** (as the device,
light, dark: `data-theme` on the root, which only Storybook and the tests set; an app follows the device) and **Viewport** with the five
width classes. `play` tests for `SegmentedToggle`, `Disclosure`, `FoldList` and `CommandButton` with `Overlay`.

Found by the new tests and fixed: `--destructive` in light is darker (4.0:1 on its own tint in the destructive button, now 4.7:1; 5.6:1 on
the page; a test holds it), `SegmentedToggle` says which option is on with `aria-pressed` (it was told by the look alone), `DumbbellChart`'s
`role="img"` is on a `div` (not allowed on a `ul`), and the tables of `DumbbellChart` and `Heatmap` have a first column header
(`Heatmap rowName`).

## 8.17

Wide screens, researched against Material 3 (window size classes, supporting pane), GOV.UK (two-thirds and one-third), Primer (`PageLayout`
pane) and the research on line length: the line does not grow on a desktop; the width goes to a **pane**, to more pictures across, or to margin,
in that order. New: `PageLayout width="pane"` (the 48rem reading column and a pane of at most 20rem), `Split position="start" | "end"` (the pane
is who the page is about, or what supports it), the width classes (`WIDTH_CLASSES`, compact to extra-large, as container queries in rem) and
the guide **Wide screens**. Fixed: a `Split` in the reading column never had room for its pane (48rem against the 56rem it needs); its main
column is now held at 48rem, and `page-width.test.ts` holds the numbers to each other. The skills check at 400, 768, 1024, 1440 and 2560 px.

## 8.15

Six charts for distributions, relations, rhythm and change, from research into graphical perception (Cleveland and McGill), box-plot and histogram practice (Tukey; Freedman and Diaconis), colour-scale and accessibility guidance for heat maps (Visa, Carbon, Smashing, the W3C): `CalendarHeatmap` (days by week, Monday first), `Heatmap` (two categories, optional numbers in the cells), `ScatterChart` (dots, a dashed trend line, r² and a sentence that it is not a cause), `Histogram`, `BoxPlot` and `DumbbellChart` (change between two moments). Every one has a visible summary, a table (`showTable`), an empty state, steps that keep 3:1 (a test) and no meaning in colour alone. The statistics are pure functions in `lib/stats.ts`, `lib/heatmap.ts` and `lib/dumbbell.ts`, with tests.

## 8.14

New: `LineChart` (several series over time, each named at its line's end, with a dash pattern and not colour alone), `Progress` takes a `target` (a bullet: the value against a goal and a mark where the goal is), `BrandIcon` (GitHub, Spotify, Bluesky, Mastodon; LinkedIn is not in Simple Icons any more, so a link there uses its words). Corrected: the default grey steps of a stacked chart are now `100, 66, 44` (and `100, 72, 52, 44` for lines), the lightest that keep 3:1 against the surface, checked by a test.

## Charts (8.13)

Researched against GOV.UK (Analysis Function), Carbon, Primer, NN/G, Datawrapper, the W3C (complex images), Chartability and the chart library's own documentation. A chart box now has its **final height from the first paint, in CSS** (`clamp(height, 22cqw, 480px)`), where it used to grow after it had measured itself and push the page; numbers in a tooltip and a table are formatted `nb-NO` through `formatChartValue` (a test fails on a bare `toLocaleString()`);
a chart with no data says why at its height (`emptyMessage`); every chart can show a visible `summary` (`summariseSeries()` writes one in Norwegian) and offer its table to everyone (`showTable`); the donut's `keep` is at most five and it keeps its ring in forced colours. New: `Sparkline`, a number's shape, plain markup with no script. Guides: **Data visualisation** (rewritten: a decision table, what is not drawn, limits, anatomy), **Accessible charts**, **Charts on the server**.

## Colour and icons (8.11)

Researched against Primer, Atlassian, Radix, Carbon, GOV.UK, NN/G, WCAG and MDN. `src/theme-contrast.test.ts` works out the contrast of every token pair from `theme.css` on each `npm test` (text 4.5:1, marks 3:1, the decorative lines under 3:1 on purpose, the chart series told apart in four kinds of vision) with `src/lib/colour.ts`, which has no dependency. The six `series-*` colours were changed to differ in lightness as well as hue; `shell.css` repairs forced colours and `theme.css` answers `prefers-contrast: more`. Five icon meanings were added (`copy`, `mail`, `history`, `filter`, `sort`). The guides **Colour and state** (with a routine for a change) and **Icons / Guide** (before you reach for one, icon and word, accessible names, governance) and the skills have the rules.

## Installed apps and server rendering (8.10)

Researched against web.dev, MDN, the WebKit blog, React, Next.js, Astro, Primer and NN/G; the rules are in the guides **Installed apps (PWA)**, **Server rendering** and **Fresh data and offline** (Storybook) and in the skills.

| Component or helper | For |
| --- | --- |
| `Freshness` | When the page's data was made («Oppdatert 19:27»); past a threshold a warning in words. A still line, not a live region |
| `ConnectionBanner` | «Du er frakoblet» in a live region that is always on the page; a hint, never a gate |
| `StreamedSection`, `SectionSkeleton` | A part that arrives on its own, with a skeleton at its final height and one status |
| `webManifest()`, `inScope()` (`lib/manifest.ts`) | A manifest that meets what browsers need, or an error; a scope check on a whole segment |

A component that uses a hook or a handler starts with `"use client"`, and none reads the clock or a random number in render: `src/server-safe.test.ts` fails otherwise. Components that are client components: `ChartFrame`, `CommandButton`, `CopyButton`, `FormErrorSummary`, `Freshness`, `ConnectionBanner`, `Overlay`, `SegmentedToggle`, `VirtualTbody`. (Five of these had no `"use client"` until 8.10, which would fail in a server component such as a Next.js page.)

## Documentation of a component

Every component's story has the same sections in its description (Storybook, **Docs**): **Use it when**, **Do not use it when** (naming the component to use instead), **Accessibility**, **Content** (the Norwegian wording) and **Related**. A new component is not added without them (see the guide «Status and contributing»). The tokens and the icon catalogue are documented in their own guides.

## Migrating to 8.0

**Breaking:**

| 7.x | 8.0 |
| --- | --- |
| `BackLink` | Removed. `Breadcrumbs` is the way back (the parent alone on a phone, the whole trail from tablet width) |
| `NavCards` | Removed. `SubPages`: the pages under a page as a list (icon, name, one line), in one column |

New: `Breadcrumbs`, `SubPages`, and `FactList` takes several values per term (additive).

## Migrating to 7.1

Additive: `Markdown`.

## Migrating to 7.0

**Breaking:** `PageTabs` (5.3) is gone, replaced by `NavBar`. A row of links under the title looked like tabs, which switch views of one
page, when it goes to other pages; on a phone it also wrapped onto two lines. `NavBar` is a bar at the foot of the screen on a phone and
a rail at the left from tablet width, and is given to `PageLayout` as `nav` (the page leaves room for it).

| 6.x | 7.0 |
| --- | --- |
| `<PageTabs label tabs={[{ key, label, href, icon, current, count }]} />` under the title | `<PageLayout nav={<NavBar label title items={[{ key, label, href, icon, current }]} />}>` (no `count`; one-word labels) |

## Migrating to 6.0

6.0 makes the reading direction «down» the rule (rule 7). **Breaking:**

| 5.x | 6.0 |
| --- | --- |
| Lists of rows (`Rows`, `PictureRows`, `EntityRows`), `HeadlineList`, `StoryList`, `FoldList` and `EntryList` flowed into several columns on a wide screen | One column, under each other. `LIST_COLUMNS` (`lib/page-width`) is gone |
| `Grid columns="sections"` | Removed: stack the sections (`Stack`); put what belongs together in a `SectionGroup` |
| `SectionGroup width="row"` / `"cell"` | `width` is gone: the subsections always stand under each other |
| A page filled the whole page area | `PageLayout` and `PageColumn` have `width="reading"` (the default: 48rem, centred); use `width="wide"` for a page that is mostly pictures or charts |

Pictures (`Tiles`), charts, `Grid` counts and `Split` are unchanged: they are looked at, not read.

## Migrating to 5.4

Additive: the skills (above) and the `designsystem-skills` command.

## Migrating to 5.3

5.3 is additive, with one visible change: **`ExternalLink` now always carries the external symbol** and is read as external
(it left the reader to guess before). New: `NavBar`, `BackLink`, `SummaryBar`, `LinkButton`, `more` on the section
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
