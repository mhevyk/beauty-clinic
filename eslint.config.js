import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

import pluginJs from "@eslint/js";
import storybook from "eslint-plugin-storybook";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...storybook.configs["flat/recommended"],
  pluginReactConfig,
  {
    ignores: ["src/api/generated/index.tsx", "src/types/material-ui.d.ts"],
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      curly: "error",
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "error",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react",
              importNames: ["default"],
            },
          ],
        },
      ],
    },
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
