import type { Config } from "jest";

const { parsed } = require("@dotenvx/dotenvx").config();

const envVars = Object.keys(parsed).reduce<Record<string, string>>(
  (vars, envVariableKey) => {
    vars[`import.meta.env.${envVariableKey}`] = `'${envVariableKey}'`;
    return vars;
  },
  {}
);

const config: Config = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/unit/setupTests.ts"],
  testMatch: ["<rootDir>/tests/unit/**/*.spec.ts?(x)"], // directories to find tests
  verbose: true,
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          transform: {
            optimizer: {
              globals: {
                vars: {
                  "import.meta.env.MODE": "'test'",
                  ...envVars,
                },
              },
            },
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
    "^.+\\.svg$": "jest-transformer-svg",
  },
  moduleNameMapper: {
    // import aliases
    "@/(.*)$": "<rootDir>/src/$1",
    "@api/hooks$": "<rootDir>/src/api/generated/index.tsx",
    "@tests/(.*)$": "<rootDir>/tests/$1",

    // mocks and stubs
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$":
      "identity-obj-proxy",
    "\\.(css|scss)$": "identity-obj-proxy",
  },

  // coverage
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  coverageReporters: ["html", "lcov"],
  coveragePathIgnorePatterns: ["node_modules", "src/api/generated/index.tsx"],
  coverageDirectory: "<rootDir>/tests/unit/coverage",
};

export default config;
