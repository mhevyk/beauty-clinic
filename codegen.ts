import { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

if (fs.existsSync(".env.development")) {
  dotenv.config({ path: ".env.development" });
}

const config: CodegenConfig = {
  schema: process.env.VITE_GRAPHQL_API_URL,
  overwrite: true,
  documents: ["src/api/graphql/*.graphql"],
  generates: {
    "src/api/generated/index.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
