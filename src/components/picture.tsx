import { fallbackOf, srcSetOf, type PictureSource } from '../lib/picture-sources'
import { cn } from '../lib/utils'

/** A poster is 2:3 (a book, a film); a square is a cover, a box or an avatar. */
type Ratio = 'poster' | 'square'
/**
 * The shape of the frame: what KIND of thing the picture is of, so a reader tells a person from a record from a film before reading. One shape for each kind, the same everywhere in an app,
 * and never for decoration. `normal` is the default and what every picture has had. `sharp` is a sleeve or a plate (a record's cover, a box); `soft` is a tile with large corners (a single, an item); `round`
 * is a person or a group, and needs `ratio="square"` (a poster frame cannot be a circle, so it falls back to `soft`).
 */
export type PictureCorners = 'sharp' | 'normal' | 'soft' | 'round'

const CORNERS: Record<PictureCorners, string> = { sharp: 'rounded-sm', normal: 'rounded-md', soft: 'rounded-[30%]', round: 'rounded-full' }

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

/** The widest the frame is drawn, in CSS pixels, at any width (the hero grows with its container): what `sizes` promises the browser. */
const DRAWN: Record<Ratio, Record<Size, number>> = {
  poster: { row: 40, hero: 192, fill: 320 },
  square: { row: 40, hero: 224, fill: 320 },
}

/**
 * The picture of one thing in a frame of its own. The frame is always there, so the rows of a list stay level when there is
 * no picture or it fails to load: it is then just not drawn in it, with no script to find out. Decorative: the name beside it
 * says what it is. `src` is the address as the browser asks for it; resolving it (a base path, a CDN) is the project's.
 */
export function Picture({ src, sources, priority = false, ratio = 'poster', size = 'row', corners = 'normal', disc = false }: {
  src: string | null | undefined
  /** The same picture in the widths its source offers: the browser takes the smallest that is sharp here (`srcset`), not the largest. */
  sources?: readonly PictureSource[]
  /** The one picture that is the page's largest thing on load (the hero of a detail page): fetched at once and first, never lazily. */
  priority?: boolean
  ratio?: Ratio
  size?: Size
  /** What kind of thing it is, as a shape (see `PictureCorners`). */
  corners?: PictureCorners
  /** A record playing now: round with a hole in the middle, and it spins three times and slows to a stop (under five seconds, then still). Needs `ratio="square"`; always with the words «playing now» beside it. */
  disc?: boolean
}) {
  const [width, height] = SIZES[ratio][size]
  const drawn = DRAWN[ratio][size]
  const set = srcSetOf(sources, drawn)
  const shown = src ?? (sources === undefined ? undefined : fallbackOf(sources, drawn)?.src)
  const spinning = disc && ratio === 'square'
  const shape = spinning ? 'round' : corners === 'round' && ratio === 'poster' ? 'soft' : corners
  return (
    <div aria-hidden="true" className={cn('shrink-0 overflow-hidden bg-muted', CORNERS[shape], FRAMES[ratio][size], size === 'hero' && 'shadow-md', spinning && 'motion-disc relative')}>
      {shown ? (
        <img
          src={shown}
          {...(set === null ? {} : { srcSet: set.srcSet, sizes: set.sizes })}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          {...(priority ? { fetchPriority: 'high' as const } : {})}
          decoding="async"
          width={width}
          height={height}
          className={cn('size-full object-cover', shape === 'round' && 'object-top')}
        />
      ) : null}
      {spinning ? <span className="bg-background ring-foreground/25 absolute top-1/2 left-1/2 size-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full ring-1" /> : null}
    </div>
  )
}
