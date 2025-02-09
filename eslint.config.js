import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

import pluginJs from "@eslint/js";
import storybook from "eslint-plugin-storybook";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    languageOptions: { globals: globals.browser },
  },
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
      "no-array-constructor": "error",
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/prefer-ts-expect-error": "error",
      "@typescript-eslint/consistent-indexed-object-style": "error",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react",
              importNames: ["default"],
            },
            {
              name: "@iconify/react/dist/iconify.js",
              message:
                'Please import from "@iconify/react" instead of "@iconify/react/dist/iconify.js".',
            },
          ],
        },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector: "TSEnumDeclaration",
          message:
            "Usage of enums is not allowed. Use objects with as const instead",
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
