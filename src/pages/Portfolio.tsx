import { useState, useEffect } from "react";
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
import { toast } from "sonner";
import {
  useProjetos,
  useCreateProjeto,
  useUpdateProjeto,
  useDeleteProjeto,
  useReorderProjetos,
} from "@/hooks/useNorsel";
import type { Projeto, ProjetoCreate, ProjetoUpdate } from "@/types/norsel";
import ImageUpload from "@/components/ImageUpload";

const Portfolio = () => {
  // React Query hooks
  const { data: projetosFromApi, isLoading, error } = useProjetos();
  const createMutation = useCreateProjeto();
  const updateMutation = useUpdateProjeto();
  const deleteMutation = useDeleteProjeto();
  const reorderMutation = useReorderProjetos();

  // Local state para drag & drop e UI
  const [projects, setProjects] = useState<Projeto[]>([]);
  const [selectedProject, setSelectedProject] = useState<Projeto | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Projeto> | null>(
    null
  );
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [hasReordered, setHasReordered] = useState(false);
  const navigate = useNavigate();

  // Sincronizar dados da API com estado local
  useEffect(() => {
    if (projetosFromApi) {
      setProjects(projetosFromApi);
    }
  }, [projetosFromApi]);

  // Mostrar erro se houver
  useEffect(() => {
    if (error) {
      toast.error(
        "Erro ao carregar projetos. Verifique se a API está rodando."
      );
    }
  }, [error]);

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
    setEditingProject({
      nome: "",
      local: "",
      ano: "",
      descricao: "",
      imagem: "",
      ordem: projects.length,
    });
    setIsEditDialogOpen(true);
  };

  const handleEditProject = (projeto: Projeto) => {
    setEditingProject({ ...projeto });
    setIsEditDialogOpen(true);
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Tem certeza que deseja remover este projeto?")) return;

    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Projeto removido com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao remover projeto");
    }
  };

  const handleSaveProject = async () => {
    if (!editingProject) return;

    // Validações
    if (
      !editingProject.nome ||
      !editingProject.descricao ||
      !editingProject.ano ||
      !editingProject.local ||
      !editingProject.imagem
    ) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      if (editingProject.id) {
        // Atualizar
        const { id, created_at, updated_at, ...updateData } =
          editingProject as Projeto;
        await updateMutation.mutateAsync({
          id,
          projeto: updateData as ProjetoUpdate,
        });
        toast.success("Projeto atualizado com sucesso!");
      } else {
        // Criar
        const { id, created_at, updated_at, ...createData } =
          editingProject as any;
        await createMutation.mutateAsync(createData as ProjetoCreate);
        toast.success("Projeto criado com sucesso!");
      }
      setIsEditDialogOpen(false);
      setEditingProject(null);
    } catch (error: any) {
      toast.error(error.message || "Erro ao salvar projeto");
    }
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
    setHasReordered(true);
  };

  const handleDragEnd = async () => {
    setDraggedItem(null);

    if (hasReordered) {
      // Salvar nova ordem na API
      const reorderData = projects.map((projeto, index) => ({
        id: projeto.id,
        ordem: index,
      }));

      try {
        await reorderMutation.mutateAsync(reorderData);
        toast.success("Ordem dos projetos atualizada!");
        setHasReordered(false);
      } catch (error: any) {
        toast.error("Erro ao reordenar projetos");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <p className="text-lg text-muted-foreground">
                Carregando projetos...
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                        {editingProject.id
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
                          value={editingProject.nome || ""}
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
                            value={editingProject.local || ""}
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
                            value={editingProject.ano || ""}
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
                          value={editingProject.descricao || ""}
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

                      <ImageUpload
                        currentImage={editingProject.imagem}
                        onImageChange={(imageUrl) =>
                          setEditingProject({
                            ...editingProject,
                            imagem: imageUrl,
                          })
                        }
                        folder="projetos"
                        label="Imagem do Projeto"
                      />

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
                            !editingProject.nome ||
                            !editingProject.descricao ||
                            !editingProject.ano ||
                            !editingProject.local ||
                            !editingProject.imagem ||
                            createMutation.isPending ||
                            updateMutation.isPending
                          }
                        >
                          {createMutation.isPending || updateMutation.isPending
                            ? "Salvando..."
                            : "Salvar"}
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
