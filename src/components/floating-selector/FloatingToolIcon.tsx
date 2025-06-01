
import React, { memo } from 'react';
import { Check } from 'lucide-react';

interface FloatingToolIconProps {
  name: string;
  icon: string;
  cost?: number;
  x: number;
  y: number;
  size: number;
  isSelected: boolean;
  rotating?: boolean;
  onToggle: (toolName: string) => void;
}

// Memo para evitar re-renders innecesarios
const FloatingToolIcon = memo(({
  name,
  icon,
  cost,
  x,
  y,
  size,
  isSelected,
  rotating,
  onToggle
}: FloatingToolIconProps) => {
  return (
    <div
      className="absolute cursor-pointer flex flex-col items-center z-10 transition-transform duration-200 hover:scale-110"
      style={{
        left: x,
        top: y,
        width: size,
        height: size + 30,
        transform: rotating ? 'rotate(5deg)' : 'none'
      }}
      onClick={() => onToggle(name)}
    >
      <div 
        className={`relative rounded-full p-1 flex items-center justify-center bg-white/90 shadow-lg 
          ${isSelected ? 'ring-4 ring-blue-500 shadow-blue-200' : 'hover:ring-2 hover:ring-blue-300'}`}
        style={{ width: size, height: size }}
      >
        {icon ? (
          <img 
            src={icon} 
            alt={name} 
            className="w-[85%] h-[85%] object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full">
            {name.substring(0, 2)}
          </div>
        )}
        
        {isSelected && (
          <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1 shadow-md">
            <Check className="h-3 w-3 text-white" />
          </div>
        )}
        
        {cost && (
          <div className="absolute -bottom-2 -right-2 bg-red-500 rounded-full px-1 h-[18px] shadow-md flex items-center justify-center">
            <span className="text-[10px] text-white font-bold">${cost}</span>
          </div>
        )}
      </div>
      
      <div 
        className={`mt-1 px-2 py-0.5 text-xs font-medium rounded-full shadow-sm max-w-full overflow-hidden text-ellipsis whitespace-nowrap
          ${isSelected ? 'bg-blue-500 text-white' : 'bg-white/80 text-gray-800'}`}
        style={{ maxWidth: size * 1.5 }}
      >
        {name}
      </div>
    </div>
  );
});

// Añadir displayName para debugging
FloatingToolIcon.displayName = 'FloatingToolIcon';

export default FloatingToolIcon;
