import { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";
import fs from "fs";
import mri from "mri";
import path from "path";

import checkExistingCodegen from "./checkExistingCodegen";

const parsedArgv = mri(process.argv);

const mode = parsedArgv.mode ?? process.env.NODE_ENV ?? "development";
const isProduction = mode === "production";

const { generatesFile, codegenFileExists } = checkExistingCodegen(isProduction);

const isViteCommand = process.env.npm_lifecycle_script.includes("vite");

// if command source is not vite and codegen file exists, then we should skip codegen step because vite uses codegen plugin. That means process.exit(1) will terminate later vite command, but it is already handled inside vite.config.ts
if (parsedArgv.ignoreIfAlreadyExists && codegenFileExists && !isViteCommand) {
  process.exit(0);
}

const envFiles = [".env", `.env.${mode}`];

for (const envFile of envFiles) {
  const envPath = path.resolve(__dirname, "..", envFile);

  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
}

const config: CodegenConfig = {
  schema: process.env.VITE_GRAPHQL_API_URL,
  overwrite: true,
  documents: ["src/api/graphql/*.graphql"],
  generates: {
    [generatesFile]: {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
