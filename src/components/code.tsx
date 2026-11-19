/**
 * Code in a sentence (`inline`: an identifier, a path, a command) or on lines of its own (`block`: scrolls sideways inside its own
 * box, which can be reached by keyboard). The text is monospace and never wraps in the middle of a name in a sentence. The
 * contents are text, not markup.
 */
export function Code({ children, block = false }: { children: string; block?: boolean }) {
  if (!block) return <code className="bg-muted rounded px-1 py-0.5 font-mono text-[0.9em] [overflow-wrap:anywhere]">{children}</code>
  return (
    <pre tabIndex={0} className="bg-muted focus-visible:ring-ring overflow-x-auto rounded-lg p-3 font-mono text-sm focus-visible:ring-2 focus-visible:outline-none">
      <code>{children}</code>
    </pre>
  )
}
