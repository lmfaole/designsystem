/**
 * Whether the visitor wants the drawn effects (WebGL): an app sets `data-effects="off"` on `<html>` from the visitor's choice (`lib/preferences`, `htmlAttributes`), and then every component that would
 * make a WebGL context (`AmbientBackdrop`, `AlbumSleeve`, `Disc`, and so everything built on them) shows its plain fallback instead and makes none. The nearest `data-effects` above `from` wins over the
 * root's, so a part of a page can show both (`EffectsPreview`). On the server, and where nothing is set, the effects are on.
 */
export function effectsEnabled(from?: Element | null): boolean {
  if (typeof document === "undefined") return true
  const scoped = from?.closest("[data-effects]")?.getAttribute("data-effects")
  return (scoped ?? document.documentElement.dataset.effects) !== "off"
}
