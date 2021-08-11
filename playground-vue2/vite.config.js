import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
// import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // vue(),
    createVuePlugin(),
  ],
});
