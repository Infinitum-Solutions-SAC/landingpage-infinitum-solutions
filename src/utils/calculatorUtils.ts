import { SaaSTool, toolsData } from "../data/toolsData";

// Calcular el costo mensual basado en herramientas y número de usuarios
export const calculateMonthlyCost = (selectedTools: string[], userCount: number): number => {
  let totalCost = 0;
  
  selectedTools.forEach(toolName => {
    // Buscar la herramienta y su costo
    for (const category of Object.values(toolsData.tools)) {
      const tool = category.SaaS.find(t => t.name === toolName);
      if (tool) {
        totalCost += tool.cost * userCount;
        break;
      }
    }
  });
  
  return totalCost;
};

// Calcular el costo anual
export const calculateYearlyCost = (monthlyCost: number): number => {
  return monthlyCost * 12;
};

// Obtener todas las herramientas SaaS para los iconos flotantes
export const getAllSaasTools = (): { name: string; icon: string; cost?: number }[] => {
  const allTools: { name: string; icon: string; cost?: number }[] = [];
  Object.values(toolsData.tools).forEach(category => {
    category.SaaS.forEach(tool => {
      allTools.push({name: tool.name, icon: tool.icon, cost: tool.cost});
    });
  });
  return allTools;
};

// Obtener alternativas de código abierto para las herramientas seleccionadas
export const getOpenSourceAlternatives = (selectedTools: string[]) => {
  const alternatives: Record<string, any[]> = {};
  
  selectedTools.forEach(toolName => {
    // Encontrar la categoría a la que pertenece la herramienta
    for (const [category, tools] of Object.entries(toolsData.tools)) {
      const saasToolIndex = tools.SaaS.findIndex(tool => tool.name === toolName);
      if (saasToolIndex !== -1) {
        if (!alternatives[category]) {
          alternatives[category] = [];
        }
        alternatives[category].push({
          saas: tools.SaaS[saasToolIndex],
          alternatives: tools.OpenSource
        });
        break;
      }
    }
  });
  
  return alternatives;
};

// Obtener una lista predeterminada de herramientas populares
export const getDefaultSelectedTools = (): string[] => {
  // Seleccionar algunas herramientas populares por defecto
  return ['Slack', 'Microsoft 365', 'Zoom'];
};

// Obtener el costo total de una herramienta para un número de usuarios
export const getToolCost = (toolName: string, userCount: number): number => {
  for (const category of Object.values(toolsData.tools)) {
    const tool = category.SaaS.find(t => t.name === toolName);
    if (tool) {
      return tool.cost * userCount;
    }
  }
  return 0;
};
