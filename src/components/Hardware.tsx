import { Server, Cpu, HardDrive, Check, ShieldAlert, ChevronLeft, ChevronRight, Recycle, ArrowRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import '../styles/hardware-animation.css';
import '../styles/card-deck.css';

const Hardware = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const hardwareOptions = [
    {
      name: "Reutilización de Equipos",
      icon: Recycle,
      price: "Ahorra en costos",
      description: "Evaluamos y optimizamos tu hardware existente para convertirlo en infraestructura productiva.",
      features: [
        "Auditoría técnica de equipos actuales",
        "Optimización de rendimiento",
        "Recomendaciones de actualización",
        "Aprovechamiento máximo de recursos",
        "Software 100% auditable sin licencias"
      ],
      recommended: true
    },
    // {
    //   name: "Configuración Inicial",
    //   icon: Server,
    //   price: "Consultar", // Precio actualizado
    //   description: "Ideal para iniciar con infraestructura local, enfocada en servicios básicos.",
    //   features: [
    //     "Nodo único con Proxmox VE",
    //     "Virtualización de servicios",
    //     "Hardware simulado: 16GB RAM",
    //     "Almacenamiento SSD",
    //     "Soporte básico"
    //   ],
    //   recommended: false
    // },
    {
      name: "Configuración Básica",
      icon: Cpu, // Podríamos cambiar el icono si es necesario
      price: "Consultar", // Precio actualizado
      description: "Para empresas que requieren mayor seguridad y rendimiento.",
      features: [
        "Firewall dedicado",
        "Nodo de servidor optimizado",
        "Backup gestionado",
        "Soporte estándar"
      ],
      recommended: false
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

  // Función para calcular la posición de cada carta
  const getCardPosition = (index: number, currentIndex: number, totalCards: number) => {
    const diff = index - currentIndex;
    const absDistance = Math.abs(diff);
    
    // Variaciones aleatorias basadas en el índice para consistencia
    const randomSeed = index * 31; // Usar el índice como semilla para consistencia
    const randomX = ((randomSeed * 13) % 41) - 20; // -20 a 20
    const randomY = ((randomSeed * 17) % 31) - 15; // -15 a 15
    const randomRotation = ((randomSeed * 7) % 21) - 10; // -10 a 10
    
    // Carta activa
    if (diff === 0) {
      return {
        transform: `translateX(${randomX * 0.3}px) translateY(-15px) rotate(${randomRotation * 0.5}deg) scale(1.08)`,
        zIndex: 15,
        opacity: 1
      };
    }
    
    // Cartas visibles a los lados
    if (absDistance <= 2) {
      const side = diff > 0 ? 1 : -1; // derecha o izquierda
      const distance = absDistance;
      
      // Más variación en posicionamiento
      const offsetX = side * distance * 12 + randomX * 0.8;
      const offsetY = distance * 8 + randomY * 0.6;
      const rotation = side * distance * 8 + randomRotation;
      const scale = 1 - distance * 0.05 + ((randomSeed % 7) - 3) * 0.01; // Más variación en escala
      
      return {
        transform: `translateX(${offsetX}px) translateY(${offsetY}px) rotate(${rotation}deg) scale(${scale})`,
        zIndex: 10 - distance,
        opacity: 1 - distance * 0.2
      };
    }
    
    // Cartas ocultas (más desordenadas)
    return {
      transform: `translateX(${randomX * 0.5}px) translateY(${randomY * 0.4}px) rotate(${randomRotation * 1.2}deg) scale(0.85)`,
      zIndex: 1,
      opacity: 0.25
    };
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % hardwareOptions.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + hardwareOptions.length) % hardwareOptions.length);
  };

  const goToCard = (index: number) => {
    setCurrentIndex(index);
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevCard();
      } else if (event.key === 'ArrowRight') {
        nextCard();
      } else if (event.key >= '1' && event.key <= '4') {
        const index = parseInt(event.key) - 1;
        if (index < hardwareOptions.length) {
          goToCard(index);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch handlers for swipe functionality
  const minSwipeDistance = 30; // Reducir distancia mínima para hacer más sensible

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
      if (isLeftSwipe) {
        nextCard();
      }
      if (isRightSwipe) {
        prevCard();
      }
    }
    
    // Limpiar valores de touch
    setTouchStart(null);
    setTouchEnd(null);
  };
  return (
    <section id="hardware" className="section bg-gradient-to-b from-costwise-gray to-white dark:from-slate-800 dark:to-slate-900">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-costwise-blue/10 to-costwise-teal/10 dark:from-costwise-teal/20 dark:to-costwise-blue/20 text-costwise-blue dark:text-costwise-teal px-6 py-3 rounded-full text-sm font-medium mb-6 border border-costwise-blue/20 dark:border-costwise-teal/30">
            <Recycle size={18} className="text-green-500" />
            <span>Reutilización y optimización</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-costwise-navy via-costwise-blue to-costwise-teal bg-clip-text text-transparent dark:from-white dark:via-costwise-teal dark:to-costwise-blue mb-4">
            Aprovecha tu Hardware Existente
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            <span className="font-semibold text-costwise-blue dark:text-costwise-teal">Convierte tus equipos en servidores productivos</span>
            {" o te ofrecemos configuraciones nuevas con "}
            <span className="font-semibold text-costwise-blue dark:text-costwise-teal">software 100% libre y auditable</span>.
          </p>
        </div>

        {/* Vista de cuadrícula tradicional para escritorio */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hardwareOptions.map((option, index) => (
            <div 
              key={index} 
              className={`relative p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl flex flex-col justify-between animate-fade-in bg-white dark:bg-slate-800 ${option.recommended ? 'border-2 border-costwise-blue dark:border-costwise-teal' : 'border border-gray-200 dark:border-slate-700'}`}
              style={{ 
                animationDelay: `${index * 100}ms`,
                minHeight: '520px', // Aumentar altura mínima
                maxHeight: 'none' // Quitar altura máxima para permitir contenido dinámico
              }}
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
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 h-16 overflow-hidden">{option.description}</p>
                <ul className="space-y-1 mb-4 flex-grow">
                  {option.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                      <Check size={14} className="text-green-500 flex-shrink-0" />
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

        {/* Efecto de cartas de naipes para móviles */}
        <div className="md:hidden">
          <div className="card-deck-container">
            <div className="card-deck">
              {hardwareOptions.map((option, index) => {
                const position = getCardPosition(index, currentIndex, hardwareOptions.length);
                return (
                  <div 
                    key={index} 
                    className={`deck-card ${currentIndex === index ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(index)}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    style={{ 
                      transform: position.transform,
                      zIndex: position.zIndex,
                      opacity: position.opacity,
                      willChange: currentIndex === index ? 'transform' : 'auto',
                      contain: 'layout style paint'
                    }}
                  >
                    <div className="card-content">
                      <div className="card-header">
                        {option.recommended && (
                          <div className="card-recommended-badge">
                            Recomendado
                          </div>
                        )}
                        <div className={`card-icon ${option.recommended ? 'recommended' : ''}`}>
                          <option.icon size={24} />
                        </div>
                        <h3 className="card-title">{option.name}</h3>
                        <p className="card-description">{option.description}</p>
                      </div>
                      
                      <ul className="card-features">
                        {option.features.map((feature, i) => (
                          <li key={i} className="card-feature">
                            <Check size={16} className="card-feature-icon" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="card-footer">
                        <p className="card-price">{option.price}</p>
                        <a 
                          href="#contacto" 
                          className={`card-button ${option.recommended ? 'primary' : 'secondary'}`}
                          onClick={(e) => e.stopPropagation()} // Evitar que el click en el botón active el onClick de la tarjeta
                        >
                          Solicitar cotización
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hardware;
