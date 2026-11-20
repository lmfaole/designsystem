import assert from "node:assert/strict"
import { test } from "node:test"

import { discMesh, EDGE, FACE, HOLE } from "./disc-geometry.ts"

const vertexAt = (vertices: Float32Array, index: number) => {
  const at = index * 9
  return { p: [vertices[at] ?? 0, vertices[at + 1] ?? 0, vertices[at + 2] ?? 0], n: [vertices[at + 3] ?? 0, vertices[at + 4] ?? 0, vertices[at + 5] ?? 0], kind: vertices[at + 8] ?? -1 }
}

test("a record has a face, an edge and a hole, with the sizes it was asked for", () => {
  const { vertices, indices } = discMesh(32, 0.25, 0.2)
  const count = vertices.length / 9
  assert.equal(count, 6 * 33)
  assert.equal(indices.length, 3 * 32 * 6)
  assert.ok(indices.every((index) => index < count))
  for (let i = 0; i < count; i += 1) {
    const { p, n, kind } = vertexAt(vertices, i)
    assert.ok(Math.abs(Math.hypot(...n) - 1) < 1e-6, "normals are unit length")
    const radius = Math.hypot(p[0] ?? 0, p[1] ?? 0)
    if (kind === FACE) assert.ok(Math.abs((p[2] ?? 0) - 0.1) < 1e-6 && (radius === 0 || radius >= 0.25 - 1e-6) && radius <= 1 + 1e-6)
    if (kind === EDGE) assert.ok(Math.abs(radius - 1) < 1e-6 && Math.abs(Math.abs(p[2] ?? 0) - 0.1) < 1e-6)
    if (kind === HOLE) assert.ok(Math.abs(radius - 0.25) < 1e-6)
  }
})

test("the edge faces outwards, the wall of the hole faces in, the face faces the viewer", () => {
  const { vertices } = discMesh(16)
  for (let i = 0; i < vertices.length / 9; i += 1) {
    const { p, n, kind } = vertexAt(vertices, i)
    const outward = (p[0] ?? 0) * (n[0] ?? 0) + (p[1] ?? 0) * (n[1] ?? 0)
    if (kind === EDGE) assert.ok(outward > 0.99)
    if (kind === HOLE) assert.ok(outward < -0.2)
    if (kind === FACE) assert.deepEqual(n, [0, 0, 1])
  }
})
