import Header from "@/components/Header";
import Footer from "@/components/Footer";
import solarImage from "@/assets/solar-project-1.jpg";
import { CheckCircle2 } from "lucide-react";

const Sobre = () => {
  const diferenciais = [
    "Alta aprovação junto a concessionárias com documentação clara",
    "Atendimento consultivo do início ao fim",
    "Qualidade e segurança conforme normas técnicas",
    "Projetos organizados com layouts limpos e listas de materiais",
    "Cronogramas objetivos e monitoramento de prazos",
    "Pós-obra com comissionamento e testes",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-6xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Sobre a Norsel Engenharia
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Projetos bem dimensionados, seguros e com execução limpa.
            </p>
          </div>

          {/* Quem Somos - Com Imagem */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                  Quem Somos
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    A <strong className="text-foreground">Norsel Engenharia</strong> é uma empresa jovem especializada em soluções de engenharia elétrica, com sede em <strong className="text-foreground">Aracaju/SE</strong>.
                  </p>
                  <p>
                    Nossa proposta central é fornecer <strong className="text-accent">projetos bem dimensionados, seguros e com execução limpa</strong>, transformando o cenário energético do Nordeste.
                  </p>
                  <p>
                    Apesar de sermos uma empresa recente, nossa fundação baseia-se em <strong className="text-foreground">mais de uma década de experiência em gestão, consultoria e docência na área elétrica</strong>.
                  </p>
                  <p>
                    Combinamos <strong className="text-accent">o dinamismo de uma nova empresa com o conhecimento de quem liderou grandes projetos e equipes</strong>.
                  </p>
                </div>

                {/* Área de Atuação */}
                <div className="mt-8 p-6 bg-accent/10 rounded-lg border border-accent/20">
                  <h3 className="text-lg font-heading font-bold text-foreground mb-3">
                    Área de Atuação
                  </h3>
                  <p className="text-muted-foreground">
                    <strong className="text-accent">Sergipe • Bahia • Alagoas</strong>
                  </p>
                </div>
              </div>

              {/* Imagem */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={solarImage}
                    alt="Projeto Norsel Engenharia"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <p className="text-2xl font-heading font-bold">
                      Mais de 10 anos de experiência
                    </p>
                    <p className="text-white/80 mt-2">
                      Em gestão, consultoria e docência na área elétrica
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Missão */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="bg-card rounded-lg p-8 shadow-md border border-border">
              <h2 className="text-2xl font-heading font-bold mb-4 text-accent">
                Nossa Missão
              </h2>
              <p className="text-muted-foreground text-lg">
                Entregar <strong className="text-foreground">projetos seguros, eficientes e inovadores</strong>,
                garantindo a satisfação de nossos clientes e o <strong className="text-foreground">desenvolvimento
                sustentável da região</strong>.
              </p>
            </div>
          </div>

          {/* Diferenciais */}
          <div className="max-w-6xl mx-auto mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
              Nossos Diferenciais
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {diferenciais.map((diferencial, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-6 shadow-md border border-border flex items-start gap-4 hover:border-accent/50 transition-colors"
                >
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">{diferencial}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Expertise */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
              Nossa Expertise
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg p-8 shadow-md border border-border text-center hover:border-accent/50 transition-colors">
                <h3 className="text-xl font-heading font-bold text-accent mb-3">
                  Projetos Elétricos
                </h3>
                <p className="text-muted-foreground">
                  Soluções completas em projetos elétricos residenciais, comerciais e industriais
                </p>
              </div>

              <div className="bg-card rounded-lg p-8 shadow-md border border-border text-center hover:border-accent/50 transition-colors">
                <h3 className="text-xl font-heading font-bold text-accent mb-3">
                  Soluções Fotovoltaicas
                </h3>
                <p className="text-muted-foreground">
                  Projetos de energia solar com máxima eficiência e economia
                </p>
              </div>

              <div className="bg-card rounded-lg p-8 shadow-md border border-border text-center hover:border-accent/50 transition-colors">
                <h3 className="text-xl font-heading font-bold text-accent mb-3">
                  Consultoria Técnica
                </h3>
                <p className="text-muted-foreground">
                  Consultoria especializada com foco em segurança e eficiência
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sobre;
