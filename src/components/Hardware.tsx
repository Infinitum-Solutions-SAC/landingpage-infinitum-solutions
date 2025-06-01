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
    <section id="hardware" className="section bg-costwise-gray">
      <div className="container-custom" id="hardware-section">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-costwise-navy mb-4 animate-fade-in">
            Arquitecturas y Configuraciones
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
            Ofrecemos arquitecturas pre-diseñadas y soluciones a medida 
            para optimizar tu infraestructura IT local.
          </p>
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {hardwareOptions.map((option, index) => (
            <div 
              key={option.name}
              className="hw-card-container"
            >
              <div 
                className={`hw-card ${option.recommended ? 'hw-card-recommended' : ''} flex flex-col`}
              >
                {option.recommended && (
                  <div className="hw-card-label">
                    Recomendado
                  </div>
                )}
                
                <div className="hw-card-content flex flex-col flex-grow">
                  <div className="hw-card-header">
                    <div className="hw-card-icon-container">
                      <option.icon size={32} style={{ color: '#2A8BFF' }} />
                    </div>
                    
                    <h3 className="hw-card-title">{option.name}</h3>
                    {option.price !== "Personalizado" && option.price !== "Consultar" ? (
                      <div className="hw-card-price">${option.price}</div>
                    ) : (
                      <div className="hw-card-price">{option.price}</div>
                    )}
                    <p className="hw-card-description">
                      {option.description}
                    </p>
                  </div>
                  
                  <div className="hw-card-features flex-grow">
                    {option.features.map((feature) => (
                      <div key={feature} className="hw-card-feature">
                        <Check size={18} className="hw-card-feature-icon" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <a 
                    href="#contacto" 
                    className={`block text-center py-3 px-6 rounded-lg font-medium transition-all mt-auto ${
                      option.recommended 
                        ? 'bg-costwise-blue text-white hover:bg-costwise-blue/90'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {option.name === "Arquitecturas Avanzadas" ? "Consultar especialista" : "Solicitar información"}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden relative">
          {/* Carousel Container */}
          <div className="overflow-hidden mb-6">
            <div 
              ref={scrollContainerRef}
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {hardwareOptions.map((option, index) => (
                <div 
                  key={option.name}
                  className="w-full flex-shrink-0 px-2" /* Reducido padding lateral */
                >
                  <div className="hw-card-container max-w-xs mx-auto" /* Reducido ancho máximo */>
                    <div 
                      className={`hw-card ${option.recommended ? 'hw-card-recommended' : ''} flex flex-col min-h-[450px]` /* Altura mínima fija */}
                    >
                      {option.recommended && (
                        <div className="hw-card-label">
                          Recomendado
                        </div>
                      )}
                      
                      <div className="hw-card-content flex flex-col flex-grow">
                        <div className="hw-card-header">
                          <div className="hw-card-icon-container">
                            <option.icon size={28} style={{ color: '#2A8BFF' }} /> {/* Icono más pequeño */}
                          </div>
                          
                          <h3 className="hw-card-title">{option.name}</h3>
                          {option.price !== "Personalizado" && option.price !== "Consultar" ? (
                            <div className="hw-card-price">${option.price}</div>
                          ) : (
                            <div className="hw-card-price">{option.price}</div>
                          )}
                          <p className="hw-card-description">
                            {option.description}
                          </p>
                        </div>
                        
                        <div className="hw-card-features flex-grow">
                          {option.features.map((feature) => (
                            <div key={feature} className="hw-card-feature">
                              <Check size={16} className="hw-card-feature-icon" /> {/* Icono más pequeño */}
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <a 
                          href="#contacto" 
                          className={`block text-center py-2.5 px-4 rounded-lg font-medium transition-all mt-auto text-sm ${ /* Botón más pequeño */
                            option.recommended 
                              ? 'bg-costwise-blue text-white hover:bg-costwise-blue/90'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {option.name === "Arquitecturas Avanzadas" ? "Consultar especialista" : "Solicitar información"}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Moved below cards */}
          <div className="flex justify-between items-center mt-6">
            <button 
              onClick={prevCard}
              className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 disabled:opacity-50"
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={24} className="text-costwise-blue" />
            </button>
            
            <div className="flex space-x-2">
              {hardwareOptions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToCard(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-costwise-blue' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextCard}
              className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 disabled:opacity-50"
              disabled={currentIndex === hardwareOptions.length - 1}
            >
              <ChevronRight size={24} className="text-costwise-blue" />
            </button>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6 animate-fade-in">
            ¿Tu proyecto tiene requisitos únicos? Diseñamos la solución perfecta para ti.
          </p>
          <a href="#contacto" className="btn-secondary inline-block animate-fade-in">
            Contacta para una solución personalizada
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hardware;
