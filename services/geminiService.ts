import { GoogleGenAI, GenerateContentResponse, GenerateContentParameters, Type } from "@google/genai";
import { PriceSuggestion } from '../types';

// Ensure the API key is available as an environment variable
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface ImageData {
    mimeType: string;
    data: string;
}

export const generateProductDescription = async (
  productName: string,
  features: string,
  promptTemplate: string,
  image?: ImageData,
): Promise<string> => {
  const finalPrompt = promptTemplate
    .replace(/\$\{productName\}/g, productName)
    .replace(/\$\{features\}/g, features);

  let contents: GenerateContentParameters['contents'];

  if (image) {
    contents = {
      parts: [
        {
          inlineData: {
            mimeType: image.mimeType,
            data: image.data,
          },
        },
        { text: finalPrompt },
      ],
    };
  } else {
    contents = finalPrompt;
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating description:", error);
    throw new Error("Gagal membuat deskripsi. Silakan coba lagi.");
  }
};

export const generateProductImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
    });
    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Gagal membuat gambar produk. Silakan coba lagi.");
  }
};

export const suggestProductPrice = async (
  productName: string,
  category: string,
  description: string
): Promise<PriceSuggestion> => {
  const prompt = `Anda adalah seorang ahli strategi harga e-commerce untuk pasar UMKM Indonesia. Berdasarkan informasi produk berikut, berikan usulan harga jual dalam Rupiah (IDR) dan alasan singkatnya.
  
  Nama Produk: "${productName}"
  Kategori: "${category}"
  Deskripsi: "${description}"
  
  Pertimbangkan faktor seperti kategori, keunikan produk (berdasarkan deskripsi), dan target pasar umum untuk UMKM di Indonesia. Berikan harga yang kompetitif namun tetap menguntungkan.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggested_price: {
              type: Type.INTEGER,
              description: 'Harga yang disarankan dalam Rupiah (IDR), hanya angka.',
            },
            reasoning: {
              type: Type.STRING,
              description: 'Penjelasan singkat (1-2 kalimat) mengenai dasar usulan harga tersebut.',
            },
          },
          required: ['suggested_price', 'reasoning'],
        },
      },
    });

    const jsonString = response.text;
    const parsedJson = JSON.parse(jsonString) as PriceSuggestion;
    return parsedJson;

  } catch (error) {
    console.error("Error suggesting price:", error);
    throw new Error("Gagal mendapatkan saran harga. Silakan coba lagi.");
  }
};