import * as reactHooks from "eslint-plugin-react-hooks";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

import pluginJs from "@eslint/js";
import storybook from "eslint-plugin-storybook";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    languageOptions: { globals: globals.browser },
  },
  {
    ignores: ["src/api/generated/index.tsx", "src/types/material-ui.d.ts"],
  },
  pluginJs.configs.recommended,
  reactHooks.configs["recommended-latest"],
  pluginReactConfig,
  ...tseslint.configs.recommended,
  ...storybook.configs["flat/recommended"],
  {
    rules: {
      // React-specific rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // Code style and best practices
      curly: "error",
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "error",
      "no-array-constructor": "error",

      // Shadowing
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",

      // TypeScript-specific rules
      "@typescript-eslint/prefer-ts-expect-error": "error",
      "@typescript-eslint/consistent-indexed-object-style": "error",

      // Restricting certain imports
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

      // Restricting syntax usage
      "no-restricted-syntax": [
        "error",
        {
          selector: "TSEnumDeclaration",
          message:
            "Usage of enums is not allowed. Use objects with 'as const' instead.",
        },
      ],
    },
  },

  // React version detection
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
