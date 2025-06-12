import { useState, useEffect } from 'react';
import { Shield, Coins, Lock, Clock, Zap, Heart } from 'lucide-react';

const Benefits = () => {
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
    
    const element = document.getElementById('benefits-section');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);
  
  const benefits = [
    {
      title: "Ahorra hasta un 70%",
      description: "Reduce drásticamente tu gasto mensual en servicios cloud sin perder funcionalidades",
      icon: Coins,
      delay: 100
    },
    {
      title: "Control total de tus datos",
      description: "Información confidencial en tus servidores, sin terceros, sin sorpresas",
      icon: Lock,
      delay: 200
    },
    {
      title: "Soporte personalizado",
      description: "Asistencia directa con técnicos que conocen tu entorno específico",
      icon: Heart,
      delay: 300
    },
    {
      title: "Mayor seguridad",
      description: "Soluciones robustas que protegen tu empresa de amenazas externas",
      icon: Shield,
      delay: 400
    },
    {
      title: "Mejor rendimiento",
      description: "Velocidad superior sin depender de conexiones a internet lentas",
      icon: Zap,
      delay: 500
    },
    {
      title: "Disponibilidad 24/7",
      description: "Tu infraestructura siempre funciona, incluso sin internet",
      icon: Clock,
      delay: 600
    }
  ];

  return (
    <section id="beneficios-emocionales" className="py-16 bg-gradient-to-b from-white to-costwise-gray/20 dark:from-slate-900 dark:to-slate-800/20">
      <div className="container-custom px-4 md:px-6" id="benefits-section">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 bg-gradient-to-r from-costwise-blue/10 to-costwise-teal/10 dark:from-costwise-teal/20 dark:to-costwise-blue/20 text-costwise-blue dark:text-costwise-teal px-6 py-3 rounded-full text-sm font-medium mb-6 border border-costwise-blue/20 dark:border-costwise-teal/30 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}>
            <Heart size={16} className="text-red-500" />
            <span>Beneficios reales</span>
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-costwise-navy via-costwise-blue to-costwise-teal bg-clip-text text-transparent dark:from-white dark:via-costwise-teal dark:to-costwise-blue mb-6 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`} style={{ animationDelay: '100ms' }}>
            Soluciones que mejoran tu negocio
          </h2>
          
          <p className={`text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`} style={{ animationDelay: '200ms' }}>
            No solo reducimos costos, creamos tranquilidad y control sobre tu tecnología
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={index}
                className={`bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-all hover:shadow-md ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${benefit.delay}ms` }}
              >
                <div className="bg-gradient-to-br from-costwise-blue/20 to-costwise-teal/20 dark:from-costwise-blue/30 dark:to-costwise-teal/30 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <IconComponent size={24} className="text-costwise-blue dark:text-costwise-teal" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#testimonios" 
            className="inline-flex items-center gap-2 btn-secondary px-8 py-3"
          >
            Ver quiénes confían en nosotros
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down">
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Benefits;