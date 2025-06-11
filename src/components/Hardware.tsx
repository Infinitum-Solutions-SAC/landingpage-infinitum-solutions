import { Server, Cpu, HardDrive, Check, ShieldAlert, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';
import '../styles/hardware-animation.css';

const Hardware = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const hardwareOptions = [
    {
      name: "Configuración Inicial",
      icon: Server,
      price: "Consultar", // Precio actualizado
      description: "Ideal para iniciar con infraestructura local, enfocada en servicios básicos.",
      features: [
        "Nodo único con Proxmox VE",
        "Virtualización de servicios",
        "Hardware simulado: 16GB RAM",
        "Almacenamiento SSD",
        "Soporte básico"
      ],
      recommended: false
    },
    {
      name: "Configuración Segura",
      icon: Cpu, // Podríamos cambiar el icono si es necesario
      price: "Consultar", // Precio actualizado
      description: "Para empresas que requieren mayor seguridad y rendimiento.",
      features: [
        "Firewall dedicado",
        "Nodo de servidor optimizado",
        "Backup gestionado",
        "Soporte estándar"
      ],
      recommended: true
    },
    {
      name: "Alta Disponibilidad",
      icon: HardDrive, // Podríamos cambiar el icono si es necesario
      price: "Consultar", // Precio actualizado
      description: "Solución robusta para continuidad de negocio y cargas críticas.",
      features: [
        "Firewall dedicado",
        "Switch gestionable",
        "Cluster de 2+ nodos (Proxmox VE)",
        "Almacenamiento compartido (opcional)",
        "Soporte prioritario"
      ],
      recommended: false
    },
    { // Nueva opción
      name: "Arquitecturas Avanzadas",
      icon: ShieldAlert, // Nuevo icono
      price: "Personalizado",
      description: "Diseñamos soluciones a medida para alta disponibilidad y requisitos específicos.",
      features: [
        "Consultoría especializada",
        "Diseño de clústeres complejos",
        "Integración con sistemas existentes",
        "Planes de recuperación ante desastres",
        "Soporte premium 24/7"
      ],
      recommended: false
    }
  ];

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % hardwareOptions.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + hardwareOptions.length) % hardwareOptions.length);
  };

  const goToCard = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch handlers for swipe functionality
  const minSwipeDistance = 50; // Minimum distance for a swipe

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touchEnd
    setTouchStart({ 
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({ 
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = Math.abs(touchStart.y - touchEnd.y);
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;
    
    // Solo procesar swipe horizontal si el movimiento es más horizontal que vertical
    if (Math.abs(distanceX) > distanceY) {
      if (isLeftSwipe && currentIndex < hardwareOptions.length - 1) {
        nextCard();
      }
      if (isRightSwipe && currentIndex > 0) {
        prevCard();
      }
    }
  };
  return (
    <section id="hardware" className="section bg-gradient-to-b from-costwise-gray to-white dark:from-slate-800 dark:to-slate-900">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-costwise-navy dark:text-white mb-4">
            Hardware Optimizado para tus Necesidades
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ofrecemos configuraciones de hardware flexibles, desde soluciones básicas hasta sistemas de alta disponibilidad, adaptadas a tu presupuesto y requerimientos.
          </p>
        </div>

        {/* Carrusel para móviles y vista de cuadrícula para escritorio */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hardwareOptions.map((option, index) => (
            <div 
              key={index} 
              className={`relative p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 flex flex-col justify-between animate-fade-in-up bg-white dark:bg-slate-800 ${option.recommended ? 'border-2 border-costwise-blue dark:border-costwise-teal' : 'border border-gray-200 dark:border-slate-700'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {option.recommended && (
                <div className="absolute top-0 right-0 bg-costwise-blue dark:bg-costwise-teal text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  Recomendado
                </div>
              )}
              <div>
                <div className={`p-3 rounded-full inline-block mb-4 ${option.recommended ? 'bg-costwise-blue/10 dark:bg-costwise-teal/20' : 'bg-gray-100 dark:bg-slate-700'}`}>
                  <option.icon size={28} className={option.recommended ? 'text-costwise-blue dark:text-costwise-teal' : 'text-costwise-navy dark:text-gray-300'} />
                </div>
                <h3 className="text-xl font-semibold text-costwise-navy dark:text-white mb-2">{option.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 h-20 overflow-hidden">{option.description}</p>
                <ul className="space-y-2 mb-6">
                  {option.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Check size={16} className="text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                <p className="text-2xl font-bold text-costwise-blue dark:text-costwise-teal mb-4">{option.price}</p>
                <a href="#contacto" className={`w-full text-center px-6 py-3 rounded-lg font-medium transition-colors ${option.recommended ? 'btn-primary' : 'btn-secondary dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white'}`}>
                  Solicitar cotización
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Carrusel para móviles */}
        <div className="md:hidden relative">
          <div 
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide transition-transform duration-300 ease-out"
            ref={scrollContainerRef}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {hardwareOptions.map((option, index) => (
              <div key={index} className="min-w-full snap-center p-2 flex-shrink-0">
                <div className={`relative p-6 rounded-xl shadow-lg flex flex-col justify-between h-full bg-white dark:bg-slate-800 ${option.recommended ? 'border-2 border-costwise-blue dark:border-costwise-teal' : 'border border-gray-200 dark:border-slate-700'}`}>
                  {option.recommended && (
                    <div className="absolute top-0 right-0 bg-costwise-blue dark:bg-costwise-teal text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                      Recomendado
                    </div>
                  )}
                  <div>
                    <div className={`p-3 rounded-full inline-block mb-4 ${option.recommended ? 'bg-costwise-blue/10 dark:bg-costwise-teal/20' : 'bg-gray-100 dark:bg-slate-700'}`}>
                      <option.icon size={28} className={option.recommended ? 'text-costwise-blue dark:text-costwise-teal' : 'text-costwise-navy dark:text-gray-300'} />
                    </div>
                    <h3 className="text-xl font-semibold text-costwise-navy dark:text-white mb-2">{option.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 h-20 overflow-hidden">{option.description}</p>
                    <ul className="space-y-2 mb-6">
                      {option.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <Check size={16} className="text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto">
                    <p className="text-2xl font-bold text-costwise-blue dark:text-costwise-teal mb-4">{option.price}</p>
                    <a href="#contacto" className={`w-full text-center px-6 py-3 rounded-lg font-medium transition-colors ${option.recommended ? 'btn-primary' : 'btn-secondary dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white'}`}>
                      Solicitar cotización
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controles del carrusel */}
          {hardwareOptions.length > 1 && (
            <>
              <button 
                onClick={prevCard} 
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/80 dark:bg-slate-700/80 hover:bg-white dark:hover:bg-slate-700 p-2 rounded-full shadow-md transition-opacity opacity-75 hover:opacity-100 z-10"
                aria-label="Anterior"
              >
                <ChevronLeft size={24} className="text-costwise-blue dark:text-costwise-teal" />
              </button>
              <button 
                onClick={nextCard} 
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white/80 dark:bg-slate-700/80 hover:bg-white dark:hover:bg-slate-700 p-2 rounded-full shadow-md transition-opacity opacity-75 hover:opacity-100 z-10"
                aria-label="Siguiente"
              >
                <ChevronRight size={24} className="text-costwise-blue dark:text-costwise-teal" />
              </button>
            </>
          )}

          {/* Indicadores de puntos */}
          <div className="flex justify-center mt-6 space-x-2">
            {hardwareOptions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToCard(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-costwise-blue dark:bg-costwise-teal scale-125' : 'bg-gray-300 dark:bg-slate-600 hover:bg-gray-400 dark:hover:bg-slate-500'}`}
                aria-label={`Ir a la tarjeta ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hardware;
