import { strict as assert } from "node:assert"
import { test } from "node:test"

import { parseListField } from "./list-field.ts"

test("lines and commas split the list; blanks and repeats go, and the first of a repeat stays", () => {
  assert.deepEqual(parseListField(" vercel/next.js \r\n\n withastro/astro, vercel/next.js ,,\nfacebook/react"), ["vercel/next.js", "withastro/astro", "facebook/react"])
  assert.deepEqual(parseListField(""), [])
  assert.deepEqual(parseListField(null), [])
  assert.deepEqual(parseListField(undefined), [])
})

test("at most max items are kept", () => {
  assert.deepEqual(parseListField("a\nb\nc\nd", 2), ["a", "b"])
})
