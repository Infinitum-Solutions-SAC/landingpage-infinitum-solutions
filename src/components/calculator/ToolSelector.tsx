
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Info, HelpCircle, Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toolsData } from '@/data/toolsData';
import { getToolIcon } from "@/utils/calculatorUtils";

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

  return (
    <Card className="shadow-md overflow-hidden dark:bg-gray-800/50">
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-4">
          <Label htmlFor="userCount" className="text-base font-medium">Número de usuarios</Label>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => userCount > 1 && setUserCount(userCount - 1)}
              disabled={userCount <= 1}
            >
              -
            </Button>
            <Input
              id="userCount"
              type="number"
              min="1"
              value={userCount}
              onChange={(e) => handleUserCountChange(e.target.value)}
              className="text-center text-lg font-semibold"
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setUserCount(userCount + 1)}
            >
              +
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar herramientas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2"
            />
          </div>
          
          {!searchQuery && (
            <div>
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Categoría de herramientas</Label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center gap-1 text-sm"
                >
                  {showDetails ? "Ocultar detalles" : "Mostrar detalles"}
                  <Info className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="relative">
                {isScrollable && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 bg-gradient-to-r from-white via-white to-transparent dark:from-gray-800 dark:via-gray-800 dark:to-transparent h-full rounded-none"
                      onClick={() => scrollCategories('left')}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 bg-gradient-to-l from-white via-white to-transparent dark:from-gray-800 dark:via-gray-800 dark:to-transparent h-full rounded-none"
                      onClick={() => scrollCategories('right')}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </>
                )}
                <div
                  ref={categoryRef}
                  className="relative overflow-x-auto pb-2 mt-2 mask-x-edges scrollbar-hide scroll-smooth"
                >
                  <ToggleGroup 
                    type="single" 
                    className="flex flex-nowrap overflow-x-auto pb-2 no-scroll"
                    value={currentCategory} 
                    onValueChange={(value) => value && setCurrentCategory(value)}
                  >
                    {Object.keys(toolsData.tools).map((category) => (
                      <ToggleGroupItem key={category} value={category} className="whitespace-nowrap">
                        {category}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <Label className="text-base font-medium">
            {searchQuery 
              ? `Resultados de búsqueda para "${searchQuery}"`
              : `Selecciona las herramientas de pago (${currentCategory})`
            }
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <AnimatePresence mode="wait">
              <motion.div 
                key={searchQuery || currentCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full"
              >
                {filteredTools.length > 0 ? (
                  filteredTools.map((tool) => (
                    <motion.div 
                      key={tool.name} 
                      className={`flex flex-col p-3 rounded-md border cursor-pointer transition-colors ${
                        selectedTools.includes(tool.name) 
                          ? 'border-primary bg-primary/10 dark:bg-primary/20' 
                          : 'border-gray-200 hover:border-primary/50 dark:border-gray-700 dark:hover:border-primary/50'
                      }`}
                      onClick={() => handleToolToggle(tool.name)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3 justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <Checkbox 
                              checked={selectedTools.includes(tool.name)}
                              onCheckedChange={() => handleToolToggle(tool.name)}
                              className="mr-1"
                            />
                          </div>
                          {tool.icon && (
                            <div className="flex-shrink-0 w-6 h-6 relative">
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
                          <span className="font-medium truncate">{tool.name}</span>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600 flex-shrink-0" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-64">{tool.details}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      
                      <AnimatePresence>
                        {(showDetails || selectedTools.includes(tool.name)) && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 pt-2 border-t text-sm"
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-gray-500 dark:text-gray-400">Precio mensual:</span>
                              <span className="font-semibold text-red-500">${tool.cost}/usuario</span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-gray-500 dark:text-gray-400">Total mensual:</span>
                              <span className="font-semibold text-red-500">${(tool.cost * userCount).toFixed(2)}</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    No se encontraron herramientas. Prueba con otro término de búsqueda.
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-6 bg-gray-50 dark:bg-gray-800">
        <div className="w-full">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Herramientas seleccionadas:</span>
              <span className="font-semibold">{selectedTools.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Número de usuarios:</span>
              <span className="font-semibold">{userCount}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ToolSelector;
