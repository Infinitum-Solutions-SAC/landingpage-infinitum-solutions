import { useState, useEffect } from 'react'; // Eliminado useRef si no se usa
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  // CardTitle, // Eliminado si no se usa directamente
  CardDescription
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info, HelpCircle } from "lucide-react"; 
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator"; // Eliminado si no se usa
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toolsData } from '@/data/toolsData';
import { getToolIcon, calculateMonthlyCost } from "@/utils/calculatorUtils";

type ToolSelectorProps = {
  selectedTools: string[];
  setSelectedTools: (tools: string[]) => void;
  userCount: number;
  setUserCount: (count: number) => void;
  searchQuery: string;
};

const ToolSelector = ({
  selectedTools,
  setSelectedTools,
  userCount,
  // setUserCount, // No se usa en este componente directamente para modificar, solo para cálculo
  searchQuery
}: ToolSelectorProps) => {
  const [currentCategory, setCurrentCategory] = useState<string>("all");
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [filteredTools, setFilteredTools] = useState<any[]>([]);
  const [allTools, setAllTools] = useState<any[]>([]);
  // const totalMonthlyCost = calculateMonthlyCost(selectedTools, userCount); // No se usa directamente en el renderizado de ToolSelector
  
  useEffect(() => {
    const allSaaSTools = Object.values(toolsData.tools).flatMap(cat => cat.SaaS);
    setAllTools(allSaaSTools);
  }, []);

  useEffect(() => {
    let toolsToFilter = allTools;

    if (currentCategory !== "all" && toolsData.tools[currentCategory]) {
      toolsToFilter = toolsData.tools[currentCategory].SaaS;
    }

    if (searchQuery) {
      const searchFiltered = toolsToFilter.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTools(searchFiltered);
    } else {
      setFilteredTools(toolsToFilter);
    }
  }, [searchQuery, currentCategory, allTools]);

  const handleToolToggle = (toolName: string) => {
    if (selectedTools.includes(toolName)) {
      setSelectedTools(selectedTools.filter(tool => tool !== toolName));
    } else {
      setSelectedTools([...selectedTools, toolName]);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-md overflow-hidden dark:bg-gray-800/50">
        <CardHeader className="pb-0 pt-4 px-4 ">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
            <Select value={currentCategory} onValueChange={(value) => setCurrentCategory(value)}>
              <SelectTrigger className="w-full sm:w-auto sm:min-w-[200px]">
                <SelectValue placeholder="Filtrar por categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {Object.keys(toolsData.tools).map((categoryName) => (
                  <SelectItem key={categoryName} value={categoryName}>
                    {categoryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex items-center justify-between flex-1 mt-2 sm:mt-0">
              {/* <Label className="text-base font-bold text-costwise-navy dark:text-white">
                {searchQuery 
                  ? `Resultados para "${searchQuery}"`
                  : currentCategory === "all" || !toolsData.tools[currentCategory] 
                    ? "Todas las herramientas" 
                    : `${currentCategory}`}
              </Label> */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs text-gray-500 hover:text-costwise-blue flex items-center"
              >
                {showDetails ? "Ocultar detalles" : "Mostrar detalles"}
                <Info className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>

          <CardDescription className="mt-1 mb-3 text-gray-600 dark:text-gray-400">
            {searchQuery
              ? `Herramientas que coinciden con "${searchQuery}"${currentCategory !== "all" && toolsData.tools[currentCategory] ? ` en ${currentCategory}` : ''}`
              : null
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-4 pt-0">
          <ScrollArea className="h-[calc(100vh-420px)] min-h-[250px] md:h-[350px] pr-4"> {/* Altura ajustada y ejemplo de min-height */}
            <div className="grid grid-cols-1 gap-2">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`${searchQuery}-${currentCategory}`}
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
                            ? 'border-costwise-blue bg-costwise-blue/5 dark:bg-costwise-blue/10' 
                            : 'border-gray-200 hover:border-costwise-blue/30 dark:border-gray-700 dark:hover:border-costwise-blue/30 bg-white dark:bg-gray-800'
                        }`}
                        onClick={() => handleToolToggle(tool.name)}
                      >
                        <div className="w-full">
                          <div className="flex items-center gap-3">
                            <Checkbox 
                              checked={selectedTools.includes(tool.name)}
                              onCheckedChange={() => handleToolToggle(tool.name)} // No necesita argumento explícito aquí
                              className="data-[state=checked]:bg-costwise-blue data-[state=checked]:border-costwise-blue"
                            />
                            {tool.icon && (
                              <div className="w-6 h-6 flex-shrink-0">
                                <img 
                                  src={getToolIcon(tool.name)} 
                                  alt={tool.name} 
                                  className="w-6 h-6 object-contain" 
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    // Opcional: reemplazar con un ícono genérico o placeholder
                                    const parent = target.parentNode as HTMLElement;
                                    if (parent) {
                                      const placeholder = document.createElement('div');
                                      placeholder.className = "w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs";
                                      placeholder.textContent = tool.name.substring(0,1).toUpperCase(); // Inicial
                                      parent.appendChild(placeholder);
                                    }
                                  }}
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-costwise-navy dark:text-white">{tool.name}</span>
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
                                  <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 hidden lg:block">
                                    <span>Total para {userCount} usuario{userCount !== 1 ? 's' : ''}:</span>
                                    <span className="font-semibold text-red-500"> ${(tool.cost * userCount).toFixed(2)}</span>
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
                      <p className="mb-1">
                        {searchQuery 
                          ? `No se encontraron herramientas para "${searchQuery}"`
                          : "No hay herramientas en esta categoría"}
                      </p>
                      <p className="text-sm">
                        {searchQuery 
                          ? "Prueba con otro término de búsqueda o cambia la categoría."
                          : "Selecciona otra categoría o borra la búsqueda."}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </ScrollArea>
        </CardContent>
        
        <CardFooter className="border-t bg-costwise-gray dark:bg-gray-800/50 p-4">
          <div className="w-full flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {selectedTools.length > 0 ? `${selectedTools.length} herramienta${selectedTools.length !== 1 ? 's' : ''} seleccionada${selectedTools.length !== 1 ? 's' : ''}` : "Selecciona herramientas para calcular el costo"}
            </div>
            {selectedTools.length > 0 && (
              <span className="text-sm font-medium flex items-center">
                <span className="mr-2 text-costwise-navy dark:text-white">Ahorro potencial:</span>
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">100%</Badge> {/* Este valor debería ser dinámico */}
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ToolSelector;
