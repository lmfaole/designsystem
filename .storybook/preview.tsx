import type { Preview } from "@storybook/react-vite"

// The tokens, fonts and base styles, as a project gets them. The theme follows the system's colour scheme
// (`prefers-color-scheme`), so the stories do too.
import "../src/theme.css"

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { matchers: { color: /(background|color)$/i } },
    options: { storySort: { order: ["Welcome", "Tokens", "Layout", "Typography", "Primitives", "Navigation", "Lists", "Media", "Charts", "Tables", "Feedback", "Overlays", "Motion", "CV"] } },
  },
}

export default preview
