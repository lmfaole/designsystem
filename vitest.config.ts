import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import tailwindcss from "@tailwindcss/vite"
import { playwright } from "@vitest/browser-playwright"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vitest/config"

/**
 * Every story is a test (`npm run test:stories`): it renders in Chromium, runs its `play` function where it has one, and is checked for
 * accessibility with axe (`parameters.a11y.test` in `.storybook/preview.tsx`). The unit tests stay on node's own runner (`npm test`).
 * `CHROMIUM` points at a browser already on the machine; without it Playwright's own is used (CI installs it).
 */
const executablePath = process.env["CHROMIUM"]

export default defineConfig({
  plugins: [tailwindcss()],
  test: {
    // The visual project writes the pictures of new stories (CI makes them): Vitest 4 leaves file writing off unless it is asked for.
    api: { allowWrite: true },
    // The stories twice, in the light theme and in the dark one (the toolbar's global, set per project), since a contrast that holds in one can fail in the other.
    projects: [...(["light", "dark"] as const).map((theme) => ({
      extends: true,
      plugins: [storybookTest({ configDir: fileURLToPath(new URL("./.storybook", import.meta.url)), storybookScript: "npm run storybook -- --no-open", initialGlobals: { theme } })],
      test: {
        name: `storybook-${theme}`,
        browser: {
          enabled: true,
          headless: true,
          provider: playwright(executablePath === undefined ? {} : { launchOptions: { executablePath } }),
          instances: [{ browser: "chromium" as const }],
        },
      },
    })),
    // Every story's picture against the one CI keeps (`npm run test:visual`), in the light theme at one width; not part of `test:stories`.
    {
      extends: true,
      plugins: [storybookTest({ configDir: fileURLToPath(new URL("./.storybook", import.meta.url)), storybookScript: "npm run storybook -- --no-open", initialGlobals: { theme: "light" } })],
      test: {
        name: "visual",
        setupFiles: ["./.storybook/visual.setup.ts"],
        browser: {
          enabled: true,
          headless: true,
          api: { allowWrite: true },
          provider: playwright(executablePath === undefined ? {} : { launchOptions: { executablePath } }),
          instances: [{ browser: "chromium" as const, viewport: { width: 1024, height: 768 } }],
          expect: { toMatchScreenshot: { comparatorName: "pixelmatch", comparatorOptions: { threshold: 0.2, allowedMismatchedPixelRatio: 0.01 } } },
        },
      },
    }],
  },
})
