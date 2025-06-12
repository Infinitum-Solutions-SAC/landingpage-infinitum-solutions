import { useState } from 'react';
import { Server, Users, Code, Lightbulb, ArrowRight, Check } from 'lucide-react';

const Services = () => {
  const [activeCase, setActiveCase] = useState<'emprendedor' | 'empresa'>('emprendedor');
  
  return (
    <section id="servicios" className="section bg-gradient-to-b from-white to-costwise-gray dark:from-slate-900 dark:to-slate-800">
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-costwise-navy via-costwise-blue to-costwise-teal bg-clip-text text-transparent dark:from-white dark:via-costwise-teal dark:to-costwise-blue mb-4">
            Soluciones adaptadas a tus necesidades
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ofrecemos servicios personalizados según el tamaño y necesidades de cada cliente,
            desde emprendedores hasta empresas ya establecidas.
          </p>
        </div>
        
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-gray-100 dark:bg-slate-700 rounded-full">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCase === 'emprendedor' 
                  ? 'bg-costwise-blue text-white' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveCase('emprendedor')}
            >
              Emprendedores
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCase === 'empresa' 
                  ? 'bg-costwise-blue text-white' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveCase('empresa')}
            >
              Empresas establecidas
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-12 items-center relative">
          {activeCase === 'emprendedor' ? (
            <>
              {/* Imagen decorativa cluster ajustada para móvil */}
              <img
                src="/assets/images/hardware/cluster.webp"
                alt="Cluster hardware"
                className="absolute pointer-events-none opacity-50 max-w-[150px] sm:max-w-xs block drop-shadow-xl rotate-2 sm:rotate-[10deg]"
                style={{ 
                  zIndex: 0,
                  right: '-15px',
                  bottom: '-35px'
                }}
              />
              <div className="space-y-6 animate-fade-in max-w-3xl mx-auto relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-costwise-navy via-costwise-blue to-costwise-teal bg-clip-text text-transparent dark:from-white dark:via-costwise-teal dark:to-costwise-blue">
                  Para emprendedores que buscan reducir costos iniciales
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Si estás comenzando tu negocio y buscas optimizar tus gastos en infraestructura
                  tecnológica, tenemos la solución perfecta para ti.
                </p>
                
                <div className="space-y-4 mt-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-costwise-blue/10 dark:bg-costwise-blue/20 p-1 rounded-full">
                      <Check size={16} className="text-costwise-blue dark:text-costwise-teal" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-100">Configuraciones pre-establecidas</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Scripts automáticos que configuran todo tu entorno con las mejores herramientas open source.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-costwise-blue/10 dark:bg-costwise-blue/20 p-1 rounded-full">
                      <Check size={16} className="text-costwise-blue dark:text-costwise-teal" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-100">Hardware básico asequible</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Opciones de hardware económicas pero eficientes para tus servidores locales.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-costwise-blue/10 dark:bg-costwise-blue/20 p-1 rounded-full">
                      <Check size={16} className="text-costwise-blue dark:text-costwise-teal" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-100">Capacitación básica</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Te enseñamos lo esencial para administrar tu infraestructura.
                      </p>
                    </div>
                  </div>
                </div>
                
                <a href="#hardware" className="inline-flex items-center text-costwise-blue dark:text-costwise-teal font-medium gap-2 mt-4">
                  Ver opciones de hardware <ArrowRight size={16} />
                </a>
              </div>
              
              {/* TARJETA ELIMINADA PARA EMPRENDEDOR */}
            </>
          ) : (
            <>
              {/* TARJETA ELIMINADA PARA EMPRESA */}
              
              <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-costwise-navy via-costwise-blue to-costwise-teal bg-clip-text text-transparent dark:from-white dark:via-costwise-teal dark:to-costwise-blue">
                  Para empresas establecidas que buscan optimizar costos
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Si ya tienes una empresa en funcionamiento y buscas reducir el gasto en servicios cloud
                  y licencias, ofrecemos soluciones a medida.
                </p>
                
                <div className="space-y-4 mt-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-costwise-blue/10 dark:bg-costwise-blue/20 p-1 rounded-full">
                      <Check size={16} className="text-costwise-blue dark:text-costwise-teal" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-100">Evaluación personalizada</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Analizamos tu infraestructura actual y desarrollamos un plan de migración a medida.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-costwise-blue/10 dark:bg-costwise-blue/20 p-1 rounded-full">
                      <Check size={16} className="text-costwise-blue dark:text-costwise-teal" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-100">Soluciones escalables</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Hardware y software diseñados para crecer con tu empresa.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-costwise-blue/10 dark:bg-costwise-blue/20 p-1 rounded-full">
                      <Check size={16} className="text-costwise-blue dark:text-costwise-teal" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-100">Capacitación completa y soporte</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Entrenamos a tu equipo y ofrecemos soporte continuo para asegurar operaciones fluidas.
                      </p>
                    </div>
                  </div>
                </div>
                
                <a href="#contacto" className="inline-flex items-center text-costwise-blue dark:text-costwise-teal font-medium gap-2 mt-4">
                  Solicitar evaluación gratuita <ArrowRight size={16} />
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
