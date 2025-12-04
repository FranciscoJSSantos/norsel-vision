import { Settings, Award, TrendingDown, Shield, Gauge } from "lucide-react";
import solarProject1 from "@/assets/solar-project-1.jpg";

const features = [
  {
    icon: Settings,
    title: "Soluções sob medida",
    description:
      "Projetos personalizados que integram eficiência, segurança e inovação para atender às necessidades de cada cliente.",
  },
  {
    icon: Award,
    title: "Engenharia de excelência",
    description:
      "Equipe qualificada e tecnologia de ponta para garantir desempenho, economia e sustentabilidade.",
  },
];

const benefits = [
  {
    icon: TrendingDown,
    title: "Economia real",
    description:
      "Reduza o consumo de energia e veja a diminuição direta nos custos operacionais.",
  },
  {
    icon: Shield,
    title: "Segurança e conformidade",
    description:
      "Proteja o patrimônio e atenda às normas técnicas exigidas com credibilidade.",
  },
  {
    icon: Gauge,
    title: "Desempenho e produtividade",
    description:
      "Projetos com alto desempenho e monitoramento para extrair o máximo do investimento.",
  },
];

const About = () => {
  return (
    <section id="sobre" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Construindo o futuro,{" "}
              <span className="text-gradient">uma conexão de cada vez.</span>
            </h2>

            <div className="mt-8 space-y-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex gap-4 p-4 rounded-xl bg-card hover:shadow-medium transition-shadow duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground text-lg">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-muted-foreground leading-relaxed">
              Na Norsel, cada projeto representa um avanço real em eficiência
              energética. Com soluções inteligentes e seguras, entregamos economia,
              desempenho e credibilidade. Nosso compromisso é transformar ideias em
              resultados concretos para empresas e famílias.
            </p>
          </div>

          {/* Image with Stats Overlay */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-strong">
              <img
                src={solarProject1}
                alt="Projeto Solar Norsel"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 md:left-auto md:-right-6 bg-accent text-accent-foreground p-6 rounded-2xl shadow-orange">
              <div className="text-center">
                <span className="text-4xl font-heading font-bold">+99%</span>
                <p className="text-sm mt-1 opacity-90">
                  de aprovação na<br />primeira submissão
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mt-20 md:mt-32">
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="group p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-medium transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-navy-gradient flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-xl mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
