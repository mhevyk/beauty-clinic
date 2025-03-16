import fs from "fs";
import path from "path";

export default function checkExistingCodegen(isProduction: boolean) {
  const generatesFile = isProduction
    ? "dist/temp_api/index.tsx"
    : "src/api/generated/index.tsx";
  const generatesFilePath = path.resolve(__dirname, generatesFile);

  return {
    codegenFileExists: fs.existsSync(generatesFilePath),
    generatesFile,
  };
}
