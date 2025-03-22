import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  ArrowRight, 
  Check, 
  ArrowDown, 
  Info, 
  HelpCircle 
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FloatingIcons from "./FloatingIcons";

type SaaSTool = {
  name: string;
  cost: number;
  icon: string;
  details?: string;
};

type OpenSourceTool = {
  name: string;
  url: string;
  icon: string;
};

type ToolCategory = {
  SaaS: SaaSTool[];
  OpenSource: OpenSourceTool[];
};

type ToolsData = {
  tools: Record<string, ToolCategory>;
};

// Datos de herramientas
const toolsData: ToolsData = {
  tools: {
    "Gestión de Proyectos": {
      "SaaS": [
        {"name": "Microsoft Project", "cost": 10, "icon": "icon/example.png", "details": "Herramienta avanzada para planificación y gestión de proyectos complejos."},
        {"name": "Jira", "cost": 7.75, "icon": "icon/example.png", "details": "Gestión de proyectos ágiles, especialmente para desarrollo de software."},
        {"name": "Trello", "cost": 5, "icon": "icon/example.png", "details": "Gestión visual de tareas con tableros Kanban."},
        {"name": "Asana", "cost": 10.99, "icon": "icon/example.png", "details": "Gestión de tareas y proyectos con múltiples vistas."},
        {"name": "Monday.com", "cost": 8, "icon": "icon/example.png", "details": "Plataforma flexible para gestionar equipos y flujos de trabajo."}
      ],
      "OpenSource": [
        {"name": "Taiga", "url": "https://taiga.io/", "icon": "icon/example.png"},
        {"name": "OpenProject", "url": "https://www.openproject.org/", "icon": "icon/example.png"},
        {"name": "Redmine", "url": "https://www.redmine.org/", "icon": "icon/example.png"},
        {"name": "ProjectLibre", "url": "https://www.projectlibre.com/", "icon": "icon/example.png"},
        {"name": "Focalboard", "url": "https://www.focalboard.com/", "icon": "icon/example.png"},
        {"name": "Kanboard", "url": "https://kanboard.org/", "icon": "icon/example.png"}
      ]
    },
    "Acceso Remoto": {
      "SaaS": [
        {"name": "LogMeIn", "cost": 30, "icon": "icon/example.png", "details": "Solución de acceso remoto para soporte y gestión de dispositivos."},
        {"name": "TeamViewer", "cost": 24.90, "icon": "icon/example.png", "details": "Software de acceso remoto y colaboración en tiempo real."},
        {"name": "AnyDesk", "cost": 10.99, "icon": "icon/example.png", "details": "Acceso remoto ligero y rápido para escritorios."}
      ],
      "OpenSource": [
        {"name": "Apache Guacamole", "url": "https://guacamole.apache.org/", "icon": "icon/example.png"},
        {"name": "xrdp", "url": "https://www.xrdp.org/", "icon": "icon/example.png"},
        {"name": "FreeRDP", "url": "https://www.freerdp.com/", "icon": "icon/example.png"},
        {"name": "Remmina", "url": "https://remmina.org/", "icon": "icon/example.png"}
      ]
    },
    "Monitorización y Observabilidad": {
      "SaaS": [
        {"name": "Datadog", "cost": 15, "icon": "icon/example.png", "details": "Monitorización de infraestructura y aplicaciones en la nube."},
        {"name": "New Relic", "cost": 12.50, "icon": "icon/example.png", "details": "Análisis de rendimiento de aplicaciones en tiempo real."},
        {"name": "Splunk", "cost": 25, "icon": "icon/example.png", "details": "Plataforma para análisis y monitorización de datos masivos."}
      ],
      "OpenSource": [
        {"name": "Grafana", "url": "https://grafana.com/", "icon": "icon/example.png"},
        {"name": "Prometheus", "url": "https://prometheus.io/", "icon": "icon/example.png"},
        {"name": "ELK Stack", "url": "https://www.elastic.co/what-is/elk-stack", "icon": "icon/example.png"},
        {"name": "OpenTelemetry", "url": "https://opentelemetry.io/", "icon": "icon/example.png"}
      ]
    },
    "Comunicación de Equipos": {
      "SaaS": [
        {"name": "Slack", "cost": 6.67, "icon": "icon/example.png", "details": "Mensajería en tiempo real para equipos con integraciones."},
        {"name": "Microsoft Teams", "cost": 4, "icon": "icon/example.png", "details": "Colaboración y videoconferencia integrada con Microsoft 365."},
        {"name": "Discord", "cost": 9.99, "icon": "icon/example.png", "details": "Comunicación por voz, video y texto, popular en equipos técnicos."}
      ],
      "OpenSource": [
        {"name": "Mattermost", "url": "https://mattermost.com/", "icon": "icon/example.png"},
        {"name": "Rocket.Chat", "url": "https://rocket.chat/", "icon": "icon/example.png"},
        {"name": "Zulip", "url": "https://zulip.com/", "icon": "icon/example.png"},
        {"name": "Element", "url": "https://element.io/", "icon": "icon/example.png"}
      ]
    },
    "Almacenamiento y Compartición de Archivos": {
      "SaaS": [
        {"name": "Dropbox", "cost": 9.99, "icon": "icon/example.png", "details": "Almacenamiento en la nube y compartición de archivos."},
        {"name": "Google Drive", "cost": 1.99, "icon": "icon/example.png", "details": "Almacenamiento y colaboración en documentos en la nube."},
        {"name": "OneDrive", "cost": 1.99, "icon": "icon/example.png", "details": "Almacenamiento en la nube integrado con Microsoft 365."}
      ],
      "OpenSource": [
        {"name": "OwnCloud", "url": "https://owncloud.com/", "icon": "icon/example.png"},
        {"name": "Nextcloud", "url": "https://nextcloud.com/", "icon": "icon/example.png"},
        {"name": "Seafile", "url": "https://www.seafile.com/", "icon": "icon/example.png"}
      ]
    },
    "Automatización de Flujos de Trabajo": {
      "SaaS": [
        {"name": "Zapier", "cost": 19.99, "icon": "icon/example.png", "details": "Automatización de integraciones entre aplicaciones web."},
        {"name": "IFTTT", "cost": 2.50, "icon": "icon/example.png", "details": "Automatización simple para dispositivos y apps."},
        {"name": "Make (Integromat)", "cost": 9, "icon": "icon/example.png", "details": "Automatización avanzada de flujos de trabajo."}
      ],
      "OpenSource": [
        {"name": "n8n", "url": "https://n8n.io/", "icon": "icon/example.png"},
        {"name": "Node-RED", "url": "https://nodered.org/", "icon": "icon/example.png"},
        {"name": "Huginn", "url": "https://github.com/huginn/huginn", "icon": "icon/example.png"}
      ]
    },
    "Monitorización de Sistemas": {
      "SaaS": [
        {"name": "Pingdom", "cost": 10, "icon": "icon/example.png", "details": "Monitorización de disponibilidad y rendimiento de sitios web."},
        {"name": "UptimeRobot", "cost": 4.50, "icon": "icon/example.png", "details": "Monitorización de tiempo de actividad de sitios y servidores."}
      ],
      "OpenSource": [
        {"name": "Netdata", "url": "https://www.netdata.cloud/", "icon": "icon/example.png"},
        {"name": "Zabbix", "url": "https://www.zabbix.com/", "icon": "icon/example.png"},
        {"name": "Nagios", "url": "https://www.nagios.org/", "icon": "icon/example.png"},
        {"name": "Kuma", "url": "https://uptime.kuma.pet/", "icon": "icon/example.png"}
      ]
    },
    "Soluciones NAS": {
      "SaaS": [
        {"name": "AWS S3", "cost": 5, "icon": "icon/example.png", "details": "Almacenamiento en la nube escalable."},
        {"name": "Google Cloud Storage", "cost": 5, "icon": "icon/example.png", "details": "Almacenamiento en la nube de alta disponibilidad."}
      ],
      "OpenSource": [
        {"name": "OpenMediaVault", "url": "https://www.openmediavault.org/", "icon": "icon/example.png"},
        {"name": "TrueNAS", "url": "https://www.truenas.com/", "icon": "icon/example.png"},
        {"name": "FreeNAS", "url": "https://www.freenas.org/", "icon": "icon/example.png"}
      ]
    },
    "Analítica Web": {
      "SaaS": [
        {"name": "Google Analytics", "cost": 0, "icon": "icon/example.png", "details": "Análisis gratuito de tráfico y comportamiento web."},
        {"name": "Mixpanel", "cost": 25, "icon": "icon/example.png", "details": "Análisis de comportamiento de usuarios en aplicaciones."}
      ],
      "OpenSource": [
        {"name": "Fathom", "url": "https://usefathom.com/", "icon": "icon/example.png"},
        {"name": "Piwik (Matomo)", "url": "https://matomo.org/", "icon": "icon/example.png"},
        {"name": "Open Web Analytics", "url": "http://www.openwebanalytics.com/", "icon": "icon/example.png"}
      ]
    },
    "CRM y Ventas": {
      "SaaS": [
        {"name": "Salesforce", "cost": 25, "icon": "icon/example.png", "details": "CRM líder para gestión de ventas y clientes."},
        {"name": "HubSpot", "cost": 18, "icon": "icon/example.png", "details": "CRM y marketing con plan gratuito y opciones premium."},
        {"name": "Pipedrive", "cost": 14.90, "icon": "icon/example.png", "details": "CRM enfocado en ventas y gestión de pipelines."}
      ],
      "OpenSource": [
        {"name": "Odoo", "url": "https://www.odoo.com/", "icon": "icon/example.png"},
        {"name": "CiviCRM", "url": "https://civicrm.org/", "icon": "icon/example.png"},
        {"name": "SuiteCRM", "url": "https://suitecrm.com/", "icon": "icon/example.png"}
      ]
    },
    "Marketing por Email": {
      "SaaS": [
        {"name": "Mailchimp", "cost": 13, "icon": "icon/example.png", "details": "Plataforma de email marketing y automatización."},
        {"name": "Constant Contact", "cost": 20, "icon": "icon/example.png", "details": "Email marketing para pequeñas empresas."}
      ],
      "OpenSource": [
        {"name": "Listmonk", "url": "https://listmonk.app/", "icon": "icon/example.png"},
        {"name": "Mautic", "url": "https://www.mautic.org/", "icon": "icon/example.png"},
        {"name": "PHPlist", "url": "https://www.phplist.org/", "icon": "icon/example.png"}
      ]
    },
    "Web Building": {
      "SaaS": [
        {"name": "Webflow", "cost": 12, "icon": "icon/example.png", "details": "Diseño web sin código con control avanzado."},
        {"name": "Wix", "cost": 14, "icon": "icon/example.png", "details": "Creador de sitios web fácil para principiantes."}
      ],
      "OpenSource": [
        {"name": "Webstudio", "url": "https://webstudio.is/", "icon": "icon/example.png"},
        {"name": "WordPress", "url": "https://wordpress.org/", "icon": "icon/example.png"}
      ]
    },
    "Base de Datos No-Code": {
      "SaaS": [
        {"name": "Airtable", "cost": 10, "icon": "icon/example.png", "details": "Base de datos visual y colaborativa sin código."}
      ],
      "OpenSource": [
        {"name": "Rowy", "url": "https://rowy.io/", "icon": "icon/example.png"},
        {"name": "NocoDB", "url": "https://nocodb.com/", "icon": "icon/example.png"}
      ]
    },
    "Solución Backend": {
      "SaaS": [
        {"name": "Firebase", "cost": 5, "icon": "icon/example.png", "details": "Backend como servicio con plan gratuito y uso escalable."},
        {"name": "Supabase", "cost": 5, "icon": "icon/example.png", "details": "Backend open-source con nivel gratuito."}
      ],
      "OpenSource": [
        {"name": "Pocketbase", "url": "https://pocketbase.io/", "icon": "icon/example.png"},
        {"name": "Appwrite", "url": "https://appwrite.io/", "icon": "icon/example.png"}
      ]
    },
    "Plataforma de Ventas": {
      "SaaS": [
        {"name": "Shopify", "cost": 29, "icon": "icon/example.png", "details": "Plataforma de comercio electrónico todo en uno."},
        {"name": "WooCommerce", "cost": 5, "icon": "icon/example.png", "details": "Plugin de e-commerce para WordPress."}
      ],
      "OpenSource": [
        {"name": "Spree", "url": "https://spreecommerce.org/", "icon": "icon/example.png"},
        {"name": "PrestaShop", "url": "https://prestashop.com/", "icon": "icon/example.png"}
      ]
    },
    "Notas": {
      "SaaS": [
        {"name": "Evernote", "cost": 7.99, "icon": "icon/example.png", "details": "Aplicación para tomar notas y organizar ideas."}
      ],
      "OpenSource": [
        {"name": "Notesnook", "url": "https://notesnook.com/", "icon": "icon/example.png"},
        {"name": "Joplin", "url": "https://joplinapp.org/", "icon": "icon/example.png"}
      ]
    },
    "Base de Conocimiento": {
      "SaaS": [
        {"name": "Notion", "cost": 8, "icon": "icon/example.png", "details": "Espacio de trabajo todo en uno para notas y wikis."},
        {"name": "Confluence", "cost": 5.75, "icon": "icon/example.png", "details": "Documentación colaborativa para equipos."}
      ],
      "OpenSource": [
        {"name": "Outline", "url": "https://www.getoutline.com/", "icon": "icon/example.png"},
        {"name": "BookStack", "url": "https://www.bookstackapp.com/", "icon": "icon/example.png"}
      ]
    },
    "Rastreo de Tiempo": {
      "SaaS": [
        {"name": "RescueTime", "cost": 6, "icon": "icon/example.png", "details": "Rastreo automático de tiempo y productividad."},
        {"name": "Toggl Track", "cost": 9, "icon": "icon/example.png", "details": "Seguimiento manual de tiempo para equipos."}
      ],
      "OpenSource": [
        {"name": "ActivityWatch", "url": "https://activitywatch.net/", "icon": "icon/example.png"},
        {"name": "Kimai", "url": "https://www.kimai.org/", "icon": "icon/example.png"}
      ]
    },
    "Gestión de Recursos Humanos": {
      "SaaS": [
        {"name": "BambooHR", "cost": 6, "icon": "icon/example.png", "details": "Gestión de RRHH para contratación y datos de empleados."},
        {"name": "Gusto", "cost": 40, "icon": "icon/example.png", "details": "Nóminas y beneficios para pequeñas empresas."}
      ],
      "OpenSource": [
        {"name": "OrangeHRM", "url": "https://www.orangehrm.com/", "icon": "icon/example.png"},
        {"name": "Sentrifugo", "url": "http://www.sentrifugo.com/", "icon": "icon/example.png"}
      ]
    },
    "Videoconferencia": {
      "SaaS": [
        {"name": "Zoom", "cost": 14.99, "icon": "icon/example.png", "details": "Videoconferencias y webinars para equipos."},
        {"name": "Google Meet", "cost": 6, "icon": "icon/example.png", "details": "Videoconferencias integradas con Google Workspace."}
      ],
      "OpenSource": [
        {"name": "Jitsi", "url": "https://jitsi.org/", "icon": "icon/example.png"},
        {"name": "BigBlueButton", "url": "https://bigbluebutton.org/", "icon": "icon/example.png"}
      ]
    }
  }
};

const CostCalculator = () => {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [userCount, setUserCount] = useState<number>(1);
  const [currentCategory, setCurrentCategory] = useState<string>(Object.keys(toolsData.tools)[0]);
  const [showSavings, setShowSavings] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  
  // Calculate costs based on actual tool prices
  const calculateMonthlyCost = () => {
    let totalCost = 0;
    
    selectedTools.forEach(toolName => {
      // Find the tool and its cost
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
  
  const totalMonthlyCost = calculateMonthlyCost();
  const totalYearlyCost = totalMonthlyCost * 12;
  
  const handleToolToggle = (toolName: string) => {
    if (selectedTools.includes(toolName)) {
      setSelectedTools(selectedTools.filter(tool => tool !== toolName));
    } else {
      setSelectedTools([...selectedTools, toolName]);
    }
  };

  const handleUserCountChange = (value: string) => {
    const count = parseInt(value);
    if (!isNaN(count) && count > 0) {
      setUserCount(count);
    }
  };
  
  // Effect to show savings animation when tools change
  useEffect(() => {
    if (selectedTools.length > 0) {
      // Reset the animation trigger
      setShowSavings(false);
      
      // Trigger animation after a short delay
      const timer = setTimeout(() => {
        setShowSavings(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [selectedTools]);
  
  // Obtener alternativas de código abierto para las herramientas seleccionadas
  const getOpenSourceAlternatives = () => {
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
  
  const openSourceAlternatives = getOpenSourceAlternatives();

  // Get all SaaS tools for floating icons
  const getAllSaasTools = () => {
    const allTools: { name: string; icon: string; cost?: number }[] = [];
    Object.values(toolsData.tools).forEach(category => {
      category.SaaS.forEach(tool => {
        allTools.push({name: tool.name, icon: tool.icon, cost: tool.cost});
      });
    });
    return allTools;
  };

  return (
    <section id="calculadora" className="section bg-gradient-to-b from-white to-costwise-gray py-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-costwise-navy mb-3">
            Calculadora de Costos IT
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Selecciona las herramientas de pago que utilizas actualmente, 
            indica el número de usuarios y descubre cuánto podrías ahorrar 
            con alternativas open source.
          </p>
        </div>
        
        {/* Floating Icons Animation */}
        <FloatingIcons tools={getAllSaasTools().slice(0, 12)} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Formulario de selección de herramientas */}
          <div className="lg:col-span-7">
            <Card className="shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-costwise-blue/10 to-transparent">
                <CardTitle>Selecciona tus herramientas actuales</CardTitle>
                <CardDescription>
                  Elige las aplicaciones SaaS que utilizas en tu empresa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-4">
                  <Label htmlFor="userCount" className="text-base font-medium">Número de usuarios</Label>
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => userCount > 1 && setUserCount(userCount - 1)}
                      disabled={userCount <= 1}
                    >
                      -
                    </Button>
                    <Input
                      id="userCount"
                      type="number"
                      min="1"
                      value={userCount}
                      onChange={(e) => handleUserCountChange(e.target.value)}
                      className="text-center text-lg font-semibold"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setUserCount(userCount + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Categoría de herramientas</Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowDetails(!showDetails)}
                      className="flex items-center gap-1 text-sm"
                    >
                      {showDetails ? "Ocultar detalles" : "Mostrar detalles"}
                      <Info className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                  <div className="overflow-x-auto pb-2">
                    <ToggleGroup 
                      type="single" 
                      className="flex flex-nowrap overflow-x-auto pb-2 no-scroll"
                      value={currentCategory} 
                      onValueChange={(value) => value && setCurrentCategory(value)}
                    >
                      {Object.keys(toolsData.tools).map((category) => (
                        <ToggleGroupItem key={category} value={category} className="whitespace-nowrap">
                          {category}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label className="text-base font-medium">Selecciona las herramientas de pago ({currentCategory})</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={currentCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full"
                      >
                        {toolsData.tools[currentCategory].SaaS.map((tool) => (
                          <motion.div 
                            key={tool.name} 
                            className={`flex flex-col p-3 rounded-md border cursor-pointer transition-colors ${
                              selectedTools.includes(tool.name) 
                                ? 'border-primary bg-primary/10' 
                                : 'border-gray-200 hover:border-primary/50'
                            }`}
                            onClick={() => handleToolToggle(tool.name)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center space-x-3 justify-between">
                              <div className="flex items-center space-x-3">
                                <Checkbox 
                                  checked={selectedTools.includes(tool.name)}
                                  onCheckedChange={() => handleToolToggle(tool.name)}
                                />
                                <span className="font-medium">{tool.name}</span>
                              </div>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="w-64">{tool.details}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            
                            <AnimatePresence>
                              {(showDetails || selectedTools.includes(tool.name)) && (
                                <motion.div 
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-2 pt-2 border-t text-sm"
                                >
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Precio mensual:</span>
                                    <span className="font-semibold text-costwise-blue">${tool.cost}/usuario</span>
                                  </div>
                                  <div className="flex justify-between items-center mt-1">
                                    <span className="text-gray-500">Total mensual:</span>
                                    <span className="font-semibold">${(tool.cost * userCount).toFixed(2)}</span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6 bg-gray-50">
                <div className="w-full">
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Herramientas seleccionadas:</span>
                      <span className="font-semibold">{selectedTools.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Número de usuarios:</span>
                      <span className="font-semibold">{userCount}</span>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          {/* Cálculo de costos y alternativas */}
          <div className="lg:col-span-5">
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
                        key={totalMonthlyCost}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      >
                        {totalMonthlyCost.toFixed(2)}
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
                        key={totalYearlyCost}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      >
                        {totalYearlyCost.toFixed(2)}
                      </motion.span>
                    </div>
                    <span className="text-sm text-gray-500">por año</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {selectedTools.length > 0 && (
              <Card className="shadow-md bg-gradient-to-br from-white to-green-50 border-green-200 overflow-hidden">
                <CardHeader className="border-b bg-green-500/10">
                  <CardTitle className="flex items-center gap-2">
                    <Check className="text-green-500" />
                    Alternativas Open Source
                  </
