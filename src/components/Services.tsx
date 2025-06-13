import { useState } from 'react';
import { Server, Users, Code, Lightbulb, ArrowRight, Check } from 'lucide-react';

const Accordion = ({ items }: { items: { title: string; content: string }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="border rounded-lg bg-white/80 dark:bg-slate-800/80">
          <button
            className="w-full flex justify-between items-center px-4 py-3 text-left text-base font-medium text-costwise-blue dark:text-costwise-teal focus:outline-none"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            aria-expanded={openIndex === idx}
          >
            {item.title}
            <span className={`transition-transform ml-2 ${openIndex === idx ? 'rotate-90' : ''}`}>▶</span>
          </button>
          {openIndex === idx && (
            <div className="px-4 pb-3 text-sm text-gray-600 dark:text-gray-300 animate-fade-in">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Services = () => {
  const [activeCase, setActiveCase] = useState<'emprendedor' | 'empresa'>('emprendedor');

  // Datos para acordeón
  const emprendedorItems = [
    {
      title: 'Configuraciones pre-establecidas',
      content: 'Scripts automáticos que configuran todo tu entorno con las mejores herramientas open source.'
    },
    {
      title: 'Hardware básico asequible',
      content: 'Opciones de hardware económicas pero eficientes para tus servidores locales.'
    },
    {
      title: 'Capacitación básica',
      content: 'Te enseñamos lo esencial para administrar tu infraestructura.'
    }
  ];
  const empresaItems = [
    {
      title: 'Evaluación personalizada',
      content: 'Analizamos tu infraestructura actual y desarrollamos un plan de migración a medida.'
    },
    {
      title: 'Soluciones escalables',
      content: 'Hardware y software diseñados para crecer con tu empresa.'
    },
    {
      title: 'Capacitación completa y soporte',
      content: 'Entrenamos a tu equipo y ofrecemos soporte continuo para asegurar operaciones fluidas.'
    },
    {
      title: 'Sistemas 100% auditables',
      content: 'Software libre cuyo código fuente puede ser revisado por tu equipo o auditores externos.'
    },
    {
      title: 'Aprovechamiento de hardware',
      content: 'Evaluamos tus equipos actuales para reutilizarlos como servidores y reducir la inversión.'
    }
  ];

  return (
    <section id="servicios" className="section bg-gradient-to-b from-costwise-gray to-white dark:from-slate-800 dark:to-slate-900 py-8 sm:py-16">
      <div className="container-custom px-2 sm:px-0">
        <div className="text-center mb-8 sm:mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-costwise-navy via-costwise-blue to-costwise-teal bg-clip-text text-transparent dark:from-white dark:via-costwise-teal dark:to-costwise-blue mb-2 sm:mb-4">
            Soluciones adaptadas a tus necesidades
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto text-sm sm:text-base">
            Ofrecemos servicios personalizados con software 100% auditable y sin problemas de licencias. Reutilizamos tu hardware existente o implementamos equipos nuevos según tu presupuesto.
          </p>
        </div>

        <div className="flex justify-center mb-6 sm:mb-12">
          <div className="inline-flex p-1 bg-gray-100 dark:bg-slate-700 rounded-full">
            <button
              className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeCase === 'emprendedor'
                  ? 'bg-costwise-blue text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveCase('emprendedor')}
            >
              Emprendedores
            </button>
            <button
              className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeCase === 'empresa'
                  ? 'bg-costwise-blue text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveCase('empresa')}
            >
              Empresas establecidas
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-12 items-center relative">
          {activeCase === 'emprendedor' ? (
            <>
              {/* Imagen decorativa solo visible en sm+ */}
              <img
                src="/assets/images/hardware/cluster.webp"
                alt="Cluster hardware"
                className="hidden sm:block absolute pointer-events-none opacity-40 max-w-[120px] sm:max-w-xs drop-shadow-xl rotate-2 sm:rotate-[10deg]"
                style={{ zIndex: 0, right: '-15px', bottom: '-35px' }}
              />
              <div className="space-y-4 animate-fade-in max-w-2xl mx-auto relative z-10 bg-white/70 dark:bg-slate-900/70 rounded-xl p-4 sm:p-8 shadow-md">
                <h3 className="text-lg sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-costwise-navy via-costwise-blue to-costwise-teal bg-clip-text text-transparent dark:from-white dark:via-costwise-teal dark:to-costwise-blue">
                  Para emprendedores que buscan reducir costos iniciales
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  Si estás comenzando tu negocio y buscas optimizar tus gastos en infraestructura tecnológica, tenemos la solución perfecta para ti.
                </p>
                <Accordion items={emprendedorItems} />
                <a href="#hardware" className="inline-flex items-center text-costwise-blue dark:text-costwise-teal font-medium gap-2 mt-2 sm:mt-4 text-sm sm:text-base">
                  Ver opciones de hardware <ArrowRight size={16} />
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4 animate-fade-in max-w-2xl mx-auto bg-white/70 dark:bg-slate-900/70 rounded-xl p-4 sm:p-8 shadow-md">
                <h3 className="text-lg sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-costwise-navy via-costwise-blue to-costwise-teal bg-clip-text text-transparent dark:from-white dark:via-costwise-teal dark:to-costwise-blue">
                  Para empresas establecidas que buscan optimizar costos
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  Si ya tienes una empresa en funcionamiento y buscas reducir el gasto en servicios cloud y licencias, ofrecemos soluciones a medida.
                </p>
                <Accordion items={empresaItems} />
                <a href="#contacto" className="inline-flex items-center text-costwise-blue dark:text-costwise-teal font-medium gap-2 mt-2 sm:mt-4 text-sm sm:text-base">
                  Solicitar evaluación gratuita <ArrowRight size={16} />
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
