
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardHeader, 
  CardContent,
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign } from "lucide-react";

type CostDisplayProps = {
  monthlyCost: number;
  yearlyCost: number;
};

const CostDisplay = ({ monthlyCost, yearlyCost }: CostDisplayProps) => {
  const [timeframe, setTimeframe] = useState<string>('yearly');
  
  return (
    <Card className="shadow-md mb-4 overflow-hidden dark:bg-gray-800/50">
      <CardHeader className="bg-costwise-blue text-white dark:bg-blue-900 py-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm md:text-base">Coste de Herramientas SaaS</CardTitle>
          <Tabs 
            defaultValue={timeframe} 
            value={timeframe} 
            onValueChange={setTimeframe} 
            className="w-auto"
          >
            <TabsList className="h-6">
              <TabsTrigger value="monthly" className="text-xs px-2 py-0.5">Mensual</TabsTrigger>
              <TabsTrigger value="yearly" className="text-xs px-2 py-0.5">Anual</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <CardDescription className="text-gray-200 text-xs">
          Cálculo basado en tus selecciones
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2 pb-2">
        <Tabs value={timeframe}>
          <TabsContent value="monthly" className="mt-0">
            <div className="flex items-center justify-center py-1">
              <motion.div
                key={`monthly-${monthlyCost}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-baseline"
              >
                <DollarSign className="h-4 w-4 text-red-500" />
                <span className="text-xl md:text-2xl font-bold text-red-500">{monthlyCost.toFixed(2)}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">/mes</span>
              </motion.div>
            </div>
          </TabsContent>
          <TabsContent value="yearly" className="mt-0">
            <div className="flex items-center justify-center py-1">
              <motion.div
                key={`yearly-${yearlyCost}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-baseline"
              >
                <DollarSign className="h-4 w-4 text-red-500" />
                <span className="text-xl md:text-2xl font-bold text-red-500">{yearlyCost.toFixed(2)}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">/año</span>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CostDisplay;
