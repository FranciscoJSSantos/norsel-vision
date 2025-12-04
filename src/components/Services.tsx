import { Sun, Leaf, Zap, FileSearch, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const services = [
  {
    icon: Sun,
    title: "Soluções Fotovoltaicas",
    description:
      "Projetos completos de energia solar para residências, comércios e indústrias com máxima eficiência e retorno garantido.",
    features: ["Projetos on-grid e off-grid", "Dimensionamento técnico", "Monitoramento remoto"],
  },
  {
    icon: Leaf,
    title: "Soluções Sustentáveis",
    description:
      "Consultoria e implementação de práticas sustentáveis para reduzir o impacto ambiental do seu negócio.",
    features: ["Eficiência energética", "Redução de carbono", "Certificações verdes"],
  },
  {
    icon: Zap,
    title: "Projetos Elétricos",
    description:
      "Engenharia elétrica completa para infraestrutura residencial, comercial e industrial com total conformidade.",
    features: ["Baixa e média tensão", "Automação", "Adequação às normas"],
  },
  {
    icon: FileSearch,
    title: "Perícia e Consultoria",
    description:
      "Análises técnicas especializadas, laudos e consultoria para garantir segurança e conformidade dos sistemas.",
    features: ["Laudos técnicos", "Análise de viabilidade", "Auditoria energética"],
  },
];

const Services = () => {
  return (
    <section id="servicos" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-heading font-semibold uppercase tracking-widest text-sm">
            Nossos Serviços
          </span>
          <h2 className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Está pronto para integrar{" "}
            <span className="text-gradient">inovação, segurança e economia?</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Nossas soluções unem inteligência técnica e dimensão personalizada para
            garantir alto desempenho, redução de custos e um futuro mais eficiente.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative p-8 md:p-10 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-300 overflow-hidden"
            >
              {/* Background Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-navy-gradient flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-foreground text-xl md:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Features List */}
                <ul className="mt-6 space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <a
                  href="#contato"
                  className="mt-6 inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all duration-300"
                >
                  Saiba mais
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button variant="accent" size="xl">
            Solicitar Orçamento
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
