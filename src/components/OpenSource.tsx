import { useState, useEffect } from 'react';
import { Code, Github, Terminal, Heart, ExternalLink } from 'lucide-react';

const OpenSource = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('opensource-section');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);
  
  const tools = [
    { name: "OPNsense", description: "Firewall & Router", category: "Security", url: "https://opnsense.org/" },
    { name: "Suricata", description: "Network IDS/IPS", category: "Security", url: "https://suricata.io/" },
    { name: "Proxmox", description: "Virtualización", category: "Infrastructure", url: "https://www.proxmox.com/" },
    { name: "Podman", description: "Contenedores", category: "Infrastructure", url: "https://podman.io/" },
    { name: "Nextcloud", description: "Nube Privada", category: "Productivity", url: "https://nextcloud.com/" },
    { name: "OpenProject", description: "Gestión de Proyectos", category: "Productivity", url: "https://www.openproject.org/" },
    { name: "Grafana", description: "Monitoreo & Analytics", category: "Monitoring", url: "https://grafana.com/" },
    { name: "Coolify", description: "PaaS Auto-hospedado", category: "DevOps", url: "https://coolify.io/" },
    { name: "Pangolin Proxy", description: "Proxy Inteligente", category: "Network", url: "https://github.com/fossorial/pangolin-proxy" }
  ];
  
  return (
    <section id="beneficios" className="section bg-gradient-to-b from-costwise-gray to-white dark:from-slate-800 dark:to-slate-900">
      <div className="container-custom" id="opensource-section">
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 bg-gradient-to-r from-costwise-blue/10 to-costwise-teal/10 dark:from-costwise-teal/20 dark:to-costwise-blue/20 text-costwise-blue dark:text-costwise-teal px-6 py-3 rounded-full text-sm font-medium mb-6 border border-costwise-blue/20 dark:border-costwise-teal/30 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}>
            <Heart size={16} className="text-red-500 animate-pulse" />
            <span>💻 Construido con Amor por el Software Libre</span>
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-costwise-navy via-costwise-blue to-costwise-teal bg-clip-text text-transparent dark:from-white dark:via-costwise-teal dark:to-costwise-blue mb-6 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`} style={{ animationDelay: '100ms' }}>
            🚀 Potenciados por Open Source
          </h2>
          
          <p className={`text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`} style={{ animationDelay: '200ms' }}>
            <strong>🏠 Auto-hospedamos</strong> y <strong>🔧 personalizamos</strong> tecnologías de código abierto de clase empresarial.
            Porque creemos que la <span className="text-costwise-blue dark:text-costwise-teal font-semibold">libertad digital</span> y 
            el <span className="text-costwise-blue dark:text-costwise-teal font-semibold">control total</span> de tus datos no deberían ser un lujo.
          </p>
        </div>
      </div>

      {/* Cinta transportadora a ancho completo sin fondo */}
      <div className={`w-full overflow-hidden mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
        <div className="flex animate-scroll-left space-x-6 py-8">
          {/* Primera iteración de herramientas */}
          {tools.map((tool, index) => (
              <a
                key={`first-${tool.name}`}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-shrink-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-costwise-blue/20 dark:border-costwise-teal/20 hover:border-costwise-blue/50 dark:hover:border-costwise-teal/50 hover:scale-105 min-w-[200px] cursor-pointer"
              >
                <div className="text-center">
                  <div className="relative w-12 h-12 mx-auto mb-3">
                    <div className="w-full h-full bg-gradient-to-br from-costwise-blue/20 to-costwise-teal/20 dark:from-costwise-teal/30 dark:to-costwise-blue/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Code size={20} className="text-costwise-blue dark:text-costwise-teal" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-costwise-blue/80 dark:bg-costwise-teal/80 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink size={10} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-1 group-hover:text-costwise-blue dark:group-hover:text-costwise-teal transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {tool.description}
                  </p>
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-costwise-blue/10 dark:bg-costwise-teal/20 text-costwise-blue dark:text-costwise-teal rounded-full">
                    {tool.category}
                  </span>
                </div>
              </a>
          ))}
          
          {/* Segunda iteración para continuidad */}
          {tools.map((tool, index) => (
              <a
                key={`second-${tool.name}`}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-shrink-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-costwise-blue/20 dark:border-costwise-teal/20 hover:border-costwise-blue/50 dark:hover:border-costwise-teal/50 hover:scale-105 min-w-[200px] cursor-pointer"
              >
                <div className="text-center">
                  <div className="relative w-12 h-12 mx-auto mb-3">
                    <div className="w-full h-full bg-gradient-to-br from-costwise-blue/20 to-costwise-teal/20 dark:from-costwise-teal/30 dark:to-costwise-blue/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Code size={20} className="text-costwise-blue dark:text-costwise-teal" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-costwise-blue/80 dark:bg-costwise-teal/80 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink size={10} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-1 group-hover:text-costwise-blue dark:group-hover:text-costwise-teal transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {tool.description}
                  </p>
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-costwise-blue/10 dark:bg-costwise-teal/20 text-costwise-blue dark:text-costwise-teal rounded-full">
                    {tool.category}
                  </span>
                </div>
              </a>
          ))}
        </div>
      </div>

      <div className="container-custom">
        <div className="bg-gradient-to-br from-costwise-blue/5 via-white to-costwise-teal/5 dark:from-costwise-teal/10 dark:via-slate-800 dark:to-costwise-blue/10 p-8 rounded-3xl border border-costwise-blue/20 dark:border-costwise-teal/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '800ms' }}>
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-costwise-blue/10 to-costwise-teal/10 dark:from-costwise-teal/20 dark:to-costwise-blue/20 text-costwise-blue dark:text-costwise-teal px-6 py-3 rounded-full text-sm font-medium border border-costwise-blue/30 dark:border-costwise-teal/40">
                <Github size={16} />
                <span>🌟 Filosofía Open Source</span>
              </div>
              
              <h3 className="text-3xl font-bold bg-gradient-to-r from-costwise-navy to-costwise-blue bg-clip-text text-transparent dark:from-white dark:to-costwise-teal">
                🏠 Auto-hospedamos por Principio
              </h3>
              
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>💪 Independencia tecnológica:</strong> No dependemos de gigantes tecnológicos. 
                  Nuestros servidores, nuestras reglas, tus datos seguros.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>🔧 Personalización total:</strong> Adaptamos cada herramienta a tus necesidades específicas, 
                  porque creemos que no hay soluciones universales.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>🤝 Retribuimos a la comunidad:</strong> El 5% de nuestros ingresos se destinan a 
                  contribuir y mantener proyectos de software libre.
                </p>
              </div>
              
              <div className="pt-4">
                <a href="#contacto" className="inline-flex items-center gap-2 bg-gradient-to-r from-costwise-blue to-costwise-teal text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <Heart size={16} className="text-red-200" />
                  Ve nuestras contribuciones
                </a>
              </div>
            </div>
            
            <div className={`relative ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1000ms' }}>
              <div className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm border border-costwise-blue/20 dark:border-costwise-teal/30 p-8 rounded-2xl shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-gradient-to-br from-costwise-blue/20 to-costwise-teal/20 dark:from-costwise-teal/30 dark:to-costwise-blue/30 rounded-2xl">
                    <Terminal size={24} className="text-costwise-blue dark:text-costwise-teal" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-costwise-navy dark:text-white">🎯 Ventajas del Auto-hospedaje</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Más allá del ahorro económico</p>
                  </div>
                </div>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="mt-1 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white text-sm font-bold">🔐</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">Control total de tus datos</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Tus datos nunca salen de tu infraestructura</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white text-sm font-bold">🚀</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">Rendimiento optimizado</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Hardware dedicado, latencia mínima</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white text-sm font-bold">🛡️</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">Seguridad por diseño</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Auditabilidad completa del código</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white text-sm font-bold">💰</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">Costos predecibles</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Sin licencias por usuario ni límites artificiales</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white text-sm font-bold">🌍</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">Comunidad global</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Soporte y mejoras continuas</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
