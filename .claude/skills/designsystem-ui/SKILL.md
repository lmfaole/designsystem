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
  pane. A page that is mostly such things is `width="wide"`. Never `Grid` for text, lists or sections.
- **Responsive by the room, not the device** (guide «Wide screens»): width classes compact (<40rem), medium, expanded (≥56rem), large
  (≥75rem), extra-large (≥100rem), as container queries (`@container`), so a part behaves by the room it has wherever it stands. A page
  chooses its width: `reading` (text and lists), `pane` (a detail page: the reading column and a `Split` pane beside it from expanded up),
  `wide` (galleries, charts). Content is never hidden at a width: it moves (a pane goes under), it does not disappear.
- **A detail page on a desktop:** the cover and its facts in a `Split` pane (`position="start"`), the lists in the main column and the
  link out last in it (rule: a link out comes last on the page); on a phone the pane comes first and the lists follow.
- **Groups:** several parts that belong together are a `SectionGroup` with `SubSection`s, under each other.
- Check at **400, 768, 1024, 1440 and 2560** px and at 200 % zoom.

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
- Light and dark follow `prefers-color-scheme`; both are checked in Storybook. An app sets `data-theme` (and `data-effects`, `data-tilt`) on `<html>` only from the visitor's own choice, with `htmlAttributes` from `lib/preferences`.

## Charts

Colour is not the code: a chart in the grey palette is told apart by direct labels, then pattern, dash and marker, never by shade alone. Marks meet 3:1 against the background (the default grey steps, 100, 66 and 44 % of the foreground, keep 3:1 on the page and the card; a fourth series takes a `series-*` colour), neighbouring parts are separated by a thin gap, and values use tabular numbers. Limits per chart and the table behind it are in `designsystem-accessibility` (Charts). `destructive` marks only the one value that stops something, with a symbol and a word.

## Cards

A card (`Card`) is only for **one self-contained item** that is comparable with its siblings or clickable as a whole,
or a frame around a chart. It needs real content of its own and at least two of its kind. Everything else is a `PageSection`
with a list, a table, a `dl` or `Text`. Cards are not nested (rule 8).

## Colour rules

- Colour comes from tokens only. The interface has one colour (`destructive`); a state is a symbol and a word. A second colour is a new role with a symbol, measured first (guide «Colour and state»).
- **Alpha never carries text or a mark that needs 3:1** (`border` and `input` are decorative, about 1.3:1; a field takes its edge from `muted-foreground`). Check a pair on `card` as well as on the page.
- Chart colours: `series-*` are six that differ in lightness as well as hue and are told apart for every kind of colour vision; a chart still names its series. Never rely on the lightest default steps or a `chart-*` step alone.
- A part with a shadow-only edge or a fill-only state also has a border or a mark (forced colours drop shadows and fills). Icons use `currentColor`.
- A change to a token: `npm test` (`theme-contrast.test.ts`), the numbers in Foundations / Tokens / Overview, the Accessibility panel in light and dark, and a look at hover, focus, selected, disabled and error.

## Charts

- **Ask the question first** (guide «Data visualisation»): one number is a `SummaryBar`, a number and its movement is a `Sparkline`, a trend is `AreaChart`, a few categories `ColumnChart`, a ranking `RankedBarChart`, parts over time `StackedColumnChart`, a whole in five parts or fewer `DonutChart`, two measures that may go together `ScatterChart`, many values of one thing `Histogram`, spread across groups `BoxPlot`, rhythm over days `CalendarHeatmap`, two categories meeting `Heatmap`, change between two moments `DumbbellChart`, the weather hour by hour `Meteogram` (temperature, rain and the sky on one time axis). Not drawn: 3D, radial gauges, more than five slices, two value axes, a truncated bar axis, colour as size, fewer than three points.
- A bar chart starts at zero. The title states the message; the subtitle gives what is counted, the unit and the period (`ChartCard`).
- Name the series on the chart before a legend. Numbers are formatted `nb-NO` (`formatChartValue`), never the runtime's default.
- A chart has its **height reserved** from the first paint, says why when it has no data (`emptyMessage`), and is a `StreamedSection` when its source is slow.

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

Durations and easings come from the `--motion-*` tokens, named by purpose (`instant` for a press, `fast`, `enter`, `exit`, `reveal`,
`data`, `live`; the easings `enter`, `exit`, `standard`, `spring`). Entrances **move and never fade text**; exits are shorter, on the exit
curve. Everything is off under `prefers-reduced-motion`. Motion is for orienting the reader (a new row, a change of page), never decoration.
The guide is **Foundations / Motion**.

- **Every control keeps one state model**: hover (a tint, pointer only), pressed (at once, `motion-press`), focus (a solid outline in
  `--ring`, never animated), selected, busy (`aria-busy`, label kept, dimmed with `motion-pending`), done or failed (a sentence in a status
  region). No ripple; a state never changes the layout.
- **Answer within 0.1 s; over 1 s say it is on its way** (a skeleton, `main[aria-busy]`); over 10 s say how long.
- **No loop longer than five seconds** (WCAG 2.2.2): a pulse beats twice and stops.
- **Only compositor properties move** (`transform`, `translate`, `scale`, `opacity`, registered numbers); never `transition-all` in our code.
- Opening and closing is CSS (`@starting-style`, `allow-discrete`, `::details-content`); a change of page is the view transition, never
  a `Reveal` on top of it.

## Installed and server-rendered

- Insets come from the tokens (`--safe-top` … `--safe-left`) through `PageLayout` and `NavBar`; a page never reads `env(safe-area-inset-*)` itself, and never sets overscroll.
- Manifest colours are the dark theme as opaque hex (`webManifest()`); a manifest takes no variables.
- Reserve the place of what arrives late (a skeleton at its final height, an image with width and height, a control that appears after hydration); animate with `transform`.
- No `window`, `Date.now()` or `Math.random()` in render (a test fails); a value only the browser has is read in an effect.

## Light pages (guide «Performance and sustainability»)

- A `Picture` gets `sources` (the widths its API offers) so the browser takes the smallest sharp one; only the picture that leads the page
  is `priority`, every other is lazy.
- No third-party script, font or CDN; no autoplay; one font superfamily (Atkinson Hyperlegible Next and Mono), `latin` only, mono only for short labels and code; motion from the tokens.
- An app runs `npx designsystem-budget dist` in CI: under 500 KB a page (150 script, 50 CSS, 100 fonts), with grams of CO2e per view.

## Before you write markup

1. Is there a component? Check **designsystem-components**.
2. Is it one of: layout, text, a list, a status, a section, navigation? Use that. Is it read, or looked at? Read: stack it.
3. Still nothing? Add a component to the design system (see **designsystem-components**), do not style in the project.

Before finishing, run **designsystem-review**.
