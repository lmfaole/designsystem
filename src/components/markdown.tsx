import type { ReactNode } from "react"
import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"

import { ExternalLink } from "./external-link"
import { ENTITY_LINK } from "../lib/link-style"

/**
 * Markdown headings are demoted so they never break the page's outline: the page has its title and a section its heading, so the
 * first level of the text is the third level (`from="h3"`, the default) and the rest follow, down to the sixth.
 */
const HEADINGS = { h3: ["h3", "h4", "h5", "h6", "h6", "h6"], h4: ["h4", "h5", "h6", "h6", "h6", "h6"] } as const

const SIZES = { base: "text-base", sm: "text-sm" } as const

const LOOKS = {
  heading1: "font-heading mt-6 text-base font-medium first:mt-0",
  heading: "mt-5 text-sm font-semibold first:mt-0",
  code: "bg-muted rounded px-1 py-0.5 font-mono text-[0.9em]",
  pre: "bg-muted overflow-x-auto rounded-lg p-3 font-mono text-[0.85em] leading-relaxed",
} as const

/** The elements of Markdown in the design system's own forms: tokens only, nothing the text can set itself. */
function components(from: keyof typeof HEADINGS): Components {
  const heading = (level: number) =>
    function Heading({ children }: { children?: ReactNode }) {
      const Tag = HEADINGS[from][level - 1] ?? "h6"
      return <Tag className={level === 1 ? LOOKS.heading1 : LOOKS.heading}>{children}</Tag>
    }
  return {
    h1: heading(1),
    h2: heading(2),
    h3: heading(3),
    h4: heading(4),
    h5: heading(5),
    h6: heading(6),
    p: ({ children }) => <p className="[overflow-wrap:anywhere]">{children}</p>,
    // A link out is marked and read as external; a link inside the app or to an anchor is a plain link.
    a: ({ href, children }) => (href !== undefined && /^https?:\/\//i.test(href) ? <ExternalLink href={href}>{children}</ExternalLink> : <a href={href} className={ENTITY_LINK}>{children}</a>),
    ul: ({ children, className }) => <ul className={`list-disc space-y-1 pl-5 ${className?.includes("contains-task-list") ? "list-none pl-0" : ""}`}>{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal space-y-1 pl-5">{children}</ol>,
    li: ({ children }) => <li className="[overflow-wrap:anywhere]">{children}</li>,
    input: ({ checked }) => <input type="checkbox" checked={checked === true} disabled readOnly aria-label={checked === true ? "Ferdig" : "Ikke ferdig"} className="mr-2 align-middle" />,
    blockquote: ({ children }) => <blockquote className="text-muted-foreground border-l-2 pl-4">{children}</blockquote>,
    // Inline code, and code in a block: the block scrolls inside its own box, never the page.
    code: ({ children, className }) => (className === undefined ? <code className={LOOKS.code}>{children}</code> : <code className={className}>{children}</code>),
    pre: ({ children }) => <pre className={LOOKS.pre}>{children}</pre>,
    hr: () => <hr className="border-t" />,
    img: ({ src, alt }) => (typeof src === "string" ? <img src={src} alt={alt ?? ""} loading="lazy" decoding="async" className="border-border h-auto max-w-full rounded-md border" /> : null),
    table: ({ children }) => (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => <th className="border-b px-2 py-1.5 text-left font-semibold">{children}</th>,
    td: ({ children }) => <td className="border-b px-2 py-1.5 align-top">{children}</td>,
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    del: ({ children }) => <del className="text-muted-foreground">{children}</del>,
  }
}

/**
 * Text written in Markdown (a pull request's description, a comment, a README) shown in the design system's own forms: its
 * headings, lists, task lists, code, quotes, tables, links and pictures are drawn by the design system, never by the text. It
 * is the one way to show Markdown: do not convert it to HTML and insert it.
 *
 * It is GitHub-flavoured (tables, task lists, strike-through, bare links) and SAFE: raw HTML in the text is ignored, not
 * inserted, and unsafe addresses (`javascript:`) are dropped. Links to other sites are marked as external. The text's headings
 * are demoted (`from`) so they never break the page's outline. For text the app writes itself, use `Text`, not Markdown.
 */
export function Markdown({ source, size = "base", from = "h3" }: { source: string; size?: keyof typeof SIZES; /** The element of the text's first-level heading: `h3` inside a section (the default), `h4` inside a subsection. */ from?: keyof typeof HEADINGS }) {
  if (source.trim() === "") return null
  return (
    <div className={`grid min-w-0 gap-3 leading-relaxed ${SIZES[size]}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components(from)} skipHtml>
        {source}
      </ReactMarkdown>
    </div>
  )
}
