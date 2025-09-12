
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
    SewingMachineIcon,
    WrenchIcon,
    PenToolIcon,
    CameraIcon,
    FoodTrayIcon,
    PartyPopperIcon,
    CostumeIcon,
    SpeakerWaveIcon,
    CarIcon
} from './components/icons/Icons';

export const CATEGORIES = [
  'Makanan & Minuman',
  'Fashion Wanita',
  'Fashion Pria',
  'Kesehatan & Kecantikan',
  'Rumah & Taman',
  'Elektronik',
  'Kerajinan Tangan',
  'Otomotif',
  'Mainan & Hobi',
];

export const CATEGORIES_WITH_ICONS = [
    { name: 'Makanan & Minuman', icon: FoodAndDrinkIcon },
    { name: 'Fashion Wanita', icon: FashionWomanIcon },
    { name: 'Fashion Pria', icon: FashionManIcon },
    { name: 'Kesehatan & Kecantikan', icon: HealthAndBeautyIcon },
    { name: 'Rumah & Taman', icon: HomeAndGardenIcon },
    { name: 'Elektronik', icon: ElectronicsIcon },
    { name: 'Kerajinan Tangan', icon: HandicraftIcon },
    { name: 'Otomotif', icon: AutomotiveIcon },
    { name: 'Mainan & Hobi', icon: ToysAndHobbiesIcon },
];

export const SERVICE_CATEGORIES_WITH_ICONS = [
    { name: 'Jasa Jahit', icon: SewingMachineIcon },
    { name: 'Servis Elektronik', icon: WrenchIcon },
    { name: 'Desain Grafis', icon: PenToolIcon },
    { name: 'Jasa Fotografi', icon: CameraIcon },
    { name: 'Katering', icon: FoodTrayIcon },
];

export const RENTAL_CATEGORIES_WITH_ICONS = [
    { name: 'Sewa Alat Pesta', icon: PartyPopperIcon },
    { name: 'Sewa Kamera', icon: CameraIcon },
    { name: 'Sewa Kostum', icon: CostumeIcon },
    { name: 'Sewa Sound System', icon: SpeakerWaveIcon },
    { name: 'Sewa Mobil', icon: CarIcon },
];

export const ALL_CATEGORIES = [
    ...CATEGORIES_WITH_ICONS,
    ...SERVICE_CATEGORIES_WITH_ICONS,
    ...RENTAL_CATEGORIES_WITH_ICONS,
];


export const LOCATIONS = ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Bali', 'Medan'];

export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: 'Kopi Gayo Asli Aceh',
        price: 75000,
        description: 'Kopi Arabika Gayo asli dari dataran tinggi Aceh. Diproses secara alami untuk menghasilkan aroma yang kuat dan rasa yang nikmat.\n\n- 100% Kopi Arabika\n- Medium Roast\n- Berat bersih: 250g',
        imageUrl: 'https://picsum.photos/seed/kopi1/400/400',
        category: 'Makanan & Minuman',
        seller: 'Kopi Kita',
        sellerVerification: 'verified',
        location: 'Jakarta',
        reviews: [
            { id: 1, user: 'Budi', date: '20 Jul 2024', rating: 5, comment: 'Kopinya mantap, aromanya wangi banget!' },
            { id: 2, user: 'Siti', date: '18 Jul 2024', rating: 4, comment: 'Rasanya pas, tidak terlalu asam.' },
        ],
        sales: 120,
        stock: 55,
        discount: 0
    },
    {
        id: 2,
        name: 'Batik Tulis Madura',
        price: 450000,
        description: 'Kain batik tulis asli dari Pamekasan, Madura. Dibuat dengan pewarna alami dan motif pesisir yang khas.\n\n- Ukuran: 2m x 1.15m\n- Bahan: Katun Primisima\n- 100% buatan tangan',
        imageUrl: 'https://picsum.photos/seed/batik1/400/400',
        category: 'Fashion Wanita',
        seller: 'Batik Indah',
        sellerVerification: 'verified',
        location: 'Surabaya',
        reviews: [
            { id: 3, user: 'Lina', date: '15 Jul 2024', rating: 5, comment: 'Warnanya cerah dan kainnya adem. Suka banget!' }
        ],
        sales: 30,
        stock: 20,
        discount: 10
    },
    {
        id: 3,
        name: 'Madu Hutan Asli',
        price: 99000,
        originalPrice: 120000,
        description: 'Madu murni yang dipanen dari hutan pedalaman Sumatra. Tanpa tambahan gula atau bahan pengawet.',
        imageUrl: 'https://picsum.photos/seed/madu1/400/400',
        category: 'Kesehatan & Kecantikan',
        seller: 'Hutan Lestari',
        sellerVerification: 'unverified',
        location: 'Medan',
        reviews: [
            { id: 4, user: 'Joko', date: '22 Jul 2024', rating: 5, comment: 'Madunya asli, kental dan berkhasiat.' }
        ],
        sales: 85,
        stock: 100,
        discount: 0
    },
    {
        id: 4,
        name: 'Kerajinan Ukir Kayu Jepara',
        price: 250000,
        description: 'Hiasan dinding ukiran kayu jati dari pengrajin Jepara. Detail ukiran yang halus dan finishing yang rapi.',
        imageUrl: 'https://picsum.photos/seed/ukir1/400/400',
        category: 'Rumah & Taman',
        seller: 'Jepara Art',
        sellerVerification: 'verified',
        location: 'Yogyakarta',
        reviews: [],
        sales: 15,
        stock: 25,
        discount: 0
    },
    {
        id: 5,
        name: 'Speaker Bluetooth Bambu',
        price: 299000,
        originalPrice: 350000,
        description: 'Speaker portable dengan bodi terbuat dari bambu asli. Suara jernih dan desain ramah lingkungan.',
        imageUrl: 'https://picsum.photos/seed/speaker1/400/400',
        category: 'Elektronik',
        seller: 'Suara Alam',
        sellerVerification: 'verified',
        location: 'Bandung',
        reviews: [
            { id: 5, user: 'Rina', date: '19 Jul 2024', rating: 4, comment: 'Desainnya unik, kualitas suaranya juga oke untuk harganya.' }
        ],
        sales: 45,
        stock: 8,
        discount: 15
    },
    {
        id: 6,
        name: 'Tas Kulit Sapi Asli Garut',
        price: 850000,
        description: 'Tas selempang pria dibuat dari kulit sapi asli Sukaregang, Garut. Jahitan kuat dan desain maskulin.',
        imageUrl: 'https://picsum.photos/seed/tas1/400/400',
        category: 'Fashion Pria',
        seller: 'Kulit Asli',
        sellerVerification: 'verified',
        location: 'Bandung',
        reviews: [
            { id: 6, user: 'Agus', date: '25 Jul 2024', rating: 5, comment: 'Kualitas kulitnya premium, worth it!' }
        ],
        sales: 25,
        stock: 12,
        discount: 0
    },
    {
        id: 7,
        name: 'Wayang Golek Cepot',
        price: 150000,
        description: 'Wayang golek karakter Cepot, dibuat oleh pengrajin ahli dari Jawa Barat. Cocok untuk koleksi atau hiasan.',
        imageUrl: 'https://picsum.photos/seed/wayang1/400/400',
        category: 'Kerajinan Tangan',
        seller: 'Sunda Kreasi',
        sellerVerification: 'unverified',
        location: 'Bandung',
        reviews: [],
        sales: 50,
        stock: 40,
        discount: 0
    },
    {
        id: 8,
        name: 'Sambal Roa Khas Manado',
        price: 45000,
        description: 'Sambal ikan roa pedas dan gurih, diolah dengan resep tradisional Manado. Tanpa MSG.',
        imageUrl: 'https://picsum.photos/seed/sambal1/400/400',
        category: 'Makanan & Minuman',
        seller: 'Dapur Manado',
        sellerVerification: 'verified',
        location: 'Jakarta',
        reviews: [
            { id: 7, user: 'Dewi', date: '21 Jul 2024', rating: 5, comment: 'Pedasnya nampol, bikin nagih!' },
            { id: 8, user: 'Eko', date: '20 Jul 2024', rating: 5, comment: 'Sambal roa terbaik yang pernah saya coba.' }
        ],
        sales: 250,
        stock: 200,
        discount: 5
    },
    {
        id: 9,
        name: 'Lulur Bali Tradisional',
        price: 60000,
        description: 'Lulur mandi dengan bahan-bahan alami seperti bengkoang dan rempah-rempah pilihan dari Bali.',
        imageUrl: 'https://picsum.photos/seed/lulur1/400/400',
        category: 'Kesehatan & Kecantikan',
        seller: 'Bali Spa',
        sellerVerification: 'verified',
        location: 'Bali',
        reviews: [],
        sales: 90,
        stock: 75,
        discount: 0
    },
    {
        id: 10,
        name: 'Tenun Ikat Sumba',
        price: 1200000,
        description: 'Kain tenun ikat asli Sumba dengan motif kuda yang ikonik. Proses pembuatan memakan waktu berbulan-bulan.',
        imageUrl: 'https://picsum.photos/seed/tenun1/400/400',
        category: 'Kerajinan Tangan',
        seller: 'Sumba Woven',
        sellerVerification: 'verified',
        location: 'Bali',
        reviews: [
             { id: 9, user: 'Maria', date: '10 Jul 2024', rating: 5, comment: 'Kainnya sangat indah, sebuah karya seni.' }
        ],
        sales: 10,
        stock: 5,
        discount: 0
    },
    {
        id: 11,
        name: 'Gantungan Kunci Kulit Custom',
        price: 50000,
        description: 'Gantungan kunci dari kulit asli, bisa custom nama atau inisial. Cocok untuk souvenir.',
        imageUrl: 'https://picsum.photos/seed/gantungan1/400/400',
        category: 'Otomotif',
        seller: 'Kulit Asli',
        sellerVerification: 'verified',
        location: 'Bandung',
        reviews: [],
        sales: 150,
        stock: 300,
        discount: 20
    },
    {
        id: 12,
        name: 'Mainan Edukasi Anak - Balok Kayu',
        price: 150000,
        originalPrice: 180000,
        description: 'Satu set balok kayu pinus dengan cat non-toxic. Membantu mengasah kreativitas dan motorik anak.',
        imageUrl: 'https://picsum.photos/seed/mainan1/400/400',
        category: 'Mainan & Hobi',
        seller: 'Ceria Toys',
        sellerVerification: 'unverified',
        location: 'Yogyakarta',
        reviews: [
            { id: 10, user: 'Ibu Ani', date: '23 Jul 2024', rating: 4, comment: 'Anak saya suka, kayunya halus dan aman.' }
        ],
        sales: 60,
        stock: 30,
        discount: 0
    },
];


export const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: 'standard', name: 'Reguler', price: 10000, estimatedDelivery: '2-4 hari' },
  { id: 'express', name: 'Express', price: 25000, estimatedDelivery: '1-2 hari' },
  { id: 'sameday', name: 'Same Day', price: 45000, estimatedDelivery: 'Hari ini' },
];

export const BOTTOM_CAROUSEL_SLIDES = [
  {
    id: 1,
    imageUrl: "https://picsum.photos/seed/bottomcarousel1/1600/400",
    title: "Jadilah Penjual di INAMarket",
    subtitle: "Buka toko Anda dan jangkau jutaan pelanggan di seluruh Indonesia. Gratis!",
    buttonText: "Mulai Berjualan",
  },
  {
    id: 2,
    imageUrl: "https://picsum.photos/seed/bottomcarousel2/1600/400",
    title: "Pengiriman Cepat & Terpercaya",
    subtitle: "Kami bekerja sama dengan layanan logistik terbaik untuk mengantar pesanan Anda.",
    buttonText: "Lacak Pesanan",
  },
  {
    id: 3,
    imageUrl: "https://picsum.photos/seed/bottomcarousel3/1600/400",
    title: "Butuh Bantuan? Kami Siap Melayani",
    subtitle: "Tim customer service kami siap membantu Anda 24/7.",
    buttonText: "Hubungi Kami",
  }
];
