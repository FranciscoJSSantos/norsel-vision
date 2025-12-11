/**
 * API client para upload de imagens no Cloudflare R2
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export interface UploadResponse {
  url: string;
  filename: string;
  folder: string;
  size: number;
  message: string;
}

export interface BatchUploadResponse {
  uploaded: Array<{
    url: string;
    filename: string;
    size: number;
  }>;
  failed: Array<{
    filename: string;
    error: string;
  }>;
  total: number;
  success: number;
  failed_count: number;
}

export interface ImageInfo {
  key: string;
  url: string;
  size: number;
  last_modified: string;
}

export interface ListImagesResponse {
  images: ImageInfo[];
  total: number;
}

export interface ImageExistsResponse {
  exists: boolean;
  url: string;
}

export const uploadApi = {
  /**
   * Faz upload de uma imagem
   */
  async uploadImage(
    file: File,
    folder: 'servicos' | 'projetos' | 'clientes' | 'geral' = 'geral'
  ): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(
      `${API_URL}/upload/image?folder=${folder}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Erro ao fazer upload');
    }

    return response.json();
  },

  /**
   * Faz upload de múltiplas imagens
   */
  async uploadMultipleImages(
    files: File[],
    folder: 'servicos' | 'projetos' | 'clientes' | 'geral' = 'geral'
  ): Promise<BatchUploadResponse> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    const response = await fetch(
      `${API_URL}/upload/images/batch?folder=${folder}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Erro ao fazer upload');
    }

    return response.json();
  },

  /**
   * Deleta uma imagem
   */
  async deleteImage(url: string): Promise<{ message: string }> {
    const response = await fetch(
      `${API_URL}/upload/image?url=${encodeURIComponent(url)}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Erro ao deletar imagem');
    }

    return response.json();
  },

  /**
   * Lista imagens de uma pasta
   */
  async listImages(folder?: string): Promise<ListImagesResponse> {
    const url = folder
      ? `${API_URL}/upload/images?folder=${folder}`
      : `${API_URL}/upload/images`;

    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Erro ao listar imagens');
    }

    return response.json();
  },

  /**
   * Verifica se uma imagem existe
   */
  async imageExists(url: string): Promise<ImageExistsResponse> {
    const response = await fetch(
      `${API_URL}/upload/image/exists?url=${encodeURIComponent(url)}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Erro ao verificar imagem');
    }

    return response.json();
  },
};
