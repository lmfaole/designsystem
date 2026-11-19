import assert from "node:assert/strict"
import { test } from "node:test"

import { fiveNumbers, histogramBins, linearFit, niceStep, quantile, strengthWord } from "./stats.ts"

test("quantile interpolates like R's type 7", () => {
  assert.equal(quantile([1, 2, 3, 4], 0.5), 2.5)
  assert.equal(quantile([1, 2, 3, 4, 5], 0.25), 2)
  assert.ok(Number.isNaN(quantile([], 0.5)))
})

test("a box plot's whiskers stop at the last value within 1.5 IQR, the rest are outliers", () => {
  const summary = fiveNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 100])
  assert.ok(summary !== null)
  assert.equal(summary.median, 5.5)
  assert.equal(summary.whiskerHigh, 9)
  assert.deepEqual(summary.outliers, [100])
  assert.equal(fiveNumbers([]), null)
  assert.equal(fiveNumbers([4])?.median, 4)
})

test("histogram bins have nice edges, hold every value once and include the top edge", () => {
  const values = Array.from({ length: 200 }, (_, index) => (index * 37) % 101)
  const bins = histogramBins(values)
  assert.equal(bins.reduce((sum, bin) => sum + bin.count, 0), 200)
  assert.ok(bins.length >= 5 && bins.length <= 30)
  assert.equal(bins[0]?.from, 0)
  assert.ok((bins.at(-1)?.to ?? 0) >= 100)
  assert.deepEqual(histogramBins([5, 5, 5]), [{ from: 5, to: 5, count: 3 }])
  assert.deepEqual(histogramBins([]), [])
})

test("nice steps are 1, 2, 5 times a power of ten", () => {
  assert.equal(niceStep(0.13), 0.2)
  assert.equal(niceStep(3), 5)
  assert.equal(niceStep(7), 10)
  assert.equal(niceStep(0), 1)
})

test("the fit finds an exact line and refuses what has no x spread or too few points", () => {
  const fit = linearFit([{ x: 1, y: 3 }, { x: 2, y: 5 }, { x: 3, y: 7 }])
  assert.ok(fit !== null)
  assert.equal(fit.slope, 2)
  assert.equal(fit.intercept, 1)
  assert.equal(fit.r2, 1)
  assert.equal(linearFit([{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }]), null)
  assert.equal(linearFit([{ x: 1, y: 1 }, { x: 2, y: 2 }]), null)
  assert.equal(strengthWord(0.81), "en sterk sammenheng")
  assert.equal(strengthWord(0.001), "ingen tydelig sammenheng")
})
