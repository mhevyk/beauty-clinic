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
      "@components": resolveSource("components"),
      "@hooks": resolveSource("hooks"),
      "@pages": resolveSource("pages"),
      "@layouts": resolveSource("layouts"),
      "@images": resolveSource("assets", "images"),
      "@icons": resolveSource("assets", "icons"),
      "@theme": resolveSource("theme"),
      "@api/hooks": resolveSource("api", "generated", "index.tsx"),
      "@constants": resolveSource("constants"),
      "@validation": resolveSource("validation"),
      "@config": resolveSource("config"),
      "@context": resolveSource("context"),
    },
  },
  plugins: [react(), svgr()],
});
