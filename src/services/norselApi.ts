import type {
  Servico,
  ServicoCreate,
  ServicoUpdate,
  Projeto,
  ProjetoCreate,
  ProjetoUpdate,
  Cliente,
  ClienteCreate,
  ClienteUpdate,
  ReorderItem,
} from "@/types/norsel";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

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
  if (
    response.status === 204 ||
    response.headers.get("content-length") === "0"
  ) {
    return undefined as T;
  }

  return response.json();
}

export const norselApi = {
  // Serviços
  servicos: {
    getAll: async (): Promise<Servico[]> => {
      return apiRequest<Servico[]>("/servicos/");
    },

    getById: async (id: number): Promise<Servico> => {
      return apiRequest<Servico>(`/servicos/${id}`);
    },

    create: async (servico: ServicoCreate): Promise<Servico> => {
      return apiRequest<Servico>("/servicos/", {
        method: "POST",
        body: JSON.stringify(servico),
      });
    },

    update: async (id: number, servico: ServicoUpdate): Promise<Servico> => {
      return apiRequest<Servico>(`/servicos/${id}`, {
        method: "PUT",
        body: JSON.stringify(servico),
      });
    },

    delete: async (id: number): Promise<void> => {
      return apiRequest<void>(`/servicos/${id}`, {
        method: "DELETE",
      });
    },

    reorder: async (items: ReorderItem[]): Promise<{ message: string }> => {
      return apiRequest<{ message: string }>("/servicos/reorder", {
        method: "POST",
        body: JSON.stringify(items),
      });
    },
  },

  // Projetos
  projetos: {
    getAll: async (): Promise<Projeto[]> => {
      return apiRequest<Projeto[]>("/projetos/");
    },

    getById: async (id: number): Promise<Projeto> => {
      return apiRequest<Projeto>(`/projetos/${id}`);
    },

    create: async (projeto: ProjetoCreate): Promise<Projeto> => {
      return apiRequest<Projeto>("/projetos/", {
        method: "POST",
        body: JSON.stringify(projeto),
      });
    },

    update: async (id: number, projeto: ProjetoUpdate): Promise<Projeto> => {
      return apiRequest<Projeto>(`/projetos/${id}`, {
        method: "PUT",
        body: JSON.stringify(projeto),
      });
    },

    delete: async (id: number): Promise<void> => {
      return apiRequest<void>(`/projetos/${id}`, {
        method: "DELETE",
      });
    },

    reorder: async (items: ReorderItem[]): Promise<{ message: string }> => {
      return apiRequest<{ message: string }>("/projetos/reorder", {
        method: "POST",
        body: JSON.stringify(items),
      });
    },
  },

  // Clientes
  clientes: {
    getAll: async (): Promise<Cliente[]> => {
      return apiRequest<Cliente[]>("/clientes/");
    },

    getById: async (id: number): Promise<Cliente> => {
      return apiRequest<Cliente>(`/clientes/${id}`);
    },

    getByAlt: async (alt: string): Promise<Cliente> => {
      return apiRequest<Cliente>(`/clientes/alt/${alt}`);
    },

    create: async (cliente: ClienteCreate): Promise<Cliente> => {
      return apiRequest<Cliente>("/clientes/", {
        method: "POST",
        body: JSON.stringify(cliente),
      });
    },

    update: async (id: number, cliente: ClienteUpdate): Promise<Cliente> => {
      return apiRequest<Cliente>(`/clientes/${id}`, {
        method: "PUT",
        body: JSON.stringify(cliente),
      });
    },

    delete: async (id: number): Promise<void> => {
      return apiRequest<void>(`/clientes/${id}`, {
        method: "DELETE",
      });
    },

    reorder: async (items: ReorderItem[]): Promise<{ message: string }> => {
      return apiRequest<{ message: string }>("/clientes/reorder", {
        method: "POST",
        body: JSON.stringify(items),
      });
    },
  },
};
