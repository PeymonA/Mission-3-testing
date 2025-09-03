Gemini:

Addressing CORS in Vite.js (Development Proxy):
While the server-side CORS configuration is crucial for production, during development,
Vite's built-in proxy feature can be used to avoid CORS issues by making the browser believe the requests
are to the same origin.

Configure the proxy in vite.config.js:

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

Make API calls from your frontend using the proxy path:
  // Instead of http://localhost:3000/data
    fetch('/api/data')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));