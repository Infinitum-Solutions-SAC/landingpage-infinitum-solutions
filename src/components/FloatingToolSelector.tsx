
import { useState, useRef, useEffect } from 'react';
import FloatingToolIcon from './floating-selector/FloatingToolIcon';
import ToolsGrid from './floating-selector/ToolsGrid';
import { useFloatingIcons } from '@/hooks/useFloatingIcons';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

interface FloatingToolSelectorProps {
  selectedTools: string[];
  onToolToggle: (toolName: string) => void;
}

const FloatingToolSelector = ({ selectedTools, onToolToggle }: FloatingToolSelectorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { icons, setSearchTerm } = useFloatingIcons(containerRef);
  const [showGrid, setShowGrid] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Si hay demasiados iconos, mostrar opción para cambiar a vista de cuadrícula
  const shouldShowGridButton = icons.length > 30;

  // Actualizar el término de búsqueda cuando cambie
  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery, setSearchTerm]);
  
  return (
    <div className="flex flex-col w-full">
      <div className="p-4 border-b flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar herramientas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2"
          />
        </div>
      </div>
      
      <div className="relative w-full h-[350px] bg-transparent rounded-lg overflow-hidden" ref={containerRef}>
        {/* Mostrar iconos flotantes */}
        {icons.length > 0 ? (
          icons.map((icon) => (
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
          ))
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">No se encontraron herramientas. Prueba otro término de búsqueda.</p>
          </div>
        )}
        
        {/* Vista de cuadrícula para muchas herramientas */}
        <ToolsGrid 
          visible={showGrid} 
          onClose={() => setShowGrid(false)} 
          selectedTools={selectedTools}
          onToolToggle={onToolToggle}
        />
        
        {/* Botón para mostrar todas las herramientas en cuadrícula */}
        {shouldShowGridButton && (
          <button 
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={() => setShowGrid(true)}
          >
            Ver todos los iconos
          </button>
        )}
        
        {/* Instrucción para el usuario */}
        <div className="absolute bottom-2 left-0 right-0 text-center text-sm text-gray-500 bg-white/80 dark:bg-gray-800/80 py-1 backdrop-blur-sm">
          Haz clic en un icono para seleccionar o deseleccionar la herramienta
        </div>
      </div>
    </div>
  );
};

export default FloatingToolSelector;
