import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import ClientsCarousel from "@/components/ClientsCarousel";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import EnergyBackground from "@/components/EnergyBackground";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ScrollRevealSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { elementRef, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-16"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Energy Background Effect */}
      <EnergyBackground />

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />

          <ScrollRevealSection>
            <Stats />
          </ScrollRevealSection>

          <ScrollRevealSection delay={100}>
            <About />
          </ScrollRevealSection>

          <ScrollRevealSection delay={150}>
            <Services />
          </ScrollRevealSection>

          <ScrollRevealSection delay={200}>
            <Portfolio />
          </ScrollRevealSection>

          <ScrollRevealSection delay={225}>
            <ClientsCarousel />
          </ScrollRevealSection>

          <ScrollRevealSection delay={250}>
            <CTA />
          </ScrollRevealSection>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
