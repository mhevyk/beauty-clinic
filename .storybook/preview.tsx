import type { Preview } from "@storybook/react";

import { APP_COLORS } from "../src/styles";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      story: {
        height: "30px", // min height of story to avoid flashes
      },
    },
    backgrounds: {
      default: "light",
      values: [{ name: "overlay", value: APP_COLORS.overlay }],
    },
  },
};

export default preview;
