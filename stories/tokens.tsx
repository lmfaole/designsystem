import { useEffect, useState } from "react"

/** The value of a custom property on `:root`, re-read when the colour scheme changes. */
function useToken(name: string): string {
  const [value, setValue] = useState("")
  useEffect(() => {
    const read = () => setValue(getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim())
    read()
    const query = window.matchMedia("(prefers-color-scheme: dark)")
    query.addEventListener("change", read)
    return () => query.removeEventListener("change", read)
  }, [name])
  return value
}

function Swatch({ name }: { name: string }) {
  const value = useToken(name)
  return (
    <li className="grid gap-1.5 text-xs">
      <div className="h-14 rounded-lg border" style={{ background: `var(--${name})` }} />
      <code className="font-mono font-medium">--{name}</code>
      <span className="font-mono text-muted-foreground">{value}</span>
    </li>
  )
}

export function Colors({ names }: { names: string[] }) {
  return (
    <ul className="not-prose grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-4 bg-background p-4 text-foreground">
      {names.map((name) => (
        <Swatch key={name} name={name} />
      ))}
    </ul>
  )
}

const RADII = ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl"]

export function Radii() {
  const base = useToken("radius")
  return (
    <div className="not-prose grid gap-3 bg-background p-4 text-foreground">
      <p className="text-sm text-muted-foreground">
        <code>--radius</code>: {base}. The others are fractions of it.
      </p>
      <ul className="flex flex-wrap gap-4">
        {RADII.map((name) => (
          <li key={name} className="grid gap-1.5 text-xs">
            <div className="size-20 border bg-muted" style={{ borderRadius: `var(--radius-${name})` }} />
            <code className="font-mono">rounded-{name}</code>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Fonts() {
  return (
    <div className="not-prose grid gap-4 bg-background p-4 text-foreground">
      <div>
        <code className="text-xs text-muted-foreground">font-sans: Geist Variable</code>
        <p className="font-sans text-2xl">Blåbærsyltetøy på skiva, 0123456789</p>
      </div>
      <div>
        <code className="text-xs text-muted-foreground">font-heading: JetBrains Mono Variable</code>
        <p className="font-heading text-2xl">Blåbærsyltetøy på skiva, 0123456789</p>
      </div>
    </div>
  )
}

const MOTION = ["duration-instant", "duration-fast", "duration-base", "duration-slow", "duration-live", "ease-out", "ease-in", "ease-in-out", "distance", "stagger"]

function MotionToken({ name }: { name: string }) {
  const value = useToken(`motion-${name}`)
  return (
    <li>
      <strong>--motion-{name}</strong>: <span className="text-muted-foreground">{value}</span>
    </li>
  )
}

export function Motion() {
  return (
    <ul className="not-prose grid gap-1 bg-background p-4 font-mono text-xs text-foreground">
      {MOTION.map((name) => (
        <MotionToken key={name} name={name} />
      ))}
    </ul>
  )
}
