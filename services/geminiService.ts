import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { fileToBase64 } from "../utils/fileUtils";

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
  image?: ImageData,
): Promise<string> => {
  const textPrompt = `Anda adalah seorang copywriter marketing ahli untuk UMKM Indonesia. Saya akan memberikan nama produk, fitur utama, dan sebuah gambar produk. Buatlah deskripsi produk yang menarik, ramah, dan persuasif berdasarkan semua informasi tersebut.
  
Nama Produk: "${productName}"
Fitur-fitur Utama: ${features}

Lihat gambar terlampir untuk memahami visual produknya. Tonjolkan aspek visual yang menarik dari gambar.

Gaya bahasanya harus antusias dan ditujukan untuk konsumen di Indonesia. Gunakan bahasa yang sederhana namun efektif. 
  
Struktur deskripsi:
1.  Satu paragraf pembuka yang menarik perhatian.
2.  Beberapa poin utama (bullet points) yang menonjolkan fitur/keunggulan produk (termasuk dari gambar).
3.  Satu paragraf penutup yang mengajak untuk membeli.

Hanya berikan output teks deskripsinya saja, tanpa judul atau embel-embel lain.`;

  const contents: any = { parts: [{ text: textPrompt }] };

  if (image) {
      contents.parts.push({
          inlineData: {
              mimeType: image.mimeType,
              data: image.data,
          }
      })
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