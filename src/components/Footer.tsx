import { useState, useEffect } from 'react';
import { Twitter, Linkedin, Github, ArrowUp, MessageCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Footer = () => {
  const isMobile = useIsMobile();
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="bg-white dark:bg-slate-900 py-16 border-t border-gray-100 dark:border-slate-800 relative">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-semibold text-costwise-navy dark:text-white">Infinitum Solutions</span>
              <span className="text-costwise-blue dark:text-costwise-teal text-2xl">.</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Soluciones IT económicas y efectivas para empresas de todos los tamaños.
            </p>
            <div className="flex gap-4">
              {/* <a href="#" aria-label="Twitter" className="p-2 bg-gray-100 dark:bg-slate-800 rounded-full text-gray-600 dark:text-gray-400 hover:bg-costwise-blue dark:hover:bg-costwise-teal hover:text-white dark:hover:text-slate-900 transition-all">
                <Twitter size={18} />
              </a> */}
              <a href="https://www.linkedin.com/company/infinitum-solutionss" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 bg-gray-100 dark:bg-slate-800 rounded-full text-gray-600 dark:text-gray-400 hover:bg-costwise-blue dark:hover:bg-costwise-teal hover:text-white dark:hover:text-slate-900 transition-all">
                <Linkedin size={18} />
              </a>
              <a href="https://github.com/Infinitum-Solutions-SAC" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 bg-gray-100 dark:bg-slate-800 rounded-full text-gray-600 dark:text-gray-400 hover:bg-costwise-blue dark:hover:bg-costwise-teal hover:text-white dark:hover:text-slate-900 transition-all">
                <Github size={18} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-costwise-navy dark:text-white mb-4">Servicios</h4>
            <ul className="space-y-3">
              <li>
                <a href="#servicios" className="text-gray-600 dark:text-gray-400 hover:text-costwise-blue dark:hover:text-costwise-teal transition-colors">
                  Servidores locales
                </a>
              </li>
              <li>
                <a href="#beneficios" className="text-gray-600 dark:text-gray-400 hover:text-costwise-blue dark:hover:text-costwise-teal transition-colors">
                  Software libre
                </a>
              </li>
              <li>
                <a href="#hardware" className="text-gray-600 dark:text-gray-400 hover:text-costwise-blue dark:hover:text-costwise-teal transition-colors">
                  Hardware certificado
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-gray-600 dark:text-gray-400 hover:text-costwise-blue dark:hover:text-costwise-teal transition-colors">
                  Consultoría IT
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-costwise-navy dark:text-white mb-4">Empresa</h4>
            <ul className="space-y-3">
              <li>
                <a href="#testimonios" className="text-gray-600 dark:text-gray-400 hover:text-costwise-blue dark:hover:text-costwise-teal transition-colors">
                  Casos de éxito
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-gray-600 dark:text-gray-400 hover:text-costwise-blue dark:hover:text-costwise-teal transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-costwise-blue dark:hover:text-costwise-teal transition-colors">
                  Nosotros
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-costwise-navy dark:text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-costwise-blue dark:hover:text-costwise-teal transition-colors">
                  Política de privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-costwise-blue dark:hover:text-costwise-teal transition-colors">
                  Términos y condiciones
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-100 dark:border-slate-800">
          <div className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Infinitum Solutions. Todos los derechos reservados.
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Hecho con pasión por el software libre</span>
            <button 
              onClick={scrollToTop}
              className="p-2 bg-gray-100 dark:bg-slate-800 rounded-full text-gray-600 dark:text-gray-400 hover:bg-costwise-blue dark:hover:bg-costwise-teal hover:text-white dark:hover:text-slate-900 transition-all ml-4"
              aria-label="Volver arriba"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* WhatsApp flotante */}
      <a 
        href="https://wa.me/51940937600" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 left-6 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={isMobile ? 24 : 30} />
      </a>
    </footer>
  );
};

export default Footer;
