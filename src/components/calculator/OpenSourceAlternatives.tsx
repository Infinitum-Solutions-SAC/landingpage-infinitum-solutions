
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
  Sparkles 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculateMonthlyCost } from "@/utils/calculatorUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";

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
  
  if (selectedTools.length === 0) {
    return null;
  }

  const totalMonthlyCost = calculateMonthlyCost(selectedTools, userCount);
  const annualSavings = totalMonthlyCost * 12;
  
  return (
    <Card className="shadow-md bg-gradient-to-br from-white to-green-50 border-green-200 overflow-hidden dark:from-gray-800 dark:to-gray-900 dark:border-green-900">
      <CardHeader className="border-b bg-green-500/10 dark:bg-green-900/30 py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="text-green-500 dark:text-green-400" size={18} />
            Alternativas Open Source
          </CardTitle>
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700">
            Gratuitas
          </Badge>
        </div>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Herramientas sin costo para reemplazar servicios de pago
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <AnimatePresence>
            {showSavings && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 border border-green-200 shadow-inner dark:from-green-900/30 dark:to-green-800/20 dark:border-green-800"
              >
                <div className="text-center mb-2">
                  <h3 className="text-xl font-semibold text-green-700 dark:text-green-400">
                    Ahorra hasta
                  </h3>
                </div>
                
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center text-3xl font-bold text-green-700 dark:text-green-400 mb-1">
                    <DollarSign className="h-6 w-6" />
                    <span className="tracking-tight">{annualSavings.toFixed(2)}</span>
                  </div>
                  <span className="text-sm font-medium text-green-600 dark:text-green-500">al año con alternativas Open Source</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div>
            <Accordion type="multiple" defaultValue={Object.keys(alternatives)} className="space-y-2">
              {Object.entries(alternatives).map(([category, toolGroups]) => (
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
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      {toolGroups.map((group, idx) => (
                        <div 
                          key={idx}
                          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm dark:bg-gray-800 dark:border-gray-700"
                        >
                          <div className="flex-shrink-0 min-w-[120px]">
                            <div className="font-medium text-gray-900 dark:text-gray-200">
                              {group.saas.name}
                            </div>
                            <div className="text-sm text-red-500 font-medium mt-1">
                              ${(group.saas.cost * userCount).toFixed(2)}/mes
                            </div>
                          </div>
                          
                          <div className="hidden sm:flex self-center">
                            <ArrowRight className="mx-2 text-gray-400" size={isMobile ? 16 : 20} />
                          </div>
                          
                          <div className="flex-1 w-full">
                            <div className="flex flex-wrap gap-2">
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
                        </div>
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
