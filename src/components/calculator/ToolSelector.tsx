import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, HelpCircle, Filter, ChevronLeft, ChevronRight, X, Sliders } from "lucide-react";
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
  searchQuery: string; // Añadir searchQuery como prop
};

const ToolSelector = ({
  selectedTools,
  setSelectedTools,
  userCount,
  setUserCount,
  searchQuery // Recibir searchQuery desde el componente padre
}: ToolSelectorProps) => {
  const [currentCategory, setCurrentCategory] = useState<string>(Object.keys(toolsData.tools)[0]);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [filteredTools, setFilteredTools] = useState<any[]>([]);
  const [allTools, setAllTools] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("tools"); // Tab por defecto es "tools"
  const [isScrollable, setIsScrollable] = useState<boolean>(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const totalMonthlyCost = calculateMonthlyCost(selectedTools, userCount);
  
  // Cargar todas las herramientas al iniciar
  useEffect(() => {
    const allSaaSTools = Object.values(toolsData.tools).flatMap(cat => cat.SaaS);
    setAllTools(allSaaSTools);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      // Con búsqueda, filtrar todas las herramientas
      const filtered = allTools.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTools(filtered);
    } else if (activeTab === "categories") {
      // Si estamos en la pestaña de categorías, mostrar solo las de la categoría seleccionada
      setFilteredTools(toolsData.tools[currentCategory].SaaS);
    } else {
      // En la pestaña de herramientas sin búsqueda, mostrar todas
      setFilteredTools(allTools);
    }
  }, [searchQuery, currentCategory, activeTab, allTools]);

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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-6">
      {/* Vista principal con pestañas para categorías y herramientas */}
      <Card className="shadow-md overflow-hidden dark:bg-gray-800/50">
        <CardHeader className="pb-0 pt-4 px-4 bg-costwise-gray dark:bg-gray-800/70">
          <Tabs value={activeTab} onValueChange={handleTabChange} defaultValue="tools" className="w-full mb-3 sm:mb-0">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="categories" className="rounded-md data-[state=active]:bg-costwise-blue data-[state=active]:text-white">
                <Filter className="h-4 w-4 mr-2" />
                Categorías
              </TabsTrigger>
              <TabsTrigger value="tools" className="rounded-md data-[state=active]:bg-costwise-blue data-[state=active]:text-white">
                <Sliders className="h-4 w-4 mr-2" />
                Herramientas
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="categories" className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-base font-bold text-costwise-navy dark:text-white">Selecciona una categoría</Label>
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
              <CardDescription className="mt-1 mb-3 text-gray-600 dark:text-gray-400 hidden sm:block">
                Explora herramientas por categoría
              </CardDescription>
            </TabsContent>
            
            <TabsContent value="tools" className="pt-2 hidden sm:block">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-base font-bold text-costwise-navy dark:text-white">
                  Todas las herramientas
                </Label>
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
              <CardDescription className="mt-1 mb-3 text-gray-600 dark:text-gray-400">
                {searchQuery 
                  ? "Herramientas que coinciden con tu búsqueda"
                  : "Selecciona las herramientas que utilizas"
                }
              </CardDescription>
            </TabsContent>
          </Tabs>
        </CardHeader>
        
        <CardContent className="p-4 pt-0">
          {activeTab === "categories" && !searchQuery && (
            <ScrollArea className="h-[200px] md:h-[200px] mb-4">
              <div className="flex flex-col gap-2 pr-2">
                {Object.keys(toolsData.tools).map((category) => (
                  <Button
                    key={category}
                    variant={currentCategory === category ? "default" : "outline"}
                    className={`justify-start h-auto py-3 px-4 text-left ${
                      currentCategory === category 
                        ? 'bg-costwise-blue text-white border-costwise-blue shadow-sm' 
                        : 'hover:border-costwise-blue/40 hover:text-costwise-navy border-costwise-blue/20'
                    }`}
                    onClick={() => setCurrentCategory(category)}
                  >
                    <div className="flex flex-col items-start w-full">
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium">{category}</span>
                        <Badge variant="outline" className={`ml-2 ${
                          currentCategory === category 
                            ? 'bg-white text-costwise-blue border-white' 
                            : 'bg-costwise-gray text-gray-700 border-costwise-blue/20'
                        } text-xs`}>
                          {toolsData.tools[category].SaaS.length}
                        </Badge>
                      </div>
                      {showDetails && (
                        <span className={`text-xs mt-1 text-left ${
                          currentCategory === category ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          {getToolCategoryDescription(category)}
                        </span>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          )}
          
          <ScrollArea className="h-[300px] md:h-[350px] pr-4">
            <div className="grid grid-cols-1 gap-2">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`${searchQuery}-${currentCategory}-${activeTab}`}
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
                              onCheckedChange={() => handleToolToggle(tool.name)}
                              className="data-[state=checked]:bg-costwise-blue data-[state=checked]:border-costwise-blue"
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
        
        <CardFooter className="border-t bg-costwise-gray dark:bg-gray-800/50 p-4">
          <div className="w-full flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {selectedTools.length > 0 ? `${selectedTools.length} herramientas seleccionadas` : "Selecciona herramientas para calcular el costo"}
            </div>
            {selectedTools.length > 0 && (
              <span className="text-sm font-medium flex items-center">
                <span className="mr-2 text-costwise-navy dark:text-white">Ahorro potencial:</span>
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">100%</Badge>
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

// Función auxiliar para obtener descripciones de categorías
const getToolCategoryDescription = (category: string): string => {
  const descriptions: Record<string, string> = {
    "Comunicación": "Herramientas para chat, videoconferencias y correo electrónico",
    "Gestión de Proyectos": "Planificación, seguimiento y colaboración en proyectos",
    "Diseño y UX": "Diseño gráfico, prototipos e interfaces de usuario",
    "Marketing": "Automatización, email marketing y analítica",
    "Ventas y CRM": "Gestión de clientes y oportunidades",
    "Productividad": "Notas, calendarios y organización personal",
    "Desarrollo": "Herramientas para programadores y desarrolladores",
    "Recursos Humanos": "Reclutamiento, nóminas y gestión de personal",
    "Finanzas": "Contabilidad, facturación y gestión financiera",
    "Almacenamiento": "Almacenamiento en la nube y gestión de archivos",
    "Monitorización": "Monitorización de sistemas y alertas",
    "Soporte": "Atención al cliente y tickets de soporte",
  };
  
  return descriptions[category] || "Herramientas y servicios SaaS";
};

export default ToolSelector;
