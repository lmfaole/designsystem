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
- **Three levels, no fourth:** page, section, item. A section is never made by bolding or enlarging `Text`; it is a `Heading`. Bold is for what stops something or the point; no italic.
- **Paragraphs stand in `Stack width="prose"`** (about 65 characters; 45–90 is the range, GOV.UK says 75 at most). A list, a row or a table can use the whole reading column.
- **Uppercase** only in short labels (`Heading look="label"`), never a sentence. `xs` is for fine print and secondary notes, never the only place something needed to act is said.
- Never a size in viewport units; text must survive 200 % zoom and WCAG 1.4.12 text spacing. `<html lang="nb">` is set once.
- Quotes « », ranges with an en dash and no spaces, a non-breaking space between a number and its unit.

## Colour and state

- **Tokens only** (rule 5): `background`, `foreground`, `muted`, `primary`, `destructive`, `border`, `ring`, the `chart-*` and
  `series-*` colours. No hex, no `rgb()`, no `bg-white`. A test fails on a raw colour.
- **`destructive` is for what stops something**, not for emphasis. There is no green: good is plain; a good state is told by a
  symbol and words. Colour is never the only signal (see **designsystem-accessibility**).
- Light and dark follow `prefers-color-scheme`; both are checked in Storybook.

## Charts

Colour is not the code: a chart in the grey palette is told apart by direct labels, then pattern, dash and marker, never by shade alone. Marks meet 3:1 against the background (the two lightest default steps, 36 and 24 %, are 2.7 and 1.9:1, so they are never the only difference: name the series), neighbouring parts are separated by a thin gap, and values use tabular numbers. Limits per chart and the table behind it are in `designsystem-accessibility` (Charts). `destructive` marks only the one value that stops something, with a symbol and a word.

## Cards

A card (`Card`) is only for **one self-contained item** that is comparable with its siblings or clickable as a whole,
or a frame around a chart. It needs real content of its own and at least two of its kind. Everything else is a `PageSection`
with a list, a table, a `dl` or `Text`. Cards are not nested (rule 8).

## Colour rules

- Colour comes from tokens only. The interface has one colour (`destructive`); a state is a symbol and a word. A second colour is a new role with a symbol, measured first (guide «Colour and state»).
- **Alpha never carries text or a mark that needs 3:1** (`border` and `input` are decorative, about 1.3:1; a field takes its edge from `muted-foreground`). Check a pair on `card` as well as on the page.
- Chart colours: `series-*` are six that differ in lightness as well as hue and are told apart for every kind of colour vision; a chart still names its series. Never rely on the lightest default steps or a `chart-*` step alone.
- A part with a shadow-only edge or a fill-only state also has a border or a mark (forced colours drop shadows and fills). Icons use `currentColor`.
- A change to a token: `npm test` (`theme-contrast.test.ts`), the numbers in Tokens / Overview, the Accessibility panel in light and dark, and a look at hover, focus, selected, disabled and error.

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

## Installed and server-rendered

- Insets come from the tokens (`--safe-top` … `--safe-left`) through `PageLayout` and `NavBar`; a page never reads `env(safe-area-inset-*)` itself, and never sets overscroll.
- Manifest colours are the dark theme as opaque hex (`webManifest()`); a manifest takes no variables.
- Reserve the place of what arrives late (a skeleton at its final height, an image with width and height, a control that appears after hydration); animate with `transform`.
- No `window`, `Date.now()` or `Math.random()` in render (a test fails); a value only the browser has is read in an effect.

## Before you write markup

1. Is there a component? Check **designsystem-components**.
2. Is it one of: layout, text, a list, a status, a section, navigation? Use that. Is it read, or looked at? Read: stack it.
3. Still nothing? Add a component to the design system (see **designsystem-components**), do not style in the project.

Before finishing, run **designsystem-review**.
