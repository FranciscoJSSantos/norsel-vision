// Types baseados nos schemas da API Norsel

export interface Servico {
  id: number;
  titulo: string;
  descricao: string;
  caracteristicas: string[];
  imagem?: string;
  ordem: number;
  created_at: string;
  updated_at: string;
}

export interface ServicoCreate {
  titulo: string;
  descricao: string;
  caracteristicas: string[];
  imagem?: string;
  ordem?: number;
}

export interface ServicoUpdate {
  titulo?: string;
  descricao?: string;
  caracteristicas?: string[];
  imagem?: string;
  ordem?: number;
}

export interface Projeto {
  id: number;
  nome: string;
  local: string;
  ano: string;
  descricao: string;
  imagem: string;
  ordem: number;
  created_at: string;
  updated_at: string;
}

export interface ProjetoCreate {
  nome: string;
  local: string;
  ano: string;
  descricao: string;
  imagem: string;
  ordem?: number;
}

export interface ProjetoUpdate {
  nome?: string;
  local?: string;
  ano?: string;
  descricao?: string;
  imagem?: string;
  ordem?: number;
}

export interface Cliente {
  id: number;
  alt: string;
  src: string;
  title: string;
  ordem: number;
  created_at: string;
  updated_at: string;
}

export interface ClienteCreate {
  alt: string;
  src: string;
  title: string;
  ordem?: number;
}

export interface ClienteUpdate {
  alt?: string;
  src?: string;
  title?: string;
  ordem?: number;
}

export interface ReorderItem {
  id: number;
  ordem: number;
}
