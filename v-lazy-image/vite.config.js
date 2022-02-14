import { defineConfig } from "vite";
import path from "path";

const name = "v-lazy-image";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const file = mode === "v2" ? "index-v2" : "index";
  const outDir = mode === "v2" ? "v2" : "dist";

  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, file),
        name: "VLazyImage",
        fileName: (format) => (format === "es" ? `${name}.mjs` : `${name}.js`)
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: { vue: "Vue" }
        }
      },
      outDir,
      emptyOutDir: false
    }
  };
});
