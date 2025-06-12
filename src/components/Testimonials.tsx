import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
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
      name: "Miguel Torres",
      position: "Director de Tecnología, MediSalud",
      company: "MediSalud",
      image: "/assets/images/optimized/person1.webp", // Asegúrate de que estas imágenes existan o reemplázalas
      quote: "Redujimos nuestros costos en un 70% con las soluciones locales de Infinitum. El rendimiento mejoró y nuestro equipo está más tranquilo sabiendo que los datos están bajo nuestro control.",
      stars: 5
    },
    {
      name: "Laura Mendoza",
      position: "Gerente de Operaciones, TechStart",
      company: "TechStart",
      image: "/assets/images/optimized/person2.webp",
      quote: "Como startup, cada centavo cuenta. Infinitum nos ayudó a implementar infraestructura propia sin gastar una fortuna. Ahora nuestros servicios son más rápidos y nuestros clientes más felices.",
      stars: 5
    },
    {
      name: "Carlos Jiménez",
      position: "Dueño, Bufete Jurídico Jiménez",
      company: "Bufete Jurídico Jiménez",
      image: "/assets/images/optimized/person3.webp",
      quote: "Nunca imaginé que tendríamos nuestra propia nube privada. Es extremadamente segura para nuestros documentos confidenciales y el ahorro mensual es notable.",
      stars: 5
    }
  ];

  return (
    <section id="testimonios" className="py-16 bg-white dark:bg-slate-900">
      <div className="container-custom px-4 md:px-6" id="testimonials-section">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 bg-gradient-to-r from-costwise-blue/10 to-costwise-teal/10 dark:from-costwise-teal/20 dark:to-costwise-blue/20 text-costwise-blue dark:text-costwise-teal px-6 py-3 rounded-full text-sm font-medium mb-6 border border-costwise-blue/20 dark:border-costwise-teal/30 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}>
            <Star size={16} className="text-yellow-500" />
            <span>Clientes satisfechos</span>
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-costwise-navy via-costwise-blue to-costwise-teal bg-clip-text text-transparent dark:from-white dark:via-costwise-teal dark:to-costwise-blue mb-6 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`} style={{ animationDelay: '100ms' }}>
            Lo que dicen nuestros clientes
          </h2>
          
          <p className={`text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`} style={{ animationDelay: '200ms' }}>
            Empresas reales que han optimizado sus costos y mejorado su seguridad con nuestras soluciones.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 transition-all hover:shadow-lg ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <div className="flex gap-2 mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 italic mb-6">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  {/* Opcional: puedes agregar una imagen real o usar iniciales */}
                  <div className="w-full h-full flex items-center justify-center text-lg font-bold text-costwise-blue dark:text-costwise-teal">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#contacto" 
            className="inline-flex items-center gap-2 btn-primary px-8 py-3 animate-pulse hover:animate-none"
          >
            Quiero estos resultados
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;