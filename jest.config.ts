import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/unit/setupTests.tsx"],
  testMatch: ["<rootDir>/tests/unit/**/*.spec.ts?(x)"], // directories to find tests
  verbose: true,
  bail: true, // exit after first test failure
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          transform: {
            optimizer: {
              globals: {
                vars: {
                  "import.meta.env": "{}",
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
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/unit/utils/fileTransformer.js",
    "^.+\\.svg": "jest-transformer-svg",
  },
  moduleNameMapper: {
    // order is important

    // mocks and stubs
    "\\.(css|scss)$": "<rootDir>/tests/unit/mocks/fileMock.js",
    // import query parameters
    "^@/(.*)\\.css\\?raw$": "<rootDir>/tests/unit/mocks/fileMock.js", // for css imported as string

    // import aliases
    "@/(.*)$": "<rootDir>/src/$1",
    "@tests/(.*)$": "<rootDir>/tests/$1",
  },

  // coverage
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  coverageReporters: ["html", "lcov"],
  coveragePathIgnorePatterns: [
    "node_modules",
    "src/api/generated/index.tsx",
    "\\.(styles|constants)\\.(js|jsx|ts|tsx)$", // ignore .styles.extension and .constants.extension files
  ],
  coverageDirectory: "<rootDir>/tests/unit/coverage",
  // TODO: uncomment it when mui is deleted
  // coverageThreshold: {
  //   global: {
  //     branches: 50,
  //     functions: 50,
  //     lines: 50,
  //     statements: 50,
  //   },
  // },
};

export default config;
