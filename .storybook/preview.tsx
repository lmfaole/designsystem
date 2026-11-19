import type { Decorator, Preview } from "@storybook/react-vite"

// The tokens, fonts and base styles, as a project gets them. The theme follows the system's colour scheme (`prefers-color-scheme`) unless the
// toolbar forces one (`data-theme` on the root), so light and dark can be compared in one browser.
import "../src/theme.css"
import "./docs.css"

/** The toolbar's theme on the document's root: «system» leaves it to the device, as an app does. */
const withTheme: Decorator = (Story, context) => {
  // A test run forces its theme (`vitest.config.ts`); in the browser the toolbar's choice wins.
  const forced: unknown = import.meta.env["STORYBOOK_THEME"]
  const chosen = String(context.globals["theme"] ?? "system")
  const theme = typeof forced === "string" && chosen === "system" ? forced : chosen
  if (theme === "system") delete document.documentElement.dataset["theme"]
  else document.documentElement.dataset["theme"] = theme
  return <Story />
}

/** One viewport for each width class of the guide «Wide screens»: the widths a page is checked at. */
const viewport = (name: string, width: number, type: "mobile" | "tablet" | "desktop") => ({ name, styles: { width: `${width}px`, height: "900px" }, type })

const preview: Preview = {
  tags: ["autodocs"],
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "Lys, mørk eller som enheten",
      toolbar: { title: "Tema", icon: "contrast", items: [{ value: "system", title: "Som enheten" }, { value: "light", title: "Lys" }, { value: "dark", title: "Mørk" }], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: "system" },
  parameters: {
    layout: "padded",
    // Every story is checked with axe when the stories run as tests (`npm run test:stories`), and a violation fails the run.
    a11y: { test: "error" },
    // The page's colour is the theme's, never a background picked in the toolbar.
    backgrounds: { disable: true },
    viewport: {
      options: {
        compact: viewport("Compact (400)", 400, "mobile"),
        medium: viewport("Medium (768)", 768, "tablet"),
        expanded: viewport("Expanded (1024)", 1024, "desktop"),
        large: viewport("Large (1440)", 1440, "desktop"),
        extraLarge: viewport("Extra-large (2560)", 2560, "desktop"),
      },
    },
    controls: { matchers: { color: /(background|color)$/i } },
    options: { storySort: { order: ["Welcome", "Tokens", "Layout", "Typography", "Primitives", "Navigation", "Lists", "Media", "Charts", "Tables", "Feedback", "Overlays", "Motion", "Entries", "Icons", "Guides"] } },
  },
}

export default preview
