import assert from "node:assert/strict"
import { test } from "node:test"

import { fallbackOf, srcSetOf } from "./picture-sources.ts"

const sources = [{ src: "w342.jpg", width: 342 }, { src: "w92.jpg", width: 92 }, { src: "w185.jpg", width: 185 }]

test("srcset lists every width, smallest first, and sizes is the width the picture is drawn at", () => {
  assert.deepEqual(srcSetOf(sources, 40), { srcSet: "w92.jpg 92w, w185.jpg 185w, w342.jpg 342w", sizes: "40px" })
  assert.equal(srcSetOf([{ src: "one.jpg", width: 300 }], 40), null)
  assert.equal(srcSetOf(undefined, 40), null)
})

test("the fallback is the smallest that is sharp at twice the size, or the largest there is", () => {
  assert.equal(fallbackOf(sources, 40)?.src, "w92.jpg")
  assert.equal(fallbackOf(sources, 128)?.src, "w342.jpg")
  assert.equal(fallbackOf(sources, 400)?.src, "w342.jpg")
})
