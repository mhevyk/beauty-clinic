import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { preprocessor } from "@badeball/cypress-cucumber-preprocessor/browserify";
import { defineConfig } from "cypress";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const typescript = require.resolve("typescript");

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) {
  await addCucumberPreprocessorPlugin(on, config);

  on("file:preprocessor", preprocessor(config, { typescript }));

  return config;
}

export default defineConfig({
  e2e: {
    baseUrl: "https://duckduckgo.com",
    specPattern: "tests/e2e/cypress/features/**/*.feature",
    setupNodeEvents,
    supportFile: "tests/e2e/cypress/support/index.ts",
  },
});
