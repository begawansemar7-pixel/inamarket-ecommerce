import React from 'react';
import { Product, ShippingOption } from './types';
import { 
    FoodAndDrinkIcon, 
    FashionWomanIcon,
    FashionManIcon,
    HealthAndBeautyIcon,
    HomeAndGardenIcon,
    ElectronicsIcon,
    HandicraftIcon,
    AutomotiveIcon,
    ToysAndHobbiesIcon,
} from './components/icons/Icons';

export const CATEGORIES_WITH_ICONS: { name: string; icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
  { name: "Makanan & Minuman", icon: FoodAndDrinkIcon },
  { name: "Fashion Wanita", icon: FashionWomanIcon },
  { name: "Fashion Pria", icon: FashionManIcon },
  { name: "Kesehatan & Kecantikan", icon: HealthAndBeautyIcon },
  { name: "Rumah & Taman", icon: HomeAndGardenIcon },
  { name: "Elektronik", icon: ElectronicsIcon },
  { name: "Kerajinan Tangan", icon: HandicraftIcon },
  { name: "Otomotif", icon: AutomotiveIcon },
  { name: "Mainan & Hobi", icon: ToysAndHobbiesIcon },
];

export const CATEGORIES: string[] = CATEGORIES_WITH_ICONS.map(c => c.name);

export const PRODUCTS: Product[] = [
  { id: 1, name: "Kopi Gayo Arabika Asli", price: 75000, seller: "Kopi Kita", imageUrl: "https://picsum.photos/seed/kopi1/400/400", location: "Aceh", category: "Makanan & Minuman", sellerVerification: "verified", description: "Nikmati aroma khas dan cita rasa premium dari biji kopi Arabika Gayo pilihan. Diproses secara tradisional untuk menjaga kualitas terbaik. Cocok untuk memulai hari Anda dengan semangat.", sales: 1500, reviews: [
    { id: 1, user: "Budi", rating: 5, comment: "Kopinya mantap, aromanya wangi banget!", date: "2024-07-20" },
    { id: 2, user: "Ani", rating: 4, comment: "Enak, tapi pengiriman agak lama.", date: "2024-07-18" }
  ]},
  { id: 2, name: "Batik Tulis Madura", price: 350000, seller: "Batik Indah", imageUrl: "https://picsum.photos/seed/batik1/400/400", location: "Madura", category: "Fashion Wanita", sellerVerification: "not-verified", description: "Kain batik tulis asli dari pengrajin Madura dengan motif pesisir yang khas dan warna-warna cerah. Terbuat dari katun primisima yang adem dan nyaman dipakai.", sales: 250, reviews: [
    { id: 3, user: "Citra", rating: 5, comment: "Motifnya cantik dan unik, suka sekali!", date: "2024-07-21" }
  ], addOnServices: [
      { id: 'gift_wrap', name: 'Bungkus Kado Spesial', price: 15000 },
      { id: 'greeting_card', name: 'Kartu Ucapan Tulis Tangan', price: 5000 },
  ]},
  { id: 3, name: "Keripik Tempe Sagu", price: 25000, seller: "Cemilan Enak", imageUrl: "https://picsum.photos/seed/keripik1/400/400", location: "Bandung", category: "Makanan & Minuman", sellerVerification: "verified", description: "Cemilan renyah dan gurih, terbuat dari tempe berkualitas yang dibalut dengan tepung sagu. Tanpa bahan pengawet, sehat dan cocok untuk teman santai.", sales: 5200, reviews: [
    { id: 4, user: "Dewi", rating: 5, comment: "Renyah banget dan bumbunya pas!", date: "2024-07-22" },
    { id: 5, user: "Eko", rating: 4, comment: "Enak buat cemilan nonton.", date: "2024-07-20" },
    { id: 6, user: "Fani", rating: 5, comment: "Anak-anak suka, bakal order lagi.", date: "2024-07-19" }
  ]},
  { id: 4, name: "Tas Kulit Garut Pria", price: 550000, seller: "Kulit Asli", imageUrl: "https://picsum.photos/seed/tas1/400/400", location: "Garut", category: "Fashion Pria", sellerVerification: "pending", description: "Tas selempang pria dari kulit sapi asli Garut. Desain maskulin dan elegan dengan jahitan tangan yang rapi. Tahan lama dan semakin bagus seiring waktu.", sales: 88, reviews: [
    { id: 7, user: "Gatot", rating: 5, comment: "Kualitas kulitnya juara, jahitan rapi.", date: "2024-07-23" }
  ], addOnServices: [
      { id: 'leather_care', name: 'Paket Perawatan Kulit', price: 50000 },
      { id: 'engrave', name: 'Grafir Nama (Maks 10 Huruf)', price: 75000 },
  ]},
  { id: 5, name: "Madu Hutan Sumbawa", price: 120000, seller: "Madu Lestari", imageUrl: "https://picsum.photos/seed/madu1/400/400", location: "Sumbawa", category: "Kesehatan & Kecantikan", sellerVerification: "verified", description: "Madu murni yang dipanen langsung dari hutan Sumbawa. Memiliki khasiat untuk menjaga daya tahan tubuh dan sebagai pemanis alami yang sehat.", reviews: [] },
  { id: 6, name: "Gamis Modern Elegan", price: 280000, seller: "Hijab Style", imageUrl: "https://picsum.photos/seed/gamis1/400/400", location: "Jakarta", category: "Fashion Wanita", sellerVerification: "not-verified", description: "Gamis modern dengan potongan A-line yang anggun. Terbuat dari bahan wolfis premium yang jatuh dan tidak menerawang. Tersedia dalam berbagai pilihan warna pastel.", sales: 412, reviews: [
    { id: 8, user: "Hesti", rating: 5, comment: "Bahannya adem, modelnya juga bagus.", date: "2024-07-15" }
  ]},
  { id: 7, name: "Wayang Golek Cepot", price: 150000, seller: "Seni Sunda", imageUrl: "https://picsum.photos/seed/wayang1/400/400", location: "Bogor", category: "Kerajinan Tangan", sellerVerification: "not-verified", description: "Kerajinan tangan Wayang Golek karakter Cepot yang ikonik. Dibuat dan dilukis tangan oleh seniman ahli. Cocok untuk hiasan rumah atau koleksi budaya.", reviews: [] },
  { id: 8, name: "Sabun Herbal Sereh", price: 15000, seller: "Alam Sehat", imageUrl: "https://picsum.photos/seed/sabun1/400/400", location: "Yogyakarta", category: "Kesehatan & Kecantikan", sellerVerification: "verified", description: "Sabun mandi alami dengan ekstrak sereh yang menyegarkan. Membantu membersihkan kulit, mengurangi bau badan, dan memberikan efek relaksasi.", reviews: [
    { id: 9, user: "Indah", rating: 5, comment: "Wangi serehnya bikin rileks, kulit jadi segar.", date: "2024-07-17" }
  ]},
  { id: 9, name: "Sambal Roa Manado", price: 45000, seller: "Dapur Manado", imageUrl: "https://picsum.photos/seed/sambal1/400/400", location: "Manado", category: "Makanan & Minuman", sellerVerification: "not-verified", description: "Sambal khas Manado yang terbuat dari ikan roa asap pilihan. Rasa pedas dan aroma smokey yang khas, sangat cocok sebagai pendamping makanan Anda.", reviews: [] },
  { id: 10, name: "Kaos Barong Bali", price: 60000, seller: "Oleh-Oleh Bali", imageUrl: "https://picsum.photos/seed/kaos1/400/400", location: "Denpasar", category: "Fashion Pria", sellerVerification: "not-verified", description: "Kaos katun yang nyaman dengan sablon gambar Barong khas Bali. Pilihan oleh-oleh yang otentik dan bergaya untuk dipakai sehari-hari.", sales: 800, reviews: [
    { id: 10, user: "Joko", rating: 4, comment: "Bahan kaosnya enak, adem.", date: "2024-07-12" }
  ]},
  { id: 11, name: "Dompet Tenun NTT", price: 95000, seller: "Tenun Ikat", imageUrl: "https://picsum.photos/seed/dompet1/400/400", location: "Kupang", category: "Kerajinan Tangan", sellerVerification: "verified", description: "Dompet wanita cantik yang dibuat dari kain tenun ikat asli Nusa Tenggara Timur. Motif etnik yang unik dengan banyak slot untuk kartu dan uang.", reviews: [] },
  { id: 12, name: "Cokelat Organik", price: 55000, seller: "Kakao Sejati", imageUrl: "https://picsum.photos/seed/cokelat1/400/400", location: "Sulawesi", category: "Makanan & Minuman", sellerVerification: "not-verified", description: "Dark chocolate bar 70% yang terbuat dari biji kakao organik Sulawesi. Rasa cokelat yang intens dengan sentuhan fruity, baik untuk kesehatan jantung.", reviews: [] },
  { id: 13, name: "Miniatur Rumah Gadang", price: 220000, seller: "Pusaka Minang", imageUrl: "https://picsum.photos/seed/miniatur1/400/400", location: "Padang", category: "Rumah & Taman", sellerVerification: "not-verified", description: "Hiasan meja berupa miniatur Rumah Gadang Minangkabau yang detail. Terbuat dari kayu dan bahan alami, merepresentasikan kekayaan arsitektur Indonesia.", reviews: [] },
  { id: 14, name: "Sepatu Sneakers Lokal", price: 450000, seller: "Langkah Maju", imageUrl: "https://picsum.photos/seed/sepatu1/400/400", location: "Surabaya", category: "Fashion Pria", sellerVerification: "verified", description: "Sneakers kasual buatan lokal dengan kualitas internasional. Bahan kanvas premium dan sol karet yang nyaman untuk aktivitas harian. Dukung produk dalam negeri!", sales: 350, reviews: [
     { id: 11, user: "Kurniawan", rating: 5, comment: "Keren sepatunya, nyaman dipakai. Bangga produk lokal!", date: "2024-07-25" }
  ]},
  { id: 15, name: "Lulur Tradisional Jawa", price: 35000, seller: "Putri Keraton", imageUrl: "https://picsum.photos/seed/lulur1/400/400", location: "Solo", category: "Kesehatan & Kecantikan", sellerVerification: "not-verified", description: "Lulur mandi dengan resep tradisional keraton Jawa. Terbuat dari rempah-rempah alami seperti kunyit dan temugiring untuk mencerahkan dan menghaluskan kulit.", reviews: [] },
];

export const SHIPPING_OPTIONS: ShippingOption[] = [
    { id: 'sicepat_best', name: 'SiCepat BEST', price: 12000, estimatedDelivery: '1-2 hari' },
    { id: 'jne_reg', name: 'JNE Reguler', price: 15000, estimatedDelivery: '2-3 hari' },
    { id: 'gojek_sameday', name: 'GoSend Same Day', price: 25000, estimatedDelivery: '6-8 jam' },
];