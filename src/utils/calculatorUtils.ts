import { SaaSTool, toolsData } from "../data/toolsData";
// Eliminamos las importaciones de SVGs individuales

// Mapeo de nombres de herramientas a sus iconos importados
const iconMap: Record<string, string> = {};

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
      // Usar el icono directamente desde el JSON
      allTools.push({ name: tool.name, icon: tool.icon, cost: tool.cost });
    });
  });
  return allTools;
};

// Obtener las N primeras herramientas de cada categoría
export const getTopToolsPerCategory = (count: number = 2): { name: string; icon: string; cost?: number }[] => {
  const topTools: { name: string; icon: string; cost?: number }[] = [];
  
  // Primero incluir las herramientas seleccionadas por defecto para asegurar que aparezcan
  const defaultTools = getDefaultSelectedTools();
  const defaultToolsObjects: { name: string; icon: string; cost?: number }[] = [];
  
  // Recorrer todas las categorías
  Object.values(toolsData.tools).forEach(category => {
    // Filtrar primero las herramientas por defecto
    const defaultInCategory = category.SaaS.filter(tool => defaultTools.includes(tool.name));
    defaultInCategory.forEach(tool => {
      defaultToolsObjects.push({ name: tool.name, icon: tool.icon, cost: tool.cost });
    });
    
    // Luego seleccionar las N primeras herramientas que no están en las predeterminadas
    const otherTools = category.SaaS
      .filter(tool => !defaultTools.includes(tool.name))
      .slice(0, count);
    
    otherTools.forEach(tool => {
      topTools.push({ name: tool.name, icon: tool.icon, cost: tool.cost });
    });
  });
  
  // Combinar las herramientas predeterminadas al principio y luego el resto
  return [...defaultToolsObjects, ...topTools];
};

// Helper para obtener el icono de una herramienta
export const getToolIcon = (toolName: string): string => {
  for (const category of Object.values(toolsData.tools)) {
    const tool = category.SaaS.find(t => t.name === toolName);
    if (tool) {
      return tool.icon;
    }
  }
  return `/placeholder.svg`;
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
  return ['Jira', 'Microsoft 365'];
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
