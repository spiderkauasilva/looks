
import React from 'react';
import { Spinner } from './Spinner';
import { PhotoIcon } from './icons/PhotoIcon';

interface ImageDisplayProps {
  title: string;
  imageUrl: string | null;
  isLoading?: boolean;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ title, imageUrl, isLoading = false }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-200 w-full aspect-square flex flex-col">
      <h3 className="text-lg font-semibold text-center text-gray-700 mb-4">{title}</h3>
      <div className="flex-grow w-full bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center z-10 backdrop-blur-sm">
            <Spinner />
            <p className="mt-2 text-gray-600 font-medium">Processando com IA...</p>
          </div>
        )}
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
        ) : (
          !isLoading && (
             <div className="text-gray-400 flex flex-col items-center">
                <PhotoIcon className="w-16 h-16" />
                <p className="mt-2 text-sm">A imagem aparecerá aqui</p>
             </div>
          )
        )}
      </div>
    </div>
  );
};

export default ImageDisplay;
