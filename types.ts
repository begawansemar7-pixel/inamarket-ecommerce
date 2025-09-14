export type VerificationStatus = 'verified' | 'unverified';

export interface Review {
  id: number;
  user: string;
  date: string;
  rating: number; // 1 to 5
  comment: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number; // Added for promo products
  description: string;
  imageUrl: string;
  category: string;
  seller: string;
  sellerVerification: VerificationStatus;
  location: string;
  reviews: Review[];
  sales?: number; // Optional sales count
  stock?: number; // Optional stock count
  discount?: number; // Optional discount percentage
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Address {
  name: string;
  phone: string;
  street: string;
  city: string;
  province:string;
  postalCode: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDelivery: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface Message {
    id: string;
    sender: 'buyer' | 'seller';
    text: string;
    timestamp: string;
}

export interface Conversation {
    id: string; // e.g., 'product-1_seller-KopiKita'
    productId: number;
    productName: string;
    productImageUrl: string;
    sellerName: string;
    messages: Message[];
    unreadByBuyer: boolean;
}

export interface SellerApplication {
  id: number;
  storeName: string;
  ownerName: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
}

export interface PromoBannerData {
  enabled: boolean;
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

export interface DeliveryOptions {
  sameDay: {
    gojek: boolean;
    grab: boolean;
    iter: boolean;
  };
  interCity: {
    jne: boolean;
    jnt: boolean;
    tiki: boolean;
    pos: boolean;
  };
}

export interface PaymentOptions {
  qris: boolean;
  virtualAccounts: {
    bca: boolean;
    mandiri: boolean;
    bri: boolean;
    bni: boolean;
  };
  eWallets: {
    gopay: boolean;
    ovo: boolean;
    shopeePay: boolean;
    dana: boolean;
    linkAja: boolean;
  };
}

export interface ServiceOffering {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  seller: string;
  location: string;
}

export interface OperationalHours {
  [day: string]: {
    active: boolean;
    open: string;
    close: string;
  };
}

export interface BusinessService {
  serviceOfferings: ServiceOffering[];
  operationalHours: OperationalHours;
}

export interface HeroSlide {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
  actionType: 'navigate' | 'scroll';
  actionPayload: string;
}

export interface PriceSuggestion {
  suggested_price: number;
  reasoning: string;
}