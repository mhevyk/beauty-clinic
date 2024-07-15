import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { preprocessor } from "@badeball/cypress-cucumber-preprocessor/browserify";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const typescript = require.resolve("typescript");

export default async function (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) {
  await addCucumberPreprocessorPlugin(on, config);

  on("file:preprocessor", preprocessor(config, { typescript }));

  return config;
}
