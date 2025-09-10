import { Product } from './types';

export const CATEGORIES: string[] = [
  "Makanan & Minuman",
  "Fashion Wanita",
  "Fashion Pria",
  "Kesehatan & Kecantikan",
  "Rumah & Taman",
  "Elektronik",
  "Kerajinan Tangan",
  "Otomotif",
  "Mainan & Hobi",
];

export const PRODUCTS: Product[] = [
  { id: 1, name: "Kopi Gayo Arabika Asli", price: 75000, seller: "Kopi Kita", imageUrl: "https://picsum.photos/seed/kopi1/400/400", location: "Aceh", category: "Makanan & Minuman" },
  { id: 2, name: "Batik Tulis Madura", price: 350000, seller: "Batik Indah", imageUrl: "https://picsum.photos/seed/batik1/400/400", location: "Madura", category: "Fashion Wanita" },
  { id: 3, name: "Keripik Tempe Sagu", price: 25000, seller: "Cemilan Enak", imageUrl: "https://picsum.photos/seed/keripik1/400/400", location: "Bandung", category: "Makanan & Minuman" },
  { id: 4, name: "Tas Kulit Garut Pria", price: 550000, seller: "Kulit Asli", imageUrl: "https://picsum.photos/seed/tas1/400/400", location: "Garut", category: "Fashion Pria" },
  { id: 5, name: "Madu Hutan Sumbawa", price: 120000, seller: "Madu Lestari", imageUrl: "https://picsum.photos/seed/madu1/400/400", location: "Sumbawa", category: "Kesehatan & Kecantikan" },
  { id: 6, name: "Gamis Modern Elegan", price: 280000, seller: "Hijab Style", imageUrl: "https://picsum.photos/seed/gamis1/400/400", location: "Jakarta", category: "Fashion Wanita" },
  { id: 7, name: "Wayang Golek Cepot", price: 150000, seller: "Seni Sunda", imageUrl: "https://picsum.photos/seed/wayang1/400/400", location: "Bogor", category: "Kerajinan Tangan" },
  { id: 8, name: "Sabun Herbal Sereh", price: 15000, seller: "Alam Sehat", imageUrl: "https://picsum.photos/seed/sabun1/400/400", location: "Yogyakarta", category: "Kesehatan & Kecantikan" },
  { id: 9, name: "Sambal Roa Manado", price: 45000, seller: "Dapur Manado", imageUrl: "https://picsum.photos/seed/sambal1/400/400", location: "Manado", category: "Makanan & Minuman" },
  { id: 10, name: "Kaos Barong Bali", price: 60000, seller: "Oleh-Oleh Bali", imageUrl: "https://picsum.photos/seed/kaos1/400/400", location: "Denpasar", category: "Fashion Pria" },
  { id: 11, name: "Dompet Tenun NTT", price: 95000, seller: "Tenun Ikat", imageUrl: "https://picsum.photos/seed/dompet1/400/400", location: "Kupang", category: "Kerajinan Tangan" },
  { id: 12, name: "Cokelat Organik", price: 55000, seller: "Kakao Sejati", imageUrl: "https://picsum.photos/seed/cokelat1/400/400", location: "Sulawesi", category: "Makanan & Minuman" },
  { id: 13, name: "Miniatur Rumah Gadang", price: 220000, seller: "Pusaka Minang", imageUrl: "https://picsum.photos/seed/miniatur1/400/400", location: "Padang", category: "Rumah & Taman" },
  { id: 14, name: "Sepatu Sneakers Lokal", price: 450000, seller: "Langkah Maju", imageUrl: "https://picsum.photos/seed/sepatu1/400/400", location: "Surabaya", category: "Fashion Pria" },
  { id: 15, name: "Lulur Tradisional Jawa", price: 35000, seller: "Putri Keraton", imageUrl: "https://picsum.photos/seed/lulur1/400/400", location: "Solo", category: "Kesehatan & Kecantikan" },
];
