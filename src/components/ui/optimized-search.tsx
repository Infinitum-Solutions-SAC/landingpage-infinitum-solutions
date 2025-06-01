import React, { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Search, X } from 'lucide-react';
import { PERFORMANCE_CONFIG } from '@/utils/performanceConfig';

interface OptimizedSearchProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const OptimizedSearch = React.memo(({ 
  placeholder = "Buscar...", 
  value, 
  onChange, 
  className = "" 
}: OptimizedSearchProps) => {
  const [internalValue, setInternalValue] = useState(value);

  // Debounce del valor de búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      if (internalValue !== value) {
        onChange(internalValue);
      }
    }, PERFORMANCE_CONFIG.THROTTLING.SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [internalValue, onChange, value]);

  // Sincronizar valor externo con interno
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleClear = useCallback(() => {
    setInternalValue('');
    onChange('');
  }, [onChange]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
  }, []);

  return (
    <div className={`relative flex-1 ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input 
        placeholder={placeholder}
        value={internalValue}
        onChange={handleChange}
        className="pl-9 pr-10 py-2"
      />
      {internalValue && (
        <button 
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          type="button"
          aria-label="Limpiar búsqueda"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
});

OptimizedSearch.displayName = 'OptimizedSearch';

export default OptimizedSearch;
