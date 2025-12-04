import { ArrowRight, Play } from "lucide-react";
import { Button } from "./ui/button";
import heroImage from "@/assets/hero-solar.jpg";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-[65vh] flex items-center justify-center overflow-hidden pt-20 pb-12"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Energia Solar - Norsel Engenharia"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 left-1/5 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float animation-delay-500" />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10 px-4">
        <div className="max-w-3xl">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground leading-tight opacity-0 animate-fade-up">
            Transformamos{" "}
            <span className="text-gradient">Energia</span>
            <br />
            em{" "}
            <span className="text-gradient">Eficiência</span> e{" "}
            <span className="text-gradient">Economia</span>.
          </h1>

          <p className="mt-4 md:mt-6 text-base md:text-lg text-primary-foreground/80 max-w-2xl leading-relaxed opacity-0 animate-fade-up animation-delay-200">
            Atuamos com soluções completas em energia solar e projetos elétricos
            personalizados para residências, comerciais, industriais e propriedades
            rurais. Com foco em tecnologia, segurança e resultados financeiros reais.
          </p>

          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 opacity-0 animate-fade-up animation-delay-400">
            <Button variant="hero" size="lg">
              Solicite uma Análise Técnica
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline-light" size="lg">
              <Play className="w-5 h-5" />
              Ver Projetos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
