import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { getAllSaasTools, getTopToolsPerCategory } from '@/utils/calculatorUtils';
import { Check } from 'lucide-react';

interface FloatingToolSelectorProps {
  selectedTools: string[];
  onToolToggle: (toolName: string) => void;
}

interface FloatingIcon {
  name: string;
  icon: string;
  cost?: number;
  x: number;
  y: number;
  dirX: number;
  dirY: number;
  speed: number;
  size: number;
  rotating?: boolean;
}

const FloatingToolSelector = ({ selectedTools, onToolToggle }: FloatingToolSelectorProps) => {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const lastUpdateTimeRef = useRef<number>(0);

  // Inicializar los iconos flotantes con mejor distribución
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
    const tools = getTopToolsPerCategory(2);
    
    // Determinar el número óptimo de iconos basado en el tamaño del contenedor
    // Asegurarnos de mostrar una buena cantidad de iconos, pero no demasiados
    const containerArea = containerRef.current.clientWidth * containerRef.current.clientHeight;
    const maxIcons = Math.min(tools.length, Math.max(20, Math.floor(containerArea / 10000)));
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
      const x = (col * cellWidth) + (cellWidth - size) / 2 + (Math.random() - 0.5) * cellWidth * 0.5;
      const y = (row * cellHeight) + (cellHeight - size) / 2 + (Math.random() - 0.5) * cellHeight * 0.5;
      
      return {
        name: tool.name,
        icon: tool.icon,
        cost: tool.cost,
        x: Math.max(0, Math.min(x, containerRef.current.clientWidth - size)),
        y: Math.max(0, Math.min(y, containerRef.current.clientHeight - size)),
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

  // Animar los iconos flotantes con detección de colisiones
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
          let { x, y, dirX, dirY, speed, size } = icon;
          
          // Actualizar posición
          x += dirX * speed;
          y += dirY * speed;
          
          // Comprobar colisiones con los bordes
          if (x <= 0 || x >= containerSize.width - size) {
            dirX *= -1;
            x = x <= 0 ? 0 : containerSize.width - size;
          }
          
          if (y <= 0 || y >= containerSize.height - size) {
            dirY *= -1;
            y = y <= 0 ? 0 : containerSize.height - size;
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
            const icon1 = updatedIcons[i];
            const icon2 = updatedIcons[j];
            
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
              updatedIcons[i].x += repelX;
              updatedIcons[i].y += repelY;
              updatedIcons[j].x -= repelX;
              updatedIcons[j].y -= repelY;
              
              // También invertir ligeramente la dirección para ayudar a separarse
              updatedIcons[i].dirX += unitX * 0.1;
              updatedIcons[i].dirY += unitY * 0.1;
              updatedIcons[j].dirX -= unitX * 0.1;
              updatedIcons[j].dirY -= unitY * 0.1;
              
              // Marcar el icono para rotación visual como feedback de colisión
              updatedIcons[i].rotating = true;
              updatedIcons[j].rotating = true;
              
              // Después de un tiempo, quitar la marca de rotación
              setTimeout(() => {
                setIcons(currentIcons => 
                  currentIcons.map(icon => 
                    icon.name === updatedIcons[i].name || icon.name === updatedIcons[j].name
                      ? { ...icon, rotating: false }
                      : icon
                  )
                );
              }, 300);
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
  }, [icons.length, containerSize]);

  // Si hay demasiados iconos, mostrar solo una selección y añadir un botón para mostrar todos
  const shouldShowGrid = icons.length > 30; // Umbral para cambiar a vista de cuadrícula
  
  return (
    <div className="relative w-full h-[400px] bg-transparent rounded-lg overflow-hidden" ref={containerRef}>
      {icons.map((icon) => {
        const isSelected = selectedTools.includes(icon.name);
        
        return (
          <motion.div
            key={icon.name}
            className="absolute cursor-pointer flex flex-col items-center z-10"
            style={{
              left: icon.x,
              top: icon.y,
              width: icon.size,
              height: icon.size + 25 // Añadir altura para el texto
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotate: icon.rotating ? [0, 10, -10, 0] : 0 // Efecto de sacudida en colisión
            }}
            transition={{ 
              duration: 0.3,
              rotate: { duration: 0.3, ease: "easeInOut" }
            }}
            onClick={() => onToolToggle(icon.name)}
            whileHover={{ scale: 1.1, zIndex: 20 }}
            whileTap={{ scale: 0.95 }}
          >
            <div 
              className={`relative rounded-full p-2 flex items-center justify-center bg-white/90 shadow-lg 
                ${isSelected ? 'ring-4 ring-blue-500 shadow-blue-200' : 'hover:ring-2 hover:ring-blue-300'}`}
              style={{ width: icon.size, height: icon.size }}
            >
              {icon.icon ? (
                <img 
                  src={icon.icon} 
                  alt={icon.name} 
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full">
                  {icon.name.substring(0, 2)}
                </div>
              )}
              
              {isSelected && (
                <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1 shadow-md">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            
            <div 
              className={`mt-1 px-2 py-0.5 text-xs font-medium rounded-full shadow-sm max-w-full overflow-hidden text-ellipsis whitespace-nowrap
                ${isSelected ? 'bg-blue-500 text-white' : 'bg-white/80 text-gray-800'}`}
              style={{ maxWidth: icon.size * 1.5 }}
            >
              {icon.name}
            </div>
          </motion.div>
        );
      })}
      
      {/* Mostrar el modo cuadrícula si hay muchos iconos */}
      {shouldShowGrid && (
        <button 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          onClick={() => {
            // Implementar vista de cuadrícula aquí
          }}
        >
          Ver todos los iconos
        </button>
      )}
      
      <div className="absolute bottom-2 left-0 right-0 text-center text-sm text-gray-500 bg-white/80 py-1 backdrop-blur-sm">
        Haz clic en un icono para seleccionar o deseleccionar la herramienta
      </div>
    </div>
  );
};

export default FloatingToolSelector;
