
import { useState, useEffect } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import FloatingIcons from "./FloatingIcons";
import ToolSelector from "./calculator/ToolSelector";
import CostDisplay from "./calculator/CostDisplay";
import OpenSourceAlternatives from "./calculator/OpenSourceAlternatives";
import { 
  calculateMonthlyCost, 
  calculateYearlyCost, 
  getAllSaasTools, 
  getOpenSourceAlternatives 
} from "@/utils/calculatorUtils";

const CostCalculator = () => {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [userCount, setUserCount] = useState<number>(1);
  const [showSavings, setShowSavings] = useState<boolean>(false);
  
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
            Selecciona las herramientas de pago que utilizas actualmente, 
            indica el número de usuarios y descubre cuánto podrías ahorrar 
            con alternativas open source.
          </p>
        </div>
        
        {/* Floating Icons Animation */}
        <FloatingIcons tools={getAllSaasTools().slice(0, 12)} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Formulario de selección de herramientas */}
          <div className="lg:col-span-7">
            <ToolSelector 
              selectedTools={selectedTools}
              setSelectedTools={setSelectedTools}
              userCount={userCount}
              setUserCount={setUserCount}
            />
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
