/**
 * The little 3D maths the album sleeve needs, column-major as WebGL wants it, and nothing more: no library for a box, a disc and a camera. Pure, so a test pins it.
 */

export type Mat4 = Float32Array

export const identity = (): Mat4 => new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])

/** `a` after `b` (apply `b` first): the matrix of doing one and then the other. */
export function multiply(a: Mat4, b: Mat4): Mat4 {
  const out = new Float32Array(16)
  for (let column = 0; column < 4; column += 1) {
    for (let row = 0; row < 4; row += 1) {
      let sum = 0
      for (let k = 0; k < 4; k += 1) sum += (a[k * 4 + row] ?? 0) * (b[column * 4 + k] ?? 0)
      out[column * 4 + row] = sum
    }
  }
  return out
}

export function translation(x: number, y: number, z: number): Mat4 {
  const m = identity()
  m[12] = x
  m[13] = y
  m[14] = z
  return m
}

export function rotationX(angle: number): Mat4 {
  const [c, s] = [Math.cos(angle), Math.sin(angle)]
  return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1])
}

export function rotationY(angle: number): Mat4 {
  const [c, s] = [Math.cos(angle), Math.sin(angle)]
  return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1])
}

/** A perspective camera looking down -z: `fovy` in radians, `aspect` is width over height. */
export function perspective(fovy: number, aspect: number, near: number, far: number): Mat4 {
  const f = 1 / Math.tan(fovy / 2)
  const range = near - far
  return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) / range, -1, 0, 0, (2 * far * near) / range, 0])
}

/** The upper left 3×3 of a matrix, column-major: what turns a normal without moving it. */
export function rotationPart(m: Mat4): Float32Array {
  return new Float32Array([m[0] ?? 0, m[1] ?? 0, m[2] ?? 0, m[4] ?? 0, m[5] ?? 0, m[6] ?? 0, m[8] ?? 0, m[9] ?? 0, m[10] ?? 0])
}

/** A point carried through a matrix (with the perspective divide), as `[x, y, z]`. */
export function transformPoint(m: Mat4, [x, y, z]: readonly [number, number, number]): [number, number, number] {
  const at = (row: number): number => (m[row] ?? 0) * x + (m[4 + row] ?? 0) * y + (m[8 + row] ?? 0) * z + (m[12 + row] ?? 0)
  const w = at(3) || 1
  return [at(0) / w, at(1) / w, at(2) / w]
}
