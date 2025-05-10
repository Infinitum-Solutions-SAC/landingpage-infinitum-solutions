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

// Importamos los íconos que necesitamos
import { Calendar, BarChart3 } from "lucide-react";

import { getToolIcon, getToolCost } from '@/utils/calculatorUtils';
import { useIsMobile } from '@/hooks/use-mobile'; // Corregido: Importar useIsMobile
import { Button } from '@/components/ui/button'; // Importar Button

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
  const isMobile = useIsMobile(); // Corregido: Usar useIsMobile directamente
  const [expandedCategories, setExpandedCategories] = React.useState<Record<string, boolean>>({});

  // Para prevenir el error de n.map, asegurarse de que alternativesArray es un array
  const safeAlternativesArray = Array.isArray(alternativesArray) ? alternativesArray : [];
  
  // Tomar herramientas seleccionadas para mostrarlas
  const selectedToolsForDisplay = selectedTools.map(toolName => ({
    name: toolName,
    icon: getToolIcon(toolName),
    cost: getToolCost(toolName, 1)
  }));

  return (
    <Card className="shadow-md h-full flex flex-col dark:bg-gray-800/50 relative">
      <div className="absolute top-3 right-3 z-10">
        <div className="flex items-center">
          <Tabs 
            defaultValue="mensual" 
            value={activeView} 
            onValueChange={setActiveView} 
            className="relative"
          >
            <TabsList className="h-8 p-1">
              <TabsTrigger 
                value="mensual" 
                className="flex items-center gap-1.5 px-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Mensual</span>
              </TabsTrigger>
              <TabsTrigger 
                value="anual" 
                className="flex items-center gap-1.5 px-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Anual</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <CardHeader className="pb-3 pr-24">
        <div className="flex-col flex">
          <CardTitle className="text-xl sm:text-2xl font-bold">
            Alternativas Open Source
          </CardTitle>
          <CardDescription className="mt-1">
            Descubre alternativas gratuitas de código abierto para tus herramientas actuales
          </CardDescription>
        </div>
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
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 dark:bg-gray-700" title={tool.name}>
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
                    {/* Se elimina el texto, dejando solo el icono */}
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
                {safeAlternativesArray.map(([category, categorySaaSAlternatives]) => {
                  // categorySaaSAlternatives es un array de objetos, donde cada objeto es:
                  // { saas: { name: '...', cost: ... }, alternatives: [ { name: '...', icon: '...' }, ... ] }

                  return (
                    <AccordionItem key={category} value={category}>
                      <AccordionTrigger className="text-base font-semibold hover:no-underline">
                        {category}
                      </AccordionTrigger>
                      <AccordionContent>
                        {(() => { // IIFE para calcular variables y luego renderizar
                           const saasToolsForCategory = categorySaaSAlternatives.map(item => item.saas);
                           const allOSAlternativesForCategory = categorySaaSAlternatives.flatMap(item => item.alternatives || []);
                           const uniqueOSAlternatives = allOSAlternativesForCategory.reduce((acc, current) => {
                             if (current && current.name && !acc.find(alt => alt.name === current.name)) {
                               acc.push(current);
                             }
                             return acc;
                           }, [] as Array<{ name: string; icon?: string; details?: string; url?: string }>);

                          if (saasToolsForCategory.length === 0 && uniqueOSAlternatives.length === 0 && categorySaaSAlternatives.length > 0) {
                            return (
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                No hay información de herramientas o alternativas para esta categoría.
                              </p>
                            );
                          }

                           return (
                             <>
                               {/* Mostrar iconos de las SaaS seleccionadas para esta categoría */} 
                               {saasToolsForCategory.length > 0 && (
                                 <div className="mb-4"> 
                                   {/* Opcional: Título para la sección de SaaS */}
                                   {/* <h5 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Herramientas Propietarias:</h5> */}
                                   <div className="flex flex-wrap gap-2 items-center">
                                     {saasToolsForCategory.map((saas, saasIndex) => {
                                       const saasIconPath = saas?.name ? getToolIcon(saas.name) : undefined;
                                       return (
                                         <div key={`${category}-saas-${saas?.name}-${saasIndex}`} title={saas?.name} className="flex items-center justify-center bg-gray-100 dark:bg-gray-700/60 p-1.5 rounded-lg w-9 h-9 shadow-sm">
                                           {saasIconPath ? (
                                             <img
                                               src={saasIconPath}
                                               alt={saas?.name || 'SaaS tool'}
                                               className="w-6 h-6 object-contain"
                                               onError={(e) => {
                                                 const imgElement = e.currentTarget;
                                                 imgElement.style.display = 'none';
                                                 const parent = imgElement.parentElement;
                                                 if (parent && saas?.name) {
                                                   if (!parent.querySelector('.saas-icon-fallback')) {
                                                     const fallbackSpan = document.createElement('span');
                                                     fallbackSpan.className = 'font-semibold w-6 h-6 flex items-center justify-center text-xs saas-icon-fallback text-gray-600 dark:text-gray-300';
                                                     fallbackSpan.textContent = saas.name.substring(0, 2).toUpperCase();
                                                     fallbackSpan.title = saas.name;
                                                     parent.appendChild(fallbackSpan);
                                                   }
                                                 }
                                               }}
                                             />
                                           ) : (
                                             saas?.name && (
                                               <span className="font-semibold w-6 h-6 flex items-center justify-center text-xs saas-icon-fallback text-gray-600 dark:text-gray-300" title={saas.name}>
                                                 {saas.name.substring(0, 2).toUpperCase()}
                                               </span>
                                             )
                                           )}
                                         </div>
                                       );
                                     })}
                                   </div>
                                 </div>
                               )}

                               {/* Mostrar alternativas Open Source */} 
                               {uniqueOSAlternatives.length > 0 && (
                                 <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-lg mt-2">
                                   <h5 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Alternativas Open Source Sugeridas:</h5>
                                   {isMobile ? (
                                     // Vista de lista para móviles
                                     <div className="space-y-2">
                                       {(expandedCategories[category] ? uniqueOSAlternatives : uniqueOSAlternatives.slice(0, 3)).map((alt) => (
                                         <div key={alt.name} className="border rounded-lg p-3 bg-white dark:bg-gray-800 relative shadow-sm">
                                           <Badge variant="outline" className="absolute top-2 right-2 bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300 text-[10px] px-1.5 py-0.5 font-medium border-green-200 dark:border-green-600">
                                             Gratis
                                           </Badge>
                                           <div className="flex items-center mb-2 pr-10">
                                             {alt.icon ? (
                                               <img
                                                 src={alt.icon}
                                                 alt={alt.name}
                                                 className="w-5 h-5 mr-2 flex-shrink-0 object-contain"
                                                 onError={(e) => {
                                                   e.currentTarget.style.display = 'none';
                                                   const parent = e.currentTarget.parentElement;
                                                   if (parent && alt.name && !parent.querySelector('.fallback-initials-alt')) {
                                                     const fallbackSpan = document.createElement('span');
                                                     fallbackSpan.className = 'font-semibold w-5 h-5 mr-2 flex-shrink-0 flex items-center justify-center text-xs fallback-initials-alt text-gray-600 dark:text-gray-300';
                                                     fallbackSpan.textContent = alt.name.substring(0,2).toUpperCase();
                                                     parent.insertBefore(fallbackSpan, e.currentTarget.nextSibling);
                                                   }
                                                 }}
                                               />
                                             ) : (
                                               <span className="font-semibold w-5 h-5 mr-2 flex-shrink-0 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300">
                                                 {alt.name.substring(0,2).toUpperCase()}
                                               </span>
                                             )}
                                             <h6 className="font-medium text-sm text-gray-800 dark:text-gray-200 truncate" title={alt.name}>{alt.name}</h6>
                                           </div>
                                           <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 flex-grow leading-relaxed">
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
                                       ))}
                                       {uniqueOSAlternatives.length > 3 && (
                                         <Button
                                           variant="link"
                                           className="text-sm p-0 h-auto text-blue-600 dark:text-blue-400"
                                           onClick={() => setExpandedCategories(prev => ({...prev, [category]: !prev[category]}))}
                                         >
                                           {expandedCategories[category] ? 'Ver menos' : `Ver más (${uniqueOSAlternatives.length - 3})`}
                                         </Button>
                                       )}
                                     </div>
                                   ) : (
                                     // Vista de carrusel para escritorio
                                     <Carousel className="w-full">
                                       <CarouselContent className="-ml-2">
                                         {Array.isArray(uniqueOSAlternatives) && uniqueOSAlternatives.map((alt) => (
                                           <CarouselItem key={alt.name} className="basis-full md:basis-1/2 lg:basis-1/3 pl-2 pb-2">
                                             <div className="border rounded-lg p-3 bg-white dark:bg-gray-800 h-full flex flex-col relative shadow-sm hover:shadow-md transition-shadow duration-200">
                                               <Badge variant="outline" className="absolute top-2 right-2 bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300 text-[10px] px-1.5 py-0.5 font-medium border-green-200 dark:border-green-600">
                                                 Gratis
                                               </Badge>
                                               <div className="flex items-center mb-2 pr-10"> {/* Espacio para la badge absoluta */}
                                                 {alt.icon ? (
                                                   <img 
                                                     src={alt.icon} // Corregido: usar alt.icon directamente
                                                     alt={alt.name}
                                                     className="w-5 h-5 mr-2 flex-shrink-0 object-contain" 
                                                     onError={(e) => { 
                                                         e.currentTarget.style.display = 'none'; 
                                                         const parent = e.currentTarget.parentElement;
                                                         if (parent && alt.name && !parent.querySelector('.fallback-initials-alt')) {
                                                             const fallbackSpan = document.createElement('span');
                                                             fallbackSpan.className = 'font-semibold w-5 h-5 mr-2 flex-shrink-0 flex items-center justify-center text-xs fallback-initials-alt text-gray-600 dark:text-gray-300';
                                                             fallbackSpan.textContent = alt.name.substring(0,2).toUpperCase();
                                                             parent.insertBefore(fallbackSpan, e.currentTarget.nextSibling);
                                                         }
                                                     }}
                                                   />
                                                 ) : (
                                                   <span className="font-semibold w-5 h-5 mr-2 flex-shrink-0 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300">
                                                     {alt.name.substring(0,2).toUpperCase()}
                                                   </span>
                                                 )}
                                                 <h6 className="font-medium text-sm text-gray-800 dark:text-gray-200 truncate" title={alt.name}>{alt.name}</h6>
                                               </div>
                                               <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 flex-grow leading-relaxed">
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
                                       <CarouselPrevious className="left-[-8px] top-1/2 -translate-y-1/2 h-7 w-7 hover:bg-slate-100 dark:hover:bg-gray-700/80" />
                                       <CarouselNext className="right-[-8px] top-1/2 -translate-y-1/2 h-7 w-7 hover:bg-slate-100 dark:hover:bg-gray-700/80" />
                                     </Carousel>
                                   )}
                                 </div>
                               )}

                               {/* Mensaje si no hay alternativas OS pero sí SaaS */} 
                               {saasToolsForCategory.length > 0 && uniqueOSAlternatives.length === 0 && (
                                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center py-2 bg-gray-50 dark:bg-gray-800/60 rounded-md">
                                   No se encontraron alternativas open source para las herramientas seleccionadas en esta categoría.
                                 </p>
                               )}
                             </>
                           );
                         })()}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            ) : (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/40 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <p className="mt-3 text-sm font-medium">Comienza por seleccionar herramientas</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Elige las aplicaciones que usas actualmente para ver alternativas y calcular ahorros.</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenSourceAlternatives;