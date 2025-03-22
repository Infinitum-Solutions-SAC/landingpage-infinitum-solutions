
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CostComparison from "@/components/CostComparison";
import Hardware from "@/components/Hardware";
import Testimonials from "@/components/Testimonials";
import OpenSource from "@/components/OpenSource";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CostCalculator from "@/components/CostCalculator";

const Index = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Hero />
      <Services />
      <CostCalculator />
      <CostComparison />
      <Hardware />
      <Testimonials />
      <OpenSource />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
