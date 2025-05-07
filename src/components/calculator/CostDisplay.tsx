
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

type CostDisplayProps = {
  monthlyCost: number;
  yearlyCost: number;
};

const CostDisplay = ({ monthlyCost, yearlyCost }: CostDisplayProps) => {
  const [timeframe, setTimeframe] = useState<string>('yearly');
  
  return (
    <Card className="shadow-md mb-6 overflow-hidden">
      <CardHeader className="bg-costwise-blue text-white dark:bg-costwise-navy">
        <div className="flex items-center justify-between">
          <CardTitle>Coste de Herramientas SaaS</CardTitle>
          <Tabs 
            defaultValue={timeframe} 
            value={timeframe} 
            onValueChange={setTimeframe} 
            className="w-auto"
          >
            <TabsList className="bg-white/20 dark:bg-gray-800/30">
              <TabsTrigger value="monthly" className="data-[state=active]:bg-white/30 data-[state=active]:text-white">Mensual</TabsTrigger>
              <TabsTrigger value="yearly" className="data-[state=active]:bg-white/30 data-[state=active]:text-white">Anual</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <CardDescription className="text-gray-200">
          Cálculo basado en tus selecciones
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 dark:bg-gray-800/50">
        <Tabs value={timeframe}>
          <TabsContent value="monthly" className="mt-0">
            <div className="flex flex-col items-center py-6">
              <span className="text-xl text-gray-500 dark:text-gray-300 mb-3">Coste mensual actual</span>
              <motion.div
                key={`monthly-${monthlyCost}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-baseline"
              >
                <span className="text-4xl font-bold text-red-500 dark:text-red-400">${monthlyCost.toFixed(2)}</span>
                <span className="text-lg text-gray-400 dark:text-gray-500 ml-2">/mes</span>
              </motion.div>
            </div>
          </TabsContent>
          <TabsContent value="yearly" className="mt-0">
            <div className="flex flex-col items-center py-6">
              <span className="text-xl text-gray-500 dark:text-gray-300 mb-3">Coste anual actual</span>
              <motion.div
                key={`yearly-${yearlyCost}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-baseline"
              >
                <span className="text-4xl font-bold text-red-500 dark:text-red-400">${yearlyCost.toFixed(2)}</span>
                <span className="text-lg text-gray-400 dark:text-gray-500 ml-2">/año</span>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CostDisplay;
