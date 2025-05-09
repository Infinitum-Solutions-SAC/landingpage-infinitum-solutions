import React from 'react';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import { getToolIcon, getToolCost } from '@/utils/calculatorUtils';

type OpenSourceAlternativesProps = {
  selectedTools: string[];
  userCount: number;
  alternatives: Record<string, any[]>;
  showSavings: boolean;
  monthlyCost: number;
  yearlyCost: number;
};

const OpenSourceAlternatives: React.FC<OpenSourceAlternativesProps> = ({
  selectedTools,
  userCount,
  alternatives,
  showSavings,
  monthlyCost,
  yearlyCost
}) => {
  const [activeView, setActiveView] = React.useState<string>("mensual");
  const hasAlternatives = Object.keys(alternatives).length > 0;
  const alternativesArray = Object.entries(alternatives);
  
  // Para prevenir el error de n.map, asegurarse de que alternativesArray es un array
  const safeAlternativesArray = Array.isArray(alternativesArray) ? alternativesArray : [];
  
  // Tomar herramientas seleccionadas para mostrarlas
  const selectedToolsForDisplay = selectedTools.map(toolName => ({
    name: toolName,
    icon: getToolIcon(toolName),
    cost: getToolCost(toolName, 1)
  }));

  return (
    <Card className="shadow-md h-full flex flex-col dark:bg-gray-800/50">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle>Alternativas Open Source</CardTitle>
          <Tabs defaultValue="mensual" value={activeView} onValueChange={setActiveView}>
            <TabsList>
              <TabsTrigger value="mensual">Mensual</TabsTrigger>
              <TabsTrigger value="anual">Anual</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <CardDescription>
          Descubre alternativas gratuitas de código abierto para tus herramientas actuales
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-6">
          {/* Mostrar herramientas seleccionadas en línea horizontal */}
          {selectedToolsForDisplay.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Herramientas seleccionadas</h4>
              <div className="flex flex-wrap gap-2">
                {selectedToolsForDisplay.map((tool, index) => (
                  <div key={tool.name} className="flex items-center bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                      {tool.icon ? (
                        <img 
                          src={tool.icon} 
                          alt={tool.name} 
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-xs font-medium">{tool.name.substring(0, 2)}</span>
                      )}
                    </div>
                    <span className="text-xs font-medium px-2">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Mostrar el costo total */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <div className="space-y-3">
              <Tabs value={activeView} className="w-full">
                <TabsContent value="mensual" className="m-0">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Costo mensual actual:</span>
                      <motion.span 
                        key={`monthly-${monthlyCost}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-bold text-xl text-red-500"
                      >
                        ${monthlyCost.toFixed(2)}
                      </motion.span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Con open source:</span>
                      <span className="font-bold text-xl text-green-500">$0.00</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="font-medium">Ahorro mensual:</span>
                      <motion.div
                        key={`monthly-savings-${monthlyCost}`}
                        initial={{ scale: 1 }}
                        animate={showSavings ? { 
                          scale: [1, 1.1, 1],
                          transition: { duration: 0.5 }
                        } : {}}
                        className="font-bold text-2xl text-green-500"
                      >
                        ${monthlyCost.toFixed(2)}
                      </motion.div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="anual" className="m-0">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Costo anual actual:</span>
                      <motion.span 
                        key={`yearly-${yearlyCost}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-bold text-xl text-red-500"
                      >
                        ${yearlyCost.toFixed(2)}
                      </motion.span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Con open source:</span>
                      <span className="font-bold text-xl text-green-500">$0.00</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="font-medium">Ahorro anual:</span>
                      <motion.div
                        key={`yearly-savings-${yearlyCost}`}
                        initial={{ scale: 1 }}
                        animate={showSavings ? { 
                          scale: [1, 1.1, 1],
                          transition: { duration: 0.5 }
                        } : {}}
                        className="font-bold text-2xl text-green-500"
                      >
                        ${yearlyCost.toFixed(2)}
                      </motion.div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Lista de alternativas por categoría */}
          <div className="space-y-2">
            {hasAlternatives ? (
              <Accordion type="single" collapsible className="w-full">
                {safeAlternativesArray.map(([category, categoryAlternatives]) => {
                  // Eliminar duplicados basados en las alternativas
                  const uniqueAlternatives = categoryAlternatives.reduce((acc, current) => {
                    const exists = acc.find(item => 
                      JSON.stringify(item.alternatives) === JSON.stringify(current.alternatives)
                    );
                    if (!exists) {
                      acc.push(current);
                    }
                    return acc;
                  }, []);

                  return (
                    <AccordionItem key={category} value={category}>
                      <AccordionTrigger className="text-base font-semibold hover:no-underline">
                        {category}
                      </AccordionTrigger>
                      <AccordionContent>
                        {uniqueAlternatives.map((item, index) => {
                          const saasName = item.saas?.name || 'Herramienta';
                          return (
                            <div key={`${category}-${index}`} className="pt-2 pb-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-sm flex items-center">
                                  {item.saas?.icon && (
                                    <img 
                                      src={getToolIcon(item.saas.name)} 
                                      alt={item.saas.name} 
                                      className="w-5 h-5 mr-2"
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                      }}
                                    />
                                  )}
                                  {saasName}
                                </h4>
                                <div className="flex items-center">
                                  <span className="text-xs text-gray-500 mr-2">Costo mensual:</span>
                                  <span className="line-through decoration-red-500 decoration-2">
                                    ${(item.saas?.cost * userCount).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded">
                                <h5 className="text-sm font-medium mb-2">Alternativas Open Source:</h5>
                                <Carousel className="w-full">
                                  <CarouselContent>
                                    {Array.isArray(item.alternatives) && item.alternatives.map((alt) => (
                                      <CarouselItem key={alt.name} className="basis-full md:basis-1/2 lg:basis-1/3">
                                        <div className="border rounded-lg p-3 bg-white dark:bg-gray-800 h-full flex flex-col">
                                          <div className="flex items-center justify-between mb-2">
                                            <h6 className="font-medium truncate">{alt.name}</h6>
                                            <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-xs">
                                              Gratis
                                            </Badge>
                                          </div>
                                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex-grow">
                                            {alt.details || "Alternativa de código abierto."}
                                          </p>
                                          <div className="flex justify-end">
                                            {alt.url && (
                                              <a 
                                                href={alt.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-xs text-blue-600 hover:underline dark:text-blue-400"
                                              >
                                                Más información
                                              </a>
                                            )}
                                          </div>
                                        </div>
                                      </CarouselItem>
                                    ))}
                                  </CarouselContent>
                                  <CarouselPrevious className="left-1 hover:bg-slate-100 dark:hover:bg-gray-700" />
                                  <CarouselNext className="right-1 hover:bg-slate-100 dark:hover:bg-gray-700" />
                                </Carousel>
                              </div>
                            </div>
                          );
                        })}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                Selecciona herramientas para ver alternativas de código abierto
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenSourceAlternatives;