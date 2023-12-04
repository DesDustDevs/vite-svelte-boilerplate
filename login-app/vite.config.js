import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import Pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  plugin: [Pages()],
});
