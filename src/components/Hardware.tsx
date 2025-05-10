import { useState, useEffect } from 'react';
import { Server, Cpu, HardDrive, Check } from 'lucide-react';

const Hardware = () => {
  const [isVisible, setIsVisible] = useState(false);
  
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
  
  return (
    <section id="hardware" className="section bg-costwise-gray">
      <style dangerouslySetInnerHTML={{ __html: `
        .hw-card {
          background-color: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          position: relative;
          transition: all 350ms cubic-bezier(0.34, 1.56, 0.64, 1) !important;
          will-change: transform, box-shadow;
        }
        
        .hw-card:hover {
          transform: scale(1.12) !important;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2) !important;
          z-index: 20 !important;
        }
      `}} />
      
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
              className={`hw-card ${
                option.recommended ? 'ring-2 ring-costwise-blue' : ''
              } ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {option.recommended && (
                <div className="bg-costwise-blue text-white text-center py-2 text-sm font-medium">
                  Recomendado
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-costwise-blue/10 rounded-full">
                    <option.icon size={28} className="text-costwise-blue" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-center mb-2">{option.name}</h3>
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-costwise-navy">${option.price}</span>
                </div>
                <p className="text-gray-600 text-center text-sm mb-6">
                  {option.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  {option.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check size={16} className="text-costwise-blue flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
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
