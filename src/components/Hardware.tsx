import { useState, useEffect } from 'react';
import { Server, Cpu, HardDrive, Check } from 'lucide-react';
import '../styles/hardware-animation.css';

const Hardware = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(-1);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('hardware-section');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);
  
  const hardwareOptions = [
    {
      name: "Básico",
      icon: Server,
      price: 499,
      description: "Ideal para emprendedores y pequeños negocios que están comenzando",
      features: [
        "Servidor mini PC compacto",
        "4 GB RAM / 256 GB SSD",
        "Procesador eficiente",
        "Configuración básica",
        "Soporte por 3 meses"
      ],
      recommended: false
    },
    {
      name: "Intermedio",
      icon: Cpu,
      price: 899,
      description: "Perfecto para pequeñas empresas con necesidades de crecimiento",
      features: [
        "Servidor tower de alto rendimiento",
        "16 GB RAM / 1 TB SSD",
        "Procesador multinúcleo",
        "Backup automático",
        "Soporte por 6 meses"
      ],
      recommended: true
    },
    {
      name: "Avanzado",
      icon: HardDrive,
      price: 1499,
      description: "Diseñado para empresas medianas con múltiples usuarios",
      features: [
        "Servidor profesional rack-mountable",
        "32 GB RAM / 2 TB SSD",
        "Procesador de servidor",
        "RAID para redundancia",
        "Soporte prioritario por 12 meses"
      ],
      recommended: false
    }
  ];
  
  const handleMouseEnter = (index) => {
    setActiveCard(index);
  };
  
  const handleMouseLeave = () => {
    setActiveCard(-1);
  };
  
  return (
    <section id="hardware" className="section bg-costwise-gray">
      <div className="container-custom" id="hardware-section">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-costwise-navy mb-4 animate-fade-in">
            Hardware optimizado
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
            Ofrecemos soluciones de hardware pre-configuradas que se adaptan 
            a las necesidades y presupuesto de tu empresa.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hardwareOptions.map((option, index) => (
            <div 
              key={option.name}
              className="hw-card-container"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div 
                className={`hw-card ${option.recommended ? 'hw-card-recommended' : ''} ${
                  activeCard === index ? 'growing' : activeCard === -1 ? '' : 'shrinking'
                } ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              >
                {option.recommended && (
                  <div className="hw-card-label">
                    Recomendado
                  </div>
                )}
                
                <div className="hw-card-content">
                  <div className="hw-card-header">
                    <div className="hw-card-icon-container">
                      <option.icon size={32} style={{ color: '#2A8BFF' }} />
                    </div>
                    
                    <h3 className="hw-card-title">{option.name}</h3>
                    <div className="hw-card-price">${option.price}</div>
                    <p className="hw-card-description">
                      {option.description}
                    </p>
                  </div>
                  
                  <div className="hw-card-features">
                    {option.features.map((feature) => (
                      <div key={feature} className="hw-card-feature">
                        <Check size={18} className="hw-card-feature-icon" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <a 
                    href="#contacto" 
                    className={`block text-center py-3 px-6 rounded-lg font-medium transition-all ${
                      option.recommended 
                        ? 'bg-costwise-blue text-white hover:bg-costwise-blue/90'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Solicitar información
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6 animate-fade-in">
            ¿Necesitas una solución personalizada para tus necesidades específicas?
          </p>
          <a href="#contacto" className="btn-secondary inline-block animate-fade-in">
            Contacta a nuestros especialistas
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hardware;
