
import { useState, useEffect, useRef } from 'react';
import { getTopToolsPerCategory, getToolsWithDynamicCount } from '@/utils/calculatorUtils';
import { PERFORMANCE_CONFIG, calculateOptimalIconCount, detectDeviceType, getOptimalToolsPerCategory, getCategorySpecificConfig } from '@/utils/performanceConfig';

export interface FloatingIcon {
  name: string;
  icon: string;
  cost?: number;
  x: number;
  y: number;
  initialX: number;
  initialY: number;
  dirX: number;
  dirY: number;
  speed: number;
  size: number;
  rotating?: boolean;
}

interface ContainerSize {
  width: number;
  height: number;
}

export const useFloatingIcons = (containerRef: React.RefObject<HTMLDivElement>, isFloatingMode?: boolean) => {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);
  const [allTools, setAllTools] = useState<any[]>([]);
  const [containerSize, setContainerSize] = useState<ContainerSize>({ width: 0, height: 0 });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const animationRef = useRef<number>();
  const lastUpdateTimeRef = useRef<number>(0);
  const [isContainerVisible, setIsContainerVisible] = useState<boolean>(true);
  
  // isVisible ahora depende tanto de la visibilidad del contenedor como del modo activo
  const isVisible = isContainerVisible && (isFloatingMode !== false);

  // Inicializar los iconos flotantes
  useEffect(() => {
    if (!containerRef.current) return;

    const updateContainerSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    // Configurar el tamaño inicial
    updateContainerSize();

    // Determinar el número óptimo de herramientas por categoría basado en el dispositivo y área del contenedor
    const containerArea = containerRef.current.clientWidth * containerRef.current.clientHeight;
    const categoryConfig = getCategorySpecificConfig(containerArea);
    
    // Obtener las herramientas SaaS con la configuración optimizada por categoría
    const tools = getToolsWithDynamicCount(categoryConfig);
    setAllTools(tools);
    
    // Determinar el número óptimo de iconos basado en el dispositivo y rendimiento
    const deviceType = detectDeviceType();
    const maxIcons = Math.min(tools.length, calculateOptimalIconCount(containerArea, deviceType));
    const selectedTools = tools.slice(0, maxIcons);
    
    createFloatingIcons(selectedTools, containerRef.current);

    const handleResize = () => {
      updateContainerSize();
    };

    // Intersection Observer para pausar animaciones cuando no es visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsContainerVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Efecto para el término de búsqueda
  useEffect(() => {
    if (!containerRef.current || !allTools.length) return;

    if (!searchTerm) {
      // Si no hay término de búsqueda, mostrar iconos predeterminados con límite optimizado
      const containerArea = containerRef.current.clientWidth * containerRef.current.clientHeight;
      const deviceType = detectDeviceType();
      const maxIcons = Math.min(allTools.length, calculateOptimalIconCount(containerArea, deviceType));
      const defaultTools = allTools.slice(0, maxIcons);
      createFloatingIcons(defaultTools, containerRef.current);
    } else {
      // Filtrar herramientas basadas en el término de búsqueda con límite
      const matchedTools = allTools.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, PERFORMANCE_CONFIG.ICONS.MAX_SEARCH_RESULTS);
      createFloatingIcons(matchedTools, containerRef.current);
    }
  }, [searchTerm, allTools]);

  // Función para crear iconos flotantes
  const createFloatingIcons = (tools: any[], container: HTMLDivElement) => {
    // Organizar inicialmente los iconos en una cuadrícula
    const columns = Math.ceil(Math.sqrt(tools.length));
    const cellWidth = container.clientWidth / columns;
    const cellHeight = container.clientHeight / Math.ceil(tools.length / columns);
    
    // Crear iconos flotantes con posiciones en cuadrícula y añadir aleatoriedad
    const newIcons = tools.map((tool, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);
      
      // Tamaño base más pequeño para dejar más espacio
      const size = 45 + Math.random() * 15; // Tamaños variables entre 45-60px
      
      // Posición inicial basada en cuadrícula con ligera aleatoriedad
      const initialXPos = (col * cellWidth) + (cellWidth - size) / 2 + (Math.random() - 0.5) * cellWidth * 0.5;
      const initialYPos = (row * cellHeight) + (cellHeight - size) / 2 + (Math.random() - 0.5) * cellHeight * 0.5;
      
      const x = Math.max(0, Math.min(initialXPos, container.clientWidth - size));
      const y = Math.max(0, Math.min(initialYPos, container.clientHeight - size));
      
      return {
        name: tool.name,
        icon: tool.icon,
        cost: tool.cost,
        x: x,
        y: y,
        initialX: x,
        initialY: y,
        dirX: (Math.random() - 0.5) * 1.2,
        dirY: (Math.random() - 0.5) * 1.2,
        speed: 0.3 + Math.random() * 0.3,
        size
      };
    });

    setIcons(newIcons);
  };

  // Función para manejar colisiones
  const handleCollision = (icon1Index: number, icon2Index: number, updatedIcons: FloatingIcon[]) => {
    const icon1 = updatedIcons[icon1Index];
    const icon2 = updatedIcons[icon2Index];
    
    // Distancia entre centros de los iconos
    const dx = (icon1.x + icon1.size/2) - (icon2.x + icon2.size/2);
    const dy = (icon1.y + icon1.size/2) - (icon2.y + icon2.size/2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Suma de radios
    const minDistance = (icon1.size + icon2.size) / 2;
    
    // Si hay colisión
    if (distance < minDistance) {
      // Calcular vector unitario de repulsión
      const unitX = dx / distance;
      const unitY = dy / distance;
      
      // Fuerza de repulsión proporcional a la superposición
      const overlap = minDistance - distance;
      const repelX = unitX * overlap * 0.5;
      const repelY = unitY * overlap * 0.5;
      
      // Aplicar repulsión a ambos iconos
      updatedIcons[icon1Index].x += repelX;
      updatedIcons[icon1Index].y += repelY;
      updatedIcons[icon2Index].x -= repelX;
      updatedIcons[icon2Index].y -= repelY;
      
      // También invertir ligeramente la dirección para ayudar a separarse
      updatedIcons[icon1Index].dirX += unitX * 0.1;
      updatedIcons[icon1Index].dirY += unitY * 0.1;
      updatedIcons[icon2Index].dirX -= unitX * 0.1;
      updatedIcons[icon2Index].dirY -= unitY * 0.1;
      
      // Marcar el icono para rotación visual como feedback de colisión
      updatedIcons[icon1Index].rotating = true;
      updatedIcons[icon2Index].rotating = true;
      
      // Después de un tiempo, quitar la marca de rotación
      setTimeout(() => {
        setIcons(currentIcons => 
          currentIcons.map(icon => 
            icon.name === updatedIcons[icon1Index].name || icon.name === updatedIcons[icon2Index].name
              ? { ...icon, rotating: false }
              : icon
          )
        );
      }, 300);
    }
  };

  // Animar los iconos flotantes con optimizaciones de rendimiento
  useEffect(() => {
    if (icons.length === 0 || !containerRef.current || !isVisible) return;

    let frameCount = 0;
    const { COLLISION_CHECK_INTERVAL, TARGET_FPS, MAX_CONCURRENT_ICONS, MOVEMENT_RADIUS, MOVEMENT_SPEED_MULTIPLIER } = PERFORMANCE_CONFIG.ANIMATION;
    const FRAME_TIME = 1000 / TARGET_FPS;

    const animateIcons = (timestamp: number) => {
      // Pausar animación si no es visible
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(animateIcons);
        return;
      }

      // Throttling más efectivo
      if (timestamp - lastUpdateTimeRef.current < FRAME_TIME) {
        animationRef.current = requestAnimationFrame(animateIcons);
        return;
      }
      
      lastUpdateTimeRef.current = timestamp;
      frameCount++;

      setIcons(prevIcons => {
        // Optimización: limitar el número de iconos animados simultáneamente
        if (prevIcons.length > MAX_CONCURRENT_ICONS) {
          // Para muchos iconos, hacer animación más sutil
          return prevIcons.map(icon => ({
            ...icon,
            x: icon.x + Math.sin(timestamp * 0.001 + icon.name.length) * 0.5,
            y: icon.y + Math.cos(timestamp * 0.001 + icon.name.length) * 0.5
          }));
        }

        // Animación completa solo para <= MAX_CONCURRENT_ICONS iconos
        const updatedIcons = prevIcons.map(icon => {
          let { x, y, dirX, dirY, speed, size, initialX, initialY } = icon;
          
          // Movimiento más simple y eficiente
          let nextX = x + dirX * speed * MOVEMENT_SPEED_MULTIPLIER;
          let nextY = y + dirY * speed * MOVEMENT_SPEED_MULTIPLIER;
          
          // Límites de movimiento simplificados
          if (nextX < initialX - MOVEMENT_RADIUS || nextX > initialX + MOVEMENT_RADIUS) {
            dirX *= -1;
            nextX = Math.max(initialX - MOVEMENT_RADIUS, Math.min(nextX, initialX + MOVEMENT_RADIUS));
          }
          
          if (nextY < initialY - MOVEMENT_RADIUS || nextY > initialY + MOVEMENT_RADIUS) {
            dirY *= -1;
            nextY = Math.max(initialY - MOVEMENT_RADIUS, Math.min(nextY, initialY + MOVEMENT_RADIUS));
          }

          // Límites del contenedor
          nextX = Math.max(0, Math.min(nextX, containerSize.width - size));
          nextY = Math.max(0, Math.min(nextY, containerSize.height - size));
          
          return { ...icon, x: nextX, y: nextY, dirX, dirY };
        });
        
        // Colisiones solo cada N frames para mejor rendimiento
        if (frameCount % COLLISION_CHECK_INTERVAL === 0 && updatedIcons.length <= 30) {
          // Optimización espacial: solo verificar iconos cercanos
          for (let i = 0; i < updatedIcons.length; i++) {
            for (let j = i + 1; j < updatedIcons.length; j++) {
              const icon1 = updatedIcons[i];
              const icon2 = updatedIcons[j];
              
              // Pre-filtro de distancia antes del cálculo completo
              const roughDistance = Math.abs(icon1.x - icon2.x) + Math.abs(icon1.y - icon2.y);
              if (roughDistance < icon1.size + icon2.size) {
                handleCollision(i, j, updatedIcons);
              }
            }
          }
        }
        
        return updatedIcons;
      });
      
      animationRef.current = requestAnimationFrame(animateIcons);
    };
    
    animationRef.current = requestAnimationFrame(animateIcons);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [icons.length, containerSize, isVisible]);

  return { icons, setIcons, setSearchTerm };
};
