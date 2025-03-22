import { useState, useEffect } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardContent 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FloatingToolSelector from "./FloatingToolSelector";
import ToolSelector from "./calculator/ToolSelector";
import CostDisplay from "./calculator/CostDisplay";
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
    <section id="calculadora" className="section bg-gradient-to-b from-white to-costwise-gray py-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-costwise-navy mb-3">
            Calculadora de Costos IT
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explora nuestra visualización interactiva para seleccionar herramientas, 
            indica el número de usuarios y descubre 
            <span className="font-semibold text-[20px] text-green-600"> cuánto podrías ahorrar </span>  
            con alternativas open source.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Visualización de herramientas (flotantes o lista) */}
          <div className="lg:col-span-7">
            <Card className="shadow-md overflow-hidden">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Selección de Herramientas</span>
                  <Tabs defaultValue="floating" value={activeView} onValueChange={setActiveView} className="w-auto">
                    <TabsList>
                      <TabsTrigger value="floating">Vista Flotante</TabsTrigger>
                      <TabsTrigger value="list">Lista</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardTitle>
                <CardDescription>
                  Selecciona las herramientas de pago que utilizas actualmente
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs value={activeView} className="w-full">
                  <TabsContent value="floating" className="m-0">
                    <FloatingToolSelector 
                      selectedTools={selectedTools}
                      onToolToggle={handleToolToggle}
                    />
                  </TabsContent>
                  <TabsContent value="list" className="m-0">
                    <div className="p-6">
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
            
            {/* Control de usuarios */}
            <Card className="shadow-md mt-6">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center gap-4">
                  <span className="text-lg font-medium">Número de usuarios:</span>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={userCount}
                    onChange={(e) => setUserCount(parseInt(e.target.value))}
                    className="flex-grow h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xl font-semibold min-w-[50px] text-center">{userCount}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Cálculo de costos y alternativas */}
          <div className="lg:col-span-5">
            <CostDisplay 
              monthlyCost={totalMonthlyCost}
              yearlyCost={totalYearlyCost}
            />
            
            <OpenSourceAlternatives
              selectedTools={selectedTools}
              userCount={userCount}
              alternatives={openSourceAlternatives}
              showSavings={showSavings}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostCalculator;
