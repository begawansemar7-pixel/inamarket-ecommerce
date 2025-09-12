
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
