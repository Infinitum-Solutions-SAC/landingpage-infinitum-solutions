// Datos de industrias y sus herramientas más comunes
export type IndustryTool = {
  name: string;
  category: string;
  description: string;
  priority: number; // 1-5, donde 5 es más crítico
};

export type Industry = {
  id: string;
  name: string;
  description: string;
  icon: string;
  commonTools: IndustryTool[];
};

export const industriesData: Industry[] = [
  {
    id: "startups-tech",
    name: "Startups & Tech",
    description: "Empresas tecnológicas en crecimiento",
    icon: "🚀",
    commonTools: [
      { name: "Slack", category: "Comunicación", description: "Chat para equipos", priority: 5 },
      { name: "Jira", category: "Gestión de Proyectos", description: "Gestión ágil", priority: 4 },
      { name: "GitHub", category: "Desarrollo", description: "Control de versiones", priority: 5 },
      { name: "Figma", category: "Diseño", description: "Diseño colaborativo", priority: 4 },
      { name: "Google Workspace", category: "Ofimática", description: "Suite de oficina", priority: 3 },
      { name: "HubSpot", category: "CRM", description: "Gestión de clientes", priority: 3 },
      { name: "Zoom", category: "Videoconferencias", description: "Reuniones virtuales", priority: 4 }
    ]
  },
  {
    id: "retail-comercio",
    name: "Retail & Comercio",
    description: "Tiendas y comercio electrónico",
    icon: "🛒",
    commonTools: [
      { name: "Shopify", category: "E-commerce", description: "Tienda online", priority: 5 },
      { name: "Salesforce", category: "CRM", description: "Gestión de ventas", priority: 4 },
      { name: "Mailchimp", category: "Email Marketing", description: "Marketing por email", priority: 4 },
      { name: "QuickBooks", category: "Contabilidad", description: "Contabilidad", priority: 4 },
      { name: "Zendesk", category: "Atención al Cliente", description: "Soporte al cliente", priority: 3 },
      { name: "Google Workspace", category: "Ofimática", description: "Suite de oficina", priority: 3 },
      { name: "Trello", category: "Gestión de Proyectos", description: "Organización de tareas", priority: 2 }
    ]
  },
  {
    id: "servicios-profesionales",
    name: "Servicios Profesionales",
    description: "Consultorías, agencias, bufetes",
    icon: "💼",
    commonTools: [
      { name: "Microsoft 365", category: "Ofimática", description: "Suite de oficina", priority: 5 },
      { name: "Salesforce", category: "CRM", description: "Gestión de clientes", priority: 4 },
      { name: "Asana", category: "Gestión de Proyectos", description: "Gestión de proyectos", priority: 4 },
      { name: "Zoom", category: "Videoconferencias", description: "Reuniones con clientes", priority: 4 },
      { name: "DocuSign", category: "Documentos", description: "Firma electrónica", priority: 3 },
      { name: "QuickBooks", category: "Contabilidad", description: "Contabilidad", priority: 3 },
      { name: "Slack", category: "Comunicación", description: "Chat interno", priority: 2 }
    ]
  },
  {
    id: "educacion",
    name: "Educación",
    description: "Instituciones educativas y e-learning",
    icon: "🎓",
    commonTools: [
      { name: "Google Workspace", category: "Ofimática", description: "Aulas virtuales", priority: 5 },
      { name: "Zoom", category: "Videoconferencias", description: "Clases virtuales", priority: 5 },
      { name: "Canvas", category: "E-learning", description: "Plataforma educativa", priority: 4 },
      { name: "Slack", category: "Comunicación", description: "Comunicación escolar", priority: 3 },
      { name: "Trello", category: "Gestión de Proyectos", description: "Organización académica", priority: 2 },
      { name: "Canva", category: "Diseño", description: "Material educativo", priority: 3 }
    ]
  },
  {
    id: "salud",
    name: "Salud & Medicina",
    description: "Clínicas, hospitales, consultorios",
    icon: "⚕️",
    commonTools: [
      { name: "Microsoft 365", category: "Ofimática", description: "Gestión administrativa", priority: 4 },
      { name: "Salesforce Health Cloud", category: "CRM", description: "Gestión de pacientes", priority: 5 },
      { name: "Zoom", category: "Videoconferencias", description: "Telemedicina", priority: 4 },
      { name: "DocuSign", category: "Documentos", description: "Consentimientos", priority: 3 },
      { name: "Slack", category: "Comunicación", description: "Comunicación médica", priority: 3 },
      { name: "QuickBooks", category: "Contabilidad", description: "Facturación", priority: 2 }
    ]
  },
  {
    id: "manufactura",
    name: "Manufactura",
    description: "Industria manufacturera y producción",
    icon: "🏭",
    commonTools: [
      { name: "Microsoft 365", category: "Ofimática", description: "Gestión administrativa", priority: 4 },
      { name: "Salesforce", category: "CRM", description: "Gestión de clientes", priority: 4 },
      { name: "Microsoft Project", category: "Gestión de Proyectos", description: "Planificación de producción", priority: 4 },
      { name: "AutoCAD", category: "Diseño", description: "Diseño técnico", priority: 5 },
      { name: "Slack", category: "Comunicación", description: "Comunicación de planta", priority: 2 },
      { name: "QuickBooks", category: "Contabilidad", description: "Contabilidad", priority: 3 }
    ]
  }
];

// Función para obtener alternativas open source de las herramientas de una industria
export const getIndustryOpenSourceAlternatives = (industryId: string) => {
  const industry = industriesData.find(ind => ind.id === industryId);
  if (!industry) return [];

  // Mapeo de herramientas SaaS a sus alternativas open source
  const alternativesMap: Record<string, { name: string; url: string; description: string }[]> = {
    "Slack": [
      { name: "Mattermost", url: "https://mattermost.com/", description: "Chat para equipos autoalojado" },
      { name: "Rocket.Chat", url: "https://rocket.chat/", description: "Plataforma de comunicación" }
    ],
    "Jira": [
      { name: "OpenProject", url: "https://www.openproject.org/", description: "Gestión de proyectos" },
      { name: "Taiga", url: "https://taiga.io/", description: "Gestión ágil" }
    ],
    "GitHub": [
      { name: "GitLab", url: "https://gitlab.com/", description: "DevOps completo" },
      { name: "Gitea", url: "https://gitea.io/", description: "Git ligero" }
    ],
    "Figma": [
      { name: "Penpot", url: "https://penpot.app/", description: "Diseño y prototipado" }
    ],
    "Google Workspace": [
      { name: "ONLYOFFICE", url: "https://www.onlyoffice.com/", description: "Suite de oficina" },
      { name: "Nextcloud", url: "https://nextcloud.com/", description: "Colaboración en la nube" }
    ],
    "Microsoft 365": [
      { name: "ONLYOFFICE", url: "https://www.onlyoffice.com/", description: "Suite de oficina" },
      { name: "Collabora Online", url: "https://www.collaboraoffice.com/", description: "LibreOffice online" }
    ],
    "HubSpot": [
      { name: "SuiteCRM", url: "https://suitecrm.com/", description: "CRM completo" },
      { name: "EspoCRM", url: "https://www.espocrm.com/", description: "CRM moderno" }
    ],
    "Salesforce": [
      { name: "SuiteCRM", url: "https://suitecrm.com/", description: "CRM empresarial" },
      { name: "EspoCRM", url: "https://www.espocrm.com/", description: "CRM avanzado" }
    ],
    "Zoom": [
      { name: "Jitsi Meet", url: "https://meet.jit.si/", description: "Videoconferencias" },
      { name: "BigBlueButton", url: "https://bigbluebutton.org/", description: "Educación virtual" }
    ],
    "Trello": [
      { name: "Focalboard", url: "https://www.focalboard.com/", description: "Kanban y tareas" },
      { name: "Wekan", url: "https://wekan.github.io/", description: "Tableros Kanban" }
    ],
    "Asana": [
      { name: "OpenProject", url: "https://www.openproject.org/", description: "Gestión de proyectos" },
      { name: "Taiga", url: "https://taiga.io/", description: "Gestión ágil" }
    ],
    "Shopify": [
      { name: "WooCommerce", url: "https://woocommerce.com/", description: "E-commerce para WordPress" },
      { name: "PrestaShop", url: "https://www.prestashop.com/", description: "Tienda online" }
    ],
    "Mailchimp": [
      { name: "Mautic", url: "https://www.mautic.org/", description: "Marketing automation" },
      { name: "listmonk", url: "https://listmonk.app/", description: "Newsletter y email" }
    ],
    "Zendesk": [
      { name: "Zammad", url: "https://zammad.org/", description: "Sistema de tickets" },
      { name: "OTRS", url: "https://otrs.com/", description: "Service desk" }
    ],
    "QuickBooks": [
      { name: "GnuCash", url: "https://www.gnucash.org/", description: "Contabilidad personal/pequeña empresa" },
      { name: "Akaunting", url: "https://akaunting.com/", description: "Software de contabilidad online" }
    ],
    "DocuSign": [
      { name: "DocuSeal", url: "https://www.docuseal.co/", description: "Firma electrónica" },
      { name: "SignServer", url: "https://www.signserver.org/", description: "Firma digital" }
    ],
    "Canvas": [
      { name: "Moodle", url: "https://moodle.org/", description: "Plataforma de aprendizaje" },
      { name: "Open edX", url: "https://open.edx.org/", description: "Educación online" }
    ],
    "Canva": [
      { name: "Penpot", url: "https://penpot.app/", description: "Diseño gráfico" }
    ],
    "AutoCAD": [
      { name: "FreeCAD", url: "https://www.freecadweb.org/", description: "CAD paramétrico" },
      { name: "LibreCAD", url: "https://librecad.org/", description: "CAD 2D" }
    ],
    "Microsoft Project": [
      { name: "OpenProject", url: "https://www.openproject.org/", description: "Gestión de proyectos" },
      { name: "ProjectLibre", url: "https://www.projectlibre.com/", description: "Planificación de proyectos" }
    ]
  };

  return industry.commonTools.map(tool => ({
    saas: tool,
    alternatives: alternativesMap[tool.name] || []
  })).filter(item => item.alternatives.length > 0);
};
