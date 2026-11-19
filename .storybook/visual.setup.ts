import { afterEach, expect } from "vitest"
import { page } from "vitest/browser"

/**
 * The visual project (`npm run test:visual`): after each story has rendered and passed its own test, a picture of it is compared with the
 * one kept in `__screenshots__` next to the story file. The pictures are made and kept by CI only (`.github/workflows/visual.yml`): a font
 * or a browser on another machine draws a few pixels differently, so a picture from a laptop would always differ.
 */
afterEach(async () => {
  // Under Vitest a story renders into a plain <div> of the body, beside Storybook's own wrappers (`.sb-wrapper`).
  const root = document.querySelector("body > div:not(.sb-wrapper)")
  if (root === null || root.childElementCount === 0) return
  await expect(page.elementLocator(root)).toMatchScreenshot()
})
