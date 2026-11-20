import { fallbackOf, srcSetOf, type PictureSource } from '../lib/picture-sources'
import { Disc } from './disc'
import { CORNERS, DRAWN, FRAMES, type PictureCorners, type Ratio, SIZES, type Size } from '../lib/picture-frames'
import { cn } from '../lib/utils'

export { type PictureCorners } from '../lib/picture-frames'

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
  /** A record playing now: round with a hole in the middle, and drawn in WebGL, it turns slowly for as long as it plays (12 s a turn) under the page's one light (`LightSource`), and a tap pauses it; in CSS where WebGL is not there; still under reduced motion. Needs `ratio="square"`; always with the words «playing now» beside it. */
  disc?: boolean
}) {
  const [width, height] = SIZES[ratio][size]
  const drawn = DRAWN[ratio][size]
  const set = srcSetOf(sources, drawn)
  const shown = src ?? (sources === undefined ? undefined : fallbackOf(sources, drawn)?.src)
  const shape = corners === 'round' && ratio === 'poster' ? 'soft' : corners
  if (disc && ratio === 'square') return <Disc src={src} {...(sources === undefined ? {} : { sources })} size={size} />
  return (
    <div aria-hidden="true" className={cn('shrink-0 overflow-hidden bg-muted', CORNERS[shape], FRAMES[ratio][size], size === 'hero' && 'shadow-md')}>
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
    </div>
  )
}
