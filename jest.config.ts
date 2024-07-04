import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/unit/setupTests.ts"],
  verbose: true,
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
    "^.+\\.svg$": "jest-transformer-svg", // TODO: use following in vite plugins: plugins: [react(), svgr({ include: '**/*.svg' })],
  },
  moduleNameMapper: {
    // import aliases
    "@/(.*)$": "<rootDir>/src/$1",
    "@images/(.*)$": "<rootDir>/src/assets/images/$1",
    "@icons/(.*)$": "<rootDir>/src/assets/icons/$1",
    "@backgrounds/(.*)$": "<rootDir>/src/assets/backgrounds/$1",
    "@decorations/(.*)$": "<rootDir>/src/assets/decorations/$1",
    "@api/hooks$": "<rootDir>/src/api/generated/index.tsx",
    "@validation/(.*)$": "<rootDir>/src/validation/$1",
    "@type-helpers$": "<rootDir>/src/types/helpers.ts",
    "@routes/(.*)$": "<rootDir>/src/routes/$1",
    "@tests/(.*)$": "<rootDir>/tests/unit/$1",

    // mocks and stubs
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$":
      "identity-obj-proxy",
    "\\.(css|scss)$": "identity-obj-proxy",
  },

  // coverage
  collectCoverageFrom: ["**/*.{js,jsx,ts,tsx}"],
  coverageReporters: ["html", "lcov"],
  coveragePathIgnorePatterns: ["node_modules"],
  coverageDirectory: "<rootDir>/tests/unit/coverage",
};

export default config;
