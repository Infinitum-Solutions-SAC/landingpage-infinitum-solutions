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
        {"name": "Jira", "cost": 7.75, "icon": "/assets/images/icons-saas/jira.svg", "details": "Gestión de proyectos ágiles, especialmente para desarrollo de software."},
        {"name": "Trello", "cost": 5, "icon": "/assets/images/icons-saas/trello.svg", "details": "Gestión visual de tareas con tableros Kanban."},
        {"name": "Asana", "cost": 10.99, "icon": "/assets/images/icons-saas/asana.svg", "details": "Gestión de tareas y proyectos con múltiples vistas."},
        {"name": "Microsoft Project", "cost": 10, "icon": "/assets/images/icons-saas/microsoft-project.svg", "details": "Herramienta avanzada para planificación y gestión de proyectos complejos."},
        {"name": "Monday.com", "cost": 8, "icon": "/assets/images/icons-saas/monday.svg", "details": "Plataforma flexible para gestionar equipos y flujos de trabajo."}
      ],
      "OpenSource": [
        {"name": "OpenProject", "url": "https://www.openproject.org/", "icon": "/assets/images/icons-opensource/openproject.svg"},
        {"name": "Focalboard", "url": "https://www.focalboard.com/", "icon": "/assets/images/icons-opensource/focalboard.svg"},
        {"name": "Taiga", "url": "https://taiga.io/", "icon": "/assets/images/icons-opensource/taiga.svg"},
        // {"name": "Redmine", "url": "https://www.redmine.org/", "icon": "/assets/images/icons-opensource/redmine.svg"},
        // {"name": "ProjectLibre", "url": "https://www.projectlibre.com/", "icon": "/assets/images/icons-opensource/projectlibre.svg"}
      ]
    },
    "Ofimática": {
      "SaaS": [
        {"name": "Microsoft 365", "cost": 6, "icon": "/assets/images/icons-saas/microsoft365.svg", "details": "Suite de ofimática con Word, Excel y PowerPoint en la nube."},
        {"name": "Google Workspace", "cost": 6, "icon": "/assets/images/icons-saas/googleworkspace.svg", "details": "Documentos, hojas de cálculo y presentaciones colaborativas."},
        {"name": "Zoho Office", "cost": 3, "icon": "/assets/images/icons-saas/zohooffice.svg", "details": "Suite de ofimática en la nube para pequeñas empresas."}
      ],
      "OpenSource": [
        {"name": "ONLYOFFICE", "url": "https://www.onlyoffice.com/", "icon": "/assets/images/icons-opensource/onlyoffice.svg"},
        {"name": "Collabora Online (LibreOffice)", "url": "https://www.collaboraoffice.com/", "icon": "/assets/images/icons-opensource/collabora.svg"},
        // {"name": "CryptPad", "url": "https://cryptpad.fr/", "icon": "/assets/images/icons-opensource/cryptpad.svg"}
      ]
    },
    "Acceso Remoto": {
      "SaaS": [
        {"name": "AnyDesk", "cost": 10.99, "icon": "/assets/images/icons-saas/anydesk.svg", "details": "Acceso remoto ligero y rápido para escritorios."},
        {"name": "TeamViewer", "cost": 24.90, "icon": "/assets/images/icons-saas/teamviewer.svg", "details": "Software de acceso remoto y colaboración en tiempo real."},
        {"name": "LogMeIn", "cost": 30, "icon": "/assets/images/icons-saas/logmein.svg", "details": "Solución de acceso remoto para soporte y gestión de dispositivos."},
      ],
      "OpenSource": [
        {"name": "Apache Guacamole", "url": "https://guacamole.apache.org/", "icon": "/assets/images/icons-opensource/guacamole.svg"},
        {"name": "xrdp", "url": "https://www.xrdp.org/", "icon": "/assets/images/icons-opensource/xrdp.svg"},
        {"name": "FreeRDP", "url": "https://www.freerdp.com/", "icon": "/assets/images/icons-opensource/freerdp.svg"},
        {"name": "Remmina", "url": "https://remmina.org/", "icon": "/assets/images/icons-opensource/remmina.svg"}
      ]
    },
    "Monitorización y Observabilidad": {
      "SaaS": [
        {"name": "Datadog", "cost": 15, "icon": "/assets/images/icons-saas/datadog.svg", "details": "Monitorización de infraestructura y aplicaciones en la nube."},
        {"name": "New Relic", "cost": 12.50, "icon": "/assets/images/icons-saas/newrelic.svg", "details": "Análisis de rendimiento de aplicaciones en tiempo real."},
        {"name": "Splunk", "cost": 25, "icon": "/assets/images/icons-saas/splunk.svg", "details": "Plataforma para análisis y monitorización de datos masivos."}
      ],
      "OpenSource": [
        {"name": "Grafana", "url": "https://grafana.com/", "icon": "/assets/images/icons-opensource/grafana.svg"},
        {"name": "Prometheus", "url": "https://prometheus.io/", "icon": "/assets/images/icons-opensource/prometheus.svg"},
        {"name": "ELK Stack", "url": "https://www.elastic.co/what-is/elk-stack", "icon": "/assets/images/icons-opensource/elkstack.svg"},
        {"name": "OpenTelemetry", "url": "https://opentelemetry.io/", "icon": "/assets/images/icons-opensource/opentelemetry.svg"}
      ]
    },
    "Comunicación de Equipos": {
      "SaaS": [
        {"name": "Slack", "cost": 8.75, "icon": "/assets/images/icons-saas/slack.svg", "details": "Mensajería en tiempo real para equipos con integraciones."},
        {"name": "Microsoft Teams", "cost": 4, "icon": "/assets/images/icons-saas/microsoftteams.svg", "details": "Colaboración y videoconferencia integrada con Microsoft 365."},
        {"name": "Discord", "cost": 9.99, "icon": "/assets/images/icons-saas/discord.svg", "details": "Comunicación por voz, video y texto, popular en equipos técnicos."}
      ],
      "OpenSource": [
        {"name": "Mattermost", "url": "https://mattermost.com/", "icon": "/assets/images/icons-opensource/mattermost.svg"},
        {"name": "Rocket.Chat", "url": "https://rocket.chat/", "icon": "/assets/images/icons-opensource/rocketchat.svg"},
        {"name": "Zulip", "url": "https://zulip.com/", "icon": "/assets/images/icons-opensource/zulip.svg"},
        {"name": "Element", "url": "https://element.io/", "icon": "/assets/images/icons-opensource/element.svg"}
      ]
    },
    "Almacenamiento y Compartición de Archivos": {
      "SaaS": [
        {"name": "Dropbox", "cost": 9.99, "icon": "/assets/images/icons-saas/dropbox.svg", "details": "Almacenamiento en la nube y compartición de archivos."},
        {"name": "OneDrive", "cost": 1.99, "icon": "/assets/images/icons-saas/onedrive.svg", "details": "Almacenamiento en la nube integrado con Microsoft 365."},
        {"name": "Google Drive", "cost": 1.99, "icon": "/assets/images/icons-saas/googledrive.svg", "details": "Almacenamiento y colaboración en documentos en la nube."},
      ],
      "OpenSource": [
        {"name": "OwnCloud", "url": "https://owncloud.com/", "icon": "/assets/images/icons-opensource/owncloud.svg"},
        {"name": "Nextcloud", "url": "https://nextcloud.com/", "icon": "/assets/images/icons-opensource/nextcloud.svg"},
        {"name": "Seafile", "url": "https://www.seafile.com/", "icon": "/assets/images/icons-opensource/seafile.svg"}
      ]
    },
    "Automatización de Flujos de Trabajo": {
      "SaaS": [
        {"name": "Zapier", "cost": 19.99, "icon": "/assets/images/icons-saas/zapier.svg", "details": "Automatización de integraciones entre aplicaciones web."},
        {"name": "IFTTT", "cost": 2.50, "icon": "/assets/images/icons-saas/ifttt.svg", "details": "Automatización simple para dispositivos y apps."},
        {"name": "Make (Integromat)", "cost": 9, "icon": "/assets/images/icons-saas/make.svg", "details": "Automatización avanzada de flujos de trabajo."}
      ],
      "OpenSource": [
        {"name": "n8n", "url": "https://n8n.io/", "icon": "/assets/images/icons-opensource/n8n.svg"},
        {"name": "Node-RED", "url": "https://nodered.org/", "icon": "/assets/images/icons-opensource/nodered.svg"},
        {"name": "Huginn", "url": "https://github.com/huginn/huginn", "icon": "/assets/images/icons-opensource/huginn.svg"}
      ]
    },
    "Monitorización de Sistemas": {
      "SaaS": [
        {"name": "Pingdom", "cost": 10, "icon": "/assets/images/icons-saas/pingdom.svg", "details": "Monitorización de disponibilidad y rendimiento de sitios web."},
        {"name": "UptimeRobot", "cost": 4.50, "icon": "/assets/images/icons-saas/uptimerobot.svg", "details": "Monitorización de tiempo de actividad de sitios y servidores."}
      ],
      "OpenSource": [
        {"name": "Netdata", "url": "https://www.netdata.cloud/", "icon": "/assets/images/icons-opensource/netdata.svg"},
        {"name": "Zabbix", "url": "https://www.zabbix.com/", "icon": "/assets/images/icons-opensource/zabbix.svg"},
        {"name": "Nagios", "url": "https://www.nagios.org/", "icon": "/assets/images/icons-opensource/nagios.svg"},
        {"name": "Kuma", "url": "https://uptime.kuma.pet/", "icon": "/assets/images/icons-opensource/kuma.svg"}
      ]
    },
    "Soluciones NAS": {
      "SaaS": [
        {"name": "AWS S3", "cost": 5, "icon": "/assets/images/icons-saas/awss3.svg", "details": "Almacenamiento en la nube escalable."},
        {"name": "Google Cloud Storage", "cost": 5, "icon": "/assets/images/icons-saas/googlecloudstorage.svg", "details": "Almacenamiento en la nube de alta disponibilidad."}
      ],
      "OpenSource": [
        {"name": "OpenMediaVault", "url": "https://www.openmediavault.org/", "icon": "/assets/images/icons-opensource/openmediavault.svg"},
        {"name": "FreeNAS", "url": "https://www.freenas.org/", "icon": "/assets/images/icons-opensource/freenas.svg"},
        {"name": "TrueNAS", "url": "https://www.truenas.com/", "icon": "/assets/images/icons-opensource/truenas.svg"},
      ]
    },
    "Analítica Web": {
      "SaaS": [
        {"name": "Mixpanel", "cost": 25, "icon": "/assets/images/icons-saas/mixpanel.svg", "details": "Análisis de comportamiento de usuarios en aplicaciones."},
        {"name": "Google Analytics", "cost": 0, "icon": "/assets/images/icons-saas/googleanalytics.svg", "details": "Análisis gratuito de tráfico y comportamiento web."},
      ],
      "OpenSource": [
        {"name": "Fathom", "url": "https://usefathom.com/", "icon": "/assets/images/icons-opensource/fathom.svg"},
        {"name": "Piwik (Matomo)", "url": "https://matomo.org/", "icon": "/assets/images/icons-opensource/piwik.svg"},
        {"name": "Open Web Analytics", "url": "http://www.openwebanalytics.com/", "icon": "/assets/images/icons-opensource/openwebanalytics.svg"}
      ]
    },
    "CRM y Ventas": {
      "SaaS": [
        {"name": "Salesforce", "cost": 25, "icon": "/assets/images/icons-saas/salesforce.svg", "details": "CRM líder para gestión de ventas y clientes."},
        {"name": "HubSpot", "cost": 18, "icon": "/assets/images/icons-saas/hubspot.svg", "details": "CRM y marketing con plan gratuito y opciones premium."},
        {"name": "Pipedrive", "cost": 14.90, "icon": "/assets/images/icons-saas/pipedrive.svg", "details": "CRM enfocado en ventas y gestión de pipelines."}
      ],
      "OpenSource": [
        {"name": "CiviCRM", "url": "https://civicrm.org/", "icon": "/assets/images/icons-opensource/civicrm.svg"},
        {"name": "SuiteCRM", "url": "https://suitecrm.com/", "icon": "/assets/images/icons-opensource/suitecrm.svg"},
        {"name": "Odoo", "url": "https://www.odoo.com/", "icon": "/assets/images/icons-opensource/odoo.svg"},
      ]
    },
    "Marketing por Email": {
      "SaaS": [
        {"name": "Mailchimp", "cost": 13, "icon": "/assets/images/icons-saas/mailchimp.svg", "details": "Plataforma de email marketing y automatización."},
        {"name": "Constant Contact", "cost": 20, "icon": "/assets/images/icons-saas/constantcontact.svg", "details": "Email marketing para pequeñas empresas."}
      ],
      "OpenSource": [
        {"name": "Listmonk", "url": "https://listmonk.app/", "icon": "/assets/images/icons-opensource/listmonk.svg"},
        {"name": "Mautic", "url": "https://www.mautic.org/", "icon": "/assets/images/icons-opensource/mautic.svg"},
        {"name": "PHPlist", "url": "https://www.phplist.org/", "icon": "/assets/images/icons-opensource/phplist.svg"}
      ]
    },
    "Web Building": {
      "SaaS": [
        {"name": "Webflow", "cost": 12, "icon": "/assets/images/icons-saas/webflow.svg", "details": "Diseño web sin código con control avanzado."},
        {"name": "Wix", "cost": 14, "icon": "/assets/images/icons-saas/wix.svg", "details": "Creador de sitios web fácil para principiantes."}
      ],
      "OpenSource": [
        {"name": "Webstudio", "url": "https://webstudio.is/", "icon": "/assets/images/icons-opensource/webstudio.svg"},
        {"name": "WordPress", "url": "https://wordpress.org/", "icon": "/assets/images/icons-opensource/wordpress.svg"}
      ]
    },
    "Base de Datos No-Code": {
      "SaaS": [
        {"name": "Airtable", "cost": 10, "icon": "/assets/images/icons-saas/airtable.svg", "details": "Base de datos visual y colaborativa sin código."}
      ],
      "OpenSource": [
        {"name": "Rowy", "url": "https://rowy.io/", "icon": "/assets/images/icons-opensource/rowy.svg"},
        {"name": "NocoDB", "url": "https://nocodb.com/", "icon": "/assets/images/icons-opensource/nocodb.svg"}
      ]
    },
    "Solución Backend": {
      "SaaS": [
        {"name": "Firebase", "cost": 5, "icon": "/assets/images/icons-saas/firebase.svg", "details": "Backend como servicio con plan gratuito y uso escalable."},
        {"name": "Supabase", "cost": 5, "icon": "/assets/images/icons-saas/supabase.svg", "details": "Backend open-source con nivel gratuito."}
      ],
      "OpenSource": [
        {"name": "Pocketbase", "url": "https://pocketbase.io/", "icon": "/assets/images/icons-opensource/pocketbase.svg"},
        {"name": "Appwrite", "url": "https://appwrite.io/", "icon": "/assets/images/icons-opensource/appwrite.svg"}
      ]
    },
    "Plataforma de Ventas": {
      "SaaS": [
        {"name": "Shopify", "cost": 29, "icon": "/assets/images/icons-saas/shopify.svg", "details": "Plataforma de comercio electrónico todo en uno."},
        {"name": "WooCommerce", "cost": 5, "icon": "/assets/images/icons-saas/woocommerce.svg", "details": "Plugin de e-commerce para WordPress."}
      ],
      "OpenSource": [
        {"name": "Spree", "url": "https://spreecommerce.org/", "icon": "/assets/images/icons-opensource/spree.svg"},
        {"name": "PrestaShop", "url": "https://prestashop.com/", "icon": "/assets/images/icons-opensource/prestashop.svg"}
      ]
    },
    "Notas": {
      "SaaS": [
        {"name": "Evernote", "cost": 7.99, "icon": "/assets/images/icons-saas/evernote.svg", "details": "Aplicación para tomar notas y organizar ideas."}
      ],
      "OpenSource": [
        {"name": "Notesnook", "url": "https://notesnook.com/", "icon": "/assets/images/icons-opensource/notesnook.svg"},
        {"name": "Joplin", "url": "https://joplinapp.org/", "icon": "/assets/images/icons-opensource/joplin.svg"}
      ]
    },
    "Base de Conocimiento": {
      "SaaS": [
        {"name": "Notion", "cost": 8, "icon": "/assets/images/icons-saas/notion.svg", "details": "Espacio de trabajo todo en uno para notas y wikis."},
        {"name": "Confluence", "cost": 5.75, "icon": "/assets/images/icons-saas/confluence.svg", "details": "Documentación colaborativa para equipos."}
      ],
      "OpenSource": [
        {"name": "Outline", "url": "https://www.getoutline.com/", "icon": "/assets/images/icons-opensource/outline.svg"},
        {"name": "BookStack", "url": "https://www.bookstackapp.com/", "icon": "/assets/images/icons-opensource/bookstack.svg"}
      ]
    },
    "Rastreo de Tiempo": {
      "SaaS": [
        {"name": "RescueTime", "cost": 6, "icon": "/assets/images/icons-saas/rescuetime.svg", "details": "Rastreo automático de tiempo y productividad."},
        {"name": "Toggl Track", "cost": 9, "icon": "/assets/images/icons-saas/toggltrack.svg", "details": "Seguimiento manual de tiempo para equipos."}
      ],
      "OpenSource": [
        {"name": "ActivityWatch", "url": "https://activitywatch.net/", "icon": "/assets/images/icons-opensource/activitywatch.svg"},
        {"name": "Kimai", "url": "https://www.kimai.org/", "icon": "/assets/images/icons-opensource/kimai.svg"}
      ]
    },
    "Gestión de Recursos Humanos": {
      "SaaS": [
        {"name": "BambooHR", "cost": 6, "icon": "/assets/images/icons-saas/bamboohr.svg", "details": "Gestión de RRHH para contratación y datos de empleados."},
        {"name": "Gusto", "cost": 40, "icon": "/assets/images/icons-saas/gusto.svg", "details": "Nóminas y beneficios para pequeñas empresas."}
      ],
      "OpenSource": [
        {"name": "OrangeHRM", "url": "https://www.orangehrm.com/", "icon": "/assets/images/icons-opensource/orangehrm.svg"},
        {"name": "Sentrifugo", "url": "http://www.sentrifugo.com/", "icon": "/assets/images/icons-opensource/sentrifugo.svg"}
      ]
    },
    "Videoconferencia": {
      "SaaS": [
        {"name": "Zoom", "cost": 14.99, "icon": "/assets/images/icons-saas/zoom.svg", "details": "Videoconferencias y webinars para equipos."},
        {"name": "Google Meet", "cost": 6, "icon": "/assets/images/icons-saas/googlemeet.svg", "details": "Videoconferencias integradas con Google Workspace."}
      ],
      "OpenSource": [
        {"name": "Jitsi", "url": "https://jitsi.org/", "icon": "/assets/images/icons-opensource/jitsi.svg"},
        {"name": "BigBlueButton", "url": "https://bigbluebutton.org/", "icon": "/assets/images/icons-opensource/bigbluebutton.svg"}
      ]
    }
  }
};
