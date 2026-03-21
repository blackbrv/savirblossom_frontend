import { Bouquet } from "./bouquet";
import { Customer } from "./customer";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "unpaid" | "paid";

export interface OrderItem {
  id: number;
  order_id: number;
  bouquet_id: number;
  quantity: number;
  price_at_time: number;
  bouquet?: Bouquet;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: number;
  order_id: number;
  invoice_number: string;
  total_amount: number;
  payment_status: PaymentStatus;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  customer_id: number | null;
  status: OrderStatus;
  total_amount: number;
  shipping_address: string;
  notes: string | null;
  payment_status: PaymentStatus;
  invoice?: Invoice;
  customer?: Customer;
  items?: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderCreateData {
  items: Array<{ bouquet_id: number; quantity: number }>;
  shipping_address: string;
  notes?: string;
}

export interface OrderUpdateData {
  status?: OrderStatus;
  notes?: string;
}
