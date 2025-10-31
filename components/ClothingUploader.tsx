
import React, { useState, useCallback, useRef } from 'react';
import { ShirtIcon } from './icons/ShirtIcon';

interface ClothingUploaderProps {
  onImageChange: (file: File) => void;
}

const ClothingUploader: React.FC<ClothingUploaderProps> = ({ onImageChange }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione um arquivo de imagem.');
        return;
      }
      setPreview(URL.createObjectURL(file));
      onImageChange(file);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(file));
        onImageChange(file);
    }
  }, [onImageChange]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">1.b. Carregue a Peça de Roupa <span className="text-gray-500 font-normal">(Opcional)</span></h2>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300 ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onClick={triggerFileSelect}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />
        {preview ? (
          <img src={preview} alt="Pré-visualização da roupa" className="mx-auto max-h-48 rounded-md object-contain" />
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
            <ShirtIcon className="w-12 h-12" />
            <p className="font-medium">Arraste a imagem de uma roupa</p>
            <p className="text-sm">ou clique para selecionar</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClothingUploader;
