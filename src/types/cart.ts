import { Bouquet } from "./bouquet";

export interface CartItem {
  id: number;
  customer_id: number;
  bouquet_id: number;
  quantity: number;
  bouquet?: Bouquet;
  created_at: string;
  updated_at: string;
}

export interface CartResponse {
  message: string;
  data?: CartItem[];
}

export interface AddToCartData {
  bouquet_id: number;
  quantity: number;
}

export interface UpdateCartItemData {
  quantity: number;
}

export interface CheckoutData {
  shipping_address: string;
  notes?: string;
}
