import { cn } from '../lib/utils'

/** A poster is 2:3 (a book, a film); a square is a cover, a box or an avatar. */
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
 * The picture of one thing in a frame of its own. The frame is always there, so the rows of a list stay level when there is
 * no picture or it fails to load: it is then just not drawn in it, with no script to find out. Decorative: the name beside it
 * says what it is. `src` is the address as the browser asks for it; resolving it (a base path, a CDN) is the project's.
 */
export function Picture({ src, ratio = 'poster', size = 'row' }: { src: string | null | undefined; ratio?: Ratio; size?: Size }) {
  const [width, height] = SIZES[ratio][size]
  return (
    <div aria-hidden="true" className={cn('shrink-0 overflow-hidden rounded-md bg-muted', FRAMES[ratio][size], size === 'hero' && 'shadow-md')}>
      {src ? <img src={src} alt="" loading="lazy" decoding="async" width={width} height={height} className="size-full object-cover" /> : null}
    </div>
  )
}
