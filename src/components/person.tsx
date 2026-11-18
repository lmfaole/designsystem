/**
 * A person by name with their picture beside it: a round picture the size of a line of text, then the name. Use it wherever a person
 * is named in a list of facts, a comment or a row, so people are known by face as well as by name (a reviewer among several, who wrote
 * last). The picture is decorative (the name is beside it) and its frame is always there, so names stay level when a picture is
 * missing or fails to load. `src` is the address as the browser asks for it; finding it (a service, a gravatar) is the project's.
 */
export function Person({ name, src }: { name: string; src?: string | null | undefined }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-2 align-middle">
      <span aria-hidden="true" className="bg-muted size-5 shrink-0 overflow-hidden rounded-full">
        {src ? <img src={src} alt="" loading="lazy" decoding="async" width={20} height={20} className="size-full object-cover" /> : null}
      </span>
      <span className="min-w-0 [overflow-wrap:anywhere]">{name}</span>
    </span>
  )
}
