import { addons } from "storybook/manager-api"
import { create } from "storybook/theming"

// The name and the way to the source; no colours of its own, so the manager keeps following the device's light or dark, as the stories do.
addons.setConfig({
  theme: create({ base: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light", brandTitle: "lmfaole designsystem", brandUrl: "https://github.com/lmfaole/designsystem", brandTarget: "_self" }),
  // Engineering is for whoever builds the apps: closed until opened, so the sidebar starts with what everyone reads.
  sidebar: { showRoots: true, collapsedRoots: ["engineering"] },
  // The accessibility panel first: it is the one a reviewer reads on every story.
  selectedPanel: "storybook/a11y/panel",
  toolbar: { eject: { hidden: true } },
})
