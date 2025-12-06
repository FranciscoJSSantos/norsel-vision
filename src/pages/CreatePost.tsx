import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "@/styles/quill-custom.css";
import { useCreatePost, useCategories, useTags, useAuthors } from "@/hooks/useBlog";
import { blogApi } from "@/services/blogApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Eye, Upload, Sparkles, Loader2, X, Image as ImageIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const CreatePost = () => {
  const navigate = useNavigate();
  const createPost = useCreatePost();
  const { data: categories = [] } = useCategories();
  const { data: tags = [] } = useTags();
  const { data: authors = [] } = useAuthors();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featured_image: "",
    status: "draft" as "draft" | "published" | "archived",
    category_id: "",
    author_id: "",
    reading_time: "",
    seo_title: "",
    seo_description: "",
    selectedTags: [] as number[],
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef<ReactQuill>(null);

  // Gerar slug automaticamente do título
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione apenas arquivos de imagem");
      return;
    }

    // Validar tamanho (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5MB");
      return;
    }

    setUploadingImage(true);

    try {
      // Criar preview local
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload para o servidor
      const response = await blogApi.upload.image(file);
      setFormData((prev) => ({ ...prev, featured_image: response.url }));
      toast.success("Imagem carregada com sucesso!");
    } catch (error: any) {
      console.error("Erro ao fazer upload:", error);
      setImagePreview(null);
      toast.error(error?.message || "Erro ao fazer upload da imagem");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, featured_image: "" }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (status: "draft" | "published") => {
    if (!formData.title || !formData.content || !formData.author_id) {
      toast.error("Preencha os campos obrigatórios: Título, Conteúdo e Autor");
      return;
    }

    try {
      await createPost.mutateAsync({
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt || undefined,
        featured_image: formData.featured_image || undefined,
        status,
        category_id: formData.category_id ? Number(formData.category_id) : undefined,
        author_id: Number(formData.author_id),
        reading_time: formData.reading_time ? Number(formData.reading_time) : undefined,
        seo_title: formData.seo_title || undefined,
        seo_description: formData.seo_description || undefined,
        tag_ids: formData.selectedTags,
      });

      toast.success(
        status === "published"
          ? "Post publicado com sucesso!"
          : "Rascunho salvo com sucesso!"
      );
      navigate("/blog");
    } catch (error) {
      toast.error("Erro ao salvar o post. Tente novamente.");
      console.error(error);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/blog")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="w-8 h-8 text-accent" />
                  Criar Novo Post
                </h1>
                <p className="text-muted-foreground mt-1">
                  Crie um conteúdo incrível para o blog
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handleSubmit("draft")}
                disabled={createPost.isPending}
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                Salvar Rascunho
              </Button>
              <Button
                onClick={() => handleSubmit("published")}
                disabled={createPost.isPending}
                className="gap-2"
              >
                <Eye className="w-4 h-4" />
                Publicar
              </Button>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-8 bg-card border border-border rounded-xl p-8">
            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">
                Título do Post *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Digite um título chamativo..."
                className="text-lg h-12"
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug" className="text-base font-semibold">
                Slug (URL)
              </Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="url-amigavel-do-post"
                className="font-mono"
              />
              <p className="text-sm text-muted-foreground">
                Gerado automaticamente a partir do título
              </p>
            </div>

            {/* Grid de Metadados */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Autor */}
              <div className="space-y-2">
                <Label htmlFor="author" className="text-base font-semibold">
                  Autor *
                </Label>
                <Select
                  value={formData.author_id}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, author_id: value }))
                  }
                >
                  <SelectTrigger id="author">
                    <SelectValue placeholder="Selecione o autor" />
                  </SelectTrigger>
                  <SelectContent>
                    {authors.map((author) => (
                      <SelectItem key={author.id} value={author.id.toString()}>
                        {author.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Categoria */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-base font-semibold">
                  Categoria
                </Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category_id: value }))
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tempo de leitura */}
              <div className="space-y-2">
                <Label htmlFor="reading_time" className="text-base font-semibold">
                  Tempo de Leitura (min)
                </Label>
                <Input
                  id="reading_time"
                  type="number"
                  value={formData.reading_time}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, reading_time: e.target.value }))
                  }
                  placeholder="5"
                />
              </div>

              {/* Featured Image */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="featured_image" className="text-base font-semibold">
                  Imagem Destacada
                </Label>

                {/* Preview da imagem */}
                {(imagePreview || formData.featured_image) && (
                  <div className="relative group w-full aspect-video rounded-lg overflow-hidden bg-muted border border-border">
                    <img
                      src={imagePreview || formData.featured_image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={handleRemoveImage}
                        className="gap-2"
                      >
                        <X className="w-4 h-4" />
                        Remover
                      </Button>
                    </div>
                  </div>
                )}

                {/* Input de URL ou Upload */}
                <div className="flex gap-2">
                  <Input
                    id="featured_image"
                    value={formData.featured_image}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, featured_image: e.target.value }));
                      setImagePreview(null);
                    }}
                    placeholder="Cole a URL da imagem ou faça upload..."
                    disabled={uploadingImage}
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                  >
                    {uploadingImage ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Cole uma URL ou faça upload de uma imagem (máx. 5MB)
                </p>
              </div>
            </div>

            {/* Resumo */}
            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-base font-semibold">
                Resumo/Descrição
              </Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                }
                placeholder="Breve descrição do post..."
                rows={3}
                className="resize-none"
              />
            </div>

            {/* Editor de Conteúdo */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">Conteúdo *</Label>
              <div className="bg-white rounded-lg border border-border overflow-hidden">
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={formData.content}
                  onChange={(content) =>
                    setFormData((prev) => ({ ...prev, content }))
                  }
                  modules={modules}
                  className="min-h-[400px]"
                />
              </div>
            </div>

            {/* SEO Section */}
            <div className="space-y-4 pt-6 border-t border-border">
              <h3 className="text-lg font-semibold text-foreground">
                Otimização SEO
              </h3>

              <div className="space-y-2">
                <Label htmlFor="seo_title">Título SEO</Label>
                <Input
                  id="seo_title"
                  value={formData.seo_title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, seo_title: e.target.value }))
                  }
                  placeholder="Título otimizado para mecanismos de busca"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seo_description">Meta Descrição</Label>
                <Textarea
                  id="seo_description"
                  value={formData.seo_description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, seo_description: e.target.value }))
                  }
                  placeholder="Descrição que aparecerá nos resultados de busca..."
                  rows={2}
                  className="resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreatePost;
