/** @format */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// this is for absolute import
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // this resolve is for absolute import 
  resolve: {
    alias: {
      "#components": resolve(
        dirname(fileURLToPath(import.meta.url)),
        "src/components"
      ),
      "#constants": resolve(
        dirname(fileURLToPath(import.meta.url)),
        "src/constants"
      ),
      "#store": resolve(dirname(fileURLToPath(import.meta.url)), "src/store"),
      "#hoc": resolve(dirname(fileURLToPath(import.meta.url)), "src/hoc"),
      "#windows": resolve(dirname(fileURLToPath(import.meta.url)), "src/windows"),
    },
  },
});
