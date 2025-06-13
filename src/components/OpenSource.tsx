import { useState, useEffect } from 'react';
import { Heart, Lock, DollarSign, Star, CheckCircle, Search, Server, Code, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/card-deck.css';

const OpenSource = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  
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
    setCurrentIndex((prev) => (prev + 1) % alternativas.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + alternativas.length) % alternativas.length);
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
      } else if (event.key >= '1' && event.key <= '3') {
        const index = parseInt(event.key) - 1;
        if (index < alternativas.length) {
          goToCard(index);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch handlers for swipe functionality
  const minSwipeDistance = 30;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
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
  
  // Alternativas simplificadas de software comercial a open source
  const alternativas = [
    { 
      saasTool: "Microsoft Office 365", 
      openSource: "Collabora / OnlyOffice", 
      savings: "Ahorra hasta $150 por usuario al año",
      benefits: ["Colaboración en tiempo real", "Compatible con archivos de Office"]
    },
    { 
      saasTool: "Dropbox Business", 
      openSource: "Nextcloud", 
      savings: "Ahorra hasta $180 por usuario al año",
      benefits: ["Control total de tus archivos", "Sin límites de almacenamiento", "Más funcionalidades"]
    },
    { 
      saasTool: "Slack", 
      openSource: "Mattermost", 
      savings: "Ahorra hasta $96 por usuario al año",
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
            Libérate de suscripciones caras: software libre, auditable y adaptable a tu hardware.</p>
        </div>

        {/* Comparativa simplificada de costos */}
        {/* Vista de cuadrícula tradicional para escritorio */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mb-12">
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

        {/* Efecto de cartas de naipes para móviles */}
        <div className="md:hidden">
          <div className="card-deck-container">
            <div className="card-deck">
              {alternativas.map((item, index) => {
                const position = getCardPosition(index, currentIndex, alternativas.length);
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
                        <div className="card-icon">
                          <DollarSign size={24} />
                        </div>
                        <h3 className="card-title">{item.saasTool}</h3>
                        <p className="card-description">
                          Reemplazado por: <span className="font-semibold">{item.openSource}</span>
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <DollarSign size={16} className="text-green-500" />
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                          {item.savings}
                        </span>
                      </div>
                      
                      <ul className="card-features">
                        {item.benefits.map((benefit, i) => (
                          <li key={i} className="card-feature">
                            <CheckCircle size={16} className="card-feature-icon" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="card-footer">
                        <a 
                          href="#contacto" 
                          className="card-button secondary"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Más información
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-costwise-blue/5 via-white to-costwise-teal/5 dark:from-costwise-teal/10 dark:via-slate-800 dark:to-costwise-blue/10 p-4 md:p-6 rounded-xl md:rounded-2xl border border-costwise-blue/20 dark:border-costwise-teal/30 shadow-lg mb-8 max-w-4xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4 md:gap-6">
            {/* Sección de beneficios - más compacta */}
            <div className="lg:col-span-3">
              <h3 className="text-xl md:text-2xl font-bold text-costwise-navy dark:text-white mb-3 max-w-md">¿Por qué elegir software libre?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-3">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-costwise-blue/5 dark:bg-costwise-teal/10">
                  <div className="bg-costwise-blue/20 dark:bg-costwise-teal/30 p-1.5 rounded-full">
                    <Search size={16} className="text-costwise-blue dark:text-costwise-teal" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">100% Auditable</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-xs">Transparencia total y cumplimiento normativo</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-costwise-blue/5 dark:bg-costwise-teal/10">
                  <div className="bg-costwise-blue/20 dark:bg-costwise-teal/30 p-1.5 rounded-full">
                    <Lock size={16} className="text-costwise-blue dark:text-costwise-teal" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Mayor privacidad</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-xs">Tus datos en tu infraestructura</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-costwise-blue/5 dark:bg-costwise-teal/10">
                  <div className="bg-costwise-blue/20 dark:bg-costwise-teal/30 p-1.5 rounded-full">
                    <DollarSign size={16} className="text-costwise-blue dark:text-costwise-teal" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Sin costos recurrentes</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-xs">Elimina suscripciones mensuales</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sección de ahorro - más compacta */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-md h-fit">
                <h3 className="text-lg font-semibold text-costwise-navy dark:text-white mb-3 text-center">Ahorro estimado</h3>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg mb-3">
                  <div className="text-center">
                    <span className="text-xs text-gray-600 dark:text-gray-300">Para 10 empleados</span>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 my-1">$4,280+/año</div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">promedio</span>
                  </div>
                </div>
                <a href="#contacto" className="btn-primary w-full py-2 text-center flex items-center justify-center gap-2 text-sm">
                  Calcular mi ahorro
                  <DollarSign size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Nueva sección sobre reutilización de hardware */}
        <div className="bg-costwise-blue/5 dark:bg-costwise-teal/5 p-4 md:p-6 rounded-xl border border-costwise-blue/20 dark:border-costwise-teal/20 max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-center">
            <div className="lg:w-2/3">
              <h3 className="text-xl md:text-2xl font-bold text-costwise-navy dark:text-white mb-2 max-w-md">¿Ya tienes equipos? ¡Aprovéchalos!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">
                Evaluamos tus equipos existentes para transformarlos en servidores productivos.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Evaluación sin costo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Optimización máxima</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Recomendaciones</span>
                </div>
              </div>
              <a href="#contacto" className="inline-flex items-center gap-2 text-costwise-blue dark:text-costwise-teal hover:underline text-sm">
                Solicitar evaluación
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
            </div>
            <div className="lg:w-1/3 flex justify-center">
              <div className="grid grid-cols-3 gap-2 max-w-xs">
                <div className="bg-white dark:bg-slate-700 p-2 rounded-lg shadow-md rotate-[-2deg]">
                  <Server size={28} className="text-costwise-blue dark:text-costwise-teal mx-auto" />
                  <p className="text-center text-xs mt-1">PC → Servidor</p>
                </div>
                <div className="bg-white dark:bg-slate-700 p-2 rounded-lg shadow-md rotate-[2deg]">
                  <Shield size={28} className="text-costwise-blue dark:text-costwise-teal mx-auto" />
                  <p className="text-center text-xs mt-1">Firewall</p>
                </div>
                <div className="bg-white dark:bg-slate-700 p-2 rounded-lg shadow-md rotate-[-1deg]">
                  <Code size={28} className="text-costwise-blue dark:text-costwise-teal mx-auto" />
                  <p className="text-center text-xs mt-1">VPS</p>
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
