import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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
import OptimizedSearch from "@/components/ui/optimized-search";
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
import { PERFORMANCE_CONFIG } from "@/utils/performanceConfig";

// Importamos los íconos necesarios
import { Grid, List, LayoutGrid, Search } from "lucide-react";

const CostCalculator = React.memo(() => {
  const isMobile = useIsMobile();
  // Wizard: paso actual (solo móvil)
  const [wizardStep, setWizardStep] = useState<number>(1);
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
  const { icons, setSearchTerm } = useFloatingIcons(containerRef, activeView === "floating");
  const [showGrid, setShowGrid] = useState(false);
  
  // Memoizar valores calculados para evitar recálculos innecesarios
  const shouldShowGridButton = useMemo(() => icons.length > 30, [icons.length]);
  
  // Memoizar costos para evitar recálculos en cada render
  const { totalMonthlyCost, totalYearlyCost } = useMemo(() => {
    const monthly = calculateMonthlyCost(selectedTools, userCount);
    return {
      totalMonthlyCost: monthly,
      totalYearlyCost: calculateYearlyCost(monthly)
    };
  }, [selectedTools, userCount]);
  
  // Memoizar alternativas de código abierto
  const openSourceAlternatives = useMemo(() => 
    getOpenSourceAlternatives(selectedTools),
    [selectedTools]
  );
  
  // Effect para mostrar animación de ahorro cuando cambian las herramientas (con debounce)
  useEffect(() => {
    if (selectedTools.length > 0) {
      // Resetear el trigger de animación
      setShowSavings(false);
      
      // Activar animación después de un breve retraso
      const timer = setTimeout(() => {
        setShowSavings(true);
      }, PERFORMANCE_CONFIG.THROTTLING.SEARCH_DEBOUNCE_MS);
      
      return () => clearTimeout(timer);
    }
  }, [selectedTools]);
  
  // Cuando cambia isMobile, ajustar la vista por defecto
  useEffect(() => {
    setActiveView(isMobile ? "list" : activeView);
  }, [isMobile]);
  
  // Actualizar el término de búsqueda cuando cambie (sin debouncing aquí, ya lo maneja OptimizedSearch)
  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery, setSearchTerm]);
  
  // Manejar cambio de búsqueda optimizado
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);
  
  // Funciones para navegación del wizard
  const nextStep = useCallback(() => setWizardStep((s) => Math.min(s + 1, 3)), []);
  const prevStep = useCallback(() => setWizardStep((s) => Math.max(s - 1, 1)), []);
  const goToStep = useCallback((step: number) => setWizardStep(step), []);
  
  // Memoizar funciones callback para evitar re-renders
  const handleToolToggle = useCallback((toolName: string) => {
    setSelectedTools(prev => {
      if (prev.includes(toolName)) {
        return prev.filter(tool => tool !== toolName);
      } else {
        return [...prev, toolName];
      }
    });
  }, []);

  const handleViewChange = useCallback((view: string) => {
    setActiveView(view);
    if (showNewModeBanner) {
      setShowNewModeBanner(false);
      sessionStorage.setItem("newModeBannerDismissed", "true");
    }
  }, [showNewModeBanner]);

  const handleGridToggle = useCallback(() => {
    setShowGrid(prev => !prev);
  }, []);

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
        {/* Wizard para móvil */}
        {isMobile ? (
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            {/* Barra de progreso */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-2">
                <div className={`h-2 bg-green-500 transition-all`} style={{ width: `${wizardStep * 33.33}%` }} />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{wizardStep}/3</span>
            </div>
            {/* Paso 1: Selección de herramientas */}
            {wizardStep === 1 && (
              <>
                <h3 className="text-xl font-bold mb-2">1. Selecciona tus herramientas</h3>
                <OptimizedSearch
                  placeholder="Buscar herramientas..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <div className="mt-4">
                  <ToolSelector 
                    selectedTools={selectedTools}
                    setSelectedTools={setSelectedTools}
                    userCount={userCount}
                    setUserCount={setUserCount}
                    searchQuery={searchQuery}
                  />
                </div>
                <button
                  className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
                  onClick={nextStep}
                  disabled={selectedTools.length === 0}
                >
                  Siguiente
                </button>
              </>
            )}
            {/* Paso 2: Cantidad de usuarios */}
            {wizardStep === 2 && (
              <>
                <h3 className="text-xl font-bold mb-2">2. ¿Cuántos usuarios?</h3>
                <div className="flex items-center justify-center gap-4 my-6">
                  <button
                    className="bg-gray-200 dark:bg-gray-700 rounded-full w-10 h-10 text-2xl"
                    onClick={() => setUserCount((u) => Math.max(1, u - 1))}
                  >-</button>
                  <span className="text-2xl font-bold w-12 text-center">{userCount}</span>
                  <button
                    className="bg-gray-200 dark:bg-gray-700 rounded-full w-10 h-10 text-2xl"
                    onClick={() => setUserCount((u) => u + 1)}
                  >+</button>
                </div>
                <div className="flex justify-between">
                  <button className="text-blue-600 font-semibold" onClick={prevStep}>Atrás</button>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold" onClick={nextStep}>Ver ahorro</button>
                </div>
              </>
            )}
            {/* Paso 3: Resultado */}
            {wizardStep === 3 && (
              <>
                <h3 className="text-xl font-bold mb-2">3. Tu ahorro estimado</h3>
                <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg p-4 text-center mb-4 animate-pulse">
                  <div className="text-3xl font-extrabold">${totalMonthlyCost} / mes</div>
                  <div className="text-lg">o ${totalYearlyCost} / año</div>
                  <div className="text-xs mt-2 text-gray-500">(Comparado con SaaS comerciales)</div>
                </div>
                <OpenSourceAlternatives
                  selectedTools={selectedTools}
                  userCount={userCount}
                  setUserCount={setUserCount}
                  alternatives={openSourceAlternatives}
                  showSavings={showSavings}
                  monthlyCost={totalMonthlyCost}
                  yearlyCost={totalYearlyCost}
                />
                <div className="flex justify-between mt-4">
                  <button className="text-blue-600 font-semibold" onClick={prevStep}>Atrás</button>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold" onClick={() => goToStep(1)}>Editar selección</button>
                </div>
              </>
            )}
          </div>
        ) : (
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
                
                {/* Barra de búsqueda optimizada */}
                <div className="p-4 border-b flex items-center gap-2 bg-white dark:bg-gray-800">
                  <OptimizedSearch
                    placeholder="Buscar herramientas..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
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
                          onClose={handleGridToggle}
                          selectedTools={selectedTools}
                          onToolToggle={handleToolToggle}
                        />
                        
                        {/* Botón para mostrar todas las herramientas en cuadrícula */}
                        {shouldShowGridButton && (
                          <button 
                            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
                            onClick={handleGridToggle}
                          >
                            Ver todos los iconos
                          </button>
                        )}
                        
                        {/* Instrucción para el usuario */}
                        {/* <div className="absolute bottom-2 left-0 right-0 text-center text-sm text-gray-500 bg-white/80 dark:bg-gray-800/80 py-1 backdrop-blur-sm">
                          Haz clic en un icono para seleccionar o deseleccionar la herramienta
                        </div> */}
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
        )}
      </div>
    </section>
  );
});

// Añadir displayName para debugging
CostCalculator.displayName = 'CostCalculator';

export default CostCalculator;
