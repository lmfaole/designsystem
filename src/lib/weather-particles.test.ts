import assert from "node:assert/strict"
import { test } from "node:test"

import { advance, countOf, particlesOf } from "./weather-particles.ts"

test("every kind of weather has particles that show it", () => {
  for (const code of ["clearsky_day", "clearsky_night", "partlycloudy_day", "cloudy", "fog", "rain", "heavyrain", "lightsleet", "snow", "rainandthunder"]) {
    assert.ok(particlesOf(code).length > 0, code)
  }
  const shapes = (code: string) => particlesOf(code).map((spec) => spec.shape)
  assert.ok(shapes("rain").includes("streak") && shapes("rain").includes("cloud"))
  assert.ok(shapes("heavysnow").includes("flake"))
  assert.ok(shapes("clearsky_day").includes("sun") && !shapes("clearsky_night").includes("sun"))
  assert.equal(particlesOf("clearsky_night")[0]?.shape, "star")
})

test("a heavier weather has more particles, and the count follows the surface", () => {
  const rain = particlesOf("rain").at(-1)
  const thunder = particlesOf("rainandthunder").at(-1)
  assert.ok(rain && thunder)
  assert.ok(countOf(thunder, 1000, 800) > countOf(rain, 1000, 800))
  assert.ok(countOf(rain, 2000, 800) > countOf(rain, 1000, 800))
})

test("a particle that falls out at the foot comes in again at the top, and stays on the surface", () => {
  const rain = particlesOf("rain").at(-1)
  assert.ok(rain)
  let particle = { x: 500, y: 790, seed: 0.5 }
  for (let step = 0; step < 600; step++) {
    particle = advance(particle, rain, 1 / 60, 1000, 800)
    assert.ok(particle.y > -100 && particle.y < 900 && particle.x > -100 && particle.x < 1100)
  }
})

test("the scattering is the same every time and stays on the surface", async () => {
  const { scatter } = await import("./weather-particles.ts")
  const a = scatter(50, 400, 300)
  assert.deepEqual(a, scatter(50, 400, 300))
  assert.ok(a.every((p) => p.x >= 0 && p.x <= 400 && p.y >= 0 && p.y <= 300 && p.seed >= 0 && p.seed <= 1))
})
