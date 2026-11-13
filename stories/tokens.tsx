import { useEffect, useState } from "react"

/** The value of a custom property on `:root`, re-read when the colour scheme changes. */
export function useToken(name: string): string {
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

export function ColorToken({ name }: { name: string }) {
  const value = useToken(name)
  return (
    <div className="grid w-56 gap-1.5 text-xs">
      <div className="h-16 rounded-lg border" style={{ background: `var(--${name})` }} />
      <code className="font-mono font-medium">--{name}</code>
      <span className="font-mono text-muted-foreground">{value}</span>
    </div>
  )
}

export function RadiusToken({ name }: { name: string }) {
  const base = useToken("radius")
  return (
    <div className="grid gap-1.5 text-xs">
      <div className="size-24 border bg-muted" style={{ borderRadius: name === "radius" ? "var(--radius)" : `var(--radius-${name})` }} />
      <code className="font-mono">{name === "radius" ? "--radius" : `rounded-${name}`}</code>
      {name === "radius" ? <span className="font-mono text-muted-foreground">{base}</span> : null}
    </div>
  )
}

export function FontToken({ family, token }: { family: string; token: string }) {
  return (
    <div>
      <code className="text-xs text-muted-foreground">{token}: {family}</code>
      <p className={`${token} text-3xl`}>Blåbærsyltetøy på skiva, 0123456789</p>
    </div>
  )
}

export function ValueToken({ name }: { name: string }) {
  const value = useToken(name)
  return (
    <code className="font-mono text-sm">
      --{name}: <span className="text-muted-foreground">{value}</span>
    </code>
  )
}
