---
name: designsystem-review
description: Use after building or changing a page or component with the design system, and when asked to review one - runs a checklist across UX, UI, accessibility and content and reports concrete findings. Run it before saying the work is done.
---

# Review against the design system

Go through the page or component and report **findings with where and what to change**. Do not say «looks good»; say what you
checked. Fix what is a clear violation, report what is a judgement call.

## 1. Look at it

Render it (Storybook, or the running app) at **400, 1440 and 2560 px**, in **light and dark**. Take a screenshot of each. Open a list
and a detail page, not only the front page.

## 2. Checklist

**Structure (designsystem-ux)**
- [ ] At most three levels; the front page is a digest (counts first, 3–5 items per section, «Se alle»).
- [ ] A thing with more to say has a detail page with an address; the link out to another site is last and named.
- [ ] A row links to the app's own page, not out.
- [ ] `NavBar` (as `nav` on `PageLayout`) in the same order on every page, the current place marked, never tabs for navigation; `Breadcrumbs` on every page that has a parent (the title is not repeated in a second heading); `SubPages` (one column, not cards) where a page has subpages.
- [ ] Several things of one kind (reviewers, labels) are several values of one `FactList` term, stacked, never `a, b, c` in one line.
- [ ] Loading, empty, error and not-found are designed; one failing source does not take the page down.

**Reading and hierarchy (designsystem-hierarchy)**
- [ ] Everything that is read is in **one column, under each other**; no `Grid` for text, lists or sections; the rest of a wide screen is margin.
- [ ] The order top to bottom is the priority, the same at every width; one thing is first.
- [ ] Three levels of type, visibly different; `destructive` and bold only for what stops something.
- [ ] Space groups (the gap between sections is larger than inside one); no boxes or lines to group.
- [ ] One left edge; a row's date is at the end of the same row; the first thing in every row is the same kind of thing.

**Look (designsystem-ui)**
- [ ] No `className`, `style`, raw colour, or stylesheet in the project; only components and tokens.
- [ ] Spacing is a named step; columns only for pictures, charts, cards of equal weight and figures.
- [ ] One `<h1>`; headings in order; type only through `Text`/`Heading`.
- [ ] Cards only where a card is right; `destructive` only for what stops something.
- [ ] Icons where they carry meaning (section titles, row kind, statuses, actions), none as decoration, none repeated without reason.

**Accessibility (designsystem-accessibility)**
- [ ] Storybook accessibility panel: no violations, light and dark.
- [ ] Keyboard: reachable, visible focus, no trap. Targets at least 24 px.
- [ ] Every state is told by a symbol and words, not colour alone (check in greyscale).
- [ ] An icon that stands alone has a label; an icon-only button has an `aria-label`.
- [ ] 400 px / 200 % zoom: nothing cut off or scrolling sideways. Reduced motion: nothing moves.

**Content (designsystem-content)**
- [ ] Norwegian bokmål; short noun titles; controls say what happens; links name where they go.
- [ ] Dates, times and numbers formatted with `Intl` (nb-NO, Europe/Oslo); `−` for minus; counts have singular and plural.
- [ ] One word per meaning for statuses.

**Code**
- [ ] No `lucide-react` import in a page; icons by meaning.
- [ ] `npm run verify` and, in the design system, `npm run build-storybook` pass.

## 3. Report

For each finding: **severity** (violates a rule / should fix / judgement), **where**, **what is wrong**, **what to do**. End with
what you checked and what you could not (for example, a screen reader or a real device).
