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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Edit, Trash2, Plus, GripVertical, X } from "lucide-react";
import arena_gm_society from "@/assets/portfolio/arena_gm_society.png";
import rt_alevinos from "@/assets/portfolio/rt_alevinos.png";
import fabio_especialista_solar from "@/assets/portfolio/fabio_especialista_solar.png";
import hotel_tropical from "@/assets/portfolio/hotel_tropical.png";
import maggs_sanduiches from "@/assets/portfolio/maggs_sanduiches.png";
import santa_pizza_gourmet from "@/assets/portfolio/santa_pizza_gourmet.png";

interface Projeto {
  id: number;
  nome: string;
  local: string;
  ano: string;
  descricao: string;
  imagem: string;
}

const initialProjects: Projeto[] = [
  {
    id: 1,
    nome: "Arena GM Society",
    local: "Ametista do Sul - RS",
    ano: "2024",
    descricao:
      "Usina fotovoltaica em complexo esportivo, com layout otimizado, segurança elétrica e alto rendimento.",
    imagem: arena_gm_society,
  },
  {
    id: 2,
    nome: "RT Alevinos",
    local: "RS",
    ano: "2023",
    descricao:
      "Sistema fotovoltaico para operação contínua, com proteção adequada e excelente relação custo‑benefício.",
    imagem: rt_alevinos,
  },
  {
    id: 3,
    nome: "Fábio Especialista Solar",
    local: "",
    ano: "2025",
    descricao:
      "Projeto fotovoltaico com dimensionamento preciso, cabeamento organizado e conformidade com normas e concessionária.",
    imagem: fabio_especialista_solar,
  },
  {
    id: 4,
    nome: "Hotel Tropical",
    local: "",
    ano: "2025",
    descricao:
      "Solução on‑grid para hotelaria, integrando estética do telhado, monitoramento e segurança operacional.",
    imagem: hotel_tropical,
  },
  {
    id: 5,
    nome: "Santa Pizza Gourmet",
    local: "",
    ano: "",
    descricao:
      "Sistema comercial on‑grid focado em economia mensal e confiabilidade, com comissionamento completo.",
    imagem: santa_pizza_gourmet,
  },
  {
    id: 6,
    nome: "Magg's Sanduíches",
    local: "",
    ano: "",
    descricao:
      "Projeto para estabelecimento comercial com estudo de carga, execução limpa e padronização elétrica.",
    imagem: maggs_sanduiches,
  },
];

const Portfolio = () => {
  const [projects, setProjects] = useState<Projeto[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Projeto | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Projeto | null>(null);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const navigate = useNavigate();

  const openDialog = (projeto: Projeto) => {
    setSelectedProject(projeto);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedProject(null);
  };

  const handleEstouInteressado = (nome: string) => {
    closeDialog();
    navigate("/contato", {
      state: { mensagem: `Gostaria de saber mais sobre o projeto ${nome}` },
    });
  };

  const handleCreateProject = () => {
    const newId = Math.max(...projects.map((p) => p.id), 0) + 1;
    setEditingProject({
      id: newId,
      nome: "",
      local: "",
      ano: "",
      descricao: "",
      imagem: "",
    });
    setIsEditDialogOpen(true);
  };

  const handleEditProject = (projeto: Projeto) => {
    setEditingProject({ ...projeto });
    setIsEditDialogOpen(true);
  };

  const handleDeleteProject = (id: number) => {
    if (confirm("Tem certeza que deseja remover este projeto?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const handleSaveProject = () => {
    if (!editingProject) return;

    if (projects.find((p) => p.id === editingProject.id)) {
      setProjects(
        projects.map((p) => (p.id === editingProject.id ? editingProject : p))
      );
    } else {
      setProjects([...projects, editingProject]);
    }
    setIsEditDialogOpen(false);
    setEditingProject(null);
  };

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;

    const newProjects = [...projects];
    const draggedProject = newProjects[draggedItem];
    newProjects.splice(draggedItem, 1);
    newProjects.splice(index, 0, draggedProject);

    setProjects(newProjects);
    setDraggedItem(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                  Nosso Portfólio
                </h1>
                <p className="text-lg text-muted-foreground mb-6 md:mb-0">
                  Conheça alguns dos projetos que já realizamos com excelência e
                  dedicação.
                </p>
              </div>
              <Button
                variant={isEditMode ? "outline" : "default"}
                onClick={() => setIsEditMode(!isEditMode)}
                className="self-start md:self-auto whitespace-nowrap"
                size="lg"
              >
                {isEditMode ? (
                  <>
                    <X className="w-4 h-4" />
                    Sair do modo edição
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4" />
                    Modo edição
                  </>
                )}
              </Button>
            </div>

            {isEditMode && (
              <div className="mb-8">
                <Button onClick={handleCreateProject} variant="accent">
                  <Plus className="w-4 h-4" />
                  Criar novo projeto
                </Button>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((projeto, index) => (
                <div
                  key={projeto.id}
                  draggable={isEditMode}
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`bg-card rounded-xl border border-border shadow-lg overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-xl flex flex-col relative ${
                    isEditMode ? "cursor-move" : "cursor-pointer"
                  }`}
                >
                  {isEditMode && (
                    <div className="absolute top-2 left-2 z-10 bg-background/90 rounded-full p-2">
                      <GripVertical className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}

                  <div
                    className="relative h-48 overflow-hidden bg-accent/5"
                    onClick={() => !isEditMode && openDialog(projeto)}
                  >
                    {projeto.imagem ? (
                      <>
                        <img
                          src={projeto.imagem}
                          alt={projeto.nome}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                            (
                              e.target as HTMLImageElement
                            ).parentElement!.classList.add(
                              "flex",
                              "items-center",
                              "justify-center"
                            );
                            (
                              e.target as HTMLImageElement
                            ).parentElement!.innerHTML +=
                              '<p class="text-muted-foreground">Imagem do Projeto</p>';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">
                          Imagem do Projeto
                        </p>
                      </div>
                    )}
                  </div>

                  <div
                    className="p-6 flex flex-col flex-grow"
                    onClick={() => !isEditMode && openDialog(projeto)}
                  >
                    <h2 className="text-2xl font-heading font-bold text-accent mb-2">
                      {projeto.nome}
                    </h2>
                    {(projeto.local || projeto.ano) && (
                      <p className="text-sm text-muted-foreground mb-3">
                        {[projeto.local, projeto.ano]
                          .filter(Boolean)
                          .join(" - ")}
                      </p>
                    )}
                    <p className="text-muted-foreground mb-6 flex-grow line-clamp-3">
                      {projeto.descricao}
                    </p>

                    <div className="flex justify-between items-center mt-auto">
                      {!isEditMode ? (
                        <button className="flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors group">
                          Ver detalhes
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditProject(projeto);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProject(projeto.id);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dialog de Detalhes */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                {selectedProject && (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-heading font-bold text-accent">
                        {selectedProject.nome}
                      </DialogTitle>
                      {(selectedProject.local || selectedProject.ano) && (
                        <DialogDescription className="text-base text-muted-foreground">
                          {[selectedProject.local, selectedProject.ano]
                            .filter(Boolean)
                            .join(" - ")}
                        </DialogDescription>
                      )}
                    </DialogHeader>

                    {selectedProject.imagem && (
                      <div className="relative h-64 overflow-hidden rounded-lg my-4">
                        <img
                          src={selectedProject.imagem}
                          alt={selectedProject.nome}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                            (
                              e.target as HTMLImageElement
                            ).parentElement!.classList.add(
                              "flex",
                              "items-center",
                              "justify-center"
                            );
                            (
                              e.target as HTMLImageElement
                            ).parentElement!.innerHTML +=
                              '<p class="text-muted-foreground">Imagem do Projeto</p>';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                      </div>
                    )}

                    <div className="mt-4">
                      <h3 className="text-xl font-heading font-semibold mb-4 text-foreground">
                        Sobre o projeto:
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {selectedProject.descricao}
                      </p>

                      <Button
                        variant="accent"
                        size="lg"
                        onClick={() =>
                          handleEstouInteressado(selectedProject.nome)
                        }
                        className="w-full"
                      >
                        Estou interessado
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>

            {/* Dialog de Edição/Criação */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                {editingProject && (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-heading font-bold">
                        {projects.find((p) => p.id === editingProject.id)
                          ? "Editar Projeto"
                          : "Criar Novo Projeto"}
                      </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Nome do Projeto
                        </label>
                        <Input
                          value={editingProject.nome}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              nome: e.target.value,
                            })
                          }
                          placeholder="Ex: Arena GM Society"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Local
                          </label>
                          <Input
                            value={editingProject.local}
                            onChange={(e) =>
                              setEditingProject({
                                ...editingProject,
                                local: e.target.value,
                              })
                            }
                            placeholder="Ex: Ametista do Sul - RS"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Ano
                          </label>
                          <Input
                            value={editingProject.ano}
                            onChange={(e) =>
                              setEditingProject({
                                ...editingProject,
                                ano: e.target.value,
                              })
                            }
                            placeholder="Ex: 2024"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Descrição
                        </label>
                        <Textarea
                          value={editingProject.descricao}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              descricao: e.target.value,
                            })
                          }
                          placeholder="Descreva o projeto..."
                          rows={4}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          URL da Imagem
                        </label>
                        <Input
                          value={editingProject.imagem}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              imagem: e.target.value,
                            })
                          }
                          placeholder="Ex: @assets/portfolio/projeto.png"
                        />
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditDialogOpen(false);
                            setEditingProject(null);
                          }}
                          className="flex-1"
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="accent"
                          onClick={handleSaveProject}
                          className="flex-1"
                          disabled={
                            !editingProject.nome || !editingProject.descricao
                          }
                        >
                          Salvar
                        </Button>
                      </div>
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

export default Portfolio;
