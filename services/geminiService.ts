
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available as an environment variable
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProductDescription = async (
  productName: string,
  features: string
): Promise<string> => {
  const prompt = `Anda adalah seorang copywriter marketing ahli untuk UMKM Indonesia. Buatlah deskripsi produk yang menarik, ramah, dan persuasif untuk produk bernama "${productName}" dengan fitur-fitur utama berikut: ${features}. 
  
Gaya bahasanya harus antusias dan ditujukan untuk konsumen di Indonesia. Gunakan bahasa yang sederhana namun efektif. 
  
Struktur deskripsi:
1.  Satu paragraf pembuka yang menarik perhatian.
2.  Beberapa poin utama (bullet points) yang menonjolkan fitur/keunggulan produk.
3.  Satu paragraf penutup yang mengajak untuk membeli.

Hanya berikan output teks deskripsinya saja, tanpa judul atau embel-embel lain.`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating description:", error);
    throw new Error("Gagal membuat deskripsi. Silakan coba lagi.");
  }
};
