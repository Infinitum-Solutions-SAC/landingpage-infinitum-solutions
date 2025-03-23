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
        {"name": "Jira", "cost": 7.75, "icon": "https://images.icon-icons.com/2429/PNG/512/jira_logo_icon_147274.png", "details": "Gestión de proyectos ágiles, especialmente para desarrollo de software."},
        {"name": "Trello", "cost": 5, "icon": "/icons-saas/trello.png", "details": "Gestión visual de tareas con tableros Kanban."},
        {"name": "Asana", "cost": 10.99, "icon": "/icons-saas/asana.png", "details": "Gestión de tareas y proyectos con múltiples vistas."},
        {"name": "Microsoft Project", "cost": 10, "icon": "https://images.icon-icons.com/3010/PNG/512/project_office_logo_icon_188518.png", "details": "Herramienta avanzada para planificación y gestión de proyectos complejos."},
        {"name": "Monday.com", "cost": 8, "icon": "/icons-saas/monday.png", "details": "Plataforma flexible para gestionar equipos y flujos de trabajo."}
      ],
      "OpenSource": [
        {"name": "OpenProject", "url": "https://www.openproject.org/", "icon": "/icons-opensource/openproject.png"},
        {"name": "Focalboard", "url": "https://www.focalboard.com/", "icon": "/icons-opensource/focalboard.png"},
        {"name": "Taiga", "url": "https://taiga.io/", "icon": "/icons-opensource/taiga.png"},
        // {"name": "Redmine", "url": "https://www.redmine.org/", "icon": "icon/example.png"},
        // {"name": "ProjectLibre", "url": "https://www.projectlibre.com/", "icon": "icon/example.png"}
      ]
    },
    "Ofimática": {
      "SaaS": [
        {"name": "Microsoft 365", "cost": 6, "icon": "/icons-saas/microsoft365.png", "details": "Suite de ofimática con Word, Excel y PowerPoint en la nube."},
        {"name": "Google Workspace", "cost": 6, "icon": "/icons-saas/googleworkspace.png", "details": "Documentos, hojas de cálculo y presentaciones colaborativas."},
        {"name": "Zoho Office", "cost": 3, "icon": "/icons-saas/zohooffice.png", "details": "Suite de ofimática en la nube para pequeñas empresas."}
      ],
      "OpenSource": [
        {"name": "ONLYOFFICE", "url": "https://www.onlyoffice.com/", "icon": "/icons-opensource/onlyoffice.png"},
        {"name": "Collabora Online (LibreOffice)", "url": "https://www.collaboraoffice.com/", "icon": "/icons-opensource/collabora.png"},
        // {"name": "CryptPad", "url": "https://cryptpad.fr/", "icon": "icon/example.png"}
      ]
    },
    "Acceso Remoto": {
      "SaaS": [
        {"name": "AnyDesk", "cost": 10.99, "icon": "https://images.icon-icons.com/2407/PNG/512/anydesk_icon_146231.png", "details": "Acceso remoto ligero y rápido para escritorios."},
        {"name": "TeamViewer", "cost": 24.90, "icon": "/icons-saas/teamviewer.png", "details": "Software de acceso remoto y colaboración en tiempo real."},
        {"name": "LogMeIn", "cost": 30, "icon": "/icons-saas/logmein.png", "details": "Solución de acceso remoto para soporte y gestión de dispositivos."},
      ],
      "OpenSource": [
        {"name": "Apache Guacamole", "url": "https://guacamole.apache.org/", "icon": "/icons-opensource/guacamole.png"},
        {"name": "xrdp", "url": "https://www.xrdp.org/", "icon": "/icons-opensource/xrdp.png"},
        {"name": "FreeRDP", "url": "https://www.freerdp.com/", "icon": "/icons-opensource/freerdp.png"},
        {"name": "Remmina", "url": "https://remmina.org/", "icon": "/icons-opensource/remmina.png"}
      ]
    },
    "Monitorización y Observabilidad": {
      "SaaS": [
        {"name": "Datadog", "cost": 15, "icon": "/icons-saas/datadog.png", "details": "Monitorización de infraestructura y aplicaciones en la nube."},
        {"name": "New Relic", "cost": 12.50, "icon": "/icons-saas/newrelic.png", "details": "Análisis de rendimiento de aplicaciones en tiempo real."},
        {"name": "Splunk", "cost": 25, "icon": "/icons-saas/splunk.png", "details": "Plataforma para análisis y monitorización de datos masivos."}
      ],
      "OpenSource": [
        {"name": "Grafana", "url": "https://grafana.com/", "icon": "/icons-opensource/grafana.png"},
        {"name": "Prometheus", "url": "https://prometheus.io/", "icon": "/icons-opensource/prometheus.png"},
        {"name": "ELK Stack", "url": "https://www.elastic.co/what-is/elk-stack", "icon": "/icons-opensource/elkstack.png"},
        {"name": "OpenTelemetry", "url": "https://opentelemetry.io/", "icon": "/icons-opensource/opentelemetry.png"}
      ]
    },
    "Comunicación de Equipos": {
      "SaaS": [
        {"name": "Slack", "cost": 12.5, "icon": "/icons-saas/slack.png", "details": "Mensajería en tiempo real para equipos con integraciones."},
        {"name": "Microsoft Teams", "cost": 4, "icon": "/icons-saas/microsoftteams.png", "details": "Colaboración y videoconferencia integrada con Microsoft 365."},
        {"name": "Discord", "cost": 9.99, "icon": "/icons-saas/discord.png", "details": "Comunicación por voz, video y texto, popular en equipos técnicos."}
      ],
      "OpenSource": [
        {"name": "Mattermost", "url": "https://mattermost.com/", "icon": "/icons-opensource/mattermost.png"},
        {"name": "Rocket.Chat", "url": "https://rocket.chat/", "icon": "/icons-opensource/rocketchat.png"},
        {"name": "Zulip", "url": "https://zulip.com/", "icon": "/icons-opensource/zulip.png"},
        {"name": "Element", "url": "https://element.io/", "icon": "/icons-opensource/element.png"}
      ]
    },
    "Almacenamiento y Compartición de Archivos": {
      "SaaS": [
        {"name": "Google Drive", "cost": 1.99, "icon": "/icons-saas/googledrive.png", "details": "Almacenamiento y colaboración en documentos en la nube."},
        {"name": "OneDrive", "cost": 1.99, "icon": "/icons-saas/onedrive.png", "details": "Almacenamiento en la nube integrado con Microsoft 365."},
        {"name": "Dropbox", "cost": 9.99, "icon": "/icons-saas/dropbox.png", "details": "Almacenamiento en la nube y compartición de archivos."},
      ],
      "OpenSource": [
        {"name": "OwnCloud", "url": "https://owncloud.com/", "icon": "/icons-opensource/owncloud.png"},
        {"name": "Nextcloud", "url": "https://nextcloud.com/", "icon": "/icons-opensource/nextcloud.png"},
        {"name": "Seafile", "url": "https://www.seafile.com/", "icon": "/icons-opensource/seafile.png"}
      ]
    },
    "Automatización de Flujos de Trabajo": {
      "SaaS": [
        {"name": "Zapier", "cost": 19.99, "icon": "/icons-saas/zapier.png", "details": "Automatización de integraciones entre aplicaciones web."},
        {"name": "IFTTT", "cost": 2.50, "icon": "/icons-saas/ifttt.png", "details": "Automatización simple para dispositivos y apps."},
        {"name": "Make (Integromat)", "cost": 9, "icon": "/icons-saas/make.png", "details": "Automatización avanzada de flujos de trabajo."}
      ],
      "OpenSource": [
        {"name": "n8n", "url": "https://n8n.io/", "icon": "/icons-opensource/n8n.png"},
        {"name": "Node-RED", "url": "https://nodered.org/", "icon": "/icons-opensource/nodered.png"},
        {"name": "Huginn", "url": "https://github.com/huginn/huginn", "icon": "/icons-opensource/huginn.png"}
      ]
    },
    "Monitorización de Sistemas": {
      "SaaS": [
        {"name": "Pingdom", "cost": 10, "icon": "/icons-saas/pingdom.png", "details": "Monitorización de disponibilidad y rendimiento de sitios web."},
        {"name": "UptimeRobot", "cost": 4.50, "icon": "/icons-saas/uptimerobot.png", "details": "Monitorización de tiempo de actividad de sitios y servidores."}
      ],
      "OpenSource": [
        {"name": "Netdata", "url": "https://www.netdata.cloud/", "icon": "/icons-opensource/netdata.png"},
        {"name": "Zabbix", "url": "https://www.zabbix.com/", "icon": "/icons-opensource/zabbix.png"},
        {"name": "Nagios", "url": "https://www.nagios.org/", "icon": "/icons-opensource/nagios.png"},
        {"name": "Kuma", "url": "https://uptime.kuma.pet/", "icon": "/icons-opensource/kuma.png"}
      ]
    },
    "Soluciones NAS": {
      "SaaS": [
        {"name": "AWS S3", "cost": 5, "icon": "/icons-saas/awss3.png", "details": "Almacenamiento en la nube escalable."},
        {"name": "Google Cloud Storage", "cost": 5, "icon": "/icons-saas/googlecloudstorage.png", "details": "Almacenamiento en la nube de alta disponibilidad."}
      ],
      "OpenSource": [
        {"name": "OpenMediaVault", "url": "https://www.openmediavault.org/", "icon": "/icons-opensource/openmediavault.png"},
        {"name": "FreeNAS", "url": "https://www.freenas.org/", "icon": "/icons-opensource/freenas.png"},
        {"name": "TrueNAS", "url": "https://www.truenas.com/", "icon": "/icons-opensource/truenas.png"},
      ]
    },
    "Analítica Web": {
      "SaaS": [
        {"name": "Google Analytics", "cost": 0, "icon": "/icons-saas/googleanalytics.png", "details": "Análisis gratuito de tráfico y comportamiento web."},
        {"name": "Mixpanel", "cost": 25, "icon": "/icons-saas/mixpanel.png", "details": "Análisis de comportamiento de usuarios en aplicaciones."}
      ],
      "OpenSource": [
        {"name": "Fathom", "url": "https://usefathom.com/", "icon": "/icons-opensource/fathom.png"},
        {"name": "Piwik (Matomo)", "url": "https://matomo.org/", "icon": "/icons-opensource/piwik.png"},
        {"name": "Open Web Analytics", "url": "http://www.openwebanalytics.com/", "icon": "/icons-opensource/openwebanalytics.png"}
      ]
    },
    "CRM y Ventas": {
      "SaaS": [
        {"name": "Salesforce", "cost": 25, "icon": "/icons-saas/salesforce.png", "details": "CRM líder para gestión de ventas y clientes."},
        {"name": "HubSpot", "cost": 18, "icon": "/icons-saas/hubspot.png", "details": "CRM y marketing con plan gratuito y opciones premium."},
        {"name": "Pipedrive", "cost": 14.90, "icon": "/icons-saas/pipedrive.png", "details": "CRM enfocado en ventas y gestión de pipelines."}
      ],
      "OpenSource": [
        {"name": "CiviCRM", "url": "https://civicrm.org/", "icon": "/icons-opensource/civicrm.png"},
        {"name": "SuiteCRM", "url": "https://suitecrm.com/", "icon": "/icons-opensource/suitecrm.png"},
        {"name": "Odoo", "url": "https://www.odoo.com/", "icon": "/icons-opensource/odoo.png"},
      ]
    },
    "Marketing por Email": {
      "SaaS": [
        {"name": "Mailchimp", "cost": 13, "icon": "/icons-saas/mailchimp.png", "details": "Plataforma de email marketing y automatización."},
        {"name": "Constant Contact", "cost": 20, "icon": "/icons-saas/constantcontact.png", "details": "Email marketing para pequeñas empresas."}
      ],
      "OpenSource": [
        {"name": "Listmonk", "url": "https://listmonk.app/", "icon": "/icons-opensource/listmonk.png"},
        {"name": "Mautic", "url": "https://www.mautic.org/", "icon": "/icons-opensource/mautic.png"},
        {"name": "PHPlist", "url": "https://www.phplist.org/", "icon": "/icons-opensource/phplist.png"}
      ]
    },
    "Web Building": {
      "SaaS": [
        {"name": "Webflow", "cost": 12, "icon": "/icons-saas/webflow.png", "details": "Diseño web sin código con control avanzado."},
        {"name": "Wix", "cost": 14, "icon": "/icons-saas/wix.png", "details": "Creador de sitios web fácil para principiantes."}
      ],
      "OpenSource": [
        {"name": "Webstudio", "url": "https://webstudio.is/", "icon": "/icons-opensource/webstudio.png"},
        {"name": "WordPress", "url": "https://wordpress.org/", "icon": "/icons-opensource/wordpress.png"}
      ]
    },
    "Base de Datos No-Code": {
      "SaaS": [
        {"name": "Airtable", "cost": 10, "icon": "/icons-saas/airtable.png", "details": "Base de datos visual y colaborativa sin código."}
      ],
      "OpenSource": [
        {"name": "Rowy", "url": "https://rowy.io/", "icon": "/icons-opensource/rowy.png"},
        {"name": "NocoDB", "url": "https://nocodb.com/", "icon": "/icons-opensource/nocodb.png"}
      ]
    },
    "Solución Backend": {
      "SaaS": [
        {"name": "Firebase", "cost": 5, "icon": "/icons-saas/firebase.png", "details": "Backend como servicio con plan gratuito y uso escalable."},
        {"name": "Supabase", "cost": 5, "icon": "/icons-saas/supabase.png", "details": "Backend open-source con nivel gratuito."}
      ],
      "OpenSource": [
        {"name": "Pocketbase", "url": "https://pocketbase.io/", "icon": "/icons-opensource/pocketbase.png"},
        {"name": "Appwrite", "url": "https://appwrite.io/", "icon": "/icons-opensource/appwrite.png"}
      ]
    },
    "Plataforma de Ventas": {
      "SaaS": [
        {"name": "Shopify", "cost": 29, "icon": "/icons-saas/shopify.png", "details": "Plataforma de comercio electrónico todo en uno."},
        {"name": "WooCommerce", "cost": 5, "icon": "/icons-saas/woocommerce.png", "details": "Plugin de e-commerce para WordPress."}
      ],
      "OpenSource": [
        {"name": "Spree", "url": "https://spreecommerce.org/", "icon": "/icons-opensource/spree.png"},
        {"name": "PrestaShop", "url": "https://prestashop.com/", "icon": "/icons-opensource/prestashop.png"}
      ]
    },
    "Notas": {
      "SaaS": [
        {"name": "Evernote", "cost": 7.99, "icon": "/icons-saas/evernote.png", "details": "Aplicación para tomar notas y organizar ideas."}
      ],
      "OpenSource": [
        {"name": "Notesnook", "url": "https://notesnook.com/", "icon": "/icons-opensource/notesnook.png"},
        {"name": "Joplin", "url": "https://joplinapp.org/", "icon": "/icons-opensource/joplin.png"}
      ]
    },
    "Base de Conocimiento": {
      "SaaS": [
        {"name": "Notion", "cost": 8, "icon": "/icons-saas/notion.png", "details": "Espacio de trabajo todo en uno para notas y wikis."},
        {"name": "Confluence", "cost": 5.75, "icon": "/icons-saas/confluence.png", "details": "Documentación colaborativa para equipos."}
      ],
      "OpenSource": [
        {"name": "Outline", "url": "https://www.getoutline.com/", "icon": "/icons-opensource/outline.png"},
        {"name": "BookStack", "url": "https://www.bookstackapp.com/", "icon": "/icons-opensource/bookstack.png"}
      ]
    },
    "Rastreo de Tiempo": {
      "SaaS": [
        {"name": "RescueTime", "cost": 6, "icon": "/icons-saas/rescuetime.png", "details": "Rastreo automático de tiempo y productividad."},
        {"name": "Toggl Track", "cost": 9, "icon": "/icons-saas/toggltrack.png", "details": "Seguimiento manual de tiempo para equipos."}
      ],
      "OpenSource": [
        {"name": "ActivityWatch", "url": "https://activitywatch.net/", "icon": "/icons-opensource/activitywatch.png"},
        {"name": "Kimai", "url": "https://www.kimai.org/", "icon": "/icons-opensource/kimai.png"}
      ]
    },
    "Gestión de Recursos Humanos": {
      "SaaS": [
        {"name": "BambooHR", "cost": 6, "icon": "/icons-saas/bamboohr.png", "details": "Gestión de RRHH para contratación y datos de empleados."},
        {"name": "Gusto", "cost": 40, "icon": "/icons-saas/gusto.png", "details": "Nóminas y beneficios para pequeñas empresas."}
      ],
      "OpenSource": [
        {"name": "OrangeHRM", "url": "https://www.orangehrm.com/", "icon": "/icons-opensource/orangehrm.png"},
        {"name": "Sentrifugo", "url": "http://www.sentrifugo.com/", "icon": "/icons-opensource/sentrifugo.png"}
      ]
    },
    "Videoconferencia": {
      "SaaS": [
        {"name": "Zoom", "cost": 14.99, "icon": "/icons-saas/zoom.png", "details": "Videoconferencias y webinars para equipos."},
        {"name": "Google Meet", "cost": 6, "icon": "/icons-saas/googlemeet.png", "details": "Videoconferencias integradas con Google Workspace."}
      ],
      "OpenSource": [
        {"name": "Jitsi", "url": "https://jitsi.org/", "icon": "/icons-opensource/jitsi.png"},
        {"name": "BigBlueButton", "url": "https://bigbluebutton.org/", "icon": "/icons-opensource/bigbluebutton.png"}
      ]
    }
  }
};
