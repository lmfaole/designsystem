"use client"

import { useEffect, useRef } from "react"

import { Icon } from "./icon"

/**
 * The errors of a form, at the top of the page where it is shown: it takes focus when it appears, says «Det er et problem», and lists each
 * error as a link to its field (`name` of a `TextField`), with the same words as the message beside the field. Show it only after the
 * reader has sent the form, and keep what they wrote in the fields.
 */
export function FormErrorSummary({ errors }: { errors: readonly { field: string; message: string }[] }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => ref.current?.focus(), [])
  if (errors.length === 0) return null
  return (
    <div ref={ref} role="alert" tabIndex={-1} className="border-destructive/40 text-destructive rounded-lg border p-4 focus-visible:outline-none">
      <p className="flex items-center gap-2 font-medium">
        <Icon name="warning" tone="destructive" />
        Det er et problem
      </p>
      <ul className="mt-2 grid gap-1 text-sm">
        {errors.map((error) => (
          <li key={error.field}>
            <a href={`#${error.field}`} className="underline underline-offset-4">
              {error.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
