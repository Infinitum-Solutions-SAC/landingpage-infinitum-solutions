
import { useState, useRef } from 'react';
import FloatingToolIcon from './floating-selector/FloatingToolIcon';
import ToolsGrid from './floating-selector/ToolsGrid';
import { useFloatingIcons } from '@/hooks/useFloatingIcons';

interface FloatingToolSelectorProps {
  selectedTools: string[];
  onToolToggle: (toolName: string) => void;
}

const FloatingToolSelector = ({ selectedTools, onToolToggle }: FloatingToolSelectorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { icons } = useFloatingIcons(containerRef);
  const [showGrid, setShowGrid] = useState(false);
  
  // Si hay demasiados iconos, mostrar opción para cambiar a vista de cuadrícula
  const shouldShowGridButton = icons.length > 30;
  
  return (
    <div className="relative w-full h-[400px] bg-transparent rounded-lg overflow-hidden" ref={containerRef}>
      {/* Mostrar iconos flotantes */}
      {icons.map((icon) => (
        <FloatingToolIcon
          key={icon.name}
          name={icon.name}
          icon={icon.icon}
          cost={icon.cost}
          x={icon.x}
          y={icon.y}
          size={icon.size}
          isSelected={selectedTools.includes(icon.name)}
          rotating={icon.rotating}
          onToggle={onToolToggle}
        />
      ))}
      
      {/* Vista de cuadrícula para muchas herramientas */}
      <ToolsGrid 
        visible={showGrid} 
        onClose={() => setShowGrid(false)} 
      />
      
      {/* Botón para mostrar todas las herramientas en cuadrícula */}
      {shouldShowGridButton && (
        <button 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          onClick={() => setShowGrid(true)}
        >
          Ver todos los iconos
        </button>
      )}
      
      {/* Instrucción para el usuario */}
      <div className="absolute bottom-2 left-0 right-0 text-center text-sm text-gray-500 bg-white/80 py-1 backdrop-blur-sm">
        Haz clic en un icono para seleccionar o deseleccionar la herramienta
      </div>
    </div>
  );
};

export default FloatingToolSelector;
