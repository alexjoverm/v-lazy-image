import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const file = mode === "v2" ? "index-v2.js" : "index.js";
  const outDir = mode === "v2" ? "v2" : "dist";

  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, file),
        name: "VLazyImage",
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: { vue: "Vue" },
        },
      },
      outDir,
      emptyOutDir: false,
    },
  };
});
