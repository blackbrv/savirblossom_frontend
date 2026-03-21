import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api, authApi } from "../api";
import type {
  Order,
  OrderCreateData,
  OrderUpdateData,
  PaginatedResponse,
  SingleResponse,
} from "@/types";

interface GetOrdersParams {
  page?: number;
  perPage?: number;
  status?: string;
  paymentStatus?: string;
}

async function getOrders(
  params: GetOrdersParams = {},
): Promise<PaginatedResponse<Order>> {
  const searchParams = new URLSearchParams();

  const { page = 1, perPage = 15, status, paymentStatus } = params;

  searchParams.append("page", String(page));
  searchParams.append("per_page", String(perPage));

  if (status) searchParams.append("status", status);
  if (paymentStatus) searchParams.append("payment_status", paymentStatus);

  return api<PaginatedResponse<Order>>(
    `/api/orders?${searchParams.toString()}`,
  );
}

export function useOrders(params: GetOrdersParams = {}) {
  return useQuery({
    queryKey: ["orders:list", params],
    queryFn: () => getOrders(params),
  });
}

async function getOrder(id: number): Promise<SingleResponse<Order>> {
  return api<SingleResponse<Order>>(`/api/orders/${id}`);
}

export function useOrder(id: number) {
  return useQuery({
    queryKey: ["orders:detail", id],
    queryFn: () => getOrder(id),
    enabled: !!id,
  });
}

async function createOrder(
  data: OrderCreateData,
): Promise<SingleResponse<Order>> {
  return api<SingleResponse<Order>>("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders:list"] });
    },
  });
}

async function updateOrder(
  id: number,
  data: OrderUpdateData,
): Promise<SingleResponse<Order>> {
  return api<SingleResponse<Order>>(`/api/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: OrderUpdateData }) =>
      updateOrder(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders:list"] });
      queryClient.invalidateQueries({
        queryKey: ["orders:detail", variables.id],
      });
    },
  });
}

async function deleteOrder(id: number): Promise<void> {
  return api(`/api/orders/${id}`, {
    method: "DELETE",
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders:list"] });
    },
  });
}

async function markOrderPaid(id: number): Promise<SingleResponse<Order>> {
  return api<SingleResponse<Order>>(`/api/orders/${id}/mark-paid`, {
    method: "POST",
  });
}

export function useMarkOrderPaid() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markOrderPaid,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["orders:list"] });
      queryClient.invalidateQueries({ queryKey: ["orders:detail", id] });
      queryClient.invalidateQueries({ queryKey: ["invoices:list"] });
    },
  });
}

async function getCustomerOrders(
  customerId: number,
  params: GetOrdersParams = {},
): Promise<PaginatedResponse<Order>> {
  const searchParams = new URLSearchParams();

  const { page = 1, perPage = 15, status, paymentStatus } = params;

  searchParams.append("page", String(page));
  searchParams.append("per_page", String(perPage));

  if (status) searchParams.append("status", status);
  if (paymentStatus) searchParams.append("payment_status", paymentStatus);

  return authApi<PaginatedResponse<Order>>(
    `/api/customers/${customerId}/orders?${searchParams.toString()}`,
  );
}

export function useCustomerOrders(
  customerId: number,
  params: GetOrdersParams = {},
) {
  return useQuery({
    queryKey: ["customer:orders", customerId, params],
    queryFn: () => getCustomerOrders(customerId, params),
    enabled: !!customerId,
  });
}

async function getCustomerOrder(
  customerId: number,
  orderId: number,
): Promise<SingleResponse<Order>> {
  return authApi<SingleResponse<Order>>(
    `/api/customers/${customerId}/orders/${orderId}`,
  );
}

export function useCustomerOrder(customerId: number, orderId: number) {
  return useQuery({
    queryKey: ["customer:orders", customerId, "detail", orderId],
    queryFn: () => getCustomerOrder(customerId, orderId),
    enabled: !!customerId && !!orderId,
  });
}

async function createCustomerOrder(
  customerId: number,
  data: OrderCreateData,
): Promise<SingleResponse<Order>> {
  return authApi<SingleResponse<Order>>(`/api/customers/${customerId}/orders`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function useCreateCustomerOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      customerId,
      data,
    }: {
      customerId: number;
      data: OrderCreateData;
    }) => createCustomerOrder(customerId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["customer:orders", variables.customerId],
      });
    },
  });
}
