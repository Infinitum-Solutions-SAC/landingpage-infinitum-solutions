
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
import { Info, HelpCircle, Search } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toolsData } from '@/data/toolsData';
import { getToolIcon } from '@/utils/calculatorUtils';

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
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // Auto-scroll effect for categories
  useEffect(() => {
    if (!categoryScrollRef.current || !autoScroll) return;
    
    const scrollContainer = categoryScrollRef.current;
    const categories = Object.keys(toolsData.tools);
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % categories.length;
      const category = categories[currentIndex];
      
      // Smooth scroll to category
      const elements = scrollContainer.querySelectorAll('[data-category]');
      const targetElement = Array.from(elements).find(
        el => el.getAttribute('data-category') === category
      );
      
      if (targetElement) {
        const scrollLeft = targetElement.getBoundingClientRect().left + 
          scrollContainer.scrollLeft - scrollContainer.getBoundingClientRect().left - 40;
        
        scrollContainer.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [autoScroll]);

  // Stop auto-scrolling when user interacts
  const handleCategoryScroll = () => {
    setAutoScroll(false);
    // Resume after inactivity
    const timeout = setTimeout(() => {
      setAutoScroll(true);
    }, 10000);
    
    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    if (!searchQuery) {
      // If no search, show all tools in current category
      setFilteredTools(toolsData.tools[currentCategory].SaaS);
    } else {
      // Filter tools in all categories
      const allTools = Object.values(toolsData.tools).flatMap(cat => cat.SaaS);
      const filtered = allTools.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTools(filtered);
    }
  }, [searchQuery, currentCategory]);

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
              
              {/* Improved category carousel with shadows */}
              <div className="relative mt-2">
                <div 
                  className="overflow-x-auto scrollbar-none relative pb-2"
                  ref={categoryScrollRef}
                  onScroll={handleCategoryScroll}
                >
                  {/* Left shadow */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-white to-transparent dark:from-gray-800 pointer-events-none"></div>
                  
                  <ToggleGroup 
                    type="single" 
                    className="flex flex-nowrap overflow-x-auto pb-2 no-scroll min-w-max gap-1 pl-2 pr-8"
                    value={currentCategory} 
                    onValueChange={(value) => value && setCurrentCategory(value)}
                  >
                    {Object.keys(toolsData.tools).map((category) => (
                      <ToggleGroupItem 
                        key={category} 
                        value={category} 
                        className="whitespace-nowrap"
                        data-category={category}
                      >
                        {category}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                  
                  {/* Right shadow */}
                  <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-white to-transparent dark:from-gray-800 pointer-events-none"></div>
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
                          <div className="flex-shrink-0 w-8 h-8 relative">
                            {getToolIcon(tool.name) ? (
                              <img 
                                src={getToolIcon(tool.name)} 
                                alt={tool.name}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <div className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md">
                                <span className="text-xs font-medium">{tool.name.substring(0, 2)}</span>
                              </div>
                            )}
                            
                            <div className="absolute -top-1 -left-1">
                              <Checkbox 
                                checked={selectedTools.includes(tool.name)}
                                onCheckedChange={() => handleToolToggle(tool.name)}
                                className="bg-white dark:bg-gray-800"
                              />
                            </div>
                          </div>
                          <span className="font-medium ml-3 text-sm sm:text-base">{tool.name}</span>
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
