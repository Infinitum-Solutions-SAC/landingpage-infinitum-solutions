
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
import { DollarSign, ArrowRight, Check, ArrowDown } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import FloatingIcons from "./FloatingIcons";

type ToolCategory = {
  SaaS: { name: string; icon: string }[];
  OpenSource: { name: string; url: string; icon: string }[];
};

type ToolsData = {
  tools: Record<string, ToolCategory>;
};

// Datos de herramientas
const toolsData: ToolsData = {
  tools: {
    "Gestión de Proyectos": {
      "SaaS": [
        {"name": "Microsoft Project", "icon": "icon/example.png"},
        {"name": "Jira", "icon": "icon/example.png"},
        {"name": "Trello", "icon": "icon/example.png"},
        {"name": "Asana", "icon": "icon/example.png"},
        {"name": "Monday.com", "icon": "icon/example.png"}
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
        {"name": "LogMeIn", "icon": "icon/example.png"},
        {"name": "TeamViewer", "icon": "icon/example.png"},
        {"name": "AnyDesk", "icon": "icon/example.png"}
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
        {"name": "Datadog", "icon": "icon/example.png"},
        {"name": "New Relic", "icon": "icon/example.png"},
        {"name": "Splunk", "icon": "icon/example.png"}
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
        {"name": "Slack", "icon": "icon/example.png"},
        {"name": "Microsoft Teams", "icon": "icon/example.png"},
        {"name": "Discord", "icon": "icon/example.png"}
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
        {"name": "Dropbox", "icon": "icon/example.png"},
        {"name": "Google Drive", "icon": "icon/example.png"},
        {"name": "OneDrive", "icon": "icon/example.png"}
      ],
      "OpenSource": [
        {"name": "OwnCloud", "url": "https://owncloud.com/", "icon": "icon/example.png"},
        {"name": "Nextcloud", "url": "https://nextcloud.com/", "icon": "icon/example.png"},
        {"name": "Seafile", "url": "https://www.seafile.com/", "icon": "icon/example.png"}
      ]
    },
    "Automatización de Flujos de Trabajo": {
      "SaaS": [
        {"name": "Zapier", "icon": "icon/example.png"},
        {"name": "IFTTT", "icon": "icon/example.png"},
        {"name": "Make (Integromat)", "icon": "icon/example.png"}
      ],
      "OpenSource": [
        {"name": "n8n", "url": "https://n8n.io/", "icon": "icon/example.png"},
        {"name": "Node-RED", "url": "https://nodered.org/", "icon": "icon/example.png"},
        {"name": "Huginn", "url": "https://github.com/huginn/huginn", "icon": "icon/example.png"}
      ]
    },
    "Monitorización de Sistemas": {
      "SaaS": [
        {"name": "Pingdom", "icon": "icon/example.png"},
        {"name": "UptimeRobot", "icon": "icon/example.png"}
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
        {"name": "AWS S3", "icon": "icon/example.png"},
        {"name": "Google Cloud Storage", "icon": "icon/example.png"}
      ],
      "OpenSource": [
        {"name": "OpenMediaVault", "url": "https://www.openmediavault.org/", "icon": "icon/example.png"},
        {"name": "TrueNAS", "url": "https://www.truenas.com/", "icon": "icon/example.png"},
        {"name": "FreeNAS", "url": "https://www.freenas.org/", "icon": "icon/example.png"}
      ]
    },
    "Analítica Web": {
      "SaaS": [
        {"name": "Google Analytics", "icon": "icon/example.png"},
        {"name": "Mixpanel", "icon": "icon/example.png"}
      ],
      "OpenSource": [
        {"name": "Fathom", "url": "https://usefathom.com/", "icon": "icon/example.png"},
        {"name": "Piwik (Matomo)", "url": "https://matomo.org/", "icon": "icon/example.png"},
        {"name": "Open Web Analytics", "url": "http://www.openwebanalytics.com/", "icon": "icon/example.png"}
      ]
    },
    "CRM y Ventas": {
      "SaaS": [
        {"name": "Salesforce", "icon": "icon/example.png"},
        {"name": "HubSpot", "icon": "icon/example.png"},
        {"name": "Pipedrive", "icon": "icon/example.png"}
      ],
      "OpenSource": [
        {"name": "Odoo", "url": "https://www.odoo.com/", "icon": "icon/example.png"},
        {"name": "CiviCRM", "url": "https://civicrm.org/", "icon": "icon/example.png"},
        {"name": "SuiteCRM", "url": "https://suitecrm.com/", "icon": "icon/example.png"}
      ]
    },
    "Marketing por Email": {
      "SaaS": [
        {"name": "Mailchimp", "icon": "icon/example.png"},
        {"name": "Constant Contact", "icon": "icon/example.png"}
      ],
      "OpenSource": [
        {"name": "Listmonk", "url": "https://listmonk.app/", "icon": "icon/example.png"},
        {"name": "Mautic", "url": "https://www.mautic.org/", "icon": "icon/example.png"},
        {"name": "PHPlist", "url": "https://www.phplist.org/", "icon": "icon/example.png"}
      ]
    },
    "Web Building": {
      "SaaS": [
        {"name": "Webflow", "icon": "icon/example.png"},
        {"name": "Wix", "icon": "icon/example.png"}
      ],
      "OpenSource": [
        {"name": "Webstudio", "url": "https://webstudio.is/", "icon": "icon/example.png"},
        {"name": "WordPress", "url": "https://wordpress.org/", "icon": "icon/example.png"}
      ]
    },
    "Base de Datos No-Code": {
      "SaaS": [
        {"name": "Airtable", "icon": "icon/example.png"}
      ],
      "OpenSource": [
        {"name": "Rowy", "url": "https://rowy.io/", "icon": "icon/example.png"},
        {"name": "NocoDB", "url": "https://nocodb.com/", "icon": "icon/example.png"}
      ]
    },
    "Solución Backend": {
      "SaaS": [
        {"name": "Firebase", "icon": "icon/example.png"},
        {"name": "Supabase", "icon": "icon/example.png"}
      ],
      "OpenSource": [
        {"name": "Pocketbase", "url": "https://pocketbase.io/", "icon": "icon/example.png"},
        {"name": "Appwrite", "url": "https://appwrite.io/", "icon": "icon/example.png"}
      ]
    },
    "Plataforma de Ventas": {
      "SaaS": [
        {"name": "Shopify", "icon": "icon/example.png"},
        {"name": "WooCommerce", "icon": "icon/example.png"}
      ],
      "OpenSource": [
        {"name": "Spree", "url": "https://spreecommerce.org/", "icon": "icon/example.png"},
        {"name": "PrestaShop", "url": "https://prestashop.com/", "icon": "icon/example.png"}
      ]
    },
    "Notas": {
      "SaaS": [
        {"name": "Evernote", "icon": "icon/example.png"}
      ],
      "OpenSource": [
        {"name": "Notesnook", "url": "https://notesnook.com/", "icon": "icon/example.png"},
        {"name": "Joplin", "url": "https://joplinapp.org/", "icon": "icon/example.png"}
      ]
    },
    "Base de Conocimiento": {
      "SaaS": [
        {"name": "Notion", "icon": "icon/example.png"},
        {"name": "Confluence", "icon": "icon/example.png"}
      ],
      "OpenSource": [
        {"name": "Outline", "url": "https://www.getoutline.com/", "icon": "icon/example.png"},
        {"name": "BookStack", "url": "https://www.bookstackapp.com/", "icon": "icon/example.png"}
      ]
    },
    "Rastreo de Tiempo": {
      "SaaS": [
        {"name": "RescueTime", "icon": "icon/example.png"},
        {"name": "Toggl Track", "icon": "icon/example.png"}
      ],
      "OpenSource": [
        {"name": "ActivityWatch", "url": "https://activitywatch.net/", "icon": "icon/example.png"},
        {"name": "Kimai", "url": "https://www.kimai.org/", "icon": "icon/example.png"}
      ]
    },
    "Gestión de Recursos Humanos": {
      "SaaS": [
        {"name": "BambooHR", "icon": "icon/example.png"},
        {"name": "Gusto", "icon": "icon/example.png"}
      ],
      "OpenSource": [
        {"name": "OrangeHRM", "url": "https://www.orangehrm.com/", "icon": "icon/example.png"},
        {"name": "Sentrifugo", "url": "http://www.sentrifugo.com/", "icon": "icon/example.png"}
      ]
    },
    "Videoconferencia": {
      "SaaS": [
        {"name": "Zoom", "icon": "icon/example.png"},
        {"name": "Google Meet", "icon": "icon/example.png"}
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
  const [pricePerUser] = useState<number>(6); // $6 por usuario según especificaciones
  const [showSavings, setShowSavings] = useState<boolean>(false);
  
  // Calcular costos totales
  const totalMonthlyCost = selectedTools.length * userCount * pricePerUser;
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
    const allTools: { name: string; icon: string }[] = [];
    Object.values(toolsData.tools).forEach(category => {
      category.SaaS.forEach(tool => {
        allTools.push(tool);
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
                  <Label className="text-base font-medium">Categoría de herramientas</Label>
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
                            className={`flex items-center space-x-3 p-3 rounded-md border cursor-pointer transition-colors ${
                              selectedTools.includes(tool.name) 
                                ? 'border-primary bg-primary/10' 
                                : 'border-gray-200 hover:border-primary/50'
                            }`}
                            onClick={() => handleToolToggle(tool.name)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Checkbox 
                              checked={selectedTools.includes(tool.name)}
                              onCheckedChange={() => handleToolToggle(tool.name)}
                            />
                            <span className="font-medium">{tool.name}</span>
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
                        {totalMonthlyCost.toLocaleString()}
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
                        {totalYearlyCost.toLocaleString()}
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
                  </CardTitle>
                  <CardDescription>
                    Opciones gratuitas para reemplazar tus herramientas actuales
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <AnimatePresence>
                      {Object.entries(openSourceAlternatives).map(([category, items]) => (
                        <motion.div 
                          key={category} 
                          className="space-y-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <h4 className="font-medium text-lg text-costwise-navy">{category}</h4>
                          {items.map((item, index) => (
                            <motion.div 
                              key={index} 
                              className="border rounded-lg p-4 bg-white"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="flex justify-between items-center mb-3">
                                <div className="font-medium">{item.saas.name}</div>
                                <ArrowRight className="h-4 w-4 text-gray-400" />
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {item.alternatives.slice(0, 2).map((alt, altIndex) => (
                                  <a 
                                    key={altIndex} 
                                    href={alt.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm px-3 py-2 rounded-md bg-green-50 text-green-700 hover:bg-green-100 transition-colors flex items-center justify-between"
                                  >
                                    {alt.name}
                                    <Check className="h-4 w-4" />
                                  </a>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    <div className="flex justify-center pt-4">
                      <motion.div 
                        className="p-4 bg-green-50 rounded-lg text-center w-full"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ 
                          opacity: showSavings ? 1 : 0, 
                          scale: showSavings ? 1 : 0.9,
                          y: showSavings ? [20, 0] : 20 
                        }}
                        transition={{ 
                          duration: 0.5,
                          type: "spring",
                          stiffness: 200,
                          damping: 15
                        }}
                      >
                        <div className="flex flex-col items-center">
                          <ArrowDown className="h-8 w-8 text-green-500 mb-2 animate-bounce" />
                          <p className="font-semibold text-green-700">Ahorro potencial anual</p>
                          <div className="text-3xl font-bold text-green-600 mt-1">
                            ${totalYearlyCost.toLocaleString()}
                          </div>
                          <p className="text-sm text-green-600 mt-1">¡100% de reducción de costos!</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostCalculator;
