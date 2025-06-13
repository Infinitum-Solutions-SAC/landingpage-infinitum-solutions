import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, ArrowRight, BadgePercent } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    employees: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, email, company, employees, message } = formData;

    const whatsappMessage = `Hola, quiero información sobre cómo reducir mis costos IT.

Mi nombre es ${name}
Email: ${email}
Empresa: ${company || 'No especificada'}
Número de empleados: ${employees || 'No especificado'}

Mensaje:
${message}`;

    const whatsappUrl = `https://wa.me/51940937600?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        employees: '',
        message: ''
      });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 500);
  };
  
  return (
    <section id="contacto" className="section bg-gradient-to-b from-white to-costwise-gray dark:from-slate-900 dark:to-slate-800">
      <div className="container-custom">
        {/* Banner de ahorro destacado */}
        <div className="mb-12 bg-gradient-to-r from-costwise-blue to-costwise-teal p-4 md:p-8 rounded-xl text-white text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <BadgePercent size={40} className="animate-pulse" />
            <h3 className="text-xl md:text-2xl font-bold">
              Ahora en costos de IT
            </h3>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-costwise-navy via-costwise-blue to-costwise-teal bg-clip-text text-transparent dark:from-white dark:via-costwise-teal dark:to-costwise-blue mb-4">
              ¿Quieres saber cuánto puedes ahorrar?
            </h2>
            
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-md">
              <h3 className="font-semibold text-xl mb-2 text-costwise-navy dark:text-white">Lo que incluye tu consulta gratuita:</h3>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Análisis de tus costos actuales de IT</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Propuesta personalizada con estimación de ahorro</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Plan de migración sin interrupciones</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col space-y-4">
              <h4 className="font-medium text-costwise-navy dark:text-white">También puedes contactarnos directamente:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="mailto:infinitumsolutionssac@gmail.com" className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:border-costwise-blue dark:hover:border-costwise-teal transition-colors">
                  <Mail className="text-costwise-blue dark:text-costwise-teal" />
                  <span className="text-sm">infinitumsolutionssac@gmail.com</span>
                </a>
                <a href="tel:+51940937600" className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:border-costwise-blue dark:hover:border-costwise-teal transition-colors">
                  <Phone className="text-costwise-blue dark:text-costwise-teal" />
                  <span className="text-sm">+51 940 937 600</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-xl shadow-xl animate-fade-in-up border-2 border-costwise-blue/20 dark:border-costwise-teal/20">
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-costwise-navy via-costwise-blue to-costwise-teal bg-clip-text text-transparent dark:from-white dark:via-costwise-teal dark:to-costwise-blue mb-6 text-center">
              Solicita tu consulta gratuita
            </h3>
            
            {isSubmitted && (
              <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-500/50 rounded-md text-green-700 dark:text-green-300 text-center">
                <p className="font-semibold">¡Gracias por contactarnos!</p>
                <p>Nos comunicaremos contigo en las próximas 24 horas para analizar tus opciones de ahorro.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tu nombre</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-costwise-blue focus:border-costwise-blue dark:bg-slate-800 dark:text-white dark:placeholder-gray-400"
                  placeholder="Escribe tu nombre"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tu email de contacto</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-costwise-blue focus:border-costwise-blue dark:bg-slate-800 dark:text-white dark:placeholder-gray-400"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Empresa</label>
                  <input 
                    type="text" 
                    name="company" 
                    id="company" 
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-costwise-blue focus:border-costwise-blue dark:bg-slate-800 dark:text-white dark:placeholder-gray-400"
                    placeholder="Nombre de tu empresa"
                  />
                </div>
                <div>
                  <label htmlFor="employees" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tamaño de empresa</label>
                  <select 
                    name="employees" 
                    id="employees" 
                    value={formData.employees}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-costwise-blue focus:border-costwise-blue dark:bg-slate-800 dark:text-white"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="1-10">1-10 empleados</option>
                    <option value="11-50">11-50 empleados</option>
                    <option value="51-200">51-200 empleados</option>
                    <option value="201-500">201-500 empleados</option>
                    <option value="500+">Más de 500</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">¿Cuál es tu principal preocupación?</label>
                <textarea 
                  name="message" 
                  id="message" 
                  rows={3} 
                  required 
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-costwise-blue focus:border-costwise-blue dark:bg-slate-800 dark:text-white dark:placeholder-gray-400 resize-none"
                  placeholder="Costos elevados, seguridad, rendimiento..."
                ></textarea>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-lg disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <span>Quiero saber cuánto puedo ahorrar</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                  Sin compromiso • Respuesta en 24h • 100% confidencial
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
