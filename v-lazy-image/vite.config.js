import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "index.js"),
      name: "VLazyImage",
    },
  },
  optimizeDeps: {
    exclude: ["vue-demi"],
  },
  rollupOptions: {
    external: ["vue-demi"],
    output: {
      globals: {
        "vue-demi": "Vue",
      },
    },
  },
});
