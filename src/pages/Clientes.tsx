import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, Plus, GripVertical, X } from "lucide-react";
import { toast } from "sonner";
import {
  useClientes,
  useCreateCliente,
  useUpdateCliente,
  useDeleteCliente,
  useReorderClientes,
} from "@/hooks/useNorsel";
import type { Cliente, ClienteCreate, ClienteUpdate } from "@/types/norsel";
import ImageUpload from "@/components/ImageUpload";

const Clientes = () => {
  // React Query hooks
  const { data: clientesFromApi, isLoading, error } = useClientes();
  const createMutation = useCreateCliente();
  const updateMutation = useUpdateCliente();
  const deleteMutation = useDeleteCliente();
  const reorderMutation = useReorderClientes();

  // Local state para drag & drop e UI
  const [clients, setClients] = useState<Cliente[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Partial<Cliente> | null>(null);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [hasReordered, setHasReordered] = useState(false);

  // Sincronizar dados da API com estado local
  useEffect(() => {
    if (clientesFromApi) {
      setClients(clientesFromApi);
    }
  }, [clientesFromApi]);

  // Mostrar erro se houver
  useEffect(() => {
    if (error) {
      toast.error("Erro ao carregar clientes. Verifique se a API está rodando.");
    }
  }, [error]);

  const handleCreateClient = () => {
    setEditingClient({
      alt: "",
      src: "",
      title: "Parceiro integrador",
      ordem: clients.length,
    });
    setIsEditDialogOpen(true);
  };

  const handleEditClient = (client: Cliente) => {
    setEditingClient({ ...client });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClient = async (id: number) => {
    if (!confirm("Tem certeza que deseja remover este cliente?")) return;

    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Cliente removido com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao remover cliente");
    }
  };

  const handleSaveClient = async () => {
    if (!editingClient) return;

    // Validações
    if (!editingClient.alt || !editingClient.src || !editingClient.title) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      if (editingClient.id) {
        // Atualizar
        const { id, created_at, updated_at, ...updateData } = editingClient as Cliente;
        await updateMutation.mutateAsync({ id, cliente: updateData as ClienteUpdate });
        toast.success("Cliente atualizado com sucesso!");
      } else {
        // Criar
        const { id, created_at, updated_at, ...createData } = editingClient as any;
        await createMutation.mutateAsync(createData as ClienteCreate);
        toast.success("Cliente criado com sucesso!");
      }
      setIsEditDialogOpen(false);
      setEditingClient(null);
    } catch (error: any) {
      // Tratar erro de duplicação
      if (error.message?.includes("já existe")) {
        toast.error("Já existe um cliente com este nome");
      } else {
        toast.error(error.message || "Erro ao salvar cliente");
      }
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;

    const newClients = [...clients];
    const draggedClient = newClients[draggedItem];
    newClients.splice(draggedItem, 1);
    newClients.splice(index, 0, draggedClient);

    setClients(newClients);
    setDraggedItem(index);
    setHasReordered(true);
  };

  const handleDragEnd = async () => {
    setDraggedItem(null);

    if (hasReordered) {
      // Salvar nova ordem na API
      const reorderData = clients.map((cliente, index) => ({
        id: cliente.id,
        ordem: index,
      }));

      try {
        await reorderMutation.mutateAsync(reorderData);
        toast.success("Ordem dos clientes atualizada!");
        setHasReordered(false);
      } catch (error: any) {
        toast.error("Erro ao reordenar clientes");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <section className="bg-primary py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="flex justify-center items-center h-32">
                <p className="text-lg text-primary-foreground">Carregando clientes...</p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Header Section - Dark Blue Background */}
        <section className="bg-primary py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground flex-1">
                  Clientes
                </h1>
                <Button
                  variant={isEditMode ? "outline" : "secondary"}
                  onClick={() => setIsEditMode(!isEditMode)}
                  className={`self-center md:self-auto whitespace-nowrap ${
                    isEditMode ? "text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10" : ""
                  }`}
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
              <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
                Os projetos executados pela Norsel Engenharia foram realizados
                para nossos parceiros integradores. Cada projeto de nosso
                portfólio remete ao integrador cliente.
              </p>
            </div>
          </div>
        </section>

        {/* Logos Grid Section - White Background */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {isEditMode && (
                <div className="mb-8 text-center">
                  <Button onClick={handleCreateClient} variant="default">
                    <Plus className="w-4 h-4" />
                    Adicionar novo cliente
                  </Button>
                </div>
              )}

              {/* Grid responsivo: 2 cols mobile, 3 cols tablet, 4 cols desktop */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {clients.map((client, index) => (
                  <div
                    key={client.id}
                    draggable={isEditMode}
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`bg-white border border-slate-200 rounded-lg p-6 h-28 flex items-center justify-center hover:shadow-md transition-shadow duration-300 relative ${
                      isEditMode ? "cursor-move" : ""
                    }`}
                  >
                    {isEditMode && (
                      <>
                        <div className="absolute top-2 left-2 z-10 bg-white/90 rounded-full p-1">
                          <GripVertical className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="absolute top-2 right-2 z-10 flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClient(client);
                            }}
                            className="h-7 w-7 p-0"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClient(client.id);
                            }}
                            className="h-7 w-7 p-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </>
                    )}
                    <img
                      src={client.src}
                      alt={client.alt}
                      title={client.title}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dialog de Edição/Criação */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            {editingClient && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-heading font-bold">
                    {editingClient.id
                      ? "Editar Cliente"
                      : "Adicionar Novo Cliente"}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Nome do Cliente
                    </label>
                    <Input
                      value={editingClient.alt || ""}
                      onChange={(e) =>
                        setEditingClient({
                          ...editingClient,
                          alt: e.target.value,
                        })
                      }
                      placeholder="Ex: 7inove"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Título (tooltip)
                    </label>
                    <Input
                      value={editingClient.title || ""}
                      onChange={(e) =>
                        setEditingClient({
                          ...editingClient,
                          title: e.target.value,
                        })
                      }
                      placeholder="Ex: Parceiro integrador"
                    />
                  </div>

                  <ImageUpload
                    currentImage={editingClient.src}
                    onImageChange={(imageUrl) =>
                      setEditingClient({
                        ...editingClient,
                        src: imageUrl,
                      })
                    }
                    folder="clientes"
                    label="Logo do Cliente"
                  />

                  <div className="flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditDialogOpen(false);
                        setEditingClient(null);
                      }}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="default"
                      onClick={handleSaveClient}
                      className="flex-1"
                      disabled={
                        !editingClient.alt ||
                        !editingClient.src ||
                        !editingClient.title ||
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
      </main>
      <Footer />
    </div>
  );
};

export default Clientes;
