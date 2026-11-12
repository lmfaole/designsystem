import { ENTITY_LINK } from "../lib/link-style"

// CSS columns, not a grid, so the numbered order reads down each column.
const LIST_COLUMNS_STORIES = "xl:block xl:columns-2 xl:gap-x-10 xl:[&>li]:mb-4 xl:[&>li]:break-inside-avoid 2xl:columns-3"

export interface Story {
  key: string
  href: string
  title: string
  /** The line under the title: where it is from and when. */
  byline: string
}

/** A numbered-by-order list of stories, each a large link out to another site with its byline under it. */
export function StoryList({ stories }: { stories: readonly Story[] }) {
  return (
    <ol className={`grid gap-4 ${LIST_COLUMNS_STORIES}`}>
      {stories.map((story) => (
        <li key={story.key} className="grid gap-1">
          <a href={story.href} rel="noreferrer" className={`${ENTITY_LINK} font-heading text-lg font-medium`}>
            {story.title}
          </a>
          <p className="text-sm text-muted-foreground">{story.byline}</p>
        </li>
      ))}
    </ol>
  )
}
