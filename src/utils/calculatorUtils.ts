import { SaaSTool, toolsData } from "../data/toolsData";
// Eliminamos las importaciones de SVGs individuales y el iconMap

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
  
  // Recorrer todas las categorías y extraer las herramientas SaaS
  Object.values(toolsData.tools).forEach(category => {
    category.SaaS.forEach(tool => {
      allTools.push({
        name: tool.name,
        icon: tool.icon,
        cost: tool.cost
      });
    });
  });
  
  return allTools;
};

// Obtener alternativas de código abierto para las herramientas seleccionadas
export const getOpenSourceAlternatives = (selectedToolNames: string[]): Record<string, any[]> => {
  const alternatives: Record<string, any[]> = {};
  
  selectedToolNames.forEach(toolName => {
    // Buscar la herramienta seleccionada y su categoría
    for (const [categoryName, category] of Object.entries(toolsData.tools)) {
      const saasTools = category.SaaS;
      const openSourceTools = category.OpenSource;
      
      const saasToolIndex = saasTools.findIndex(t => t.name === toolName);
      
      if (saasToolIndex !== -1) {
        // Si la herramienta existe en esta categoría
        const saasToolData = saasTools[saasToolIndex];
        
        // Añadir la categoría si no existe
        if (!alternatives[categoryName]) {
          alternatives[categoryName] = [];
        }
        
        // Agregar las alternativas de código abierto
        alternatives[categoryName].push({
          saas: saasToolData,
          alternatives: openSourceTools
        });
        
        break; // Salir del bucle una vez encontrada la herramienta
      }
    }
  });
  
  return alternatives;
};

// Obtener el icono de una herramienta
export const getToolIcon = (toolName: string): string => {
  for (const category of Object.values(toolsData.tools)) {
    const tool = category.SaaS.find(t => t.name === toolName);
    if (tool && tool.icon) {
      return tool.icon;
    }
  }
  return "";
};

// Obtener el costo de una herramienta
export const getToolCost = (toolName: string, userCount: number): number => {
  for (const category of Object.values(toolsData.tools)) {
    const tool = category.SaaS.find(t => t.name === toolName);
    if (tool) {
      return tool.cost * userCount;
    }
  }
  return 0;
};

// Obtener herramientas predeterminadas para mostrar al inicio
export const getDefaultSelectedTools = (): string[] => {
  return ['Microsoft 365', 'Slack', 'Jira'];
};

// Obtener las principales herramientas por categoría para la visualización de iconos flotantes
export const getTopToolsPerCategory = (count: number): { name: string; icon: string; cost?: number }[] => {
  const result: { name: string; icon: string; cost?: number }[] = [];
  const categories = Object.keys(toolsData.tools);
  
  // Tomar 'count' herramientas de cada categoría, o todas si hay menos que 'count'
  categories.forEach(category => {
    const tools = toolsData.tools[category].SaaS.slice(0, count);
    
    tools.forEach(tool => {
      result.push({
        name: tool.name,
        icon: tool.icon,
        cost: tool.cost
      });
    });
  });
  
  return result;
};

// Obtener herramientas con configuración dinámica por categoría
export const getToolsWithDynamicCount = (config: Record<string, number> = {}): { name: string; icon: string; cost?: number }[] => {
  const result: { name: string; icon: string; cost?: number }[] = [];
  const categories = Object.keys(toolsData.tools);
  
  categories.forEach(category => {
    // Usar la configuración específica para la categoría, o un valor por defecto
    const countForCategory = config[category] || 3;
    const tools = toolsData.tools[category].SaaS.slice(0, countForCategory);
    
    tools.forEach(tool => {
      result.push({
        name: tool.name,
        icon: tool.icon,
        cost: tool.cost
      });
    });
  });
  
  return result;
};

// Obtener todas las herramientas disponibles (sin límite)
export const getAllAvailableTools = (): { name: string; icon: string; cost?: number }[] => {
  const result: { name: string; icon: string; cost?: number }[] = [];
  const categories = Object.keys(toolsData.tools);
  
  categories.forEach(category => {
    const tools = toolsData.tools[category].SaaS;
    
    tools.forEach(tool => {
      result.push({
        name: tool.name,
        icon: tool.icon,
        cost: tool.cost
      });
    });
  });
  
  return result;
};
