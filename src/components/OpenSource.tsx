
import { useState, useEffect } from 'react';
import { Code, Github, Terminal, Heart } from 'lucide-react';

const OpenSource = () => {
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
  
  const tools = [
    { name: "Linux", logo: "/placeholder.svg" },
    { name: "Apache", logo: "/placeholder.svg" },
    { name: "MySQL", logo: "/placeholder.svg" },
    { name: "PostgreSQL", logo: "/placeholder.svg" },
    { name: "Docker", logo: "/placeholder.svg" },
    { name: "Kubernetes", logo: "/placeholder.svg" },
    { name: "NextCloud", logo: "/placeholder.svg" },
    { name: "LibreOffice", logo: "/placeholder.svg" }
  ];
  
  return (
    <section id="beneficios" className="section bg-gradient-to-b from-costwise-gray to-white">
      <div className="container-custom" id="opensource-section">
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 bg-costwise-blue/10 text-costwise-blue px-4 py-2 rounded-full text-sm font-medium mb-4 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}>
            <Heart size={14} />
            <span>Agradecimientos</span>
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold text-costwise-navy mb-4 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`} style={{ animationDelay: '100ms' }}>
            Potenciados por Open Source
          </h2>
          
          <p className={`text-gray-600 max-w-2xl mx-auto ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`} style={{ animationDelay: '200ms' }}>
            Nuestras soluciones se basan en tecnologías de código abierto de alta calidad,
            lo que nos permite ofrecer alternativas robustas a menor costo.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {tools.map((tool, index) => (
            <div 
              key={tool.name}
              className={`bg-white p-4 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100 + 300}ms` }}
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full mb-3 flex items-center justify-center">
                  <Code size={24} className="text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">{tool.name}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-costwise-blue/5 p-8 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '800ms' }}>
              <div className="inline-flex items-center gap-2 bg-costwise-blue/10 text-costwise-blue px-4 py-2 rounded-full text-sm font-medium">
                <Github size={14} />
                <span>Comunidad Open Source</span>
              </div>
              
              <h3 className="text-2xl font-bold text-costwise-navy">
                Comprometidos con el Software Libre
              </h3>
              
              <p className="text-gray-600">
                Creemos en el poder del software libre y contribuimos activamente a la comunidad.
                Parte de nuestros ingresos se destina a apoyar proyectos de código abierto.
              </p>
              
              <div className="pt-4">
                <a href="#contacto" className="btn-secondary">
                  Conoce nuestras contribuciones
                </a>
              </div>
            </div>
            
            <div className={`relative ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1000ms' }}>
              <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-costwise-blue/10 rounded-full">
                    <Terminal size={20} className="text-costwise-blue" />
                  </div>
                  <div>
                    <h4 className="font-medium text-costwise-navy">Beneficios del Open Source</h4>
                    <p className="text-sm text-gray-600">Más allá del ahorro económico</p>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">Mayor control sobre tus sistemas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">Sin dependencia de proveedores específicos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">Comunidad global de soporte y desarrollo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">Actualizaciones frecuentes y mejoras continuas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">Mayor seguridad gracias a la transparencia del código</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
