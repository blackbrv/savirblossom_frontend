import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "../api";
import type {
  Bouquet,
  BouquetCreateData,
  BouquetGalleryCreateData,
  BouquetUpdateData,
  PaginatedResponse,
  SingleResponse,
} from "@/types";
import { toast } from "@/lib/utils/toast";

interface GetBouquetsParams {
  page?: number;
  perPage?: number;
  categoryId?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  minStock?: number;
  maxStock?: number;
  inStock?: boolean;
}

async function getBouquets({
  page = 1,
  perPage = 9,
  categoryId,
  search,
  minPrice,
  maxPrice,
  minStock,
  maxStock,
  inStock,
}: GetBouquetsParams): Promise<PaginatedResponse<Bouquet>> {
  const searchParams = new URLSearchParams();

  const params = {
    page,
    per_page: perPage,
    category_id: categoryId,
    search,
    min_price: minPrice,
    max_price: maxPrice,
    min_stock: minStock,
    max_stock: maxStock,
    in_stock: inStock,
  };

  Object.entries(params).forEach(([name, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === "boolean") {
        searchParams.append(name, value ? "1" : "0");
      } else {
        searchParams.append(name, String(value));
      }
    }
  });

  return api<PaginatedResponse<Bouquet>>(
    `/api/bouquet?${searchParams.toString()}`,
  );
}

export function useBouquets(params: GetBouquetsParams = {}) {
  return useQuery({
    queryKey: ["bouquets:list", params],
    queryFn: () => getBouquets(params),
  });
}

async function getBouquet(id: number): Promise<SingleResponse<Bouquet>> {
  return api<SingleResponse<Bouquet>>(`/api/bouquet/${id}`);
}

export function useBouquet(id: number) {
  return useQuery({
    queryKey: ["bouquets:detail", id],
    queryFn: () => getBouquet(id),
    enabled: !!id,
  });
}

async function createBouquet(
  data: BouquetCreateData,
): Promise<SingleResponse<Bouquet>> {
  return api<SingleResponse<Bouquet>>("/api/bouquet/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function useCreateBouquet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BouquetCreateData) => createBouquet(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bouquets:list"] });
      toast.success({
        title: "Bouquet created",
        message: "New bouquet has been created successfully",
      });
    },
    onError: (error) => {
      toast.error({ error, fallbackMessage: "Failed to create bouquet" });
    },
  });
}

async function updateBouquet(
  id: number,
  data: BouquetUpdateData,
): Promise<SingleResponse<Bouquet>> {
  return api<SingleResponse<Bouquet>>(`/api/bouquet/update/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function useUpdateBouquet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: BouquetUpdateData }) =>
      updateBouquet(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bouquets:list"] });
      queryClient.invalidateQueries({
        queryKey: ["bouquets:detail", variables.id],
      });
      toast.success({
        title: "Bouquet updated",
        message: "Bouquet has been updated successfully",
      });
    },
    onError: (error) => {
      toast.error({ error, fallbackMessage: "Failed to update bouquet" });
    },
  });
}

async function deleteBouquet(id: number): Promise<void> {
  return api(`/api/bouquet/${id}/delete`, {
    method: "POST",
  });
}

export function useDeleteBouquet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBouquet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bouquets:list"] });
      toast.success({
        title: "Bouquet deleted",
        message: "Bouquet has been deleted successfully",
      });
    },
    onError: (error) => {
      toast.error({ error, fallbackMessage: "Failed to delete bouquet" });
    },
  });
}

async function togglePublish(id: number): Promise<SingleResponse<Bouquet>> {
  return api<SingleResponse<Bouquet>>(`/api/bouquet/${id}/publish`, {
    method: "PATCH",
  });
}

export function useTogglePublish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: togglePublish,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["bouquets:list"] });
      queryClient.invalidateQueries({ queryKey: ["bouquets:detail", id] });
      toast.success({
        title: "Visibility updated",
        message: "Bouquet visibility has been updated",
      });
    },
    onError: (error) => {
      toast.error({ error, fallbackMessage: "Failed to update visibility" });
    },
  });
}

async function getBouquetGalleries(
  bouquetId: number,
): Promise<PaginatedResponse<Bouquet>> {
  return api<PaginatedResponse<Bouquet>>(`/api/bouquet/${bouquetId}/galleries`);
}

export function useBouquetGalleries(bouquetId: number) {
  return useQuery({
    queryKey: ["bouquets:galleries", bouquetId],
    queryFn: () => getBouquetGalleries(bouquetId),
    enabled: !!bouquetId,
  });
}

async function addBouquetGallery(
  bouquetId: number,
  data: BouquetGalleryCreateData,
): Promise<void> {
  return api(`/api/bouquet/${bouquetId}/galleries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function useAddBouquetGallery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bouquetId,
      data,
    }: {
      bouquetId: number;
      data: BouquetGalleryCreateData;
    }) => addBouquetGallery(bouquetId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["bouquets:galleries", variables.bouquetId],
      });
    },
  });
}

async function updateBouquetGallery(
  bouquetId: number,
  galleryId: number,
  data: BouquetGalleryCreateData,
): Promise<void> {
  return api(`/api/bouquet/${bouquetId}/galleries/${galleryId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function useUpdateBouquetGallery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bouquetId,
      galleryId,
      data,
    }: {
      bouquetId: number;
      galleryId: number;
      data: BouquetGalleryCreateData;
    }) => updateBouquetGallery(bouquetId, galleryId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["bouquets:galleries", variables.bouquetId],
      });
    },
  });
}

async function deleteBouquetGallery(
  bouquetId: number,
  galleryId: number,
): Promise<void> {
  return api(`/api/bouquet/${bouquetId}/galleries/${galleryId}/delete`, {
    method: "POST",
  });
}

export function useDeleteBouquetGallery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bouquetId,
      galleryId,
    }: {
      bouquetId: number;
      galleryId: number;
    }) => deleteBouquetGallery(bouquetId, galleryId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["bouquets:galleries", variables.bouquetId],
      });
    },
  });
}
