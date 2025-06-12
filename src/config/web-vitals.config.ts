import { defineConfig } from 'vite';

// Configuraciones específicas para optimizar Web Vitals en producción
export const webVitalsConfig = {
  // Optimizaciones de build para LCP
  build: {
    rollupOptions: {
      output: {
        // Separar chunks para mejor caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['lucide-react', '@radix-ui/react-tooltip'],
          'motion-vendor': ['framer-motion'],
          'query-vendor': ['@tanstack/react-query']
        }
      }
    },
    // Compresión optimizada
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remover console.logs en producción
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn']
      }
    }
  },

  // Preload directives para recursos críticos
  preloadDirectives: [
    {
      rel: 'preload',
      href: '/assets/images/hardware/firewall.webp',
      as: 'image',
      type: 'image/webp',
      fetchpriority: 'high'
    }
  ],

  // Resource hints para mejorar rendimiento
  resourceHints: [
    {
      rel: 'dns-prefetch',
      href: '//fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: true
    }
  ],

  // Critical CSS extraction
  criticalCSS: {
    inline: true,
    minify: true,
    dimensions: [
      { width: 1920, height: 1080 }, // Desktop
      { width: 768, height: 1024 },  // Tablet
      { width: 375, height: 667 }    // Mobile
    ]
  },

  // Image optimization settings
  imageOptimization: {
    formats: ['webp', 'avif'],
    quality: {
      webp: 85,
      avif: 80,
      jpeg: 85
    },
    sizes: [400, 800, 1200, 1600],
    lazy: true,
    placeholder: 'blur'
  },

  // Service Worker configuration
  serviceWorker: {
    cacheFirst: [
      '/assets/images/**/*',
      '/assets/fonts/**/*'
    ],
    networkFirst: [
      '/api/**/*'
    ],
    staleWhileRevalidate: [
      '/**/*.{js,css,html}'
    ]
  }
};

// Métricas objetivo para Web Vitals
export const webVitalsThresholds = {
  lcp: {
    good: 2500,    // < 2.5s
    poor: 4000     // > 4.0s
  },
  cls: {
    good: 0.1,     // < 0.1
    poor: 0.25     // > 0.25
  },
  fid: {
    good: 100,     // < 100ms
    poor: 300      // > 300ms
  },
  ttfb: {
    good: 800,     // < 800ms
    poor: 1800     // > 1.8s
  }
};

// Configuración de monitoring
export const monitoringConfig = {
  sampleRate: 0.1, // 10% de las sesiones
  endpoint: '/api/vitals',
  enableInDevelopment: false,
  enableConsoleLogging: true,
  enablePerformanceMarks: true
};

export default webVitalsConfig;
