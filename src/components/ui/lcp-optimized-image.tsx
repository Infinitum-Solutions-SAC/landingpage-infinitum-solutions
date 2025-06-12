import React, { useState, useEffect } from 'react';

interface LCPOptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  placeholder?: string;
  onLoad?: () => void;
}

const LCPOptimizedImage: React.FC<LCPOptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = true,
  placeholder,
  onLoad
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Precargar la imagen para mejorar LCP
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
      onLoad?.();
    };
    img.onerror = () => {
      setError(true);
    };
  }, [src, onLoad]);

  // Placeholder base64 optimizado
  const defaultPlaceholder = placeholder || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=';

  const aspectRatio = `${width}/${height}`;

  if (error) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center text-gray-500 text-sm ${className}`}
        style={{ aspectRatio, width: '100%', height: 'auto' }}
      >
        Error al cargar imagen
      </div>
    );
  }

  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      style={{ 
        aspectRatio, 
        width: '100%', 
        height: 'auto',
        contain: 'layout style paint' // Prevenir CLS
      }}
    >
      {/* Placeholder para prevenir CLS */}
      <img
        src={defaultPlaceholder}
        alt=""
        className="absolute inset-0 w-full h-full object-contain blur-sm"
        style={{ 
          opacity: isLoaded ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
        aria-hidden="true"
      />
      
      {/* Imagen principal con optimizaciones LCP */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="absolute inset-0 w-full h-full object-contain"
        style={{ 
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
};

export default LCPOptimizedImage;
