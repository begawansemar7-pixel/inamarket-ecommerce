
// Fix: Import GenerateContentParameters for proper typing.
import { GoogleGenAI, GenerateContentResponse, GenerateContentParameters } from "@google/genai";

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

  // Fix: Use the correct type for contents and handle single vs. multipart requests as per guidelines.
  let contents: GenerateContentParameters['contents'];

  if (image) {
    // For multipart, provide image part first, then text part.
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
    // For text-only, a simple string is sufficient.
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
