import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
                  {/* Header con botón de regreso */}
                  <div className="flex items-center space-x-2 mb-4">
                    <Button variant="ghost" size="sm" onClick={handleBackToIndustries}>
                      <ArrowLeft className="h-5 w-5 mr-1" /> Volver
                    </Button>
                    {selectedIndustryData.icon && 
                      React.createElement(getIconComponent(selectedIndustryData.icon), { size: 24 })
                    }
                    <h3 className="font-bold text-xl">{selectedIndustryData.name}</h3>
                  </div>

                  {/* Ahorro estimado */}
                  <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
                    <CardContent className="p-4 text-center">
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                        Ahorro Estimado
                      </h4>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ${estimatedSavings.monthly}/mes
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-300">
                        ${estimatedSavings.yearly}/año
                      </div>
                    </CardContent>
                  </Card>

                  {/* Lista de herramientas y alternativas */}
                  <div className="space-y-3">
                    {alternatives.map((item, index) => (
                      <Card key={index} className="border-l-4 border-l-orange-500">
                        <CardContent className="p-4">
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {item.saas.name}
                              </h4>
                              <Badge variant="secondary" className="text-xs">
                                {item.saas.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {item.saas.description}
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium text-green-700 dark:text-green-300">
                              Alternativas Open Source:
                            </h5>
                            {item.alternatives.map((alt, altIndex) => (
                              <div key={altIndex} className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="font-medium text-green-800 dark:text-green-200">
                                      {alt.name}
                                    </span>
                                    <p className="text-xs text-green-700 dark:text-green-300">
                                      {alt.description}
                                    </p>
                                  </div>
                                  <a 
                                    href={alt.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-green-600 hover:text-green-800"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                </div>
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
                {/* Header de la industria seleccionada */}
                <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      {React.createElement(getIconComponent(selectedIndustryData.icon), { size: 36 })}
                      <div>
                        <h2 className="text-2xl font-bold">{selectedIndustryData.name}</h2>
                        <p className="text-blue-100">{selectedIndustryData.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="text-center">
                        <Users className="h-6 w-6 mx-auto mb-1" />
                        <div className="text-sm text-blue-100">Herramientas</div>
                        <div className="font-bold">{selectedIndustryData.commonTools.length}</div>
                      </div>
                      <div className="text-center">
                        <Zap className="h-6 w-6 mx-auto mb-1" />
                        <div className="text-sm text-blue-100">Ahorro/mes</div>
                        <div className="font-bold">${estimatedSavings.monthly}</div>
                      </div>
                      <div className="text-center">
                        <Building2 className="h-6 w-6 mx-auto mb-1" />
                        <div className="text-sm text-blue-100">Ahorro/año</div>
                        <div className="font-bold">${estimatedSavings.yearly}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pestañas para herramientas y alternativas */}
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="overview" className="flex-1">
                      <ListChecks className="h-4 w-4 mr-2" />
                      Vista General
                    </TabsTrigger>
                    <TabsTrigger value="alternatives" className="flex-1">
                      <Replace className="h-4 w-4 mr-2" />
                      Alternativas Open Source
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedIndustryData.commonTools.map((tool, index) => (
                        <Card key={index} className="border-l-4 border-l-blue-500">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {tool.name}
                              </h4>
                              <div className="flex space-x-1">
                                {[...Array(tool.priority)].map((_, i) => (
                                  <div key={i} className="w-2 h-2 bg-yellow-400 rounded-full" />
                                ))}
                              </div>
                            </div>
                            <Badge variant="secondary" className="text-xs mb-2">
                              {tool.category}
                            </Badge>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {tool.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="alternatives" className="mt-6">
                    <div className="space-y-6">
                      {alternatives.map((item, index) => (
                        <Card key={index} className="border-l-4 border-l-green-500">
                          <CardContent className="p-6">
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {item.saas.name}
                                </h4>
                                <Badge variant="outline">{item.saas.category}</Badge>
                              </div>
                              <p className="text-gray-600 dark:text-gray-400">
                                {item.saas.description}
                              </p>
                            </div>
                            
                            <div>
                              <h5 className="font-medium text-green-700 dark:text-green-300 mb-3">
                                Alternativas Open Source:
                              </h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {item.alternatives.map((alt, altIndex) => (
                                  <div key={altIndex} className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                      <h6 className="font-medium text-green-800 dark:text-green-200">
                                        {alt.name}
                                      </h6>
                                      <a 
                                        href={alt.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-green-600 hover:text-green-800 transition-colors"
                                      >
                                        <ExternalLink className="h-4 w-4" />
                                      </a>
                                    </div>
                                    <p className="text-sm text-green-700 dark:text-green-300">
                                      {alt.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
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
