import { useId, type ReactNode } from "react"

import { CommandButton } from "./command-button"
import { Overlay } from "./overlay"

/** A picture that opens larger in a dialog on a tap; `children` is the picture as it sits on the page. */
export function ImageLightbox({ src, name, children }: { src: string; name: string; children: ReactNode }) {
  const id = `image-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`
  return (
    <>
      <CommandButton command="show-modal" commandFor={id} look="zoom" label={`Vis ${name} større`}>
        {children}
      </CommandButton>
      <Overlay id={id} variant="dialog" title={name} hideTitle>
        <img src={src} alt={name} loading="lazy" decoding="async" className="h-auto max-h-[70vh] w-full rounded-md object-contain" />
      </Overlay>
    </>
  )
}
