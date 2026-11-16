import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        civil: resolve(import.meta.dirname, "advogado-direito-civil-joinville/index.html"),
      },
    },
  },
});
