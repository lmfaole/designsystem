import tailwindcss from "@tailwindcss/vite"
import type { StorybookConfig } from "@storybook/react-vite"
import remarkGfm from "remark-gfm"

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.tsx"],
  addons: [
    // remark-gfm: tables in the guides.
    { name: "@storybook/addon-docs", options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } } },
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    // An agent working in this repository asks the running Storybook (http://localhost:6006/mcp) for components, stories, docs and test runs.
    "@storybook/addon-mcp",
  ],
  framework: "@storybook/react-vite",
  features: {
    // `/manifests/components.json` and `/manifests/docs.json` in the build: every component with its props, JSDoc and story snippets, and
    // every guide, as data an agent can read from the published Storybook (the skills point at it).
    componentsManifest: true,
  },
  // react-docgen (the default; an explicit devDependency since Storybook 11 made it optional) reads the props and their JSDoc for the props tables, the controls and the manifest. react-docgen-typescript
  // gave the same answer here, so it is not used: it would need the `typescript` package, which is TypeScript 6 (side by side with the TypeScript 7 that `tsc` runs; Storybook 11 asks for both).
  tags: {
    // A component on its way in or out: in the sidebar's tag filter, hidden by default, and kept out of the manifest (`!manifest` on it).
    experimental: { defaultFilterSelection: "exclude" },
    deprecated: { defaultFilterSelection: "exclude" },
  },
  viteFinal: (config) => ({
    ...config,
    // Served from a path on GitHub Pages / a Pages project: relative asset URLs work under any of them.
    base: "./",
    plugins: [...(config.plugins ?? []), tailwindcss()],
  }),
}

export default config
