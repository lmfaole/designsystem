import { Text } from "./text"

const THEMES = { light: ["light"], dark: ["dark"], system: ["light", "dark"] } as const

/**
 * A small picture of a page in a theme, for the theme's choice (`ChoiceCards`' `preview`): drawn by the theme's own tokens under
 * `data-theme`, so it is what the page will look like, not a picture of it. `system` is half light and half dark. Decorative.
 */
export function ThemeSample({ theme }: { theme: "system" | "light" | "dark" }) {
  return (
    <span aria-hidden="true" className="border-border flex h-12 w-20 overflow-hidden rounded-md border">
      {THEMES[theme].map((one) => (
        <span key={one} data-theme={one} className="bg-background text-foreground grid min-w-0 flex-1 content-start gap-1 p-1.5">
          <Text as="span" size="xs" weight="semibold">
            Aa
          </Text>
          <span className="bg-muted-foreground/60 block h-1 w-3/4 rounded-full" />
          <span className="bg-primary block h-1.5 w-1/2 rounded-full" />
        </span>
      ))}
    </span>
  )
}
