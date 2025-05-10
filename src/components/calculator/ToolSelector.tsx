import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Card, 
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Info, HelpCircle, Search, ChevronLeft, ChevronRight, X, Plus, Minus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toolsData } from '@/data/toolsData';
import { getToolIcon, calculateMonthlyCost } from "@/utils/calculatorUtils";

type ToolSelectorProps = {
  selectedTools: string[];
  setSelectedTools: (tools: string[]) => void;
  userCount: number;
  setUserCount: (count: number) => void;
};

const ToolSelector = ({
  selectedTools,
  setSelectedTools,
  userCount,
  setUserCount
}: ToolSelectorProps) => {
  const [currentCategory, setCurrentCategory] = useState<string>(Object.keys(toolsData.tools)[0]);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredTools, setFilteredTools] = useState<any[]>([]);
  const [isScrollable, setIsScrollable] = useState<boolean>(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const totalMonthlyCost = calculateMonthlyCost(selectedTools, userCount);
  const [selectedToolsHeight, setSelectedToolsHeight] = useState<number>(90);
  
  // Ajustar la altura del ScrollArea basado en el número de herramientas seleccionadas
  useEffect(() => {
    // Calcular altura dinámica basada en número de herramientas
    // Aproximadamente 40px por herramienta para 1 fila, considerando que pueden caber múltiples en una fila
    const estimatedRows = Math.ceil(selectedTools.length / 3); // Estimación: 3 herramientas por fila
    const baseHeight = 40; // Altura mínima
    const rowHeight = 40; // Altura aproximada por fila
    
    const calculatedHeight = baseHeight + (estimatedRows * rowHeight);
    // Limitar altura máxima a 100px
    const newHeight = Math.min(Math.max(90, calculatedHeight), 100);
    
    setSelectedToolsHeight(newHeight);
  }, [selectedTools.length]);

  useEffect(() => {
    if (!searchQuery) {
      // Si no hay búsqueda, mostrar todas las herramientas de la categoría actual
      setFilteredTools(toolsData.tools[currentCategory].SaaS);
    } else {
      // Filtrar herramientas en todas las categorías
      const allTools = Object.values(toolsData.tools).flatMap(cat => cat.SaaS);
      const filtered = allTools.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTools(filtered);
    }
  }, [searchQuery, currentCategory]);

  // Verificar si el carrusel de categorías es desplazable
  useEffect(() => {
    const checkScrollable = () => {
      if (categoryRef.current) {
        const { scrollWidth, clientWidth } = categoryRef.current;
        setIsScrollable(scrollWidth > clientWidth);
      }
    };

    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, []);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      categoryRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleToolToggle = (toolName: string) => {
    if (selectedTools.includes(toolName)) {
      setSelectedTools(selectedTools.filter(tool => tool !== toolName));
    } else {
      setSelectedTools([...selectedTools, toolName]);
    }
  };

  const handleUserCountChange = (value: string) => {
    const count = parseInt(value);
    if (!isNaN(count) && count > 0) {
      setUserCount(count);
    }
  };

  const removeSelectedTool = (toolName: string) => {
    setSelectedTools(selectedTools.filter(tool => tool !== toolName));
  };

  return (
    <div className="space-y-6">
      {/* Panel de herramientas seleccionadas */}
      <AnimatePresence>
        {selectedTools.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <Label className="text-base font-medium flex items-center">
                <span className="mr-2">Herramientas seleccionadas</span>
                <Badge variant="secondary">{selectedTools.length}</Badge>
              </Label>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedTools([])}
                className="text-xs text-gray-500 hover:text-red-500"
              >
                Limpiar todo
              </Button>
            </div>
            <ScrollArea className="pr-4 transition-all duration-300 ease-in-out"
              style={{ height: `${selectedToolsHeight}px` }}
            >
              <div className="flex flex-wrap gap-2 p-1">
                {selectedTools.map((toolName) => {
                  const tool = Object.values(toolsData.tools)
                    .flatMap(cat => cat.SaaS)
                    .find(t => t.name === toolName);
                    
                  return (
                    <motion.div 
                      key={toolName}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center bg-white dark:bg-gray-700 rounded-full px-2 py-1 shadow-sm"
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 mr-1">
                        {tool?.icon ? (
                          <img 
                            src={getToolIcon(toolName)} 
                            alt={toolName} 
                            className="w-4 h-4 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <span className="text-xs font-medium">{toolName.substring(0, 2)}</span>
                        )}
                      </div>
                      <span className="text-xs font-medium mr-1">{toolName}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSelectedTool(toolName);
                        }}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <X className="h-3 w-3 text-gray-500" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </ScrollArea>
            {selectedTools.length > 0 && (
              <div className="pt-3 mt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <span className="text-sm font-medium">Costo total mensual:</span>
                <motion.span 
                  key={totalMonthlyCost} 
                  initial={{ scale: 0.8 }} 
                  animate={{ scale: 1 }} 
                  className="font-bold text-red-500"
                >
                  ${totalMonthlyCost.toFixed(2)}
                </motion.span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-2 space-y-4">
          {/* Selector de usuarios mejorado con slider */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <Label htmlFor="userCount" className="text-base font-medium block mb-3">Número de usuarios</Label>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => userCount > 1 && setUserCount(userCount - 1)}
                disabled={userCount <= 1}
                className="rounded-full h-8 w-8 p-0 flex items-center justify-center"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={userCount}
                  onChange={(e) => setUserCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setUserCount(userCount + 1)}
                className="rounded-full h-8 w-8 p-0 flex items-center justify-center"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Input
                id="userCount"
                type="number"
                min="1"
                value={userCount}
                onChange={(e) => handleUserCountChange(e.target.value)}
                className="text-center text-lg font-semibold w-20 p-1"
              />
            </div>
          </div>

          {/* Selector de categorías mejorado */}
          {!searchQuery && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-base font-medium">Categorías</Label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-xs text-gray-500 hover:text-primary flex items-center"
                >
                  {showDetails ? "Ocultar detalles" : "Mostrar detalles"}
                  <Info className="h-3 w-3 ml-1" />
                </Button>
              </div>
                <ScrollArea className={`h-[112px] md:h-[250px]`}>
                <div
                  className="flex flex-col gap-2"
                >
                  {Object.keys(toolsData.tools).map((category) => (
                    <Button
                      key={category}
                      variant={currentCategory === category ? "secondary" : "ghost"}
                      className="justify-start h-auto py-2 text-left"
                      onClick={() => setCurrentCategory(category)}
                    >
                      {category}
                      <Badge variant="outline" className="ml-2 bg-white dark:bg-gray-700 text-xs">
                        {toolsData.tools[category].SaaS.length}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>

        <div className="md:col-span-3">
          <Card className="shadow-sm">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">
                  {searchQuery 
                    ? `Resultados de búsqueda: "${searchQuery}"`
                    : `${currentCategory}`
                  }
                </Label>
                <div className="relative w-48">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-1 h-8 text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      <X className="h-3 w-3 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>

              <Separator />

              <ScrollArea className="h-[300px] pr-4">
                <div className="grid grid-cols-1 gap-2">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={searchQuery || currentCategory}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-2 w-full"
                    >
                      {filteredTools.length > 0 ? (
                        filteredTools.map((tool) => (
                          <motion.div 
                            key={tool.name}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className={`flex p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedTools.includes(tool.name) 
                                ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                                : 'border-gray-200 hover:border-primary/30 dark:border-gray-700 dark:hover:border-primary/30 bg-white dark:bg-gray-800'
                            }`}
                            onClick={() => handleToolToggle(tool.name)}
                          >
                            <div className="w-full">
                              <div className="flex items-center gap-3">
                                <Checkbox 
                                  checked={selectedTools.includes(tool.name)}
                                  onCheckedChange={() => handleToolToggle(tool.name)}
                                  className="data-[state=checked]:bg-primary"
                                />
                                {tool.icon && (
                                  <div className="w-6 h-6 flex-shrink-0">
                                    <img 
                                      src={getToolIcon(tool.name)} 
                                      alt={tool.name} 
                                      className="w-6 h-6 object-contain" 
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                      }}
                                    />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium">{tool.name}</span>
                                    <div className="flex items-center">
                                      <span className="text-sm font-semibold text-red-500 mr-2">${tool.cost}/usuario</span>
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <span>
                                              <HelpCircle className="h-4 w-4 text-gray-400" />
                                            </span>
                                          </TooltipTrigger>
                                          <TooltipContent side="left">
                                            <p className="max-w-xs">{tool.details}</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <AnimatePresence>
                                {(showDetails || selectedTools.includes(tool.name)) && (
                                  <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-2 pl-9 pr-2"
                                  >
                                    <div className="pt-2 border-t border-dashed border-gray-200 dark:border-gray-700 text-sm">
                                      <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
                                        <span>Total para {userCount} usuario{userCount !== 1 ? 's' : ''}:</span>
                                        <span className="font-semibold text-red-500">${(tool.cost * userCount).toFixed(2)}</span>
                                      </div>
                                      {tool.details && (
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                          {tool.details}
                                        </p>
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center py-12 text-gray-500 dark:text-gray-400"
                        >
                          <p className="mb-1">No se encontraron herramientas</p>
                          <p className="text-sm">Prueba con otro término de búsqueda</p>
                        </motion.div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </ScrollArea>
            </CardContent>
            
            <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4">
              <div className="w-full flex justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredTools.length} herramientas disponibles
                </div>
                {selectedTools.length > 0 && (
                  <span className="text-sm font-medium">
                    Seleccionadas: <Badge>{selectedTools.length}</Badge>
                  </span>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ToolSelector;
