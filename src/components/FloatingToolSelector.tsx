import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { getAllSaasTools } from '@/utils/calculatorUtils';
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
}

const FloatingToolSelector = ({ selectedTools, onToolToggle }: FloatingToolSelectorProps) => {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
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

    // Obtener las herramientas SaaS
    const tools = getAllSaasTools();
    
    // Crear iconos flotantes con posiciones y velocidades aleatorias
    const newIcons = tools.map(tool => {
      const size = 60 + Math.random() * 20; // Tamaños variables entre 60-80px
      return {
        name: tool.name,
        icon: tool.icon,
        cost: tool.cost,
        x: Math.random() * (containerRef.current.clientWidth - size),
        y: Math.random() * (containerRef.current.clientHeight - size),
        dirX: (Math.random() - 0.5) * 2,
        dirY: (Math.random() - 0.5) * 2,
        speed: 0.5 + Math.random() * 0.5, // Velocidad lenta
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
        return prevIcons.map(icon => {
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
          
          return { ...icon, x, y, dirX, dirY };
        });
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

  return (
    <div className="relative w-full h-[400px] bg-transparent rounded-lg overflow-hidden" ref={containerRef}>
      {icons.map((icon) => {
        const isSelected = selectedTools.includes(icon.name);
        
        return (
          <motion.div
            key={icon.name}
            className="absolute cursor-pointer flex flex-col items-center"
            style={{
              left: icon.x,
              top: icon.y,
              width: icon.size,
              height: icon.size
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => onToolToggle(icon.name)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`relative rounded-full p-2 flex items-center justify-center bg-white/90 shadow-lg 
              ${isSelected ? 'ring-4 ring-blue-500 shadow-blue-200' : 'hover:ring-2 hover:ring-blue-300'}`}
              style={{ width: icon.size, height: icon.size }}
            >
              {icon.icon ? (
                <img 
                  src={icon.icon} 
                  alt={icon.name} 
                  className="w-full h-full object-contain"
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
            
            <div className={`mt-2 px-2 py-1 text-xs font-medium rounded-full shadow-sm
              ${isSelected ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}>
              {icon.name}
            </div>
          </motion.div>
        );
      })}
      
      <div className="absolute bottom-2 left-0 right-0 text-center text-sm text-gray-500 bg-white/80 py-1 backdrop-blur-sm">
        Haz clic en un icono para seleccionar o deseleccionar la herramienta
      </div>
    </div>
  );
};

export default FloatingToolSelector;
