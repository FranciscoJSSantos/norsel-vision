import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, ArrowRight, Info } from "lucide-react";
import imgFotovoltaicas from "@/assets/servicos/solucoes_fotovoltaicas.png";
import imgProjetosEletricos from "@/assets/servicos/projetos_eletricos_insfraestrutura.png";
import imgOtimizacao from "@/assets/servicos/otimizacao_seguranca.png";
import imgSustentaveis from "@/assets/servicos/solucoes_sustentaveis.png";
import imgPericia from "@/assets/servicos/pericia_tecnica_consultoria.png";

interface Servico {
  id: string;
  titulo: string;
  descricao: string;
  caracteristicas: string[];
  imagem?: string;
}

const servicos: Servico[] = [
  {
    id: "fotovoltaicas",
    titulo: "Soluções Fotovoltaicas",
    descricao:
      "Especialidade principal da empresa. Desenvolvimento de projetos fotovoltaicos personalizados para diferentes segmentos.",
    caracteristicas: [
      "Projetos para residências, comércios e indústrias",
      "Soluções para usinas de grande escala",
      "Projetos completos e customizados",
      "Máxima eficiência e economia",
    ],
    imagem: imgFotovoltaicas,
  },
  {
    id: "projetos-eletricos",
    titulo: "Projetos Elétricos e de Infraestrutura",
    descricao:
      "Elaboração de projetos elétricos complexos que servem como base para instalações seguras e eficientes.",
    caracteristicas: [
      "Conformidade rigorosa com normas técnicas vigentes",
      "Foco em segurança nas instalações",
      "Projetos de infraestrutura elétrica",
      "Dimensionamento preciso e documentação completa",
    ],
    imagem: imgProjetosEletricos,
  },
  {
    id: "otimizacao",
    titulo: "Otimização e Segurança",
    descricao:
      "Serviços além do projeto inicial, focando na eficiência contínua e segurança máxima das instalações.",
    caracteristicas: [
      "Análise de eficiência operacional",
      "Garantia de funcionamento contínuo",
      "Maximização da segurança instalada",
      "Monitoramento e manutenção preventiva",
    ],
    imagem: imgOtimizacao,
  },
  {
    id: "sustentaveis",
    titulo: "Soluções Sustentáveis",
    descricao:
      "Impulsiona transição para futuro sustentável, expandindo além de projetos fotovoltaicos.",
    caracteristicas: [
      "Transição para energia limpa",
      "Especialização em instalações sustentáveis",
      "Foco ambiental e redução de impactos",
      "Consultoria para sustentabilidade energética",
    ],
    imagem: imgSustentaveis,
  },
  {
    id: "pericia",
    titulo: "Perícia Técnica e Consultoria",
    descricao:
      "Oferece expertise especializada para análises direcionadas e orientação estratégica.",
    caracteristicas: [
      "Análises técnicas especializadas",
      "Consultoria estratégica",
      "Parecer técnico profundo",
      "Laudos e avaliações técnicas",
    ],
    imagem: imgPericia,
  },
];

const Servicos = () => {
  const [selectedServico, setSelectedServico] = useState<Servico | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const openDialog = (servico: Servico) => {
    setSelectedServico(servico);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedServico(null);
  };

  const handleSolicitarProposta = (titulo: string) => {
    closeDialog();
    navigate("/contato", {
      state: { mensagem: `Gostaria de saber mais sobre ${titulo}` },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4 text-center">
              Nossos Serviços
            </h1>
            <p className="text-lg text-muted-foreground mb-16 text-center max-w-3xl mx-auto">
              Soluções completas em energia solar e projetos elétricos para
              residências, comércios e indústrias.
            </p>

            {/* Grid de Cards em Blocos */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicos.map((servico) => (
                <div
                  key={servico.id}
                  className="bg-card rounded-xl border border-border shadow-lg overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-xl flex flex-col"
                >
                  {/* Imagem */}
                  {servico.imagem && (
                    <div className="relative h-48 overflow-hidden bg-accent/5">
                      <img
                        src={servico.imagem}
                        alt={servico.titulo}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                    </div>
                  )}

                  {/* Conteúdo do Card */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-2xl font-heading font-bold text-accent mb-3">
                      {servico.titulo}
                    </h2>
                    <p className="text-muted-foreground mb-6 flex-grow">
                      {servico.descricao}
                    </p>

                    {/* Botão Ver Detalhes - Alinhado ao início */}
                    <div className="flex justify-start mt-auto">
                      <button
                        onClick={() => openDialog(servico)}
                        className="flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors group"
                      >
                        <Info className="w-5 h-5" />
                        Ver detalhes
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dialog de Detalhes */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                {selectedServico && (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-heading font-bold text-accent">
                        {selectedServico.titulo}
                      </DialogTitle>
                      <DialogDescription className="text-base text-muted-foreground">
                        {selectedServico.descricao}
                      </DialogDescription>
                    </DialogHeader>

                    {/* Imagem no Dialog */}
                    {selectedServico.imagem && (
                      <div className="relative h-64 overflow-hidden rounded-lg my-4">
                        <img
                          src={selectedServico.imagem}
                          alt={selectedServico.titulo}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                      </div>
                    )}

                    {/* Características */}
                    <div className="mt-4">
                      <h3 className="text-xl font-heading font-semibold mb-4 text-foreground">
                        Características:
                      </h3>
                      <ul className="space-y-3 mb-6">
                        {selectedServico.caracteristicas.map((caracteristica, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-muted-foreground"
                          >
                            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                            <span>{caracteristica}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Botão Solicitar Proposta */}
                      <Button
                        variant="accent"
                        size="lg"
                        onClick={() => handleSolicitarProposta(selectedServico.titulo)}
                        className="w-full"
                      >
                        Solicitar Proposta
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Servicos;
