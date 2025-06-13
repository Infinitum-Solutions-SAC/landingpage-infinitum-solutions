import { useState, useEffect, useRef } from 'react';
import { Shield, Coins, Lock, Clock, Zap, Heart } from 'lucide-react';
import '../styles/benefits-animation.css';

const Benefits = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [centerCards, setCenterCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
   const benefits = [
    {
      title: "Ahorra hasta un 70%",
      description: "Reduce drásticamente tu gasto mensual en servicios cloud sin perder funcionalidades",
      icon: Coins,
      delay: 100
    },
    {
      title: "Control total de tus datos",
      description: "Información confidencial en tus servidores, sin terceros, sin sorpresas",
      icon: Lock,
      delay: 200
    },
    {
      title: "Soporte personalizado",
      description: "Asistencia directa con técnicos que conocen tu entorno específico",
      icon: Heart,
      delay: 300
    },
    {
      title: "Mayor seguridad",
      description: "Soluciones robustas que protegen tu empresa de amenazas externas",
      icon: Shield,
      delay: 400
    },
    {
      title: "Mejor rendimiento",
      description: "Velocidad superior sin depender de conexiones a internet lentas",
      icon: Zap,
      delay: 500
    },
    {
      title: "Disponibilidad 24/7",
      description: "Tu infraestructura siempre funciona, incluso sin internet",
      icon: Clock,
      delay: 600
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('benefits-section');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Observer para detectar tarjetas en el centro de la pantalla (solo en móviles)
  useEffect(() => {
    if (!isVisible) return;

    // Solo activar el efecto en móviles
    const isMobile = () => window.innerWidth < 768;
    
    if (!isMobile()) {
      // En desktop/tablet, limpiar cualquier estado de centro
      setCenterCards(new Set());
      return;
    }

    const centerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const cardIndex = parseInt(entry.target.getAttribute('data-card-index') || '0');
          setCenterCards(prev => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              // Limpiar otras filas cuando una nueva está en el centro
              newSet.clear();
              
              // En móviles siempre son 2 cards por fila
              const cardsPerRow = 2;
              const currentRow = Math.floor(cardIndex / cardsPerRow);
              const startIndex = currentRow * cardsPerRow;
              const endIndex = Math.min(startIndex + cardsPerRow, benefits.length);
              
              // Agregar todas las tarjetas de la fila actual
              for (let i = startIndex; i < endIndex; i++) {
                newSet.add(i);
              }
            } else {
              newSet.delete(cardIndex);
            }
            return newSet;
          });
        });
      },
      {
        // Zona central más amplia para mejor detección
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0.5
      }
    );

    // Función para manejar cambios de tamaño de pantalla
    const handleResize = () => {
      if (!isMobile()) {
        setCenterCards(new Set());
        cardRefs.current.forEach(ref => {
          if (ref) {
            centerObserver.unobserve(ref);
          }
        });
      } else {
        // Reactiva el observer en móviles
        cardRefs.current.forEach((ref, index) => {
          if (ref) {
            centerObserver.observe(ref);
          }
        });
      }
    };

    // Esperar para que las animaciones iniciales terminen
    const timeoutId = setTimeout(() => {
      if (isMobile()) {
        cardRefs.current.forEach((ref, index) => {
          if (ref) {
            centerObserver.observe(ref);
          }
        });
      }
    }, 800);

    // Agregar listener para cambios de tamaño
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      cardRefs.current.forEach(ref => {
        if (ref) {
          centerObserver.unobserve(ref);
        }
      });
    };
  }, [isVisible, benefits.length]);

  return (
    <section id="beneficios-emocionales" className="py-10 sm:py-12 md:py-16 bg-gradient-to-b from-white to-costwise-gray/20 dark:from-slate-900 dark:to-slate-800/20">
      <div className="container-custom px-3 sm:px-4 md:px-6" id="benefits-section">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className={`inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-costwise-blue/10 to-costwise-teal/10 dark:from-costwise-teal/20 dark:to-costwise-blue/20 text-costwise-blue dark:text-costwise-teal px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-costwise-blue/20 dark:border-costwise-teal/30 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}>
            <Heart size={14} className="text-red-500 sm:hidden" />
            <Heart size={16} className="text-red-500 hidden sm:block" />
            <span>Beneficios reales</span>
          </div>
          
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-costwise-navy via-costwise-blue to-costwise-teal bg-clip-text text-transparent dark:from-white dark:via-costwise-teal dark:to-costwise-blue mb-4 sm:mb-6 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`} style={{ animationDelay: '100ms' }}>
            Soluciones que mejoran tu negocio
          </h2>
          
          <p className={`text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`} style={{ animationDelay: '200ms' }}>
            No solo reducimos costos, creamos tranquilidad y control sobre tu tecnología
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-8 mt-10">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            const isInCenter = centerCards.has(index);

            return (
              <div 
                key={index}
                ref={el => cardRefs.current[index] = el}
                data-card-index={index}
                className={`
                  benefit-card relative overflow-hidden bg-white dark:bg-slate-800 
                  p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl 
                  border border-gray-100 dark:border-slate-700
                  cursor-pointer group
                  ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
                  ${isInCenter ? 'benefit-card-center benefit-card-expanded' : ''}
                `}
                style={{ 
                  animationDelay: `${benefit.delay}ms`,
                }}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3 md:mb-4">
                    <div 
                      className={`
                        icon-container relative rounded-full flex items-center justify-center
                        p-1.5 sm:p-2 md:p-3 
                        w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14
                        ${isInCenter 
                          ? 'bg-gradient-to-br from-costwise-blue to-costwise-teal shadow-xl' 
                          : 'bg-gradient-to-br from-costwise-blue/20 to-costwise-teal/20 dark:from-costwise-blue/30 dark:to-costwise-teal/30'
                        }
                      `}
                    >
                      <IconComponent 
                        size={16} 
                        className={`
                          sm:hidden transition-all duration-500 ease-out
                          ${isInCenter ? 'text-white' : 'text-costwise-blue dark:text-costwise-teal'}
                        `}
                      />
                      <IconComponent 
                        size={18} 
                        className={`
                          hidden sm:block md:hidden transition-all duration-500 ease-out
                          ${isInCenter ? 'text-white' : 'text-costwise-blue dark:text-costwise-teal'}
                        `}
                      />
                      <IconComponent 
                        size={24} 
                        className={`
                          hidden md:block transition-all duration-500 ease-out
                          ${isInCenter ? 'text-white' : 'text-costwise-blue dark:text-costwise-teal'}
                        `}
                      />
                    </div>
                    <h3 className={`
                      text-base sm:text-lg md:text-xl font-semibold line-clamp-2 sm:hidden
                      ${isInCenter ? 'font-bold' : 'text-gray-900 dark:text-white'}
                    `}>
                      {benefit.title}
                    </h3>
                  </div>
                  <h3 className={`
                    hidden sm:block text-lg md:text-xl font-semibold mb-1 sm:mb-3 line-clamp-2
                    ${isInCenter ? 'font-bold' : 'text-gray-900 dark:text-white'}
                  `}>
                    {benefit.title}
                  </h3>
                  <div className={`benefit-description-wrapper ${isInCenter ? 'expanded' : ''}`}>
                    <p className={`
                      text-xs sm:text-sm md:text-base transition-all duration-500
                      ${isInCenter 
                        ? 'text-gray-800 dark:text-gray-100 font-medium benefit-description-expanded' 
                        : 'text-gray-600 dark:text-gray-300 line-clamp-2 sm:line-clamp-3 md:line-clamp-none benefit-description-collapsed'
                      }
                    `}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <a 
            href="#testimonios" 
            className="inline-flex items-center gap-1.5 sm:gap-2 btn-secondary px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base"
          >
            Ver quiénes confían en nosotros
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down sm:hidden">
              <path d="m6 9 6 6 6-6"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down hidden sm:block">
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default Benefits;