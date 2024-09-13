import react from "@vitejs/plugin-react-swc";

import path from "path";
import { defineConfig, loadEnv } from "vite";
import dts from "vite-plugin-dts";
import codegen from "vite-plugin-graphql-codegen";
import string from "vite-plugin-string";
import svgr from "vite-plugin-svgr";

const BUILD_DIR = "dist";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const isProductionMode = mode === "production";
  const isDevelopmentBuild = !isProductionMode && command === "build";

  const env = loadEnv(mode, process.cwd());

  const buildAliases = isProductionMode && {
    "@/api/generated": path.resolve(__dirname, `${BUILD_DIR}/temp_api`),
  };

  return {
    build: {
      sourcemap: isDevelopmentBuild,
      outDir: BUILD_DIR,
      rollupOptions: {
        output: {
          manualChunks: {
            mui: ["@mui/material", "@emotion/styled", "@emotion/react"],
            api: ["@apollo/client", "apollo-link-token-refresh", "graphql"],
            forms: ["formik", "yup"],
            mapbox: ["mapbox-gl"], // mapbox-gl is a large package, there is an issue on github about this, developers of this package try to fix it
          },
        },
      },
    },
    server: {
      port: Number(env.VITE_APP_PORT),
      open: !isProductionMode,
    },
    resolve: {
      alias: {
        ...buildAliases, // should be placed exactly there
        "@": path.resolve(__dirname, "src"),
        "@tests": path.resolve(__dirname, "tests"),
      },
    },
    plugins: [
      react(),
      string(),
      svgr({ include: "**/*.svg" }),
      codegen({
        throwOnStart: true,
        configOverride: { schema: env.VITE_GRAPHQL_API_URL },
        configFilePathOverride: `codegen.${mode}.ts`,
        configOverrideOnBuild: {
          hooks: {
            afterAllFileWrite: () => {
              dts();
            },
          },
        },
      }),
    ],
  };
});
