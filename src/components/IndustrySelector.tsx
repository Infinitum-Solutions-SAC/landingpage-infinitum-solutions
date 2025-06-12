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
    
    // Estimación basada en prioridad de herramientas (más básica)
    const totalPriority = selectedIndustryData.commonTools.reduce((sum, tool) => sum + tool.priority, 0);
    const avgCostPerPriority = 15; // $15 promedio por punto de prioridad
    const monthly = totalPriority * avgCostPerPriority;
    
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

          <div className="max-w-md mx-auto">
            {activeView === 'industries' ? (
              <div className="space-y-3">
                {industriesData.map((industry) => (
                  <Card 
                    key={industry.id} 
                    className="cursor-pointer hover:shadow-md transition-all border-l-4 border-l-blue-500"
                    onClick={() => handleIndustrySelect(industry.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
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
                        <ChevronRight className="h-5 w-5 text-gray-400" />
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
                      <span className="font-bold text-base text-costwise-navy dark:text-costwise-teal">{selectedIndustryData.name}</span>
                    </div>
                  </div>

                  {/* Resumen visual ahorro */}
                  <div className="flex items-center space-x-3 bg-costwise-teal/10 dark:bg-costwise-blue/10 rounded-lg px-3 py-2 border border-costwise-teal/30 dark:border-costwise-blue/30">
                    <Zap className="h-5 w-5 text-costwise-teal dark:text-costwise-blue" />
                    <div className="text-costwise-teal dark:text-costwise-blue text-sm font-semibold">Ahorro estimado:</div>
                    <div className="text-costwise-navy dark:text-costwise-teal font-bold text-base">${estimatedSavings.monthly}/mes</div>
                    <div className="text-xs text-costwise-teal dark:text-costwise-blue">(${estimatedSavings.yearly}/año)</div>
                  </div>

                  {/* Explicación breve */}
                  <div className="text-xs text-costwise-navy dark:text-costwise-teal mb-1">
                    Estas son las herramientas SaaS más usadas y sus alternativas open source.
                  </div>

                  {/* Lista de herramientas y alternativas compacta */}
                  <div className="space-y-2">
                    {alternatives.map((item, index) => (
                      <Card key={index} className="border-l-4 border-l-costwise-blue dark:border-l-costwise-teal bg-white/90 dark:bg-slate-900/80">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <span className="font-semibold text-costwise-navy dark:text-costwise-teal text-sm">{item.saas.name}</span>
                              <Badge variant="secondary" className="ml-2 text-xs bg-costwise-blue/10 dark:bg-costwise-teal/20 text-costwise-blue dark:text-costwise-teal border-none">{item.saas.category}</Badge>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{item.saas.description}</p>
                          <div className="space-y-2">
                            {item.alternatives.map((alt, altIndex) => (
                              <div key={altIndex} className="bg-costwise-teal/10 dark:bg-costwise-blue/20 rounded-lg px-3 py-2 border border-costwise-teal/20 dark:border-costwise-blue/20">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-semibold text-costwise-teal dark:text-costwise-blue text-sm">{alt.name}</span>
                                  <a href={alt.url} target="_blank" rel="noopener noreferrer" className="text-costwise-teal dark:text-costwise-blue hover:underline">
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                </div>
                                <p className="text-xs text-gray-700 dark:text-gray-300">{alt.description}</p>
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
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedIndustry === industry.id
                        ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-600'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
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
                    <span className="font-bold text-2xl text-costwise-navy dark:text-costwise-teal">{selectedIndustryData.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-costwise-teal/10 dark:bg-costwise-blue/10 rounded-lg px-4 py-2 border border-costwise-teal/30 dark:border-costwise-blue/30">
                    <Zap className="h-5 w-5 text-costwise-teal dark:text-costwise-blue" />
                    <span className="text-costwise-teal dark:text-costwise-blue font-semibold">Ahorro estimado:</span>
                    <span className="text-costwise-navy dark:text-costwise-teal font-bold">${estimatedSavings.monthly}/mes</span>
                    <span className="text-xs text-costwise-teal dark:text-costwise-blue">(${estimatedSavings.yearly}/año)</span>
                  </div>
                </div>

                {/* Explicación breve */}
                <div className="bg-costwise-blue/10 dark:bg-costwise-teal/10 rounded p-3 text-sm text-costwise-navy dark:text-costwise-teal mb-2">
                  Consulta el ahorro estimado y las herramientas SaaS más usadas en este sector, junto con sus alternativas open source.
                </div>

                {/* Pestañas para herramientas y alternativas */}
                <div className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {alternatives.map((item, index) => (
                      <Card key={index} className="border-l-4 border-l-costwise-teal dark:border-l-costwise-blue bg-white/90 dark:bg-slate-900/80">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-costwise-navy dark:text-costwise-teal text-sm">{item.saas.name}</span>
                            <Badge variant="outline" className="text-xs bg-costwise-teal/10 dark:bg-costwise-blue/20 text-costwise-teal dark:text-costwise-blue border-none">{item.saas.category}</Badge>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 line-clamp-2">{item.saas.description}</p>
                          <div className="flex flex-col gap-1">
                            {item.alternatives.map((alt, altIndex) => (
                              <div key={altIndex} className="flex items-center justify-between bg-costwise-teal/10 dark:bg-costwise-blue/20 rounded px-2 py-1 border border-costwise-teal/10 dark:border-costwise-blue/10">
                                <span className="font-medium text-costwise-teal dark:text-costwise-blue text-xs truncate">{alt.name}</span>
                                <a href={alt.url} target="_blank" rel="noopener noreferrer" className="text-costwise-teal dark:text-costwise-blue ml-2">
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
