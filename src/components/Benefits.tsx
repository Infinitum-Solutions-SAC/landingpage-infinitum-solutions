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

  // Nuevo sistema de detección de centro basado en scroll (solo móviles)
  useEffect(() => {
    if (!isVisible) return;

    const isMobile = () => window.innerWidth < 768;
    
    if (!isMobile()) {
      setCenterCards(new Set());
      return;
    }

    let ticking = false;
    let lastScrollY = window.scrollY;
    let debounceTimeout: NodeJS.Timeout | null = null;
    let currentActiveRow = -1; // Para rastrear la fila activa actual

    const updateCenterCards = () => {
      const viewportHeight = window.innerHeight;
      const centerY = window.scrollY + (viewportHeight / 2);
      
      // Encontrar la fila más cercana al centro
      const cardsPerRow = 2;
      
      // Calcular distancias por fila
      const rowDistances: { row: number; distance: number; cards: number[] }[] = [];
      
      for (let index = 0; index < cardRefs.current.length; index += cardsPerRow) {
        const rowCards = [];
        let rowCenterY = 0;
        let validCards = 0;
        
        // Calcular el centro promedio de la fila
        for (let i = index; i < Math.min(index + cardsPerRow, cardRefs.current.length); i++) {
          const ref = cardRefs.current[i];
          if (ref) {
            const rect = ref.getBoundingClientRect();
            const elementCenterY = window.scrollY + rect.top + (rect.height / 2);
            rowCenterY += elementCenterY;
            validCards++;
            rowCards.push(i);
          }
        }
        
        if (validCards > 0) {
          rowCenterY = rowCenterY / validCards;
          const distance = Math.abs(rowCenterY - centerY);
          const currentRow = Math.floor(index / cardsPerRow);
          
          rowDistances.push({
            row: currentRow,
            distance: distance,
            cards: rowCards
          });
        }
      }
      
      // Encontrar la fila más cercana al centro
      if (rowDistances.length > 0) {
        const closestRowData = rowDistances.reduce((prev, current) => 
          prev.distance < current.distance ? prev : current
        );
        
        // Tolerancia base
        const baseTolerance = viewportHeight * 0.3;
        
        // Histéresis: si hay una fila activa, requerimos más distancia para cambiar
        let tolerance = baseTolerance;
        if (currentActiveRow !== -1 && currentActiveRow !== closestRowData.row) {
          tolerance = baseTolerance * 0.7; // Requiere estar más cerca para cambiar de fila
        }
        
        const newCenterCards = new Set<number>();
        
        if (closestRowData.distance <= tolerance) {
          // Agregar todas las cards de la fila más cercana
          closestRowData.cards.forEach(cardIndex => {
            newCenterCards.add(cardIndex);
          });
          currentActiveRow = closestRowData.row;
        } else {
          // Si ninguna fila está suficientemente cerca, limpiar estado
          currentActiveRow = -1;
        }
        
        setCenterCards(newCenterCards);
      }
      
      ticking = false;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      lastScrollY = currentScrollY;

      // Limpiar debounce anterior
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      if (!ticking) {
        requestAnimationFrame(() => {
          // Agregar pequeño debounce para evitar cambios muy rápidos
          debounceTimeout = setTimeout(updateCenterCards, 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      if (!isMobile()) {
        setCenterCards(new Set());
        window.removeEventListener('scroll', handleScroll);
      } else {
        // Recalcular inmediatamente en cambio de tamaño
        updateCenterCards();
      }
    };

    // Configuración inicial con debounce
    const timeoutId = setTimeout(() => {
      if (isMobile()) {
        updateCenterCards();
        window.addEventListener('scroll', handleScroll, { passive: true });
      }
    }, 300);

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
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
        
        <div className="benefits-container grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-8 mt-10 relative">
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
                <div className="benefit-content relative z-10">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3 md:mb-4">
                    <div 
                      className={`
                        icon-container relative rounded-full flex items-center justify-center
                        p-1.5 sm:p-2 md:p-3 
                        w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14
                        transition-all duration-500 ease-out
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
                      transition-all duration-500
                      ${isInCenter ? 'font-bold' : 'text-gray-900 dark:text-white'}
                    `}>
                      {benefit.title}
                    </h3>
                  </div>
                  <h3 className={`
                    hidden sm:block text-lg md:text-xl font-semibold mb-1 sm:mb-3 line-clamp-2
                    transition-all duration-500
                    ${isInCenter ? 'font-bold' : 'text-gray-900 dark:text-white'}
                  `}>
                    {benefit.title}
                  </h3>
                  <div className={`benefit-description-wrapper ${isInCenter ? 'expanded' : ''}`}>
                    <p className={`
                      benefit-description text-xs sm:text-sm md:text-base
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