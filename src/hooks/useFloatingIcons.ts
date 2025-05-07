import { useState, useEffect, useRef } from 'react';
import { getTopToolsPerCategory } from '@/utils/calculatorUtils';

export interface FloatingIcon {
  name: string;
  icon: string;
  cost?: number;
  x: number;
  y: number;
  initialX: number; // Nueva propiedad
  initialY: number; // Nueva propiedad
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

export const useFloatingIcons = (containerRef: React.RefObject<HTMLDivElement>) => {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);
  const [containerSize, setContainerSize] = useState<ContainerSize>({ width: 0, height: 0 });
  const animationRef = useRef<number>();
  const lastUpdateTimeRef = useRef<number>(0);

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

    // Obtener las herramientas SaaS, asegurando al menos 2 por categoría
    const tools = getTopToolsPerCategory(1);
    
    // Determinar el número óptimo de iconos basado en el tamaño del contenedor
    const containerArea = containerRef.current.clientWidth * containerRef.current.clientHeight;
    const maxIcons = Math.min(tools.length, Math.max(20,Math.floor(containerArea / 10000)));
    const selectedTools = tools.slice(0, maxIcons);
    
    // Organizar inicialmente los iconos en una cuadrícula
    const columns = Math.ceil(Math.sqrt(selectedTools.length));
    const cellWidth = containerRef.current.clientWidth / columns;
    const cellHeight = containerRef.current.clientHeight / Math.ceil(selectedTools.length / columns);
    
    // Crear iconos flotantes con posiciones en cuadrícula y añadir aleatoriedad
    const newIcons = selectedTools.map((tool, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);
      
      // Tamaño base más pequeño para dejar más espacio
      const size = 45 + Math.random() * 15; // Tamaños variables entre 45-60px
      
      // Posición inicial basada en cuadrícula con ligera aleatoriedad
      const initialXPos = (col * cellWidth) + (cellWidth - size) / 2 + (Math.random() - 0.5) * cellWidth * 0.5;
      const initialYPos = (row * cellHeight) + (cellHeight - size) / 2 + (Math.random() - 0.5) * cellHeight * 0.5;
      
      const x = Math.max(0, Math.min(initialXPos, containerRef.current.clientWidth - size));
      const y = Math.max(0, Math.min(initialYPos, containerRef.current.clientHeight - size));
      
      return {
        name: tool.name,
        icon: tool.icon,
        cost: tool.cost,
        x: x,
        y: y,
        initialX: x, // Guardar posición inicial
        initialY: y, // Guardar posición inicial
        dirX: (Math.random() - 0.5) * 1.2, // Velocidad horizontal reducida
        dirY: (Math.random() - 0.5) * 1.2, // Velocidad vertical reducida
        speed: 0.3 + Math.random() * 0.3, // Velocidad general más lenta
        size
      };
    });

    setIcons(newIcons);

    const handleResize = () => {
      updateContainerSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

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

  // Animar los iconos flotantes
  useEffect(() => {
    if (icons.length === 0 || !containerRef.current) return;

    const animateIcons = (timestamp: number) => {
      // Limitar la tasa de actualización a 60fps
      if (timestamp - lastUpdateTimeRef.current < 16) {
        animationRef.current = requestAnimationFrame(animateIcons);
        return;
      }
      
      lastUpdateTimeRef.current = timestamp;

      setIcons(prevIcons => {
        // Primera pasada: actualizar posiciones
        const updatedIcons = prevIcons.map(icon => {
          let { x, y, dirX, dirY, speed, size, initialX, initialY } = icon;
          const movementRadius = 10; // Radio de movimiento permitido
          
          // Actualizar posición tentativa
          let nextX = x + dirX * speed;
          let nextY = y + dirY * speed;
          
          // Comprobar límites de movimiento alrededor de la posición inicial
          if (nextX < initialX - movementRadius) {
            nextX = initialX - movementRadius;
            dirX *= -1;
          } else if (nextX > initialX + movementRadius) {
            nextX = initialX + movementRadius;
            dirX *= -1;
          }
          
          if (nextY < initialY - movementRadius) {
            nextY = initialY - movementRadius;
            dirY *= -1;
          } else if (nextY > initialY + movementRadius) {
            nextY = initialY + movementRadius;
            dirY *= -1;
          }

          // Asignar la nueva posición
          x = nextX;
          y = nextY;
          
          // Comprobar colisiones con los bordes del contenedor (además de la restricción de movimiento)
          // Esto es para asegurar que si initialX/Y está cerca del borde, no se salga.
          if (x <= 0) {
            x = 0;
            dirX = Math.abs(dirX); // Asegurar que se aleje del borde
          } else if (x >= containerSize.width - size) {
            x = containerSize.width - size;
            dirX = -Math.abs(dirX); // Asegurar que se aleje del borde
          }
          
          if (y <= 0) {
            y = 0;
            dirY = Math.abs(dirY); // Asegurar que se aleje del borde
          } else if (y >= containerSize.height - size) {
            y = containerSize.height - size;
            dirY = -Math.abs(dirY); // Asegurar que se aleje del borde
          }
          
          // Añadir un pequeño grado de aleatoriedad al movimiento para evitar patrones repetitivos
          dirX += (Math.random() - 0.5) * 0.02;
          dirY += (Math.random() - 0.5) * 0.02;
          
          // Normalizar el vector de dirección para mantener la velocidad constante
          const magnitude = Math.sqrt(dirX * dirX + dirY * dirY);
          if (magnitude > 0) {
            dirX = (dirX / magnitude) * Math.min(magnitude, 1); // Limitar velocidad máxima
            dirY = (dirY / magnitude) * Math.min(magnitude, 1);
          }
          
          return { ...icon, x, y, dirX, dirY };
        });
        
        // Segunda pasada: resolver colisiones entre iconos
        for (let i = 0; i < updatedIcons.length; i++) {
          for (let j = i + 1; j < updatedIcons.length; j++) {
            handleCollision(i, j, updatedIcons);
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
  }, [icons.length, containerSize]);

  return { icons, setIcons };
};
