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
      "@images": resolveSource("assets", "images"),
      "@icons": resolveSource("assets", "icons"),
      "@backgrounds": resolveSource("assets", "backgrounds"),
      "@decorations": resolveSource("assets", "decorations"),
      "@theme": resolveSource("theme"),
      "@api/hooks": resolveSource("api", "generated", "index.tsx"),
      "@constants": resolveSource("constants"),
      "@validation": resolveSource("validation"),
      "@store": resolveSource("store"),
      "@config": resolveSource("config"),
      "@utils": resolveSource("utils"),
      "@type-helpers": resolveSource("types", "helpers.ts"),
      "@routes": resolveSource("routes"),
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
