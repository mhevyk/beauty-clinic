import react from "@vitejs/plugin-react-swc";

import "dotenv/config";
import path from "path";
import { defineConfig } from "vite";
import string from "vite-plugin-string";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
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
  define: {
    "process.env": process.env,
  },
});
