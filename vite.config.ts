import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    base: "/astro-db/", // Add base URL for GitHub Pages
    server: {
      proxy: {
        "/astrology": {
          target: "https://json.freeastrologyapi.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/astrology/, ""),
          headers: {
            "x-api-key": env.VITE_ASTROLOGY_API_KEY,
          },
        },
      },
    },
  };
});
