import type {
  Post,
  PostDetail,
  PostCreate,
  PostUpdate,
  Category,
  Tag,
  User,
  PostFilters,
} from "@/types/blog";

const API_BASE_URL = "http://localhost:8000";

// Helper para fazer requisições
async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw {
      response: {
        data: errorData,
        status: response.status,
        statusText: response.statusText,
      },
      message: errorData.detail || response.statusText,
    };
  }

  // Para responses vazios (204 No Content), retornar undefined
  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return undefined as T;
  }

  return response.json();
}

// Posts
export const blogApi = {
  // Posts
  posts: {
    getAll: async (filters?: PostFilters): Promise<PostDetail[]> => {
      const params = new URLSearchParams();
      if (filters?.status) params.append("status", filters.status);
      if (filters?.category_id)
        params.append("category_id", filters.category_id.toString());
      if (filters?.skip) params.append("skip", filters.skip.toString());
      if (filters?.limit) params.append("limit", filters.limit.toString());

      const query = params.toString();
      return apiRequest<PostDetail[]>(`/posts/${query ? `?${query}` : ""}`);
    },

    getById: async (id: number): Promise<PostDetail> => {
      return apiRequest<PostDetail>(`/posts/${id}`);
    },

    getBySlug: async (slug: string): Promise<PostDetail> => {
      return apiRequest<PostDetail>(`/posts/slug/${slug}`);
    },

    create: async (post: PostCreate): Promise<PostDetail> => {
      return apiRequest<PostDetail>("/posts/", {
        method: "POST",
        body: JSON.stringify(post),
      });
    },

    update: async (id: number, post: PostUpdate): Promise<PostDetail> => {
      return apiRequest<PostDetail>(`/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify(post),
      });
    },

    delete: async (id: number): Promise<void> => {
      return apiRequest<void>(`/posts/${id}`, {
        method: "DELETE",
      });
    },

    incrementViews: async (id: number): Promise<void> => {
      return apiRequest<void>(`/posts/${id}/increment-views`, {
        method: "POST",
      });
    },
  },

  // Upload de imagens
  upload: {
    image: async (file: File): Promise<{ url: string }> => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_BASE_URL}/upload/image`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          response: {
            data: errorData,
            status: response.status,
            statusText: response.statusText,
          },
          message: errorData.detail || "Erro ao fazer upload da imagem",
        };
      }

      return response.json();
    },
  },

  // Categories
  categories: {
    getAll: async (): Promise<Category[]> => {
      return apiRequest<Category[]>("/categories/");
    },

    getById: async (id: number): Promise<Category> => {
      return apiRequest<Category>(`/categories/${id}`);
    },
  },

  // Tags
  tags: {
    getAll: async (): Promise<Tag[]> => {
      return apiRequest<Tag[]>("/tags/");
    },

    getById: async (id: number): Promise<Tag> => {
      return apiRequest<Tag>(`/tags/${id}`);
    },
  },

  // Users
  users: {
    getAll: async (): Promise<User[]> => {
      return apiRequest<User[]>("/users/");
    },

    getById: async (id: number): Promise<User> => {
      return apiRequest<User>(`/users/${id}`);
    },
  },
};
