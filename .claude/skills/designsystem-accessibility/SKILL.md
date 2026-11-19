---
name: designsystem-accessibility
description: Use when building, changing or reviewing anything a person will use with the design system, to make it accessible - semantics and headings, landmarks, keyboard and focus, contrast and colour, target size, icons, tables, motion, live updates and testing with the Storybook accessibility panel. Target is WCAG 2.2 AA.
---

# Accessibility with the design system

The target is **WCAG 2.2 AA**. The components already do most of it; the rest is how a page uses them. Do not work around a
component to fix accessibility: fix the component (see **designsystem-components**).

## What the components give you

- A **skip link** and `<main id="main-content">` (`PageLayout`).
- **Headings:** `PageHeader` is the one `<h1>`; `PageSection`/`SectionGroup` are `<h2>`, `SubSection` is `<h3>`, each section is
  `aria-labelledby` its heading.
- **Navigation:** `NavBar`, `Breadcrumbs`, `SubPages`, `SummaryBar` are `<nav aria-label>`; the current page is `aria-current="page"` (in the breadcrumbs it is the last item, not a link). A `FactList` is a `<dl>` with a `<div>` per term holding its `<dt>` and every `<dd>`, read «term: value, value».
- **Icons are hidden** from a screen reader unless given a `label`; a status always has words beside its symbol (`StatusLine`).
- **External links** carry the external symbol and a hidden «(eksternt nettsted)» (`ExternalLink`, `LinkButton external`).
- **Tables** keep their roles; `SrTableHead` gives a header row that is read, never drawn; `Rows` is a table for a screen reader.
- **Focus** is visible (`focus-visible` ring from the `ring` token); targets are at least 24 px.
- **Motion** is off under `prefers-reduced-motion`; entrances never fade text.

## What a page must do

1. **One `<h1>`**, headings in order, no skipped levels for looks.
2. **Every `Icon` that stands alone gets a `label`** (`iconLabel` on a `Rows` row). An icon beside its words stays hidden.
3. **Never colour alone.** A state is a symbol plus words; `destructive` also gets medium weight. Check by looking at the page in
   greyscale.
4. **Names of links and buttons say what they do:** «Se alle pull requests», «Åpne på GitHub». Never «Klikk her» or «Mer». An
   icon-only button has an `aria-label`.
5. **Language:** the page is `lang="nb"`; text in another language is marked.
6. **Forms:** every control has a visible label and a stable `id`; errors say what went wrong and how to fix it, next to the field.
7. **Selects are native** (`NativeSelect`): phones and screen readers get their own picker.
8. **A page that updates itself** keeps focus and scroll, never moves what the reader is on, and does not announce every refresh.
   A change the reader must know about (an error, something new that needs them) goes in a polite live region.
9. **Dialogs** use `Overlay` (native `<dialog>`/popover): focus goes in, Escape closes, focus returns. A thing with an address is a
   page, not a dialog.
10. **Zoom and reflow:** at 400 px width and 200 % zoom nothing is cut off and nothing scrolls sideways except a table in its own box.
11. **Contrast:** use the tokens (they are checked in light and dark). Never lower contrast with opacity on text.

## Live and offline

- A live region exists **before** it changes. `polite` for a status, `assertive`/`alert` only for what stops something. A renewal that happens by itself is not announced; offline, back and a failure are, once.
- `navigator.onLine` is a hint, never a gate: it says a network exists, not that a source can be reached.
- Content that updates by itself next to other content can be paused, stopped or hidden, or its rate controlled, unless it is essential (WCAG 2.2.2).
- A retry control keeps focus and uses `aria-busy` while it runs. Push is asked for from a tap.
- A skeleton group is **one** status with a hidden label, not one announcement per bar.

## What automation cannot find

The Storybook panel and tools like axe and WAVE miss issues (GOV.UK service manual): reading order, whether a name means something out of context, link text, alt text, whether focus lands somewhere sensible after a page change or a dialog, whether a live region's wording makes sense, and whether a chart has an equivalent. Check these by hand.

## How to check

1. **Storybook:** open the story, the **Accessibility** panel at the bottom must show no violations in light and dark.
2. **Keyboard:** tab through the page. Every control is reachable in a sensible order, the focus is always visible, nothing traps it.
3. **Screen reader:** read one list and one detail page. Do rows read as «kind, name, status, date»? Does a link out say it leaves?
4. **Zoom:** 400 px wide and 200 % zoom.
5. **Greyscale:** is every state still told apart?
6. **Reduced motion:** turn it on; nothing should move.

## Colour and icons

- Colour is never the only signal (WCAG 1.4.1): a symbol and a word, and a green and red pair needs another cue even at 3:1. Text is 4.5:1; marks, edges and the focus ring 3:1 (1.4.11); a test checks the token pairs, in light and dark.
- **Forced colours and more contrast** are supported with small repairs in `shell.css`; a new component is looked at in both (Playwright `emulateMedia({ forcedColors: 'active', contrast: 'more' })`).
- An icon beside its word is decorative (hidden). An icon that is the kind of a row has a `label`. An icon with no word is a control whose **name says what it does** (not what it looks like), as `aria-label` or hidden text, never `title` alone, and the accessible name contains the visible label. Label the control, not the `svg`.
- Never the same icon on sibling items, and never one icon for two meanings.

## Charts

- **A chart is an image with a label, a `summary` (type, range, trend, extremes; `summariseSeries()` writes one) and its data as a table** (`showTable` for a table anyone can open). It is not a tab stop (Chartability O6); a tooltip is never the only route to a value (WCAG 1.4.13); a mark that is only a fill keeps its colours in forced colours (`data-chart-mark`).
- **Every chart has its numbers as a table** a screen reader can move through (`ChartTable`; the chart itself takes no focus and a tooltip is for a pointer) and a title that states what it shows with the unit and the period. A slice or a bar too small to reach with a pointer is only reachable in the table (Carbon, chart anatomy).
- **Never shade alone.** Name the series on the chart (direct labels) before a legend; separate neighbouring parts with a 1–2 px gap in the background colour; marks meet 3:1 against the background and axis text 4.5:1 (Primer, data visualization). Lines are 2 px; the first is solid and later ones are dashed with another marker.
- **Limits** (Primer): line 5 series or fewer, bars 10 or fewer, stacked segments 5, a donut 5 slices with the rest folded into «Annet».
- Loading, empty and error are designed for a chart too: a skeleton at the chart's final height (no layout shift), a sentence for empty with no axes drawn, and the error in the part that failed.

## Forms (rare, but they exist)

- A visible label above the field; the hint and the error stay visible beside it (no tooltip) and are tied with `aria-describedby`. The error says what is wrong and how to fix it, begins with a hidden «Feil:», and has the same words in the `FormErrorSummary` and beside the field.
- **Validate on submit**, not while typing or on leaving the field, and on the server too. After submit show the summary at the top and move focus to it, list each error as a link to its field, and keep what the reader wrote. Do not use the HTML `required` attribute (use `novalidate` and say it in words); mark only the minority: «(valgfritt)» when most fields are required. (GOV.UK, validation and error summary.)
- A switch takes effect at once; a checkbox needs an explicit save. The label names the setting, not the state (Primer, toggle switch). Read-only is shown as text; avoid `disabled` and say why.

## Tables

`aria-sort` on the sorted column header, and the sort control is a link or button of at least 24 px (`SortHeader`). A table that scrolls sideways in a narrow window has a focusable wrapper. A page change is announced («11–20 av 100»); nothing is announced for content that arrives within 750 ms. (Primer, data table accessibility.)

## Targets

WCAG 2.2 target size (2.5.8) is 24 × 24 CSS px; the exceptions are spacing (a 24 px circle centred on the target overlaps no other target), an equivalent control, an inline link in a sentence, a browser control and what is essential. Ours are larger than that on touch.

## Common mistakes

- An icon with no text and no label (a button that says nothing to a screen reader).
- A status told only by red.
- A link text that repeats on every row without context (the row's own name is the link text: good).
- Opacity on text to make it «quieter» (use `tone="muted"`).
- A `div` with `onClick` instead of a `button` or `a`.

Before finishing, run **designsystem-review**.
