
import { ArrowUp, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="bg-white py-16 border-t border-gray-100">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-semibold text-costwise-navy">Infinitum Solutions</span>
              <span className="text-costwise-blue text-2xl">.</span>
            </div>
            <p className="text-gray-600 mb-6">
              Soluciones IT económicas y efectivas para empresas de todos los tamaños.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-costwise-blue hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-costwise-blue hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-costwise-blue hover:text-white transition-all">
                <Github size={18} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-costwise-navy mb-4">Servicios</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-costwise-blue transition-colors">Servidores locales</a></li>
              <li><a href="#" className="text-gray-600 hover:text-costwise-blue transition-colors">Migración Open Source</a></li>
              <li><a href="#" className="text-gray-600 hover:text-costwise-blue transition-colors">Consultoría IT</a></li>
              <li><a href="#" className="text-gray-600 hover:text-costwise-blue transition-colors">Desarrollo personalizado</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-costwise-navy mb-4">Empresa</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-costwise-blue transition-colors">Sobre nosotros</a></li>
              <li><a href="#" className="text-gray-600 hover:text-costwise-blue transition-colors">Caso de éxito</a></li>
              <li><a href="#" className="text-gray-600 hover:text-costwise-blue transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-costwise-blue transition-colors">Contacto</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-costwise-navy mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-costwise-blue transition-colors">Términos y condiciones</a></li>
              <li><a href="#" className="text-gray-600 hover:text-costwise-blue transition-colors">Privacidad</a></li>
              <li><a href="#" className="text-gray-600 hover:text-costwise-blue transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-100">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Infinitum Solutions. Todos los derechos reservados.
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Hecho con pasión por el software libre</span>
            <button 
              onClick={scrollToTop}
              className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-costwise-blue hover:text-white transition-all ml-4"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
