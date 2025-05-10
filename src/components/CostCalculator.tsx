import { useState, useEffect } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FloatingToolSelector from "./FloatingToolSelector";
import ToolSelector from "./calculator/ToolSelector";
import OpenSourceAlternatives from "./calculator/OpenSourceAlternatives";
import { 
  calculateMonthlyCost, 
  calculateYearlyCost, 
  getOpenSourceAlternatives,
  getDefaultSelectedTools 
} from "@/utils/calculatorUtils";
import { useIsMobile } from "@/hooks/use-mobile";

// Importamos los íconos necesarios para el switch de visualización
import { Grid, List, LayoutGrid, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CostCalculator = () => {
  const isMobile = useIsMobile();
  const [selectedTools, setSelectedTools] = useState<string[]>(getDefaultSelectedTools());
  const [userCount, setUserCount] = useState<number>(1);
  const [showSavings, setShowSavings] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<string>(isMobile ? "list" : "floating");
  const [showNewModeBanner, setShowNewModeBanner] = useState<boolean>(() => {
    // Check session storage to see if the banner was dismissed
    const bannerDismissed = sessionStorage.getItem("newModeBannerDismissed");
    return !bannerDismissed;
  });
  
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
              
              <CardContent className="p-0">
                <Tabs value={activeView} className="w-full">
                  <TabsContent value="floating" className="m-0">
                    <div className="flex flex-col">
                      <FloatingToolSelector 
                        selectedTools={selectedTools}
                        onToolToggle={handleToolToggle}
                      />
                      
                      {/* Control de usuarios integrado en la vista flotante */}
                      <CardFooter className="border-t p-0 w-full">
                        <div className="w-full rounded-lg p-4">
                          <Label htmlFor="userCount" className="text-base font-medium block mb-3">Número de usuarios</Label>
                          <div className="flex items-center gap-3 w-full">
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
                              onChange={(e) => {
                                const count = parseInt(e.target.value);
                                if (!isNaN(count) && count > 0) {
                                  setUserCount(count);
                                }
                              }}
                              className="text-center text-lg font-semibold w-20 p-1"
                            />
                          </div>
                        </div>
                      </CardFooter>
                    </div>
                  </TabsContent>
                  <TabsContent value="list" className="m-0">
                    <div className="p-4">
                      <ToolSelector 
                        selectedTools={selectedTools}
                        setSelectedTools={setSelectedTools}
                        userCount={userCount}
                        setUserCount={setUserCount}
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
