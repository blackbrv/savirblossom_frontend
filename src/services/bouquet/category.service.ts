import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "../api";
import type {
  Category,
  CategoryCreateData,
  CategoryUpdateData,
  SingleResponse,
} from "@/types";

async function getCategories(): Promise<SingleResponse<Category[]>> {
  return api<SingleResponse<Category[]>>("/api/bouquet/categories");
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories:list"],
    queryFn: getCategories,
  });
}

async function getCategory(id: number): Promise<SingleResponse<Category>> {
  return api<SingleResponse<Category>>(`/api/bouquet/categories/${id}`);
}

export function useCategory(id: number) {
  return useQuery({
    queryKey: ["categories:detail", id],
    queryFn: () => getCategory(id),
    enabled: !!id,
  });
}

async function createCategory(
  data: CategoryCreateData,
): Promise<SingleResponse<Category>> {
  return api<SingleResponse<Category>>("/api/bouquet/categories/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CategoryCreateData) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories:list"] });
    },
  });
}

async function updateCategory(
  id: number,
  data: CategoryUpdateData,
): Promise<SingleResponse<Category>> {
  return api<SingleResponse<Category>>(`/api/bouquet/categories/update/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CategoryUpdateData }) =>
      updateCategory(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories:list"] });
      queryClient.invalidateQueries({
        queryKey: ["categories:detail", variables.id],
      });
    },
  });
}

async function deleteCategory(id: number): Promise<void> {
  return api(`/api/bouquet/categories/delete/${id}`, {
    method: "POST",
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories:list"] });
    },
  });
}
