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

## How to check

1. **Storybook:** open the story, the **Accessibility** panel at the bottom must show no violations in light and dark.
2. **Keyboard:** tab through the page. Every control is reachable in a sensible order, the focus is always visible, nothing traps it.
3. **Screen reader:** read one list and one detail page. Do rows read as «kind, name, status, date»? Does a link out say it leaves?
4. **Zoom:** 400 px wide and 200 % zoom.
5. **Greyscale:** is every state still told apart?
6. **Reduced motion:** turn it on; nothing should move.

## Common mistakes

- An icon with no text and no label (a button that says nothing to a screen reader).
- A status told only by red.
- A link text that repeats on every row without context (the row's own name is the link text: good).
- Opacity on text to make it «quieter» (use `tone="muted"`).
- A `div` with `onClick` instead of a `button` or `a`.

Before finishing, run **designsystem-review**.
