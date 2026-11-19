import tailwindcss from "@tailwindcss/vite"
import type { StorybookConfig } from "@storybook/react-vite"
import remarkGfm from "remark-gfm"

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.tsx"],
  // remark-gfm: tables in the guides.
  addons: [{ name: "@storybook/addon-docs", options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } } }, "@storybook/addon-a11y"],
  framework: "@storybook/react-vite",
  viteFinal: (config) => ({
    ...config,
    // Served from a path on GitHub Pages / a Pages project: relative asset URLs work under any of them.
    base: "./",
    plugins: [...(config.plugins ?? []), tailwindcss()],
  }),
}

export default config
