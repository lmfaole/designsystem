/**
 * Lets `style` carry CSS custom properties (`{ '--share': 0.4 }`), which
 * React passes through but its `CSSProperties` type does not know, so a page
 * no longer casts its style object to set one. Imported for its effect by a
 * component that sets a variable; the augmentation then holds program-wide.
 */

import "react"

declare module "react" {
  interface CSSProperties {
    [variable: `--${string}`]: string | number | undefined
  }
}
