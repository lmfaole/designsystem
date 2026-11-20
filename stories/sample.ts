/** Made-up pictures for the stories: SVG data URIs, so nothing is fetched and no project's artwork is needed. */
function svg(width: number, height: number, hue: number, label: string): string {
  const body = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="hsl(${hue} 45% 45%)"/><text x="50%" y="50%" fill="white" font-family="sans-serif" font-size="${Math.round(width / 5)}" text-anchor="middle" dominant-baseline="central">${label}</text></svg>`
  return `data:image/svg+xml,${encodeURIComponent(body)}`
}

export const poster = (hue: number, label = "A"): string => svg(200, 300, hue, label)
export const square = (hue: number, label = "A"): string => svg(200, 200, hue, label)

/** Twelve months of made-up counts, for the charts. */
export const MONTHS = ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"].map((label, index) => ({
  label,
  value: [12, 18, 9, 24, 31, 27, 15, 22, 38, 33, 19, 26][index] ?? 0,
}))

/** A made-up album cover with a gradient and a disc of colour on it, so a sleeve in 3D has something to catch the light on. */
export function albumCover(from: string, middle: string, to: string, spot: string): string {
  const body = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset=".55" stop-color="${middle}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="300" height="300" fill="url(#g)"/><circle cx="190" cy="105" r="58" fill="${spot}"/><rect x="28" y="230" width="150" height="14" fill="white" opacity=".85"/><rect x="28" y="252" width="96" height="9" fill="white" opacity=".6"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(body)}`
}
