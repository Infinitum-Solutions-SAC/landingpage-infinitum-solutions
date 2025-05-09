
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Check, 
  ArrowRight, 
  DollarSign,
  Sparkles, 
  Search,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculateMonthlyCost } from "@/utils/calculatorUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type OpenSourceAlternativesProps = {
  selectedTools: string[];
  userCount: number;
  alternatives: Record<string, any[]>;
  showSavings: boolean;
};

const OpenSourceAlternatives = ({ 
  selectedTools, 
  userCount, 
  alternatives, 
  showSavings 
}: OpenSourceAlternativesProps) => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedDetail, setExpandedDetail] = useState<string | null>(null);
  
  if (selectedTools.length === 0) {
    return null;
  }

  const totalMonthlyCost = calculateMonthlyCost(selectedTools, userCount);
  const annualSavings = totalMonthlyCost * 12;

  // Filter alternatives based on search query
  const filteredAlternatives = Object.entries(alternatives).reduce((acc, [category, toolGroups]) => {
    if (searchQuery === "") {
      acc[category] = toolGroups;
      return acc;
    }

    const filteredTools = toolGroups.filter(group => 
      group.saas.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.alternatives.some((alt: any) => alt.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (filteredTools.length > 0) {
      acc[category] = filteredTools;
    }
    
    return acc;
  }, {} as Record<string, any[]>);
  
  const hasFilteredResults = Object.keys(filteredAlternatives).length > 0;
  
  return (
    <Card className="shadow-md bg-gradient-to-br from-white to-green-50 border-green-200 overflow-hidden dark:from-gray-800 dark:to-gray-900 dark:border-green-900">
      <CardHeader className="border-b bg-green-500/10 dark:bg-green-900/30 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="text-green-500 dark:text-green-400" size={18} />
              Alternativas Open Source
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Herramientas sin costo para reemplazar servicios de pago
            </CardDescription>
          </div>
          
          <div className="w-full sm:w-auto flex items-center">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar alternativas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 text-sm bg-white dark:bg-gray-900"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 pb-2">
        <div className="space-y-4">
          <AnimatePresence>
            {showSavings && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 border border-green-200 shadow-inner dark:from-green-900/30 dark:to-green-800/20 dark:border-green-800"
              >
                <div className="text-center mb-1">
                  <span className="text-sm font-medium text-green-600 dark:text-green-500">Ahorro potencial con alternativas Open Source</span>
                </div>
                
                <div className="flex items-center justify-center gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center mb-1">
                      <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="text-lg font-bold text-green-600 dark:text-green-400">{totalMonthlyCost.toFixed(2)}</span>
                    </div>
                    <span className="text-xs text-green-600 dark:text-green-500 flex items-center gap-1">
                      <Calendar size={12} />
                      mensual
                    </span>
                  </div>
                  
                  <ArrowRight className="text-green-500" size={16} />
                  
                  <div className="flex flex-col items-center">
                    <div className="flex items-center mb-1">
                      <DollarSign className="h-5 w-5 text-green-700 dark:text-green-300" />
                      <span className="text-2xl font-bold text-green-700 dark:text-green-300">{annualSavings.toFixed(2)}</span>
                    </div>
                    <span className="text-xs text-green-600 dark:text-green-500 flex items-center gap-1">
                      <Calendar size={12} />
                      anual
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!hasFilteredResults && searchQuery && (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              No se encontraron alternativas para "{searchQuery}"
            </div>
          )}
          
          <div>
            <Accordion 
              type="multiple" 
              defaultValue={Object.keys(filteredAlternatives)}
              className="space-y-2"
            >
              {Object.entries(filteredAlternatives).map(([category, toolGroups]) => (
                <AccordionItem 
                  key={category} 
                  value={category}
                  className="border-b-0 bg-white/80 rounded-lg shadow-sm dark:bg-gray-800/40 overflow-hidden"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{category}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {toolGroups.length}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 pt-2">
                    <div className="space-y-3">
                      {toolGroups.map((group, idx) => (
                        <Collapsible 
                          key={`${category}-${idx}`}
                          open={expandedDetail === `${category}-${idx}`}
                          onOpenChange={() => {
                            if (expandedDetail === `${category}-${idx}`) {
                              setExpandedDetail(null);
                            } else {
                              setExpandedDetail(`${category}-${idx}`);
                            }
                          }}
                        >
                          <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                            <CollapsibleTrigger className="w-full">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <div className="flex flex-col">
                                  <div className="font-medium text-gray-900 dark:text-gray-200">
                                    {group.saas.name}
                                  </div>
                                  <div className="text-sm text-red-500 font-medium mt-0.5">
                                    ${(group.saas.cost * userCount).toFixed(2)}/mes
                                  </div>
                                </div>
                                
                                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                                  <span className="mr-1">{group.alternatives.length} alternativas</span>
                                  <Check className="h-4 w-4" />
                                </div>
                              </div>
                            </CollapsibleTrigger>
                            
                            <CollapsibleContent>
                              <div className="p-3 pt-0 border-t border-gray-100 dark:border-gray-700">
                                <div className="flex flex-wrap gap-2 pt-3">
                                  {group.alternatives.map((alt: any, altIdx: number) => (
                                    <a
                                      key={altIdx}
                                      href={alt.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <Button 
                                        size={isMobile ? "sm" : "default"}
                                        variant="outline"
                                        className="border-green-200 bg-green-50 hover:bg-green-100 text-green-700 text-xs md:text-sm py-1 h-auto md:h-9 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-800/40"
                                      >
                                        <Check className="mr-1 h-3 w-3" />
                                        {alt.name}
                                      </Button>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </CollapsibleContent>
                          </div>
                        </Collapsible>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenSourceAlternatives;
