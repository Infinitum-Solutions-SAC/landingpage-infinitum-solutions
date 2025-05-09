
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Quote, Sparkles, Calendar, ArrowUpRight } from 'lucide-react';

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
      quote: "Gracias a Infinitum Solutions reducimos nuestros gastos en tecnología en más de un 60%. La transición fue suave y su equipo nos guió en cada paso del proceso.",
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
  
  const calculateAnnualSavings = (before: number, after: number) => {
    return (before - after) * 12;
  };
  
  return (
    <section id="testimonios" className="section bg-white dark:bg-gray-900">
      <div className="container-custom" id="testimonials-section">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-costwise-navy mb-4 animate-fade-in dark:text-white">
            Casos de éxito
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in dark:text-gray-300">
            Descubre cómo nuestras soluciones han ayudado a empresas reales a 
            reducir sus costos y optimizar su infraestructura.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div 
            className={`bg-costwise-gray rounded-2xl p-8 md:p-12 relative shadow-lg ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            } dark:bg-gray-800 dark:border dark:border-gray-700`}
          >
            <div className="absolute top-6 left-6 text-costwise-blue/20 dark:text-blue-400/20">
              <Quote size={48} />
            </div>
            
            <div className="relative z-10">
              <p className="text-xl md:text-2xl text-gray-700 mb-8 italic relative z-10 dark:text-gray-200">
                "{testimonials[activeIndex].quote}"
              </p>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="font-semibold text-costwise-navy text-lg dark:text-blue-300">
                    {testimonials[activeIndex].author}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {testimonials[activeIndex].position}, {testimonials[activeIndex].company}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-700 p-5 rounded-lg shadow-md border border-gray-100 dark:border-gray-600">
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar size={16} />
                    <span>Ahorro anual</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Coste mensual anterior:</span>
                      <span className="text-gray-500 line-through dark:text-gray-500">${testimonials[activeIndex].before}/mes</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Coste mensual actual:</span>
                      <span className="text-costwise-blue font-semibold dark:text-blue-300">${testimonials[activeIndex].after}/mes</span>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-100 dark:border-gray-600">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Total ahorrado:</span>
                        <div className="flex items-center gap-2">
                          <Sparkles className="text-green-500" size={18} />
                          <span className="text-lg font-bold text-green-600 dark:text-green-400">
                            ${calculateAnnualSavings(testimonials[activeIndex].before, testimonials[activeIndex].after).toLocaleString()}/año
                          </span>
                        </div>
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-xs text-green-600 dark:text-green-400 justify-end">
                        <span>{testimonials[activeIndex].savings}</span>
                        <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-4">
            <button 
              className="p-2 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-costwise-blue hover:border-costwise-blue transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:border-blue-400"
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
                      ? 'bg-costwise-blue dark:bg-blue-400' 
                      : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
            
            <button 
              className="p-2 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-costwise-blue hover:border-costwise-blue transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:border-blue-400"
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
