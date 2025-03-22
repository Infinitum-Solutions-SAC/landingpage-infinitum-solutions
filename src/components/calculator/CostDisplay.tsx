
import { motion } from 'framer-motion';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { DollarSign } from "lucide-react";

type CostDisplayProps = {
  monthlyCost: number;
  yearlyCost: number;
};

const CostDisplay = ({ monthlyCost, yearlyCost }: CostDisplayProps) => {
  return (
    <Card className="shadow-md mb-6 overflow-hidden">
      <CardHeader className="bg-costwise-navy text-white">
        <CardTitle>Costos de SaaS</CardTitle>
        <CardDescription className="text-gray-200">
          Cálculo basado en tus selecciones
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-lg text-gray-500">Gasto mensual estimado</span>
            <div className="flex items-center">
              <DollarSign className="text-costwise-blue h-8 w-8" />
              <motion.span 
                className="text-4xl font-bold text-costwise-navy"
                key={monthlyCost}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {monthlyCost.toFixed(2)}
              </motion.span>
            </div>
            <span className="text-sm text-gray-500">por mes</span>
          </div>
          
          <div className="flex flex-col items-center justify-center gap-2 border-t pt-6">
            <span className="text-lg text-gray-500">Gasto anual estimado</span>
            <div className="flex items-center">
              <DollarSign className="text-costwise-blue h-8 w-8" />
              <motion.span 
                className="text-4xl font-bold text-costwise-navy"
                key={yearlyCost}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {yearlyCost.toFixed(2)}
              </motion.span>
            </div>
            <span className="text-sm text-gray-500">por año</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostDisplay;
