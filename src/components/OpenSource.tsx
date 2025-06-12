import { useState, useEffect } from 'react';
import { Heart, Lock, DollarSign, Star, CheckCircle, Search, Server, Code, Shield } from 'lucide-react';

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
  
  // Alternativas simplificadas de software comercial a open source
  const alternativas = [
    { 
      saasTool: "Microsoft Office 365", 
      openSource: "LibreOffice / OnlyOffice", 
      savings: "Hasta $150 por usuario al año",
      benefits: ["Sin suscripciones", "Funcionalidad similar", "Compatible con archivos de Office"]
    },
    { 
      saasTool: "Dropbox Business", 
      openSource: "Nextcloud", 
      savings: "Hasta $180 por usuario al año",
      benefits: ["Control total de tus archivos", "Sin límites de almacenamiento", "Más funcionalidades"]
    },
    { 
      saasTool: "Slack", 
      openSource: "Mattermost", 
      savings: "Hasta $96 por usuario al año",
      benefits: ["Comunicación segura", "Personalizable", "Control de datos"]
    }
  ];
  
  return (
    <section id="beneficios" className="section bg-gradient-to-b from-costwise-gray to-white dark:from-slate-800 dark:to-slate-900">
      <div className="container-custom" id="opensource-section">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 bg-gradient-to-r from-costwise-blue/10 to-costwise-teal/10 dark:from-costwise-teal/20 dark:to-costwise-blue/20 text-costwise-blue dark:text-costwise-teal px-6 py-3 rounded-full text-sm font-medium mb-6 border border-costwise-blue/20 dark:border-costwise-teal/30 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}>
            <Heart size={16} className="text-red-500 animate-pulse" />
            <span>Software que te da libertad</span>
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-costwise-navy via-costwise-blue to-costwise-teal bg-clip-text text-transparent dark:from-white dark:via-costwise-teal dark:to-costwise-blue mb-6 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`} style={{ animationDelay: '100ms' }}>
            Alternativas libres a servicios costosos
          </h2>
          
          <p className={`text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`} style={{ animationDelay: '200ms' }}>
            Utilizamos software libre y de código abierto para reemplazar servicios de suscripción caros.
            Son completamente auditables, sin restricciones de licencias y pueden funcionar en tu hardware existente.
          </p>
        </div>

        {/* Comparativa simplificada de costos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {alternativas.map((item, index) => (
            <div 
              key={index}
              className={`bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-xl mb-1">
                    {item.saasTool}
                  </h3>
                  <p className="text-costwise-blue dark:text-costwise-teal">
                    Reemplazado por: <span className="font-semibold">{item.openSource}</span>
                  </p>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign size={20} className="text-green-500" />
                  <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {item.savings}
                  </span>
                </div>
                
                <ul className="space-y-2 mb-4 flex-grow">
                  {item.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-costwise-blue dark:text-costwise-teal mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-costwise-blue/5 via-white to-costwise-teal/5 dark:from-costwise-teal/10 dark:via-slate-800 dark:to-costwise-blue/10 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-costwise-blue/20 dark:border-costwise-teal/30 shadow-xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-costwise-navy dark:text-white mb-4">¿Por qué elegir software libre?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-costwise-blue/20 dark:bg-costwise-teal/30 p-2 rounded-full mt-1">
                    <Search size={18} className="text-costwise-blue dark:text-costwise-teal" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">100% Auditable</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">El código fuente está disponible para inspección, asegurando transparencia total y cumplimiento normativo.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-costwise-blue/20 dark:bg-costwise-teal/30 p-2 rounded-full mt-1">
                    <Lock size={18} className="text-costwise-blue dark:text-costwise-teal" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Mayor privacidad y seguridad</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Tus datos permanecen en tu infraestructura, no en servidores de terceros.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-costwise-blue/20 dark:bg-costwise-teal/30 p-2 rounded-full mt-1">
                    <DollarSign size={18} className="text-costwise-blue dark:text-costwise-teal" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Sin costos recurrentes</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Elimina suscripciones mensuales que aumentan cada año.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-md">
              <h3 className="text-xl font-semibold text-costwise-navy dark:text-white mb-4 text-center">¿Cuánto puedes ahorrar?</h3>
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="text-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Para una empresa de 25 empleados</span>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 my-2">$10,700+ al año</div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">de ahorro promedio</span>
                  </div>
                </div>
                <a href="#contacto" className="btn-primary w-full py-3 text-center flex items-center justify-center gap-2">
                  Calcular mi ahorro personalizado
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calculator">
                    <rect x="4" y="3" width="16" height="18" rx="2"/>
                    <line x1="8" x2="16" y1="7" y2="7"/>
                    <line x1="8" x2="9" y1="12" y2="12"/>
                    <line x1="16" x2="16" y1="12" y2="12"/>
                    <line x1="8" x2="9" y1="17" y2="17"/>
                    <line x1="16" x2="16" y1="17" y2="17"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Nueva sección sobre reutilización de hardware */}
        <div className="bg-costwise-blue/5 dark:bg-costwise-teal/5 p-6 md:p-8 rounded-2xl border border-costwise-blue/20 dark:border-costwise-teal/20">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="md:w-7/12">
              <h3 className="text-2xl font-bold text-costwise-navy dark:text-white mb-3">¿Ya tienes equipos? ¡Aprovéchalos!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                No siempre necesitas invertir en hardware nuevo. Evaluamos tus equipos existentes para 
                transformarlos en servidores productivos y reducir aún más tus costos.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Evaluación técnica sin costo</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Optimización para máximo rendimiento</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Recomendaciones de actualización si es necesario</span>
                </li>
              </ul>
              <div className="mt-6">
                <a href="#contacto" className="inline-flex items-center gap-2 text-costwise-blue dark:text-costwise-teal hover:underline">
                  Solicitar evaluación de equipos
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="md:w-5/12 flex justify-center">
              <div className="grid grid-cols-2 gap-3 relative">
                <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-md rotate-[-3deg]">
                  <Server size={40} className="text-costwise-blue dark:text-costwise-teal mx-auto" />
                  <p className="text-center text-sm mt-2">PC convertida a servidor</p>
                </div>
                <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-md rotate-[3deg]">
                  <Shield size={40} className="text-costwise-blue dark:text-costwise-teal mx-auto" />
                  <p className="text-center text-sm mt-2">Firewall dedicado</p>
                </div>
                <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-md rotate-[3deg] col-span-2">
                  <Code size={40} className="text-costwise-blue dark:text-costwise-teal mx-auto" />
                  <p className="text-center text-sm mt-2">Software optimizado para tu hardware</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
