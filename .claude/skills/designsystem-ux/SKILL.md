---
name: designsystem-ux
description: Use when deciding how a page or a set of pages is structured with the design system - what goes on a front page, what gets a list page or a detail page, how pages link to each other, what navigation to use, how loading, empty and error states look, and when a link may leave the app. Use before building or changing any page, not after.
---

# UX with the design system

The rules are in the README («Pages and navigation», rule 11) and in Storybook (**Guides / Pages and navigation**). This is the
working version: decide the structure first, then build it from the components named here.

## 1. Decide the levels first

A place has at most **three levels**: front page → list → detail (in an app with subpages: front page → page → subpage or detail). A fourth means the structure is wrong.

| Level | It is | It answers | Built from |
| --- | --- | --- | --- |
| Front page | A **digest** | Do I have to do something now? | `SummaryBar`, `PageSection` with `more`, `Rows` |
| List | **Everything** of one kind, in groups | What is there? | `SectionGroup`, `SubSection`, `Rows`, `NavBar` |
| Detail | **One thing**, enough to decide | What is this, what do I do? | `Breadcrumbs`, `PageHeader`, `StatusLine`, `FactList`, `LinkButton` |

A thing needs a **detail page** when it has more to say than a row can (a description, a history, checks) *and* the reader needs
that to decide. A thing that is one line (an hour of the forecast) has none. A detail page has an **address of its own**
(`/pull-requests/owner/repo/12`); it is never only a dialog.

## 2. The front page is a digest

1. `SummaryBar` first: counts, each a link to the group it counts. Leave out zeros.
2. Then each source gets **one section of three to five items**, picked by *need* (blocked before waiting, oldest review first),
   not by time, with `more={{ href, label: "Se alle 14" }}` on the section.
3. Aim for one screen of what matters, **two at most on a phone**. Digest rows are compact: no secondary line, at most two
   statuses, the one that stops something first.
4. A section with nothing for the reader: one quiet line, or nothing. Never an empty box.
5. **Complete at rest.** What matters is visible without a click. «Se alle» is navigation to a page, never a «vis mer» that opens
   in place.
6. Things that belong together are one `SectionGroup`, with an icon on its title.
7. **The sections stand under each other** in the order of what needs the reader (never side by side); the order is the priority.

## 3. Links

1. **Internal first.** A name in a row links to the app's own page for the thing. Leaving is a choice made on the detail page.
2. A link out (`ExternalLink`, `LinkButton external`) carries the external symbol, is read as external, **names the place**
   («Åpne på GitHub», never «Les mer»), and comes **last** on the page, once for each place.
3. Where there is no page of our own (a credit, «Værdata fra Yr»), an `ExternalLink` in running text is right.
4. Links open in the same window (an installed app has no tabs).
5. Plain `<a>` in the components do not add an app's base path: write the full path (`/start/issues`).

## 4. Navigation

- **`NavBar`** between the top-level places, as `nav` on `PageLayout`: a bar at the foot of the screen on a phone, a rail at the left from
  tablet width. Three to five places, one-word labels, the same order on every page, the current one marked (on a detail page: the
  list it belongs to).
- **Navigation is not tabs.** Tabs switch views of the same content on one page; navigation goes to another page. Never build navigation
  as a row of tabs under the title, and never hide content in tabs: the design system has no tabs component.
- **Breadcrumbs on every page that has a parent** (`Breadcrumbs`; a subpage, a detail, a page of an app in a group): the whole trail from tablet width, the parent alone as a way back on a
  phone. The breadcrumbs say *where*, the title says *what*: never repeat the title in a second heading. The first crumb is the group
  (`Hjem`, `Medier`) and links to the page that lists its apps: that is how the reader moves between apps.
- **A page with subpages shows them with `SubPages`** under the title: a list in ONE column (icon, name, one line of what is on it), never
  cards, buttons or a second menu. Top-level pages are in the `NavBar` (at most five); everything else is a subpage or a detail.
- A count in `SummaryBar` is a link to what it counts.

## 5. States

Every page that fetches has all four states, designed:

| State | Do |
| --- | --- |
| Loading | Show the page frame at once; a part that waits is `Skeleton`, not a blank. |
| Empty | One quiet line that says what would be here and what to do («Ingen åpne pull requests.»). |
| Error | `ErrorMessage` **in the part that failed**, with what went wrong. One failing source never takes the page down: each part asks for its data and shows its own error. |
| Not found | `notFound()` and `NotFoundPage`; check an address before it goes into a query. |

State is told **in form** (a symbol and words), and `destructive` is only for what stops something.

## 6. Live pages

A page that updates while open keeps what is on screen until the new content has arrived, never empties, and says when it was
last built («oppdatert 19:27»). Pause when the window is hidden or offline.

## Don't

- Don't show the whole list on the front page and again on the list page.
- Don't hide what matters behind «vis mer», tabs or accordions.
- Don't let a tap on a row leave the app when the app has a page for it.
- Don't put a modal where a page with an address would do.
- Don't mark everything urgent.

Layout and order: see **designsystem-hierarchy**. Before finishing, run **designsystem-review**.
