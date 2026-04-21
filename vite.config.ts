import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    preprocessorOptions: {},
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Silencia warnings de URLs de imagens em CSS que são resolvidas em runtime
        if (
          warning.code === "UNRESOLVED_IMPORT" ||
          (warning.message && warning.message.includes("didn't resolve at build time"))
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
});