import { ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "./ui/button";

const CTA = () => {
  return (
    <section className="py-20 md:py-32 bg-navy-gradient relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight">
            Pronto para transformar sua{" "}
            <span className="text-gradient">relação com a energia?</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Entre em contato conosco e descubra como podemos ajudar você a
            economizar e contribuir para um futuro mais sustentável.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl">
              Solicite uma Análise Gratuita
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-primary-foreground/70">
            <a
              href="tel:+5579998305785"
              className="flex items-center gap-3 hover:text-accent transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>(79) 99830-5785</span>
            </a>
            <a
              href="mailto:contato@norsel.com.br"
              className="flex items-center gap-3 hover:text-accent transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>contato@norsel.com.br</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
