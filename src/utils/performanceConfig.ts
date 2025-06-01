// Configuraciones de rendimiento para optimizar el uso de recursos

export const PERFORMANCE_CONFIG = {
  // Configuración de animaciones
  ANIMATION: {
    TARGET_FPS: 30,
    COLLISION_CHECK_INTERVAL: 5, // Cada N frames
    MAX_CONCURRENT_ICONS: 50,
    MOVEMENT_RADIUS: 8,
    MOVEMENT_SPEED_MULTIPLIER: 0.8,
  },

  // Configuración de iconos
  ICONS: {
    MAX_FLOATING_ICONS: 24,
    MAX_SEARCH_RESULTS: 60,
    CONTAINER_AREA_DIVISOR: 12000, // Para calcular iconos óptimos (reducido para permitir más)
    MIN_ICONS: 16,
    // Configuración de herramientas por categoría según el dispositivo
    TOOLS_PER_CATEGORY: {
      mobile: 2,
      tablet: 3,
      desktop: 4
    },
    // Configuración para casos específicos
    MAX_TOOLS_PER_CATEGORY: 5, // Máximo absoluto por categoría
    MIN_TOOLS_PER_CATEGORY: 1, // Mínimo por categoría
  },

  // Configuración de detección de visibilidad
  VISIBILITY: {
    INTERSECTION_THRESHOLD: 0.1,
  },

  // Configuración de throttling
  THROTTLING: {
    SEARCH_DEBOUNCE_MS: 300,
    RESIZE_DEBOUNCE_MS: 150,
  }
};

// Función para calcular el número óptimo de iconos según el dispositivo
export const calculateOptimalIconCount = (containerArea: number, deviceType: 'mobile' | 'tablet' | 'desktop'): number => {
  const baseConfig = PERFORMANCE_CONFIG.ICONS;
  
  switch (deviceType) {
    case 'mobile':
      return Math.min(baseConfig.MAX_FLOATING_ICONS * 0.6, Math.max(8, Math.floor(containerArea / 20000)));
    case 'tablet':
      return Math.min(baseConfig.MAX_FLOATING_ICONS * 0.8, Math.max(12, Math.floor(containerArea / 17500)));
    case 'desktop':
    default:
      return Math.min(baseConfig.MAX_FLOATING_ICONS, Math.max(baseConfig.MIN_ICONS, Math.floor(containerArea / baseConfig.CONTAINER_AREA_DIVISOR)));
  }
};

// Función para detectar el tipo de dispositivo
export const detectDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const width = window.innerWidth;
  
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

// Función para obtener el número de herramientas por categoría según el dispositivo
export const getToolsPerCategory = (deviceType: 'mobile' | 'tablet' | 'desktop'): number => {
  return PERFORMANCE_CONFIG.ICONS.TOOLS_PER_CATEGORY[deviceType];
};

// Función para obtener el número óptimo de herramientas por categoría
export const getOptimalToolsPerCategory = (containerArea?: number): number => {
  const deviceType = detectDeviceType();
  const baseCount = getToolsPerCategory(deviceType);
  
  // Si tenemos información del área del contenedor, podemos ajustar dinámicamente
  if (containerArea) {
    const areaFactor = containerArea / 300000; // Área base de referencia
    const adjustedCount = Math.min(
      PERFORMANCE_CONFIG.ICONS.MAX_TOOLS_PER_CATEGORY,
      Math.max(
        PERFORMANCE_CONFIG.ICONS.MIN_TOOLS_PER_CATEGORY,
        Math.round(baseCount * areaFactor)
      )
    );
    return adjustedCount;
  }
  
  return baseCount;
};

// Función para obtener configuración personalizada por categoría
export const getCategorySpecificConfig = (containerArea?: number): Record<string, number> => {
  const deviceType = detectDeviceType();
  const baseCount = getToolsPerCategory(deviceType);
  
  // Configuraciones específicas por categoría popular
  const categoryPriorities: Record<string, number> = {
    "Gestión de Proyectos": 1.5,
    "Comunicación": 1.3,
    "Monitorización y Observabilidad": 1.2,
    "CRM y Ventas": 1.4,
    "Marketing por Email": 1.1,
    "Web Building": 1.2,
    "Automatización": 1.0,
    "Videoconferencia": 1.3,
    "Acceso Remoto": 1.0,
    "Soluciones NAS": 0.8,
    "Analítica Web": 1.1,
    "Base de Datos No-Code": 1.0,
    "Plataforma de Ventas": 1.1,
    "Documentación": 1.0,
    "Rastreo de Tiempo": 0.9,
    "Gestión de Recursos Humanos": 0.8,
  };
  
  const config: Record<string, number> = {};
  
  Object.keys(categoryPriorities).forEach(category => {
    const priority = categoryPriorities[category];
    let count = Math.round(baseCount * priority);
    
    // Ajustar por área del contenedor si está disponible
    if (containerArea) {
      const areaFactor = containerArea / 300000;
      count = Math.round(count * areaFactor);
    }
    
    // Aplicar límites mínimos y máximos
    count = Math.min(
      PERFORMANCE_CONFIG.ICONS.MAX_TOOLS_PER_CATEGORY,
      Math.max(PERFORMANCE_CONFIG.ICONS.MIN_TOOLS_PER_CATEGORY, count)
    );
    
    config[category] = count;
  });
  
  return config;
};

// Hook personalizado para el throttling de funciones
export const useThrottledCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  let lastCall = 0;
  
  return ((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return callback(...args);
    }
  }) as T;
};
