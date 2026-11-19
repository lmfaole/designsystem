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
  // A story with nothing to see (what only a screen reader hears, a banner that is hidden while online) has no picture to keep.
  const box = root.getBoundingClientRect()
  if (box.width < 1 || box.height < 1 || root instanceof HTMLElement && root.innerText.trim() === "" && root.querySelector("svg, img, canvas") === null) return
  await expect(page.elementLocator(root)).toMatchScreenshot()
})
