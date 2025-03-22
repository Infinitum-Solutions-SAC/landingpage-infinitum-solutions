
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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
    
    const element = document.getElementById('testimonials-section');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);
  
  const testimonials = [
    {
      quote: "Gracias a CostWise reducimos nuestros gastos en tecnología en más de un 60%. La transición fue suave y su equipo nos guió en cada paso del proceso.",
      author: "María Rodríguez",
      position: "Gerente de Operaciones",
      company: "Innova Designs",
      savings: "60% de ahorro",
      before: 2500,
      after: 1000
    },
    {
      quote: "Como startup, necesitábamos controlar nuestro presupuesto. La solución de servidor local que implementaron nos permitió invertir ese dinero en crecimiento.",
      author: "Carlos Méndez",
      position: "Fundador",
      company: "TechStart",
      savings: "75% de ahorro",
      before: 1800,
      after: 450
    },
    {
      quote: "La migración a soluciones open source no solo fue económica sino que nos dio más control sobre nuestros datos y procesos. Extremadamente satisfechos.",
      author: "Laura Jiménez",
      position: "CTO",
      company: "DataMex",
      savings: "55% de ahorro",
      before: 3600,
      after: 1620
    }
  ];
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  return (
    <section id="testimonios" className="section bg-white">
      <div className="container-custom" id="testimonials-section">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-costwise-navy mb-4 animate-fade-in">
            Casos de éxito
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
            Descubre cómo nuestras soluciones han ayudado a empresas reales a 
            reducir sus costos y optimizar su infraestructura.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div 
            className={`bg-costwise-gray rounded-2xl p-8 md:p-12 relative ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            <div className="absolute top-6 left-6 text-costwise-blue/20">
              <Quote size={48} />
            </div>
            
            <div className="relative z-10">
              <p className="text-xl md:text-2xl text-gray-700 mb-8 italic relative z-10">
                "{testimonials[activeIndex].quote}"
              </p>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="font-semibold text-costwise-navy text-lg">
                    {testimonials[activeIndex].author}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[activeIndex].position}, {testimonials[activeIndex].company}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-2">Ahorro mensual</div>
                  <div className="flex items-center gap-4">
                    <div className="text-gray-500 line-through">${testimonials[activeIndex].before}/mes</div>
                    <div className="text-costwise-blue font-semibold">${testimonials[activeIndex].after}/mes</div>
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {testimonials[activeIndex].savings}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-4">
            <button 
              className="p-2 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-costwise-blue hover:border-costwise-blue transition-colors"
              onClick={prevTestimonial}
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex 
                      ? 'bg-costwise-blue' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
            
            <button 
              className="p-2 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-costwise-blue hover:border-costwise-blue transition-colors"
              onClick={nextTestimonial}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
