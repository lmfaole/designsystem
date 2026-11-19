/** The same picture in several widths (the source's own sizes: TMDB's w92, w185, w342; Last.fm's 64s, 174s, 300x300). */
export interface PictureSource {
  src: string
  /** Its width in pixels. */
  width: number
}

/**
 * `srcset` and `sizes` for a picture drawn at `drawn` CSS pixels: every source with its width, so the browser takes the smallest that is
 * sharp at the screen's density instead of the largest the API offers. `null` with fewer than two sources (nothing to choose between).
 */
export function srcSetOf(sources: readonly PictureSource[] | undefined, drawn: number): { srcSet: string; sizes: string } | null {
  const usable = (sources ?? []).filter((source) => source.src !== "" && Number.isFinite(source.width) && source.width > 0)
  if (usable.length < 2) return null
  const sorted = [...usable].sort((a, b) => a.width - b.width)
  return { srcSet: sorted.map((source) => `${source.src} ${source.width}w`).join(", "), sizes: `${drawn}px` }
}

/** The source to put in `src`: the smallest that covers the picture at twice its size (a sharp first choice where `srcset` is not read). */
export function fallbackOf(sources: readonly PictureSource[], drawn: number): PictureSource | undefined {
  const sorted = [...sources].sort((a, b) => a.width - b.width)
  return sorted.find((source) => source.width >= drawn * 2) ?? sorted.at(-1)
}
