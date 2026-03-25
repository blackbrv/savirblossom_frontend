"use client";

import { Bouquet } from "@/types";
import React from "react";

type ShopSectionProviderProps = {
  selectedFilter?: number;
  currentPage: number;
  bouquetList?: Bouquet[];
  isBouquetLoading?: boolean;
};

const ShopSectionProvider =
  React.createContext<ShopSectionProviderProps | null>(null);

function useShopSectionprovider() {
  const context = React.useContext(ShopSectionProvider);

  if (!context) {
    throw new Error(
      "useShopProvider must be used within a <ShopSectionProvider />",
    );
  }

  return context;
}

export { ShopSectionProvider, useShopSectionprovider };
