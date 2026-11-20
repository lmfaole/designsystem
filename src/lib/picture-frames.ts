/** The frames of a picture: its ratio, its size, the shape of its corners. In a file of its own so the disc (a client component) and `Picture` share them. */

/** A poster is 2:3 (a book, a film); a square is a cover, a box or an avatar. */
export type Ratio = 'poster' | 'square'
/**
 * The shape of the frame: what KIND of thing the picture is of, so a reader tells a person from a record from a film before reading. One shape for each kind, the same everywhere in an app,
 * and never for decoration. `normal` is the default and what every picture has had. `sharp` is a sleeve or a plate (a record's cover, a box); `soft` is a tile with large corners (a single, an item); `round`
 * is a person or a group, and needs `ratio="square"` (a poster frame cannot be a circle, so it falls back to `soft`).
 */
export type PictureCorners = 'sharp' | 'normal' | 'soft' | 'round'

export const CORNERS: Record<PictureCorners, string> = { sharp: 'rounded-sm', normal: 'rounded-md', soft: 'rounded-[30%]', round: 'rounded-full' }

/** `row` stands in front of a row of a list; `hero` heads the page of the thing itself; `fill` is a tile of a gallery, as wide as its cell. */
export type Size = 'row' | 'hero' | 'fill'

export const FRAMES: Record<Ratio, Record<Size, string>> = {
  poster: { row: 'aspect-[2/3] w-10', hero: 'aspect-[2/3] w-24 sm:w-28 @3xl:w-40 @5xl:w-48', fill: 'aspect-[2/3] w-full' },
  square: { row: 'size-10', hero: 'size-28 sm:size-32 @3xl:size-44 @5xl:size-56', fill: 'aspect-square w-full' },
}
export const SIZES: Record<Ratio, Record<Size, [number, number]>> = {
  poster: { row: [40, 60], hero: [96, 144], fill: [200, 300] },
  square: { row: [40, 40], hero: [112, 112], fill: [200, 200] },
}

/** The widest the frame is drawn, in CSS pixels, at any width (the hero grows with its container): what `sizes` promises the browser. */
export const DRAWN: Record<Ratio, Record<Size, number>> = {
  poster: { row: 40, hero: 192, fill: 320 },
  square: { row: 40, hero: 224, fill: 320 },
}
