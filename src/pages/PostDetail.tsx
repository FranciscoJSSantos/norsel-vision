import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePost } from "@/hooks/useBlog";
import { blogApi } from "@/services/blogApi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Calendar,
  User,
  Eye,
  Clock,
  Tag,
  Edit,
  Trash2,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { useDeletePost } from "@/hooks/useBlog";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { data: post, isLoading } = usePost(Number(id));
  const deletePost = useDeletePost();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Incrementar visualizações quando o post é carregado
  useEffect(() => {
    if (id) {
      blogApi.posts.incrementViews(Number(id)).catch(console.error);
    }
  }, [id]);

  const handleDelete = async () => {
    if (!post) return;

    try {
      await deletePost.mutateAsync(post.id);
      toast.success("Post deletado com sucesso!");
      setDeleteDialogOpen(false);
      navigate("/blog");
    } catch (error: any) {
      console.error("Erro ao deletar:", error);
      const errorMessage = error?.response?.data?.detail ||
                          error?.message ||
                          "Erro ao deletar o post. O post pode ter dependências (comentários, logs, etc).";
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center py-20">
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Post não encontrado
              </h1>
              <Button onClick={() => navigate("/blog")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Blog
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedDate = format(new Date(post.created_at), "dd 'de' MMMM, yyyy", {
    locale: ptBR,
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button & Actions */}
            <div className="flex items-center justify-between mb-8">
              <Button variant="ghost" onClick={() => navigate("/blog")} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>

              {isAdmin && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/blog/edit/${post.id}`)}
                    className="gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteDialogOpen(true)}
                    className="gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Deletar
                  </Button>
                </div>
              )}
            </div>

            {/* Featured Image */}
            {post.featured_image && (
              <div className="aspect-video w-full overflow-hidden rounded-2xl mb-8">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Category Badge */}
            {post.category && (
              <div className="mb-4">
                <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-accent/10 text-accent rounded-full font-medium text-sm">
                  <Tag className="w-3.5 h-3.5" />
                  {post.category.name}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 pb-8 mb-8 border-b border-border">
              {/* Author */}
              <div className="flex items-center gap-3">
                {post.author.avatar ? (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-foreground">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">{post.author.role}</p>
                </div>
              </div>

              <div className="h-8 w-px bg-border" />

              {/* Date */}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>

              {/* Reading Time */}
              {post.reading_time && (
                <>
                  <div className="h-8 w-px bg-border" />
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{post.reading_time} min de leitura</span>
                  </div>
                </>
              )}

              {/* Views */}
              <div className="h-8 w-px bg-border" />
              <div className="flex items-center gap-2 text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span>{post.views} visualizações</span>
              </div>
            </div>

            {/* Content */}
            <article
              className="prose prose-lg max-w-none
                prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground
                prose-p:text-foreground prose-p:leading-relaxed
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-bold
                prose-ul:text-foreground prose-ol:text-foreground
                prose-li:text-foreground
                prose-blockquote:border-l-accent prose-blockquote:text-muted-foreground
                prose-code:text-accent prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-muted prose-pre:border prose-pre:border-border
                prose-img:rounded-lg prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors cursor-pointer text-sm font-medium"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* SEO Info (apenas para debug/admin) */}
            {(post.seo_title || post.seo_description) && (
              <div className="mt-8 p-6 bg-muted/30 rounded-lg border border-border">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Informações SEO
                </h3>
                {post.seo_title && (
                  <p className="text-sm mb-2">
                    <span className="font-semibold">Título SEO:</span> {post.seo_title}
                  </p>
                )}
                {post.seo_description && (
                  <p className="text-sm">
                    <span className="font-semibold">Meta Descrição:</span>{" "}
                    {post.seo_description}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <DialogTitle className="text-xl">Deletar Post</DialogTitle>
            </div>
            <DialogDescription className="text-base pt-2">
              Tem certeza que deseja deletar o post{" "}
              <span className="font-semibold text-foreground">"{post?.title}"</span>?
              <br />
              <br />
              Esta ação não pode ser desfeita e todos os dados associados serão
              permanentemente removidos.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deletePost.isPending}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deletePost.isPending}
              className="gap-2"
            >
              {deletePost.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deletando...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  Deletar Post
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostDetail;
