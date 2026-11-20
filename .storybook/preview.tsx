import type { Decorator, Preview } from "@storybook/react-vite"

// The tokens, fonts and base styles, as a project gets them. The theme follows the system's colour scheme (`prefers-color-scheme`) unless the
// toolbar forces one (`data-theme` on the root), so light and dark can be compared in one browser.
import "../src/theme.css"
import "./docs.css"

/**
 * The toolbar's theme on the document's root: «system» leaves it to the device, as an app does; «both» draws the story twice, in light and
 * in dark side by side (the tokens follow `data-theme` on any element), so one look checks both.
 */
const withTheme: Decorator = (Story, context) => {
  // A test run sets the theme through `initialGlobals` (`vitest.config.ts`), the toolbar in the browser.
  const theme = String(context.globals["theme"] ?? "system")
  const root = document.documentElement
  // The design system's text is Norwegian: a screen reader and axe read it as such.
  root.lang = "nb"
  if (context.globals["srText"] === "visible") root.dataset["srVisible"] = ""
  else delete root.dataset["srVisible"]
  if (theme === "both") {
    root.dataset["theme"] = "light"
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {(["light", "dark"] as const).map((one) => (
          <section key={one} data-theme={one} aria-label={one === "light" ? "Lys" : "Mørk"} className="bg-background text-foreground min-w-0 rounded-lg border p-4">
            <Story />
          </section>
        ))}
      </div>
    )
  }
  if (theme === "system") delete root.dataset["theme"]
  else root.dataset["theme"] = theme
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
      toolbar: { title: "Tema", icon: "contrast", items: [{ value: "system", title: "Som enheten" }, { value: "light", title: "Lys" }, { value: "dark", title: "Mørk" }, { value: "both", title: "Begge" }], dynamicTitle: true },
    },
    srText: {
      description: "Vis tekst som bare skjermlesere hører (sr-only), for å lese den under gjennomgang",
      toolbar: { title: "Skjermlesertekst", icon: "accessibility", items: [{ value: "hidden", title: "Skjult" }, { value: "visible", title: "Synlig" }], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: "system", srText: "hidden" },
  parameters: {
    layout: "padded",
    // Every story is checked with axe when the stories run as tests (`npm run test:stories`), and a violation fails the run.
    // Against WCAG 2.2 AA (the README's target) and axe's best practices, not every rule axe knows.
    a11y: { test: "error", options: { runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] } },
    docs: {
      // A table of contents on every docs page, the code of a story in its own panel, and the source without the theme decorator.
      toc: { title: "På denne siden", headingSelector: "h2, h3" },
      codePanel: true,
      source: { excludeDecorators: true },
    },
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
    // Required props first and every prop's description open: the props table is the component's API.
    // Handlers, refs and aria attributes are not choices a reader makes on a page: out of the controls (Carbon, Spectrum).
    controls: { sort: "requiredFirst", expanded: true, exclude: /^(on[A-Z].*|ref|key|aria-.*)$/, matchers: { color: /(background|color)$/i } },
    // The sidebar: five roots, read as a person meets the system (start, foundations, components by purpose, the patterns a page is made of,
    // what an engineer needs); in a group the most used first, not the alphabet. Inline JSON, because Storybook reads it without running
    // this file; every title has a place here (`src/stories.test.ts`), so a new component gets one on purpose.
    options: { storySort: { order: ["Start", ["Welcome", "Status and contributing"], "Foundations", ["Tokens", ["Overview", "Colours", "Series colours", "Chart colours", "Fonts", "Radius", "Motion"], "Icons", ["Guide", "Catalogue", "Icon", "BrandIcon"], "Typography", "Colour and state", "Grouping and spacing", "Motion", "Light and shadow"], "Components", ["Overview", "Layout", ["PageLayout", "PageColumn", "PageHeader", "DetailHeader", "WeatherStage", "PageSection", "SectionGroup", "Stack", "Inline", "Grid", "Split", "Card", "Separator"], "Text", ["Heading", "Text", "Lines", "Code", "Markdown", "Time"], "Links", ["TextLink", "ExternalLink", "CardLink", "LinkList", "HeadlineList"], "Actions", ["Button", "ButtonGroup", "LinkButton", "CopyButton", "CommandButton"], "Navigation", ["Breadcrumbs", "SubPages", "NavBar", "Pagination", "FilterChips", "SegmentedToggle", "PeriodPicker", "SummaryBar"], "Lists", ["Rows", "EntityRows", "PictureRows", "RankedRows", "FactList", "FoldList", "StatusLine", "StoryList", "Tiles", "EntrySection"], "Tables", ["Table", "DataCell", "NumberCell", "SortHeader", "SrTableHead", "DatedLinkTable"], "Charts", ["ChartCard", "AreaChart", "LineChart", "ColumnChart", "StackedColumnChart", "Sparkline", "RankedBarChart", "DonutChart", "CalendarHeatmap", "Heatmap", "Histogram", "BoxPlot", "ScatterChart", "DumbbellChart"], "Media", ["Picture", "AlbumSleeve", "NowPlayingCard", "LightSource", "TiltButton", "PictureCard", "ImageLightbox", "Logo", "Logos", "Person"], "Forms", ["TextField", "SearchField", "NativeSelect", "FormErrorSummary"], "Status", ["Badge", "LiveDot", "LiveRegion", "Freshness", "Progress", "Banner", "ConnectionBanner"], "States", ["EmptyState", "ErrorMessage", "Skeleton", "SectionSkeleton", "StreamedSection"], "Overlays", ["Overlay", "Disclosure"], "Motion", ["CountUp", "Reveal", "Stagger"]], "Patterns", ["Pages and navigation", "Reading and hierarchy", "Wide screens", "Lists and tables", "States and messages", "Forms", "Data visualisation", "Accessible charts", "Error pages", ["ErrorPage", "NotFoundPage", "ServerErrorPage"]], "Engineering", ["Server rendering", "Charts on the server", "Fresh data and offline", "Installed apps (PWA)", "Performance and sustainability", "Accessibility testing"]] } },
  },
}

export default preview
