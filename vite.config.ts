import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  publicDir: resolve(__dirname, "public"),
  mode: process.env.NODE_ENV || "development",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    sourceMap: true,
    minify: process.env.NODE_ENV === "production",
  },
  watch: {
    include: ["src/**"],
  },
});
