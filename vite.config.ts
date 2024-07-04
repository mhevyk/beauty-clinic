import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import svgr from "vite-plugin-svgr";

function resolveSource(...paths: string[]) {
  return path.resolve(__dirname, "src", ...paths);
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@api/hooks": resolveSource("api", "generated", "index.tsx"),
      "@type-helpers": resolveSource("types", "helpers.ts"),
      "@tests": path.resolve(__dirname, "tests"),
    },
  },
  plugins: [
    react(),
    svgr({
      include: "**/*.svg",
      exclude: "**/*.svg?url",
    }),
  ],
});
