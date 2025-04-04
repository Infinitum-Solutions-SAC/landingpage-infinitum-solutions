
import React from 'react';

interface ToolsGridProps {
  visible: boolean;
  onClose: () => void;
}

const ToolsGrid = ({ visible, onClose }: ToolsGridProps) => {
  if (!visible) return null;
  
  return (
    <div className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center">
      <h3 className="text-lg font-medium mb-4">Todas las herramientas</h3>
      <div className="grid grid-cols-3 gap-3 p-4 overflow-y-auto max-h-[80%]">
        {/* Aquí iría la cuadrícula de herramientas */}
        <p className="text-gray-500 col-span-3 text-center">
          Implementación futura para mostrar todas las herramientas
        </p>
      </div>
      <button 
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-colors"
        onClick={onClose}
      >
        Volver a la vista flotante
      </button>
    </div>
  );
};

export default ToolsGrid;
