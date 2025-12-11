import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogApi } from "@/services/blogApi";
import type { PostCreate, PostUpdate, PostFilters } from "@/types/blog";

// Hook para listar posts
export const usePosts = (filters?: PostFilters) => {
  return useQuery({
    queryKey: ["posts", filters],
    queryFn: () => blogApi.posts.getAll(filters),
  });
};

// Hook para um post específico
export const usePost = (id: number) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => blogApi.posts.getById(id),
    enabled: !!id,
  });
};

// Hook para criar post
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: PostCreate) => blogApi.posts.create(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

// Hook para atualizar post
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, post }: { id: number; post: PostUpdate }) =>
      blogApi.posts.update(id, post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

// Hook para deletar post
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => blogApi.posts.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

// Hook para categorias
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => blogApi.categories.getAll(),
  });
};

// Hook para tags
export const useTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => blogApi.tags.getAll(),
  });
};

// Hook para autores
export const useAuthors = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => blogApi.users.getAll(),
  });
};

// Hook para buscar autores únicos dos posts
export const useUniqueAuthors = () => {
  return useQuery({
    queryKey: ["unique-authors"],
    queryFn: async () => {
      const posts = await blogApi.posts.getAll();
      const authors = posts
        .map((post) => {
          // Pode ser string ou objeto { name: string }
          if (typeof post.author === 'string') {
            return post.author;
          }
          return post.author?.name;
        })
        .filter(Boolean) as string[];
      return Array.from(new Set(authors)).sort();
    },
  });
};

// Hook para buscar categorias únicas dos posts
export const useUniqueCategories = () => {
  return useQuery({
    queryKey: ["unique-categories"],
    queryFn: async () => {
      const posts = await blogApi.posts.getAll();
      const categories = posts
        .map((post) => {
          // Pode ser string ou objeto { name: string }
          if (typeof post.category === 'string') {
            return post.category;
          }
          return post.category?.name;
        })
        .filter(Boolean) as string[];
      return Array.from(new Set(categories)).sort();
    },
  });
};
