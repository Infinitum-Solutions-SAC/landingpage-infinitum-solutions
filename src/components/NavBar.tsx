import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode'; // Importar el hook

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useDarkMode(); // Usar el hook

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-2xl font-semibold text-costwise-navy dark:text-white">Infinitum Solutions</span>
          <span className="text-costwise-blue text-2xl">.</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#servicios" className="text-gray-700 dark:text-gray-300 hover:text-costwise-blue dark:hover:text-costwise-blue transition-colors">
            Servicios
          </a>
          <a href="#beneficios" className="text-gray-700 dark:text-gray-300 hover:text-costwise-blue dark:hover:text-costwise-blue transition-colors">
            Beneficios
          </a>
          <a href="#hardware" className="text-gray-700 dark:text-gray-300 hover:text-costwise-blue dark:hover:text-costwise-blue transition-colors">
            Hardware
          </a>
          <a href="#contacto" className="btn-primary">
            Consultar
          </a>
          {/* Dark Mode Toggle */}
          <button onClick={toggleTheme} className="text-gray-700 dark:text-gray-300 hover:text-costwise-blue dark:hover:text-costwise-blue transition-colors">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button onClick={toggleTheme} className="text-gray-700 dark:text-gray-300 mr-4">
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>
          <button 
            className="text-gray-700 dark:text-gray-300" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-800 shadow-lg animate-fade-in">
          <div className="container-custom py-4 flex flex-col gap-4">
            <a 
              href="#servicios" 
              className="text-gray-700 dark:text-gray-300 py-2 hover:text-costwise-blue dark:hover:text-costwise-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Servicios
            </a>
            <a 
              href="#beneficios" 
              className="text-gray-700 dark:text-gray-300 py-2 hover:text-costwise-blue dark:hover:text-costwise-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Beneficios
            </a>
            <a 
              href="#hardware" 
              className="text-gray-700 dark:text-gray-300 py-2 hover:text-costwise-blue dark:hover:text-costwise-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Hardware
            </a>
            <a 
              href="#contacto" 
              className="btn-primary text-center" 
              onClick={() => setIsMenuOpen(false)}
            >
              Consultar
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
