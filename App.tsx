
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import PromptInput from './components/PromptInput';
import ImageDisplay from './components/ImageDisplay';
import { editImageWithPrompt } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';

const App: React.FC = () => {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = useCallback((file: File) => {
    setOriginalImageFile(file);
    setOriginalImagePreview(URL.createObjectURL(file));
    setEditedImage(null);
    setError(null);
  }, []);

  const handleSubmit = async () => {
    if (!originalImageFile || !prompt) {
      setError("Por favor, carregue uma imagem e insira um comando de edição.");
      return;
    }

    setIsLoading(true);
    setEditedImage(null);
    setError(null);

    try {
      const base64DataUrl = await fileToBase64(originalImageFile);
      const pureBase64 = base64DataUrl.split(',')[1];
      const mimeType = originalImageFile.type;

      const resultBase64 = await editImageWithPrompt(pureBase64, mimeType, prompt);
      
      setEditedImage(`data:image/png;base64,${resultBase64}`);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'Ocorreu um erro desconhecido.';
      setError(`Falha ao gerar a imagem. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Provador Virtual com IA</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Carregue uma foto, descreva a alteração que deseja e veja a mágica acontecer. Transforme seus looks com o poder da IA!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column: Controls */}
            <div className="flex flex-col space-y-8">
              <ImageUploader onImageChange={handleImageChange} />
              <PromptInput
                prompt={prompt}
                setPrompt={setPrompt}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                isImageLoaded={!!originalImageFile}
              />
            </div>
            
            {/* Right Column: Image Displays */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 items-start">
              <ImageDisplay title="Imagem Original" imageUrl={originalImagePreview} />
              <ImageDisplay title="Seu Novo Look" imageUrl={editedImage} isLoading={isLoading} />
            </div>
          </div>
          
          {error && (
            <div className="mt-8 max-w-3xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative text-center" role="alert">
              <strong className="font-bold">Oops!</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
