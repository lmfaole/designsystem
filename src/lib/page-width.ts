/** The column every page stands in, the same for every app and page: the whole width of the page area, with gutters that grow with the screen. It is the frame; what is read stands in the reading column inside it (`READING_COLUMN`). */
export const PAGE_COLUMN = "w-full px-4 sm:px-6 2xl:px-10"

/**
 * The reading column: what is read (titles, lists, sections, text) stands in ONE column, under each other, in the order it
 * matters, at a width the eye can follow from the start of a line to its end (48rem). On a wide screen the rest is margin, not
 * more columns: a row of columns makes the reader read across and then down, hides what comes first and spreads the eye's work.
 * Pages that are mostly pictures or charts are `width="wide"` instead.
 */
export const READING_COLUMN = "mx-auto w-full max-w-3xl"

/**
 * A page with a PANE: the reading column and, beside it on a screen wide enough, a pane of reference or support (`Split`): 48rem of
 * reading + 2rem of gap + a pane of at most 20rem. The text keeps its measure and the width a desktop has goes to the pane, not to
 * longer lines or margin (Material 3's supporting pane, GOV.UK's two-thirds and one-third, Primer's PageLayout pane).
 */
export const PANE_COLUMN = "mx-auto w-full max-w-[70rem]"

/** The numbers behind the classes above and `Split`, in rem, so a test can hold them to each other (`page-width.test.ts`). */
export const LAYOUT_REM = { reading: 48, gap: 2, paneMin: 16, paneMax: 20, panePage: 70, splitAt: 56 } as const

/**
 * The width classes, by the room the page HAS (container queries), not by device: what changes at each is in the guide «Wide screens».
 * Close to Material 3's (600, 840, 1200, 1600 px) and named the same, in rem so they follow the reader's text size.
 */
export const WIDTH_CLASSES = [
  { name: "compact", fromRem: 0, layout: "one column; a pane stands above (`start`) or under (`end`) the main content" },
  { name: "medium", fromRem: 40, layout: "one column, wider gutters; pictures and cards two or three across" },
  { name: "expanded", fromRem: 56, layout: "the pane beside the main content; the reading column at its full 48rem" },
  { name: "large", fromRem: 75, layout: "as expanded, centred; pictures, cards and charts more across on a wide page" },
  { name: "extra-large", fromRem: 100, layout: "as large: the line does not grow; a wide page (a gallery, a dashboard) takes more across" },
] as const

/** The room above and under a page's content, the same in `PageLayout` and `PageColumn`. */
export const PAGE_PADDING_Y = "py-10"
