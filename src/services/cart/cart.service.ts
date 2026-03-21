import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "../api";
import type {
  AddToCartData,
  CartItem,
  CartResponse,
  CheckoutData,
  SingleResponse,
  UpdateCartItemData,
} from "@/types";
import type { Order } from "@/types";

async function getCart(): Promise<SingleResponse<CartItem[]>> {
  return api<SingleResponse<CartItem[]>>("/api/cart", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
}

export function useCart() {
  return useQuery({
    queryKey: ["cart:list"],
    queryFn: getCart,
  });
}

async function addToCart(data: AddToCartData): Promise<CartResponse> {
  return api<CartResponse>("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
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
  return api<CartResponse>(`/api/cart/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
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
  return api(`/api/cart/${id}`, {
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
  return api("/api/cart", {
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
  return api<SingleResponse<Order>>("/api/cart/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
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
