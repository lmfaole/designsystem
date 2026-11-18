/** The column every page stands in, the same for every app and page: the whole width of the page area, with gutters that grow with the screen. It is the frame; what is read stands in the reading column inside it (`READING_COLUMN`). */
export const PAGE_COLUMN = "w-full px-4 sm:px-6 2xl:px-10"

/**
 * The reading column: what is read (titles, lists, sections, text) stands in ONE column, under each other, in the order it
 * matters, at a width the eye can follow from the start of a line to its end (48rem). On a wide screen the rest is margin, not
 * more columns: a row of columns makes the reader read across and then down, hides what comes first and spreads the eye's work.
 * Pages that are mostly pictures or charts are `width="wide"` instead.
 */
export const READING_COLUMN = "mx-auto w-full max-w-3xl"

/** The room above and under a page's content, the same in `PageLayout` and `PageColumn`. */
export const PAGE_PADDING_Y = "py-10"
