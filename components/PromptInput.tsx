import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  isImageLoaded: boolean;
}

const colors = [
  { name: 'Amarelo', hex: '#EAB308' },
  { name: 'Verde', hex: '#22C55E' },
  { name: 'Branco', hex: '#FFFFFF', border: 'border-gray-400' },
  { name: 'Preto', hex: '#111827' },
  { name: 'Vermelho', hex: '#EF4444' },
  { name: 'Azul', hex: '#3B82F6' },
  { name: 'Rosa', hex: '#EC4899' },
  { name: 'Roxo', hex: '#8B5CF6' },
];

const promptSuggestions = [
    'Mude a cor da blusa para azul royal',
    'Adicione uma estampa de listras',
    'Transforme a calça jeans em uma saia',
    'Coloque um cinto de couro marrom',
];

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isLoading, isImageLoaded }) => {
  const [clothingItem, setClothingItem] = useState('');

  const handleColorClick = (colorName: string) => {
    const item = clothingItem.trim();
    if (!item) {
      setPrompt(`Mude a cor da peça de roupa principal para ${colorName.toLowerCase()}.`);
      return;
    }
    const newPrompt = `Mude a cor de '${item}' para ${colorName.toLowerCase()}.`;
    setPrompt(newPrompt);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Descreva a Edição</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ex: Adicione um filtro retrô, remova a pessoa no fundo, troque a cor da blusa para vermelho..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 resize-none"
        rows={3}
        disabled={!isImageLoaded}
      />

      <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Ou tente uma sugestão:</h3>
          <div className="flex flex-wrap gap-2">
              {promptSuggestions.map((suggestion) => (
                  <button
                      key={suggestion}
                      onClick={() => setPrompt(suggestion)}
                      disabled={!isImageLoaded}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      {suggestion}
                  </button>
              ))}
          </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <h3 className="text-md font-semibold text-gray-700 mb-3">✨ Atalho: Mudar Cor</h3>
        <div className="space-y-3">
          <input
            type="text"
            value={clothingItem}
            onChange={(e) => setClothingItem(e.target.value)}
            placeholder="Item de roupa (ex: blusa, calça)"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
            disabled={!isImageLoaded}
          />
          <div className="flex items-center justify-start gap-2 flex-wrap">
            {colors.map((color) => (
              <button
                key={color.name}
                title={color.name}
                onClick={() => handleColorClick(color.name)}
                disabled={!isImageLoaded}
                aria-label={`Mudar cor para ${color.name}`}
                className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${color.border || ''}`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading || !isImageLoaded || !prompt}
        className="mt-6 w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Gerando...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5 mr-2" />
            Experimentar Look
          </>
        )}
      </button>
    </div>
  );
};

export default PromptInput;