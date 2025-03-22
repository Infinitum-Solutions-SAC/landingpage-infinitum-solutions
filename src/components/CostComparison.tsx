
import { useEffect, useState } from 'react';

const CostComparison = () => {
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
    
    const element = document.getElementById('comparison-section');
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
    {
      name: "Almacenamiento Cloud",
      proprietary: 120,
      opensource: 30,
      savings: 75
    },
    {
      name: "Suite Ofimática",
      proprietary: 15,
      opensource: 0,
      savings: 100
    },
    {
      name: "Herramientas de diseño",
      proprietary: 60,
      opensource: 0,
      savings: 100
    },
    {
      name: "CRM",
      proprietary: 80,
      opensource: 25,
      savings: 69
    },
    {
      name: "Hosting Web",
      proprietary: 40,
      opensource: 15,
      savings: 63
    },
    {
      name: "Servidores",
      proprietary: 100,
      opensource: 45,
      savings: 55
    }
  ];
  
  return (
    <section id="comparacion" className="section bg-white">
      <div className="container-custom" id="comparison-section">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-costwise-navy mb-4 animate-fade-in">
            Comparativa de costos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
            Descubre cuánto puedes ahorrar migrando de soluciones propietarias
            a alternativas open source con servidores locales.
          </p>
        </div>
        
        <div className="bg-costwise-gray p-6 md:p-10 rounded-2xl">
          <div className="grid grid-cols-7 gap-4 mb-8 text-sm font-medium">
            <div className="col-span-3">Herramienta</div>
            <div className="col-span-1 text-center">Prop. $/mes</div>
            <div className="col-span-1 text-center">OS $/mes</div>
            <div className="col-span-1 text-center">Ahorro</div>
            <div className="col-span-1 text-center">%</div>
          </div>
          
          {tools.map((tool, index) => (
            <div 
              key={tool.name} 
              className={`grid grid-cols-7 gap-4 mb-4 bg-white p-4 rounded-lg items-center ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`} 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="col-span-3 font-medium">{tool.name}</div>
              <div className="col-span-1 text-center text-gray-700">${tool.proprietary}</div>
              <div className="col-span-1 text-center text-costwise-blue font-medium">${tool.opensource}</div>
              <div className="col-span-1 text-center text-green-600 font-medium">
                ${tool.proprietary - tool.opensource}
              </div>
              <div className="col-span-1 text-center">
                <div className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  {tool.savings}%
                </div>
              </div>
            </div>
          ))}
          
          <div className={`grid grid-cols-7 gap-4 mt-8 p-4 bg-costwise-blue/10 rounded-lg items-center font-medium ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`} style={{ animationDelay: '600ms' }}>
            <div className="col-span-3">Total mensual (por usuario)</div>
            <div className="col-span-1 text-center">$415</div>
            <div className="col-span-1 text-center text-costwise-blue">$115</div>
            <div className="col-span-1 text-center text-green-600">$300</div>
            <div className="col-span-1 text-center">
              <div className="inline-block bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                72%
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-6">
              *Precios aproximados basados en servicios estándar para una pequeña empresa.
              El ahorro real puede variar según las necesidades específicas.
            </p>
            <a href="#contacto" className="btn-primary">
              Calcula tu ahorro personalizado
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostComparison;
