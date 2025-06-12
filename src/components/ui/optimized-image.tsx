import React from 'react';
import { useOptimizedImage } from '@/hooks/useOptimizedResources';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  placeholder?: string;
  className?: string;
  sizes?: string;
  aspectRatio?: string;
  width?: string | number;
  height?: string | number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  priority = false,
  placeholder,
  className = '',
  sizes,
  aspectRatio,
  width,
  height,
  ...props
}) => {
  const { imageProps, isLoaded, error, placeholder: defaultPlaceholder } = useOptimizedImage(src, {
    priority,
    sizes,
    placeholder
  });

  if (error) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center text-gray-500 text-sm ${className}`}
           style={aspectRatio ? { aspectRatio } : {}}>
        Error al cargar imagen
      </div>
    );
  }

  const containerStyle = {
    ...(aspectRatio && { aspectRatio }),
    ...(width && { width }),
    ...(height && { height }),
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={containerStyle}>
      {/* Placeholder mientras carga */}
      {!isLoaded && (
        <img
          src={placeholder || defaultPlaceholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm"
          aria-hidden="true"
        />
      )}
      
      {/* Imagen principal */}
      <img
        {...imageProps}
        {...props}
        alt={alt}
        width={width}
        height={height}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={(e) => {
          props.onLoad?.(e);
        }}
        onError={(e) => {
          props.onError?.(e);
        }}
      />
      
      {/* Overlay de carga para imágenes críticas */}
      {priority && !isLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
    </div>
  );
};

export default OptimizedImage;
