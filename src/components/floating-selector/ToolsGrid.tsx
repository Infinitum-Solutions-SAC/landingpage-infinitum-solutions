
import React, { useState, useEffect } from 'react';
import { getTopToolsPerCategory } from '@/utils/calculatorUtils';
import { getOptimalToolsPerCategory } from '@/utils/performanceConfig';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ToolsGridProps {
  visible: boolean;
  onClose: () => void;
  selectedTools: string[];
  onToolToggle: (toolName: string) => void;
}

const ToolsGrid = ({ visible, onClose, selectedTools, onToolToggle }: ToolsGridProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTools, setFilteredTools] = useState<any[]>([]);
  
  // Obtener todas las herramientas para mostrar en la cuadrícula usando configuración optimizada
  const optimalToolsPerCategory = getOptimalToolsPerCategory();
  const allTools = getTopToolsPerCategory(optimalToolsPerCategory);
  
  useEffect(() => {
    if (!searchQuery) {
      setFilteredTools(allTools);
    } else {
      const filtered = allTools.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTools(filtered);
    }
  }, [searchQuery, allTools]);
  
  if (!visible) return null;
  
  return (
    <div className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 z-50 flex flex-col items-center justify-center p-4">
      <h3 className="text-lg font-medium mb-4 dark:text-white">Todas las herramientas</h3>
      
      <div className="w-full max-w-md relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Buscar herramientas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-10 py-2"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={16} />
          </button>
        )}
      </div>
      
      <ScrollArea className="w-full max-h-[70vh] px-4">
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-4">
            {filteredTools.map((tool) => (
              <div 
                key={tool.name}
                onClick={() => onToolToggle(tool.name)}
                className={`flex flex-col items-center p-3 rounded-lg cursor-pointer border transition-all ${
                  selectedTools.includes(tool.name)
                    ? 'border-primary bg-primary/10 dark:bg-primary/20'
                    : 'border-gray-200 hover:border-primary/50 dark:border-gray-700 dark:hover:border-primary/50'
                }`}
              >
                <div className="relative w-12 h-12 mb-2">
                  {tool.icon ? (
                    <img 
                      src={tool.icon} 
                      alt={tool.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <span className="text-sm font-medium">{tool.name.substring(0, 2)}</span>
                    </div>
                  )}
                  
                  {selectedTools.includes(tool.name) && (
                    <div className="absolute -top-1 -right-1 bg-primary rounded-full p-1">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                
                <span className="text-xs font-medium text-center">{tool.name}</span>
                
                {tool.cost && (
                  <span className="mt-1 text-xs font-semibold text-red-500">${tool.cost}/mes</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No se encontraron herramientas</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Prueba con otro término de búsqueda</p>
          </div>
        )}
      </ScrollArea>
      
      <button 
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
        onClick={onClose}
      >
        Volver a la vista flotante
      </button>
    </div>
  );
};

export default ToolsGrid;
