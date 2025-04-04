
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { 
  Check, 
  ArrowRight, 
  DollarSign 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculateMonthlyCost } from "@/utils/calculatorUtils";
import { useIsMobile } from "@/hooks/use-mobile";

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
  
  return (
    <Card className="shadow-md bg-gradient-to-br from-white to-green-50 border-green-200 overflow-hidden">
      <CardHeader className="border-b bg-green-500/10">
        <CardTitle className="flex items-center gap-2">
          <Check className="text-green-500" />
          Alternativas Open Source
        </CardTitle>
        <CardDescription>
          Herramientas gratuitas que puedes usar como alternativa
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <AnimatePresence>
            {showSavings && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 bg-green-50 rounded-md border border-green-200 flex flex-col sm:flex-row justify-between items-center gap-4"
              >
                <div className="text-center sm:text-left">
                  <p className="text-lg font-semibold text-green-700">¡Ahorra hasta un 100%!</p>
                  <p className="text-sm text-green-600">
                    Reemplazando herramientas SaaS con alternativas Open Source
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 w-full sm:w-auto">
                  <div className="flex items-center text-xl font-bold text-green-700">
                    <DollarSign className="h-5 w-5" />
                    <span>{totalMonthlyCost.toFixed(2)}</span>
                  </div>
                  <span className="px-2">×</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-semibold">
                    12 meses
                  </span>
                  <span className="px-2">=</span>
                  <div className="flex items-center text-xl font-bold text-green-700">
                    <DollarSign className="h-5 w-5" />
                    <span>{(totalMonthlyCost * 12).toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Alternativas por categoría</h3>
            {Object.entries(alternatives).map(([category, toolGroups]) => (
              <div key={category} className="mb-6">
                <h4 className="text-base font-medium bg-green-50 p-2 rounded">{category}</h4>
                <div className="overflow-x-auto -mx-6 px-6">
                  <Table className="mt-2 w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead className={isMobile ? "w-[120px]" : "w-[180px]"}>Herramienta SaaS</TableHead>
                        <TableHead className="w-[40px]"></TableHead>
                        <TableHead>Alternativas Open Source</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {toolGroups.map((group, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">
                            <div>
                              {group.saas.name}
                              <div className="text-sm text-costwise-blue font-medium mt-1">
                                ${(group.saas.cost * userCount).toFixed(2)}/mes
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="px-1 md:px-4">
                            <ArrowRight className="mx-auto text-gray-400" size={isMobile ? 16 : 24} />
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1 md:gap-2">
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
                                    className="border-green-200 bg-green-50 hover:bg-green-100 text-green-700 text-xs md:text-sm py-1 h-auto md:h-9"
                                  >
                                    {alt.name}
                                  </Button>
                                </a>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenSourceAlternatives;
