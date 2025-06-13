import { Suspense, lazy } from "react";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Benefits from "@/components/Benefits";

// Lazy loading para componentes below-the-fold
// const Testimonials = lazy(() => import("@/components/Testimonials"));
const IndustrySelector = lazy(() => import("@/components/IndustrySelector"));
const Hardware = lazy(() => import("@/components/Hardware"));
const OpenSource = lazy(() => import("@/components/OpenSource"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

// Loading skeleton optimizado con dimensiones fijas
const ComponentSkeleton = () => (
  <div className="animate-pulse">
    {/* Skeleton con altura fija para prevenir CLS */}
    <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" style={{ minHeight: '256px' }}></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  </div>
);

// Skeleton específico para cada componente con alturas precisas
const HardwareSkeleton = () => (
  <div className="animate-pulse" style={{ minHeight: '600px' }}>
    <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-80 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      ))}
    </div>
  </div>
);

const OpenSourceSkeleton = () => (
  <div className="animate-pulse" style={{ minHeight: '500px' }}>
    <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>
    <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
  </div>
);

const TestimonialsSkeleton = () => (
  <div className="animate-pulse" style={{ minHeight: '400px' }}>
    <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      ))}
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Componentes críticos above-the-fold - cargar inmediatamente */}
      <NavBar />
      <Hero />
      
      {/* Beneficios emocionales - immediate load */}
      <Benefits />
      
      {/* Testimonios para aumentar la confianza - lazy loading */}
      {/* <Suspense fallback={<div className="container-custom py-16 bg-white dark:bg-slate-950"><TestimonialsSkeleton /></div>}>
        <Testimonials />
      </Suspense> */}
      
      {/* Servicios - después de construir confianza */}
      <Services />
      
      {/* Componentes técnicos below-the-fold - cargar con lazy loading */}
      <Suspense fallback={<div className="container-custom py-16 bg-white dark:bg-slate-950"><OpenSourceSkeleton /></div>}>
        <OpenSource />
      </Suspense>
      
      <Suspense fallback={<div className="container-custom py-16 bg-white dark:bg-slate-950"><HardwareSkeleton /></div>}>
        <Hardware />
      </Suspense>
      
      <Suspense fallback={<div className="container-custom py-16 bg-white dark:bg-slate-950"><ComponentSkeleton /></div>}>
        <IndustrySelector />
      </Suspense>
      
      {/* Contacto - call to action principal */}
      <Suspense fallback={<div className="container-custom py-16 bg-white dark:bg-slate-950"><ComponentSkeleton /></div>}>
        <Contact />
      </Suspense>
      
      <Suspense fallback={<div className="container-custom py-16 bg-white dark:bg-slate-950"><ComponentSkeleton /></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
