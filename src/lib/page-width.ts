/** The column every page stands in, the same for every app and page: the whole width of the page area, with gutters that grow with the screen. There is no maximum width: wide screens are used by laying content out in more columns (`Grid`, `Split`, `LIST_COLUMNS`), not by leaving the sides empty. */
export const PAGE_COLUMN = "w-full px-4 sm:px-6 2xl:px-10"

/** The room above and under a page's content, the same in `PageLayout` and `PageColumn`. */
export const PAGE_PADDING_Y = "py-10"

/** A list of rows that flows into as many columns as there is room for (at least 26rem each), for the rows of `Rows`, `MediaRows`, `TrackRows` and `EntityRows`. Row by row, so a ranking reads left to right. */
export const LIST_COLUMNS = "grid-cols-[repeat(auto-fill,minmax(min(100%,26rem),1fr))] gap-x-8"
