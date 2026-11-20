import { Text } from "./text"

const THEMES = { light: ["light"], dark: ["dark"], system: ["light", "dark"] } as const

/**
 * A picture of a page in a theme, for the theme's choice (`ChoiceCards`' `preview`): drawn by the theme's own tokens under `data-theme`, so it is what the page will look like, not a picture of
 * it. `system` is half light and half dark. `size="sm"` is a thumbnail for the end of a list card; `size="lg"` fills a visual card (`ChoiceCards layout="visual"`). Decorative.
 */
export function ThemeSample({ theme, size = "sm" }: { theme: "system" | "light" | "dark"; size?: "sm" | "lg" }) {
  const large = size === "lg"
  return (
    <span aria-hidden="true" className={`border-border flex overflow-hidden border ${large ? "aspect-[16/7] w-full rounded-lg sm:aspect-[4/3]" : "h-12 w-20 rounded-md"}`}>
      {THEMES[theme].map((one) => (
        <span key={one} data-theme={one} className={`bg-background text-foreground grid min-w-0 flex-1 content-start ${large ? "gap-2 p-3" : "gap-1 p-1.5"}`}>
          <Text as="span" size={large ? "lg" : "xs"} weight="semibold">
            Aa
          </Text>
          <span className={`bg-muted-foreground/60 block w-3/4 rounded-full ${large ? "h-1.5" : "h-1"}`} />
          {large ? <span className="bg-muted-foreground/40 block h-1.5 w-1/2 rounded-full" /> : null}
          <span className={`bg-primary block w-1/2 rounded-full ${large ? "mt-1 h-3" : "h-1.5"}`} />
        </span>
      ))}
    </span>
  )
}
