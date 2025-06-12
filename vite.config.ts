import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimizaciones para mejorar LCP y Web Vitals
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar librerías grandes en chunks específicos
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-tabs', '@radix-ui/react-tooltip', '@radix-ui/react-dialog'],
          'motion-vendor': ['framer-motion'],
          'query-vendor': ['@tanstack/react-query'],
        }
      }
    },
    // Dividir chunks para mejorar la carga
    chunkSizeWarningLimit: 1000,
    // Optimizar para navegadores modernos
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production', // Remover console.logs solo en producción
        drop_debugger: true,
        pure_funcs: mode === 'production' ? ['console.log', 'console.warn'] : []
      }
    },
    // Mejorar caching con nombres de archivo estables
    cssCodeSplit: true,
    sourcemap: mode === 'development'
  },
  optimizeDeps: {
    // Pre-bundle dependencias críticas
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'lucide-react'
    ]
  }
}));
