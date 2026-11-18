import type { Meta, StoryObj } from "@storybook/react-vite"

import { Markdown } from "../../src/components/markdown"

const SAMPLE = `## Endringer

Bygger på #6850 (fiks for scroll-hopp med **autoExpand**). Forenkler \`TextArea\` nå som auto-expand bruker \`field-sizing: content\`.

### BaseTextArea.tsx

- Fjernet fokus-state og auto-expand-effekten
- \`rows\` settes som \`--rows\` i stedet for genererte klasser
  - Nøstet punkt

1. Første steg
2. Andre steg

### Sjekkliste

- [x] Stories oppdatert
- [ ] Dokumentasjon

> Ingen API-endringer.

\`\`\`tsx
export function TextArea({ rows = 3 }: { rows?: number }) {
  return <textarea style={{ "--rows": rows }} />
}
\`\`\`

| Klasse | Før | Etter |
| --- | --- | --- |
| \`--N-rows\` | ti klasser | én variabel |

Se [Jøkul](https://jokul.fremtind.no) og https://github.com/fremtind/jokul, eller [et anker](#endringer).

<!-- Denne kommentaren fra malen vises ikke. -->
<script>alert("raw HTML is ignored")</script>

---

Slutt.`

const meta = {
  title: "Typography/Markdown",
  component: Markdown,
  tags: ["autodocs"],
  args: { source: SAMPLE },
} satisfies Meta<typeof Markdown>
export default meta
type Story = StoryObj<typeof meta>

/** Text written in Markdown, in the design system's own forms. Raw HTML in the text is ignored, never inserted. */
export const Default: Story = {}
export const Small: Story = { args: { size: "sm", source: "**Ola** kommenterte:\n\nDette ser bra ut, men `rows` bør ha en standardverdi.\n\n- [x] sjekket\n- [ ] gjenstår" } }
export const Empty: Story = { args: { source: "   " } }
