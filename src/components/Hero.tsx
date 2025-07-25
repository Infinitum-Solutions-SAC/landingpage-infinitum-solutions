import { ArrowRight, Server, Database, Shield, Coins } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-24 md:pt-32 pb-12 md:pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-white dark:bg-slate-900 flex flex-col justify-center">
      <div className="container-custom px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-center">
          <div className="space-y-4 md:space-y-6 animate-fade-in text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-costwise-blue/10 dark:bg-costwise-blue/20 text-costwise-blue dark:text-costwise-teal px-3 py-1.5 rounded-full text-sm font-medium">
              <Coins size={16} />
              <span>Ahorra en tus gastos IT</span>
            </div>
            
            {/* Elemento LCP optimizado con prioridad de carga */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-costwise-navy via-costwise-blue to-costwise-teal bg-clip-text text-transparent dark:from-white dark:via-costwise-teal dark:to-costwise-blue leading-tight">
              Tecnología empresarial <br className="hidden md:block" />
              <span className="text-costwise-blue dark:text-costwise-teal">sin costos excesivos</span>
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
              Te ayudamos a reemplazar servicios cloud costosos por soluciones locales Auto-Hospedados, 
              con balanceo de carga para alta disponibilidad y seguridad.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start">
              <a href="#contacto" className="btn-primary flex items-center justify-center gap-2 px-6 py-3 text-lg animate-pulse hover:animate-none">
                ¿Ya tienes hardware o lo necesitas?
                <ArrowRight size={18} />
              </a>
              {/* <a href="#testimonios" className="btn-secondary flex items-center justify-center gap-2 px-6 py-3 text-lg">
                Ver casos de éxito
              </a> */}
            </div>
            
            <div className="pt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:gap-6 max-w-xs sm:max-w-3xl lg:max-w-none mx-auto lg:mx-0">
              <div className="flex items-center gap-2 justify-center lg:justify-start bg-costwise-blue/5 dark:bg-costwise-blue/10 p-2 rounded-lg lg:bg-white lg:dark:bg-slate-800 lg:border lg:border-costwise-blue/20 lg:dark:border-costwise-teal/30 lg:p-4 lg:shadow-sm lg:hover:shadow-md lg:transition-shadow">
                <div className="bg-costwise-blue/10 dark:bg-costwise-blue/20 p-1 rounded-full flex-shrink-0 lg:p-2">
                  <Coins size={14} className="text-costwise-blue dark:text-costwise-teal lg:w-5 lg:h-5" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium text-xs sm:text-sm lg:text-base lg:font-semibold lg:text-costwise-blue lg:dark:text-costwise-teal">Ahorra</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start bg-costwise-blue/5 dark:bg-costwise-blue/10 p-2 rounded-lg lg:bg-white lg:dark:bg-slate-800 lg:border lg:border-costwise-blue/20 lg:dark:border-costwise-teal/30 lg:p-4 lg:shadow-sm lg:hover:shadow-md lg:transition-shadow">
                <div className="bg-costwise-blue/10 dark:bg-costwise-blue/20 p-1 rounded-full flex-shrink-0 lg:p-2">
                  <Shield size={14} className="text-costwise-blue dark:text-costwise-teal lg:w-5 lg:h-5" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium text-xs sm:text-sm lg:text-base lg:font-semibold lg:text-costwise-blue lg:dark:text-costwise-teal">Seguro</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start bg-costwise-blue/5 dark:bg-costwise-blue/10 p-2 rounded-lg lg:bg-white lg:dark:bg-slate-800 lg:border lg:border-costwise-blue/20 lg:dark:border-costwise-teal/30 lg:p-4 lg:shadow-sm lg:hover:shadow-md lg:transition-shadow col-span-2 sm:col-span-1">
                <div className="bg-costwise-blue/10 dark:bg-costwise-blue/20 p-1 rounded-full flex-shrink-0 lg:p-2">
                  <Server size={14} className="text-costwise-blue dark:text-costwise-teal lg:w-5 lg:h-5" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium text-xs sm:text-sm lg:text-base lg:font-semibold lg:text-costwise-blue lg:dark:text-costwise-teal">Control total</span>
              </div>
            </div>
          </div>
          
          <div className="relative lg:h-[500px] animate-fade-in lg:mt-0">
            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-costwise-blue/5 rounded-full -z-10 animate-float will-change-transform"></div>
            <div className="absolute bottom-0 left-0 w-36 h-36 md:w-48 md:h-48 bg-costwise-teal/5 rounded-full -z-10 animate-float will-change-transform" style={{ animationDelay: '1s' }}></div>
            
            {/* Banner destacando ahorro */}
            {/* <div className="absolute -top-4 right-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg z-20 animate-bounce-slow">
              ¡Ahorra miles al año!
            </div> */}
            
            {/* Contenedor con dimensiones explícitas */}
            <div className="h-full flex flex-col justify-center items-center relative z-10 animate-fade-in-up">
              <div className="relative w-full max-w-[400px] mx-auto" style={{ aspectRatio: '16/9' }}>
                <img
                  src="/assets/images/hardware/firewall.webp"
                  alt="Hardware que reduce costos IT - Infinitum Solutions"
                  width={400}
                  height={225}
                  className="absolute inset-0 w-full h-full object-contain"
                  loading="eager"
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