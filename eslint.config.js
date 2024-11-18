import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    ignores: ["src/api/generated/index.tsx", "src/types/material-ui.d.ts"],
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      curly: 'error',
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
