import { useId, type ReactNode } from "react"

import { appUrl } from "../lib/base-url"
import { CommandButton } from "./command-button"
import { Overlay } from "./overlay"

/** A cover that opens larger in a dialog on a tap; `children` is the cover as it sits on the page. */
export function CoverLightbox({ url, name, children }: { url: string; name: string; children: ReactNode }) {
  const id = `cover-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`
  return (
    <>
      <CommandButton command="show-modal" commandFor={id} look="zoom" label={`Vis ${name} større`}>
        {children}
      </CommandButton>
      <Overlay id={id} variant="dialog" title={name} hideTitle>
        <img src={appUrl(url)} alt={name} loading="lazy" className="h-auto max-h-[70vh] w-full rounded-md object-contain" />
      </Overlay>
    </>
  )
}
