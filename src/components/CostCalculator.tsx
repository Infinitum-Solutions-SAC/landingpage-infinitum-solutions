import { useState, useEffect, useRef } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FloatingToolIcon from "./floating-selector/FloatingToolIcon";
import ToolsGrid from "./floating-selector/ToolsGrid";
import ToolSelector from "./calculator/ToolSelector";
import OpenSourceAlternatives from "./calculator/OpenSourceAlternatives";
import { useFloatingIcons } from '@/hooks/useFloatingIcons';
import { 
  calculateMonthlyCost, 
  calculateYearlyCost, 
  getOpenSourceAlternatives,
  getDefaultSelectedTools 
} from "@/utils/calculatorUtils";
import { useIsMobile } from "@/hooks/use-mobile";

// Importamos los íconos necesarios
import { Grid, List, LayoutGrid, Search } from "lucide-react";

const CostCalculator = () => {
  const isMobile = useIsMobile();
  const [selectedTools, setSelectedTools] = useState<string[]>(getDefaultSelectedTools());
  const [userCount, setUserCount] = useState<number>(2);
  const [showSavings, setShowSavings] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<string>(isMobile ? "list" : "floating");
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showNewModeBanner, setShowNewModeBanner] = useState<boolean>(() => {
    // Check session storage to see if the banner was dismissed
    const bannerDismissed = sessionStorage.getItem("newModeBannerDismissed");
    return !bannerDismissed;
  });
  
  // Referencias para el contenedor flotante
  const containerRef = useRef<HTMLDivElement>(null);
  const { icons, setSearchTerm } = useFloatingIcons(containerRef);
  const [showGrid, setShowGrid] = useState(false);
  
  // Si hay demasiados iconos, mostrar opción para cambiar a vista de cuadrícula
  const shouldShowGridButton = icons.length > 30;
  
  // Calcular costos basados en precios reales de las herramientas
  const totalMonthlyCost = calculateMonthlyCost(selectedTools, userCount);
  const totalYearlyCost = calculateYearlyCost(totalMonthlyCost);
  
  // Effect para mostrar animación de ahorro cuando cambian las herramientas
  useEffect(() => {
    if (selectedTools.length > 0) {
      // Resetear el trigger de animación
      setShowSavings(false);
      
      // Activar animación después de un breve retraso
      const timer = setTimeout(() => {
        setShowSavings(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [selectedTools]);
  
  // Cuando cambia isMobile, ajustar la vista por defecto
  useEffect(() => {
    setActiveView(isMobile ? "list" : activeView);
  }, [isMobile]);
  
  // Actualizar el término de búsqueda cuando cambie
  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery, setSearchTerm]);
  
  // Manejar selección/deselección de herramientas
  const handleToolToggle = (toolName: string) => {
    setSelectedTools(prev => {
      if (prev.includes(toolName)) {
        return prev.filter(tool => tool !== toolName);
      } else {
        return [...prev, toolName];
      }
    });
  };
  
  // Obtener alternativas de código abierto para las herramientas seleccionadas
  const openSourceAlternatives = getOpenSourceAlternatives(selectedTools);

  const handleViewChange = (view: string) => {
    setActiveView(view);
    if (showNewModeBanner) {
      setShowNewModeBanner(false);
      sessionStorage.setItem("newModeBannerDismissed", "true");
    }
  };

  return (
    <section id="calculadora" className="section bg-gradient-to-b from-white to-costwise-gray py-16 dark:from-gray-900 dark:to-gray-950">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-costwise-navy mb-2 dark:text-white">
            Lo que ahorrarías
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto dark:text-gray-400">
            ¿Qué herramientas usa tu empresa? <br /> 
             <span className="font-semibold text-[20px] text-green-600 dark:text-green-400"> cuánto podrías ahorrar </span>  
            con alternativas open source.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          {/* Visualización de herramientas (flotantes o lista) */}
          <div className="lg:col-span-7">
            <Card className="shadow-md overflow-hidden dark:bg-gray-800/50 relative">
              <div className="absolute top-3 right-3 z-10">
                <div className="flex items-center">
                  <Tabs 
                    defaultValue={isMobile ? "list" : "floating"} 
                    value={activeView} 
                    onValueChange={handleViewChange} 
                    className="relative"
                  >
                    <TabsList className="h-8 p-1">
                      <TabsTrigger 
                        value="floating" 
                        className="flex items-center gap-1.5 px-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        <LayoutGrid className="h-4 w-4" />
                        <span className="hidden sm:inline">Flotante</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="list" 
                        className="flex items-center gap-1.5 px-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        <List className="h-4 w-4" />
                        <span className="hidden sm:inline">Lista</span>
                      </TabsTrigger>
                    </TabsList>
                    {isMobile && showNewModeBanner && (
                      <span className="absolute -top-2 -left-8 bg-green-500 text-white text-xs font-bold px-1 py-0.5 rounded-full animate-pulse">
                        Nuevo
                      </span>
                    )}
                  </Tabs>
                </div>
              </div>
              
              <CardHeader className="pb-3 pr-24">
                <div className="flex-col flex">
                  <CardTitle className="text-xl sm:text-2xl font-bold">
                    Busca alternativas
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Selecciona las herramientas que utilizas o pensabas usar
                  </CardDescription>
                </div>
              </CardHeader>
              
              {/* Barra de búsqueda fija para ambas vistas */}
              <div className="p-4 border-b flex items-center gap-2 bg-white dark:bg-gray-800">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar herramientas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2"
                  />
                </div>
              </div>
              
              <CardContent className="p-0">
                <Tabs value={activeView} className="w-full">
                  <TabsContent value="floating" className="m-0">
                    <div className="relative w-full h-[350px] bg-transparent rounded-lg overflow-hidden" ref={containerRef}>
                      {/* Mostrar iconos flotantes */}
                      {icons.length > 0 ? (
                        icons.map((icon) => (
                          <FloatingToolIcon
                            key={icon.name}
                            name={icon.name}
                            icon={icon.icon}
                            cost={icon.cost}
                            x={icon.x}
                            y={icon.y}
                            size={icon.size}
                            isSelected={selectedTools.includes(icon.name)}
                            rotating={icon.rotating}
                            onToggle={handleToolToggle}
                          />
                        ))
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-muted-foreground">No se encontraron herramientas. Prueba otro término de búsqueda.</p>
                        </div>
                      )}
                      
                      {/* Vista de cuadrícula para muchas herramientas */}
                      <ToolsGrid 
                        visible={showGrid} 
                        onClose={() => setShowGrid(false)} 
                        selectedTools={selectedTools}
                        onToolToggle={handleToolToggle}
                      />
                      
                      {/* Botón para mostrar todas las herramientas en cuadrícula */}
                      {shouldShowGridButton && (
                        <button 
                          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
                          onClick={() => setShowGrid(true)}
                        >
                          Ver todos los iconos
                        </button>
                      )}
                      
                      {/* Instrucción para el usuario */}
                      <div className="absolute bottom-2 left-0 right-0 text-center text-sm text-gray-500 bg-white/80 dark:bg-gray-800/80 py-1 backdrop-blur-sm">
                        Haz clic en un icono para seleccionar o deseleccionar la herramienta
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="list" className="m-0">
                    <div className="p-0">
                      <ToolSelector 
                        selectedTools={selectedTools}
                        setSelectedTools={setSelectedTools}
                        userCount={userCount}
                        setUserCount={setUserCount}
                        searchQuery={searchQuery}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Alternativas de código abierto */}
          <div className="lg:col-span-5">
            <OpenSourceAlternatives
              selectedTools={selectedTools}
              userCount={userCount}
              setUserCount={setUserCount}
              alternatives={openSourceAlternatives}
              showSavings={showSavings}
              monthlyCost={totalMonthlyCost}
              yearlyCost={totalYearlyCost}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostCalculator;
