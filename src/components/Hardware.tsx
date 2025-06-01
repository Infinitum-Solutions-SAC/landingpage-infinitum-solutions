import { Server, Cpu, HardDrive, Check, ShieldAlert } from 'lucide-react'; // Añadido ShieldAlert
import '../styles/hardware-animation.css';

const Hardware = () => {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> {/* Ajustado para 4 tarjetas */}
          {hardwareOptions.map((option, index) => (
            <div 
              key={option.name}
              className="hw-card-container"
            >
              <div 
                className={`hw-card ${option.recommended ? 'hw-card-recommended' : ''} flex flex-col`} // Asegurar altura uniforme
              >
                {option.recommended && (
                  <div className="hw-card-label">
                    Recomendado
                  </div>
                )}
                
                <div className="hw-card-content flex flex-col flex-grow"> {/* Contenido flexible */}
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
                  
                  <div className="hw-card-features flex-grow"> {/* Características flexibles */}
                    {option.features.map((feature) => (
                      <div key={feature} className="hw-card-feature">
                        <Check size={18} className="hw-card-feature-icon" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <a 
                    href="#contacto" 
                    className={`block text-center py-3 px-6 rounded-lg font-medium transition-all mt-auto ${ // mt-auto para alinear al final
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
