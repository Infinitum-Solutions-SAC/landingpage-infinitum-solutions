import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  ExternalLink, 
  Building2, 
  Users, 
  Zap, 
  ArrowLeft, 
  ListChecks, 
  Replace, 
  LayoutGrid,
  Rocket,
  ShoppingCart,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Factory,
  Circle
} from "lucide-react";
import { industriesData, getIndustryOpenSourceAlternatives, type Industry } from "@/data/industriesData";
import { useIsMobile } from "@/hooks/use-mobile";

// Mapeo de nombres de iconos a componentes
const iconMap = {
  Rocket,
  ShoppingCart,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Factory,
  Circle
} as const;

// Función para obtener el componente de icono
const getIconComponent = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || Circle;
};

const IndustrySelector = () => {
  const isMobile = useIsMobile();
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'industries' | 'tools'>('industries');

  // Obtener datos de la industria seleccionada
  const selectedIndustryData = useMemo(() => {
    if (!selectedIndustry) return null;
    return industriesData.find(industry => industry.id === selectedIndustry);
  }, [selectedIndustry]);

  // Obtener alternativas open source para la industria seleccionada
  const alternatives = useMemo(() => {
    if (!selectedIndustry) return [];
    return getIndustryOpenSourceAlternatives(selectedIndustry);
  }, [selectedIndustry]);

  // Calcular ahorro estimado
  const estimatedSavings = useMemo(() => {
    if (!selectedIndustryData) return { monthly: 0, yearly: 0 };
    
    // Estimación basada en prioridad de herramientas (para 10 usuarios)
    const totalPriority = selectedIndustryData.commonTools.reduce((sum, tool) => sum + tool.priority, 0);
    const avgCostPerPriority = 15; // $15 promedio por punto de prioridad
    const userCount = 10; // Base de cálculo: 10 empleados
    const monthly = totalPriority * avgCostPerPriority * userCount / 10; // Normalizado para 10 usuarios
    
    return {
      monthly,
      yearly: monthly * 12
    };
  }, [selectedIndustryData]);

  const handleIndustrySelect = (industryId: string) => {
    setSelectedIndustry(industryId);
    setActiveView('tools');
  };

  const handleBackToIndustries = () => {
    setActiveView('industries');
    setSelectedIndustry(null);
  };

  // Vista móvil con wizard simple
  if (isMobile) {
    return (
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Soluciones por Industria
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Descubre qué herramientas usa tu industria y sus alternativas open source
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {activeView === 'industries' ? (
              <div className="grid grid-cols-2 gap-2">
                {industriesData.map((industry) => (
                  <Card 
                    key={industry.id} 
                    className="cursor-pointer hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border-l-4 border-l-costwise-blue dark:border-l-costwise-teal bg-white dark:bg-slate-800 shadow-md"
                    onClick={() => handleIndustrySelect(industry.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex flex-col items-center text-center space-y-2">
                        {React.createElement(getIconComponent(industry.icon), { size: 28, className: "text-costwise-blue dark:text-costwise-teal" })}
                        <div>
                          <h3 className="font-semibold text-costwise-blue dark:text-white text-sm">
                            {industry.name}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                            {industry.description}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-costwise-blue dark:text-costwise-teal opacity-60" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              selectedIndustryData && (
                <div className="space-y-4">
                  {/* Header compacto con icono, nombre y volver */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" onClick={handleBackToIndustries} className="p-1">
                        <ArrowLeft className="h-5 w-5 text-costwise-blue dark:text-costwise-teal" />
                      </Button>
                      {selectedIndustryData.icon && React.createElement(getIconComponent(selectedIndustryData.icon), { size: 22, className: "text-costwise-blue dark:text-costwise-teal" })}
                      <span className="font-bold text-base text-costwise-blue dark:text-costwise-teal">{selectedIndustryData.name}</span>
                    </div>
                  </div>

                  {/* Resumen visual ahorro */}
                  <div className="flex flex-col space-y-1 bg-costwise-teal/10 dark:bg-costwise-blue/10 rounded-lg px-3 py-2 border border-costwise-teal/30 dark:border-costwise-blue/30">
                    <div className="flex items-center space-x-3">
                      <Zap className="h-5 w-5 text-costwise-teal dark:text-costwise-blue" />
                      <div className="text-costwise-teal dark:text-costwise-blue text-sm font-semibold">Ahorro estimado:</div>
                      <Badge className="bg-costwise-blue dark:bg-costwise-teal text-white text-xs font-medium">10 empleados</Badge>
                    </div>
                    <div className="flex justify-between items-center pl-8">
                      <div className="text-costwise-blue dark:text-costwise-teal font-bold text-base">${estimatedSavings.monthly}/mes</div>
                      <div className="text-xs text-costwise-teal dark:text-costwise-blue">(${estimatedSavings.yearly}/año)</div>
                    </div>
                  </div>

                  {/* Explicación breve */}
                  <div className="text-xs text-costwise-blue dark:text-costwise-teal mb-1">
                    Estas son las herramientas SaaS más usadas en empresas de 10 empleados y sus alternativas open source.
                  </div>

                  {/* Lista de herramientas y alternativas compacta */}
                  <div className="grid grid-cols-2 gap-2">
                    {alternatives.map((item, index) => (
                      <Card key={index} className="border-l-4 border-l-costwise-blue dark:border-l-costwise-teal bg-white/95 dark:bg-slate-900/80 shadow-sm">
                        <CardContent className="p-2">
                          <div className="flex flex-col mb-2">
                            <span className="font-semibold text-costwise-blue dark:text-costwise-teal text-xs">{item.saas.name}</span>
                            <Badge variant="secondary" className="self-start mt-1 text-xs bg-costwise-blue/10 dark:bg-costwise-teal/20 text-costwise-blue dark:text-costwise-teal border-none">{item.saas.category}</Badge>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{item.saas.description}</p>
                          <div className="space-y-1">
                            {item.alternatives.map((alt, altIndex) => (
                              <div key={altIndex} className="bg-costwise-blue/10 dark:bg-costwise-blue/20 rounded-lg px-2 py-1 border border-costwise-blue/20 dark:border-costwise-blue/20">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-costwise-blue dark:text-costwise-blue text-xs truncate">{alt.name}</span>
                                  <a href={alt.url} target="_blank" rel="noopener noreferrer" className="text-costwise-blue dark:text-costwise-blue hover:underline ml-1">
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                </div>
                                <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2 mt-1">{alt.description}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    );
  }

  // Vista de escritorio
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-costwise-navy via-costwise-blue to-costwise-teal bg-clip-text text-transparent dark:from-white dark:via-costwise-teal dark:to-costwise-blue mb-4">
            Soluciones por Industria
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Selecciona tu industria y descubre las herramientas más comunes y sus 
            <span className="font-semibold text-green-600 dark:text-green-400"> alternativas open source</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Selector de industrias */}
          <div className="lg:col-span-4">
            <Card className="sticky top-20 lg:top-24">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <LayoutGrid className="h-5 w-5" />
                  <span>Selecciona tu Industria</span>
                </CardTitle>
                <CardDescription>
                  Elige el sector que mejor describe tu empresa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {industriesData.map((industry) => (
                  <button
                    key={industry.id}
                    onClick={() => handleIndustrySelect(industry.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      selectedIndustry === industry.id
                        ? 'bg-costwise-blue/10 dark:bg-costwise-teal/20 border-costwise-blue dark:border-costwise-teal shadow-md'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-sm'
                    } border`}
                  >
                    <div className="flex items-center space-x-3">
                      {React.createElement(getIconComponent(industry.icon), { size: 24 })}
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {industry.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {industry.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-8">
            {selectedIndustryData ? (
              <div className="space-y-6">
                {/* Header de la industria seleccionada y ahorro compacto */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2">
                  <div className="flex items-center space-x-3">
                    {React.createElement(getIconComponent(selectedIndustryData.icon), { size: 32, className: "text-costwise-blue dark:text-costwise-teal" })}
                    <span className="font-bold text-2xl text-costwise-blue dark:text-costwise-teal">{selectedIndustryData.name}</span>
                  </div>
                  <div className="flex flex-col bg-costwise-teal/10 dark:bg-costwise-blue/10 rounded-lg px-4 py-2 border border-costwise-teal/30 dark:border-costwise-blue/30">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-costwise-teal dark:text-costwise-blue" />
                      <span className="text-costwise-teal dark:text-costwise-blue font-semibold">Ahorro estimado:</span>
                      <Badge className="bg-costwise-blue dark:bg-costwise-teal text-white text-xs font-medium">10 empleados</Badge>
                    </div>
                    <div className="flex items-center space-x-2 pl-7 mt-1">
                      <span className="text-costwise-blue dark:text-costwise-teal font-bold">${estimatedSavings.monthly}/mes</span>
                      <span className="text-xs text-costwise-teal dark:text-costwise-blue">(${estimatedSavings.yearly}/año)</span>
                    </div>
                  </div>
                </div>

                {/* Explicación breve */}
                <div className="bg-costwise-blue/10 dark:bg-costwise-teal/10 rounded p-3 text-sm text-costwise-blue dark:text-costwise-teal mb-2">
                  Consulta el ahorro estimado para empresas de 10 empleados y las herramientas SaaS más usadas en este sector, junto con sus alternativas open source.
                </div>

                {/* Pestañas para herramientas y alternativas */}
                <div className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {alternatives.map((item, index) => (
                      <Card key={index} className="border-l-4 border-l-costwise-blue dark:border-l-costwise-blue bg-white/95 dark:bg-slate-900/80 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-costwise-blue dark:text-costwise-teal text-sm">{item.saas.name}</span>
                            <Badge variant="outline" className="text-xs bg-costwise-blue/10 dark:bg-costwise-blue/20 text-costwise-blue dark:text-costwise-blue border-none">{item.saas.category}</Badge>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 line-clamp-2">{item.saas.description}</p>
                          <div className="flex flex-col gap-1">
                            {item.alternatives.map((alt, altIndex) => (
                              <div key={altIndex} className="flex items-center justify-between bg-costwise-blue/10 dark:bg-costwise-blue/20 rounded px-2 py-1 border border-costwise-blue/20 dark:border-costwise-blue/10">
                                <span className="font-medium text-costwise-blue dark:text-costwise-blue text-xs truncate">{alt.name}</span>
                                <a href={alt.url} target="_blank" rel="noopener noreferrer" className="text-costwise-blue dark:text-costwise-blue ml-2 hover:scale-110 transition-transform">
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Selecciona una Industria
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500">
                    Elige tu sector para ver las herramientas más comunes y sus alternativas open source
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustrySelector;

// Helper para obtener el componente de icono basado en el string
// Esta función debería estar en un archivo de utilidades o datos si es más compleja
// o si los iconos son dinámicos y vienen de una fuente de datos.
// Por ahora, la mantendré simple aquí como ejemplo si fuera necesario.
// const getIconComponent = (iconName: string) => {
//   switch (iconName) {
//     case "Building2":
//       return Building2;
//     // Añadir más casos según sea necesario
//     default:
//       return Circle; // Un icono por defecto
//   }
// };
