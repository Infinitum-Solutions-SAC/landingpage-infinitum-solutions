
import { Suspense, lazy } from "react";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

// Lazy loading para componentes below-the-fold
const CostCalculator = lazy(() => import("@/components/CostCalculator"));
const Hardware = lazy(() => import("@/components/Hardware"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const OpenSource = lazy(() => import("@/components/OpenSource"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

// Loading skeleton optimizado
const ComponentSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Componentes críticos above-the-fold - cargar inmediatamente */}
      <NavBar />
      <Hero />
      <Services />
      
      {/* Componentes below-the-fold - cargar con lazy loading */}
      <Suspense fallback={<div className="container-custom py-16"><ComponentSkeleton /></div>}>
        <CostCalculator />
      </Suspense>
      
      <Suspense fallback={<div className="container-custom py-16"><ComponentSkeleton /></div>}>
        <Hardware />
      </Suspense>
      
      <Suspense fallback={<div className="container-custom py-16"><ComponentSkeleton /></div>}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<div className="container-custom py-16"><ComponentSkeleton /></div>}>
        <OpenSource />
      </Suspense>
      
      <Suspense fallback={<div className="container-custom py-16"><ComponentSkeleton /></div>}>
        <Contact />
      </Suspense>
      
      <Suspense fallback={<div className="container-custom py-16"><ComponentSkeleton /></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
