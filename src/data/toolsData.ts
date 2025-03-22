
// Datos de herramientas para la calculadora de costos
export type SaaSTool = {
  name: string;
  cost: number;
  icon: string;
  details?: string;
};

export type OpenSourceTool = {
  name: string;
  url: string;
  icon: string;
};

export type ToolCategory = {
  SaaS: SaaSTool[];
  OpenSource: OpenSourceTool[];
};

export type ToolsData = {
  tools: Record<string, ToolCategory>;
};

// Datos de herramientas
export const toolsData: ToolsData = {
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
