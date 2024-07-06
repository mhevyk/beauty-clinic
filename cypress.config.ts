import { defineConfig } from "cypress";
import path from "path";

import setupNodeEvents from "./tests/e2e/cypress/setupNodeEvents";

const cypressFolder = "tests/e2e/cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://duckduckgo.com",
    specPattern: path.resolve(cypressFolder, "features/**/*.feature"),
    setupNodeEvents,
    supportFile: path.resolve(cypressFolder, "support/index.ts"),
    video: false,
    screenshotsFolder: path.resolve(cypressFolder, "screenshots"),
  },
});
