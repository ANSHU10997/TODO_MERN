import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
<<<<<<< Updated upstream
      "/tasks": "https://todo-mern-list.rouge.app/tasks",
=======
      "/tasks": "https://todo-mern-list.vercel.app",
>>>>>>> Stashed changes
    },
  },
});
