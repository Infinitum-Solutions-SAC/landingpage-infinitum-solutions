
import { ArrowRight, Server, Database, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block bg-costwise-blue/10 text-costwise-blue px-4 py-2 rounded-full text-sm font-medium">
              Soluciones IT Inteligentes
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-costwise-navy leading-tight">
              Reduce costos con <br />
              <span className="text-costwise-blue">infraestructura local</span>
            </h1>
            
            <p className="text-lg text-gray-600 md:pr-12 max-w-xl">
              Te ayudamos a optimizar tu gasto en herramientas informáticas, 
              migrando a soluciones locales económicas y efectivas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#contacto" className="btn-primary flex items-center justify-center gap-2">
                Consulta gratis
                <ArrowRight size={18} />
              </a>
              <a href="#comparacion" className="btn-secondary flex items-center justify-center">
                Ver comparación de costos
              </a>
            </div>
            
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-costwise-blue/10 p-2 rounded-full">
                  <Server size={18} className="text-costwise-blue" />
                </div>
                <span className="text-gray-700 font-medium">Servidores locales</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-costwise-blue/10 p-2 rounded-full">
                  <Database size={18} className="text-costwise-blue" />
                </div>
                <span className="text-gray-700 font-medium">Open source</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-costwise-blue/10 p-2 rounded-full">
                  <Shield size={18} className="text-costwise-blue" />
                </div>
                <span className="text-gray-700 font-medium">Soporte 24/7</span>
              </div>
            </div>
          </div>
          
          <div className="relative lg:h-[500px] animate-fade-in">
            <div className="absolute top-0 right-0 w-64 h-64 bg-costwise-blue/5 rounded-full -z-10 animate-float"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-costwise-teal/5 rounded-full -z-10 animate-float" style={{ animationDelay: '1s' }}></div>
            
            <div className="glass-card p-8 rounded-2xl h-full flex flex-col justify-center relative z-10 animate-fade-in-up">
              <div className="absolute -top-5 -right-5 bg-costwise-blue/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <div className="text-2xl font-bold text-costwise-blue mb-1">60%</div>
                <div className="text-sm text-gray-600 whitespace-nowrap">reducción en costos IT</div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Antes</span>
                  <span className="text-sm font-medium">$1,200/mes</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-400 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Con CostWise</span>
                  <span className="text-sm font-medium">$480/mes</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-costwise-blue rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-10">
                <div>
                  <div className="text-3xl font-bold text-costwise-navy">80%</div>
                  <div className="text-sm text-gray-600">Ahorro en licencias</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-costwise-navy">50%</div>
                  <div className="text-sm text-gray-600">Menos tiempo inactivo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
