import React from 'react';

// Configuración específica para optimizar CLS (Cumulative Layout Shift)

export const CLS_CONFIG = {
  // Alturas fijas para prevenir layout shifts
  COMPONENT_HEIGHTS: {
    HERO: '100vh',
    SERVICES: '400px',
    HARDWARE: '600px',
    OPENSOURCE: '500px',
    FLOATING_CONTAINER: '120px',
    SKELETON_LOADER: '200px',
  },
  
  // Configuración de imágenes para prevenir CLS
  IMAGES: {
    HERO_FIREWALL: {
      width: 400,
      height: 225,
      aspectRatio: '16/9'
    },
    ICONS: {
      width: 48,
      height: 48,
      aspectRatio: '1/1'
    }
  },
  
  // Optimizaciones de animaciones
  ANIMATIONS: {
    // Usar solo propiedades que no afecten el layout
    SAFE_PROPERTIES: ['transform', 'opacity'],
    // Configuración para GPU acceleration
    USE_TRANSFORM_3D: true,
    // Will-change management
    AUTO_WILL_CHANGE: true,
  },
  
  // Configuración de contenedores
  CONTAINERS: {
    // Usar contain para limitar el impacto de cambios
    USE_CONTAINMENT: true,
    // Tipos de containment
    CONTAINMENT_TYPES: {
      LAYOUT: 'layout',
      STYLE: 'style',
      PAINT: 'paint',
      SIZE: 'size',
      FULL: 'layout style paint size'
    }
  }
};

// Tipo base para configuraciones CLS
export interface CLSConfig {
  fixedHeight?: string;
  aspectRatio?: string;
  containment?: string;
  willChange?: string[];
}

// Función para aplicar optimizaciones de CLS a un elemento
export const applyCLSOptimizations = (element: HTMLElement, config: CLSConfig) => {
  if (config.fixedHeight) {
    element.style.minHeight = config.fixedHeight;
  }
  
  if (config.aspectRatio) {
    element.style.aspectRatio = config.aspectRatio;
  }
  
  if (config.containment) {
    element.style.contain = config.containment;
  }
  
  if (config.willChange && config.willChange.length > 0) {
    element.style.willChange = config.willChange.join(', ');
  }
};

// Configuraciones predefinidas para componentes específicos
export const CLS_COMPONENT_CONFIGS = {
  HERO: {
    fixedHeight: CLS_CONFIG.COMPONENT_HEIGHTS.HERO,
    containment: CLS_CONFIG.CONTAINERS.CONTAINMENT_TYPES.LAYOUT,
    willChange: []
  } as CLSConfig,
  
  HARDWARE_CARD: {
    fixedHeight: '480px',
    containment: CLS_CONFIG.CONTAINERS.CONTAINMENT_TYPES.LAYOUT,
    willChange: CLS_CONFIG.ANIMATIONS.SAFE_PROPERTIES
  } as CLSConfig,
  
  FLOATING_CONTAINER: {
    fixedHeight: CLS_CONFIG.COMPONENT_HEIGHTS.FLOATING_CONTAINER,
    containment: CLS_CONFIG.CONTAINERS.CONTAINMENT_TYPES.FULL,
    willChange: []
  } as CLSConfig,
  
  IMAGE_CONTAINER: {
    containment: CLS_CONFIG.CONTAINERS.CONTAINMENT_TYPES.LAYOUT,
    willChange: []
  } as CLSConfig,
  
  ANIMATION_ELEMENT: {
    containment: CLS_CONFIG.CONTAINERS.CONTAINMENT_TYPES.LAYOUT,
    willChange: CLS_CONFIG.ANIMATIONS.SAFE_PROPERTIES
  } as CLSConfig
};

// Utility functions para CLS
export const createCLSOptimizedStyle = (config: CLSConfig): React.CSSProperties => {
  const style: React.CSSProperties = {};
  
  if (config.fixedHeight) {
    style.minHeight = config.fixedHeight;
  }
  
  if (config.aspectRatio) {
    style.aspectRatio = config.aspectRatio;
  }
  
  if (config.containment) {
    style.contain = config.containment;
  }
  
  if (config.willChange && config.willChange.length > 0) {
    style.willChange = config.willChange.join(', ');
  }
  
  return style;
};

// Hook para aplicar optimizaciones CLS
export const useCLSOptimization = (
  ref: React.RefObject<HTMLElement>,
  config: CLSConfig
) => {
  React.useEffect(() => {
    if (ref.current) {
      applyCLSOptimizations(ref.current, config);
    }
  }, [ref, config]);
};
