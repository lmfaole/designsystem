---
name: designsystem-ui
description: Use when building or changing the look of a page or component with the design system - layout and spacing, typography, colour and state, cards, icons, density, wide screens and motion. Use whenever you are about to write markup, pick a spacing or a colour, or reach for a className.
---

# UI with the design system

A page is **put together from the components**. It writes no `className`, `style` or stylesheet of its own (rule 1). When nothing
fits, the markup becomes a component in the design system, named for what it is, never for the project.

## Layout

- **Stacks and rows:** `Stack` (things under each other: the default for a page), `Inline` (short things next to each other, wraps),
  `PageColumn`/`PageLayout` (the page's frame and **reading column**). Gaps are named steps: `none | xs | sm | md | lg | xl`.
- **One reading direction: down** (rule 7). What is read (text, lists, the sections of a page) stands under each other in the reading
  column (`width="reading"`, 48rem, centred). On a wide screen the rest is margin. See **designsystem-hierarchy**.
- **Columns are for what is looked at:** `Grid columns="tiles" | "cards" | "charts"` or a number, `Tiles`, and a `Split`
  rail of reference. A page that is mostly such things is `width="wide"`. Never `Grid` for text, lists or sections.
- **Groups:** several parts that belong together are a `SectionGroup` with `SubSection`s, under each other.
- Check at **400, 1440 and 2560** px.

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

## Charts

Colour is not the code: a chart in the grey palette is told apart by direct labels, then pattern, dash and marker, never by shade alone. Marks meet 3:1 against the background (the lightest chart grey needs an outline), neighbouring parts are separated by a thin gap, and values use tabular numbers. Limits per chart and the table behind it are in `designsystem-accessibility` (Charts). `destructive` marks only the one value that stops something, with a symbol and a word.

## Cards

A card (`Card`) is only for **one self-contained item** that is comparable with its siblings or clickable as a whole,
or a frame around a chart. It needs real content of its own and at least two of its kind. Everything else is a `PageSection`
with a list, a table, a `dl` or `Text`. Cards are not nested (rule 8).

## Icons (rule 10)

Use an icon wherever it makes something **quicker to find or to understand**: a section title (`icon`), the kind of a row
(`Rows lead="icon"`), a status (`StatusLine`), an action (`<Icon slot="start" />` in a `Button`), a page to go to (`NavBar`,
`SubPages`). Ask for a **meaning** (`<Icon name="failure" />`), never a glyph, never `lucide-react` in a page. Not for
decoration, and not the same icon on every row (use it to tell kinds and states apart). See Storybook **Icons / Guide**.

## Density and rows

- Lists of rows use `Rows`, `PictureRows`, `EntityRows` (always one column, under each other); a gallery of pictures is `Tiles`.
- A row is: kind icon, a name that links, one line of where it is from, a `StatusLine`, when it moved at the end.
- Controls are at least **24 px** targets (WCAG 2.5.8; `ENTITY_LINK` is `min-h-6`). The navigation controls (`NavBar`, `SummaryBar`,
  `Breadcrumbs`) are 36–40 px; on touch prefer them, and `size="lg"` on a `Button`, over small ones.
- A select is a native `<select>` (`NativeSelect`), always (rule 6).

## Motion

Durations and easings come from the `--motion-*` tokens. Entrances **move and never fade text**. Everything is off under
`prefers-reduced-motion`. Motion is for orienting the reader (a new row, a change of page), never decoration.

## Before you write markup

1. Is there a component? Check **designsystem-components**.
2. Is it one of: layout, text, a list, a status, a section, navigation? Use that. Is it read, or looked at? Read: stack it.
3. Still nothing? Add a component to the design system (see **designsystem-components**), do not style in the project.

Before finishing, run **designsystem-review**.
