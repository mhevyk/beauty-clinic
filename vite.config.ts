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
  const env = loadEnv(mode, process.cwd());
  const isProductionMode = mode === "production";

  const buildAliases = isProductionMode && {
    "@/api/generated": path.resolve(__dirname, `${BUILD_DIR}/temp_api`),
  };

  return {
    build: {
      sourcemap: command === "build" && !isProductionMode,
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
      port: Number(env.VITE_PORT),
      open: true,
    },
    preview: {
      port: Number(env.VITE_PREVIEW_PORT),
      open: true,
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
