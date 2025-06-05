import { useEffect, useState } from 'react';

interface UseImagePreloadOptions {
  src: string;
  priority?: boolean;
}

export const useImagePreload = ({ src, priority = false }: UseImagePreloadOptions) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    
    const handleLoad = () => {
      setIsLoaded(true);
      setError(null);
    };

    const handleError = () => {
      setError('Failed to load image');
      setIsLoaded(false);
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    // Configurar prioridad para imágenes críticas LCP
    if (priority) {
      img.fetchPriority = 'high';
      img.loading = 'eager';
    } else {
      img.loading = 'lazy';
    }

    img.src = src;

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src, priority]);

  return { isLoaded, error };
};

// Hook para precargar recursos críticos
export const usePreloadCriticalResources = () => {
  useEffect(() => {
    // Precargar imágenes críticas
    const criticalImages = [
      '/assets/images/og-image.webp',
      '/favicon.ico'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });

    // Precargar fuentes críticas si las usas
    const criticalFonts = [
      // Añadir URLs de fuentes críticas aquí si las tienes
    ];

    criticalFonts.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = href;
      document.head.appendChild(link);
    });
  }, []);
};

// Hook para optimizar el renderizado de imágenes
export const useOptimizedImage = (src: string, options: {
  priority?: boolean;
  sizes?: string;
  placeholder?: string;
} = {}) => {
  const { isLoaded, error } = useImagePreload({ 
    src, 
    priority: options.priority 
  });

  const imageProps = {
    src,
    loading: options.priority ? 'eager' as const : 'lazy' as const,
    decoding: 'async' as const,
    ...(options.sizes && { sizes: options.sizes }),
    ...(options.priority && { fetchPriority: 'high' as const }),
  };

  return {
    imageProps,
    isLoaded,
    error,
    placeholder: options.placeholder || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4='
  };
};
