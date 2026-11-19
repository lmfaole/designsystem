---
name: designsystem-hierarchy
description: Use when laying out a page or a list with the design system, or deciding the order, grouping, emphasis and width of what a person reads - one reading column, order as priority, one thing first, visual hierarchy, spacing as grouping, and when columns are allowed. Use before reaching for Grid or Split and whenever a page feels busy or unclear.
---

# Reading and hierarchy

The rules are README rule 7 and «Reading and hierarchy», and Storybook **Guides / Reading and hierarchy**. The principle: **one
reading direction, down.** What is read stands under each other, in one column, in the order it matters.

## 1. One column for everything that is read

- Titles, lists of text, the sections of a page, prose: **under each other**. Use `Stack` (gaps `lg`/`xl` between sections) inside
  the page's **reading column** (`PageLayout width="reading"`, the default: 48rem, centred).
- **Never** a grid that makes the reader read across and then down. A row of equal columns puts the order in doubt, hides what is
  first, and spreads the eye's work. There is no `Grid columns="sections"`, no list in columns, and a `SectionGroup`'s subsections
  are always under each other. A test fails if they come back.
- On a wide screen the LINE does not grow: text stays at 45–75 characters (the 48rem column). The width a desktop has goes, in this
  order, to (1) a **pane** beside the main content, when the page has something to look up (a cover and its facts,
  related things): `PageLayout width="pane"` and `Split` (`position="start"` for who the page is about, `"end"` for support);
  (2) **more across** of what is looked at (pictures, cards, charts) on a `width="wide"` page; (3) otherwise **margin**. Never to
  longer lines, a second list beside the first, or the same content spread thin. See the guide «Wide screens».
- **Columns are for what is looked at, not read:** pictures (`Tiles`), charts (`Grid columns="charts"`), cards of equal weight
  (`Grid columns="cards"`), a few figures or chips (`SummaryBar`), and a `Split` rail of *reference* (a cover and its facts)
  beside the main content. A page that is mostly such things is `width="wide"`.
- Ask before you use `Grid` or `Split`: «is this read, or looked at?» If read, stack it.

## 2. Order is priority

Top to bottom is most to least important, the same on every screen width. Decide the order **first**, then build it. If two things
matter equally, one still goes first. Put the summary and the few that matter before the long list.

## 3. One thing first

The first thing the eye lands on is the one that matters most. Not two. On a front page that is the `SummaryBar`, or the single
section that needs the reader now; on a detail page it is the title and the status.

## 4. Three levels, visibly different

Page title (`PageHeader`, `Heading level={1}`), section title (`PageSection`, `look="label"`/`"section"`), item (the row's name).
Each differs in size, weight or case. **No fourth level of emphasis.** `destructive` and bold are for what stops something.

## 5. Space groups, not lines or boxes

- Things that belong together are close: `gap="xs"` or `"sm"`.
- Groups are further apart: `"lg"` or `"xl"`. **The gap between sections is always larger than the gap inside one.**
- **Three steps of space,** each larger than the one inside it, never the same gap at two levels: inside an item `xs`/`sm`, between items of one group `sm`/`md`, between groups `lg`/`xl`.
- **A heading is closer to its own content than to what is above it.** Do not put a `Stack` with a bigger gap than the section's own inside a section: the content then reads as two groups.
- **Space first.** A thin line only when a gap does not separate, a box only when a line does not, one of them for one level and never nested. A card is only for one self-contained item (`designsystem-ui`, cards); one set of facts is a `FactList`.
- **Grouping is two levels** (`SectionGroup` and `SubSection`); a third level is a page. **Disclosure is two levels:** what is needed, then «Se alle».
- **Room for what matters.** The most important thing has space around it; a dense part is fine, a crowded page is not.
- **A row starts with what tells it apart**, not with what every row repeats (move that into the icon or the section title). A heading starts with its meaning.

## 6. One left edge, a short eye path

- Everything starts at the same left edge; do not centre text or lists inside the column.
- A date or count is at the end of the **same row**, in a row no wider than the reading column, so the eye can cross it.
- Prose is 45–75 characters (`Stack width="prose"`, `max-w-prose`).

## 7. Rows are scanned down the left

Every row of a list starts with the same thing (the kind icon, then the name). The **name is the strongest part**; everything else
is `Text tone="muted"` and small. All rows of a list have one structure (`Rows`, `PictureRows`).

## 8. Several of a kind stack

Several things of one kind (reviewers, labels, assignees) are **under each other**, never `a, b, c` in one line. In a `FactList` they are
several values of one term, which is written once (`["Reviewere", ["zenabii", "Stormoen"]]`). A list is scanned down; a sentence
is read along.

## 9. Do not make the reader choose a path

One column is one path. Do not put two lists side by side to compare (that is a table). Do not hide what fits under behind tabs.

## 10. Check it

1. Look at **400, 768, 1024, 1440 and 2560 px** (compact, medium, expanded, large, extra-large) and at 200 % zoom. At each width the
   reader can read straight down; from 1024 px (about 1150 px with a `NavBar` rail) a detail page's pane is beside the main content, and no line is longer at 2560 than at 1440.
2. Cover all but the first screen: is it clear what matters most?
3. Squint: are the three levels still different? Is anything shouting that should not?
4. Follow the left edge: does it say what every row is?

Before finishing, run **designsystem-review**.
