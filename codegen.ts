import { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const mode = process.env.NODE_ENV ?? "development";
const isProduction = mode === "production";

const generatesFile = isProduction
  ? "dist/temp_api/index.tsx"
  : "src/api/generated/index.tsx";

const envFiles = [".env", `.env.${mode}`];
for (const envFile of envFiles) {
  const envPath = path.resolve(__dirname, envFile);

  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
}

const config: CodegenConfig = {
  schema: process.env.VITE_GRAPHQL_API_URL,
  overwrite: true,
  silent: !isProduction,
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
