import assert from "node:assert/strict"
import { test } from "node:test"

import { decide, type SelectEvent, type SelectState } from "./navigating-select.ts"

const IDLE: SelectState = { keyed: false, pending: false }

function run(events: readonly SelectEvent[]): boolean[] {
  let state = IDLE
  return events.map((event) => {
    const next = decide(state, event)
    state = next.state
    return next.go
  })
}

test("a choice with the pointer or in the open list goes at once", () => {
  assert.deepEqual(run([{ type: "change" }]), [true])
  assert.deepEqual(run([{ type: "keydown", key: "Enter" }, { type: "change" }]), [false, true])
})

test("arrows on a closed select wait, and Enter goes to the last one", () => {
  const down: SelectEvent[] = [{ type: "keydown", key: "ArrowDown" }, { type: "change" }]
  assert.deepEqual(run([...down, ...down, { type: "keydown", key: "Enter" }]), [false, false, false, false, true])
})

test("leaving the select goes to a choice stepped to, and to nothing when there is none", () => {
  assert.deepEqual(run([{ type: "keydown", key: "ArrowUp" }, { type: "change" }, { type: "focusout" }]), [false, false, true])
  assert.deepEqual(run([{ type: "keydown", key: "Tab" }, { type: "focusout" }]), [false, false])
})

test("typing a letter to jump to an option waits too", () => {
  assert.deepEqual(run([{ type: "keydown", key: "m" }, { type: "change" }, { type: "keydown", key: "Enter" }]), [false, false, true])
})
