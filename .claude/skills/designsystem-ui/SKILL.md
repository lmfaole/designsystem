---
name: designsystem-ui
description: Use when building or changing the look of a page or component with the design system - layout and spacing, typography, colour and state, cards, icons, density, wide screens and motion. Use whenever you are about to write markup, pick a spacing or a colour, or reach for a className.
---

# UI with the design system

A page is **put together from the components**. It writes no `className`, `style` or stylesheet of its own (rule 1). When nothing
fits, the markup becomes a component in the design system, named for what it is, never for the project.

## Layout

- **Stacks and rows:** `Stack` (things under each other), `Inline` (next to each other, wraps), `Grid` (columns), `Split` (a rail
  beside content), `PageColumn`/`PageLayout` (the page's one column). Gaps are named steps: `none | xs | sm | md | lg | xl`.
- **Grids fit by room:** `Grid columns="sections"` (parts of a page, at least 28rem each), `"cards"`, `"tiles"`, `"charts"`, or a
  number that keeps growing past `lg`. Never a fixed count that stops at four.
- **Wide screens are used, not left empty** (rule 7). The page column has no maximum width; a `max-w-*` is only the measure of
  text (`max-w-prose`) or the size of a small mark. Check at **400, 1440 and 2560** px.
- **Groups:** several parts that belong together are a `SectionGroup` with `SubSection`s, not loose sections. `width="row"`
  takes the whole row and lays the parts out by room.

## Type

- Text only through `Text` (`size`: xs, sm, base, lg; `tone`: default, muted, destructive; `weight`; `numeric` for figures
  that line up) and `Heading` (`level` is the element, `look` is the appearance: page, section, label, item).
- One page `<h1>` (`PageHeader`). Sections are `<h2>`, their parts `<h3>`. Never skip a level for looks.
- Figures in columns use `numeric` (tabular numbers). Titles are short noun phrases, not sentences.

## Colour and state

- **Tokens only** (rule 5): `background`, `foreground`, `muted`, `primary`, `destructive`, `border`, `ring`, the `chart-*` and
  `series-*` colours. No hex, no `rgb()`, no `bg-white`. A test fails on a raw colour.
- **`destructive` is for what stops something**, not for emphasis. There is no green: good is plain; a good state is told by a
  symbol and words. Colour is never the only signal (see **designsystem-accessibility**).
- Light and dark follow `prefers-color-scheme`; both are checked in Storybook.

## Cards

A card (`Card`) is only for **one self-contained item** that is comparable with its siblings or clickable as a whole,
or a frame around a chart. It needs real content of its own and at least two of its kind. Everything else is a `PageSection`
with a list, a table, a `dl` or `Text`. Cards are not nested (rule 8).

## Icons (rule 10)

Use an icon wherever it makes something **quicker to find or to understand**: a section title (`icon`), the kind of a row
(`Rows lead="icon"`), a status (`StatusLine`), an action (`<Icon slot="start" />` in a `Button`), a page to go to (`PageTabs`,
`NavCards`). Ask for a **meaning** (`<Icon name="failure" />`), never a glyph, never `lucide-react` in a page. Not for
decoration, and not the same icon on every row (use it to tell kinds and states apart). See Storybook **Icons / Guide**.

## Density and rows

- Lists of rows use `Rows` (flows into as many columns as fit, `LIST_COLUMNS`), `PictureRows`, `EntityRows`, `Tiles`.
- A row is: kind icon, a name that links, one line of where it is from, a `StatusLine`, when it moved at the end.
- Controls are at least **24 px** targets (WCAG 2.5.8; `ENTITY_LINK` is `min-h-6`). The navigation controls (`PageTabs`, `SummaryBar`,
  `BackLink`) are 36–40 px; on touch prefer them, and `size="lg"` on a `Button`, over small ones.
- A select is a native `<select>` (`NativeSelect`), always (rule 6).

## Motion

Durations and easings come from the `--motion-*` tokens. Entrances **move and never fade text**. Everything is off under
`prefers-reduced-motion`. Motion is for orienting the reader (a new row, a change of page), never decoration.

## Before you write markup

1. Is there a component? Check **designsystem-components**.
2. Is it one of: layout, text, a list, a status, a section, navigation? Use that.
3. Still nothing? Add a component to the design system (see **designsystem-components**), do not style in the project.

Before finishing, run **designsystem-review**.
