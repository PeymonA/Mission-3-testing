import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Or other framework plugins

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // Requests starting with /api will be proxied
        target: 'http://localhost:3000', // Your Express server address
        changeOrigin: true, // Crucial for handling CORS
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix
      },
    },
  },
});