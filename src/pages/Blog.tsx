import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostCard from "@/components/blog/PostCard";
import BlogFilters from "@/components/blog/BlogFilters";
import Pagination from "@/components/blog/Pagination";
import { usePosts, useCategories, useAuthors } from "@/hooks/useBlog";
import { Button } from "@/components/ui/button";
import { PenSquare, Loader2, BookOpen } from "lucide-react";

const POSTS_PER_PAGE = 9;

const Blog = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    author: "",
    status: "published",
  });

  const { data: posts = [], isLoading } = usePosts({
    status: filters.status || undefined,
    category_id: filters.category ? Number(filters.category) : undefined,
  });

  const { data: categories = [] } = useCategories();
  const { data: authors = [] } = useAuthors();

  // Filtrar posts localmente por busca e autor
  const filteredPosts = useMemo(() => {
    let result = posts;

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.content.toLowerCase().includes(searchLower) ||
          post.author.name.toLowerCase().includes(searchLower)
      );
    }

    if (filters.author) {
      result = result.filter(
        (post) => post.author_id === Number(filters.author)
      );
    }

    return result;
  }, [posts, filters.search, filters.author]);

  // Paginação
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // Reset da página quando filtros mudam
  const handleFilterChange = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setFilters((prev) => ({ ...prev, category }));
    setCurrentPage(1);
  }, []);

  const handleAuthorChange = useCallback((author: string) => {
    setFilters((prev) => ({ ...prev, author }));
    setCurrentPage(1);
  }, []);

  const handleStatusChange = useCallback((status: string) => {
    setFilters((prev) => ({ ...prev, status }));
    setCurrentPage(1);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-16 mb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Blog Norsel Engenharia
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Fique por dentro das últimas novidades sobre energia solar,
                projetos elétricos e sustentabilidade.
              </p>
              <Button
                onClick={() => navigate("/blog/create")}
                size="lg"
                className="gap-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <PenSquare className="w-5 h-5" />
                Criar Novo Post
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Filtros */}
            <BlogFilters
              categories={categories}
              authors={authors}
              onSearch={handleSearch}
              onCategoryChange={handleCategoryChange}
              onAuthorChange={handleAuthorChange}
              onStatusChange={handleStatusChange}
            />

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            )}

            {/* Empty State */}
            {!isLoading && filteredPosts.length === 0 && (
              <div className="text-center py-20">
                <BookOpen className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Sem posts no momento, volte em breve!
                </h3>
              </div>
            )}

            {/* Posts Grid */}
            {!isLoading && paginatedPosts.length > 0 && (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                  {paginatedPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onClick={() => navigate(`/blog/${post.id}`)}
                    />
                  ))}
                </div>

                {/* Paginação */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
