import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

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

    const whatsappMessage = `Hola, mi nombre es ${name}.
Email: ${email}
Empresa: ${company || 'No especificada'}
Número de empleados: ${employees || 'No especificado'}

Mensaje:
${message}`;

    const whatsappUrl = `https://wa.me/51940937600?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, '_blank');

    // Mantener la lógica de feedback visual
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
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 500); // Reducir el tiempo de espera ya que la acción principal es abrir WhatsApp
  };
  
  return (
    <section id="contacto" className="section bg-costwise-gray dark:bg-slate-800">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-costwise-navy dark:text-white mb-4">
              ¿Listo para reducir tus costos IT?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Agenda una consulta gratuita para evaluar cuánto puedes ahorrar
              con nuestras soluciones personalizadas.
            </p>
            
            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-costwise-blue/10 dark:bg-costwise-teal/20 rounded-full flex-shrink-0">
                  <Mail size={20} className="text-costwise-blue dark:text-costwise-teal" />
                </div>
                <div>
                  <h4 className="font-medium text-costwise-navy dark:text-white">Email</h4>
                  <a
                    href="mailto:infinitumsolutionssac@gmail.com"
                    className="text-gray-600 dark:text-gray-400 hover:text-costwise-blue dark:hover:text-costwise-teal transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    infinitumsolutionssac@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-costwise-blue/10 dark:bg-costwise-teal/20 rounded-full flex-shrink-0">
                  <Phone size={20} className="text-costwise-blue dark:text-costwise-teal" />
                </div>
                <div>
                  <h4 className="font-medium text-costwise-navy dark:text-white">Teléfono</h4>
                  <a href="tel:+51940937600" className="text-gray-600 dark:text-gray-400 hover:text-costwise-blue dark:hover:text-costwise-teal transition-colors">
                    +51 940 937 600
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-costwise-blue/10 dark:bg-costwise-teal/20 rounded-full flex-shrink-0">
                  <MapPin size={20} className="text-costwise-blue dark:text-costwise-teal" />
                </div>
                <div>
                  <h4 className="font-medium text-costwise-navy dark:text-white">Ubicación</h4>
                  <p className="text-gray-600 dark:text-gray-400">Lima, Perú (Servicio remoto a nivel nacional)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-xl shadow-xl animate-fade-in-up">
            <h3 className="text-2xl font-semibold text-costwise-navy dark:text-white mb-6">Envíanos un mensaje</h3>
            
            {isSubmitted && (
              <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-500/50 rounded-md text-green-700 dark:text-green-300 text-sm">
                ¡Mensaje enviado! Nos pondremos en contacto contigo pronto.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre completo</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-costwise-blue focus:border-costwise-blue dark:bg-slate-800 dark:text-white dark:placeholder-gray-400"
                  placeholder="Tu nombre"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-costwise-blue focus:border-costwise-blue dark:bg-slate-800 dark:text-white dark:placeholder-gray-400"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Empresa (Opcional)</label>
                  <input 
                    type="text" 
                    name="company" 
                    id="company" 
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-costwise-blue focus:border-costwise-blue dark:bg-slate-800 dark:text-white dark:placeholder-gray-400"
                    placeholder="Nombre de tu empresa"
                  />
                </div>
                <div>
                  <label htmlFor="employees" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nº de empleados (Opcional)</label>
                  <select 
                    name="employees" 
                    id="employees" 
                    value={formData.employees}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-costwise-blue focus:border-costwise-blue dark:bg-slate-800 dark:text-white"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mensaje</label>
                <textarea 
                  name="message" 
                  id="message" 
                  rows={4} 
                  required 
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-costwise-blue focus:border-costwise-blue dark:bg-slate-800 dark:text-white dark:placeholder-gray-400 resize-none"
                  placeholder="¿Cómo podemos ayudarte?"
                ></textarea>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2"/>
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
