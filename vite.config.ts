import react from "@vitejs/plugin-react-swc";

import path from "path";
import { defineConfig } from "vite";
import codegen from "vite-plugin-graphql-codegen";
import string from "vite-plugin-string";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    build: {
      minify: isProduction,
      sourcemap: !isProduction,
      rollupOptions: {
        output: {
          manualChunks: {
            // grouping packages by chunks
            mui: ["@mui/material", "@emotion/styled", "@emotion/react"],
            api: ["@apollo/client", "apollo-link-token-refresh", "graphql"],
            forms: ["formik", "yup"],
            mapbox: ["mapbox-gl"], // mapbox-gl is a large package, there is an issue on github about this, developers of this package try to fix it
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@tests": path.resolve(__dirname, "tests"),
      },
    },
    plugins: [
      react(),
      string(),
      codegen({ configOverride: { silent: !isProduction } }), // avoid output to console in case of error
      svgr({ include: "**/*.svg" }),
    ],
  };
});
