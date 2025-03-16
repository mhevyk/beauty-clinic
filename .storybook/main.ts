import type { StorybookConfig } from "@storybook/react-vite";

import { PluginOption } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: viteConfig => {
    if (viteConfig.plugins) {
      viteConfig.plugins = viteConfig.plugins.filter((plugin: PluginOption) => {
        if (plugin && "name" in plugin) {
          return !plugin.name.includes("codegen");
        }

        return true;
      });
    }

    return viteConfig;
  },
};

export default config;
