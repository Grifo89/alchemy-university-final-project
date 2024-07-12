import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src/frontend",
  plugins: [react()],
  server: {
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
});
