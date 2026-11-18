import { strict as assert } from "node:assert"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { test } from "node:test"

import { valuesOf } from "./fact-values.ts"

test("one value is one, several are several, in order", () => {
  assert.deepEqual(valuesOf("main"), ["main"])
  assert.deepEqual(valuesOf(["zenabii", "kristianulv23", "Stormoen"]), ["zenabii", "kristianulv23", "Stormoen"])
})

test("empty values are left out, and a fact with none has none", () => {
  assert.deepEqual(valuesOf(["a", "", null, undefined, false, "b"]), ["a", "b"])
  for (const empty of ["", null, undefined, false, [], [""], [null, undefined]]) assert.deepEqual(valuesOf(empty), [], String(empty))
})

test("a zero is a value", () => {
  assert.deepEqual(valuesOf(0), [0])
  assert.deepEqual(valuesOf([0, 1]), [0, 1])
})

test("the fact list stacks several values of one term under it, each on its own line, with the term once", () => {
  const source = readFileSync(join(import.meta.dirname, "..", "components/fact-list.tsx"), "utf8")
  assert.match(source, /grid-cols-subgrid/, "a group of one term and its values shares the columns of the list")
  assert.match(source, /<dt[^>]*row-start-1/, "the term is on the first row of its group")
  assert.match(source, /values\.map\(\(value, index\) => \(\s*<dd/, "each value is a <dd> of its own")
  assert.doesNotMatch(source, /\.join\(/, "several values are never joined into one string")
})
