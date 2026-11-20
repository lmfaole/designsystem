/**
 * A made-up album cover for a preview of the effects (`EffectsPreview`, `TiltPreview`): a sun over a band of colour, drawn on a canvas in the theme's own event colours (`--event-*`), so it has
 * no colours of its own and it is ours to alter. A data URL, or `null` where there is no canvas. Client only.
 */
export function sampleCover(from: Element, size = 320): string | null {
  try {
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext("2d")
    if (context === null) return null
    const style = getComputedStyle(from)
    const token = (name: string): string => style.getPropertyValue(name).trim()
    const ground = context.createLinearGradient(0, 0, size, size)
    ground.addColorStop(0, token("--event-accent"))
    ground.addColorStop(1, token("--event-danger"))
    context.fillStyle = ground
    context.fillRect(0, 0, size, size)
    context.globalAlpha = 0.9
    context.fillStyle = token("--event-warning")
    context.beginPath()
    context.arc(size * 0.36, size * 0.38, size * 0.2, 0, Math.PI * 2)
    context.fill()
    context.fillStyle = token("--event-success")
    context.beginPath()
    context.moveTo(0, size * 0.72)
    context.bezierCurveTo(size * 0.3, size * 0.58, size * 0.6, size * 0.86, size, size * 0.66)
    context.lineTo(size, size)
    context.lineTo(0, size)
    context.closePath()
    context.fill()
    context.globalAlpha = 0.35
    context.strokeStyle = token("--background")
    context.lineWidth = size / 160
    for (let ring = 1; ring <= 4; ring += 1) {
      context.beginPath()
      context.arc(size * 0.36, size * 0.38, size * (0.2 + ring * 0.05), 0, Math.PI * 2)
      context.stroke()
    }
    return canvas.toDataURL("image/png")
  } catch {
    return null
  }
}
