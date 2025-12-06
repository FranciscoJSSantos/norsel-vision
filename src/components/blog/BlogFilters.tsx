import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Category, User } from "@/types/blog";
import { useState, useCallback } from "react";

interface BlogFiltersProps {
  categories: Category[];
  authors: User[];
  onSearch: (search: string) => void;
  onCategoryChange: (categoryId: string) => void;
  onAuthorChange: (authorId: string) => void;
  onStatusChange: (status: string) => void;
}

const BlogFilters = ({
  categories,
  authors,
  onSearch,
  onCategoryChange,
  onAuthorChange,
  onStatusChange,
}: BlogFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    category: "",
    author: "",
    status: "",
  });

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    onSearch(value);
  }, [onSearch]);

  const handleCategoryChange = useCallback((value: string) => {
    const actualValue = value === "all" ? "" : value;
    setActiveFilters((prev) => ({ ...prev, category: actualValue }));
    onCategoryChange(actualValue);
  }, [onCategoryChange]);

  const handleAuthorChange = useCallback((value: string) => {
    const actualValue = value === "all" ? "" : value;
    setActiveFilters((prev) => ({ ...prev, author: actualValue }));
    onAuthorChange(actualValue);
  }, [onAuthorChange]);

  const handleStatusChange = useCallback((value: string) => {
    const actualValue = value === "all" ? "" : value;
    setActiveFilters((prev) => ({ ...prev, status: actualValue }));
    onStatusChange(actualValue);
  }, [onStatusChange]);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setActiveFilters({ category: "", author: "", status: "" });
    onSearch("");
    onCategoryChange("");
    onAuthorChange("");
    onStatusChange("");
  }, [onSearch, onCategoryChange, onAuthorChange, onStatusChange]);

  const hasActiveFilters =
    searchTerm ||
    activeFilters.category ||
    activeFilters.author ||
    activeFilters.status;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Pesquisar por título, conteúdo ou autor..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>

        <Button
          variant={showFilters ? "default" : "outline"}
          size="lg"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="w-5 h-5" />
          Filtros
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="lg"
            onClick={clearFilters}
            className="gap-2"
          >
            <X className="w-5 h-5" />
            Limpar
          </Button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg border border-border">
          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Categoria
            </label>
            <Select
              value={activeFilters.category || "all"}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Author Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Autor</label>
            <Select
              value={activeFilters.author || "all"}
              onValueChange={handleAuthorChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os autores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os autores</SelectItem>
                {authors.map((author) => (
                  <SelectItem key={author.id} value={author.id.toString()}>
                    {author.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Status</label>
            <Select
              value={activeFilters.status || "all"}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="published">Publicado</SelectItem>
                <SelectItem value="draft">Rascunho</SelectItem>
                <SelectItem value="archived">Arquivado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogFilters;
