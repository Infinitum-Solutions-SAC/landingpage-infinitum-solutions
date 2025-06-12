import { ArrowRight, Server, Database, Shield } from 'lucide-react';
import { usePreloadCriticalResources } from '@/hooks/useOptimizedResources';
// import CLSOptimizedImage from '@/components/ui/cls-optimized-image';

const Hero = () => {
  // Precargar recursos críticos para mejorar LCP
  usePreloadCriticalResources();

  return (
    <section className="pt-20 md:pt-28 pb-12 md:pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-white dark:bg-slate-900 cls-above-the-fold">
      <div className="container-custom px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4 md:space-y-6 animate-fade-in text-center lg:text-left">
            <div className="inline-block bg-costwise-blue/10 dark:bg-costwise-blue/20 text-costwise-blue dark:text-costwise-teal px-3 py-1.5 rounded-full text-sm font-medium">
              Soluciones IT Inteligentes
            </div>
            
            {/* Elemento LCP optimizado con prioridad de carga */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-costwise-navy via-costwise-blue to-costwise-teal bg-clip-text text-transparent dark:from-white dark:via-costwise-teal dark:to-costwise-blue leading-tight">
              Reduce costos con <br className="hidden md:block" />
              <span className="text-costwise-blue dark:text-costwise-teal">infraestructura local</span>
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
              Te ayudamos a optimizar tu gasto en herramientas informáticas, 
              migrando a soluciones locales económicas y efectivas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <a href="#contacto" className="btn-primary flex items-center justify-center gap-2 px-6 py-3">
                Consulta gratis
                <ArrowRight size={18} />
              </a>
              <a href="#calculadora" className="btn-secondary flex items-center justify-center gap-2 px-6 py-3">
                Ver comparación de costos
                {/* Se podría añadir un icono aquí si se desea, ej: <BarChart size={18} /> */}
              </a>
            </div>
            
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto lg:mx-0">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="bg-costwise-blue/10 dark:bg-costwise-blue/20 p-2 rounded-full">
                  <Server size={18} className="text-costwise-blue dark:text-costwise-teal" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Servidores locales</span>
              </div>
              
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="bg-costwise-blue/10 dark:bg-costwise-blue/20 p-2 rounded-full">
                  <Database size={18} className="text-costwise-blue dark:text-costwise-teal" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Open source</span>
              </div>
              
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="bg-costwise-blue/10 dark:bg-costwise-blue/20 p-2 rounded-full">
                  <Shield size={18} className="text-costwise-blue dark:text-costwise-teal" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Soporte 24/7</span>
              </div>
            </div>
          </div>
          
          <div className="relative lg:h-[500px] animate-fade-in mt-8 lg:mt-0">
            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-costwise-blue/5 rounded-full -z-10 animate-float will-change-transform"></div>
            <div className="absolute bottom-0 left-0 w-36 h-36 md:w-48 md:h-48 bg-costwise-teal/5 rounded-full -z-10 animate-float will-change-transform" style={{ animationDelay: '1s' }}></div>
            
            {/* Contenedor con dimensiones explícitas para prevenir CLS */}
            <div className="h-full flex flex-col justify-center items-center relative z-10 animate-fade-in-up">
              <div className="relative w-full max-w-[400px] mx-auto" style={{ aspectRatio: '16/9' }}>
                <img 
                  src="/assets/images/hardware/firewall.webp" 
                  alt="Firewall Hardware Infinitum Solutions" 
                  className="absolute inset-0 w-full h-full object-contain"
                  loading="eager"
                  fetchPriority="high"
                  width="400"
                  height="225"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;