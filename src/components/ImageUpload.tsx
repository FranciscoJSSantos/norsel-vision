import React, { useRef, useState, useEffect } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
  folder?: 'servicos' | 'projetos' | 'clientes' | 'geral';
  label?: string;
  disabled?: boolean;
}

export default function ImageUpload({
  currentImage,
  onImageChange,
  folder = 'geral',
  label = 'Imagem',
  disabled = false
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(currentImage);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Atualizar preview quando currentImage mudar
  useEffect(() => {
    setPreview(currentImage);
  }, [currentImage]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validação de tipo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      setError('Tipo de arquivo não permitido. Use: JPG, PNG, GIF, WEBP ou SVG');
      return;
    }

    // Validação de tamanho (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('Arquivo muito grande. Máximo: 5MB');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Cria FormData
      const formData = new FormData();
      formData.append('file', file);

      // Upload para API
      const uploadUrl = `${API_URL}/upload/image?folder=${folder}`;
      console.log('Upload URL:', uploadUrl);

      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
        throw new Error(errorData.detail || `Erro HTTP ${response.status}`);
      }

      const data = await response.json();

      if (!data.url) {
        throw new Error('URL da imagem não retornada pela API');
      }

      // Atualiza preview e notifica componente pai
      setPreview(data.url);
      onImageChange(data.url);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer upload';
      setError(errorMessage);
      console.error('Upload error:', err);

      // Mensagens mais amigáveis
      if (errorMessage.includes('Failed to fetch')) {
        setError('Não foi possível conectar à API. Verifique se o servidor está rodando em ' + API_URL);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(undefined);
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="flex items-start gap-4">
        {/* Preview da imagem */}
        {preview && (
          <div className="relative w-32 h-32 border-2 border-gray-200 rounded-lg overflow-hidden">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            {!disabled && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                title="Remover imagem"
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}

        {/* Área de upload */}
        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled || uploading}
          />

          <button
            type="button"
            onClick={handleClick}
            disabled={disabled || uploading}
            className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#00A86B] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex flex-col items-center gap-2">
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00A86B]"></div>
                  <span className="text-sm text-gray-600">Enviando...</span>
                </>
              ) : (
                <>
                  {preview ? (
                    <ImageIcon className="text-gray-400" size={32} />
                  ) : (
                    <Upload className="text-gray-400" size={32} />
                  )}
                  <span className="text-sm text-gray-600">
                    {preview ? 'Alterar imagem' : 'Clique para selecionar uma imagem'}
                  </span>
                  <span className="text-xs text-gray-400">
                    JPG, PNG, GIF, WEBP ou SVG (máx. 5MB)
                  </span>
                </>
              )}
            </div>
          </button>

          {error && (
            <div className="mt-2 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
