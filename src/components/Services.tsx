
import { useState } from 'react';
import { Server, Users, Code, Lightbulb, ArrowRight, Check } from 'lucide-react';

const Services = () => {
  const [activeCase, setActiveCase] = useState<'emprendedor' | 'empresa'>('emprendedor');
  
  return (
    <section id="servicios" className="section bg-gradient-to-b from-white to-costwise-gray">
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-costwise-navy mb-4">
            Soluciones adaptadas a tus necesidades
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ofrecemos servicios personalizados según el tamaño y necesidades de cada cliente,
            desde emprendedores hasta empresas ya establecidas.
          </p>
        </div>
        
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-gray-100 rounded-full">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCase === 'emprendedor' 
                  ? 'bg-costwise-blue text-white' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveCase('emprendedor')}
            >
              Emprendedores
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCase === 'empresa' 
                  ? 'bg-costwise-blue text-white' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveCase('empresa')}
            >
              Empresas establecidas
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {activeCase === 'emprendedor' ? (
            <>
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-2xl md:text-3xl font-bold text-costwise-navy">
                  Para emprendedores que buscan reducir costos iniciales
                </h3>
                <p className="text-gray-600">
                  Si estás comenzando tu negocio y buscas optimizar tus gastos en infraestructura
                  tecnológica, tenemos la solución perfecta para ti.
                </p>
                
                <div className="space-y-4 mt-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-costwise-blue/10 p-1 rounded-full">
                      <Check size={16} className="text-costwise-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Configuraciones pre-establecidas</h4>
                      <p className="text-sm text-gray-600">
                        Scripts automáticos que configuran todo tu entorno con las mejores herramientas open source.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-costwise-blue/10 p-1 rounded-full">
                      <Check size={16} className="text-costwise-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Hardware básico asequible</h4>
                      <p className="text-sm text-gray-600">
                        Opciones de hardware económicas pero eficientes para tus servidores locales.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-costwise-blue/10 p-1 rounded-full">
                      <Check size={16} className="text-costwise-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Capacitación básica</h4>
                      <p className="text-sm text-gray-600">
                        Te enseñamos lo esencial para administrar tu infraestructura.
                      </p>
                    </div>
                  </div>
                </div>
                
                <a href="#hardware" className="inline-flex items-center text-costwise-blue font-medium gap-2 mt-4">
                  Ver opciones de hardware <ArrowRight size={16} />
                </a>
              </div>
              
              <div className="relative animate-fade-in">
                <div className="glass-card p-8 rounded-2xl relative z-10">
                  <div className="flex justify-center mb-8">
                    <div className="p-4 bg-costwise-blue/10 rounded-full">
                      <Lightbulb size={32} className="text-costwise-blue" />
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-semibold text-center mb-6">
                    Comienza tu negocio sin gastos excesivos
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Hosting/VPS tradicional</span>
                      <span className="text-gray-800 font-medium">$20-50/mes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Licencias de software</span>
                      <span className="text-gray-800 font-medium">$100-300/mes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Servicios en la nube</span>
                      <span className="text-gray-800 font-medium">$50-150/mes</span>
                    </div>
                    
                    <div className="border-t border-gray-200 my-4"></div>
                    
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-costwise-blue">Solución CostWise</span>
                      <span className="text-costwise-blue">$50-100/mes</span>
                    </div>
                    
                    <div className="bg-costwise-blue/10 p-4 rounded-lg mt-4">
                      <p className="text-sm text-gray-700">
                        Ahorra hasta un <span className="font-semibold">80%</span> en costos mensuales
                        con nuestra solución para emprendedores.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="relative order-2 lg:order-1 animate-fade-in">
                <div className="glass-card p-8 rounded-2xl relative z-10">
                  <div className="flex justify-center mb-8">
                    <div className="p-4 bg-costwise-blue/10 rounded-full">
                      <Server size={32} className="text-costwise-blue" />
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-semibold text-center mb-6">
                    Reduce drásticamente tus costos operativos
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Servicios cloud actuales</span>
                      <span className="text-gray-800 font-medium">$500-2000/mes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Licencias por usuario</span>
                      <span className="text-gray-800 font-medium">$100-250/usuario</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Mantenimiento externo</span>
                      <span className="text-gray-800 font-medium">$200-500/mes</span>
                    </div>
                    
                    <div className="border-t border-gray-200 my-4"></div>
                    
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-costwise-blue">Solución CostWise</span>
                      <span className="text-costwise-blue">$300-800/mes</span>
                    </div>
                    
                    <div className="bg-costwise-blue/10 p-4 rounded-lg mt-4">
                      <p className="text-sm text-gray-700">
                        Reducción del <span className="font-semibold">40-70%</span> en gastos IT totales
                        con nuestras soluciones personalizadas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6 order-1 lg:order-2 animate-fade-in">
                <h3 className="text-2xl md:text-3xl font-bold text-costwise-navy">
                  Para empresas establecidas que buscan optimizar costos
                </h3>
                <p className="text-gray-600">
                  Si ya tienes una empresa en funcionamiento y buscas reducir el gasto en servicios cloud
                  y licencias, ofrecemos soluciones a medida.
                </p>
                
                <div className="space-y-4 mt-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-costwise-blue/10 p-1 rounded-full">
                      <Check size={16} className="text-costwise-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Evaluación personalizada</h4>
                      <p className="text-sm text-gray-600">
                        Analizamos tu infraestructura actual y desarrollamos un plan de migración a medida.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-costwise-blue/10 p-1 rounded-full">
                      <Check size={16} className="text-costwise-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Soluciones escalables</h4>
                      <p className="text-sm text-gray-600">
                        Hardware y software diseñados para crecer con tu empresa.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-costwise-blue/10 p-1 rounded-full">
                      <Check size={16} className="text-costwise-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Capacitación completa y soporte</h4>
                      <p className="text-sm text-gray-600">
                        Entrenamos a tu equipo y ofrecemos soporte continuo para asegurar operaciones fluidas.
                      </p>
                    </div>
                  </div>
                </div>
                
                <a href="#contacto" className="inline-flex items-center text-costwise-blue font-medium gap-2 mt-4">
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
