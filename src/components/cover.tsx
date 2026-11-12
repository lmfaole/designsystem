import { appUrl } from '../lib/base-url'
import { cn } from '../lib/utils'

/** A poster is 2:3 (films, series, books, most games); a square is an album, a box or a podcast. */
type Ratio = 'poster' | 'square'
/** `row` stands in front of a row of a list; `hero` heads the page of the thing itself; `fill` is a tile of a gallery, as wide as its cell. */
type Size = 'row' | 'hero' | 'fill'

const FRAMES: Record<Ratio, Record<Size, string>> = {
  poster: { row: 'aspect-[2/3] w-10', hero: 'aspect-[2/3] w-24 sm:w-28 @3xl:w-40 @5xl:w-48', fill: 'aspect-[2/3] w-full' },
  square: { row: 'size-10', hero: 'size-28 sm:size-32 @3xl:size-44 @5xl:size-56', fill: 'aspect-square w-full' },
}
const SIZES: Record<Ratio, Record<Size, [number, number]>> = {
  poster: { row: [40, 60], hero: [96, 144], fill: [200, 300] },
  square: { row: [40, 40], hero: [112, 112], fill: [200, 200] },
}

/**
 * The picture of one thing (a film's poster, an album's cover) in a frame of its own. The frame is always there, so the rows of
 * a list stay level when there is no picture or it fails to load: it is then just not drawn in it, with no script to find out.
 * Decorative: the name beside it says what it is. One component for every app, so a cover looks the same wherever it is.
 */
export function Cover({ url, ratio = 'poster', size = 'row', rooted = false }: { url: string | null | undefined; ratio?: Ratio; size?: Size; /** The address is a path of the host (another app's picture), not one under this app's base. */ rooted?: boolean }) {
  const [width, height] = SIZES[ratio][size]
  return (
    <div aria-hidden="true" className={cn('shrink-0 overflow-hidden rounded-md bg-muted', FRAMES[ratio][size], size === 'hero' && 'shadow-md')}>
      {url ? <img src={rooted ? url : appUrl(url)} alt="" loading="lazy" decoding="async" width={width} height={height} className="size-full object-cover" /> : null}
    </div>
  )
}
