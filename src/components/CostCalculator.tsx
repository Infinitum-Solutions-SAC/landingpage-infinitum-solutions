
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

const CostCalculator = () => {
  const [selectedTools, setSelectedTools] = useState<string[]>(getDefaultSelectedTools());
  const [userCount, setUserCount] = useState<number>(1);
  const [showSavings, setShowSavings] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<string>("floating");
  
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
            <Card className="shadow-md overflow-hidden dark:bg-gray-800/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex justify-between items-center">
                  <span>Busca alternativas!</span>
                  <Tabs defaultValue="floating" value={activeView} onValueChange={setActiveView} className="w-auto">
                    <TabsList>
                      <TabsTrigger value="floating">Vista Flotante</TabsTrigger>
                      <TabsTrigger value="list">Lista</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardTitle>
                <CardDescription>
                  Selecciona las herramientas que utilizas o pensabas usar
                </CardDescription>
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
                      <CardFooter className="border-t p-4">
                        <div className="flex items-center justify-center gap-4 w-full">
                          <span className="text-sm md:text-base font-medium whitespace-nowrap">Número de usuarios:</span>
                          <input
                            type="range"
                            min="1"
                            max="100"
                            value={userCount}
                            onChange={(e) => setUserCount(parseInt(e.target.value))}
                            className="flex-grow h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                          />
                          <span className="text-base md:text-lg font-semibold min-w-[40px] text-center">{userCount}</span>
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
