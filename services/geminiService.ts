
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function editImageWithPrompt(
  base64PersonImage: string,
  personMimeType: string,
  prompt: string,
  base64ClothingImage?: string,
  clothingMimeType?: string
): Promise<string> {
  try {
    const parts: any[] = [
      {
        inlineData: {
          data: base64PersonImage,
          mimeType: personMimeType,
        },
      },
    ];

    if (base64ClothingImage && clothingMimeType) {
      parts.push({
        inlineData: {
          data: base64ClothingImage,
          mimeType: clothingMimeType,
        },
      });
    }

    parts.push({ text: prompt });

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: parts,
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const candidate = response.candidates?.[0];

    // Verifica de forma robusta se a resposta da API é válida antes de processá-la.
    if (!candidate || !candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
      const blockReason = response.promptFeedback?.blockReason;
      if (blockReason) {
        throw new Error(`Sua solicitação foi bloqueada (${blockReason}). Por favor, tente um comando diferente.`);
      }
      
      const finishReason = candidate?.finishReason;
      if (finishReason && finishReason !== 'STOP') {
        throw new Error(`A geração da imagem falhou. Motivo: ${finishReason}.`);
      }

      console.error("Resposta inválida da API:", response);
      throw new Error("A API não retornou uma imagem válida. A resposta pode estar vazia ou malformada.");
    }


    for (const part of candidate.content.parts) {
      if (part.inlineData?.data) {
        return part.inlineData.data;
      }
    }

    throw new Error("Nenhuma imagem foi gerada na resposta da API.");
  } catch (error) {
    console.error("Erro na chamada da API Gemini:", error);
    if (error instanceof Error) {
        // Re-lança o erro para ser capturado pela função chamadora (App.tsx)
        // Isso permite que mensagens de erro específicas (como bloqueios de segurança) sejam exibidas na interface do usuário.
        throw error;
    }
    throw new Error("Um erro desconhecido ocorreu ao se comunicar com a API Gemini.");
  }
}
