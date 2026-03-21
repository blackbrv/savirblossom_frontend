import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { authApi } from "../api";
import type {
  AddToCartData,
  CartItem,
  CartResponse,
  CheckoutData,
  UpdateCartItemData,
} from "@/types";
import type { SingleResponse } from "@/services/api-types";
import type { Order } from "@/types";

interface CartResponseData {
  items: CartItem[];
  total_quantity: number;
  total_price: number;
}

async function getCart(): Promise<{ data: CartResponseData }> {
  return authApi<{ data: CartResponseData }>("/api/cart", {
    method: "GET",
  });
}

export function useCart() {
  return useQuery({
    queryKey: ["cart:list"],
    queryFn: getCart,
  });
}

async function addToCart(data: AddToCartData): Promise<CartResponse> {
  return authApi<CartResponse>("/api/cart", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart:list"] });
    },
  });
}

async function updateCartItem(
  id: number,
  data: UpdateCartItemData,
): Promise<CartResponse> {
  return authApi<CartResponse>(`/api/cart/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      updateCartItem(id, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart:list"] });
    },
  });
}

async function removeCartItem(id: number): Promise<void> {
  return authApi(`/api/cart/${id}`, {
    method: "DELETE",
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart:list"] });
    },
  });
}

async function clearCart(): Promise<void> {
  return authApi("/api/cart", {
    method: "DELETE",
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart:list"] });
    },
  });
}

async function checkout(data: CheckoutData): Promise<SingleResponse<Order>> {
  return authApi<SingleResponse<Order>>("/api/cart/checkout", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart:list"] });
      queryClient.invalidateQueries({ queryKey: ["orders:list"] });
      queryClient.invalidateQueries({ queryKey: ["invoices:list"] });
    },
  });
}
