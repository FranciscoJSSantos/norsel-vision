import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { norselApi } from "@/services/norselApi";
import type {
  ServicoCreate,
  ServicoUpdate,
  ProjetoCreate,
  ProjetoUpdate,
  ClienteCreate,
  ClienteUpdate,
  ReorderItem,
} from "@/types/norsel";

// ============================================
// HOOKS PARA SERVIÇOS
// ============================================

// Hook para listar serviços
export const useServicos = () => {
  return useQuery({
    queryKey: ["servicos"],
    queryFn: () => norselApi.servicos.getAll(),
  });
};

// Hook para um serviço específico
export const useServico = (id: number) => {
  return useQuery({
    queryKey: ["servico", id],
    queryFn: () => norselApi.servicos.getById(id),
    enabled: !!id,
  });
};

// Hook para criar serviço
export const useCreateServico = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (servico: ServicoCreate) => norselApi.servicos.create(servico),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["servicos"] });
    },
  });
};

// Hook para atualizar serviço
export const useUpdateServico = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, servico }: { id: number; servico: ServicoUpdate }) =>
      norselApi.servicos.update(id, servico),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["servicos"] });
    },
  });
};

// Hook para deletar serviço
export const useDeleteServico = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => norselApi.servicos.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["servicos"] });
    },
  });
};

// Hook para reordenar serviços
export const useReorderServicos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (items: ReorderItem[]) => norselApi.servicos.reorder(items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["servicos"] });
    },
  });
};

// ============================================
// HOOKS PARA PROJETOS
// ============================================

// Hook para listar projetos
export const useProjetos = () => {
  return useQuery({
    queryKey: ["projetos"],
    queryFn: () => norselApi.projetos.getAll(),
  });
};

// Hook para um projeto específico
export const useProjeto = (id: number) => {
  return useQuery({
    queryKey: ["projeto", id],
    queryFn: () => norselApi.projetos.getById(id),
    enabled: !!id,
  });
};

// Hook para criar projeto
export const useCreateProjeto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projeto: ProjetoCreate) => norselApi.projetos.create(projeto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projetos"] });
    },
  });
};

// Hook para atualizar projeto
export const useUpdateProjeto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, projeto }: { id: number; projeto: ProjetoUpdate }) =>
      norselApi.projetos.update(id, projeto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projetos"] });
    },
  });
};

// Hook para deletar projeto
export const useDeleteProjeto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => norselApi.projetos.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projetos"] });
    },
  });
};

// Hook para reordenar projetos
export const useReorderProjetos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (items: ReorderItem[]) => norselApi.projetos.reorder(items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projetos"] });
    },
  });
};

// ============================================
// HOOKS PARA CLIENTES
// ============================================

// Hook para listar clientes
export const useClientes = () => {
  return useQuery({
    queryKey: ["clientes"],
    queryFn: () => norselApi.clientes.getAll(),
  });
};

// Hook para um cliente específico
export const useCliente = (id: number) => {
  return useQuery({
    queryKey: ["cliente", id],
    queryFn: () => norselApi.clientes.getById(id),
    enabled: !!id,
  });
};

// Hook para buscar cliente por alt
export const useClienteByAlt = (alt: string) => {
  return useQuery({
    queryKey: ["cliente", "alt", alt],
    queryFn: () => norselApi.clientes.getByAlt(alt),
    enabled: !!alt,
  });
};

// Hook para criar cliente
export const useCreateCliente = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cliente: ClienteCreate) => norselApi.clientes.create(cliente),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
    },
  });
};

// Hook para atualizar cliente
export const useUpdateCliente = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, cliente }: { id: number; cliente: ClienteUpdate }) =>
      norselApi.clientes.update(id, cliente),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
    },
  });
};

// Hook para deletar cliente
export const useDeleteCliente = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => norselApi.clientes.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
    },
  });
};

// Hook para reordenar clientes
export const useReorderClientes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (items: ReorderItem[]) => norselApi.clientes.reorder(items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
    },
  });
};
