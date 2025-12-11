import { useState } from "react";
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
import {
  clientLogos as initialClientLogos,
  ClientLogo,
} from "@/data/clientLogos";

const Clientes = () => {
  const [clients, setClients] = useState<ClientLogo[]>(initialClientLogos);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientLogo | null>(null);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const handleCreateClient = () => {
    setEditingClient({
      alt: "",
      src: "",
      title: "Parceiro integrador",
    });
    setIsEditDialogOpen(true);
  };

  const handleEditClient = (client: ClientLogo) => {
    setEditingClient({ ...client });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClient = (alt: string) => {
    if (confirm("Tem certeza que deseja remover este cliente?")) {
      setClients(clients.filter((c) => c.alt !== alt));
    }
  };

  const handleSaveClient = () => {
    if (!editingClient) return;

    const existingIndex = clients.findIndex((c) => c.alt === editingClient.alt);

    if (existingIndex !== -1) {
      setClients(
        clients.map((c) => (c.alt === editingClient.alt ? editingClient : c))
      );
    } else {
      setClients([...clients, editingClient]);
    }
    setIsEditDialogOpen(false);
    setEditingClient(null);
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
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

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
                    key={client.alt}
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
                              handleDeleteClient(client.alt);
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
                    {clients.find((c) => c.alt === editingClient.alt)
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
                      value={editingClient.alt}
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
                      value={editingClient.title}
                      onChange={(e) =>
                        setEditingClient({
                          ...editingClient,
                          title: e.target.value,
                        })
                      }
                      placeholder="Ex: Parceiro integrador"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      URL da Logo
                    </label>
                    <Input
                      value={editingClient.src}
                      onChange={(e) =>
                        setEditingClient({
                          ...editingClient,
                          src: e.target.value,
                        })
                      }
                      placeholder="Ex: @assets/clientes/logo.png"
                    />
                  </div>

                  {editingClient.src && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Prévia da Logo
                      </label>
                      <div className="border border-slate-200 rounded-lg p-4 h-28 flex items-center justify-center bg-white">
                        <img
                          src={editingClient.src}
                          alt={editingClient.alt}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                            (
                              e.target as HTMLImageElement
                            ).parentElement!.innerHTML +=
                              '<p class="text-sm text-muted-foreground">Imagem não encontrada</p>';
                          }}
                        />
                      </div>
                    </div>
                  )}

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
                      disabled={!editingClient.alt || !editingClient.src}
                    >
                      Salvar
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
