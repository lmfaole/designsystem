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
  parameters: { docs: { description: { component: `### Use it when

text people wrote in Markdown is shown: a pull request description, a comment.

### Do not use it when

text the app wrote (\`Text\`).

### Accessibility

**Handled by the component**

- Headings are demoted (\`from\`, \`h3\` by default), so the text never breaks the page's outline ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Lists, quotes, tables and code become their real elements, in the design system's forms ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Raw HTML is ignored and \`javascript:\` addresses are dropped, so the text cannot add controls of its own ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- Links to other sites become \`ExternalLink\` and are read as external ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))
- Task-list checkboxes are disabled and named «Ferdig» or «Ikke ferdig» ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value))
- Tables and code blocks scroll sideways in their own box, not the page ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow))

**You check**

- Inside a subsection, pass \`from="h4"\` so the text's headings follow yours ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships))
- Pictures keep only the \`alt\` their author wrote; with none they are treated as decoration ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content))
- A wide table or code block in the text is not focusable, so it cannot be scrolled with the keyboard ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard))
- Link text the author wrote («her») may not say where it goes ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context))

### Content

Show enough to decide, cut at a paragraph, and say where the rest is.

### Related

\`Text\`, \`Code\`, \`FactList\`` } }, },
} satisfies Meta<typeof Markdown>
export default meta
type Story = StoryObj<typeof meta>

/** Text written in Markdown, in the design system's own forms. Raw HTML in the text is ignored, never inserted. */
export const Default: Story = {}
/** The smaller size, for a comment beside other content. */
export const Small: Story = { args: { size: "sm", source: "**Ola** kommenterte:\n\nDette ser bra ut, men `rows` bør ha en standardverdi.\n\n- [x] sjekket\n- [ ] gjenstår" } }
/** Text that is only whitespace renders nothing, not an empty box. */
export const Empty: Story = { args: { source: "   " } }
