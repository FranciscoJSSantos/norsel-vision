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
