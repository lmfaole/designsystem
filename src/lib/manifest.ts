export interface ManifestIcon {
  src: string
  sizes: string
  type: string
  purpose: "any" | "maskable"
}

export interface ManifestInput {
  name: string
  /** Under 12 characters: it is the name under the icon. */
  shortName: string
  description: string
  /** The address of the app, once and for all: never changed after it is installed (an installed copy is known by it). */
  id: string
  /** Ends with a slash: a scope is a prefix, so `/start` would also be `/startfoo`. */
  scope: string
  startUrl: string
  icons: readonly ManifestIcon[]
  /** Opaque `#rrggbb`: a manifest takes no variables and no transparency. The system's dark values are in the guide «Installed apps (PWA)». */
  background: string
  theme: string
}

const OPAQUE = /^#[0-9a-f]{6}$/i

/**
 * A web app manifest that meets what browsers need to offer installing, or an error that says what is wrong: an explicit `id`, a scope that
 * ends in a slash with a start address inside it, an `any` icon and a separate `maskable` icon at 192 and 512 pixels (never one icon that is
 * both), and opaque colours. The colours are passed in, as opaque hex. There is no install button: installing is the browser's own.
 */
export function webManifest(input: ManifestInput) {
  const problems: string[] = []
  if (input.shortName.length > 12) problems.push("shortName is longer than 12 characters")
  if (!input.id.startsWith("/")) problems.push("id must be an address starting with /")
  if (!input.scope.startsWith("/") || !input.scope.endsWith("/")) problems.push("scope must start and end with /")
  if (!input.startUrl.startsWith(input.scope)) problems.push("startUrl must be inside scope")
  for (const colour of [input.background, input.theme]) if (!OPAQUE.test(colour)) problems.push(`colour ${colour} must be opaque hex (#rrggbb)`)
  for (const purpose of ["any", "maskable"] as const) {
    for (const size of ["192x192", "512x512"]) {
      if (!input.icons.some((icon) => icon.purpose === purpose && icon.sizes === size)) problems.push(`an icon with purpose ${purpose} at ${size} is missing`)
    }
  }
  if (problems.length > 0) throw new Error(`Manifest: ${problems.join("; ")}`)
  return {
    name: input.name,
    short_name: input.shortName,
    description: input.description,
    id: input.id,
    scope: input.scope,
    start_url: input.startUrl,
    display: "standalone" as const,
    background_color: input.background,
    theme_color: input.theme,
    lang: "nb",
    icons: input.icons.map((icon) => ({ src: icon.src, sizes: icon.sizes, type: icon.type, purpose: icon.purpose })),
  }
}

/** Whether an address is inside a scope: the scope is a prefix that ends in a slash, so `/start` is the app and `/startfoo` is not. */
export function inScope(path: string, scope: string): boolean {
  return path === scope.replace(/\/$/, "") || path.startsWith(scope)
}
