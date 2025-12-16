import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ArrowRight, Info, Edit, Trash2, Plus, GripVertical, X } from "lucide-react";
import { toast } from "sonner";
import {
  useServicos,
  useCreateServico,
  useUpdateServico,
  useDeleteServico,
  useReorderServicos,
} from "@/hooks/useNorsel";
import type { Servico, ServicoCreate, ServicoUpdate } from "@/types/norsel";
import ImageUpload from "@/components/ImageUpload";

const Servicos = () => {
  const { isAdmin } = useAuth();

  // React Query hooks
  const { data: servicosFromApi, isLoading, error } = useServicos();
  const createMutation = useCreateServico();
  const updateMutation = useUpdateServico();
  const deleteMutation = useDeleteServico();
  const reorderMutation = useReorderServicos();

  // Local state para drag & drop e UI
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [selectedServico, setSelectedServico] = useState<Servico | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingServico, setEditingServico] = useState<Partial<Servico> | null>(null);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [hasReordered, setHasReordered] = useState(false);
  const navigate = useNavigate();

  // Sincronizar dados da API com estado local
  useEffect(() => {
    if (servicosFromApi) {
      setServicos(servicosFromApi);
    }
  }, [servicosFromApi]);

  // Mostrar erro se houver
  useEffect(() => {
    if (error) {
      toast.error("Erro ao carregar serviços. Verifique se a API está rodando.");
    }
  }, [error]);

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

  const handleCreateServico = () => {
    setEditingServico({
      titulo: "",
      descricao: "",
      caracteristicas: [],
      imagem: "",
      ordem: servicos.length,
    });
    setIsEditDialogOpen(true);
  };

  const handleEditServico = (servico: Servico) => {
    setEditingServico({ ...servico });
    setIsEditDialogOpen(true);
  };

  const handleDeleteServico = async (id: number) => {
    if (!confirm("Tem certeza que deseja remover este serviço?")) return;

    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Serviço removido com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao remover serviço");
    }
  };

  const handleSaveServico = async () => {
    if (!editingServico) return;

    // Validações
    if (!editingServico.titulo || !editingServico.descricao || !editingServico.caracteristicas?.length) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      if (editingServico.id) {
        // Atualizar
        const { id, created_at, updated_at, ...updateData } = editingServico as Servico;
        await updateMutation.mutateAsync({ id, servico: updateData as ServicoUpdate });
        toast.success("Serviço atualizado com sucesso!");
      } else {
        // Criar
        const { id, created_at, updated_at, ...createData } = editingServico as any;
        await createMutation.mutateAsync(createData as ServicoCreate);
        toast.success("Serviço criado com sucesso!");
      }
      setIsEditDialogOpen(false);
      setEditingServico(null);
    } catch (error: any) {
      toast.error(error.message || "Erro ao salvar serviço");
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;

    const newServicos = [...servicos];
    const draggedServico = newServicos[draggedItem];
    newServicos.splice(draggedItem, 1);
    newServicos.splice(index, 0, draggedServico);

    setServicos(newServicos);
    setDraggedItem(index);
    setHasReordered(true);
  };

  const handleDragEnd = async () => {
    setDraggedItem(null);

    if (hasReordered) {
      // Salvar nova ordem na API
      const reorderData = servicos.map((servico, index) => ({
        id: servico.id,
        ordem: index,
      }));

      try {
        await reorderMutation.mutateAsync(reorderData);
        toast.success("Ordem dos serviços atualizada!");
        setHasReordered(false);
      } catch (error: any) {
        toast.error("Erro ao reordenar serviços");
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
              <p className="text-lg text-muted-foreground">Carregando serviços...</p>
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
              <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                  Nossos Serviços
                </h1>
                <p className="text-lg text-muted-foreground mb-6 md:mb-0 max-w-3xl mx-auto md:mx-0">
                  Soluções completas em energia solar e projetos elétricos para
                  residências, comércios e indústrias.
                </p>
              </div>
              {isAdmin && (
                <Button
                  variant={isEditMode ? "outline" : "default"}
                  onClick={() => setIsEditMode(!isEditMode)}
                  className="self-center md:self-auto whitespace-nowrap"
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
              )}
            </div>

            {isEditMode && (
              <div className="mb-8 text-center md:text-left">
                <Button onClick={handleCreateServico} variant="accent">
                  <Plus className="w-4 h-4" />
                  Criar novo serviço
                </Button>
              </div>
            )}

            {/* Grid de Cards em Blocos */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicos.map((servico, index) => (
                <div
                  key={servico.id}
                  draggable={isEditMode}
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`bg-card rounded-xl border border-border shadow-lg overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-xl flex flex-col relative ${
                    isEditMode ? "cursor-move" : ""
                  }`}
                >
                  {isEditMode && (
                    <div className="absolute top-2 left-2 z-10 bg-background/90 rounded-full p-2">
                      <GripVertical className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}

                  {/* Imagem */}
                  {servico.imagem && (
                    <div className="relative h-48 overflow-hidden bg-accent/5">
                      <img
                        src={servico.imagem}
                        alt={servico.titulo}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        width="600"
                        height="400"
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

                    {/* Botão Ver Detalhes ou Botões de Edição */}
                    <div className="flex justify-between items-center mt-auto">
                      {!isEditMode ? (
                        <button
                          onClick={() => openDialog(servico)}
                          className="flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors group"
                        >
                          <Info className="w-5 h-5" />
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
                              handleEditServico(servico);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteServico(servico.id);
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
                          loading="lazy"
                          decoding="async"
                          width="800"
                          height="400"
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
                        {selectedServico.caracteristicas.map(
                          (caracteristica, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-muted-foreground"
                            >
                              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                              <span>{caracteristica}</span>
                            </li>
                          )
                        )}
                      </ul>

                      {/* Botão Solicitar Proposta */}
                      <Button
                        variant="accent"
                        size="lg"
                        onClick={() =>
                          handleSolicitarProposta(selectedServico.titulo)
                        }
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

            {/* Dialog de Edição/Criação */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                {editingServico && (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-heading font-bold">
                        {editingServico.id
                          ? "Editar Serviço"
                          : "Criar Novo Serviço"}
                      </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Título do Serviço
                        </label>
                        <Input
                          value={editingServico.titulo || ""}
                          onChange={(e) =>
                            setEditingServico({
                              ...editingServico,
                              titulo: e.target.value,
                            })
                          }
                          placeholder="Ex: Soluções Fotovoltaicas"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Descrição
                        </label>
                        <Textarea
                          value={editingServico.descricao || ""}
                          onChange={(e) =>
                            setEditingServico({
                              ...editingServico,
                              descricao: e.target.value,
                            })
                          }
                          placeholder="Descreva o serviço..."
                          rows={3}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Características (uma por linha)
                        </label>
                        <Textarea
                          value={editingServico.caracteristicas?.join("\n") || ""}
                          onChange={(e) =>
                            setEditingServico({
                              ...editingServico,
                              caracteristicas: e.target.value
                                .split("\n")
                                .filter((c) => c.trim() !== ""),
                            })
                          }
                          placeholder="Digite cada característica em uma linha diferente"
                          rows={6}
                        />
                      </div>

                      <ImageUpload
                        currentImage={editingServico.imagem}
                        onImageChange={(imageUrl) =>
                          setEditingServico({
                            ...editingServico,
                            imagem: imageUrl,
                          })
                        }
                        folder="servicos"
                        label="Imagem do Serviço"
                      />

                      <div className="flex gap-2 pt-4">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditDialogOpen(false);
                            setEditingServico(null);
                          }}
                          className="flex-1"
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="accent"
                          onClick={handleSaveServico}
                          className="flex-1"
                          disabled={
                            !editingServico.titulo ||
                            !editingServico.descricao ||
                            !editingServico.caracteristicas?.length ||
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

export default Servicos;
