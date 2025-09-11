
export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface AddOnService {
    id: string;
    name: string;
    price: number;
}

export type VerificationStatus = 'verified' | 'not-verified' | 'pending' | 'rejected';

export interface Product {
  id: number;
  name:string;
  price: number;
  seller: string;
  imageUrl: string;
  location: string;
  category: string;
  sellerVerification: VerificationStatus;
  description: string;
  sales?: number;
  reviews: Review[];
  addOnServices?: AddOnService[];
}

export interface ShippingOption {
    id: string;
    name: string;
    price: number;
    estimatedDelivery: string;
}

export interface Address {
    name: string;
    phone: string;
    street: string;
    city: string;
    province: string;
    postalCode: string;
}

export interface CartItem extends Product {
    quantity: number;
}

// ---- CHAT TYPES ----
export interface Message {
  id: string;
  text: string;
  sender: 'buyer' | 'seller';
  timestamp: number;
}

export interface Conversation {
  id:string; // e.g., `sellerName-productId`
  productId: number;
  productName: string;
  productImageUrl: string;
  sellerName: string;
  messages: Message[];
  unreadByBuyer: boolean;
}
