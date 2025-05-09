
import React from 'react';
import { getTopToolsPerCategory } from '@/utils/calculatorUtils';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from 'lucide-react';

interface ToolsGridProps {
  visible: boolean;
  onClose: () => void;
  selectedTools: string[];
  onToolToggle: (toolName: string) => void;
}

const ToolsGrid = ({ visible, onClose, selectedTools, onToolToggle }: ToolsGridProps) => {
  if (!visible) return null;
  
  // Obtener todas las herramientas para mostrar en la cuadrícula
  const allTools = getTopToolsPerCategory(4);
  
  return (
    <div className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 z-50 flex flex-col items-center justify-center">
      <h3 className="text-lg font-medium mb-4 dark:text-white">Todas las herramientas</h3>
      
      <ScrollArea className="w-full max-h-[80%] px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-4">
          {allTools.map((tool) => (
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
