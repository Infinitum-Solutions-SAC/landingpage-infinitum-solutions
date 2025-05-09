
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getToolIcon } from '@/utils/calculatorUtils';

interface OpenSourceAlternativesProps {
  selectedTools: string[];
  userCount: number;
  alternatives: any[];
  showSavings: boolean;
  monthlyCost: number;
  yearlyCost: number;
  showSearch?: boolean;
}

const OpenSourceAlternatives = ({
  selectedTools,
  userCount,
  alternatives,
  showSavings,
  monthlyCost,
  yearlyCost,
  showSearch = true
}: OpenSourceAlternativesProps) => {

  const StrikethroughText = ({ children }: { children: React.ReactNode }) => (
    <span className="relative">
      <motion.span
        className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-500 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ 
          scaleX: [0, 1, 1, 1], 
          opacity: [0, 1, 1, 1]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          repeatDelay: 5,
          times: [0, 0.3, 0.9, 1] 
        }}
      />
      {children}
    </span>
  );
  
  // Format currency with commas
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-ES', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(amount);
  };
  
  if (selectedTools.length === 0) {
    return (
      <Card className="h-full shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-center">Alternativas Open Source</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center pt-8 pb-12">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>Selecciona herramientas para ver alternativas de código abierto</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const totalAlternatives = alternatives.length;
  
  return (
    <Card className="shadow-md h-full">
      <CardHeader>
        <CardTitle className="text-xl">Alternativas Open Source</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Costs and savings section */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mb-6">
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Costo Mensual SaaS:</span>
              <StrikethroughText>
                <span className="font-bold text-red-500">{formatCurrency(monthlyCost)}</span>
              </StrikethroughText>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Costo Anual SaaS:</span>
              <StrikethroughText>
                <span className="font-bold text-red-500">{formatCurrency(yearlyCost)}</span>
              </StrikethroughText>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Ahorro anual:</span>
                <motion.div 
                  initial={{ scale: 1 }}
                  animate={showSavings ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <span className="font-bold text-green-500 text-lg">
                    {formatCurrency(yearlyCost)}
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Alternatives */}
        <div className="space-y-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">
              {totalAlternatives} {totalAlternatives === 1 ? 'Alternativa' : 'Alternativas'} disponibles
            </h3>
          </div>
          
          <Accordion type="multiple" className="space-y-2 w-full">
            {alternatives.map((alternative, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border rounded-md overflow-hidden bg-white dark:bg-gray-800/50"
              >
                <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/80">
                  <div className="flex items-center space-x-3 text-left">
                    <div className="relative flex-shrink-0 w-10 h-10">
                      {getToolIcon(alternative.openSource, 'opensource') ? (
                        <img 
                          src={getToolIcon(alternative.openSource, 'opensource')} 
                          alt={alternative.openSource}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-10 h-10 flex items-center justify-center bg-green-100 dark:bg-green-900/30 rounded-md">
                          <span className="text-sm font-medium text-green-700 dark:text-green-300">
                            {alternative.openSource.substring(0, 2)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{alternative.openSource}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Alternativa a {alternative.saas}
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="pt-2 space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{alternative.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {alternative.features && alternative.features.map((feature: string, i: number) => (
                        <span 
                          key={i} 
                          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full dark:bg-green-900/30 dark:text-green-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center text-sm pt-2">
                      <span className="text-gray-500 dark:text-gray-400">Complejidad de migración:</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-2 h-6 mx-0.5 rounded-sm ${
                              i < alternative.migrationComplexity 
                                ? 'bg-yellow-500' 
                                : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {alternative.url && (
                      <a 
                        href={alternative.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-block mt-3 text-sm text-blue-600 hover:underline dark:text-blue-400"
                      >
                        Ver más información →
                      </a>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenSourceAlternatives;
