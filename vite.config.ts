import react from "@vitejs/plugin-react-swc";

import path from "path";
import { defineConfig } from "vite";
import string from "vite-plugin-string";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    minify: mode === "production",
    sourcemap: mode !== "production",
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
    svgr({
      include: "**/*.svg",
    }),
  ],
}));
